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
 * AI 调用支持按阶段配置：
 * - 默认阶段（planning）：config.ai_*
 * - PRD 拆解阶段（decomposing）：优先 config.ai_decompose_*，缺省回退 config.ai_*
 */

const https  = require('https');
const http   = require('http');
const crypto = require('crypto');

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
 * @property {string}       skill_key — 'default' | 'prd_html_decompose'
 */

/**
 * @typedef {Object} ModuleItem
 * @property {string} name
 * @property {string} page
 * @property {string} intent
 * @property {'reuse'|'modify'|'create'} change_type
 * @property {string} notes
 * @property {string} [html_brief] — 供单文件 HTML 生成用的分条要点（可选）
 * @property {'pending'|'confirmed'|'skipped'} status
 */

function _now() { return new Date().toISOString(); }

function _newJob(reqId, prdUrl, skillKey) {
  const id = 'job-' + Date.now() + '-' + Math.random().toString(36).slice(2, 7);
  /** @type {AiDesignJob} */
  const job = {
    id,
    req_id:     reqId,
    prd_url:    prdUrl,
    skill_key:  skillKey || 'default',
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
 * @param {{ skillKey?: string }} [opts]
 * @returns {AiDesignJob}  — 立即返回（状态为 queued），任务在后台运行
 */
function createJob(reqId, prdUrl, config, yuqueSvc, opts) {
  const skillKey = (opts && opts.skillKey) || 'default';
  const job = _newJob(reqId, prdUrl, skillKey);
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

function _normalizeKey(value) {
  const key = String(value || '').trim();
  if (!key || key === 'YOUR_AI_API_KEY_HERE') return '';
  return key;
}

function _isMockMode(config) {
  const defaultKey = _normalizeKey(config.ai_api_key);
  const decomposeKey = _normalizeKey(config.ai_decompose_api_key);
  return !defaultKey && !decomposeKey;
}

function _resolveStageAiConfig(config, stage) {
  const isDecompose = stage === 'decomposing';
  const providerRaw = isDecompose
    ? (config.ai_decompose_provider || config.ai_provider || 'openai')
    : (config.ai_provider || 'openai');
  const provider = String(providerRaw || 'openai').toLowerCase();

  const model = isDecompose
    ? (config.ai_decompose_model || config.ai_model || (provider === 'qwen' || provider === 'dashscope' ? 'qwen-plus' : 'gpt-4o-mini'))
    : (config.ai_model || (provider === 'qwen' || provider === 'dashscope' ? 'qwen-plus' : 'gpt-4o-mini'));

  const apiKey = isDecompose
    ? (_normalizeKey(config.ai_decompose_api_key) || _normalizeKey(config.ai_api_key))
    : _normalizeKey(config.ai_api_key);

  const apiBase = isDecompose
    ? (config.ai_decompose_api_base || config.ai_api_base || 'https://api.openai.com')
    : (config.ai_api_base || 'https://api.openai.com');

  const decomposeMaxImagesRaw = Number(config.ai_decompose_max_images);
  const decomposeMaxImages = Number.isFinite(decomposeMaxImagesRaw) && decomposeMaxImagesRaw > 0
    ? Math.min(Math.floor(decomposeMaxImagesRaw), 20)
    : 8;

  const visionEnabled = isDecompose && provider === 'openai';

  return { provider, model, apiKey, apiBase, stage, visionEnabled, decomposeMaxImages };
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
    // fliggy_flight_prd_to_h5 skill 降级：PRD 无法抓取时，用需求 ID 和 URL 作为最小上下文继续生成 H5
    // 降级：任何 skill 下语雀抓取失败，均用 PRD 链接作为最小上下文继续生成
    console.warn(`[AiDesign] Job ${job.id} — PRD fetch failed, falling back to minimal context: ${err.message}`);
    prdContent = {
      title:       `需求 ${job.req_id}`,
      creator:     'Unknown',
      description: `PRD 链接：${job.prd_url}\n\n注意：PRD 文档无法自动抓取（${err.message}），以下方案基于需求 ID 和设计规范生成，请人工核对业务细节。`,
      body:        `PRD 链接：${job.prd_url}\n\nPRD 文档无法自动抓取，原因：${err.message}`,
      body_text:   `PRD 链接：${job.prd_url}\n\nPRD 文档无法自动抓取，原因：${err.message}`,
      imageUrls:   [],
      source:      'fallback'
    };
  }

  const rawBody = prdContent.body || prdContent.description || '';
  const bodyText = prdContent.source === 'fallback' ? prdContent.body_text : _stripHtml(rawBody);
  const imageUrls = prdContent.source === 'fallback' ? [] : _extractImageUrls(rawBody);

  // Phase 2: 结构化需求拆解
  _updateJob(job, { stage: 'decomposing' });
  console.log(`[AiDesign] Job ${job.id} — Phase 2: decomposing requirement`);

  const decomposeAiConfig = _resolveStageAiConfig(config, 'decomposing');
  console.log(`[AiDesign] Job ${job.id} — Decompose model: ${decomposeAiConfig.provider}/${decomposeAiConfig.model}`);
  if (imageUrls.length) {
    console.log(`[AiDesign] Job ${job.id} — PRD images detected: ${imageUrls.length}`);
  }

  let decomposeResult;
  try {
    decomposeResult = await _callAi(
      decomposeAiConfig,
      _buildDecomposePrompt(prdContent.title, bodyText, job.skill_key, imageUrls, decomposeAiConfig)
    );
  } catch (err) {
    throw new Error('需求拆解失败: ' + err.message);
  }

  const parsed = _parseDecomposeResult(decomposeResult);

  // Phase 3: 设计方案生成
  _updateJob(job, { stage: 'planning' });
  console.log(`[AiDesign] Job ${job.id} — Phase 3: generating design plan`);

  const planAiConfig = _resolveStageAiConfig(config, 'planning');
  console.log(`[AiDesign] Job ${job.id} — Plan model: ${planAiConfig.provider}/${planAiConfig.model}`);

  let planResult;
  try {
    planResult = await _callAi(planAiConfig, _buildPlanPrompt(prdContent.title, bodyText, parsed, job.skill_key));
  } catch (err) {
    throw new Error('设计方案生成失败: ' + err.message);
  }

  const modules = _parsePlanResult(planResult, parsed.pages, job.skill_key);

  // Phase 4 (H5 生成) 移至 confirmJob，等用户确认方案后再触发
  _updateJob(job, {
    status:           'needs_confirmation',
    stage:            null,
    summary:          parsed.summary,
    pages:            parsed.pages,
    modules,
    prd_title:        prdContent.title,
    prd_body_text:    bodyText,
    html_output_path: null
  });

  console.log(`[AiDesign] Job ${job.id} — Done. ${modules.length} modules identified. Awaiting confirmation.`);
}

// ---------- H5 生成（确认方案后触发）----------

/**
 * 确认方案并触发 H5 生成
 * 用户点击「确认方案」后调用，异步生成 H5 文件
 */
function confirmJob(jobId, config, yuqueSvc) {
  const job = jobs.get(jobId);
  if (!job) return null;
  if (job.status !== 'needs_confirmation') return job;

  // 标记模块为已确认
  if (job.modules) {
    job.modules.forEach(m => { m.status = 'confirmed'; });
  }

  // 异步触发 H5 生成
  _updateJob(job, { status: 'processing', stage: 'generating_h5' });
  _runH5Generation(job, config, yuqueSvc).catch(err => {
    console.error(`[AiDesign] Job ${job.id} H5 generation error:`, err.message);
    _updateJob(job, { status: 'failed', stage: null, last_error: 'H5 生成失败: ' + err.message });
  });

  return job;
}

async function _runH5Generation(job, config, yuqueSvc) {
  console.log(`[AiDesign] Job ${job.id} — Phase 4: generating H5 (post-confirm)`);

  // 如果 prd_body_text 不在 job 里（旧 Job），尝试重新拉取
  let bodyText = job.prd_body_text || '';
  let prdTitle = job.prd_title || '';
  if (!bodyText && job.prd_url) {
    try {
      const prdContent = await yuqueSvc.fetchPrdFull(config, job.prd_url);
      bodyText = prdContent.body_text || prdContent.body || '';
      prdTitle = prdContent.title || '';
    } catch (err) {
      console.warn(`[AiDesign] Job ${job.id} — PRD re-fetch failed: ${err.message}`);
    }
  }

  const h5AiConfig = _resolveStageAiConfig(config, 'planning');
  console.log(`[AiDesign] Job ${job.id} — H5 model: ${h5AiConfig.provider}/${h5AiConfig.model}`);

  const h5Result = await _callAi(h5AiConfig, _buildH5Prompt(prdTitle, bodyText, {
    summary: job.summary,
    pages: job.pages
  }, job.modules));

  const htmlOutputPath = await _saveH5Output(job.id, h5Result);
  console.log(`[AiDesign] Job ${job.id} — H5 saved to: ${htmlOutputPath}`);

  _updateJob(job, {
    status: 'completed',
    stage: null,
    html_output_path: htmlOutputPath
  });
}

const FLIGGY_FLIGHT_H5_SYSTEM = `你是飞猪机票资深 UX 工程师，负责根据 PRD 拆解结果生成严格符合飞猪设计规范的移动端 H5 页面。

=== 格式硬约束（违反任何一条即为不合格）===

1. 文件形态：单文件 .html，样式仅内联 <style>，禁止外链 CSS 和 JS
2. 视口（强制）：<meta name="viewport" content="width=750, user-scalable=no">
3. Design Token（强制）：
   - 颜色、圆角等一律通过 var(--token-name) 引用
   - :root 中集中定义所有 token，hex 仅出现在 :root
   - 品牌色 var(--color-indigo-1) #FF6600：仅用于按钮文字、链接，禁止大面积铺底
4. 布局与间距：
   - 页面水平边距：30px
   - 间距体系：6 的倍数（6/12/18/24/30/36/42/48px）
   - 主内容纵向 flex，禁止 position:absolute 做纵向排版
   - 相邻模块垂直空白不超过 24px
5. 字体层级（基于 750px 设计稿）：
   - 大标题：36px/700
   - 标题：32px/600 或 28px/600
   - 正文：26px/400
   - 辅助：22px/400
   - 说明：20px/400
6. 图片：使用 Unsplash 真实图 + 尺寸参数，禁止纯色大块占位
   - URL 模板：https://images.unsplash.com/photo-{ID}?w={w}&h={h}&fit=crop
7. 类名前缀：fdl-*
8. 卡片规范：
   - 白底卡片仅用于固定组件（交通卡、商品卡、下单卡等）
   - Markdown 说明性文本铺在 #F7F8FA 背景上，禁止用白底卡片包一层
9. 颜色体系：
   - 主色/品牌色：#FF6600（橙）
   - 辅助蓝：#1677FF
   - 背景色：#F7F8FA
   - 卡片白：#FFFFFF
   - 价格色：#FF4D00
   - 成功色：#00B578
   - 文字色：#1A1A1A / #333333 / #666666 / #999999

=== 输出要求 ===

只输出完整可运行的 HTML 代码。
不要任何解释文字、Markdown 代码块标记（如 \`\`\`html）。
不要输出 "以下是..." 等前缀说明。
直接以 <!DOCTYPE html> 开头。`;

function _buildH5Prompt(title, bodyText, decomposed, modules) {
  const pageList = (decomposed.pages || []).join('、') || '首页';
  const moduleList = (modules || []).map((m) =>
    `- ${m.name}（${m.page || ''}，${m.change_type || 'create'}）：${m.intent || ''}${m.notes ? '；备注：' + m.notes : ''}`
  ).join('\n');

  return [
    { role: 'system', content: FLIGGY_FLIGHT_H5_SYSTEM },
    {
      role: 'user',
      content: `请根据以下飞猪机票需求拆解结果，生成一个完整的移动端 H5 页面。

## PRD 信息
- 标题：${title}
- 需求摘要：${decomposed.summary || ''}
- 涉及页面：${pageList}

## 已确认的模块清单
${moduleList}

## PRD 正文
${(bodyText || '').slice(0, 6000)}

## 生成要求
1. 以第一个页面为主体，完整还原 PRD 中描述的所有模块和交互
2. 包含完整的页面结构：顶部导航栏、主要业务模块、底部操作区
3. 所有文案必须使用 PRD 中的真实业务内容（如站名、车次、价格等），禁止用占位文字
4. 弹窗/浮层类模块：默认隐藏，提供触发按钮可交互展示
5. 必须包含完整的 :root token 定义（颜色、圆角、阴影等）
6. 使用 Unsplash 真实图片，禁止纯色占位
7. 直接输出完整 HTML，以 <!DOCTYPE html> 开头`
    }
  ];
}

async function _saveH5Output(jobId, h5Content) {
  const fsModule   = require('fs');
  const pathModule = require('path');

  let html = h5Content || '';
  const fenceMatch = html.match(/```(?:html)?\s*([\s\S]+?)```/i);
  if (fenceMatch) html = fenceMatch[1].trim();

  // 输出到 pages/ 目录，方便直接预览
  const outputDir = pathModule.join(__dirname, '..', 'pages');
  fsModule.mkdirSync(outputDir, { recursive: true });

  const fileName = `${jobId}.html`;
  const filePath = pathModule.join(outputDir, fileName);
  fsModule.writeFileSync(filePath, html, 'utf8');

  return pathModule.join('pages', fileName);
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

  const modules = _buildMockModules(pages, prdTitle, job.skill_key);

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
function _buildMockModules(pages, prdTitle, skillKey) {
  const htmlSkill = skillKey === 'prd_html_decompose';
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
      const row = { ...t, page, status: 'pending' };
      if (htmlSkill) {
        row.html_brief = [
          '1. 页面标题与面包屑占位',
          '2. 主内容区：' + (t.name || '模块') + ' 的布局骨架（区块标题 + 正文/列表）',
          '3. 关键交互：按钮/链接的文案占位与禁用态说明',
          '4. 空态与加载态各一句占位说明'
        ].join('\n');
      }
      modules.push(row);
    });
  });
  return modules;
}

