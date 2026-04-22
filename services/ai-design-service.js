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
const fs     = require('fs');
const path   = require('path');

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

  let modules = _parsePlanResult(planResult, parsed.pages, job.skill_key);

  // Phase 3.5: Gstack + awesome-design 四维审查
  _updateJob(job, { stage: 'reviewing' });
  console.log(`[AiDesign] Job ${job.id} — Phase 3.5: Gstack + awesome-design review`);

  const reviewAiConfig = _resolveStageAiConfig(config, 'planning');
  console.log(`[AiDesign] Job ${job.id} — Review model: ${reviewAiConfig.provider}/${reviewAiConfig.model}`);

  let reviewResult;
  try {
    const reviewText = await _callAi(reviewAiConfig, _buildGstackReviewPrompt(prdContent.title, bodyText, parsed, modules));
    reviewResult = _parseReviewResult(reviewText, modules);
    modules = reviewResult.modules;
    console.log(`[AiDesign] Job ${job.id} — Review done: ${reviewResult.overall_gate_result}, ${modules.length} modules reviewed`);
  } catch (err) {
    console.warn(`[AiDesign] Job ${job.id} — Review failed (non-blocking): ${err.message}`);
    // 审查失败不阻断流程，给每个模块默认 PASS
    modules.forEach(m => {
      m.review = {
        gate_result: 'PASS',
        dimensions: {
          styleguide_branding: { verdict: 'PASS', note: '审查跳过' },
          color_typography: { verdict: 'PASS', note: '审查跳过' },
          usability_review: { verdict: 'PASS', note: '审查跳过' },
          user_testing: { verdict: 'PASS', note: '审查跳过' }
        },
        blocking_count: 0,
        summary: '审查未执行，默认通过'
      };
    });
    reviewResult = { overall_gate_result: 'PASS', review_summary: '审查未执行' };
  }

  // Phase 4 (H5 生成) 移至 confirmJob，等用户确认方案后再触发
  _updateJob(job, {
    status:           'needs_confirmation',
    stage:            null,
    summary:          parsed.summary,
    pages:            parsed.pages,
    modules,
    prd_title:        prdContent.title,
    prd_body_text:    bodyText,
    html_output_path: null,
    review_summary:   reviewResult.review_summary || '',
    overall_gate_result: reviewResult.overall_gate_result || 'PASS',
    design_constraints: reviewResult.design_constraints || []
  });

  console.log(`[AiDesign] Job ${job.id} — Done. ${modules.length} modules identified. Gate: ${reviewResult.overall_gate_result}. Awaiting confirmation.`);
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
    pages: job.pages,
    design_constraints: job.design_constraints || []
  }, job.modules));

  const htmlOutputPath = await _saveH5Output(job.id, h5Result);
  console.log(`[AiDesign] Job ${job.id} — H5 saved to: ${htmlOutputPath}`);

  _updateJob(job, {
    status: 'completed',
    stage: null,
    html_output_path: htmlOutputPath
  });
}

// ---------- 设计规范文件读取 ----------

/**
 * 启动时读取 fliggy-flight-design-guide 下的设计规范文件
 * 返回结构化的规范内容，供 H5 system prompt 使用
 */
function _loadDesignSkillContent() {
  const skillBase = path.join(__dirname, '..', 'skills', 'fliggy-flight-design-guide');
  const fdsBase   = path.join(skillBase, 'playbooks', 'flight-funnel', '0 Fliggy Design Skill');
  const refsBase  = path.join(skillBase, 'references');

  const result = { skillMd: '', htmlStandard: '', frameworkHtml: '' };

  // 1) 0 Fliggy Design Skill/SKILL.md — Design Tokens、组件索引、输出规范
  try {
    result.skillMd = fs.readFileSync(path.join(fdsBase, 'SKILL.md'), 'utf8');
    console.log('[AiDesign] Loaded SKILL.md (' + result.skillMd.length + ' chars)');
  } catch (e) {
    console.warn('[AiDesign] Could not load SKILL.md:', e.message);
  }

  // 2) references/html-and-token-standard.md — 硬性格式要求
  try {
    result.htmlStandard = fs.readFileSync(path.join(refsBase, 'html-and-token-standard.md'), 'utf8');
    console.log('[AiDesign] Loaded html-and-token-standard.md (' + result.htmlStandard.length + ' chars)');
  } catch (e) {
    console.warn('[AiDesign] Could not load html-and-token-standard.md:', e.message);
  }

  // 3) 框架组件.md — 页面骨架模板（导航栏、底部输入区等）
  try {
    result.frameworkHtml = fs.readFileSync(path.join(fdsBase, '框架组件.md'), 'utf8');
    console.log('[AiDesign] Loaded 框架组件.md (' + result.frameworkHtml.length + ' chars)');
  } catch (e) {
    console.warn('[AiDesign] Could not load 框架组件.md:', e.message);
  }

  return result;
}

