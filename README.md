# UX-Requirement-Management-Tool

基于「需求看板 + 本地代理服务」的需求管理工具，面向 UX、产品、研发协作场景。支持语雀 PRD 解析、看板流转、AI 拆解与设计方案衔接。

## 功能概览

- 需求看板管理（拖拽流转状态）
- 语雀 PRD 链接解析（自动获取标题和作者）
- 可选钉钉 Webhook 通知
- 深色主题界面
- AI 设计助手（PRD 拆解为页面/模块方案）

## 文档边界说明

- `README.md`：项目入口文档，负责「是什么、怎么跑、去哪看更多」。
- `docs/DESIGN.md`：视觉与交互规范文档，负责设计系统与组件规范。
- `docs/`：按主题拆分的流程说明（如 AI 设计助手完整流程）。
- `docs/backend-api.md`：后端 API 说明（接口路径、请求参数、响应示例）。
- `docs/backend-ecs-deployment.md`：阿里云 ECS 后端部署手册（多人协同推荐）。

## 快速开始

### 1) 配置 `config/config.json`

先复制模板：

```bash
cp config/config.example.json config/config.json
```

然后编辑 `config/config.json`，至少填写语雀 Token：

```json
{
  "yuque_api_base": "https://yuque-api.antfin-inc.com",
  "yuque_token": "your_actual_token_here",
  "dingtalk_webhook": "https://oapi.dingtalk.com/robot/send?access_token=..."
}
```

语雀 Token 获取地址：<https://yuque.antfin.com/lark/openapi/dh8zp4>

### 2) 启动代理服务

```bash
node proxy-server.js
```

默认启动地址为 `http://localhost:3001`。

### 3) 打开看板

- 基础看板：可直接打开 `需求管理看板.html`。
- 使用 AI 功能：请通过 `http://localhost:3001` 访问（不要直接本地文件打开）。
- 在线地址（协作优先）：<https://dxy546192977-prog.github.io/UX-Requirement-Management-Tool/>

## 多人协同部署（推荐）

若你希望团队成员共享同一份需求数据，建议采用「ECS 后端 + OSS 存储」模式：

1. 在 ECS 部署 `proxy-server.js`。
2. 在服务端 `config/config.json` 配置 OSS AccessKey（不要放前端）。
3. 放行安全组端口 `3001` 和 `80`，并使用 Nginx 将 `80` 反代到 `3001`。
4. 前端统一请求后端 API（如 `/api/data`），避免刷新后数据重置。

详细步骤见：`docs/backend-ecs-deployment.md`。

后端接口清单见：`docs/backend-api.md`。

## AI 设计助手配置

如需使用 AI 拆解，请在 `config/config.json` 中补充 AI 配置：

```json
{
  "yuque_api_base": "https://yuque-api.antfin-inc.com",
  "yuque_token": "your_yuque_token",
  "ai_provider": "openai",
  "ai_api_base": "https://api.openai.com",
  "ai_api_key": "your_ai_api_key",
  "ai_model": "gpt-4o-mini",
  "ai_decompose_provider": "openai",
  "ai_decompose_api_base": "https://openrouter.ai/api",
  "ai_decompose_api_key": "your_openrouter_api_key",
  "ai_decompose_model": "qwen/qwen2.5-vl-72b-instruct",
  "ai_decompose_max_images": 8
}
```

说明：

- `ai_provider` 支持 `openai`（含兼容 OpenAI 的 API）与 `qwen`/`dashscope`。
- 配置 `ai_decompose_*` 后，仅 PRD 拆解阶段使用该覆盖配置。
- PRD 截图较多时，建议使用多模态模型（如 `qwen/qwen2.5-vl-72b-instruct`）。
- 钉钉 Webhook 已统一由后端从 `config/config.json` 读取并发送，前端不再把 token 存在 `localStorage`。

## 常用操作流程（AI 拆解）

1. 新建需求并粘贴语雀 PRD 链接。
2. 进入需求详情，点击「触发 AI 拆解」。
3. 等待拆解完成（通常 30-60 秒，视模型而定）。
4. 审阅摘要、页面清单、模块计划，点击「确认方案」。

完整流程见 `docs/ai-design-assistant-workflow.md`。

## AI API 快速索引

启动 `proxy-server.js` 后可用：

- `POST /api/ai-design/jobs`：创建 AI 拆解任务
- `GET /api/ai-design/jobs/:id`：查询任务状态与产物
- `POST /api/ai-design/jobs/:id/retry`：重跑任务
- `GET /api/yuque/doc-content?url=`：读取 PRD 正文

## 开发约定

- 页面文案与注释以中文为主，便于业务协作。
- 修改 `proxy-server.js` 时优先保持向后兼容。
- 外部接口的跨域、鉴权、错误兜底优先在代理层处理。
- 新增功能时同步补充 `docs/` 对应文档。
- 严禁提交真实密钥到仓库（尤其是 `config/config.json`）。

## 目录速览

- `需求管理看板.html`：主界面入口
- `proxy-server.js`：本地代理服务
- `config/config.example.json`：配置模板
- `config/config.json`：本地运行配置（需自行创建）
- `docs/`：流程与功能文档
- `data/`：本地数据文件