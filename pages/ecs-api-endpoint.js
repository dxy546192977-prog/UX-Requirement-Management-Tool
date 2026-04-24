/**
 * 让 GitHub Pages（https）能连上 ECS 上的 HTTP API，而不被混合内容拦截。
 * 请先在 cloudflare-worker 部署 ecs-api-proxy（见 wrangler.ecs-api.toml），
 * 将下面 ecsHttpsBase 改为你自己的 Worker 根地址（https，无尾斜杠），再 push 本文件。
 * 留空则仍使用 Web.html 内建的 DEFAULT_API_BASE（本地 http 直连 ECS 等场景）。
 */
(function () {
  "use strict";
  var ecsHttpsBase = "";
  if (ecsHttpsBase && ecsHttpsBase.indexOf("https://") === 0) {
    window.API_BASE = ecsHttpsBase.replace(/\/+$/, "");
  }
})();
