'use strict';

const https = require('https');
const http = require('http');
const { URL } = require('url');
const { execFile } = require('child_process');

/**
 * 将语雀 URL 的域名统一转换为 yuque.antfin.com（skylark 工具要求）
 * aliyuque.antfin.com → yuque.antfin.com
 * yuque.alibaba-inc.com → yuque.antfin.com
 */
function normalizeYuqueDomain(rawUrl) {
  try {
    const parsed = new URL(rawUrl);
    if (parsed.hostname === 'aliyuque.antfin.com' || parsed.hostname === 'yuque.alibaba-inc.com') {
      parsed.hostname = 'yuque.antfin.com';
    }
    return parsed.toString();
  } catch {
    return rawUrl;
  }
}

/**
 * 通过 ali-mcpcli 调用 skylark_resolve_url 解析语雀 URL，返回 { type, id }
 */
function skylarkResolveUrl(yuqueUrl) {
  const normalizedUrl = normalizeYuqueDomain(yuqueUrl);
  return new Promise((resolve, reject) => {
    execFile(
      'ali-mcpcli',
      ['call', 'skylark', 'skylark_resolve_url', JSON.stringify({ url: normalizedUrl })],
      { timeout: 15000 },
      (err, stdout, stderr) => {
        if (err) {
          return reject(new Error('skylark_resolve_url failed: ' + (err.message || stderr)));
        }
        try {
          const raw = JSON.parse(stdout.trim());
          // ali-mcpcli 返回结构为 { ok, data: {...} } 或直接是文档对象
          const result = (raw && raw.data) ? raw.data : raw;
          if (!result || !result.id) {
            return reject(new Error('skylark_resolve_url returned no id: ' + stdout));
          }
          resolve(result);
        } catch (parseErr) {
          reject(new Error('Failed to parse skylark_resolve_url output: ' + stdout));
        }
      }
    );
  });
}

/**
 * 通过 ali-mcpcli 调用 skylark_doc_detail 获取文档详情
 * 返回包含 title、user（creator）、description 等字段的文档对象
 */
function skylarkDocDetail(docId) {
  return new Promise((resolve, reject) => {
    execFile(
      'ali-mcpcli',
      ['call', 'skylark', 'skylark_doc_detail', JSON.stringify({ doc_id: docId })],
      { timeout: 15000 },
      (err, stdout, stderr) => {
        if (err) {
          return reject(new Error('skylark_doc_detail failed: ' + (err.message || stderr)));
        }
        try {
          const result = JSON.parse(stdout.trim());
          if (!result) {
            return reject(new Error('skylark_doc_detail returned empty result'));
          }
          resolve(result);
        } catch (parseErr) {
          reject(new Error('Failed to parse skylark_doc_detail output: ' + stdout));
        }
      }
    );
  });
}

/**
 * 通过 ali-mcpcli skylark 工具获取语雀文档的元数据（标题、创建者、描述）
 * 优先路径：不依赖 OpenAPI Token，使用内网登录态
 *
 * 返回格式：{ title, creator, creator_login, description, doc_id }
 */
async function fetchDocViaSkylark(yuqueUrl) {
  // Step 0: 先清洗 URL，去掉 /g/ 前缀、/collaborator/join 等协作者邀请后缀
  const cleanedUrl = cleanYuqueUrl(yuqueUrl);
  // Step 1: 解析 URL 获取 doc_id
  const resolved = await skylarkResolveUrl(cleanedUrl);
  if (resolved.type.toLowerCase() !== 'doc') {
    throw new Error(`URL 解析结果类型不是 doc，而是 ${resolved.type}`);
  }

  // Step 2: 获取文档详情
  const docDetail = await skylarkDocDetail(resolved.id);

  // 兼容 skylark_doc_detail 返回的多种结构
  const docData = docDetail.data || docDetail;

  const creatorObj = docData.creator || docData.user || {};
  const creatorName = creatorObj.name || creatorObj.login || creatorObj.nickname || '';
  const creatorLogin = creatorObj.login || '';

  return {
    title: docData.title || 'Untitled',
    creator: creatorName,
    creator_login: creatorLogin,
    description: docData.description || docData.abstract || '',
    doc_id: resolved.id
  };
}

