const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const yuqueSvc   = require('./services/yuque-service');
const aiDesignSvc = require('./services/ai-design-service');

// ==================== Config ====================
const CONFIG_PATH = path.join(__dirname, 'config', 'config.json');
const LEGACY_CONFIG_PATH = path.join(__dirname, 'config.json');
const DATA_PATH = path.join(__dirname, 'data', 'local_requirements.json');
const DEFAULT_OSS_BUCKET = 'designacceleration';
const DEFAULT_OSS_REGION = 'oss-cn-beijing';
const DEFAULT_OSS_FILE_KEY = 'requirements.json';
const DINGTALK_WEBHOOK_PREFIX = 'https://oapi.dingtalk.com/robot/send';

function loadConfig() {
  const candidates = [CONFIG_PATH, LEGACY_CONFIG_PATH];
  for (const cfgPath of candidates) {
    try {
      const raw = fs.readFileSync(cfgPath, 'utf-8');
      return JSON.parse(raw);
    } catch (err) {
      if (err.code !== 'ENOENT') {
        console.error(`[Config] Failed to read ${cfgPath}:`, err.message);
      }
    }
  }
  console.error('[Config] Failed to read config/config.json (and legacy config.json)');
  return null;
}

function saveConfig(config) {
  try {
    const configDir = path.dirname(CONFIG_PATH);
    if (!fs.existsSync(configDir)) {
      fs.mkdirSync(configDir, { recursive: true });
    }
    fs.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('[Config] Failed to write config/config.json:', err.message);
    return false;
  }
}

function normalizeAiKey(value) {
  const key = String(value || '').trim();
  if (!key || key === 'YOUR_AI_API_KEY_HERE') return '';
  return key;
}

function hasAnyAiKey(config) {
  if (!config) return false;
  return Boolean(normalizeAiKey(config.ai_api_key) || normalizeAiKey(config.ai_decompose_api_key));
}

function normalizeDingTalkWebhook(url) {
  const val = String(url || '').trim();
  if (!val) return '';
  if (!val.startsWith(DINGTALK_WEBHOOK_PREFIX)) return '';
  return val;
}

// ==================== Yuque URL Parser ====================
function parseYuqueUrl(yuqueUrl) {
  try {
    const parsed = new URL(yuqueUrl);
    const segments = parsed.pathname.replace(/^\//, '').split('/').filter(Boolean);
    if (segments.length < 3) return null;
    return {
      group_login: segments[0],
      book_slug: segments[1],
      doc_slug: segments[2]
    };
  } catch (err) {
    return null;
  }
}

// ==================== Yuque API Caller ====================
function fetchYuqueDoc(config, group_login, book_slug, doc_slug) {
  return new Promise((resolve, reject) => {
    const apiUrl = `${config.yuque_api_base}/api/v2/repos/${group_login}/${book_slug}/docs/${doc_slug}`;
    const parsed = new URL(apiUrl);
    const options = {
      hostname: parsed.hostname,
      port: parsed.port || 443,
      path: parsed.pathname + parsed.search,
      method: 'GET',
      headers: {
        'X-Auth-Token': config.yuque_token,
        'Content-Type': 'application/json',
        'User-Agent': 'RequirementsManagement/1.0'
      },
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (res.statusCode !== 200) {
            reject(new Error(`Yuque API returned ${res.statusCode}: ${json.message || data}`));
            return;
          }
          resolve(json);
        } catch (err) {
          reject(new Error('Failed to parse Yuque API response: ' + err.message));
        }
      });
    });

    req.on('error', (err) => {
      reject(new Error('Yuque API request failed: ' + err.message));
    });

    req.setTimeout(30000, () => {
      req.destroy();
      reject(new Error('Yuque API request timed out'));
    });

    req.end();
  });
}

// ==================== Static File Server ====================
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

