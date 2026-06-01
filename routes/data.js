'use strict';

/**
 * routes/data.js
 * 需求数据的读写路由：GET /api/data、POST /api/data
 * 优先使用 OSS；本地开发可降级到 JSON 文件，Vercel 上必须使用持久化存储。
 */

const fs   = require('fs');
const path = require('path');

const DATA_PATH = path.join(process.cwd(), 'data', 'local_requirements.json');
const SEED_DATA_PATH = path.join(process.cwd(), 'data', 'requirements.json');
const IS_VERCEL = Boolean(process.env.VERCEL);

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(payload));
}

function sendPersistentStorageError(res, detail) {
  sendJson(res, 503, {
    error: '线上保存需要配置持久化存储：请在 Vercel 环境变量中配置 OSS_ACCESS_KEY_ID 和 OSS_ACCESS_KEY_SECRET，然后重新部署。',
    detail
  });
}

module.exports = function registerDataRoutes(ctx) {
  const { loadConfig, loadRequirementsFromOss, saveRequirementsToOss } = ctx;

  return async function handleDataRoute(pathname, method, req, res) {
    if (pathname !== '/api/data') return false;

    // GET /api/data — 读取需求列表
    if (method === 'GET') {
      try {
        const config = loadConfig();
        if (config) {
          try {
            const ossData = await loadRequirementsFromOss(config);
            if (ossData) {
              console.log(`[Data] Loaded ${ossData.requirements.length} requirements from OSS`);
              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify(ossData));
              return true;
            }
          } catch (ossErr) {
            console.warn('[Data] OSS load failed, fallback to local file:', ossErr.message);
          }
        }

        const fallbackPath = fs.existsSync(DATA_PATH) ? DATA_PATH : SEED_DATA_PATH;
        if (fs.existsSync(fallbackPath)) {
          const raw = fs.readFileSync(fallbackPath, 'utf-8');
          console.log(`[Data] Loaded requirements from local file fallback: ${path.relative(process.cwd(), fallbackPath)}`);
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(raw);
        } else {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ requirements: [] }));
        }
      } catch (err) {
        console.error('[Data] Load error:', err.message);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Failed to load data' }));
      }
      return true;
    }

    // POST /api/data — 保存需求列表
    if (method === 'POST') {
      try {
        const rawBody = await new Promise((resolve, reject) => {
          let body = '';
          req.on('data', (chunk) => { body += chunk; });
          req.on('end', () => resolve(body));
          req.on('error', reject);
        });
        const data = JSON.parse(rawBody);
        const requirements = Array.isArray(data && data.requirements) ? data.requirements : [];
        const payload = { requirements };

        const config = loadConfig();
        let ossSaveError = null;
        if (config) {
          try {
            const saved = await saveRequirementsToOss(config, payload);
            if (saved) {
              console.log(`[Data] Saved ${requirements.length} requirements to OSS`);
              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ success: true, storage: 'oss' }));
              return true;
            }
          } catch (ossErr) {
            ossSaveError = ossErr;
            console.warn('[Data] OSS save failed:', ossErr.message);
          }
        }

        if (IS_VERCEL) {
          sendPersistentStorageError(
            res,
            ossSaveError ? `OSS 保存失败：${ossSaveError.message}` : '未检测到 OSS 环境变量'
          );
          return true;
        }

        const dataDir = path.dirname(DATA_PATH);
        if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
        fs.writeFileSync(DATA_PATH, JSON.stringify(payload, null, 2), 'utf-8');
        console.log(`[Data] Saved ${requirements.length} requirements to local file fallback`);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, storage: 'local_fallback' }));
      } catch (err) {
        console.error('[Data] Save error:', err.message);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Failed to save data: ' + err.message }));
      }
      return true;
    }

    return false;
  };
};
