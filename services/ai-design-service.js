'use strict';

/**
 * AI Design Service
 *
 * 异步任务流水线：
 *   Phase 1 — fetchPrd     : 拉取语雀 PRD 正文
 *   Phase 2 — decompose    : 结构化需求拆解（页面 + 模块清单）
 *   Phase 3 — designPlan   : 生成每个模块的设计意图与建议处理方式
 *
 * 第一版实现：内存任务表（服务重启后正在跑的任务状态丢失，结果在调用方写回 OSS）。
 * AI 调用通过 config.ai_provider 配置（支持 openai / qwen / custom）。
 */

const https = require('https');
const http  = require('http');

// ---------- 任务存储（内存）----------

/** @type {Map<string, AiDesignJob>} */
const jobs = new Map();

/**
 * @typedef {Object} AiDesignJob
 * @property {string}   id
 * @property {string}   req_id
 * @property {string}   prd_url
 * @property {'queued'|'processing'|'needs_confirmation'|'completed'|'failed'} status
 * @property {'fetching_prd'|'decomposing'|'planning'|null} stage
 * @property {string|null}  summary
 * @property {string[]}     pages
 * @property {ModuleItem[]} modules
 * @property {string|null}  last_error
 * @property {string}       created_at
 * @property {string}       updated_at
 */

/**
 * @typedef {Object} ModuleItem
 * @property {string} name
 * @property {string} page
 * @property {string} intent
 * @property {'reuse'|'modify'|'create'} change_type
 * @property {string} notes
 * @property {'pending'|'confirmed'|'skipped'} status
 */

function _now() { return new Date().toISOString(); }

function _newJob(reqId, prdUrl) {
  const id = 'job-' + Date.now() + '-' + Math.random().toString(36).slice(2, 7);
  /** @type {AiDesignJob} */
  const job = {
    id,
    req_id:     reqId,
    prd_url:    prdUrl,
    status:     'queued',
    stage:      null,
    summary:    null,
    pages:      [],
    modules:    [],
    last_error: null,
    created_at: _now(),
    updated_at: _now()
  };
  jobs.set(id, job);
  return job;
}

function _updateJob(job, patch) {
  Object.assign(job, patch, { updated_at: _now() });
}

// ---------- 公开 API ----------

/**
 * 创建并异步执行一个 AI 设计拆解任务
 * @param {string} reqId
 * @param {string} prdUrl
 * @param {object} config  — 来自 config.json
 * @param {object} yuqueSvc — yuque-service 模块引用
 * @returns {AiDesignJob}  — 立即返回（状态为 queued），任务在后台运行
 */
function createJob(reqId, prdUrl, config, yuqueSvc) {
  const job = _newJob(reqId, prdUrl);
  // 异步执行，不阻塞 HTTP 响应
  _runJob(job, config, yuqueSvc).catch((err) => {
    console.error(`[AiDesign] Job ${job.id} uncaught error:`, err.message);
    _updateJob(job, { status: 'failed', stage: null, last_error: err.message });
  });
  return job;
}

function getJob(jobId) {
  return jobs.get(jobId) || null;
}

function retryJob(jobId, config, yuqueSvc) {
  const job = jobs.get(jobId);
  if (!job) return null;
  if (job.status === 'processing') return job; // 已在跑，忽略重复

  _updateJob(job, {
    status:     'queued',
    stage:      null,
    last_error: null,
    summary:    null,
    pages:      [],
    modules:    []
  });

  _runJob(job, config, yuqueSvc).catch((err) => {
    console.error(`[AiDesign] Job ${job.id} retry uncaught error:`, err.message);
    _updateJob(job, { status: 'failed', stage: null, last_error: err.message });
  });

  return job;
}

// ---------- 流水线实现 ----------

function _isMockMode(config) {
  const key = (config.ai_api_key || '').trim();
  return !key || key === 'YOUR_AI_API_KEY_HERE';
}