function serveStaticFile(pathname, res) {
  // Default to pages/Web.html（需求看板入口）
  if (pathname === '/') pathname = '/pages/Web.html';
  // Canonical routes: keep old links working after page rename
  if (pathname === '/online-index.html' || pathname === '/pages/online-index.html') pathname = '/pages/Web.html';
  if (pathname === '/workflow-monitor.html' || pathname === '/pages/workflow-monitor.html') pathname = '/pages/Token.html';

  const publicRoot = path.join(__dirname, 'public');
  const roots = [publicRoot, __dirname];
  let filePath = path.join(publicRoot, pathname);
  let matchedRoot = publicRoot;

  for (const root of roots) {
    const candidate = path.join(root, pathname);
    if (!candidate.startsWith(root)) {
      res.writeHead(403, { 'Content-Type': 'text/plain' });
      res.end('Forbidden');
      return;
    }
    if (fs.existsSync(candidate)) {
      filePath = candidate;
      matchedRoot = root;
      break;
    }
  }

  // Security: prevent directory traversal
  if (!filePath.startsWith(matchedRoot)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('Forbidden');
    return;
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
      } else {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
      }
      return;
    }
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
}

// ==================== Request Body Parser ====================
function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk) => { body += chunk; });
    req.on('end', () => resolve(body));
    req.on('error', reject);
  });
}

function getYuqueConfigOrError(res) {
  const config = loadConfig();
  if (!config) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Failed to load config/config.json' }));
    return null;
  }
  if (!config.yuque_token || config.yuque_token === 'YOUR_YUQUE_API_TOKEN_HERE') {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Yuque API Token not configured. Please update config/config.json with your token.' }));
    return null;
  }
  return config;
}

function getFileExtFromUrl(url, contentType) {
  const byType = {
    'image/jpeg': '.jpg',
    'image/png': '.png',
    'image/gif': '.gif',
    'image/webp': '.webp',
    'image/svg+xml': '.svg',
    'image/bmp': '.bmp'
  };
  if (contentType && byType[contentType.toLowerCase()]) return byType[contentType.toLowerCase()];

  try {
    const parsed = new URL(url);
    const ext = path.extname(parsed.pathname || '').toLowerCase();
    if (ext && ext.length <= 5) return ext;
  } catch (_) {
    // ignore
  }
  return '.bin';
}

function getOssConfig(config) {
  if (!config) return null;
  const accessKeyId = String(config.oss_access_key_id || '').trim();
  const accessKeySecret = String(config.oss_access_key_secret || '').trim();
  if (!accessKeyId || !accessKeySecret || accessKeyId === 'YOUR_OSS_ACCESS_KEY_ID' || accessKeySecret === 'YOUR_OSS_ACCESS_KEY_SECRET') {
    return null;
  }
  const bucket = String(config.oss_bucket || DEFAULT_OSS_BUCKET).trim();
  const region = String(config.oss_region || DEFAULT_OSS_REGION).trim();
  const fileKey = String(config.oss_file_key || DEFAULT_OSS_FILE_KEY).trim();
  const host = `${bucket}.${region}.aliyuncs.com`;
  return { accessKeyId, accessKeySecret, bucket, region, fileKey, host };
}

function getOssReadTarget(config) {
  const bucket = String((config && config.oss_bucket) || DEFAULT_OSS_BUCKET).trim();
  const region = String((config && config.oss_region) || DEFAULT_OSS_REGION).trim();
  const fileKey = String((config && config.oss_file_key) || DEFAULT_OSS_FILE_KEY).trim();
  const host = `${bucket}.${region}.aliyuncs.com`;
  return { bucket, region, fileKey, host };
}

function postJsonToRemoteUrl(targetUrl, payload) {
  return new Promise((resolve, reject) => {
    let parsed;
    try {
      parsed = new URL(targetUrl);
    } catch {
      reject(new Error('Invalid URL'));
      return;
    }
    if (parsed.protocol !== 'https:') {
      reject(new Error('Only https URL is allowed'));
      return;
    }

    const body = JSON.stringify(payload || {});
    const req = https.request({
      hostname: parsed.hostname,
      port: parsed.port || 443,
      path: parsed.pathname + parsed.search,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body, 'utf8')
      }
    }, (res) => {
      let chunks = '';
      res.on('data', (chunk) => { chunks += chunk; });
      res.on('end', () => {
        resolve({ statusCode: res.statusCode || 500, body: chunks });
      });
    });
    req.on('error', reject);
    req.setTimeout(15000, () => req.destroy(new Error('DingTalk request timed out')));
    req.write(body);
    req.end();
  });
}

