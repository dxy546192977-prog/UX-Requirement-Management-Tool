# 机票首页 — 首屏氛围（`flight-home-atmosphere`）

## 元信息

- **模块 slug**：`flight-home-atmosphere`  
- **所属页**：`vertical.flight.home`  
- **示例**：[`example.html`](example.html)  
- **依赖**：[`foundations/design-foundations.md`](../../../../../../foundations/design-foundations.md)  
- **最后同步**：2026-04-05  

---

## 用途

机票首页最顶部 **沉浸式氛围区**：全宽背景图 + 状态栏占位 + 导航栏（返回 / 相机 / 更多）+ 轮播指示器 + 底部与页面灰底 **#f2f3f5** 衔接的渐变遮罩。

---

## 规格摘要

| 区域 | 规格 |
|------|------|
| 整体 | **750×310px**，`position: absolute` 叠在 hero 顶部（整页见 [`page-frame.md`](../../page-frame.md)） |
| 状态栏占位 | **88px** 高（宿主渲染，本示例仅留白） |
| 导航栏 | **88px** 高，左右 **padding 24px** |
| 圆形按钮 | **60×60**，毛玻璃 `rgba(0,0,0,0.2)` + `blur(10px)`，内图标 **36×36** 白色 |
| 轮播指示器 | `right:57px; top:210px`，圆点高 **6px**，未选中宽 **12px**，选中 **18px** |
| 底部渐变 | **85px** 高：透明 → 80% 灰 → **#f2f3f5** |
| 背景图 | **cover**，建议源图 **1500×620**（@2x）；示例 CDN 见 [`example.html`](example.html) |

---

## 可配置项（概念）

- `backgroundImage`：背景 CDN。  
- `slideCount` / `activeIndex`：指示器。  
- `backAction` / `cameraAction` / `moreAction`：导航按钮行为。  

---

## 变更记录

| 日期 | 说明 |
|------|------|
| 2026-04-05 | 初版骨架。 |
| 2026-04-05 | 对齐供稿：背景层 + TopBar + 渐变。 |
