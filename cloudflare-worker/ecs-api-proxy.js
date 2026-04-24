/**
 * Cloudflare Worker - 全站反代到 ECS 上的 proxy-server (HTTP)
 * 让 https 的 GitHub Pages 能调用同源外的 HTTPS API，避免混合内容被浏览器拦截。
 *
 * 部署：cd cloudflare-worker && npx wrangler deploy -c wrangler.ecs-api.toml
 * 用 wrangler 输出的 https://<name>.<子域>.workers.dev 根地址，填到 pages/ecs-api-endpoint.js
 */

const DEFAULT_UPSTREAM = "http://121.41.229.77";

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Max-Age": "86400",
  };
}

function isAllowedPath(pathname) {
  if (pathname === "/health") return true;
  if (pathname.startsWith("/api/")) return true;
  return false;
}

export default {
  /**
   * @param {Request} request
   * @param {{ UPSTREAM?: string }} env
   */
  async fetch(request, env) {
    const raw = (env && env.UPSTREAM) || DEFAULT_UPSTREAM;
    const upstream = String(raw).replace(/\/+$/, "") || DEFAULT_UPSTREAM;
    const cors = corsHeaders();

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: cors });
    }

    const url = new URL(request.url);
    if (!isAllowedPath(url.pathname)) {
      return new Response(JSON.stringify({ error: "Not allowed" }), {
        status: 404,
        headers: { ...cors, "Content-Type": "application/json" },
      });
    }

    const targetUrl = new URL(url.pathname + url.search, upstream + "/").href;

    try {
      const method = request.method;
      if (method !== "GET" && method !== "POST") {
        return new Response(JSON.stringify({ error: "Method not allowed" }), {
          status: 405,
          headers: { ...cors, "Content-Type": "application/json" },
        });
      }

      const init = {
        method,
        headers: { "User-Agent": "cf-ecs-api-proxy/1" },
        redirect: "follow",
      };

      if (method === "POST") {
        const ct = request.headers.get("Content-Type");
        if (ct) init.headers["Content-Type"] = ct;
        init.body = request.body;
        // @ts-ignore
        if (init.body) init.duplex = "half";
      }

      const upstreamRes = await fetch(targetUrl, init);
      const body = await upstreamRes.arrayBuffer();

      const out = new Response(body, {
        status: upstreamRes.status,
        headers: {
          ...cors,
          "Content-Type": upstreamRes.headers.get("Content-Type") || "application/json",
        },
      });
      return out;
    } catch (err) {
      return new Response(
        JSON.stringify({ error: "Proxy failed", message: (err && err.message) || String(err) }),
        { status: 502, headers: { ...cors, "Content-Type": "application/json" } }
      );
    }
  },
};