async function _runJob(job, config, yuqueSvc) {
  const mockMode = _isMockMode(config);
  if (mockMode) {
    console.log(`[AiDesign] Job ${job.id} — MOCK MODE (no ai_api_key configured)`);
    return _runJobMock(job, config, yuqueSvc);
  }

  // Phase 1: 拉取 PRD 正文
  _updateJob(job, { status: 'processing', stage: 'fetching_prd' });
  console.log(`[AiDesign] Job ${job.id} — Phase 1: fetching PRD`);

  let prdContent;
  try {
    prdContent = await yuqueSvc.fetchPrdFull(config, job.prd_url);
  } catch (err) {
    throw new Error('PRD 抓取失败: ' + err.message);
  }

  const bodyText = _stripHtml(prdContent.body || prdContent.description || '');

  // Phase 2: 结构化需求拆解
  _updateJob(job, { stage: 'decomposing' });
  console.log(`[AiDesign] Job ${job.id} — Phase 2: decomposing requirement`);

  let decomposeResult;
  try {
    decomposeResult = await _callAi(config, _buildDecomposePrompt(prdContent.title, bodyText));
  } catch (err) {
    throw new Error('需求拆解失败: ' + err.message);
  }

  const parsed = _parseDecomposeResult(decomposeResult);

  // Phase 3: 设计方案生成
  _updateJob(job, { stage: 'planning' });
  console.log(`[AiDesign] Job ${job.id} — Phase 3: generating design plan`);

  let planResult;
  try {
    planResult = await _callAi(config, _buildPlanPrompt(prdContent.title, bodyText, parsed));
  } catch (err) {
    throw new Error('设计方案生成失败: ' + err.message);
  }

  const modules = _parsePlanResult(planResult, parsed.pages);

  _updateJob(job, {
    status:  'needs_confirmation',
    stage:   null,
    summary: parsed.summary,
    pages:   parsed.pages,
    modules
  });

  console.log(`[AiDesign] Job ${job.id} — Done. ${modules.length} modules identified.`);
}

/**
 * Mock 模式：无需 AI API Key，拉取语雀 PRD 元数据后用规则生成示例结果
 * 让你完整跑通：触发 → 阶段进度 → 结果展示 → 确认/重跑 整条链路
 */
async function _runJobMock(job, config, yuqueSvc) {
  const _sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  // Phase 1: 真实拉取 PRD 元数据（可读 title/description）
  _updateJob(job, { status: 'processing', stage: 'fetching_prd' });
  await _sleep(800);

  let prdTitle = '需求文档';
  let prdDesc  = '';
  const hasYuqueToken = config.yuque_token && config.yuque_token !== 'YOUR_YUQUE_API_TOKEN_HERE';

  if (hasYuqueToken) {
    try {
      const prdContent = await yuqueSvc.fetchPrdFull(config, job.prd_url);
      prdTitle = prdContent.title || prdTitle;
      prdDesc  = prdContent.description || '';
      console.log(`[AiDesign Mock] Fetched PRD title: "${prdTitle}"`);
    } catch (err) {
      console.warn('[AiDesign Mock] Could not fetch PRD, using defaults:', err.message);
    }
  }

  // Phase 2: 模拟需求拆解（基于 title/desc 做简单规则推断）
  _updateJob(job, { stage: 'decomposing' });
  await _sleep(1200);

  const pages   = _inferPagesFromTitle(prdTitle);
  const summary = `【Mock】${prdTitle} — 基于 PRD 标题自动推断，共识别 ${pages.length} 个涉及页面。接入 AI API Key 后将使用真实拆解。`;

  // Phase 3: 模拟模块方案生成
  _updateJob(job, { stage: 'planning' });
  await _sleep(1000);

  const modules = _buildMockModules(pages, prdTitle);

  _updateJob(job, {
    status:  'needs_confirmation',
    stage:   null,
    summary,
    pages,
    modules
  });

  console.log(`[AiDesign Mock] Job ${job.id} — Done (mock). ${modules.length} modules.`);
}

/** 根据 PRD 标题关键词推断涉及页面 */
function _inferPagesFromTitle(title) {
  const rules = [
    { keywords: ['首页', 'home', '搜索', 'search'], page: '首页' },
    { keywords: ['listing', '列表', '搜索结果', '搜索列表'], page: '列表页' },
    { keywords: ['下单', '预订', 'booking', '填写'], page: '下单页' },
    { keywords: ['订单', 'order', '详情', '售后'], page: '订单详情页' },
    { keywords: ['支付', 'pay', '收银'], page: '支付页' },
    { keywords: ['个人中心', '我的', 'profile'], page: '个人中心' },
    { keywords: ['弹窗', 'modal', '浮层', '引流'], page: '弹窗/浮层' },
  ];
  const lower   = title.toLowerCase();
  const matched = rules.filter((r) => r.keywords.some((k) => lower.includes(k))).map((r) => r.page);
  return matched.length ? matched : ['首页', '列表页'];
}

