---
name: oss-sync
description: '本地 data/requirements.json ↔ OSS 双向同步。当用户说"同步数据"、"上传到线上"、"从线上拉数据"、"本地改了想更新线上"、"线上改了想更新本地"时使用此 Skill。'
argument-hint: '<push|pull|status>'
---

# OSS 数据同步

## 适用场景

- 本地改了需求数据，想同步到线上（GitHub Pages 读取的 OSS）
- 线上通过页面操作改了数据，想同步回本地文件
- 想查看本地与 OSS 的数据状态是否一致

## 三个命令

| 命令 | 方向 | 说明 |
|------|------|------|
| `push` | 本地 → OSS | 把本地 `data/requirements.json` 上传覆盖 OSS，线上刷新后即可看到最新数据 |
| `pull` | OSS → 本地 | 把 OSS 最新数据下载覆盖本地文件（自动备份原文件） |
| `status` | 只读 | 对比本地与 OSS 的数据条数和最后修改时间 |

## 执行方式

```bash
# 本地 → 线上（最常用）
node .claude/skills/oss-sync/scripts/oss-sync.mjs push

# 线上 → 本地
node .claude/skills/oss-sync/scripts/oss-sync.mjs pull

# 查看状态
node .claude/skills/oss-sync/scripts/oss-sync.mjs status
```

## 配置依赖

脚本自动读取 `config/config.json` 中的：
- `oss_access_key_id`
- `oss_access_key_secret`

OSS 配置（硬编码在脚本中）：
- Bucket：`designacceleration`
- Region：`oss-cn-beijing`
- Object：`requirements.json`

## 注意事项

- `push` 和 `pull` 都是**覆盖操作**，执行前请确认方向正确
- `pull` 会自动备份本地文件为 `requirements.backup-<timestamp>.json`，误操作可恢复
- 线上页面保存数据后，OSS 会立即更新；本地需手动执行 `pull` 才能同步
