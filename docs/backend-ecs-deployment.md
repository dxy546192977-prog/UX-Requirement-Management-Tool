# 后端部署指南（阿里云 ECS）

本文档用于将 `proxy-server.js` 部署到阿里云 ECS，提供稳定的多人协同后端接口（`/api/data`、`/health` 等）。

## 适用场景

- 前端页面部署在 GitHub Pages 或其他静态托管
- 需要多人共享同一份需求数据
- 不希望在前端暴露 OSS AccessKey

## 一、准备信息

部署前请准备以下信息：

- ECS 公网 IP（例如：`121.41.229.77`）
- 仓库地址：`https://github.com/dxy546192977-prog/UX-Requirement-Management-Tool.git`
- 新的 RAM AccessKey（若曾在截图或聊天中暴露过，请先禁用并重建）
  - `oss_access_key_id`
  - `oss_access_key_secret`
- 语雀 Token（如需语雀解析能力）

## 二、连接 ECS

在阿里云控制台进入实例详情页，点击「远程连接」，使用 Workbench 或 VNC 打开终端。

连接成功后，应看到类似提示符：

```bash
[root@iZbp... ~]#
```

## 三、安装运行环境

在 ECS 终端执行：

```bash
yum install -y git
yum install -y nodejs npm || (curl -fsSL https://rpm.nodesource.com/setup_20.x | bash - && yum install -y nodejs)
npm i -g pm2
```

校验版本：

```bash
git --version
node -v
npm -v
pm2 -v
```

## 四、拉取项目代码

```bash
mkdir -p /opt/apps
cd /opt/apps
git clone https://gitclone.com/github.com/dxy546192977-prog/UX-Requirement-Management-Tool.git ux-tool
cd /opt/apps/ux-tool
pwd
```

预期输出：

```bash
/opt/apps/ux-tool
```

> 如 GitHub 网络不稳定，可继续使用 `gitclone.com` 镜像地址拉取。

## 五、写入后端配置

创建并编辑 `config/config.json`：

```bash
mkdir -p /opt/apps/ux-tool/config
vi /opt/apps/ux-tool/config/config.json
```

参考内容（请替换为真实值）：

```json
{
  "yuque_api_base": "https://yuque-api.antfin-inc.com",
  "yuque_token": "YOUR_YUQUE_TOKEN",
  "oss_access_key_id": "YOUR_OSS_ACCESS_KEY_ID",
  "oss_access_key_secret": "YOUR_OSS_ACCESS_KEY_SECRET",
  "oss_bucket": "designacceleration",
  "oss_region": "oss-cn-beijing",
  "oss_file_key": "requirements.json"
}
```

> 严禁将 `config/config.json` 提交到仓库。

## 六、启动后端服务

```bash
cd /opt/apps/ux-tool
pm2 start proxy-server.js --name ux-tool-api
pm2 save
pm2 status
```

若已存在进程，可改用：

```bash
pm2 restart ux-tool-api
```

## 七、放行安全组端口

在 ECS 安全组「入方向规则」中放行：

- `TCP 3001/3001`，来源 `0.0.0.0/0`
- `TCP 80/80`，来源 `0.0.0.0/0`

## 八、配置 Nginx（将 80 反代到 3001）

```bash
yum install -y nginx
cat > /etc/nginx/conf.d/ux-tool.conf <<'EOF'
server {
  listen 80;
  server_name _;
  location / {
    proxy_pass http://127.0.0.1:3001;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  }
}
EOF
nginx -t
systemctl enable nginx
systemctl restart nginx
```

## 九、验收命令

本机验收：

```bash
curl -m 8 -i http://127.0.0.1:3001/health
curl -m 8 -i http://127.0.0.1:3001/api/data
```

公网验收：

```bash
curl -m 8 -i http://<ECS公网IP>:3001/health
curl -m 8 -i http://<ECS公网IP>/health
```

预期关键结果：

- `HTTP/1.1 200 OK`
- `{"status":"ok"}`

## 十、改为自动部署（GitHub Actions）

仓库已内置工作流：`.github/workflows/deploy.yml`，当 `main` 分支有新提交时自动执行 ECS 部署；也支持在 GitHub Actions 页面手动触发。

### 1) 在 GitHub 仓库配置 Secrets

进入 `Settings > Secrets and variables > Actions > Secrets`，新增：

- `ECS_HOST`：ECS 公网 IP
- `ECS_USER`：SSH 用户（如 `root`）
- `ECS_SSH_KEY`：私钥内容（建议专用于 CI）
- `ECS_SSH_PORT`：SSH 端口（可选，不填默认 22）

### 2) 配置 Variables（可选）