// ---------- Prompt 构建 ----------

const PRD_HTML_SKILL_USER_LINE = '帮我将上传的prd文档拆解成能够生成html的分条信息';

function _buildDecomposePrompt(title, bodyText, skillKey, imageUrls, aiConfig) {
  const htmlSkill = skillKey === 'prd_html_decompose';
  const systemBase = htmlSkill
    ? `你是资深前端信息架构师，专注于把 PRD 拆成「可逐条喂给 HTML 单页生成器」的结构化输入。
用户意图（必须对齐）：${PRD_HTML_SKILL_USER_LINE}
你的输出要便于后续为每个页面/模块生成独立或组合的静态 HTML 草稿（含区块标题、列表、表单占位、状态说明）。
**必须用 JSON 格式输出，不要添加任何 Markdown 代码块标记，直接输出 JSON 对象。**`
    : `你是资深 UX 设计师，专注于移动端电商/旅行类 App。
你的任务是把产品经理的 PRD 文档拆解成可执行的设计任务清单。
**必须用 JSON 格式输出，不要添加任何 Markdown 代码块标记，直接输出 JSON 对象。**`;

  const userExtra = htmlSkill
    ? `\n注意：pages 尽量拆到「一个 URL/一个主界面」粒度，便于每个页面对应一份 HTML 说明。`
    : '';

  const decomposeMaxImages = Number.isInteger(aiConfig && aiConfig.decomposeMaxImages) && aiConfig.decomposeMaxImages > 0
    ? aiConfig.decomposeMaxImages
    : 8;
  const visionEnabled = Boolean(aiConfig && aiConfig.visionEnabled);
  const finalImageUrls = Array.isArray(imageUrls) ? imageUrls.slice(0, decomposeMaxImages) : [];

  const userText = `请分析以下 PRD，输出 JSON 对象，包含：
- summary: 字符串，一句话说明核心诉求（≤80字）
- pages: 字符串数组，涉及的页面名称列表（如"首页"、"列表页"、"下单页"等）
${userExtra}

PRD 标题：${title}

PRD 正文（可能是 HTML/Markdown 格式）：
${bodyText.slice(0, 6000)}
${finalImageUrls.length ? `\n\n图片理解要求：以下图片属于 PRD 内容，请结合图片信息完成拆解。若图片与正文冲突，以图片中真实 UI/信息结构为准并在总结里体现。` : ''}

直接输出 JSON，不要有任何其他内容。示例：
{"summary":"优化机票搜索体验，新增低价日历模块","pages":["首页","列表页"]}`;

  return [
    { role: 'system', content: systemBase },
    {
      role: 'user',
      content: _buildVisionUserContent(userText, finalImageUrls, visionEnabled)
    }
  ];
}

