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

## 十、后续更新（手动部署）

每次本地代码 push 到 GitHub 后，在 ECS 执行：

```bash
cd /opt/apps/ux-tool
git pull
pm2 restart ux-tool-api
```

## 十一、常见问题

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

