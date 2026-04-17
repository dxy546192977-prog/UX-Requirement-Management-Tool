# 选项卡 Tab（样式一 · 分类导航栏）

## 元信息

- **slug**：`tabs-style-1`  
- **分类**：平台通用 — **导航**（taxonomy **「选项卡 Tab」— 样式一）  
- **依赖**：[`foundations/design-foundations.md`](../../../../foundations/design-foundations.md)  
- **最后同步**：2026-04-05  

---

## 概述

顶部 **内容/商品分类 Tabs**：**2～5 项均分**（`space-around` + `flex: 1`），**>5 项横滑**（列表 `overflow-x: auto`、项间 **66px** 间距、隐藏滚动条）。选中态：**文案 Medium + `var(--color-darkgray)`**，未选 **Regular + `var(--color-midgray)`**；**底部短指示条**（**54×6**，默认透明，选中 **`var(--color-darkgray)`**）。每项上方可选 **营销角标**（小胶囊，底 **`var(--color-promo-1)`**、字白）。

供稿 `tabs` / `tabs__*` / `tabs--scrollable` → **`fdl-tabs-style-1`** / **`fdl-tabs-style-1__*`** / **`fdl-tabs-style-1--scroll`**。

---

## 使用场景

- **均分**：首页或模块下 **2～5** 个固定大类（酒店 / 机票 / 门票等）。  
- **横滑**：次级分类多且不定（推荐 / 附近 / 亲子…）。  
- **不宜**：需与 **选项卡样式二、三** 混用同一层级时未做视觉验收；与 **filter-tag**（筛选 chips）易混淆时需按场景二选一。

---

## 视觉规范（@2x px）

| 项目 | 值 |
|------|-----|
| 栏高 | **80** |
| 列表水平 padding | **24** |
| 链（`__link`） | 纵向 flex，`justify-content: center`，**`gap: 12`**（文案区与指示条） |
| 文案区（`__content`） | 纵向 flex，`align-items: center`，**`gap: 4`**（角标与标题） |
| 角标占位（`__bubble-wrap`） | 高 **28**（无角标时占位，避免 Tab 跳动） |
| 角标（`__bubble`） | **18px** Medium，字 **`var(--color-white)`**，底 **`var(--color-promo-1)`**，**`padding: 2px 8px`**，`border-radius: var(--radius-s)` |
| 标题（`__text`） | **30px**（H4 档），行高 **1**，`white-space: nowrap` |
| 指示条（`__indicator`） | **54×6**，默认 `background: transparent`，选中 `background: var(--color-darkgray)`，`border-radius: 9999px`（胶囊端） |
| 横滑列表 | **`gap: 66`**，`justify-content: flex-start`，项 **不** `flex: 1` |
| 背景 | `var(--color-white)` |

**动效**：`font-weight` / `color` / 指示条背景 **0.2s**（供稿一致）。

---

## 结构与层次

```text
nav.fdl-tabs-style-1 [+ --scroll]（aria-label 如「内容分类」）
  └── ul.fdl-tabs-style-1__list
        └── li.fdl-tabs-style-1__item [+ --active]
              └── a.fdl-tabs-style-1__link
                    ├── div.fdl-tabs-style-1__content
                    │     ├── div.fdl-tabs-style-1__bubble-wrap
                    │     │     └── span.fdl-tabs-style-1__bubble（可选）
                    │     └── span.fdl-tabs-style-1__text
                    └── span.fdl-tabs-style-1__indicator
```

**布局开关**

- **均分**（默认）：根 **无** `--scroll`；列表 `justify-content: space-around`；项 **`flex: 1`**。  
- **横滑**：根加 **`fdl-tabs-style-1--scroll`**；列表可横向滚动；项宽随内容。

---

## 状态与变体

| 状态 | 文案 | 指示条 |
|------|------|--------|
| 默认 | `color: var(--color-midgray)`，`font-weight: 400` | 透明 |
| 选中（`__item--active`） | `color: var(--color-darkgray)`，`font-weight: 500` | `var(--color-darkgray)` |

---

## 交互与动效

- 切换选中项由路由或状态驱动 **`__item--active`**；当前项 **`a` 建议 `aria-current="true"`**（或 `aria-selected` 若采用 `tablist` 模式）。  
- 横滑：**`-webkit-overflow-scrolling: touch`**（示例可写）；隐藏滚动条样式与供稿一致。

---

## 可访问性

- **`nav` + `aria-label`** 描述 Tab 用途。  
- **`a:focus-visible`**：可见轮廓（建议 `outline: 2px solid var(--color-indigo-1)`）。  
- 角标为装饰时可 **`aria-hidden="true"`**；若承载关键信息则并入链接 **`aria-label`**。

---

## 产出物

- **spec.md**：本文件。  
- **example.html**：[`example.html`](example.html)  

---

## 变更记录

| 日期 | 说明 |
|------|------|
| 2026-04-05 | 样式一供稿落地：`tabs*` → `fdl-tabs-style-1*`；色与圆角 token 化；均分 / 横滑双示例。 |