function _buildPlanPrompt(title, bodyText, decomposed, skillKey) {
  const htmlSkill = skillKey === 'prd_html_decompose';
  const systemBase = htmlSkill
    ? `你是资深前端信息架构师。用户已通过技能触发语请求拆解：${PRD_HTML_SKILL_USER_LINE}
为每个模块输出「可直接用于编写单文件 HTML」的分条信息：区块结构、必备文案占位、主要交互与状态（含空态/错误态若 PRD 有提）。
**必须用 JSON 格式输出，不要添加任何 Markdown 代码块标记，直接输出 JSON 数组。**`
    : `你是资深 UX 设计师，专注于移动端电商/旅行类 App。
你的任务是为每个涉及的页面拆解出具体的 UI 模块，并给出设计意图与建议处理方式。
**必须用 JSON 格式输出，不要添加任何 Markdown 代码块标记，直接输出 JSON 数组。**`;

  const fieldsHtml = htmlSkill
    ? `请为每个页面拆解出需要新增或修改的 UI 模块，输出 JSON 数组，每项包含：
- name: 模块名称（如"低价日历模块"）
- page: 所属页面
- intent: 该模块在 PRD 中的目标（≤60字）
- change_type: "create" / "modify" / "reuse"
- notes: 设计与数据依赖备注（≤100字）
- html_brief: 字符串，使用多行文本，每行一条，至少 4 条；每条对应生成 HTML 时要覆盖的一块信息（例如：「区块：标题栏」「列表：字段 A/B/C」「按钮：主操作文案占位」「状态：加载中骨架」）。不要输出完整 HTML 代码，只输出结构化要点。`
    : `请为每个页面拆解出需要新增或修改的 UI 模块，输出 JSON 数组，每项包含：
- name: 模块名称（如"低价日历模块"）
- page: 所属页面
- intent: 设计意图（≤60字，说明这个模块要解决什么问题）
- change_type: "create"（新建）/ "modify"（改现有）/ "reuse"（直接复用，无需改动）
- notes: 给设计师的备注（≤100字，注意事项、参考方向、数据依赖等）`;

  return [
    { role: 'system', content: systemBase },
    {
      role: 'user',
      content: `需求摘要：${decomposed.summary}
涉及页面：${decomposed.pages.join('、')}

PRD 标题：${title}
PRD 正文：
${bodyText.slice(0, 5000)}

${fieldsHtml}

直接输出 JSON 数组，不要有任何其他内容。`
    }
  ];
}