/**
 * 从语雀 URL 中解析出 group_login / book_slug / doc_slug
 * 自动做 URL 清洗（去掉 /g/ 前缀、/collaborator/join 后缀等），保证解析稳定
 */
function parseYuqueUrl(yuqueUrl) {
  try {
    const cleaned = cleanYuqueUrl(yuqueUrl);
    const parsed = new URL(cleaned);
    const segments = parsed.pathname.replace(/^\//, '').split('/').filter(Boolean);
    // 再次跳过可能的 "g" 前缀段，兼容未经清洗的 URL
    if (segments[0] === 'g' && segments.length > 1) segments.shift();
    if (segments.length < 3) return null;
    return {
      group_login: segments[0],
      book_slug:   segments[1],
      doc_slug:    segments[2]
    };
  } catch {
    return null;
  }
}

/**
 * 清洗语雀 URL：去掉协作者邀请后缀、/g/ 前缀、/markdown 后缀等，转换为标准文档链接
 * 同时去掉锚点和粘贴文本中残留的标题后缀，例如：
 *   https://aliyuque.antfin.com/g/journey.fyn/xolgry/yay0cg2a0f0kskyc/collaborator/join?token=xxx
 *   → https://aliyuque.antfin.com/journey.fyn/xolgry/yay0cg2a0f0kskyc
 *   https://aliyuque.antfin.com/.../doc#《标题》
 *   → https://aliyuque.antfin.com/.../doc
 */
function cleanYuqueUrl(rawUrl) {
  if (!rawUrl || typeof rawUrl !== 'string') return rawUrl;
  let input = rawUrl.trim();
  // 去掉粘贴文本中 # 或 ＃ 后残留的 《标题》等内容
  input = input.replace(/[#＃].*$/, '').trim();
  try {
    const parsed = new URL(input);
    const segments = parsed.pathname.replace(/^\//, '').split('/').filter(Boolean);
    // 跳过 "g" 前缀段
    if (segments[0] === 'g' && segments.length > 1) segments.shift();
    // 只取前 3 段：group_login / book_slug / doc_slug
    if (segments.length >= 3) {
      const cleanPath = segments.slice(0, 3).join('/');
      return `${parsed.protocol}//${parsed.host}/${cleanPath}`;
    }
    // 少于 3 段时返回去掉 query / hash 的版本，避免带着 token 继续请求
    return `${parsed.protocol}//${parsed.host}${parsed.pathname}`;
  } catch {
    return input;
  }
}

// 保留内部别名以兼容既有调用
const _cleanYuqueUrl = cleanYuqueUrl;

function _pickDocBody(docData) {
  return docData.body_lake || docData.body || docData.body_draft || docData.description || '';
}

/**
 * 通过语雀 OpenAPI 获取文档元数据（标题、创建者、描述）
 */
function fetchYuqueDocMeta(config, group_login, book_slug, doc_slug) {
  return _yuqueGet(config, `/api/v2/repos/${group_login}/${book_slug}/docs/${doc_slug}`);
}

/**
 * 通过语雀 OpenAPI 获取文档正文（body_html / body_lake / body）
 * raw=1 时返回原始 markdown
 */
function fetchYuqueDocContent(config, group_login, book_slug, doc_slug) {
  return _yuqueGet(config, `/api/v2/repos/${group_login}/${book_slug}/docs/${doc_slug}?raw=1`);
}

function _yuqueGet(config, apiPath) {
  return new Promise((resolve, reject) => {
    const url     = `${config.yuque_api_base}${apiPath}`;
    const parsed  = new URL(url);
    const options = {
      hostname:           parsed.hostname,
      port:               parsed.port || 443,
      path:               parsed.pathname + parsed.search,
      method:             'GET',
      headers: {
        'X-Auth-Token':   config.yuque_token,
        'Content-Type':   'application/json',
        'User-Agent':     'RequirementsManagement/1.0'
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
            reject(new Error(`Yuque API ${res.statusCode}: ${json.message || data}`));
            return;
          }
          resolve(json.data || json);
        } catch (err) {
          reject(new Error('Failed to parse Yuque response: ' + err.message));
        }
      });
    });

    req.on('error', (err) => reject(new Error('Yuque request failed: ' + err.message)));
    req.setTimeout(15000, () => { req.destroy(); reject(new Error('Yuque request timed out')); });
    req.end();
  });
}

