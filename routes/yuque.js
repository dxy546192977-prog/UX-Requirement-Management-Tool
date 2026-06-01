'use strict';

/**
 * routes/yuque.js
 * 语雀相关路由：
 *   GET /api/yuque/doc                  — 获取文档元数据
 *   GET /api/yuque/doc-content          — 获取文档正文
 *   GET /api/yuque/doc-assets           — 获取文档正文 + 图片列表
 *   GET /api/yuque/doc-images/download  — 下载单张图片
 */

module.exports = function registerYuqueRoutes(ctx) {
  const {
    loadConfig,
    fetchYuqueDoc,
    getYuqueConfigOrError,
    getFileExtFromUrl,
    yuqueSvc
  } = ctx;

  return async function handleYuqueRoute(pathname, method, req, res, parsedUrl) {
    // GET /api/yuque/doc?url=...
    if (pathname === '/api/yuque/doc' && method === 'GET') {
      const rawYuqueUrl = parsedUrl.searchParams.get('url');
      if (!rawYuqueUrl) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Missing "url" query parameter' }));
        return true;
      }

      const config = loadConfig();
      if (!config) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Failed to load config/config.json' }));
        return true;
      }

      const yuqueUrl = yuqueSvc.cleanYuqueUrl(rawYuqueUrl);
      const parts = yuqueSvc.parseYuqueUrl(yuqueUrl);
      const hasToken = Boolean(config.yuque_token && config.yuque_token !== 'YOUR_YUQUE_API_TOKEN_HERE');

      let openapiError = null;
      if (hasToken) {
        if (!parts) {
          console.warn(`[Yuque] URL 无法解析为 {group}/{book}/{doc}，跳过 OpenAPI，尝试 Skylark: ${yuqueUrl}`);
        } else {
          console.log(`[Yuque] OpenAPI first: ${parts.group_login}/${parts.book_slug}/${parts.doc_slug}`);
          try {
            const result = await fetchYuqueDoc(config, parts.group_login, parts.book_slug, parts.doc_slug);
            const docData = result.data || {};
            const creatorObj = docData.creator || docData.user || {};
            const creatorName = creatorObj.name || creatorObj.login || creatorObj.nickname || 'Unknown';
            const creatorLogin = creatorObj.login || '';
            const response = {
              title: docData.title || 'Untitled',
              creator: creatorName,
              creator_login: creatorLogin,
              description: docData.description || '',
              doc_id: docData.id,
              word_count: docData.word_count || 0,
              created_at: docData.created_at,
              updated_at: docData.updated_at
            };
            console.log(`[Yuque] OpenAPI success - Title: "${response.title}", Creator: "${response.creator}" (login=${creatorLogin})`);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(response));
            return true;
          } catch (err) {
            openapiError = err;
            console.warn(`[Yuque] OpenAPI failed (${err.message})，尝试 Skylark 兜底`);
          }
        }
      } else {
        console.log('[Yuque] yuque_token 未配置，跳过 OpenAPI，直接走 Skylark');
      }

      try {
        const skylarkResult = await yuqueSvc.fetchDocViaSkylark(yuqueUrl);
        console.log(`[Yuque] Skylark success - Title: "${skylarkResult.title}", Creator: "${skylarkResult.creator}" (login=${skylarkResult.creator_login})`);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          title: skylarkResult.title,
          creator: skylarkResult.creator,
          creator_login: skylarkResult.creator_login,
          description: skylarkResult.description,
          doc_id: skylarkResult.doc_id
        }));
        return true;
      } catch (skylarkErr) {
        console.error(`[Yuque] Skylark failed: ${skylarkErr.message}`);
        const detail = openapiError
          ? `OpenAPI: ${openapiError.message}; Skylark: ${skylarkErr.message}`
          : `Skylark: ${skylarkErr.message}`;
        const hint = !hasToken
          ? '请配置 config/config.json 中的 yuque_token，或检查内网/VPN 与 ali-mcpcli 可用性。'
          : '请检查语雀 Token 是否有该文档权限，或内网 / VPN 是否通畅。';
        res.writeHead(502, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: `无法获取语雀 PRD 信息：${hint}`, detail }));
        return true;
      }
    }

    // GET /api/yuque/doc-content?url=...
    if (pathname === '/api/yuque/doc-content' && method === 'GET') {
      const yuqueUrl = parsedUrl.searchParams.get('url');
      if (!yuqueUrl) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Missing "url" query parameter' }));
        return true;
      }

      const config = loadConfig();
      if (!config || !config.yuque_token || config.yuque_token === 'YOUR_YUQUE_API_TOKEN_HERE') {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Yuque API Token not configured' }));
        return true;
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
      return true;
    }

    // GET /api/yuque/doc-assets?url=...
    if (pathname === '/api/yuque/doc-assets' && method === 'GET') {
      const yuqueUrl = parsedUrl.searchParams.get('url');
      if (!yuqueUrl) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Missing "url" query parameter' }));
        return true;
      }

      const config = getYuqueConfigOrError(res);
      if (!config) return true;

      try {
        const parts = yuqueSvc.parseYuqueUrl(yuqueUrl);
        if (!parts) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Invalid Yuque URL format' }));
          return true;
        }

        const prdFull = await yuqueSvc.fetchPrdFull(config, yuqueUrl);
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
      return true;
    }

    // GET /api/yuque/doc-images/download?url=...&index=...
    if (pathname === '/api/yuque/doc-images/download' && method === 'GET') {
      const yuqueUrl = parsedUrl.searchParams.get('url');
      const indexRaw = parsedUrl.searchParams.get('index');
      if (!yuqueUrl || indexRaw == null) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Both "url" and "index" query parameters are required' }));
        return true;
      }
      const index = Number(indexRaw);
      if (!Number.isInteger(index) || index < 0) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid "index" query parameter' }));
        return true;
      }

      const config = getYuqueConfigOrError(res);
      if (!config) return true;

      try {
        const parts = yuqueSvc.parseYuqueUrl(yuqueUrl);
        if (!parts) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Invalid Yuque URL format' }));
          return true;
        }

        const docData = await yuqueSvc.fetchYuqueDocContent(config, parts.group_login, parts.book_slug, parts.doc_slug);
        const imageUrls = yuqueSvc.extractImageUrlsFromDoc(docData);
        const target = imageUrls[index];
        if (!target) {
          res.writeHead(404, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: `Image index out of range: ${index}` }));
          return true;
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
      return true;
    }

    return false;
  };
};