// ---------- AI 调用 ----------

async function _callAi(aiConfig, messages) {
  const provider = (aiConfig.provider || 'openai').toLowerCase();

  if (provider === 'qwen' || provider === 'dashscope') {
    return _callQwen(aiConfig, messages);
  }
  // 默认 OpenAI 兼容接口
  return _callOpenAiCompat(aiConfig, messages);
}

function _callOpenAiCompat(aiConfig, messages) {
  const apiBase = aiConfig.apiBase || 'https://api.openai.com';
  const apiKey  = aiConfig.apiKey  || '';
  const model   = aiConfig.model   || 'gpt-4o-mini';

  const body = JSON.stringify({ model, messages, temperature: 0.3, max_tokens: 4096 });

  console.log(`[AiDesign] _callOpenAiCompat → model=${model}, apiBase=${apiBase}, bodyLen=${body.length}`);

  return _httpsPost(`${apiBase}/v1/chat/completions`, {
    'Authorization': `Bearer ${apiKey}`,
    'Content-Type':  'application/json'
  }, body, 120000).then((resp) => {
    console.log(`[AiDesign] _callOpenAiCompat ← resp keys: ${Object.keys(resp).join(',')}`);
    if (resp.error) {
      console.error(`[AiDesign] _callOpenAiCompat API error:`, JSON.stringify(resp.error).slice(0, 500));
      throw new Error(`AI API error: ${resp.error.message || JSON.stringify(resp.error).slice(0, 200)}`);
    }
    const choice = resp.choices && resp.choices[0];
    if (!choice) {
      console.error(`[AiDesign] _callOpenAiCompat — no choices in response:`, JSON.stringify(resp).slice(0, 500));
      throw new Error('AI 返回内容为空 (no choices)');
    }
    const content = choice.message && choice.message.content;
    if (!content) {
      console.error(`[AiDesign] _callOpenAiCompat — empty content, choice:`, JSON.stringify(choice).slice(0, 500));
      throw new Error('AI 返回内容为空 (empty content)');
    }
    console.log(`[AiDesign] _callOpenAiCompat ← content length: ${content.length}`);
    return content;
  });
}

