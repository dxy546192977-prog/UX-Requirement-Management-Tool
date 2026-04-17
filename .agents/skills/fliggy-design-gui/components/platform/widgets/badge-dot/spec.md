# 通知徽标（Badge / 小红点）

## 元信息

- **slug**：`badge-dot`  
- **分类**：平台通用 — 小组件（taxonomy **「小红点」**）  
- **依赖**：[`foundations/design-foundations.md`](../../../../foundations/design-foundations.md)  
- **最后同步**：2026-04-05  

---

## 概述

附着在图标、头像、Tab 等 **角上的小型指示器**，用于提示「有新内容」或展示 **数量 / 短文案**。高对比：**支付/优惠色底** + **白字**，内容始终 **水平垂直居中**。

供稿类名 `skill-badge` 已统一为 **`fdl-badge`**。

---

## 使用场景

- **适合**：未读数、新功能提示、购物车件数、消息角标。  
- **不适合**：长句说明；需精确到大于 `max-width` 的文案（应改交互或换组件）。  

---

## 形态变体

| 修饰符 | 形态 | 说明 |
|--------|------|------|
| `fdl-badge--dot` | **点状** | 无文字，18×18 圆点，仅提示「有新状态」 |
| `fdl-badge--single-digit` | **圆形** | 单位数字，30×30 正圆，`font-size: 20px` |
| `fdl-badge--multi-digit` | **胶囊** | 多位数（如 `99+`）或短字（如「新」「通知」），宽随内容，**最大宽度 55px**，超出需产品定义截断规则 |

---

## 视觉规范（@2x px）

| 项 | 规范 |
|----|------|
| 背景 | `var(--color-pay-1)`（供稿 `#FF5533`） |
| 字色 | `var(--color-white)` |
| 字体 | `font-family: 'PingFang SC', 'SimHei', sans-serif`；`font-weight: 400`；`white-space: nowrap` |
| 点状 | `width/height: 18px`，`border-radius: 50%`，无 padding |
| 单位数圆 | `30×30`，`border-radius: 50%`，`font-size: 20px`，`line-height: 1`，无 padding |
| 胶囊 | `height: 30px`，`min-width: 30px`，`max-width: 55px`，`padding: 4px 9px`，`font-size: 20px`，`line-height: 1` |
| 胶囊圆角 | `border-radius: 15px`（**高度一半**，组件专用，非全局 `--radius-*`） |
| 布局 | `display: inline-flex`；`justify-content: center`；`align-items: center`；`box-sizing: border-box` |

---

## 定位（与父级组合）

徽标 **不单独占版心**，通常 `position: absolute` 叠在父级 **右上角**（或设计指定角）。示例偏移 **`top: -5px; right: -10px`** 仅作演示，**以设计稿为准**。

父级需 `position: relative`（或 `absolute` 等建立包含块）。

---

## 结构与层次

```text
.fdl-badge                    — 基础：底色、字色、flex 居中
  .fdl-badge--dot             — 点状
  .fdl-badge--single-digit    — 单位数圆
  .fdl-badge--multi-digit      — 胶囊 / 多位
```

---

## 产出物

- **spec.md**：本文件。  
- **example.html**：[`example.html`](example.html)  

---

## 变更记录

| 日期 | 说明 |
|------|------|
| 2026-04-05 | 供稿「通知徽标」+ html 落地；`skill-badge` → `fdl-badge`；颜色 token 化；viewport 750。 |
