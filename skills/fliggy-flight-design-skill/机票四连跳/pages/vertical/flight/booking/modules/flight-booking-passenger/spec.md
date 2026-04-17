# 乘机人信息（`flight-booking-passenger`）

## 元信息

- **模块 slug**：`flight-booking-passenger`
- **所属页**：`vertical.flight.booking`
- **示例**：[`example.html`](example.html)
- **依赖**：[`foundations/design-foundations.md`](../../../../../../foundations/design-foundations.md)、平台 `button` + `collapse` 组件
- **最后同步**：2026-04-13

---

## 用途

机票下单页 **乘机人信息表单**，支持多乘客（成人/儿童/婴儿）。每位乘客含姓名、证件类型、证件号、出生日期等必填项，以及常旅客号等选填项。

---

## 规格摘要

| 区块 | 要点 |
|------|------|
| 容器 `.passenger-card` | 白底 `var(--color-white)`，圆角 **var(--radius-l)**，内边距 **24px** |
| 标题行 | 「乘机人信息」**30px/500 var(--color-darkgray)** + 右侧「添加乘客」按钮 **24px/500 var(--color-indigo-1)** |
| 乘客项 `.pax-item` | 上方标签「成人1」**22px/400 var(--color-lightgray)** |
| 表单行 `.form-row` | 高 **88px**；左侧 label **28px/400 var(--color-midgray)** 宽 **160px**；右侧 input **28px/400 var(--color-darkgray)** |
| 占位文案 | **28px/400 var(--color-auxiliary)** |
| 证件类型选择 | 右侧箭头 **24×24 var(--color-lightgray)**；点击唤起 `sheet` 半屏 |
| 分割线 | 表单行间 **1px var(--color-bg)**，左缩进 **160px** |
| 多乘客分隔 | 乘客间 **18px** 间距 + **1px var(--color-bg)** 全宽分割线 |
| 添加乘客按钮 | 底部虚线框 **88px**，`var(--color-indigo-4)` 底 + `var(--color-indigo-1)` 虚线边框 + 「+ 添加乘客」文案 |

---

## 结构与层次

```
.passenger-card
├── .card-header
│   ├── .card-title（乘机人信息）
│   └── .add-pax-link（添加乘客）
├── .pax-item
│   ├── .pax-label（成人1 / 儿童1 / 婴儿1）
│   ├── .form-row（姓名）
│   ├── .form-row（证件类型 — 下拉）
│   ├── .form-row（证件号码）
│   ├── .form-row（出生日期 — 日期选择）
│   └── .form-row（常旅客号 — 选填，collapse 展开）
├── .pax-item × N
└── .add-pax-btn（+ 添加乘客）
```

---

## 状态与变体

| 状态 | 说明 |
|------|------|
| **空态** | 所有 input 显示占位文案 |
| **已填写** | input 文案变为 `var(--color-darkgray)` |
| **校验错误** | input 底部显示红色提示 **22px/400 var(--color-warning-1)** |
| **儿童/婴儿** | 标签颜色区分；额外显示年龄提示 |

---

## 变更记录

| 日期 | 说明 |
|------|------|
| 2026-04-13 | 初版。 |
