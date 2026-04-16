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