# 小黄条通知（Notice Bar）

## 元信息

- **slug**：`notice-bar`  
- **分类**：平台通用 — **反馈**（taxonomy **「小黄条」**）  
- **依赖**：[`foundations/design-foundations.md`](../../../../foundations/design-foundations.md)（**`--color-notice-tint`**、**`--color-pay-1`** 等）  
- **最后同步**：2026-04-05  

---

## 概述

**非模态横向条**：**左暖右白** 线性渐变（**`--color-notice-tint` → `--color-white`**，停点与供稿一致 **0.25% / 77.92%**），**`--radius-m`** 圆角，高 **72**。从左到右：**品牌块**（**64×32**，**`--color-brand-1`** 底 + **`--color-safeguard-5`** 字，供稿 #FFC900 / #8C5400 收敛为此组合）、**高亮标题**（**`--color-pay-1`**）、**说明**（**`--color-darkgray`**，**单行省略**）。右侧 **72** 宽动作区可选：**箭头链接**、**关闭按钮** 或 **无**；有动作时 **`::after`** 在动作区左侧叠 **白→透明** 渐变，避免文案与图标硬切。

供稿 `notice-bar` / `notice-bar__*` → **`fdl-notice-bar`** / **`fdl-notice-bar__*`**；无右侧交互时根加 **`fdl-notice-bar--static`** 并 **不写** **`__action`**。

---

## 使用场景

- 营销/福利入口（箭头跳转）。  
- 维护、未读等提示（关闭阅后即焚）。  
- 纯状态条（测试环境、网络态等，**`--static`**）。  

---

## 视觉规范（@2x px）

| 项目 | 值 |
|------|-----|
| 条 | 高 **72**，**`padding-left: 24`**；**`--static`** 时 **`padding-right: 24`** |
| 渐变 | **`linear-gradient(90deg, var(--color-notice-tint) 0.25%, var(--color-white) 77.92%)`** |
| 主行 | **`display: flex`** **`align-items: center`**；左侧 **`__main`** **`flex: 1`** **`min-width: 0`** **`overflow: hidden`** **`gap: 12`** |
| 品牌块 | **64×32**，**`border-radius: var(--radius-s)`**，**18px** **700**，**`justify-content: center`** |
| 标题 | **24** **500**，**`var(--color-pay-1)`**，**`white-space: nowrap`** **`flex-shrink: 0`** |
| 说明 | **24** **400**，**`flex: 1`** **`min-width: 0`** **ellipsis** |
| 动作区 | **72** 宽 **`flex-shrink: 0`**；**`::after`**：**`left: -48`** **宽 48** **`linear-gradient(270deg, var(--color-white), transparent)`** **`pointer-events: none`** |
| 图标 | **24×24**，描边 **`currentColor`**（箭头区 **`--color-darkgray`**，关闭 **`--color-midgray`**） |

---

## 结构与层次

```text
div.fdl-notice-bar [+ --static]
  ├── div.fdl-notice-bar__main
  │     ├── div.fdl-notice-bar__brand（文案或图）
  │     ├── span.fdl-notice-bar__title
  │     └── p.fdl-notice-bar__text
  └── a | button.fdl-notice-bar__action（可选）
```

**变体**

| 模式 | DOM |
|------|-----|
| 箭头 | **`a.fdl-notice-bar__action`** + chevron **`href`** |
| 关闭 | **`button type="button"`** + **`aria-label="关闭"`** |
| 纯展示 | 无 **`__action`**，根 **`fdl-notice-bar--static`** |

---

## 可访问性

- 关闭钮必须 **`aria-label`**。  
- 整条可点时用 **`a`** 包外层或 **`role="link"`** + 键盘支持；仅箭头可点时 **`__action`** 需 **`focus-visible`** 轮廓。  
- 品牌块内若为装饰字可 **`aria-hidden`**，由 **`__title`/`__text`** 承担朗读。

---

## 产出物

- **spec.md**：本文件。  
- **example.html**：[`example.html`](example.html)  

---

## 变更记录

| 日期 | 说明 |
|------|------|
| 2026-04-05 | 初版：`notice-bar*` → `fdl-notice-bar*`；渐变 `--color-notice-tint`；三形态示例。 |
