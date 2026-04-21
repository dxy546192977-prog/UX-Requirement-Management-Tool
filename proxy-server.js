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
      rejectUnauthorized: false
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
  // Default to online-index.html（需求看板入口）
  if (pathname === '/') pathname = '/online-index.html';

  const filePath = path.join(__dirname, pathname);

  // Security: prevent directory traversal
  if (!filePath.startsWith(__dirname)) {
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

// ==================== HTTP Server ====================
const PORT = 3001;

const server = http.createServer(async (req, res) => {
  // CORS headers for API routes
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const parsed = new URL(req.url, `http://localhost:${PORT}`);
  const pathname = parsed.pathname;

  // ---- API Routes ----

  // Health check
  if (pathname === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'ok' }));
    return;
  }

  // GET /api/data - Load saved requirements
  if (pathname === '/api/data' && req.method === 'GET') {
    try {
      const config = loadConfig();
      if (config) {
        try {
          const ossData = await loadRequirementsFromOss(config);
          if (ossData) {
            console.log(`[Data] Loaded ${ossData.requirements.length} requirements from OSS`);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(ossData));
            return;
          }
        } catch (ossErr) {
          console.warn('[Data] OSS load failed, fallback to local file:', ossErr.message);
        }
      }

      if (fs.existsSync(DATA_PATH)) {
        const raw = fs.readFileSync(DATA_PATH, 'utf-8');
        console.log('[Data] Loaded requirements from local file fallback');
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
    return;
  }

  // GET /api/config/client - 前端可读配置（基于 config/config.json）
  if (pathname === '/api/config/client' && req.method === 'GET') {
    const config = loadConfig() || {};
    const hasWebhook = Boolean(normalizeDingTalkWebhook(config.dingtalk_webhook));
    const hasOssConfig = Boolean(getOssConfig(config));
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      has_dingtalk_webhook: hasWebhook,
      dingtalk_webhook: hasWebhook ? normalizeDingTalkWebhook(config.dingtalk_webhook) : '',
      has_oss_config: hasOssConfig
    }));
    return;
  }

  // POST /api/config/dingtalk-webhook - 设置钉钉 webhook（写入 config/config.json）
  if (pathname === '/api/config/dingtalk-webhook' && req.method === 'POST') {
    let body;
    try {
      body = JSON.parse(await readBody(req));
    } catch {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Invalid JSON body' }));
      return;
    }
    const webhookUrl = normalizeDingTalkWebhook(body && body.webhookUrl);
    if (!webhookUrl) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Invalid DingTalk webhook URL' }));
      return;
    }
    const config = loadConfig() || {};
    config.dingtalk_webhook = webhookUrl;
    if (!saveConfig(config)) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Failed to save config/config.json' }));
      return;
    }
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: true }));
    return;
  }

  // POST /api/config/dingtalk-webhook/clear - 清空钉钉 webhook（写入 config/config.json）
  if (pathname === '/api/config/dingtalk-webhook/clear' && req.method === 'POST') {
    const config = loadConfig() || {};
    config.dingtalk_webhook = '';
    if (!saveConfig(config)) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Failed to save config/config.json' }));
      return;
    }
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: true }));
    return;
  }

  // POST /api/notify/dingtalk - 使用 config/config.json 内 webhook 发送通知
  if (pathname === '/api/notify/dingtalk' && req.method === 'POST') {
    let body;
    try {
      body = JSON.parse(await readBody(req));
    } catch {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Invalid JSON body' }));
      return;
    }
    const message = body && body.message;
    if (!message || typeof message !== 'object') {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'message is required' }));
      return;
    }
    const config = loadConfig() || {};
    const webhookUrl = normalizeDingTalkWebhook(config.dingtalk_webhook);
    if (!webhookUrl) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'DingTalk webhook not configured in config/config.json' }));
      return;
    }
    try {
      const result = await postJsonToRemoteUrl(webhookUrl, message);
      if (result.statusCode < 200 || result.statusCode >= 300) {
        res.writeHead(502, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: `DingTalk returned ${result.statusCode}`, detail: result.body || '' }));
        return;
      }
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true }));
    } catch (err) {
      res.writeHead(502, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: err.message }));
    }
    return;
  }

  // POST /api/data - Save requirements
  if (pathname === '/api/data' && req.method === 'POST') {
    try {
      const body = await readBody(req);
      const data = JSON.parse(body);
      const requirements = Array.isArray(data && data.requirements) ? data.requirements : [];
      const payload = { requirements };

      const config = loadConfig();
      if (config) {
        try {
          const saved = await saveRequirementsToOss(config, payload);
          if (saved) {
            console.log(`[Data] Saved ${requirements.length} requirements to OSS`);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: true, storage: 'oss' }));
            return;
          }
        } catch (ossErr) {
          console.warn('[Data] OSS save failed, fallback to local file:', ossErr.message);
        }
      }

      // Ensure data directory exists
      const dataDir = path.dirname(DATA_PATH);
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }

      fs.writeFileSync(DATA_PATH, JSON.stringify(payload, null, 2), 'utf-8');
      console.log(`[Data] Saved ${requirements.length} requirements to local file fallback`);

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, storage: 'local_fallback' }));
    } catch (err) {
      console.error('[Data] Save error:', err.message);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Failed to save data: ' + err.message }));
    }
    return;
  }

  // GET /api/yuque/doc?url=...
  if (pathname === '/api/yuque/doc' && req.method === 'GET') {
    const yuqueUrl = parsed.searchParams.get('url');

    if (!yuqueUrl) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Missing "url" query parameter' }));
      return;
    }

    const config = loadConfig();
    if (!config) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Failed to load config/config.json' }));
      return;
    }

    if (!config.yuque_token || config.yuque_token === 'YOUR_YUQUE_API_TOKEN_HERE') {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Yuque API Token not configured. Please update config/config.json with your token.' }));
      return;
    }

    const parts = parseYuqueUrl(yuqueUrl);
    if (!parts) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Invalid Yuque URL format. Expected: https://aliyuque.antfin.com/{group}/{book}/{doc}' }));
      return;
    }

    console.log(`[Yuque] Fetching doc: ${parts.group_login}/${parts.book_slug}/${parts.doc_slug}`);

    try {
      const result = await fetchYuqueDoc(config, parts.group_login, parts.book_slug, parts.doc_slug);
      const docData = result.data;

      const response = {
        title: docData.title || 'Untitled',
        creator: (docData.creator && docData.creator.name) || (docData.user && docData.user.name) || 'Unknown',
        description: docData.description || '',
        doc_id: docData.id,
        word_count: docData.word_count || 0,
        created_at: docData.created_at,
        updated_at: docData.updated_at
      };

      console.log(`[Yuque] Success - Title: "${response.title}", Creator: "${response.creator}"`);

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(response));
    } catch (err) {
      console.error('[Yuque] Error:', err.message);
      res.writeHead(502, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: err.message }));
    }
    return;
  }

  // GET /api/yuque/doc-assets?url=... — 读取 PRD 正文 + 图片列表
  if (pathname === '/api/yuque/doc-assets' && req.method === 'GET') {
    const yuqueUrl = parsed.searchParams.get('url');
    if (!yuqueUrl) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Missing "url" query parameter' }));
      return;
    }

    const config = getYuqueConfigOrError(res);
    if (!config) return;

    try {
      const parts = yuqueSvc.parseYuqueUrl(yuqueUrl);
      if (!parts) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid Yuque URL format' }));
        return;
      }

      const prdFull = await yuqueSvc.fetchPrdFull(config, yuqueUrl);
      // 从 prdFull.body 提取图片（fetchPrdFull 内部已包含 404 降级逻辑）
      const imageUrls = yuqueSvc.extractImageUrlsFromDoc({ body: prdFull.body, body_lake: prdFull.body });

      const imageItems = imageUrls.map((url, idx) => ({
        index: idx,
        url,
        proxy_download_url: `/api/yuque/doc-images/download?url=${encodeURIComponent(yuqueUrl)}&index=${idx}`
      }));

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        title: prdFull.title,
        creator: prdFull.creator,
        description: prdFull.description,
        body: prdFull.body,
        body_text: prdFull.body_text || '',
        image_count: imageItems.length,
        images: imageItems
      }));
    } catch (err) {
      console.error('[Yuque Assets] Error:', err.message);
      res.writeHead(502, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: err.message }));
    }
    return;
  }

  // GET /api/yuque/doc-images/download?url=...&index=...
  if (pathname === '/api/yuque/doc-images/download' && req.method === 'GET') {
    const yuqueUrl = parsed.searchParams.get('url');
    const indexRaw = parsed.searchParams.get('index');
    if (!yuqueUrl || indexRaw == null) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Both "url" and "index" query parameters are required' }));
      return;
    }
    const index = Number(indexRaw);
    if (!Number.isInteger(index) || index < 0) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Invalid "index" query parameter' }));
      return;
    }

    const config = getYuqueConfigOrError(res);
    if (!config) return;

    try {
      const parts = yuqueSvc.parseYuqueUrl(yuqueUrl);
      if (!parts) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid Yuque URL format' }));
        return;
      }

      const docData = await yuqueSvc.fetchYuqueDocContent(config, parts.group_login, parts.book_slug, parts.doc_slug);
      const imageUrls = yuqueSvc.extractImageUrlsFromDoc(docData);
      const target = imageUrls[index];
      if (!target) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: `Image index out of range: ${index}` }));
        return;
      }

      const fetched = await yuqueSvc.fetchRemoteBinary(target);
      const ext = getFileExtFromUrl(target, fetched.contentType);
      const filename = `yuque-image-${index + 1}${ext}`;

      res.writeHead(200, {
        'Content-Type': fetched.contentType || 'application/octet-stream',
        'Content-Disposition': `attachment; filename="${filename}"`
      });
      res.end(fetched.buffer);
    } catch (err) {
      console.error('[Yuque Image Download] Error:', err.message);
      res.writeHead(502, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: err.message }));
    }
    return;
  }

  // ---- AI Design Assistant Routes ----

  // POST /api/ai-design/jobs — 创建 AI 设计拆解任务
  if (pathname === '/api/ai-design/jobs' && req.method === 'POST') {
    let body;
    try {
      body = JSON.parse(await readBody(req));
    } catch {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Invalid JSON body' }));
      return;
    }

    const { reqId, prdUrl, skillKey } = body;
    if (!reqId || !prdUrl) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'reqId and prdUrl are required' }));
      return;
    }

    const allowedSkills = new Set(['default', 'prd_html_decompose', 'fliggy_flight_prd_to_h5']);
    const skill = allowedSkills.has(skillKey) ? skillKey : 'default';

    const config = loadConfig();
    if (!config) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Failed to load config/config.json' }));
      return;
    }

    const isMock = !hasAnyAiKey(config);
    if (isMock) {
      console.log('[AiDesign] No valid ai_api_key / ai_decompose_api_key — running in MOCK mode');
    }

    const job = aiDesignSvc.createJob(reqId, prdUrl, config, yuqueSvc, { skillKey: skill });
    console.log(`[AiDesign] Created job ${job.id} for req ${reqId}${isMock ? ' (mock)' : ''}`);

    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(job));
    return;
  }

  // GET /api/ai-design/jobs/:id — 查询任务状态与产物
  const jobGetMatch = pathname.match(/^\/api\/ai-design\/jobs\/([^/]+)$/);
  if (jobGetMatch && req.method === 'GET') {
    const jobId = jobGetMatch[1];
    const job   = aiDesignSvc.getJob(jobId);
    if (!job) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: `Job ${jobId} not found` }));
      return;
    }
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(job));
    return;
  }

  // POST /api/ai-design/jobs/:id/retry — 重跑任务
  const jobRetryMatch = pathname.match(/^\/api\/ai-design\/jobs\/([^/]+)\/retry$/);
  if (jobRetryMatch && req.method === 'POST') {
    const jobId  = jobRetryMatch[1];
    const config = loadConfig();
    if (!config) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Failed to load config/config.json' }));
      return;
    }

    // 先尝试重跑内存中已有的 Job
    let job = aiDesignSvc.retryJob(jobId, config, yuqueSvc);

    // Job 不在内存中（后端重启后丢失），从请求 body 读取参数重新创建
    if (!job) {
      const body = await new Promise((resolve) => {
        let raw = '';
        req.on('data', chunk => { raw += chunk; });
        req.on('end', () => {
          try { resolve(JSON.parse(raw)); } catch { resolve({}); }
        });
      });
      const { req_id, prd_url, skill_key } = body;
      if (!req_id || !prd_url) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: `Job ${jobId} not found，请提供 req_id 和 prd_url 重新创建` }));
        return;
      }
      console.log(`[AiDesign] Job ${jobId} not in memory, creating new job for req ${req_id}`);
      job = aiDesignSvc.createJob(req_id, prd_url, config, yuqueSvc, { skillKey: skill_key || 'default' });
    } else {
      console.log(`[AiDesign] Retrying job ${jobId}`);
    }

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(job));
    return;
  }

  // POST /api/ai-design/jobs/:id/confirm — 确认方案并触发 H5 生成
  const jobConfirmMatch = pathname.match(/^\/api\/ai-design\/jobs\/([^/]+)\/confirm$/);
  if (jobConfirmMatch && req.method === 'POST') {
    const jobId  = jobConfirmMatch[1];
    const config = loadConfig();
    if (!config) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Failed to load config/config.json' }));
      return;
    }

    const job = aiDesignSvc.confirmJob(jobId, config, yuqueSvc);
    if (!job) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: `Job ${jobId} not found` }));
      return;
    }
    console.log(`[AiDesign] Confirmed job ${jobId}, H5 generation started`);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(job));
    return;
  }

  // GET /api/yuque/doc-content?url=... — 读取 PRD 正文
  if (pathname === '/api/yuque/doc-content' && req.method === 'GET') {
    const yuqueUrl = parsed.searchParams.get('url');
    if (!yuqueUrl) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Missing "url" query parameter' }));
      return;
    }

    const config = loadConfig();
    if (!config || !config.yuque_token || config.yuque_token === 'YOUR_YUQUE_API_TOKEN_HERE') {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Yuque API Token not configured' }));
      return;
    }

    try {
      const prdFull = await yuqueSvc.fetchPrdFull(config, yuqueUrl);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(prdFull));
    } catch (err) {
      console.error('[Yuque Content] Error:', err.message);
      res.writeHead(502, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: err.message }));
    }
    return;
  }

  // ---- Static Files (fallback) ----
  if (req.method === 'GET' && !pathname.startsWith('/api/')) {
    if (pathname === '/config/config.json' || pathname === '/config.json') {
      res.writeHead(403, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Config file is not publicly accessible' }));
      return;
    }
    serveStaticFile(pathname, res);
    return;
  }

  // 404 for other routes
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
