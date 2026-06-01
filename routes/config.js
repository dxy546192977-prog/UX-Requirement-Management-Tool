'use strict';

/**
 * routes/config.js
 * 配置与通知路由：
 *   GET  /api/config/client               — 获取前端可读配置
 *   POST /api/config/dingtalk-webhook     — 设置钉钉 Webhook
 *   POST /api/config/dingtalk-webhook/clear — 清空钉钉 Webhook
 *   POST /api/notify/dingtalk             — 发送钉钉通知
 */

module.exports = function registerConfigRoutes(ctx) {
  const {
    loadConfig,
    saveConfig,
    getOssConfig,
    normalizeDingTalkWebhook,
    postJsonToRemoteUrl,
    readBody
  } = ctx;

  return async function handleConfigRoute(pathname, method, req, res) {
    // GET /api/config/client
    if (pathname === '/api/config/client' && method === 'GET') {
      const config = loadConfig() || {};
      const hasWebhook = Boolean(normalizeDingTalkWebhook(config.dingtalk_webhook));
      const hasOssConfig = Boolean(getOssConfig(config));
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        has_dingtalk_webhook: hasWebhook,
        dingtalk_webhook: '',
        has_oss_config: hasOssConfig
      }));
      return true;
    }

    // POST /api/config/dingtalk-webhook
    if (pathname === '/api/config/dingtalk-webhook' && method === 'POST') {
      let body;
      try {
        body = JSON.parse(await readBody(req));
      } catch {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid JSON body' }));
        return true;
      }
      const webhookUrl = normalizeDingTalkWebhook(body && body.webhookUrl);
      if (!webhookUrl) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid DingTalk webhook URL' }));
        return true;
      }
      const config = loadConfig() || {};
      config.dingtalk_webhook = webhookUrl;
      if (!saveConfig(config)) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Failed to save config/config.json' }));
        return true;
      }
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true }));
      return true;
    }

    // POST /api/config/dingtalk-webhook/clear
    if (pathname === '/api/config/dingtalk-webhook/clear' && method === 'POST') {
      const config = loadConfig() || {};
      config.dingtalk_webhook = '';
      if (!saveConfig(config)) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Failed to save config/config.json' }));
        return true;
      }
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true }));
      return true;
    }

    // POST /api/notify/dingtalk
    if (pathname === '/api/notify/dingtalk' && method === 'POST') {
      let body;
      try {
        body = JSON.parse(await readBody(req));
      } catch {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid JSON body' }));
        return true;
      }
      const message = body && body.message;
      if (!message || typeof message !== 'object') {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'message is required' }));
        return true;
      }
      const config = loadConfig() || {};
      const webhookUrl = normalizeDingTalkWebhook(config.dingtalk_webhook);
      if (!webhookUrl) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'DingTalk webhook not configured in config/config.json' }));
        return true;
      }
      try {
        const result = await postJsonToRemoteUrl(webhookUrl, message);
        if (result.statusCode < 200 || result.statusCode >= 300) {
          res.writeHead(502, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: `DingTalk returned ${result.statusCode}`, detail: result.body || '' }));
          return true;
        }
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true }));
      } catch (err) {
        res.writeHead(502, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      }
      return true;
    }

    return false;
  };
};