/** 为每个页面生成示例模块 */
function _buildMockModules(pages, prdTitle) {
  const templatesByPage = {
    '首页':      [
      { name: '搜索入口模块', intent: '优化用户搜索起点的交互体验，提升首屏点击率', change_type: 'modify', notes: '注意与首屏氛围图的层叠关系，搜索框需固定在视口上方' },
      { name: '营销 Banner 模块', intent: '承载活动运营内容，提升活动曝光', change_type: 'create', notes: '图片比例建议 16:5，支持多图轮播，自动播放间隔 3s' },
    ],
    '列表页':    [
      { name: '结果列表卡片', intent: '清晰展示搜索结果，帮助用户快速比价决策', change_type: 'modify', notes: '价格信息视觉权重最高，航班时刻与时长次之' },
      { name: '筛选/排序栏', intent: '让用户快速过滤到目标结果', change_type: 'reuse', notes: '复用现有筛选组件，本次只调整默认排序逻辑' },
    ],
    '下单页':    [
      { name: '乘客信息模块', intent: '引导用户快速填写乘客信息，减少流失', change_type: 'modify', notes: '自动填入历史乘客，名字超长时省略号处理' },
      { name: '价格明细模块', intent: '透明展示费用构成，增强用户信任', change_type: 'reuse', notes: '直接复用现有价格明细组件，无需改动' },
      { name: '附加产品推荐', intent: '提升辅营商品转化', change_type: 'create', notes: '本次 PRD 核心新增模块，需与产品确认推荐逻辑与坑位数量' },
    ],
    '订单详情页': [
      { name: '订单状态头部', intent: '第一时间让用户了解订单当前状态', change_type: 'modify', notes: '状态文案需覆盖：待支付 / 待出票 / 已出票 / 已取消 / 售后中' },
      { name: '快捷操作按钮组', intent: '减少用户查找操作路径的成本', change_type: 'modify', notes: '本次新增"改期"入口，需评估与退票按钮的视觉优先级' },
    ],
    '支付页':    [
      { name: '支付方式选择', intent: '引导用户完成支付，减少放弃率', change_type: 'modify', notes: '本次新增花呗分期入口' },
    ],
    '个人中心':  [
      { name: '我的订单入口', intent: '快速跳转到订单管理', change_type: 'reuse', notes: '无改动，直接复用' },
    ],
    '弹窗/浮层': [
      { name: '引流弹窗', intent: '在用户行为节点触发引流，提升跨产品转化', change_type: 'create', notes: '触发时机与展示频次需与产品确认，避免影响正向转化' },
    ],
  };

  const modules = [];
  pages.forEach((page) => {
    const templates = templatesByPage[page] || [
      { name: `${page} — 主体内容模块`, intent: `承载 ${prdTitle} 的核心需求改动`, change_type: 'modify', notes: 'Mock 模式下无法精确拆解，接入 AI Key 后将自动生成详细方案' }
    ];
    templates.forEach((t) => {
      modules.push({ ...t, page, status: 'pending' });
    });
  });
  return modules;
}

// ---------- Prompt 构建 ----------

function _buildDecomposePrompt(title, bodyText) {
  return [
    {
      role: 'system',
      content: `你是资深 UX 设计师，专注于移动端电商/旅行类 App。
你的任务是把产品经理的 PRD 文档拆解成可执行的设计任务清单。
**必须用 JSON 格式输出，不要添加任何 Markdown 代码块标记，直接输出 JSON 对象。**`
    },
    {
      role: 'user',
      content: `请分析以下 PRD，输出 JSON 对象，包含：
- summary: 字符串，一句话说明核心诉求（≤80字）
- pages: 字符串数组，涉及的页面名称列表（如"首页"、"列表页"、"下单页"等）

PRD 标题：${title}

PRD 正文（可能是 HTML/Markdown 格式）：
${bodyText.slice(0, 6000)}

直接输出 JSON，不要有任何其他内容。示例：
{"summary":"优化机票搜索体验，新增低价日历模块","pages":["首页","列表页"]}`
    }
  ];
}

function _buildPlanPrompt(title, bodyText, decomposed) {
  return [
    {
      role: 'system',
      content: `你是资深 UX 设计师，专注于移动端电商/旅行类 App。
你的任务是为每个涉及的页面拆解出具体的 UI 模块，并给出设计意图与建议处理方式。
**必须用 JSON 格式输出，不要添加任何 Markdown 代码块标记，直接输出 JSON 数组。**`
    },
    {
      role: 'user',
      content: `需求摘要：${decomposed.summary}
涉及页面：${decomposed.pages.join('、')}

PRD 标题：${title}
PRD 正文：
${bodyText.slice(0, 5000)}

请为每个页面拆解出需要新增或修改的 UI 模块，输出 JSON 数组，每项包含：
- name: 模块名称（如"低价日历模块"）
- page: 所属页面
- intent: 设计意图（≤60字，说明这个模块要解决什么问题）
- change_type: "create"（新建）/ "modify"（改现有）/ "reuse"（直接复用，无需改动）
- notes: 给设计师的备注（≤100字，注意事项、参考方向、数据依赖等）

直接输出 JSON 数组，不要有任何其他内容。`
    }
  ];
}

