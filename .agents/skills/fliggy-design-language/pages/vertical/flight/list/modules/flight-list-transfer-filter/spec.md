# 机票列表 — 中转快筛栏（`flight-list-transfer-filter`）

## 元信息

- **模块 slug**：`flight-list-transfer-filter`  
- **所属页**：`vertical.flight.list`  
- **示例**：[`example.html`](example.html)  
- **依赖**：[`page-frame.md`](../../page-frame.md)  
- **最后同步**：2026-04-06  

---

## 用途

**分割区下方、中转卡片上方**：中转城市 / 到达时间等快筛。**独立** DOM（`.transfer-filter-wrapper` → `.transfer-filter-bar`），**不得**复用顶部 `flight-list-sort-tabs` 结构。

---

## 规格摘要

| 项 | 值 |
|----|-----|
| 外层 | **750×84**，`overflow: hidden`，底 **1px #F2F3F5** |
| 内层滚动 | **min-width: 854px**，`overflow-x: auto`，`padding: 12px`，`gap: 12px` |
| chip | 高 **60px**，灰底 **#F7F8FA**，圆角 **6px**，与顶筛选中态规则可对照供稿 |

详参供稿 `输出组件/中转快筛栏/README.md`。

---

## 变更记录

| 日期 | 说明 |
|------|------|
| 2026-04-06 | 初版。 |
