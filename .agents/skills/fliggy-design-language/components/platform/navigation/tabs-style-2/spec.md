# 选项卡 Tab（样式二 · 托起式分类导航栏）

## 元信息

- **slug**：`tabs-style-2`  
- **分类**：平台通用 — **导航**（taxonomy **「选项卡 Tab」— 样式二）  
- **依赖**：[`foundations/design-foundations.md`](../../../../foundations/design-foundations.md)  
- **最后同步**：2026-04-05  

---

## 概述

顶部 **分类 Tabs**，选中项在 **内容块顶区** 呈现 **品牌黄向下透明渐变**（托起高光）；**2～4 项均分**（`flex: 1` + 列表 `justify-content: center`），**>4 项横滑**（`fdl-tabs-style-2--scroll`、项 `flex-shrink: 0`、列表 **`gap: 18`**、水平 **`padding: 0 24`**）。每项可选 **角标**（绝对定位，底 **`var(--color-pay-1)`**）、**主标题**（**30px**）、**副标题**（**20px**）。选中：**主标题 Medium + `var(--color-darkgray)`**，副标题升为 **`var(--color-midgray)`**；未选主 **`var(--color-midgray)`**，副 **`var(--color-lightgray)`**。

供稿 `uplift-tabs` / `uplift-tabs__*` / `uplift-tabs--scrollable` → **`fdl-tabs-style-2`** / **`fdl-tabs-style-2__*`** / **`fdl-tabs-style-2--scroll`**。

---

## 使用场景

- 需要 **强焦点、偏营销氛围** 的顶部分类（与样式一的细指示条区分）。  
- **均分**：首页或频道下 **2～4** 个主类。  
- **横滑**：同频道下多子类（酒店类型等）。  
- **不宜**：与样式一同页同级堆叠且未做视觉规范；信息极密时慎用副标题 + 角标同开。

---

## 视觉规范（@2x px）

| 项目 | 值 |
|------|-----|
| 栏高 | **102** |
| 列表（均分） | 水平 **`padding: 0 18`**（与页面 **18** 边距一致） |
| 列表（横滑） | **`padding: 0 24`**，**`gap: 18`**，`overflow-x: auto`，隐藏滚动条 |
| 项 / 链 | 列表 **`align-items: flex-end`**；链 **`height: 100%`**，**`width: 100%`**，内容贴底 |
| 托起内容块（`__content`） | 高 **92**，**`border-radius: var(--radius-m) var(--radius-m) 0 0`**，**`padding: 0 10`**，纵向居中，`gap: 2` |
| 选中渐变 | **`linear-gradient(180deg, var(--color-brand-1) 0%, transparent 100%)`**（供稿 `#FFE866` 收敛为 **brand-1**） |
| 主标题 | **30px**，默认 Regular；选中 **500** |
| 副标题 | **20px** Regular |
| 角标 | **18px** Medium，字 **`var(--color-white)`**，底 **`var(--color-pay-1)`**，**`padding: 4px 8px`**，`border-radius: var(--radius-m) var(--radius-m) var(--radius-m) var(--radius-s)`（不对称「气泡」角） |
| 角标定位 | **`top: 0; right: 10px`**（相对 **`__link`**） |
| 背景 | `var(--color-white)` |

**动效**：`__content` 背景、字重与字色 **0.3s ease**（供稿一致）。

---

## 结构与层次

```text
nav.fdl-tabs-style-2 [+ --scroll]（aria-label 如「内容分类」）
  └── ul.fdl-tabs-style-2__list
        └── li.fdl-tabs-style-2__item [+ --active]
              └── a.fdl-tabs-style-2__link
                    ├── span.fdl-tabs-style-2__bubble（可选，角标）
                    └── div.fdl-tabs-style-2__content
                          ├── span.fdl-tabs-style-2__main
                          └── span.fdl-tabs-style-2__sub（可选）
```

**布局**

- **均分**：根 **无** `--scroll`；项 **`flex: 1`**。  
- **横滑**：根加 **`fdl-tabs-style-2--scroll`**；项 **`flex-shrink: 0`**。

---

## 状态与变体

| | 主标题 | 副标题 | `__content` 背景 |
|--|--------|--------|-------------------|
| 默认 | `midgray` / 400 | `lightgray`（若有） | 无 / 透明 |
| 选中 | `darkgray` / 500 | `midgray` | 黄渐变 |

---

## 交互与可访问性

- 整格可点：**`a.fdl-tabs-style-2__link`** 铺满项；当前项 **`aria-current="true"`**。  
- **`focus-visible`**：建议 `outline: 2px solid var(--color-indigo-1)`。  
- 纯装饰角标：**`aria-hidden="true"`**；若承载关键语义则并入链接 **`aria-label`**。

---

## 与样式一差异

| | 样式一 `fdl-tabs-style-1` | 样式二 `fdl-tabs-style-2` |
|--|---------------------------|---------------------------|
| 选中反馈 | 底 **指示条** + 字重/色 | **渐变托起块** + 字重/色 |
| 副标题 | 无 | 可选 |
| 均分阈值 | 2～5 | 2～4 |
| 横滑阈值 | >5 | >4 |
| 角标色 | `promo-1` | `pay-1` |

---

## 产出物

- **spec.md**：本文件。  
- **example.html**：[`example.html`](example.html)  

---

## 变更记录

| 日期 | 说明 |
|------|------|
| 2026-04-05 | 样式二供稿落地：`uplift-tabs*` → `fdl-tabs-style-2*`；渐变与色 token 化；均分/横滑双示例。 |
