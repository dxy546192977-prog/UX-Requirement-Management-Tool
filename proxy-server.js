const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');

// ==================== Config ====================
const CONFIG_PATH = path.join(__dirname, 'config.json');
const DATA_PATH = path.join(__dirname, 'data', 'local_requirements.json');

function loadConfig() {
  try {
    const raw = fs.readFileSync(CONFIG_PATH, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('[Config] Failed to read config.json:', err.message);
    return null;
  }
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

    req.setTimeout(10000, () => {
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
  // Default to index.html
  if (pathname === '/') pathname = '/index.html';

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
      if (fs.existsSync(DATA_PATH)) {
        const raw = fs.readFileSync(DATA_PATH, 'utf-8');
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(raw);
      } else {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ requirements: null }));
      }
    } catch (err) {
      console.error('[Data] Load error:', err.message);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Failed to load data' }));
    }
    return;
  }

  // POST /api/data - Save requirements
  if (pathname === '/api/data' && req.method === 'POST') {
    try {
      const body = await readBody(req);
      const data = JSON.parse(body);

      // Ensure data directory exists
      const dataDir = path.dirname(DATA_PATH);
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }

      fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2), 'utf-8');
      console.log(`[Data] Saved ${data.requirements ? data.requirements.length : 0} requirements`);

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true }));
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
      res.end(JSON.stringify({ error: 'Failed to load config.json' }));
      return;
    }

    if (!config.yuque_token || config.yuque_token === 'YOUR_YUQUE_API_TOKEN_HERE') {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Yuque API Token not configured. Please update config.json with your token.' }));
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

  // ---- Static Files (fallback) ----
  if (req.method === 'GET' && !pathname.startsWith('/api/')) {
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
  console.log(`  GET  /api/data          - Load requirements`);
  console.log(`  POST /api/data          - Save requirements`);
  console.log(`  GET  /api/yuque/doc?url= - Fetch Yuque doc info`);
  console.log(`  GET  /health            - Health check`);

  const config = loadConfig();
  if (!config || !config.yuque_token || config.yuque_token === 'YOUR_YUQUE_API_TOKEN_HERE') {
    console.warn('[Server] WARNING: Yuque API Token not configured! Please update config.json');
  } else {
    console.log('[Server] Yuque API Token loaded successfully');
  }
});
