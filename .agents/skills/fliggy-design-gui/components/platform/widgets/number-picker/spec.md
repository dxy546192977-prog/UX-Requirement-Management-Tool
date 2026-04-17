# 数字加减器（Number Stepper）

## 元信息

- **slug**：`number-picker`  
- **分类**：平台通用 — 小组件（taxonomy **「数字选择器」**）  
- **依赖**：[`foundations/design-foundations.md`](../../../../foundations/design-foundations.md)  
- **最后同步**：2026-04-05  

---

## 概述

在 **胶囊形容器** 内通过 **减 / 数值 / 加** 三步调节数量。加减为 **透明底 + 圆形描边**，描边与 **SVG 图标** 共用 `currentColor`：**靛蓝** 表示可用，**灰** 表示禁用。适用于购物车件数、票量等。

供稿类名 `quantity-stepper` 已统一为 **`fdl-number-picker`**。

---

## 结构

```text
.fdl-number-picker
  ├── button.fdl-number-picker__button  — 减（可选 disabled）
  ├── span.fdl-number-picker__value   — 数值
  └── button.fdl-number-picker__button  — 加（可选 disabled）
```

图标使用 **`stroke="currentColor"`**，与 `border-color: currentColor` 同步。

---

## 视觉规范（@2x px）

| 元素 | 规范 |
|------|------|
| 容器 | **190 × 54**，`inline-flex`，`align-items: center`，`padding: 8px`，子项 `gap: 6px`，`background: var(--color-label)`，`border-radius: 27px`（**高度一半**，组件专用胶囊） |
| 按钮 | **38 × 38** 圆，`background: transparent`，`border: 2px solid`，`border-color: currentColor`，`padding: 0`，`flex-shrink: 0` |
| 可用色 | `color: var(--color-indigo-1)`（供稿 `#6666FF`） |
| 禁用色 | `color: var(--color-auxiliary)`（供稿 `#D2D4D9`），`:disabled` + `cursor: not-allowed` |
| 数值 | `flex-grow: 1`，居中，`font-size: 28px`，`font-weight: 500`，`line-height: 1.4`，`color: var(--color-darkgray)`（供稿纯黑，FDG 统一主文色） |
| 字体 | `'PingFang SC', 'SimHei', sans-serif` |

**状态**

- **全可用**：两侧按钮均为靛蓝。  
- **不可减**：仅左按钮 `disabled`，左灰右蓝。  
- **不可加**：仅右按钮 `disabled`，左蓝右灰。  

---

## 交互

- 由业务层在 **最小值 / 最大值** 边界设置对应 `disabled`。  
- 建议为按钮提供 `type="button"`、`aria-label`（如「减少数量」「增加数量」）。  

---

## 产出物

- **spec.md**：本文件。  
- **example.html**：[`example.html`](example.html)  

---

## 变更记录

| 日期 | 说明 |
|------|------|
| 2026-04-05 | 供稿落地；`quantity-stepper` → `fdl-number-picker`；灰底/靛蓝/禁用灰/字色 token 化；viewport 750。 |