/**
 * 从 SKILL.md 中提取 Design Tokens（:root 变量定义）
 */
function _extractDesignTokens(skillMd) {
  if (!skillMd) return '';
  // 提取 :root { ... } 块
  const rootMatch = skillMd.match(/:root\s*\{[^}]+\}/g);
  if (rootMatch) return rootMatch.join('\n\n');
  // 降级：提取 ## 二、Design Tokens 到下一个 ## 之间的内容
  const tokenSection = skillMd.match(/## 二、Design Tokens[\s\S]*?(?=\n## [^#])/);
  return tokenSection ? tokenSection[0] : '';
}

/**
 * 从 SKILL.md 中提取图片库（Unsplash ID 列表）
 */
function _extractImageLibrary(skillMd) {
  if (!skillMd) return '';
  const imgSection = skillMd.match(/### 图片库[\s\S]*$/);
  return imgSection ? imgSection[0].slice(0, 3000) : '';
}

/**
 * 从框架组件.md 中提取页面骨架模板
 */
function _extractPageSkeleton(frameworkMd) {
  if (!frameworkMd) return '';
  const skeletonMatch = frameworkMd.match(/## 页面骨架模板[\s\S]*/);
  return skeletonMatch ? skeletonMatch[0].slice(0, 3000) : '';
}

/**
 * 构建 H5 生成的 system prompt，基于实际设计规范文件
 */
function _buildH5SystemPrompt(designSkill) {
  const tokens = _extractDesignTokens(designSkill.skillMd);
  const imageLib = _extractImageLibrary(designSkill.skillMd);
  const skeleton = _extractPageSkeleton(designSkill.frameworkHtml);

  return `你是飞猪机票资深 UX 工程师，负责根据 PRD 拆解结果生成严格符合飞猪设计规范的移动端 H5 页面。

=== 格式硬约束（违反任何一条即为不合格）===

1. 文件形态：单文件 .html，样式仅内联 <style>，禁止外链 CSS 和 JS
2. 视口（强制）：<meta name="viewport" content="width=750, user-scalable=no">
3. Design Token（强制）：
   - 颜色、圆角等一律通过 var(--token-name) 引用
   - :root 中集中定义所有 token，hex 仅出现在 :root
   - 品牌色 var(--color-indigo-1) #6666ff：仅用于按钮文字、链接，禁止大面积铺底
4. 布局与间距：
   - 页面水平边距：30px
   - 间距体系：6 的倍数（6/12/18/24/30/36/42/48px）
   - 主内容纵向 flex，禁止 position:absolute 做纵向排版
   - 相邻模块垂直空白不超过 24px
5. 字体层级（基于 750px 设计稿）：
   - 数字/货币字体：font-family: 'Fliggy Sans 102', 'PingFang SC', 'SimHei', sans-serif; font-weight: bold;
   - 默认汉字字体：font-family: 'PingFang SC', 'SimHei', sans-serif;
   - 大标题：36px/700
   - 标题：32px/600 或 28px/600
   - 正文：26px/400（30px/500 用于输入气泡）
   - 辅助：22px/400
   - 说明：20px/400
6. 图片：使用 Unsplash 真实图 + 尺寸参数，禁止纯色大块占位
   - URL 模板：https://images.unsplash.com/photo-{ID}?w={w}&h={h}&fit=crop
   - CSS 中使用 background-image + background-size: cover; background-position: center;
   - 保留 background-color: #E0E0E0 作为加载兜底
7. 类名前缀：fdl-*
8. 卡片规范：
   - 白底卡片仅用于固定组件（交通卡、商品卡、下单卡等）
   - Markdown 说明性文本铺在 #F7F8FA 背景上，禁止用白底卡片包一层
9. 字体引入（强制）：
   @font-face { font-family: 'Fliggy Sans 102'; src: url('https://g.alicdn.com/trip/common-assets/1.1.9/fonts/FliggySans102-Md.ttf') format('truetype'); font-weight: 500; font-display: swap; }

=== Design Tokens（必须在 :root 中定义）===

${tokens || `\`\`\`css
:root {
  --color-darkgray: #0f131a;
  --color-midgray: #5c5f66;
  --color-lightgray: #919499;
  --color-indigo-1: #6666ff;
  --color-indigo-4: #EBEBFF;
  --color-warning-1: #ff3333;
  --color-pay-1: #ff5533;
  --color-white: #ffffff;
  --color-label: #F7F8FA;
  --color-bg: #f2f3f5;
  --radius-xl: 36px;
  --radius-l: 24px;
  --radius-m: 12px;
  --radius-s: 6px;
}
\`\`\``}

=== 颜色语义说明 ===
- --color-darkgray #0f131a：标题、正文、价格数字
- --color-midgray #5c5f66：引用、副标题
- --color-lightgray #919499：标签文本
- --color-indigo-1 #6666ff：品牌主色，仅限按钮文本和链接，禁止大面积使用
- --color-indigo-4 #EBEBFF：品牌辅助色，按钮背景
- --color-warning-1 #ff3333：警示色
- --color-pay-1 #ff5533：优惠色/价格色
- --color-white #ffffff：卡片背景
- --color-label #F7F8FA：全局页面背景色
- --color-bg #f2f3f5：分割线、次级按钮背景

=== 圆角体系 ===
- --radius-xl 36px：大卡片（交通卡、商品卡、酒店房型卡、下单卡、订单卡、表格等）
- --radius-l 24px：小卡片、图片容器、按钮、标签
- --radius-m 12px：小元素、内嵌缩略图
- --radius-s 6px：极小元素、进度条、色块角标

${skeleton ? `=== 页面骨架模板 ===\n\n${skeleton}` : ''}

${imageLib ? `=== Unsplash 图片库（按场景分类，从中选取 ID 拼入 URL 模板）===\n\n${imageLib}` : ''}

=== 输出要求 ===

只输出完整可运行的 HTML 代码。
不要任何解释文字、Markdown 代码块标记（如 \`\`\`html）。
不要输出 "以下是..." 等前缀说明。
直接以 <!DOCTYPE html> 开头。`;
}

// 启动时加载设计规范
const _designSkillContent = _loadDesignSkillContent();
const FLIGGY_FLIGHT_H5_SYSTEM = _buildH5SystemPrompt(_designSkillContent);

function _buildH5Prompt(title, bodyText, decomposed, modules) {
  const pageList = (decomposed.pages || []).join('、') || '首页';
  const moduleList = (modules || []).map((m) =>
    `- ${m.name}（${m.page || ''}，${m.change_type || 'create'}）：${m.intent || ''}${m.notes ? '；备注：' + m.notes : ''}`
  ).join('\n');

  // 从 modules 的 review 中提取设计要点和审查建议
  const reviewSection = _buildReviewConstraintsSection(modules, decomposed);

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
${reviewSection}
## PRD 正文
${(bodyText || '').slice(0, 6000)}

## 生成要求
1. 以第一个页面为主体，完整还原 PRD 中描述的所有模块和交互
2. 包含完整的页面结构：顶部导航栏、主要业务模块、底部操作区
3. 所有文案必须使用 PRD 中的真实业务内容（如站名、车次、价格等），禁止用占位文字
4. 弹窗/浮层类模块：默认隐藏，提供触发按钮可交互展示
5. 必须包含完整的 :root token 定义（颜色、圆角、阴影等），严格使用上述 Design Tokens
6. 使用 Unsplash 真实图片（从上述图片库中选取 ID），禁止纯色占位
7. 数字和价格使用 Fliggy Sans 102 字体
8. 必须在设计中体现上述 Gstack 审查约束中的所有设计要点和建议
9. 直接输出完整 HTML，以 <!DOCTYPE html> 开头`
    }
  ];
}

/**
 * 从 modules 的 review 结果中构建审查约束段落，注入到 H5 prompt 中
 */
function _buildReviewConstraintsSection(modules, decomposed) {
  const parts = [];

  // 1. 每个模块的设计要点
  const focusItems = [];
  (modules || []).forEach(m => {
    const review = m.review || {};
    const focus = review.design_focus || [];
    if (focus.length > 0) {
      focusItems.push(`### ${m.name}`);
      focus.forEach(f => focusItems.push(`- ${f}`));
    }
  });

  // 2. 每个模块的 ADVISORY/BLOCKING 审查建议
  const adviceItems = [];
  (modules || []).forEach(m => {
    const review = m.review || {};
    const dims = review.dimensions || {};
    const dimLabels = {
      styleguide_branding: 'Styleguide & Branding',
      color_typography: 'Color & Typography',
      usability_review: 'Usability Review',
      user_testing: 'User Testing'
    };
    const notes = [];
    for (const [dk, dv] of Object.entries(dims)) {
      if (dv && (dv.verdict === 'ADVISORY' || dv.verdict === 'BLOCKING') && dv.note) {
        notes.push(`- [${dv.verdict}] ${dimLabels[dk] || dk}：${dv.note}`);
      }
    }
    if (notes.length > 0) {
      adviceItems.push(`### ${m.name}`);
      adviceItems.push(...notes);
    }
  });

  // 3. 整体设计约束
  const constraints = decomposed.design_constraints || [];

  // 如果没有任何审查数据，返回空
  if (focusItems.length === 0 && adviceItems.length === 0 && constraints.length === 0) {
    return '\n';
  }

  parts.push('\n## Gstack 审查约束（必须在设计中体现）');
  parts.push('> 以下约束来自 Gstack awesome-design-gates（Phase 1.2）审查，设计生成时必须逐条体现。\n');

  if (focusItems.length > 0) {
    parts.push('### 设计要点（每个模块需重点设计的要点）');
    parts.push(focusItems.join('\n'));
    parts.push('');
  }

  if (constraints.length > 0) {
    parts.push('### 整体设计约束');
    constraints.forEach(c => parts.push(`- ${c}`));
    parts.push('');
  }

  if (adviceItems.length > 0) {
    parts.push('### 审查建议（ADVISORY/BLOCKING 项，必须在设计中解决）');
    parts.push(adviceItems.join('\n'));
    parts.push('');
  }

  return parts.join('\n');
}

