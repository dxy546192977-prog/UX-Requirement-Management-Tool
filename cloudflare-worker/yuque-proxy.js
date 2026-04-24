/**
 * Cloudflare Worker - 语雀 API CORS 代理
 * 解决 GitHub Pages 跨域无法访问阿里内网语雀 API 的问题
 *
 * 部署后访问地址：https://yuque-proxy.<你的子域>.workers.dev
 * 支持的接口：
 *   GET /api/v2/repos/:group/:book/docs/:doc
 */

const YUQUE_API_BASE = "https://yuque-api.antfin-inc.com";

const ALLOWED_ORIGINS = [
  "https://dxy546192977-prog.github.io",
  "http://localhost:3001",
  "http://127.0.0.1:3001",
];

function buildCorsHeaders(requestOrigin) {
  const origin = ALLOWED_ORIGINS.includes(requestOrigin)
    ? requestOrigin
    : ALLOWED_ORIGINS[0];

  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, X-Auth-Token",
    "Access-Control-Max-Age": "86400",
  };
}

export default {
  async fetch(request) {
    const requestOrigin = request.headers.get("Origin") || "";
    const corsHeaders = buildCorsHeaders(requestOrigin);

    // 处理 OPTIONS 预检请求
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    const url = new URL(request.url);
    const yuqueToken = request.headers.get("X-Auth-Token") || "";

    // 只允许 GET 请求
    if (request.method !== "GET") {
      return new Response(JSON.stringify({ error: "Method not allowed" }), {
        status: 405,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // 转发到语雀 API
    const targetUrl = YUQUE_API_BASE + url.pathname + url.search;

    try {
      const yuqueResponse = await fetch(targetUrl, {
        method: "GET",
        headers: {
          "X-Auth-Token": yuqueToken,
          "Content-Type": "application/json",
          "User-Agent": "cloudflare-worker-yuque-proxy/1.0",
        },
      });

      const responseBody = await yuqueResponse.text();

      return new Response(responseBody, {
        status: yuqueResponse.status,
        headers: {
          ...corsHeaders,
          "Content-Type": yuqueResponse.headers.get("Content-Type") || "application/json",
        },
      });
    } catch (error) {
      return new Response(
        JSON.stringify({ error: "Proxy request failed", message: error.message }),
        {
          status: 502,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }
  },
};
