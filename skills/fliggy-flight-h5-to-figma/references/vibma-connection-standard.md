# Vibma 连接标准

## 标准连接序列

1. `join_channel`，参数 `channel="vibma"`
2. `ping`
3. 预期返回：`{"status":"pong", ...}`

## 常见报错与处理

### 报错
`Could not reach relay at port 3055: fetch failed`

### 处理

1. 启动本地 relay：`npx @ufira/vibma-tunnel`
2. 确认输出：`Vibma tunnel running on http://127.0.0.1:3055`
3. 在 Figma 插件内确认：
   - 端口：`3055`
   - 频道：`vibma`
4. 再次执行 `join_channel` + `ping`

## 会话健康检查

- 开始改稿前：必须 `ping` 成功
- 批量改写前：建议再 `ping` 一次
- 批量改写失败：先重新 `ping` 再重试该批次
