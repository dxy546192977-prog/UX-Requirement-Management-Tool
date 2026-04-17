# 价格明细（`flight-booking-price-detail`）

## 元信息

- **模块 slug**：`flight-booking-price-detail`
- **所属页**：`vertical.flight.booking`
- **示例**：[`example.html`](example.html)
- **依赖**：[`foundations/design-foundations.md`](../../../../../../foundations/design-foundations.md)、平台 `price` + `collapse` 组件
- **最后同步**：2026-04-13

---

## 用途

机票下单页 **价格明细卡**，逐项展示票价、税费、保险、附加服务、优惠抵扣，汇总为应付总价。支持展开/收起明细。

---

## 规格摘要

| 区块 | 要点 |
|------|------|
| 容器 `.price-detail-card` | 白底 `var(--color-white)`，圆角 **var(--radius-l)**，内边距 **24px** |
| 标题行 | 「价格明细」**30px/500 var(--color-darkgray)** + collapse 展开/收起 |
| 明细行 `.price-row` | 高 **60px**；左侧项目名 **26px/400 var(--color-midgray)**；右侧金额 **Fliggy Sans 102 26px/400 var(--color-darkgray)** |
| 优惠行 | 金额为负数，颜色 **var(--color-pay-1)**，如「-¥50」 |
| 分割线 | 总价行上方 **1px var(--color-bg)** |
| 总价行 `.total-row` | 左侧「合计」**30px/500 var(--color-darkgray)**；右侧总价 **Fliggy Sans 102 42px/bold var(--color-pay-1)** |

---

## 明细项清单

| 项目 | 说明 |
|------|------|
| 机票票价 | 成人票价 × 人数 |
| 机建燃油 | 机场建设费 + 燃油附加费 |
| 航空保险 | 已选保险总价（无则不显示） |
| 附加服务 | 已选服务总价（无则不显示） |
| 优惠券 | 抵扣金额（无则不显示） |
| **合计** | 所有项汇总 |

---

## 结构与层次

```
.price-detail-card
├── .card-header
│   ├── .card-title（价格明细）
│   └── .collapse-btn（展开/收起）
├── .price-rows（collapse 区域）
│   ├── .price-row（机票票价）
│   ├── .price-row（机建燃油）
│   ├── .price-row（航空保险）
│   ├── .price-row（附加服务）
│   └── .price-row.discount（优惠券）
├── .divider
└── .total-row（合计）
```

---

## 变更记录

| 日期 | 说明 |
|------|------|
| 2026-04-13 | 初版。 |
