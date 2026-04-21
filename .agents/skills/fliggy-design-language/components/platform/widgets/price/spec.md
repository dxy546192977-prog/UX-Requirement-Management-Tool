# 价格展示

## 元信息

- **slug**：`price`  
- **分类**：平台通用 — 小组件（taxonomy **「价格」**）  
- **依赖**：[`foundations/design-foundations.md`](../../../../foundations/design-foundations.md)（`Fliggy Sans 102`、`--color-pay-1` 等）  
- **最后同步**：2026-04-05  

---

## 概述

以 **非对称字号** 突出 **整数**，**货币符号、小数、后缀**（如「起」）较小；**`align-items: flex-end`** 做 **底对齐**。主价色 **`var(--color-pay-1)`**；**原价** 删除线 + **`--color-lightgray`**；**销量等辅文** 用 **`--color-midgray`**。数字字体与 foundations **「数字 / 货币」** 一致：**`Fliggy Sans 102`** 为主（示例加载 Medium 字重文件）；供稿中货币 **`Alibaba Sans 102` Bold** 若未接入 CDN，可用 **同栈 + `font-weight: 700`** 由引擎合成粗体近似。

供稿类名 `price-display` / `price-display__*` / `price-display--*` 已统一为 **`fdl-price`** / **`fdl-price__*`** / **`fdl-price--*`**。

---

## 结构

```text
.fdl-price（inline-flex, flex-end 对齐，主色 pay-1）
  ├── .fdl-price__label（可选，如「会员价」，同色 pay-1）
  ├── .fdl-price__original（可选，删除线，浅灰）
  ├── .fdl-price__currency
  ├── .fdl-price__integer
  ├── .fdl-price__decimal（可选）
  ├── .fdl-price__suffix（可选，如「起」）
  └── .fdl-price__sales（可选，销量等，中灰）
```

子元素顺序可按业务组合；**标签、原价** 建议排在主价片段之前，**销量** 排在之后（与供稿一致）。

---

## 尺寸（@2x px）

| 档位 | 货币 `__currency` | 整数 `__integer` | 小数 `__decimal` | 后缀 `__suffix` | label / original / sales |
|------|-------------------|------------------|-------------------|-----------------|---------------------------|
| **large** | 24 / 行高 24 | 48 / 31 | 32 / 21 | 24 / 24 | 各 24 / 24 |
| **medium** | 24 / 24 | 42 / 27 | 28 / 18 | 20 / 20 | 各 20 / 20 |
| **small** | 24 / 24 | 36 / 23 | 24 / 16 | 18 / 18 | label/original/sales 20 / 20 |

**修饰符**：`fdl-price--large` | `fdl-price--medium` | `fdl-price--small`（必选其一以便字号生效）。

**间距**：片段间 `padding: 0 1px` 微调；`__label` `margin-right: 5px`；`__original` `margin-right: 12px`；`__sales` `margin-left: 12px`。

**行高**：供稿为 **视觉对齐** 用的紧缩行高（非段落 140%），**请勿**随意改为统一 1.4，除非视觉验收另有要求。

---

## 颜色

| 元素 | Token / 规则 |
|------|----------------|
| 根及主价片段（货币、整数、小数、后缀、标签） | `color: var(--color-pay-1)` |
| 原价 | `var(--color-lightgray)` + `text-decoration-line: line-through` |
| 销量等 | `var(--color-midgray)` |

---

## 无障碍（建议）

- 金额语义：可对根包 **`bdi`** 或保留 **`span`** + **`aria-label`**（如「现价六百九十四元九角五」）由业务拼接。  
- 原价与现价关系：可用 **`aria-describedby`** 或将整段包在带说明的父级中。  

---

## 产出物

- **spec.md**：本文件。  
- **example.html**：[`example.html`](example.html)  

---

## 变更记录

| 日期 | 说明 |
|------|------|
| 2026-04-05 | 供稿落地；`price-display` → `fdl-price`；支付色/灰阶 token 化；货币与数字对齐 foundations；三档尺寸与组合示例；viewport 750。 |