/**
 * 通过 yuque-fetch.mjs 用浏览器登录态抓取语雀文档
 * 适用于语雀 OpenAPI Token 无权限访问的文档（降级方案）
 */
function fetchPrdViaYuqueFetch(prdUrl) {
  return new Promise((resolve, reject) => {
    // 查找 yuque-fetch.mjs 脚本路径（支持多个可能的位置）
    const path = require('path');
    const possiblePaths = [
      path.join(__dirname, '.agents/skills/yuque-doc-fetch/scripts/yuque-fetch.mjs'),
      path.join(__dirname, '../.agents/skills/yuque-doc-fetch/scripts/yuque-fetch.mjs'),
      path.join(process.env.HOME || '', '.claude/skills/yuque-doc-fetch/scripts/yuque-fetch.mjs'),
    ];

    const scriptPath = possiblePaths.find(p => {
      try { require('fs').accessSync(p); return true; } catch { return false; }
    });

    if (!scriptPath) {
      return reject(new Error('yuque-fetch.mjs not found'));
    }

    execFile('node', [scriptPath, prdUrl], { timeout: 30000 }, (err, stdout, stderr) => {
      if (err) return reject(new Error('yuque-fetch.mjs failed: ' + err.message));
      const body = stdout.trim();
      if (!body) return reject(new Error('yuque-fetch.mjs returned empty content'));
      resolve({
        title:   'PRD Document',
        creator: 'Unknown',
        description: '',
        body,
        body_text: body
      });
    });
  });
}

/**
 * 一站式：给定 PRD URL，返回 { title, creator, description, body }
 * body 是 markdown/lake 正文字符串（可能为空字符串，若 API 不返回正文）
 * 当 OpenAPI Token 无权限（404）时，自动降级使用 ali-mcpcli 读取
 */
async function fetchPrdFull(config, prdUrl) {
  // 清洗 URL：去掉协作者邀请后缀、/g/ 前缀等，转换为标准文档链接
  const cleanedUrl = _cleanYuqueUrl(prdUrl);
  const parts = parseYuqueUrl(cleanedUrl);
  if (!parts) throw new Error(`无法解析语雀 URL: ${prdUrl}`);

  let docData;
  try {
    docData = await fetchYuqueDocContent(config, parts.group_login, parts.book_slug, parts.doc_slug);
  } catch (err) {
    // 当 OpenAPI 返回 404 时，尝试用 yuque-fetch.mjs 降级读取（使用清洗后的 URL）
    if (err.message && err.message.includes('404')) {
      console.warn(`[Yuque] OpenAPI 404，尝试 yuque-fetch.mjs 降级读取: ${cleanedUrl}`);
      try {
        docData = await fetchPrdViaYuqueFetch(cleanedUrl);
      } catch (fetchErr) {
        console.warn(`[Yuque] yuque-fetch.mjs 降级也失败: ${fetchErr.message}`);
        throw err; // 抛出原始错误
      }
    } else {
      throw err;
    }
  }

  const body = _pickDocBody(docData);

  return {
    title:   docData.title   || 'Untitled',
    creator: (docData.creator && docData.creator.name)
           || (docData.user    && docData.user.name)
           || 'Unknown',
    description: docData.description || '',
    body,
    body_text: extractTextFromDocBody(body)
  };
}

function extractTextFromDocBody(body) {
  if (!body) return '';
  // Try parse as JSON (body_lake sometimes is a structured JSON string)
  try {
    const parsed = typeof body === 'string' ? JSON.parse(body) : body;
    const text = _walkForText(parsed).join('\n').trim();
    if (text) return text;
  } catch (_) {
    // body is likely raw markdown or HTML string
  }

  const str = String(body);
  if (/<[a-z][\s\S]*>/i.test(str)) {
    return str
      .replace(/<style[\s\S]*?<\/style>/gi, ' ')
      .replace(/<script[\s\S]*?<\/script>/gi, ' ')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }
  return str.replace(/\s+/g, ' ').trim();
}

function _walkForText(node) {
  if (node == null) return [];
  if (typeof node === 'string') return [node];
  if (typeof node === 'number' || typeof node === 'boolean') return [String(node)];
  if (Array.isArray(node)) return node.flatMap(_walkForText);
  if (typeof node === 'object') {
    const out = [];
    if (typeof node.text === 'string') out.push(node.text);
    if (typeof node.title === 'string') out.push(node.title);
    if (typeof node.description === 'string') out.push(node.description);
    Object.keys(node).forEach((k) => {
      if (k === 'text' || k === 'title' || k === 'description') return;
      out.push(..._walkForText(node[k]));
    });
    return out;
  }
  return [];
}