function _callQwen(aiConfig, messages) {
  const apiKey = aiConfig.apiKey || '';
  const model  = aiConfig.model  || 'qwen-plus';

  const body = JSON.stringify({
    model,
    input: { messages },
    parameters: { result_format: 'message', temperature: 0.3, max_tokens: 4096 }
  });

  console.log(`[AiDesign] _callQwen → model=${model}, bodyLen=${body.length}`);

  return _httpsPost('https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation', {
    'Authorization': `Bearer ${apiKey}`,
    'Content-Type':  'application/json'
  }, body, 120000).then((resp) => {
    console.log(`[AiDesign] _callQwen ← resp keys: ${Object.keys(resp).join(',')}`);
    const choice = resp.output && resp.output.choices && resp.output.choices[0];
    if (!choice) {
      console.error(`[AiDesign] _callQwen — no choices:`, JSON.stringify(resp).slice(0, 500));
      throw new Error('Qwen 返回内容为空');
    }
    const content = choice.message && choice.message.content;
    console.log(`[AiDesign] _callQwen ← content length: ${(content || '').length}`);
    return content;
  });
}

function _buildVisionUserContent(text, imageUrls, visionEnabled) {
  if (!visionEnabled || !Array.isArray(imageUrls) || imageUrls.length === 0) {
    return text;
  }
  const content = [{ type: 'text', text }];
  imageUrls.forEach((url) => {
    content.push({
      type: 'image_url',
      image_url: { url }
    });
  });
  return content;
}