async function _saveH5Output(jobId, h5Content) {
  let html = h5Content || '';
  const fenceMatch = html.match(/```(?:html)?\s*([\s\S]+?)```/i);
  if (fenceMatch) html = fenceMatch[1].trim();

  // 输出到 pages/ 目录，方便直接预览
  const outputDir = path.join(__dirname, '..', 'pages');
  fs.mkdirSync(outputDir, { recursive: true });

  const fileName = `${jobId}.html`;
  const filePath = path.join(outputDir, fileName);
  fs.writeFileSync(filePath, html, 'utf8');

  return path.join('pages', fileName);
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

// ---------- Gstack 四维审查 ----------

/**
 * 构建 Gstack + awesome-design 四维审查 prompt
 * 基于 awesome-design-gates.md 的审查框架，对每个模块做结构审查 + 四维检查
 */
function _buildGstackReviewPrompt(title, bodyText, decomposed, modules) {
  const moduleList = (modules || []).map((m) =>
    `- ${m.name}（页面：${m.page || ''}，类型：${m.change_type || 'create'}）：${m.intent || ''}${m.notes ? '；备注：' + m.notes : ''}`
  ).join('\n');

  const systemPrompt = `你是飞猪机票资深设计审查专家，负责在设计生成前对 PRD 拆解结果进行结构审查和 awesome-design 四维检查。

你的审查基于 Gstack awesome-design-gates（Phase 1.2）方法论框架，参考 https://github.com/gztchan/awesome-design 的方法层（不照搬视觉），对每个模块执行以下四维检查：

1. styleguide_branding（风格与品牌）：信息与品牌表达是否一致，模块命名与语义是否清晰
2. color_typography（色彩与排版）：信息层级、可读性与文本组织是否满足设计落地
3. usability_review（可用性审查）：关键任务路径是否完整，是否存在阻断交互或缺失场景
4. user_testing（用户测试）：是否定义最小可验证用例与验收口径，确保后续评审可复现

每个维度的判定标准：
- PASS：完全满足，无需修改
- ADVISORY：建议优化，不阻断流程，但需在设计中体现
- BLOCKING：存在严重问题，必须修正后才能进入设计生成

你的核心职责不只是打分，更重要的是：
1. 提炼出每个模块需要重点设计的要点（design_focus），这些要点将直接约束后续 H5 设计生成
2. 给出整体的设计约束清单（design_constraints），确保设计生成时不遗漏关键场景
3. 每个维度的 note 不只是描述问题，还要给出具体的设计建议

**必须用 JSON 格式输出，不要添加任何 Markdown 代码块标记，直接输出 JSON 对象。**`;

  const userPrompt = `请对以下 PRD 拆解结果进行 Gstack awesome-design-gates（Phase 1.2）四维审查。

## PRD 信息
- 标题：${title}
- 需求摘要：${decomposed.summary || ''}
- 涉及页面：${(decomposed.pages || []).join('、')}

## 模块清单
${moduleList}

## PRD 正文（摘要）
${(bodyText || '').slice(0, 4000)}

## 输出要求

输出 JSON 对象，格式如下：
{
  "overall_gate_result": "PASS" | "PASS_WITH_NOTES" | "BLOCKED",
  "structure_review": {
    "module_boundary": "PASS 或问题描述",
    "page_ownership": "PASS 或问题描述",
    "intent_type": "PASS 或问题描述",
    "conflict_check": "PASS 或问题描述"
  },
  "modules": [
    {
      "name": "模块名（与输入一致）",
      "design_focus": [
        "该模块需要重点设计的要点1（如：弹窗触发时机与动画过渡）",
        "该模块需要重点设计的要点2（如：价差信息的视觉层级）",
        "该模块需要重点设计的要点3（如：网络异常/空态的降级展示）"
      ],
      "dimensions": {
        "styleguide_branding": { "verdict": "PASS|ADVISORY|BLOCKING", "note": "问题描述 + 具体设计建议" },
        "color_typography": { "verdict": "PASS|ADVISORY|BLOCKING", "note": "问题描述 + 具体设计建议" },
        "usability_review": { "verdict": "PASS|ADVISORY|BLOCKING", "note": "问题描述 + 具体设计建议" },
        "user_testing": { "verdict": "PASS|ADVISORY|BLOCKING", "note": "问题描述 + 具体设计建议" }
      },
      "blocking_count": 0,
      "summary": "该模块的审查结论摘要（<=50字）"
    }
  ],
  "design_constraints": [
    "整体设计约束1（如：所有动态拼接文案需定义最大字符数和换行规则）",
    "整体设计约束2（如：弹窗必须包含 Loading、异常、空态三种状态）",
    "整体设计约束3（如：按钮文案需对齐飞猪品牌情感化设计规范）"
  ],
  "blocking_items": [],
  "advisory_items": ["建议项描述"],
  "review_summary": "整体审查结论摘要（<=80字）"
}

注意：
1. design_focus 是该模块需要重点设计的要点清单，至少 2-5 条，将直接约束后续 H5 设计生成
2. design_constraints 是整体的设计约束清单，至少 2-4 条，确保设计生成时不遗漏关键场景
3. 每个维度的 note 必须包含具体的设计建议，而不只是问题描述
4. 直接输出 JSON，不要有任何其他内容。`;

  return [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: userPrompt }
  ];
}

