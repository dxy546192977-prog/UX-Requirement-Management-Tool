# 导航栏

## 元信息

- **slug**：`navbar`  
- **分类**：平台通用 — **导航**（taxonomy **「导航栏」**）  
- **依赖**：[`foundations/design-foundations.md`](../../../../foundations/design-foundations.md)；状态栏条图为 **页面级资源**（示例用飞猪 CDN）  
- **最后同步**：2026-04-05  

---

## 概述

顶栏 **左返回 · 中标题 · 右操作（0～3 图标）**；**主题**：白底深字、透明底深字、透明底浅字；**`--brand`** 时标题用 **Fliggy Fonts** 斜体加大字号。返回与右侧为 **图片图标**（深浅两套资源由主题切换）。

供稿类名 `navbar` / `navbar__*` 已统一为 **`fdl-navbar`** / **`fdl-navbar__*`**；**`navbar__action-item`** → **`fdl-navbar__action`**。

---

## 结构

```text
nav.fdl-navbar（aria-label="主导航" 等）
  ├── div.fdl-navbar__left
  │     └── a.fdl-navbar__back（返回，48×48 热区，内 img）
  ├── h1.fdl-navbar__title
  └── div.fdl-navbar__right
        └── div.fdl-navbar__actions
              └── a.fdl-navbar__action × N（0～3，内 img）
```

**状态栏**：非本组件必选；与导航条叠放时见 `example.html`（`fdl-navbar-demo__status`）。

---

## 视觉规范（@2x px）

| 项目 | 值 |
|------|-----|
| 栏高 | **88**（仅导航行，不含状态栏） |
| 水平内边距 | **24** |
| 左右区 | `min-width: 48`，`flex-shrink: 0` |
| 返回 / 操作图标 | **48×48**，`img` 铺满，`object-fit: contain` |
| 操作区间距 | **gap: 24** |
| 标题 | 默认 **36px**、Medium、`text-align: center`；**绝对居中**：`left: 50%` + `translate(-50%,-50%)`，`width: 60%`，**ellipsis** |
| 品牌标题 | **40px**，Fliggy Fonts Italic、`font-weight: 500` |

**主题（`color` 作用于标题；图标靠资源）**

| 修饰符 | 背景 | 字色（标题等） |
|--------|------|----------------|
| `fdl-navbar--light` | `var(--color-white)` | `var(--color-darkgray)` |
| `fdl-navbar--transparent-light` | transparent | `var(--color-darkgray)` |
| `fdl-navbar--transparent-dark` | transparent | `var(--color-white)` |

**叠加**：`fdl-navbar--brand` 与任一主题类可同用。

---

## 无障碍（建议）

- `nav` + **`aria-label`**。  
- 返回：`aria-label="返回"`（或具体上一页名）。  
- 操作图标：`alt` 空 + **`aria-label`** 描述动作。  
- **`focus-visible`**：链接框线（示例用 `var(--color-indigo-1)`，透明浅字场景可改用白描边）。  

---

## 产出物

- **spec.md**：本文件。  
- **example.html**：[`example.html`](example.html)  

---

## 变更记录

| 日期 | 说明 |
|------|------|
| 2026-04-05 | 供稿落地；`navbar` → `fdl-navbar`；色 token 化；@2x 全尺寸示例；`__action` 命名；viewport 750。 |
