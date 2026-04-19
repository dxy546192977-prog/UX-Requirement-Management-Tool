# AI 设计助理工作流

> 机票 PRD 到设计稿到 Figma 的首期落地流程请优先参考：`docs/flight-prd-to-figma-workflow.md`

> Branch: `feature/ai-design-assistant-flow`
> Version: V1.0

---

## 定位

这是一个嵌入在需求看板里的**异步 AI 设计下属**。  
你把需求扔给他（粘一个 PRD 链接），他帮你把需求拆解成"涉及哪些页面、每个页面要做哪些模块、每个模块应该怎么处理"。  
你只在关键节点确认或驳回。

**第一版不做：**
- 不直接生成 Figma 设计稿
- 不自动进行设计审查闭环
- 不强制绑定任何特定 AI 模型（支持 OpenAI / 通义千问）

**后续可扩展到（留了接口）：**
- 逐模块生成 HTML 设计草稿（对接 FDG / fliggy-design-skill）
- 设计审查（对接 gstack design-review）
- 推送到 Figma（对接 HTML to Figma 插件）

---

## 四阶段流水线

```
PM 提 PRD 链接
      │
      ▼
┌─────────────┐
│ Phase 1     │  抓取语雀 PRD 正文（yuque-service）
│ 拉取 PRD    │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ Phase 2     │  AI 拆解需求（支持图文多模态）→ 生成摘要 + 页面列表
│ 需求拆解    │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ Phase 3     │  AI 逐页面拆解模块（默认 ai_*）→ 模块名 + 意图 + 处理方式 + 备注
│ 设计方案    │
└──────┬──────┘
       │
       ▼
  待你确认  ← 详情弹窗里查看结果，点"确认方案"
       │
       ▼
  completed（模块状态全部写为 confirmed）
```

---

## 人工节点

| 节点 | 你的动作 | AI 的行为 |
|------|---------|---------|
| 触发 | 在需求详情里点"触发 AI 拆解" | 创建后台任务，立即返回 |
| 等待 | 看卡片/详情里的状态徽标 | 三阶段异步执行，前端每 3 秒轮询 |
| 确认 | 点"确认方案" | 所有模块标为 confirmed，状态变 completed |
| 重跑 | 点"重跑" | 清空旧结果，重新跑三个阶段 |
| 失败 | 看详情里的错误原因 | 保存错误信息，等你重跑 |

---

## 配置说明

复制 `config/config.example.json` 为 `config/config.json`，填写以下字段：

```json
{
  "yuque_api_base": "https://yuque-api.antfin-inc.com",
  "yuque_token": "你的语雀 Token",

  "ai_provider": "openai",
  "ai_api_base": "https://api.openai.com",
  "ai_api_key": "你的 AI API Key",
  "ai_model": "gpt-4o-mini",

  "ai_decompose_provider": "openai",
  "ai_decompose_api_base": "https://openrouter.ai/api",
  "ai_decompose_api_key": "你的 OpenRouter API Key",
  "ai_decompose_model": "qwen/qwen2.5-vl-72b-instruct",
  "ai_decompose_max_images": 8
}
```

**支持的 `ai_provider`：**
- `openai` — 任何 OpenAI 兼容接口（包括 Azure、第三方中转等）
- `qwen` / `dashscope` — 阿里云通义千问（DashScope 接口）

**阶段配置规则：**
- `Phase 2 (decomposing)`：优先读取 `ai_decompose_*`；若未配置则回退到默认 `ai_*`
- `Phase 3 (planning)`：始终读取默认 `ai_*`
- `Phase 2` 会自动从 PRD 正文提取图片 URL，并与正文一起发给多模态模型（`ai_decompose_max_images` 控制上限）

---

## API 端点一览

启动代理服务后（`node proxy-server.js`，默认 `http://localhost:3001`）：

| 方法 | 路径 | 说明 |
|------|------|------|
| POST | `/api/ai-design/jobs` | 创建 AI 拆解任务 |
| GET  | `/api/ai-design/jobs/:id` | 查询任务状态与产物 |
| POST | `/api/ai-design/jobs/:id/retry` | 重跑任务 |
| GET  | `/api/yuque/doc-content?url=` | 读取 PRD 正文 |

---

## 需求对象中新增的字段

`ai_design` 对象写入每个需求条目的 JSON 里：

```json
{
  "ai_design": {
    "status": "needs_confirmation",
    "stage": null,
    "job_id": "job-1234567890-abc12",
    "summary": "优化机票搜索体验，新增低价日历模块",
    "pages": ["首页", "列表页"],
    "modules": [
      {
        "name": "低价日历模块",
        "page": "列表页",
        "intent": "帮助用户快速找到低价日期，提升搜索转化",
        "change_type": "create",
        "notes": "参考竞品携程日历设计，注意与现有搜索表单的联动交互",
        "status": "pending"
      }
    ],
    "last_error": null,
    "updated_at": "2026-04-16T12:00:00.000Z"
  }
}
```

**`status` 状态流转：**
```
idle → queued → processing → needs_confirmation → completed
                           ↘ failed → (retry) → processing
```

**`change_type` 枚举：**
- `create` — 需要新建模块
- `modify` — 改动现有模块
- `reuse` — 直接复用，无需改动

---

## 注意事项 / 已知限制

1. **任务存在内存中**：服务重启后，进行中的任务状态会丢失；已完成的结果在写入 OSS 后仍可查看。
2. **语雀正文限制**：若 PRD 使用 Lake 私有格式且 API 未返回可读正文，AI 只能基于描述字段工作，拆解质量会降低。
3. **并发**：同一需求同时触发多次任务，以最新一次为准；内存里会保留旧任务对象，但卡片只跟踪最新 `job_id`。
4. **AI 拆解质量**：取决于 PRD 正文的质量和 AI 模型能力，建议 PRD 有清晰的功能描述段落。

---

## 后续扩展位

- `docs/ai-design-assistant-workflow.md` 本文档随功能迭代持续更新。
- `services/ai-design-service.js` 中的 `_buildPlanPrompt` 可以注入业务知识（页面框架、组件库索引），提升拆解质量。
- 模块的 `confirmed` 状态可作为后续"逐模块生成设计草稿"的触发条件。
