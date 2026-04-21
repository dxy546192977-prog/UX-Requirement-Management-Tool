# 机票列表 — 导航栏（`flight-list-header`）

## 元信息

- **模块 slug**：`flight-list-header`  
- **所属页**：`vertical.flight.list`  
- **示例**：[`example.html`](example.html)  
- **依赖**：[`page-frame.md`](../../page-frame.md)、[`foundations/design-foundations.md`](../../../../../../foundations/design-foundations.md)  
- **最后同步**：2026-04-06  

---

## 用途

列表页 **吸顶导航**：状态栏占位 + 返回 + **OD 城市**（含箭头/下拉）+ 右侧 **出行提醒 / 低价提醒 / 更多**。

---

## 规格摘要

| 项 | 值 |
|----|-----|
| 整体 | **750×176px**（上 **88** 状态栏 + **88** 导航行），白底，**fixed** 顶栏（整页见 `page-frame` 居中 transform） |
| 返回 | **48×48**，左侧 **24px** |
| OD | **30px/500**，`--color-primary`；箭头 **42×42**；下拉 **20×20** |
| 右侧组 | **168×48** 区域，图标 **48×48**，间距 **12**；提醒项含 **12px** 副文案 |

切图与完整参数见 **供稿** `fliggy-design-flight-listing-skill/输出组件/导航栏/README.md`。

---

## 变更记录

| 日期 | 说明 |
|------|------|
| 2026-04-05 | 占位稿。 |
| 2026-04-06 | 替换为列表导航栏还原示例。 |
