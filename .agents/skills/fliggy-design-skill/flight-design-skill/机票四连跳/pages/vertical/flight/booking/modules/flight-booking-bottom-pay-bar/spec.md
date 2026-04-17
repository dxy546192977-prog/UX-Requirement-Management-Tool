# 底部支付栏（`flight-booking-bottom-pay-bar`）

## 元信息

- **模块 slug**：`flight-booking-bottom-pay-bar`
- **所属页**：`vertical.flight.booking`
- **示例**：[`example.html`](example.html)
- **依赖**：[`foundations/design-foundations.md`](../../../../../../foundations/design-foundations.md)、平台 `button` + `price` 组件
- **最后同步**：2026-04-13

---

## 用途

机票下单页 **底部固定支付栏**，展示订单总价（可展开明细）+ 「去支付」主操作按钮。始终固定在页面底部。

---

## 规格摘要

| 区块 | 要点 |
|------|------|
| 容器 `.pay-bar` | `position: fixed; bottom: 0`；**750×140**；白底 `var(--color-white)` + 顶部 **1px var(--color-bg)** 阴影 |
| 左侧价格区 | 「合计」**24px/400 var(--color-midgray)** + 总价 **Fliggy Sans 102 42px/bold var(--color-pay-1)** |
| 明细展开 | 总价下方「明细 ∧」**22px/400 var(--color-indigo-1)**；点击展开价格明细浮层 |
| 右侧按钮 | 「去支付」胶囊按钮；**var(--color-pay-1)** 底 + **var(--color-white)** 字；高 **84px**，宽 **240px**，圆角 **42px**；**32px/500** |
| 安全区 | 底部 `padding-bottom: env(safe-area-inset-bottom)` |

---

## 结构与层次

```
.pay-bar
├── .pay-bar-left
│   ├── .pay-label（合计）
│   ├── .pay-total（¥ + 总价）
│   └── .pay-detail-toggle（明细 ∧）
└── .pay-bar-right
    └── .pay-btn（去支付）
```

---

## 状态与变体

| 状态 | 说明 |
|------|------|
| **默认** | 显示总价 + 去支付按钮 |
| **明细展开** | 上方弹出价格明细浮层，箭头翻转 |
| **协议未勾选** | 去支付按钮禁用态：`opacity: 0.5` + 不可点击 |
| **提交中** | 按钮文案变为「提交中...」+ loading 动画 |

---

## 变更记录

| 日期 | 说明 |
|------|------|
| 2026-04-13 | 初版。 |