function requestHttps(options, body) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let chunks = '';
      res.on('data', (chunk) => { chunks += chunk; });
      res.on('end', () => resolve({ statusCode: res.statusCode, headers: res.headers, body: chunks }));
    });
    req.on('error', reject);
    req.setTimeout(15000, () => {
      req.destroy(new Error('HTTPS request timed out'));
    });
    if (body) req.write(body);
    req.end();
  });
}

async function loadRequirementsFromOss(config) {
  const oss = getOssReadTarget(config);

  const options = {
    hostname: oss.host,
    port: 443,
    path: `/${oss.fileKey}?t=${Date.now()}`,
    method: 'GET'
  };
  const res = await requestHttps(options);
  if (res.statusCode !== 200) {
    throw new Error(`OSS GET returned ${res.statusCode}`);
  }
  const parsed = JSON.parse(res.body || '{}');
  if (!Array.isArray(parsed.requirements)) {
    throw new Error('OSS requirements.json format invalid');
  }
  return parsed;
}

function buildOssAuthHeaders(oss, method, filePath, contentType) {
  const date = new Date().toUTCString();
  const stringToSign = `${method}\n\n${contentType}\n${date}\n/${oss.bucket}/${filePath}`;
  const signature = crypto
    .createHmac('sha1', oss.accessKeySecret)
    .update(stringToSign, 'utf8')
    .digest('base64');
  return {
    Date: date,
    Authorization: `OSS ${oss.accessKeyId}:${signature}`
  };
}

async function saveRequirementsToOss(config, payload) {
  const oss = getOssConfig(config);
  if (!oss) return false;

  const body = JSON.stringify(payload, null, 2);
  const contentType = 'application/json';
  const authHeaders = buildOssAuthHeaders(oss, 'PUT', oss.fileKey, contentType);

  const options = {
    hostname: oss.host,
    port: 443,
    path: `/${oss.fileKey}`,
    method: 'PUT',
    headers: {
      ...authHeaders,
      'Content-Type': contentType,
      'Content-Length': Buffer.byteLength(body, 'utf8')
    }
  };

  const res = await requestHttps(options, body);
  if (res.statusCode >= 200 && res.statusCode < 300) return true;
  throw new Error(`OSS PUT returned ${res.statusCode}: ${res.body || ''}`);
}

// ==================== Routes ====================
const registerDataRoutes    = require('./routes/data');
const registerConfigRoutes  = require('./routes/config');
const registerYuqueRoutes   = require('./routes/yuque');
const registerAiDesignRoutes = require('./routes/ai-design');

// ==================== HTTP Server ====================
const PORT = 3001;

// 允许的来源：本地开发域 + 可选的 ECS 生产域（通过环境变量 ALLOWED_ORIGIN 注入）
const ALLOWED_ORIGINS = new Set([
  'http://localhost:3001',
  'http://127.0.0.1:3001',
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  ...(process.env.ALLOWED_ORIGIN ? [process.env.ALLOWED_ORIGIN] : [])
]);

function getCorsOrigin(requestOrigin) {
  if (!requestOrigin) return null;
  return ALLOWED_ORIGINS.has(requestOrigin) ? requestOrigin : null;
}

// 路由上下文：将公共函数注入各路由模块，避免循环依赖
const routeCtx = {
  loadConfig,
  saveConfig,
  getOssConfig,
  normalizeDingTalkWebhook,
  postJsonToRemoteUrl,
  requestHttps,
  loadRequirementsFromOss,
  saveRequirementsToOss,
  fetchYuqueDoc,
  getYuqueConfigOrError,
  getFileExtFromUrl,
  normalizeAiKey,
  hasAnyAiKey,
  readBody,
  yuqueSvc,
  aiDesignSvc
};

