# 模块收起 / 展开（箭头链接）

## 元信息

- **slug**：`collapse`  
- **分类**：平台通用 — **按钮**（taxonomy **「模块 收起/展开」**；视觉为 **胶囊箭头链接**）  
- **依赖**：[`foundations/design-foundations.md`](../../../../foundations/design-foundations.md)  
- **最后同步**：2026-04-05  

---

## 概述

**浅灰底 + 靛蓝字** 的 **胶囊形** 控件：文案 + **可旋转箭头**（同一右向 chevron，通过 **`transform` 旋转** 得到右 / 下 / 上）。用于 **查看全部**、**展开更多/收起更多**、**展开/收起** 等轻量引导；视觉强度介于正文链接与主按钮之间。

供稿类名 `arrow-link` / `arrow-link__*` / `arrow-link--arrow-*` 已统一为 **`fdl-collapse`** / **`fdl-collapse__*`** / **`fdl-collapse--arrow-*`**。  
**未加方向修饰符** 时，箭头视为 **向右**（与供稿显式 `--arrow-right` 等价）。

---

## 结构

```text
button.fdl-collapse（或 a；展开/收起建议 button + JS 切换修饰符）
  ├── span.fdl-collapse__text
  └── span.fdl-collapse__icon
        └── svg（chevron 向右，stroke 用 currentColor）
```

**方向修饰符**（与 `__icon` 上旋转配合）

| 修饰符 | 语义 | `__icon` transform |
|--------|------|---------------------|
| （默认，可选 `--arrow-right` 显式写出） | 向右 · 查看全部 / 进详情 | `rotate(0deg)`（`__icon` 默认） |
| `fdl-collapse--arrow-down` | 向下 · 展开 | `rotate(90deg)` |
| `fdl-collapse--arrow-up` | 向上 · 收起 | `rotate(-90deg)` |

---

## 视觉规范（@2x px）

| 项目 | 值 |
|------|-----|
| 高度 | **60** |
| 水平内边距 | **48**；**gap**（文与图标）**12**；垂直内边距由高度 + flex 居中隐含（供稿 `padding: 12px 48px` 保留） |
| 圆角 | **胶囊**：`border-radius: 9999px`（供稿 30px = 半高，等价） |
| 背景 | `var(--color-label)` |
| 悬停背景 | `color-mix(in srgb, var(--color-darkgray) 4%, var(--color-label))`（替代供稿 `#f0f1f3`） |
| 文案 | **26px**，行高 **1.4**，字重 **500**，色 `var(--color-indigo-1)` |
| 图标盒 | **12×12**，内 SVG 右向 chevron，`stroke-width: 2.5`，**`currentColor`** |
| 图标动画 | `transform 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)` |
| 容器过渡 | `background-color 0.2s ease` |

**禁用**：`opacity: 0.5`、`cursor: not-allowed`；**`button:disabled`** 或 **`[aria-disabled="true"]`** / **`.fdl-collapse--disabled`** 时建议 **`pointer-events: none`**（`a` 标签需配合 `tabindex="-1"`）。

---

## 交互（建议）

- 用于折叠区域时建议使用 `button`，并维护 **`aria-expanded`**。  
- 点击后允许双向切换：  
  - `fdl-collapse--arrow-down` +「展开更多」⇄ `fdl-collapse--arrow-up` +「收起更多」  
  - `fdl-collapse--arrow-up` +「收起」⇄ `fdl-collapse--arrow-down` +「展开」  
- 示例页可用 `data-collapse-toggle` + `data-expand-text` / `data-collapse-text` 约定文案。

---

## 无障碍（建议）

- 展开/收起：用 **`button type="button"`**，`aria-expanded`、箭头方向与文案需同步更新。  
- 跳转详情：可用 **`a href`**，保留键盘焦点样式。  
- **`:focus-visible`**：示例使用 `outline`（`--color-indigo-1`）。  

---

## 产出物

- **spec.md**：本文件。  
- **example.html**：[`example.html`](example.html)  

---

## 变更记录

| 日期 | 说明 |
|------|------|
| 2026-04-05 | 供稿落地；`arrow-link` → `fdl-collapse`；色 token 化；默认右箭头；示例改为 button；viewport 750。 |
| 2026-04-07 | 补充双向切换规范：展开更多⇄收起更多、收起⇄展开；示例支持 `data-collapse-toggle` 文案参数。 |