// ---------- AI 调用 ----------

async function _callAi(config, messages) {
  const provider = (config.ai_provider || 'openai').toLowerCase();

  if (provider === 'qwen' || provider === 'dashscope') {
    return _callQwen(config, messages);
  }
  // 默认 OpenAI 兼容接口
  return _callOpenAiCompat(config, messages);
}

function _callOpenAiCompat(config, messages) {
  const apiBase = config.ai_api_base || 'https://api.openai.com';
  const apiKey  = config.ai_api_key  || '';
  const model   = config.ai_model    || 'gpt-4o-mini';

  const body = JSON.stringify({ model, messages, temperature: 0.3, max_tokens: 2000 });

  return _httpsPost(`${apiBase}/v1/chat/completions`, {
    'Authorization': `Bearer ${apiKey}`,
    'Content-Type':  'application/json'
  }, body).then((resp) => {
    const choice = resp.choices && resp.choices[0];
    if (!choice) throw new Error('AI 返回内容为空');
    return choice.message.content;
  });
}

function _callQwen(config, messages) {
  const apiKey = config.ai_api_key || '';
  const model  = config.ai_model   || 'qwen-plus';

  const body = JSON.stringify({
    model,
    input: { messages },
    parameters: { result_format: 'message', temperature: 0.3, max_tokens: 2000 }
  });

  return _httpsPost('https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation', {
    'Authorization': `Bearer ${apiKey}`,
    'Content-Type':  'application/json'
  }, body).then((resp) => {
    const choice = resp.output && resp.output.choices && resp.output.choices[0];
    if (!choice) throw new Error('Qwen 返回内容为空');
    return choice.message.content;
  });
}

function _httpsPost(url, headers, body) {
  return new Promise((resolve, reject) => {
    const parsed   = new URL(url);
    const isHttps  = parsed.protocol === 'https:';
    const lib      = isHttps ? https : http;
    const options  = {
      hostname: parsed.hostname,
      port:     parsed.port || (isHttps ? 443 : 80),
      path:     parsed.pathname + parsed.search,
      method:   'POST',
      headers:  { ...headers, 'Content-Length': Buffer.byteLength(body) }
    };

    const req = lib.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (res.statusCode < 200 || res.statusCode >= 300) {
            reject(new Error(`AI API ${res.statusCode}: ${json.error?.message || data.slice(0, 200)}`));
            return;
          }
          resolve(json);
        } catch (err) {
          reject(new Error('Failed to parse AI response: ' + err.message));
        }
      });
    });

    req.on('error', (err) => reject(new Error('AI request failed: ' + err.message)));
    req.setTimeout(60000, () => { req.destroy(); reject(new Error('AI request timed out (60s)')); });
    req.write(body);
    req.end();
  });
}

// ---------- 结果解析 ----------

function _parseDecomposeResult(text) {
  try {
    // 去掉可能包裹的 Markdown 代码块
    const clean = text.replace(/```json|```/g, '').trim();
    const obj   = JSON.parse(clean);
    return {
      summary: String(obj.summary || '').slice(0, 200),
      pages:   Array.isArray(obj.pages) ? obj.pages.map(String) : []
    };
  } catch {
    // 降级：从文本里抽取一些有用信息
    return { summary: text.slice(0, 200), pages: [] };
  }
}

function _parsePlanResult(text, pages) {
  try {
    const clean = text.replace(/```json|```/g, '').trim();
    const arr   = JSON.parse(clean);
    if (!Array.isArray(arr)) return _fallbackModules(pages);

    return arr.map((item) => ({
      name:        String(item.name        || '未命名模块').slice(0, 60),
      page:        String(item.page        || '').slice(0, 40),
      intent:      String(item.intent      || '').slice(0, 200),
      change_type: ['create', 'modify', 'reuse'].includes(item.change_type) ? item.change_type : 'create',
      notes:       String(item.notes       || '').slice(0, 400),
      status:      'pending'
    }));
  } catch {
    return _fallbackModules(pages);
  }
}

function _fallbackModules(pages) {
  return pages.map((page) => ({
    name:        `${page} — 待进一步拆解`,
    page,
    intent:      'AI 无法自动拆解，请手工补充模块意图',
    change_type: 'create',
    notes:       '自动拆解失败，建议重跑或手动填写模块清单',
    status:      'pending'
  }));
}

// ---------- 工具函数 ----------

function _stripHtml(html) {
  return html
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

module.exports = { createJob, getJob, retryJob };
