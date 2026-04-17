# 优惠券（`flight-booking-coupon`）

## 元信息

- **模块 slug**：`flight-booking-coupon`
- **所属页**：`vertical.flight.booking`
- **示例**：[`example.html`](example.html)
- **依赖**：[`foundations/design-foundations.md`](../../../../../../foundations/design-foundations.md)、平台 `coupon-selector` + `tag-discount` 组件
- **最后同步**：2026-04-13

---

## 用途

机票下单页 **优惠券选用区**，展示可用优惠券数量，点击展开券列表或输入兑换码。已选券显示抵扣金额。

---

## 规格摘要

| 区块 | 要点 |
|------|------|
| 容器 `.coupon-card` | 白底 `var(--color-white)`，圆角 **var(--radius-l)**，内边距 **24px** |
| 默认行 `.coupon-row` | 高 **88px**；左侧「优惠券」**28px/500 var(--color-darkgray)**；右侧可用数量 **28px/400 var(--color-pay-1)** 如「3张可用」+ 箭头 |
| 已选态 | 右侧显示「-¥50」**Fliggy Sans 102 28px/bold var(--color-pay-1)** |
| 兑换码入口 | 底部「输入兑换码」**24px/400 var(--color-indigo-1)** |

---

## 结构与层次

```
.coupon-card
├── .coupon-row
│   ├── .coupon-label（优惠券）
│   ├── .coupon-count / .coupon-discount（可用数量 / 已选抵扣）
│   └── .coupon-arrow
└── .coupon-code-link（输入兑换码）
```

---

## 交互

- 点击优惠券行 → 唤起 `coupon-selector` 半屏
- 选择券后返回，显示抵扣金额
- 点击兑换码 → 展开输入框 + 「兑换」按钮

---

## 变更记录

| 日期 | 说明 |
|------|------|
| 2026-04-13 | 初版。 |
