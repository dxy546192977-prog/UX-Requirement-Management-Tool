'use strict';

/**
 * routes/ai-design.js
 * AI 设计拆解任务路由：
 *   POST /api/ai-design/jobs              — 创建任务
 *   GET  /api/ai-design/jobs/:id          — 查询任务状态
 *   POST /api/ai-design/jobs/:id/retry    — 重跑任务
 *   POST /api/ai-design/jobs/:id/confirm  — 确认方案并触发 H5 生成
 */

module.exports = function registerAiDesignRoutes(ctx) {
  const { loadConfig, hasAnyAiKey, aiDesignSvc, yuqueSvc, readBody } = ctx;

  return async function handleAiDesignRoute(pathname, method, req, res) {
    // POST /api/ai-design/jobs
    if (pathname === '/api/ai-design/jobs' && method === 'POST') {
      let body;
      try {
        body = JSON.parse(await readBody(req));
      } catch {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid JSON body' }));
        return true;
      }

      const { reqId, prdUrl, prdMd, skillKey, figmaUrl } = body;
      if (!reqId) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'reqId is required' }));
        return true;
      }

      const allowedSkills = new Set(['default', 'prd_html_decompose', 'fliggy_flight_prd_to_h5', 'fliggy_flight_h5_review']);
      const skill = allowedSkills.has(skillKey) ? skillKey : 'default';

      if (skill === 'fliggy_flight_h5_review') {
        if (!figmaUrl) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'figmaUrl is required for fliggy_flight_h5_review' }));
          return true;
        }
      } else if (!prdUrl && !(prdMd && prdMd.trim())) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'prdUrl or prdMd is required' }));
        return true;
      }

      const config = loadConfig();
      if (!config) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Failed to load config/config.json' }));
        return true;
      }

      const isMock = !hasAnyAiKey(config);
      if (isMock) {
        console.log('[AiDesign] No valid ai_api_key / ai_decompose_api_key — running in MOCK mode');
      }

      const job = aiDesignSvc.createJob(reqId, prdUrl || '', config, yuqueSvc, {
        skillKey: skill,
        figmaUrl: figmaUrl || '',
        prdMd: prdMd || ''
      });
      console.log(`[AiDesign] Created job ${job.id} for req ${reqId} (skill=${skill})${isMock ? ' (mock)' : ''}${prdMd ? ' (with prdMd fallback)' : ''}`);

      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(job));
      return true;
    }

    // GET /api/ai-design/jobs/:id
    const jobGetMatch = pathname.match(/^\/api\/ai-design\/jobs\/([^/]+)$/);
    if (jobGetMatch && method === 'GET') {
      const jobId = jobGetMatch[1];
      const job = aiDesignSvc.getJob(jobId);
      if (!job) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: `Job ${jobId} not found` }));
        return true;
      }
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(job));
      return true;
    }

    // POST /api/ai-design/jobs/:id/retry
    const jobRetryMatch = pathname.match(/^\/api\/ai-design\/jobs\/([^/]+)\/retry$/);
    if (jobRetryMatch && method === 'POST') {
      const jobId = jobRetryMatch[1];
      const config = loadConfig();
      if (!config) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Failed to load config/config.json' }));
        return true;
      }

      let job = aiDesignSvc.retryJob(jobId, config, yuqueSvc);

      if (!job) {
        // Job 不在内存中（重启后丢失），从请求 body 读取参数重新创建
        const body = await readBody(req).then((raw) => {
          try { return JSON.parse(raw); } catch { return {}; }
        });
        const { req_id, prd_url, skill_key, figma_url } = body;
        const skill = skill_key || 'default';
        if (!req_id || (skill === 'fliggy_flight_h5_review' ? !figma_url : !prd_url)) {
          res.writeHead(404, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({
            error: `Job ${jobId} not found，请提供 req_id 及 ${skill === 'fliggy_flight_h5_review' ? 'figma_url' : 'prd_url'} 重新创建`
          }));
          return true;
        }
        console.log(`[AiDesign] Job ${jobId} not in memory, creating new job for req ${req_id} (skill=${skill})`);
        job = aiDesignSvc.createJob(req_id, prd_url || '', config, yuqueSvc, { skillKey: skill, figmaUrl: figma_url || '' });
      } else {
        console.log(`[AiDesign] Retrying job ${jobId}`);
      }

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(job));
      return true;
    }

    // POST /api/ai-design/jobs/:id/confirm
    const jobConfirmMatch = pathname.match(/^\/api\/ai-design\/jobs\/([^/]+)\/confirm$/);
    if (jobConfirmMatch && method === 'POST') {
      const jobId = jobConfirmMatch[1];
      const config = loadConfig();
      if (!config) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Failed to load config/config.json' }));
        return true;
      }

      let job = aiDesignSvc.confirmJob(jobId, config, yuqueSvc);

      if (!job) {
        // Job 不在内存中（重启后丢失），从请求 body 读取参数重新创建
        const body = await readBody(req).then((raw) => {
          try { return JSON.parse(raw); } catch { return {}; }
        });
        const { req_id, prd_url, skill_key } = body;
        if (!req_id || !prd_url) {
          res.writeHead(404, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: `Job ${jobId} not found，请提供 req_id 和 prd_url` }));
          return true;
        }
        console.log(`[AiDesign] Job ${jobId} not in memory, creating new job for req ${req_id} and generating H5`);
        job = aiDesignSvc.createJob(req_id, prd_url, config, yuqueSvc, { skillKey: skill_key || 'fliggy_flight_prd_to_h5' });
      } else {
        console.log(`[AiDesign] Confirmed job ${jobId}, H5 generation started`);
      }

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(job));
      return true;
    }

    return false;
  };
};
