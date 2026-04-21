# 滑动开关（Toggle Switch）

## 元信息

- **slug**：`switch`  
- **分类**：平台通用 — 小组件（taxonomy **「Switch」**）  
- **依赖**：[`foundations/design-foundations.md`](../../../../foundations/design-foundations.md)  
- **最后同步**：2026-04-05  

---

## 概述

双态 **开 / 关** 的滑块开关；另支持 **启用 / 禁用**，共 **四种** 视觉组合。由 **轨道（Track）** 与 **滑块（Handle）** 构成。

供稿 BEM `toggle-switch` 已统一为 **`fdl-switch`**。

---

## 结构

```text
.fdl-switch              — 轨道（可设 role="switch"、aria-checked）
  └── .fdl-switch__handle — 圆形滑块
```

**修饰符**

- `fdl-switch--on`：开启（滑块在右、轨道为品牌黄）。  
- `fdl-switch--disabled`：禁用（交互与视觉见下表）。  

---

## 视觉规范（@2x px）

| 元素 | 尺寸 / 样式 |
|------|-------------|
| 轨道 | **80 × 50**，`border-radius: 25px`（**高度一半**，组件专用胶囊，非全局 `--radius-*`） |
| 滑块 | **44 × 44**，`border-radius: 50%`，垂直居中 `top: 3px`（`(50 - 44) / 2`） |
| 滑块水平 | **关**：`left: 3px`；**开**：`left: auto; right: 3px` |
| 关 · 启用 · 轨道 | `background: var(--color-auxiliary)`（`#D2D4D9`） |
| 开 · 启用 · 轨道 | `background: var(--color-brand-1)`（`#FFE033`） |
| 滑块填充 | `var(--color-white)` |
| 开 · 启用 · 滑块阴影 | `box-shadow: -2px 3px 5px #E5C600`（**组件专用**，无全局 token） |
| 关 · 启用 · 滑块阴影 | 无 |
| 关 · 禁用 | **整轨 + 滑块** `opacity: 0.3`，`cursor: not-allowed` |
| 开 · 禁用 | 轨道 **仍为** `var(--color-brand-1)`；滑块 `background-color: rgba(255, 255, 255, 0.6)`，**保留**开启态阴影；`cursor: not-allowed` |

**动效**：`transition` 可用 `background-color`、`opacity` 约 **0.3s**；滑块位移可用 `cubic-bezier(0.68, -0.55, 0.27, 1.55)`（供稿回弹曲线）。

---

## 交互与无障碍（建议）

- 可点击区域至少覆盖整个轨道；禁用态 `pointer-events: none` 或保留 `not-allowed` 由产品定。  
- 语义化推荐：根节点 `role="switch"`，`aria-checked="true|false"`，`aria-disabled="true"` 于禁用。  

---

## 产出物

- **spec.md**：本文件。  
- **example.html**：[`example.html`](example.html)  

---

## 变更记录

| 日期 | 说明 |
|------|------|
| 2026-04-05 | 供稿落地；`toggle-switch` → `fdl-switch`；轨道灰/黄、白滑块 token 化；viewport 750。 |
