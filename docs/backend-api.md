# 后端 API 说明

本文档用于记录 `proxy-server.js` 当前暴露的后端接口，作为前后端联调与协作参考。

## 基本约定

- 本地默认地址：`http://localhost:3001`
- 响应格式：除文件下载接口外，默认返回 `application/json`
- CORS：允许 `GET, POST, OPTIONS`

## 健康检查

### GET `/health`

用途：服务可用性检查。

示例响应：

```json
{
  "status": "ok"
}
```

## 需求数据

### GET `/api/data`

用途：读取需求数据（优先 OSS，失败后回退本地文件）。

示例响应：

```json
{
  "requirements": []
}
```

### POST `/api/data`

用途：保存需求数据（优先 OSS，失败后回退本地文件）。

请求体示例：

```json
{
  "requirements": [
    {
      "id": "req-001",
      "title": "示例需求"
    }
  ]
}
```

成功响应示例：

```json
{
  "success": true,
  "storage": "oss"
}
```

说明：`storage` 可能为 `oss` 或 `local_fallback`。

## 语雀 PRD

### GET `/api/yuque/doc?url=<语雀文档URL>`

用途：读取语雀文档元信息（标题、作者、描述等）。

成功响应字段示例：

```json
{
  "title": "PRD 标题",
  "creator": "作者名",
  "description": "文档描述",
  "doc_id": 123456,
  "word_count": 1024,
  "created_at": "2026-01-01T00:00:00.000Z",
  "updated_at": "2026-01-02T00:00:00.000Z"
}
```

### GET `/api/yuque/doc-content?url=<语雀文档URL>`

用途：读取语雀 PRD 全文内容（由后端聚合返回）。

### GET `/api/yuque/doc-assets?url=<语雀文档URL>`

用途：读取 PRD 正文及图片列表。

成功响应字段示例：

```json
{
  "title": "PRD 标题",
  "creator": "作者名",
  "description": "文档描述",
  "body": "<html...>",
  "body_text": "纯文本内容",
  "image_count": 2,
  "images": [
    {
      "index": 0,
      "url": "https://example.com/image-a.png",
      "proxy_download_url": "/api/yuque/doc-images/download?url=...&index=0"
    }
  ]
}
```

### GET `/api/yuque/doc-images/download?url=<语雀文档URL>&index=<图片序号>`

用途：下载单张语雀图片（二进制返回，带 `Content-Disposition`）。

## AI 设计助手

### POST `/api/ai-design/jobs`

用途：创建 AI 拆解任务（异步执行）。

请求体：

```json
{
  "reqId": "req-001",
  "prdUrl": "https://aliyuque.antfin.com/xxx/yyy/zzz",
  "skillKey": "default"
}
```

说明：

- `reqId` 必填
- `prdUrl` 必填
- `skillKey` 可选，当前支持 `default`、`prd_html_decompose`

### GET `/api/ai-design/jobs/:id`

用途：查询任务状态与产物。

任务对象字段示例：

```json
{
  "id": "job-1711111111111-ab123",
  "req_id": "req-001",
  "prd_url": "https://aliyuque.antfin.com/xxx/yyy/zzz",
  "skill_key": "default",
  "status": "processing",
  "stage": "fetching_prd",
  "summary": null,
  "pages": [],
  "modules": [],
  "last_error": null,
  "created_at": "2026-01-01T00:00:00.000Z",
  "updated_at": "2026-01-01T00:00:10.000Z"
}
```

### POST `/api/ai-design/jobs/:id/retry`

用途：重试指定任务（任务不存在时返回 404）。

## 客户端配置与通知

### GET `/api/config/client`

用途：读取前端运行所需配置（来源于 `config/config.json`，如钉钉 Webhook 是否已配置）。

示例响应：

```json
{
  "has_dingtalk_webhook": true,
  "dingtalk_webhook": "https://oapi.dingtalk.com/robot/send?access_token=...",
  "has_oss_config": true
}
```

### POST `/api/config/dingtalk-webhook`

用途：保存钉钉 Webhook 到 `config/config.json`。

请求体：

```json
{
  "webhookUrl": "https://oapi.dingtalk.com/robot/send?access_token=..."
}
```

### POST `/api/config/dingtalk-webhook/clear`

用途：清空 `config/config.json` 中的钉钉 Webhook。

### POST `/api/notify/dingtalk`

用途：使用 `config/config.json` 中的 webhook 发送钉钉消息（前端不直连钉钉）。

请求体：

```json
{
  "message": {
    "msgtype": "markdown",
    "markdown": {
      "title": "通知标题",
      "text": "通知内容"
    }
  }
}
```

## 错误码约定（当前实现）

- `400`：请求参数错误（如缺少 `url`、`reqId`）
- `404`：资源不存在（如任务不存在、图片序号越界）
- `500`：服务端配置或内部错误（如缺少必要配置）
- `502`：上游调用失败（如语雀 API 调用异常）

## 维护约定

- 新增或修改后端接口时，请同步更新本文件。
- 若接口字段发生变更，至少更新请求/响应示例与错误码说明。
