# 机票首页 — 行业底栏（`flight-home-industry-tabbar`）

## 元信息

- **模块 slug**：`flight-home-industry-tabbar`  
- **所属页**：`vertical.flight.home`  
- **示例**：[`example.html`](example.html)  
- **依赖**：[`foundations/design-foundations.md`](../../../../../../foundations/design-foundations.md)  
- **最后同步**：2026-04-05  

---

## 用途

机票首页 **底部固定** 的 **5 入口快捷栏**（值机选座、我的收藏等）。**不是** App 全局 **主 Tabbar**（首页/会员/消息/行程/我的）；主底栏仍见 **`components/platform/navigation/tabbar/spec.md`**。

---

## 规格摘要

| 区域 | 尺寸 / 行为 |
|------|-------------|
| 整体 | 750×150px（含安全区），白底，`position: fixed; bottom: 0` |
| Tab 行 | 750×86px，5 等分（各约 150px），flex |
| 单项 | 图标 **48×48** + 文案 **20px/400/#0F131A**，纵向 gap **6px** |
| 安全区 | **64px** 高；Home Indicator **268×10**、**#000**、圆角 **20px** 水平居中 |

---

## 五个 Tab 与图标 CDN

见 [`example.html`](example.html) 内注释与 `src`；与供稿表格一致。

---

## 变更记录

| 日期 | 说明 |
|------|------|
| 2026-04-05 | 初版。 |
