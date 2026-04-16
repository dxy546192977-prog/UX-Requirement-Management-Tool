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

async function _runJob(job, config, yuqueSvc) {
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
