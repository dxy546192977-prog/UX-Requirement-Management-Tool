'use strict';

const https = require('https');
const http = require('http');
const { URL } = require('url');

/**
 * 从语雀 URL 中解析出 group_login / book_slug / doc_slug
 */
function parseYuqueUrl(yuqueUrl) {
  try {
    const parsed = new URL(yuqueUrl);
    const segments = parsed.pathname.replace(/^\//, '').split('/').filter(Boolean);
    // 跳过可能的 "g" 前缀段
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
 * 一站式：给定 PRD URL，返回 { title, creator, description, body }
 * body 是 markdown/lake 正文字符串（可能为空字符串，若 API 不返回正文）
 */
async function fetchPrdFull(config, prdUrl) {
  const parts = parseYuqueUrl(prdUrl);
  if (!parts) throw new Error(`无法解析语雀 URL: ${prdUrl}`);

  const docData = await fetchYuqueDocContent(config, parts.group_login, parts.book_slug, parts.doc_slug);
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
  fetchYuqueDocMeta,
  fetchYuqueDocContent,
  fetchPrdFull,
  extractTextFromDocBody,
  extractImageUrlsFromDoc,
  fetchRemoteBinary
};
