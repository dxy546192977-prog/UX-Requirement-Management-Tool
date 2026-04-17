# 底部栏 Tabbar（预订 · 预订操作栏）

## 元信息

- **slug**：`tabbar`（变体，与一级 / 二级共用 taxonomy **「底部栏 Tabbar」**）  
- **分类**：平台通用 — **导航**  
- **依赖**：[`foundations/design-foundations.md`](../../../../foundations/design-foundations.md)；价格数字与 [`widgets/price/spec.md`](../../../widgets/price/spec.md) 大号档一致  
- **最后同步**：2026-04-05  

---

## 概述

**事务型固定底栏**：左侧 **价格区**（主价高亮 **`--color-pay-1`**）+ 可选 **明细链接**；右侧 **1～2 个胶囊按钮**。主操作底 **`--color-pay-1`**，次操作底 **`--color-pay-2`**。用于详情预订、支付前确认、购物车结算等 **转化闭环**，与一级 `fdl-tabbar`、二级 `fdl-bottom-bar` **互斥同屏底栏角色**（按场景择一或上下分层由产品定）。

供稿 `booking-bar` / `booking-bar__*` / `btn*` → **`fdl-booking-bar`** / **`fdl-booking-bar__*`**；栏内按钮 **`fdl-booking-bar__btn`** + 修饰符（非通用 `fdl-button`，因形态与组合固定）。

---

## 结构

```text
div.fdl-booking-bar（白底容器；可 position: fixed; bottom: 0; width: 100%）
  ├── div.fdl-booking-bar__strip（横向 flex；建议顶部分割 0 -1px 0 var(--color-bg)）
  │     ├── div.fdl-booking-bar__info
  │     │     ├── div.fdl-booking-bar__price
  │     │     │     ├── span.fdl-booking-bar__currency（如 ¥）
  │     │     │     └── span.fdl-booking-bar__value（主数字）
  │     │     └── a.fdl-booking-bar__details（可选：明细 + chevron）
  │     └── div.fdl-booking-bar__actions
  │           └── button.fdl-booking-bar__btn [修饰符…]
  │                 ├── span.fdl-booking-bar__btn-main（可选双行时）
  │                 └── span.fdl-booking-bar__btn-sub（可选）
  └── div.fdl-booking-bar__safe-area（可选：min-height 64 + safe-area padding，同一级 Tabbar）
```

**按钮修饰符**

| 修饰符 | 用途 |
|--------|------|
| `fdl-booking-bar__btn--primary` | 主转化：底 `var(--color-pay-1)`，字白 |
| `fdl-booking-bar__btn--secondary` | 次转化：底 `var(--color-pay-2)`，字白 |
| `fdl-booking-bar__btn--capsule` | 单按钮：胶囊（`border-radius: 9999px`） |
| `fdl-booking-bar__btn--left-cap` | 双按钮左半：左圆右直 |
| `fdl-booking-bar__btn--right-cap` | 双按钮右半：右圆左直 |
| `fdl-booking-bar__btn--stack` | 按钮内主副双行（`flex-direction: column`） |

---

## 视觉规范（@2x px）

| 项目 | 值 |
|------|-----|
| 栏体内边距 | **24**（四向） |
| 主价 | 与 **price large**：货币 **24px** Bold、整数 **48px**，`color: var(--color-pay-1)`，**`align-items: flex-end`**；字体 **`Fliggy Sans 102`** + `font-weight: 700`（与 foundations「数字 / 货币」一致） |
| 明细 | **24px** Regular，`color: var(--color-lightgray)`；chevron 描边同色 |
| 按钮高 | **84**；单行主文案 **30px** Medium；**stack** 时主 **28px**、副 **22px** Regular |
| 按钮水平 padding | **30**（stack 时纵向可 **10** 上下） |
| 双按钮宽 | 示例 **200**×2；单主按钮示例 **270**（可按屏宽 `flex`/`min-width` 调整） |
| 胶囊圆角 | 与平台按钮一致 **`border-radius: 9999px`**；双钮拼接用 **left-cap / right-cap** |
| 背景 | `var(--color-white)` |

**交互**：`button:focus-visible`、`a.fdl-booking-bar__details:focus-visible` 须有可见轮廓（建议 `outline: 2px solid var(--color-indigo-1)`）。

---

## 与一级 / 二级的关系

| | `fdl-tabbar` | `fdl-bottom-bar` | `fdl-booking-bar` |
|--|--------------|------------------|-------------------|
| 用途 | 全局主导航 | 页内动作 / 子导航 | 预订 / 支付转化 |
| 左侧 | Tab 均分 | Tab 均分 | 价格 + 可选明细 |
| 右侧 | — | — | 主/次胶囊按钮 |

---

## 产出物

- **spec-booking.md**：本文件。  
- **example-booking.html**：[`example-booking.html`](example-booking.html)  

---

## 变更记录

| 日期 | 说明 |
|------|------|
| 2026-04-05 | 预订操作栏供稿落地；`booking-bar*` → `fdl-booking-bar*`；主/次色 token 化；新增全局 `--color-pay-2`。 |
