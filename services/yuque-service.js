'use strict';

const https = require('https');

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

  // 正文优先级：body_lake（语雀私有格式）> body（HTML）> body_draft > description
  const body = docData.body_lake || docData.body || docData.body_draft || docData.description || '';

  return {
    title:   docData.title   || 'Untitled',
    creator: (docData.creator && docData.creator.name)
           || (docData.user    && docData.user.name)
           || 'Unknown',
    description: docData.description || '',
    body
  };
}

module.exports = { parseYuqueUrl, fetchYuqueDocMeta, fetchYuqueDocContent, fetchPrdFull };
