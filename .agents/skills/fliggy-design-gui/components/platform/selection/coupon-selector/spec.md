# 优惠券（券卡片）

## 元信息

- **slug**：`coupon-selector`  
- **分类**：平台通用 — **选择**（taxonomy **「优惠券」**；组件为 **券卡片**，可用于领券列表、结算勾选等）  
- **依赖**：[`foundations/design-foundations.md`](../../../../foundations/design-foundations.md)（**Fliggy Sans 102**、**`--color-pay-1`**、**`--color-brand-1/2`** 等）；与 [`tags/tag-discount/spec.md`](../../tags/tag-discount/spec.md)（小标签券形）区分：**本组件为横向整卡 + 撕口 + 操作区**  
- **最后同步**：2026-04-05  

---

## 概述

**横向 168 高券卡**：外底 **`var(--color-brand-2)`**（供稿 `#FFFCE6` 收敛），**`--radius-m`**。三区：**面额区**（白底 **173** 宽）、**狗牙虚线分隔**（**14** 宽，径向缺口透出外底）、**信息区**（白 **`flex:1`**）、**操作区**（白 **156** 宽）。面额 **`--color-pay-1`**，数字 **Fliggy Sans 102** **60** Bold；虚线芯 **`--color-brand-1`**。操作：**主钮**（**`brand-1`** 底 + **`darkgray`** 字）、**次钮**（**`2px solid pay-1`** + **`pay-1`** 字）、**勾选**（圆 **48**，未选 **`auxiliary` 边框**，选中 **`brand-1`** 底 + 勾 **`darkgray`**）、**失效**（根 **`fdl-coupon-selector--disabled`**：**`grayscale(1)`** **`pointer-events: none`**，钮退化为 **`label` 底 + `lightgray` 字**）。

供稿 `coupon-ticket` / `value__*` / `divider__*` / `info__*` / `action__*` → **`fdl-coupon-selector`** / **`fdl-coupon-selector__*`**（统一前缀，避免与 `value__` 全局冲突）。

---

## 视觉规范（@2x px）

| 项目 | 值 |
|------|-----|
| 根 | **168** 高，**`overflow: hidden`** |
| 面额区 | **173** 宽，**`padding: 20`**，**`gap: 6`**；货币 **24** Medium；数字 **60** Bold Fliggy Sans；门槛 **22** **`pay-1`** |
| 分隔 | **14** 宽；**径向半圆缺口** 半径 **7**，透明处露 **根底 `brand-2`**；中缝 **2** 宽 **虚线**（**`linear-gradient` + `brand-1`**） |
| 信息 | **`padding: 24px 18px`** **`gap: 8`**；标题 **30** Medium **`darkgray`** ellipsis；规则/有效期 **20** **`midgray`** |
| 操作 | **156** 宽 **`padding: 0 18`**；钮 **120×60** **28** Medium **胶囊** |
| 勾选 | **48** 圆，**`border: 3px solid var(--color-auxiliary)`**；选中 **`border-color: brand-1`** **`background: brand-1`** + **`::after` 勾** |

---

## 结构与层次

```text
article | div.fdl-coupon-selector [+ --disabled]
  ├── div.fdl-coupon-selector__value
  │     ├── div.fdl-coupon-selector__amount
  │     │     ├── span.fdl-coupon-selector__currency（¥ / 折 等）
  │     │     └── span.fdl-coupon-selector__number
  │     └── span.fdl-coupon-selector__threshold（满减说明）
  ├── div.fdl-coupon-selector__divider
  │     └── span.fdl-coupon-selector__divider-line
  ├── div.fdl-coupon-selector__info
  │     ├── h4.fdl-coupon-selector__title
  │     ├── div.fdl-coupon-selector__rule
  │     └── div.fdl-coupon-selector__expiry
  └── div.fdl-coupon-selector__action
        ├── a | button.fdl-coupon-selector__btn [+ --primary | --secondary | --muted]
        └── button.fdl-coupon-selector__check（可选，role="checkbox"）
```

---

## 状态

| 状态 | 操作区 |
|------|--------|
| 去领取 | **`__btn--primary`** |
| 去使用 | **`__btn--secondary`** |
| 结算勾选 | **`__check`** + **`__check--checked`** |
| 已失效/已使用 | 根 **`--disabled`**；**`__btn--muted`** 或 **`span`** 文案 |

---

## 可访问性

- 勾选必须为 **`role="checkbox"`** + **`aria-checked`** + **`aria-label`**。  
- 按钮/链接 **`focus-visible`**：**`outline: 2px solid var(--color-indigo-1)`**。  
- **`--disabled`** 时 **`aria-disabled="true"`** 或从 Tab 序移除。

---

## 产出物

- **spec.md**：本文件。  
- **example.html**：[`example.html`](example.html)  

---

## 变更记录

| 日期 | 说明 |
|------|------|
| 2026-04-05 | 初版：`coupon-ticket*` → `fdl-coupon-selector*`；底 `brand-2`；数字 Fliggy Sans；四态示例。 |