function extractImageUrlsFromDoc(docData) {
  const candidates = new Set();

  const fields = [
    docData && docData.body_lake,
    docData && docData.body,
    docData && docData.body_draft,
    docData && docData.description
  ].filter(Boolean);

  fields.forEach((field) => {
    const str = String(field);
    // 1) HTML img src
    const imgSrcRegex = /<img[^>]+src=["']([^"']+)["']/gi;
    let m1;
    while ((m1 = imgSrcRegex.exec(str)) !== null) {
      const normalized = _normalizeImageUrl(m1[1]);
      if (normalized) candidates.add(normalized);
    }

    // 2) Generic URL scan
    const urlRegex = /https?:\/\/[^\s"'<>\\]+/gi;
    let m2;
    while ((m2 = urlRegex.exec(str)) !== null) {
      const normalized = _normalizeImageUrl(m2[0]);
      if (normalized && _looksLikeImageUrl(normalized)) candidates.add(normalized);
    }
  });

  return Array.from(candidates);
}

function _normalizeImageUrl(raw) {
  if (!raw) return null;
  let u = String(raw).trim();
  if (!u) return null;
  if (u.startsWith('//')) u = 'https:' + u;
  if (!/^https?:\/\//i.test(u)) return null;
  return u;
}

function _looksLikeImageUrl(url) {
  const lower = url.toLowerCase();
  if (/\.(png|jpe?g|gif|webp|bmp|svg)(\?|$)/.test(lower)) return true;
  // Yuque / Ali internal image domains often have no extension.
  if (lower.includes('/yuque') || lower.includes('alicdn.com') || lower.includes('aliyuncs.com')) return true;
  return false;
}

function fetchRemoteBinary(url, options) {
  const opts = options || {};
  const maxRedirects = Number.isInteger(opts.maxRedirects) ? opts.maxRedirects : 3;
  return _fetchRemoteBinaryInternal(url, maxRedirects);
}

function _fetchRemoteBinaryInternal(url, redirectsLeft) {
  return new Promise((resolve, reject) => {
    let parsed;
    try {
      parsed = new URL(url);
    } catch (err) {
      reject(new Error('Invalid URL: ' + err.message));
      return;
    }
    const lib = parsed.protocol === 'http:' ? http : https;
    const req = lib.request({
      hostname: parsed.hostname,
      port: parsed.port || (parsed.protocol === 'http:' ? 80 : 443),
      path: parsed.pathname + parsed.search,
      method: 'GET',
      headers: {
        'User-Agent': 'RequirementsManagement/1.0',
        'Accept': '*/*'
      },
      rejectUnauthorized: false
    }, (res) => {
      const statusCode = res.statusCode || 0;
      if ([301, 302, 307, 308].includes(statusCode) && res.headers.location) {
        if (redirectsLeft <= 0) {
          reject(new Error('Too many redirects'));
          return;
        }
        const nextUrl = new URL(res.headers.location, parsed).toString();
        resolve(_fetchRemoteBinaryInternal(nextUrl, redirectsLeft - 1));
        return;
      }
      if (statusCode < 200 || statusCode >= 300) {
        reject(new Error(`Remote responded with ${statusCode}`));
        return;
      }
      const chunks = [];
      res.on('data', (chunk) => chunks.push(chunk));
      res.on('end', () => {
        const buffer = Buffer.concat(chunks);
        resolve({
          buffer,
          contentType: res.headers['content-type'] || 'application/octet-stream'
        });
      });
    });

    req.on('error', (err) => reject(new Error('Remote request failed: ' + err.message)));
    req.setTimeout(15000, () => {
      req.destroy();
      reject(new Error('Remote request timed out'));
    });
    req.end();
  });
}

module.exports = {
  parseYuqueUrl,
  cleanYuqueUrl,
  fetchYuqueDocMeta,
  fetchYuqueDocContent,
  fetchPrdFull,
  extractTextFromDocBody,
  extractImageUrlsFromDoc,
  fetchRemoteBinary,
  fetchDocViaSkylark
};