进入 `Settings > Secrets and variables > Actions > Variables`，按需新增：

- `ECS_APP_DIR`：部署目录（默认 `/opt/apps/ux-tool`）
- `ECS_DEPLOY_BRANCH`：部署分支（默认 `main`）
- `ECS_PM2_APP_NAME`：PM2 进程名（默认 `ux-tool-api`）
- `ECS_PRE_DEPLOY_CMD`：预部署命令（可选，如 `npm ci`）
- `ECS_POST_DEPLOY_CMD`：后置命令（可选，如 `nginx -t && systemctl reload nginx`）

### 3) 首次部署要求

自动部署仅负责“拉最新代码并重启服务”，因此请先在 ECS 完成一次初始化（见前文步骤三到六），确保：

- 代码目录已存在且是 Git 仓库
- `pm2` 可用
- `proxy-server.js` 可启动

### 4) 验证自动部署

1. 本地提交并 push 到 `main`
2. 打开 GitHub Actions，确认 `自动部署到 ECS` 成功
3. 在 ECS 验收：

```bash
pm2 status
curl -m 8 -i http://127.0.0.1:3001/health
```

## 十一、后续更新（手动兜底）

若 Actions 临时不可用，可手动执行：

```bash
cd /opt/apps/ux-tool
git pull
pm2 restart ux-tool-api
```

## 十二、与 GitHub Pages 联调（必须能走 HTTPS 调 API）

静态站地址形如 `https://<user>.github.io/.../Web.html`（**页面为 https**）。若 `pages/Web.html` 里 `DEFAULT_API_BASE` 为 **`http://<ECS 公网 IP>`**，浏览器会把对「http 接口」的 `fetch` 判为**混合内容（mixed content）并拦截**，看板会无法从 ECS 拉取/保存数据，只会走兜底逻辑或报网络错误。

任选其一解决：

1. **推荐**：为 ECS 绑定**域名**，在 Nginx 或 Caddy 上配置 **Let’s Encrypt 等正式证书**，使 API 有 **`https://你的域名`**，再把 `DEFAULT_API_BASE` 改成该 https 根地址（不要带尾斜杠），重新推送 GitHub Pages。

2. **无域名、短期联调**：在 **ECS 本机**运行 [Cloudflare Tunnel / cloudflared](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/)，将隧道指向 `http://127.0.0.1:3001`（或经 Nginx 的 `80`），拿到形如 **`https://\*.trycloudflare.com` 的 https 子域名**后，将 `DEFAULT_API_BASE` 设为该 https 基址（与仓库里曾经使用的 trycloudflare 形式类似，但隧道应跑在 ECS 上，而不是你个人电脑）。

3. 在阿里云为该实例配置**带证书的 SLB/ALB 或全站加速**，对客户端暴露 **https 入口**即可。

4. **本仓库已提供 Cloudflare Worker**（`cloudflare-worker/ecs-api-proxy.js`），将 **HTTPS 的 `*.workers.dev`** 反代到 ECS 的 **HTTP** `proxy-server`（与 `pages/Web.html` 同源的 `pages/ecs-api-endpoint.js` 里填写 Worker 根地址即可，无需再改大段 HTML）：

```bash
cd cloudflare-worker
# 首次需：npx wrangler login
# 按需编辑 wrangler.ecs-api.toml 中 [vars] UPSTREAM 为你的 ECS 公网根（如 http://121.41.229.77）
npx wrangler deploy -c wrangler.ecs-api.toml
```

部署成功后，终端会输出 **`https://<worker 名>.<子域>.workers.dev`**。打开 `pages/ecs-api-endpoint.js`，将 `ecsHttpsBase` 设为该 **https 根地址**（无尾斜杠），保存后推送 GitHub Pages。页面会优先用 `window.API_BASE` 走 Worker，再转发到 ECS。

**验收（在任意公网环境）：**

```bash
curl -m 8 -sS "https://<你的-HTTPS-API-基址>/health"
# 应返回: {"status":"ok"}
```

## 十三、常见问题

### 1) `git: command not found`

先执行：

```bash
yum install -y git
```

### 2) `npm: command not found` 或 `pm2: command not found`

先安装 Node/npm 和 pm2：

```bash
yum install -y nodejs npm || (curl -fsSL https://rpm.nodesource.com/setup_20.x | bash - && yum install -y nodejs)
npm i -g pm2
```

### 3) 本机 `127.0.0.1:3001` 通，公网不通

优先检查：

- 安全组是否放行 `3001` / `80`
- Nginx 是否已启动（`systemctl status nginx`）
- 端口是否监听（`ss -lntp | rg "3001|80"`）