/**
 * 解析 Gstack 审查结果，将审查结论合并到 modules 数组中
 */
function _parseReviewResult(reviewText, modules) {
  let reviewData;
  try {
    let cleaned = (reviewText || '').trim();
    // 去除可能的 Markdown 代码块标记
    const fenceMatch = cleaned.match(/```(?:json)?\s*([\s\S]+?)```/);
    if (fenceMatch) cleaned = fenceMatch[1].trim();
    // 去除 think 标签
    cleaned = cleaned.replace(/<think>[\s\S]*?<\/think>/g, '').trim();
    reviewData = JSON.parse(cleaned);
  } catch (err) {
    console.warn('[AiDesign] Failed to parse review result as JSON:', err.message);
    console.warn('[AiDesign] Raw review text (first 500 chars):', (reviewText || '').slice(0, 500));
    // 解析失败时，给每个模块一个默认的 PASS 审查结果
    return {
      overall_gate_result: 'PASS',
      review_summary: '审查结果解析失败，默认通过',
      modules: (modules || []).map(m => ({
        ...m,
        review: {
          gate_result: 'PASS',
          dimensions: {
            styleguide_branding: { verdict: 'PASS', note: '默认通过' },
            color_typography: { verdict: 'PASS', note: '默认通过' },
            usability_review: { verdict: 'PASS', note: '默认通过' },
            user_testing: { verdict: 'PASS', note: '默认通过' }
          },
          blocking_count: 0,
          summary: '审查结果解析失败，默认通过'
        }
      }))
    };
  }

  // 将审查结果合并到 modules
  const reviewModules = reviewData.modules || [];
  const enrichedModules = (modules || []).map(m => {
    const reviewMod = reviewModules.find(rm => rm.name === m.name);
    if (reviewMod) {
      m.review = {
        gate_result: reviewMod.blocking_count > 0 ? 'BLOCKED' : 
                     (reviewData.overall_gate_result === 'PASS' ? 'PASS' : 'PASS_WITH_NOTES'),
        dimensions: reviewMod.dimensions || {},
        blocking_count: reviewMod.blocking_count || 0,
        summary: reviewMod.summary || '',
        design_focus: reviewMod.design_focus || []
      };
    } else {
      m.review = {
        gate_result: 'PASS',
        dimensions: {
          styleguide_branding: { verdict: 'PASS', note: '未单独审查' },
          color_typography: { verdict: 'PASS', note: '未单独审查' },
          usability_review: { verdict: 'PASS', note: '未单独审查' },
          user_testing: { verdict: 'PASS', note: '未单独审查' }
        },
        blocking_count: 0,
        summary: '未单独审查，默认通过',
        design_focus: []
      };
    }
    return m;
  });

  return {
    overall_gate_result: reviewData.overall_gate_result || 'PASS',
    review_summary: reviewData.review_summary || '',
    design_constraints: reviewData.design_constraints || [],
    modules: enrichedModules
  };
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

async function _callAi(aiConfig, messages, retries) {
  const maxRetries = retries || 2;
  const provider = (aiConfig.provider || 'openai').toLowerCase();

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      if (provider === 'qwen' || provider === 'dashscope') {
        return await _callQwen(aiConfig, messages);
      }
      return await _callOpenAiCompat(aiConfig, messages);
    } catch (err) {
      const isRetryable = /provider returned error|timed out|ECONNRESET|ETIMEDOUT|429|502|503/i.test(err.message);
      if (isRetryable && attempt < maxRetries) {
        const delay = attempt * 3000;
        console.warn(`[AiDesign] _callAi attempt ${attempt}/${maxRetries} failed (retryable): ${err.message}. Retrying in ${delay}ms...`);
        await new Promise(r => setTimeout(r, delay));
        continue;
      }
      throw err;
    }
  }
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
