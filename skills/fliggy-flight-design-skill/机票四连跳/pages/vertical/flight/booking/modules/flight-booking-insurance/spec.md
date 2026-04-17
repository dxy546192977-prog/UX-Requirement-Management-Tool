# 航空保险（`flight-booking-insurance`）

## 元信息

- **模块 slug**：`flight-booking-insurance`
- **所属页**：`vertical.flight.booking`
- **示例**：[`example.html`](example.html)
- **依赖**：[`foundations/design-foundations.md`](../../../../../../foundations/design-foundations.md)、平台 `radio-checkbox` + `tag-discount` 组件
- **最后同步**：2026-04-13

---

## 用途

机票下单页 **航空保险选购区**，展示可选保险产品（延误险、取消险、意外险等），支持单选/多选。每个保险项含保障内容摘要、价格、推荐标签。

---

## 规格摘要

| 区块 | 要点 |
|------|------|
| 容器 `.insurance-card` | 白底 `var(--color-white)`，圆角 **var(--radius-l)**，内边距 **24px** |
| 标题行 | 「航空保险」**30px/500 var(--color-darkgray)** + 「可选」**22px/400 var(--color-lightgray)** |
| 保险项 `.insurance-item` | 高 **120px**；左侧 checkbox **28×28**；中间保险名 **28px/500** + 保障摘要 **22px/400 var(--color-lightgray)**；右侧价格 **Fliggy Sans 102 28px/bold var(--color-pay-1)** |
| 推荐标签 | 保险名右侧 `tag-discount` 样式，如「推荐」「热销」 |
| 不购买选项 | 底部「不购买保险」**28px/400 var(--color-midgray)** + radio |
| 查看详情 | 「查看保障详情 >」**22px/400 var(--color-indigo-1)** |

---

## 结构与层次

```
.insurance-card
├── .card-header
│   ├── .card-title（航空保险）
│   └── .card-optional（可选）
├── .insurance-item
│   ├── .checkbox
│   ├── .insurance-info
│   │   ├── .insurance-name + .recommend-tag
│   │   └── .insurance-desc（保障摘要）
│   └── .insurance-price
├── .insurance-item × N
├── .no-insurance（不购买保险 + radio）
└── .insurance-detail-link（查看保障详情）
```

---

## 状态与变体

| 状态 | 说明 |
|------|------|
| **未选** | checkbox 空心描边 `var(--color-auxiliary)` |
| **已选** | checkbox 实心 `var(--color-brand-1)` + 勾 |
| **不购买** | radio 选中，所有保险项 checkbox 禁用灰色 |

---

## 变更记录

| 日期 | 说明 |
|------|------|
| 2026-04-13 | 初版。 |
