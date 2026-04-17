# 底部栏 Tabbar（一级主导航）

## 元信息

- **slug**：`tabbar`  
- **分类**：平台通用 — **导航**（taxonomy **「底部栏 Tabbar」**；本稿为 **一级** 形态）  
- **依赖**：[`foundations/design-foundations.md`](../../../../foundations/design-foundations.md)；图标资源见示例 CDN  
- **最后同步**：2026-04-05  

---

## 概述

**固定于视口底部**：**导航行 102px** 白底 + **顶部分割线**；**均分 `flex: 1`** 的若干 Tab。每项 **未选**：线框图标 + Regular 文案；**选中**：面性图标 + **Medium** 文案。**首页（飞猪焦点位）** 额外修饰：**选中** 时图标放大至 **102×102**、**隐藏文案**、背后 **品牌黄模糊光晕**。底部 **安全区块 64px**（可与 `env(safe-area-inset-bottom)` 叠加，见示例注释）。

供稿 `tab-bar-container` / `tab-bar` / `tab-bar__*` → **`fdl-tabbar`** / **`fdl-tabbar__nav`** / **`fdl-tabbar__*`**；**`icon--active/inactive`** → **`fdl-tabbar__icon-img--active/inactive`**。

---

## 结构

```text
div.fdl-tabbar（position: fixed; bottom: 0; width: 100%）
  ├── nav.fdl-tabbar__nav（aria-label="底部主导航"）
  │     └── ul.fdl-tabbar__list
  │           └── li.fdl-tabbar__item [+ --active] [+ --fliggy]
  │                 └── a.fdl-tabbar__link
  │                       ├── div.fdl-tabbar__icon
  │                       │     ├── img.fdl-tabbar__icon-img--inactive
  │                       │     └── img.fdl-tabbar__icon-img--active
  │                       └── span.fdl-tabbar__label
  └── div.fdl-tabbar__safe-area
```

**修饰符**

- `fdl-tabbar__item--active`：当前 Tab；对应 **`a` 设 `aria-current="page"`**。  
- `fdl-tabbar__item--fliggy`：**首页焦点位**；与 `--active` 同时存在时启用大图标 + 光晕 + 隐藏标签。  

---

## 视觉规范（@2x px）

| 项目 | 值 |
|------|-----|
| 导航行高 | **102** |
| 背景 | `var(--color-white)` |
| 顶部分割 | `box-shadow: 0 -1px 0 var(--color-bg)`（或 `border-top: 1px solid var(--color-bg)`） |
| Tab 内链 | 纵向 flex，`gap: 6`，图标 **48×48**（默认） |
| 文案 | **22px**，未选 Regular，选中 **500**；色 `var(--color-darkgray)` |
| 焦点 Tab 光晕 | `::before`：**35×25**，`background: var(--color-brand-1)`，`filter: blur(12.5px)`，`border-radius: 50%`，定位在项内偏下居中 |
| 首页选中图标 | **102×102**（`transition` 宽高 0.2s） |
| 安全区 | 块高 **64**，底 `var(--color-white)`；生产可改为 **`padding-bottom: env(safe-area-inset-bottom)`** 等 |

---

## 无障碍与交互

- **`nav` + `aria-label`**；当前项 **`aria-current="page"`**。  
- 图标 **`img alt`** 与文案一致或互补。  
- **`a:focus-visible`**：outline（示例用 `var(--color-indigo-1)`）。  
- 示例脚本仅作演示；落地应由路由/状态驱动 class 与 `aria-current`。  

---

## 产出物

- **spec.md**：本文件（一级 Tabbar）。  
- **example.html**：[`example.html`](example.html)  
- **二级 · 多功能底栏**：[`spec-secondary.md`](spec-secondary.md)、[`example-secondary.html`](example-secondary.html)  
- **预订 · 预订操作栏**：[`spec-booking.md`](spec-booking.md)、[`example-booking.html`](example-booking.html)  

> 其他底栏变体仍可增 `spec-*.md` 并回写 [platform-components-order.md](../../../../docs/platform-components-order.md)。

---

## 变更记录

| 日期 | 说明 |
|------|------|
| 2026-04-05 | 一级供稿落地；`tab-bar*` → `fdl-tabbar*`；色 token 化；图标状态类 BEM 化；viewport 750。 |
| 2026-04-05 | 增补二级多功能底栏：`spec-secondary.md`、`example-secondary.html`（`fdl-bottom-bar`）。 |
| 2026-04-05 | 增补预订操作栏：`spec-booking.md`、`example-booking.html`（`fdl-booking-bar`）。 |
