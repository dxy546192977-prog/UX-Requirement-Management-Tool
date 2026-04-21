# 机票列表 — 快筛栏（`flight-list-sort-tabs`）

## 元信息

- **模块 slug**：`flight-list-sort-tabs`  
- **所属页**：`vertical.flight.list`  
- **示例**：[`example.html`](example.html)  
- **依赖**：[`page-frame.md`](../../page-frame.md)、[`components/platform/widgets/filter-tag/spec.md`](../../../../../../components/platform/widgets/filter-tag/spec.md)（概念相近时）  
- **最后同步**：2026-04-06  

---

## 用途

**营销条下方、直飞列表上方** 的横向快筛：**固定高度 chip**，可横向滚动；选中态黄底描边。

---

## 规格摘要

| 项 | 值 |
|----|-----|
| 容器 | **750×84px**，白底，底边 **1px** `--color-bg`，`padding: 12px`，`gap: 12px` |
| 筛选项 | 高 **60px**，背景 `--color-bg-light`，圆角 **6px**，`padding: 12px 18px`，**flex-shrink: 0** |
| 选中 | 背景 `--color-selected-bg`，边框 **1px** `--color-selected-border` |
| 文案 | **24px**，选中 **500** |

详参供稿 `输出组件/快筛栏/README.md`。

> **命名**：slug 历史为 `sort-tabs`，对应供稿 **快筛栏**，非中转区快筛（中转见 `flight-list-transfer-filter`）。

---

## 变更记录

| 日期 | 说明 |
|------|------|
| 2026-04-05 | 占位稿。 |
| 2026-04-06 | 对齐快筛栏示例。 |