function _httpsPost(url, headers, body, timeoutMs) {
  const timeout = timeoutMs || 120000;
  return new Promise((resolve, reject) => {
    const parsed   = new URL(url);
    const isHttps  = parsed.protocol === 'https:';
    const lib      = isHttps ? https : http;
    const options  = {
      hostname:         parsed.hostname,
      port:             parsed.port || (isHttps ? 443 : 80),
      path:             parsed.pathname + parsed.search,
      method:           'POST',
      headers:          { ...headers, 'Content-Length': Buffer.byteLength(body) },
      rejectUnauthorized: false,
      secureOptions:    crypto.constants.SSL_OP_LEGACY_SERVER_CONNECT
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
          reject(new Error('Failed to parse AI response: ' + data.slice(0, 300)));
        }
      });
    });

    req.on('error', (err) => reject(new Error('AI request failed: ' + err.message)));
    req.setTimeout(timeout, () => { req.destroy(); reject(new Error(`AI request timed out (${timeout / 1000}s)`)); });
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

function _parsePlanResult(text, pages, skillKey) {
  try {
    const clean = text.replace(/```json|```/g, '').trim();
    const arr   = JSON.parse(clean);
    if (!Array.isArray(arr)) return _fallbackModules(pages, skillKey);

    return arr.map((item) => {
      const row = {
        name:        String(item.name        || '未命名模块').slice(0, 60),
        page:        String(item.page        || '').slice(0, 40),
        intent:      String(item.intent      || '').slice(0, 200),
        change_type: ['create', 'modify', 'reuse'].includes(item.change_type) ? item.change_type : 'create',
        notes:       String(item.notes       || '').slice(0, 400),
        status:      'pending'
      };
      if (item.html_brief != null && String(item.html_brief).trim()) {
        row.html_brief = String(item.html_brief).slice(0, 4000);
      }
      return row;
    });
  } catch {
    return _fallbackModules(pages, skillKey);
  }
}