const handleDataRoute     = registerDataRoutes(routeCtx);
const handleConfigRoute   = registerConfigRoutes(routeCtx);
const handleYuqueRoute    = registerYuqueRoutes(routeCtx);
const handleAiDesignRoute = registerAiDesignRoutes(routeCtx);

const server = http.createServer(async (req, res) => {
  // CORS headers — 仅允许白名单来源，防止任意域名跨域调用敏感接口
  // 如需在 ECS 上开放特定域名，请设置环境变量 ALLOWED_ORIGIN=https://your-domain.com
  const requestOrigin = req.headers['origin'];
  const allowedOrigin = getCorsOrigin(requestOrigin);
  if (allowedOrigin) {
    res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
    res.setHeader('Vary', 'Origin');
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const parsedUrl = new URL(req.url, `http://localhost:${PORT}`);
  const pathname  = parsedUrl.pathname;
  const method    = req.method;

  // Health check
  if (pathname === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'ok' }));
    return;
  }

  // ---- 分模块路由派发 ----
  if (await handleDataRoute(pathname, method, req, res))     return;
  if (await handleConfigRoute(pathname, method, req, res))   return;
  if (await handleYuqueRoute(pathname, method, req, res, parsedUrl))  return;
  if (await handleAiDesignRoute(pathname, method, req, res)) return;

  // ---- 静态文件（兜底）----
  if (method === 'GET' && !pathname.startsWith('/api/')) {
    if (pathname === '/config/config.json' || pathname === '/config.json') {
      res.writeHead(403, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Config file is not publicly accessible' }));
      return;
    }
    serveStaticFile(pathname, res);
    return;
  }

  // 404
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Not found' }));
});

server.listen(PORT, () => {
  console.log(`[Server] Running at http://localhost:${PORT}`);
  console.log(`[Server] Open http://localhost:${PORT} in your browser`);
  console.log(`[Server] API endpoints:`);
  console.log(`  GET  /api/data                       - Load requirements`);
  console.log(`  POST /api/data                       - Save requirements`);
  console.log(`  GET  /api/yuque/doc?url=             - Fetch Yuque doc meta`);
  console.log(`  GET  /api/yuque/doc-content?url=     - Fetch Yuque doc full content`);
  console.log(`  GET  /api/yuque/doc-assets?url=      - Fetch Yuque body + images`);
  console.log(`  GET  /api/yuque/doc-images/download? - Download one extracted image`);
  console.log(`  GET  /api/config/client              - Read client runtime config`);
  console.log(`  POST /api/config/dingtalk-webhook    - Save DingTalk webhook`);
  console.log(`  POST /api/config/dingtalk-webhook/clear - Clear DingTalk webhook`);
  console.log(`  POST /api/notify/dingtalk            - Send DingTalk notification`);
  console.log(`  POST /api/ai-design/jobs             - Create AI design job`);
  console.log(`  GET  /api/ai-design/jobs/:id         - Get job status & result`);
  console.log(`  POST /api/ai-design/jobs/:id/retry   - Retry a failed job`);
  console.log(`  GET  /health                         - Health check`);

  const config = loadConfig();
  if (!config || !config.yuque_token || config.yuque_token === 'YOUR_YUQUE_API_TOKEN_HERE') {
    console.warn('[Server] WARNING: Yuque API Token not configured! Please update config/config.json');
  } else {
    console.log('[Server] Yuque API Token loaded successfully');
  }
  if (!hasAnyAiKey(config)) {
    console.warn('[Server] WARNING: AI API Key not configured! AI design assistant will not work.');
  } else {
    console.log(`[Server] AI provider: ${config.ai_provider || 'openai'} / model: ${config.ai_model || 'gpt-4o-mini'}`);
    if (config.ai_decompose_provider || config.ai_decompose_model || normalizeAiKey(config.ai_decompose_api_key)) {
      console.log(`[Server] AI decompose override: provider=${config.ai_decompose_provider || config.ai_provider || 'openai'} / model=${config.ai_decompose_model || config.ai_model || 'gpt-4o-mini'}`);
    }
  }
});
