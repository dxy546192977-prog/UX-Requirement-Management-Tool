# 底部栏 Tabbar（二级 · 多功能底栏）

## 元信息

- **slug**：`tabbar`（变体，与一级共用 taxonomy **「底部栏 Tabbar」**）  
- **分类**：平台通用 — **导航**  
- **依赖**：[`foundations/design-foundations.md`](../../../../foundations/design-foundations.md)；一级规范见 [`spec.md`](spec.md)  
- **最后同步**：2026-04-05  

---

## 概述

**同一套骨架、两种模式**：**动作栏**（无选中态，图标+字均为默认深色）与 **导航栏**（有选中态，**靛蓝字 + Medium**、双图标切换）。**2～5 项均分**；**102px** 行高、**48×48** 图标、**22px** 文案；底 **64px 安全区**（可叠 `env(safe-area-inset-bottom)`）。内容建议 **数据驱动** 渲染。

供稿 `bottom-bar-container` / `bottom-bar` → **`fdl-bottom-bar`**（外容器）+ **`fdl-bottom-bar__strip`**（栏体）；**`bottom-bar__*`** → **`fdl-bottom-bar__*`**；**`bottom-bar--nav`** → **`fdl-bottom-bar__strip--nav`**（加在 **`__strip`** 上）。

---

## 结构

```text
div.fdl-bottom-bar（白底总容器；默认 position: relative，可按页改为 fixed）
  ├── div | nav.fdl-bottom-bar__strip [+ __strip--nav]
  │     └── ul.fdl-bottom-bar__list
  │           └── li.fdl-bottom-bar__item [+ --active]
  │                 └── a.fdl-bottom-bar__link
  │                       ├── div.fdl-bottom-bar__icon
  │                       │     — 动作栏：单张 img.fdl-bottom-bar__icon-img
  │                       │     — 导航栏：img--inactive + img--active
  │                       └── span.fdl-bottom-bar__label
  └── div.fdl-bottom-bar__safe-area
```

**语义**

- **动作栏**：`__strip` 用 **`div`** + **`role="toolbar"`** + **`aria-label`**（如「列表操作」）。  
- **导航栏**：`__strip` 用 **`<nav>`** + **`aria-label`**（如「子页面导航」）；当前项 **`aria-current="page"`**。  

---

## 视觉规范（@2x px）

| 项目 | 值 |
|------|-----|
| 栏体高 | **102** |
| 背景 | `var(--color-white)` |
| 顶部分割 | `box-shadow: 0 -1px 0 var(--color-bg)` |
| Tab 链 | 纵向 flex，`gap: 6` |
| 图标 | **48×48** |
| 文案默认 | **22px** Regular，`color: var(--color-darkgray)` |
| 导航 · 选中 | `color: var(--color-indigo-1)`，`font-weight: 500`；图标与一级 Tabbar 相同 **inactive/active 切换** |
| 安全区 | **`min-height: 64`** + **`padding-bottom: env(safe-area-inset-bottom, 0px)`**，底 `var(--color-white)` |

**交互**：供稿含 **`a:hover { opacity: 0.7 }`**，可选保留；须同时提供 **`focus-visible`** 可见焦点。

---

## 与一级的差异

| | 一级 `fdl-tabbar` | 二级 `fdl-bottom-bar` |
|--|-------------------|------------------------|
| 定位 | 固定全局主导航 | 页内底栏，动作/子导航 |
| 选中 | 始终有当前 Tab（除动作模式无此组件） | 动作模式 **无** 选中；导航模式 **有** |
| 首页大标 | **`--fliggy`** 大图标+光晕 | 无 |
| 高亮色 | 黑字 + 图标资源 | 导航选中 **靛蓝字**（`--color-indigo-1`） |

---

## 产出物

- **spec-secondary.md**：本文件。  
- **example-secondary.html**：[`example-secondary.html`](example-secondary.html)  

---

## 变更记录

| 日期 | 说明 |
|------|------|
| 2026-04-05 | 二级供稿落地；`bottom-bar*` → `fdl-bottom-bar*`；导航选中 token 化；双示例 + 数据驱动脚本。 |
