# 圆形复选框（Radio-style Checkbox）

## 元信息

- **slug**：`radio-checkbox`  
- **分类**：平台通用 — 小组件（taxonomy **「单选、复选按钮」**；本稿为 **圆形、类单选外观的复选** 实现）  
- **依赖**：[`foundations/design-foundations.md`](../../../../foundations/design-foundations.md)  
- **最后同步**：2026-04-05  

---

## 概述

**双态选中** 的圆形控件：外观接近单选圆钮，交互上可作 **复选**（开/关）。**外层 48×48** 定义点击与对齐区域；**内层 42×42** 圆承担描边、填充与对勾显示。支持 **启用 / 禁用** 共四种组合。

供稿类名 `radio-check` 已统一为 **`fdl-radio-check`**。

---

## 结构

```text
.fdl-radio-check                 — 48×48 热区（cursor / 禁用）
  └── .fdl-radio-check__visual   — 42×42 圆（边框、背景）
        └── svg.fdl-radio-check__icon — 对勾（stroke）
```

**修饰符**

- `fdl-radio-check--checked`：选中（黄底、黄边、对勾可见）。  
- `fdl-radio-check--disabled`：禁用（`cursor: not-allowed`）。  

---

## 视觉规范（@2x px）

| 状态 | 内层圆背景 | 边框 | 对勾 |
|------|------------|------|------|
| 未选 · 启用 | `var(--color-white)` | `3px solid var(--color-auxiliary)` | 隐藏（`opacity: 0`） |
| 已选 · 启用 | `var(--color-brand-1)` | `3px solid var(--color-brand-1)` | 显示，`stroke: var(--color-darkgray)` |
| 未选 · 禁用 | `var(--color-label)` | `3px solid` 浅灰（供稿 `#ECEDF0`，**与 `--color-bg` 接近**；示例用 `var(--color-bg)` 统一变量体系，若验收需更浅边，请在 foundations 增补 token 后替换） | 隐藏 |
| 已选 · 禁用 | 同已选启用（黄底黄边） | 同左 | `opacity: 0.2`（半透明对勾） |

| 几何 | 值 |
|------|-----|
| 热区 | 48×48 |
| 可视圆 | 42×42，相对热区 `top/left: 3px` |
| 对勾 SVG | 视口约 22×22 置于圆内，`stroke-width: 4`，`stroke-linecap/join: round` |

**动效**：背景/边框 `transition` 约 **0.2s**；对勾 `opacity` + `transform: scale(0.8→1)`。

---

## 无障碍（建议）

- 与 `<label>` 关联，或使用 `role="checkbox"` + `aria-checked` + `aria-disabled`。  
- 纯展示示例可用 `aria-hidden` 包裹装饰性网格。  

---

## 产出物

- **spec.md**：本文件。  
- **example.html**：[`example.html`](example.html)  

---

## 变更记录

| 日期 | 说明 |
|------|------|
| 2026-04-05 | 供稿落地；`radio-check` → `fdl-radio-check`；白/灰边/黄/深字 token 化；禁用浅边用 `--color-bg` 近似并注明。 |
