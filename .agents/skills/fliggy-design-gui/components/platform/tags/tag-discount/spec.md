# 优惠类标签（金额优惠 / 券形）

## 元信息

- **slug**：`tag-discount`  
- **分类**：平台通用 — **标签**（taxonomy **「优惠类」**）  
- **依赖**：[`foundations/design-foundations.md`](../../../../foundations/design-foundations.md)（`--color-pay-1`、`--color-white`）  
- **最后同步**：2026-04-05  

---

## 概述

**暖色（支付橙）** 专属优惠条：**独立** 时为单边款小标签，**宽度随文案 + 左右 6px 内边距**；**组合** 时左侧 **`__main`**（浅橙底 + 实线框）、右侧 **`__description`**（白底 + 外框，**左缘虚线** 模拟撕边）。**非交互** 展示。

供稿类名 `coupon-tag` / `coupon-tag__*` / `coupon-tag--with-description` 已统一为 **`fdl-tag-discount`** 系。

---

## 结构

```text
span.fdl-tag-discount
  — 独立：根内直接文本（或包一层 span）
  — 组合：根加 .fdl-tag-discount--with-description
      ├── span.fdl-tag-discount__main
      └── span.fdl-tag-discount__description
```

---

## 视觉规范（@2x px）

| 项目 | 独立 | 组合（--with-description） |
|------|------|-----------------------------|
| 高度 | **28** | 同左 |
| 字号 | **20**，Regular，`line-height: 1.4` | 子块同左 |
| 字/边框色 | `var(--color-pay-1)` | 同左 |
| 边框（半透明） | `1px solid color-mix(in srgb, var(--color-pay-1) 50%, transparent)` | 见下 |
| 圆角 | **4** | `__main` 左、`__description` 右 |
| 根容器 | `padding: 0 6px` | 根 **无边框、透明底、padding 0** |
| `__main` | — | 底 **`color-mix(in srgb, var(--color-pay-1) 8%, transparent)`**；**左上下** 实线框，**无右边框** |
| `__description` | — | 底 **`var(--color-white)`**；**1px 实线** 外框 + **`border-left: 1px dashed`**（同色半透 mix） |

---

## 无障碍（建议）

- 语义可由邻近价格/标题补充；必要时根加 **`role="group"` + `aria-label`** 描述整条优惠文案。  

---

## 产出物

- **spec.md**：本文件。  
- **example.html**：[`example.html`](example.html)  

---

## 变更记录

| 日期 | 说明 |
|------|------|
| 2026-04-05 | 供稿落地；`coupon-tag` → `fdl-tag-discount`；pay-1 / color-mix / 白底 token 化；viewport 750。 |
