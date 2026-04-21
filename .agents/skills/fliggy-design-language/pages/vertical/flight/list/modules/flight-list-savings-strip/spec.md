# 机票列表 — 省钱推荐（`flight-list-savings-strip`）

## 元信息

- **模块 slug**：`flight-list-savings-strip`  
- **所属页**：`vertical.flight.list`  
- **示例**：[`example.html`](example.html)  
- **依赖**：[`page-frame.md`](../../page-frame.md)  
- **最后同步**：2026-04-06  

---

## 用途

直飞列表 **末尾**（分割前）可选模块：左侧竖排标题 **「省钱推荐」** + 横向滚动 **低价卡片**（不同日期 / 不同城市等变体）。

---

## 规格摘要

| 项 | 值 |
|----|-----|
| 整体 | **750×102** 量级，白底，横向 `flex` + `gap: 12px` |
| 标题区 | 竖排 **`writing-mode: vertical-rl`**，青绿 `--color-accent` |
| 卡片 | 宽约 **246px / 250px** 等（变体见供稿） |

**可选**：当前整页 `listing.png` 还原稿可 **不插** 本模块；manifest 仍收录。

详参供稿 `输出组件/省钱推荐/README.md`。

---

## 变更记录

| 日期 | 说明 |
|------|------|
| 2026-04-06 | 初版。 |