function _fallbackModules(pages, skillKey) {
  const htmlSkill = skillKey === 'prd_html_decompose';
  return pages.map((page) => {
    const row = {
      name:        `${page} — 待进一步拆解`,
      page,
      intent:      'AI 无法自动拆解，请手工补充模块意图',
      change_type: 'create',
      notes:       '自动拆解失败，建议重跑或手动填写模块清单',
      status:      'pending'
    };
    if (htmlSkill) {
      row.html_brief = '1. 页面根容器与主标题\n2. 主内容占位\n3. 主操作按钮占位\n4. 加载/空态说明占位';
    }
    return row;
  });
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

function _extractImageUrls(rawBody) {
  const source = String(rawBody || '');
  if (!source.trim()) return [];

  const found = new Set();

  // HTML: <img src="...">
  const imgSrcRegex = /<img[^>]+src=["']([^"']+)["']/gi;
  let matchImg;
  while ((matchImg = imgSrcRegex.exec(source)) !== null) {
    const normalized = _normalizeImageUrl(matchImg[1]);
    if (normalized) found.add(normalized);
  }

  // Markdown: ![alt](url)
  const mdImgRegex = /!\[[^\]]*\]\((https?:\/\/[^)\s]+)\)/gi;
  let matchMd;
  while ((matchMd = mdImgRegex.exec(source)) !== null) {
    const normalized = _normalizeImageUrl(matchMd[1]);
    if (normalized) found.add(normalized);
  }

  // Generic URL scan
  const urlRegex = /https?:\/\/[^\s"'<>\\]+/gi;
  let matchUrl;
  while ((matchUrl = urlRegex.exec(source)) !== null) {
    const normalized = _normalizeImageUrl(matchUrl[0]);
    if (normalized && _looksLikeImageUrl(normalized)) found.add(normalized);
  }

  return Array.from(found);
}

function _normalizeImageUrl(url) {
  const raw = String(url || '').trim();
  if (!raw) return '';
  if (raw.startsWith('//')) return 'https:' + raw;
  if (!/^https?:\/\//i.test(raw)) return '';
  return raw;
}

function _looksLikeImageUrl(url) {
  const lower = String(url || '').toLowerCase();
  if (!lower) return false;
  if (/\.(png|jpe?g|gif|webp|bmp|svg)(\?|$)/.test(lower)) return true;
  if (lower.includes('/yuque') || lower.includes('alicdn.com') || lower.includes('aliyuncs.com')) return true;
  return false;
}

module.exports = { createJob, getJob, retryJob, confirmJob };
