# 火车票首页 — 首页 title（`train-home-title`）

## 元信息

- **模块 slug**：`train-home-title`  
- **所属页**：`vertical.train.home`  
- **示例**：[`example.html`](example.html)  
- **依赖**：[`foundations/design-foundations.md`](../../../../../../foundations/design-foundations.md)  
- **最后同步**：2026-04-06  

---

## 用途

火车票首页 **沉浸式顶栏**：iPhone **状态栏切图** + **导航栏**（返回、分享、更多）；按钮为 **整图 60×60**，勿再叠毛玻璃样式。

---

## 规格摘要

| 项 | 值 |
|----|-----|
| 容器 `.page-title` | **750×194**，`flex-direction: column`，`gap: 18`（状态栏与导航间距） |
| 状态栏 | **88px** 高，切图 **1500×176 @2x**，宽 **750** |
| 导航栏 | **88px** 高，左右 **padding 24**（按钮绝对定位） |
| 返回 | **60×60**，`left: 24`，`top: calc(50% - 30px)` |
| 右侧组 | 分享 + 更多，`gap: 12`，`right: 24`，垂直居中 |
| 按钮切图 | **120×120 @2x** 资源，展示为 **60×60** |

---

## 变更记录

| 日期 | 说明 |
|------|------|
| 2026-04-06 | 初版，对齐供稿。 |
