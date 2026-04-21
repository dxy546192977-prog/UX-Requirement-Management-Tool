# 目的地选择（Destination Picker）

## 元信息

- **slug**：`destination-picker`  
- **分类**：平台通用 — **选择**（taxonomy **「目的地选择」**）  
- **依赖**：[`foundations/design-foundations.md`](../../../../foundations/design-foundations.md)；浮层与 **Sheet** 一致见 [`feedback/sheet/spec.md`](../../feedback/sheet/spec.md)；顶部分类条视觉对齐 [`navigation/tabs-style-1/spec.md`](../../navigation/tabs-style-1/spec.md)（本组件内为 **嵌套 BEM**，不共用 `fdl-tabs-style-1` 根类）  
- **最后同步**：2026-04-05  

---

## 概述

**底出近全屏面板**（**90vh**、**`max-width: 750`**）：遮罩 **`color-mix(in srgb, var(--color-darkgray) 70%, transparent)`**；面板底 **`var(--color-label)`**，**顶栏白** + **圆角 `var(--radius-l)`**。**搜索框 + 分类 Tab** 必须放在 **同一 `overflow-y: auto` 滚动容器的顶部**，并设 **`position: sticky; top: 0`**，才能在列表滚动时真正吸顶（与供稿「头 + 吸顶 + 滚动体」平级结构不同处见下节）。下方为 **分组标题 + 城市网格**；右侧 **字母/「热门」索引** **`position: absolute`** 叠在滚动区上，点击时用 **容器 `scrollTo`** 跳转（**禁止**仅依赖 `href="#id"` 默认滚动视口）。

供稿 `destination-picker` / `city-list__*` / `tabs__*` / `index-nav__*` → **`fdl-destination-picker`** / **`fdl-destination-picker__*`**；显隐 **`fdl-destination-picker--visible`**。

---

## 结构修正（吸顶生效条件）

**错误**：顶栏、`sticky` 块、**滚动 `div`** 三者兄弟时，`sticky` 的滚动参照不是列表，`position: sticky` **不随城市列表滚动**。  

**正确**：**`__scroll`**（`flex: 1; min-height: 0; overflow-y: auto`）内 **依次为**：**`__sticky`**（搜索 + Tab）→ **列表分组**。顶栏仍在 **`__scroll` 外**，保持固定。

```text
div.fdl-destination-picker [+ --visible]
  └── div.fdl-destination-picker__panel（role="dialog"）
        ├── header.fdl-destination-picker__header
        ├── div.fdl-destination-picker__main（position: relative; flex: 1; min-height: 0）
        │     ├── div.fdl-destination-picker__scroll（唯一纵向滚动）
        │     │     ├── div.fdl-destination-picker__sticky（sticky top 0; z-index; 白底）
        │     │     │     ├── div.fdl-destination-picker__search
        │     │     │     └── nav.fdl-destination-picker__tabs …
        │     │     └── div.fdl-destination-picker__list
        │     │           └── section.fdl-destination-picker__group#…
        │     │                 ├── h3.fdl-destination-picker__group-title
        │     │                 └── div.fdl-destination-picker__grid
        │     │                       └── a.fdl-destination-picker__cell × N
        │     └── nav.fdl-destination-picker__index（absolute 右中或略偏下）
        │           └── a.fdl-destination-picker__index-link × N
```

---

## 视觉规范（@2x px）

| 项目 | 值 |
|------|-----|
| 面板 | **90vh**，底 **`--color-label`** |
| 顶栏 | 高 **88**，**`--color-white`**，顶圆角与面板一致 |
| 搜索 | **`margin: 18`**，高 **72**，**`--color-label`** 底，**`--radius-m`**，**`padding: 0 20`**，内 **`gap: 12`**；输入 **26** **`--color-darkgray`**；**`::placeholder`** **`--color-lightgray`** |
| 搜索图标 | **32×32**，**`currentColor`** = **`--color-midgray`** |
| Tab 栏 | 高 **80**，白底；**`tabs-style-1`** 同款：**`gap: 60`**（或均分由产品定），指示条 **54×6**，选中 **深灰字 500 + 指示条 `darkgray`** |
| 分组标题 | **30** **500**，**`padding: 30px 0 18px`** |
| 网格 | **`repeat(auto-fill, minmax(159px, 1fr))`** **`gap: 12`** |
| 城市格 | 高 **72**，白底，**`--radius-s`**，**26** **`--color-darkgray`**，**`padding: 0 10`**，ellipsis |
| 索引 | **20** **`--color-lightgray`**；**`padding-right`** 留给索引列（示例 **36**） |

---

## 交互与无障碍

- **索引跳转**：`target.getBoundingClientRect().top - scrollEl.getBoundingClientRect().top + scrollEl.scrollTop`，再 **`scrollTo({ top, behavior: 'smooth' })`**；可减去 **`__sticky` 高度** 使分组标题露在吸顶区下方。  
- **关闭**：遮罩、关闭钮、**Escape**；**`aria-hidden`** 同步。  
- **对话框**：**`role="dialog"`** **`aria-modal="true"`** **`aria-labelledby`**。  
- **搜索**：**`input`** 需 **`aria-label`** 或与可见 **`label`** 关联。

---

## 产出物

- **spec.md**：本文件。  
- **example.html**：[`example.html`](example.html)  

---

## 变更记录

| 日期 | 说明 |
|------|------|
| 2026-04-05 | 初版：`destination-picker*` → `fdl-destination-picker*`；吸顶结构修正；索引滚动容器内跳转；token 化。 |
