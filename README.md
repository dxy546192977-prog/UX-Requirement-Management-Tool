# UX-Requirement-Management-Tool

## Quick Start

### 1. Configure Yuque API Token

Copy the example config and fill in your Yuque API Token:

```bash
cp config.example.json config.json
```

Edit `config.json` and replace `YOUR_YUQUE_API_TOKEN_HERE` with your actual token.

> Token can be obtained from: https://yuque.antfin.com/lark/openapi/dh8zp4

```json
{
  "yuque_api_base": "https://yuque-api.antfin-inc.com",
  "yuque_token": "your_actual_token_here"
}
```

### 2. Start the Proxy Server

The proxy server forwards requests to the Yuque API to avoid CORS issues.

```bash
node proxy-server.js
```

The server will start on `http://localhost:3001`.

### 3. Open the Dashboard

Open `index.html` in your browser. Click the "Submit Requirement" button, paste a Yuque PRD link, and the system will automatically fetch the document title and author.

## Features

- Kanban board for requirement management
- Auto-parse Yuque PRD links (title + author)
- Drag & drop to change requirement status
- DingTalk webhook notifications (optional)
- Dark theme UI
- **AI Design Assistant** (branch: `feature/ai-design-assistant-flow`) — trigger AI to decompose PRD into page/module design plans

## AI Design Assistant Setup

This feature requires the proxy server and an AI API key.

**1. Configure `config.json`:**

```json
{
  "yuque_api_base": "https://yuque-api.antfin-inc.com",
  "yuque_token": "your_yuque_token",
  "ai_provider": "openai",
  "ai_api_base": "https://api.openai.com",
  "ai_api_key": "your_ai_api_key",
  "ai_model": "gpt-4o-mini"
}
```

Supported `ai_provider` values: `openai` (any OpenAI-compatible API) or `qwen` / `dashscope` (Alibaba Cloud Tongyi Qianwen).

**2. Start the proxy server:**

```bash
node proxy-server.js
```

**3. Open the dashboard via `http://localhost:3001`** (not directly as a file — the AI feature requires the proxy).

**4. Trigger AI analysis:**

1. Add a requirement with a Yuque PRD link.
2. Open the requirement detail.
3. Click "触发 AI 拆解" (Trigger AI Analysis).
4. Wait for the AI to decompose the PRD (~30–60s depending on model).
5. Review the result (summary + page list + module plan) and click "确认方案".

See `docs/ai-design-assistant-workflow.md` for the full workflow documentation.