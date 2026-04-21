# 首页顶标题栏（Home Titlebar）

## 元信息

- **slug**：`home-titlebar`（页面模块，非平台组件）  
- **page_id**：`tabs.home`  
- **分类**：首页 Tab — 通栏顶区  
- **依赖**：[`foundations/design-foundations.md`](../../../../../foundations/design-foundations.md)  
- **最后同步**：2026-04-05  

---

## 概述

**750×88**（@2x）**通栏白底**顶栏：**左品牌 Logo**、**中顶 Tab 导航**（纯文案 / 图标+文案 / 品牌子标+文案混合）、**右固定快捷入口**（图标+短文案）。当前选中 Tab 以 **4px 高、36px 宽、深灰实底指示条**（`--color-darkgray`，圆角 **3px**）标识。

供稿类名 `titlebar-container` / `top-tab-nav` 等 → **`fdl-home-titlebar`** / **`fdl-home-titlebar__*`**。

---

## 视觉规范（@2x px）

| 项目 | 值 |
|------|-----|
| 整体 | **88** 高；**`padding: 12px 24px`**；`gap` **12～37**（示例用 **12** 与 frame 一致） |
| Logo 区 | 宽约 **86×68** 点击热区 |
| 导航 | 中间 **`flex: 1`** 居中排布；Tab 文案 **30** Medium **`--color-darkgray`**；Tab 间距约 **30** |
| 指示条 | **36×4**，**`border-radius: 3px`**；选中 **`--color-darkgray`**，未选透明 |
| 右侧入口 | 图标约 **42×42** 可视、文案 **20** Medium |

---

## 结构与层次

```text
header.fdl-home-titlebar（role="banner"）
  ├── a | button.fdl-home-titlebar__logo
  ├── nav.fdl-home-titlebar__nav（role="tablist" aria-label="首页频道"）
  │     ├── button.fdl-home-titlebar__tab[--variant-logo]（role="tab"）
  │     ├── button.fdl-home-titlebar__tab[--active]（role="tab"）
  │     └── button.fdl-home-titlebar__tab[--variant-icon]（role="tab"）
  └── a | button.fdl-home-titlebar__action（如「我的收藏」）
```

单 Tab 内部：**主行**（图标可选 + 标题）+ **指示条**（`span.fdl-home-titlebar__indicator`，选中加 **`--active`**）。

---

## 可访问性

- **`role="tablist"` / `role="tab"`** / **`aria-selected`**；选中项 **`aria-selected="true"`**。  
- Logo、收藏：**`aria-label`**。  
- **`:focus-visible`**：**`outline: 2px solid var(--color-indigo-1)`**。

---

## 产出物

- [`example.html`](example.html)  

---

## 变更记录

| 日期 | 说明 |
|------|------|
| 2026-04-05 | 初版：供稿转 fdl-home-titlebar*；Token 化。 |
