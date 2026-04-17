# 协议信息（`flight-booking-agreement`）

## 元信息

- **模块 slug**：`flight-booking-agreement`
- **所属页**：`vertical.flight.booking`
- **示例**：[`example.html`](example.html)
- **依赖**：[`foundations/design-foundations.md`](../../../../../../foundations/design-foundations.md)、平台 `radio-checkbox` 组件
- **最后同步**：2026-04-13

---

## 用途

机票下单页 **协议与须知区**，包含购票须知、退改签规则、隐私协议等法律文本的勾选确认。用户必须勾选后才能提交订单。

---

## 规格摘要

| 区块 | 要点 |
|------|------|
| 容器 `.agreement-section` | 无背景（透明），内边距 **0 24px** |
| 勾选行 | checkbox **28×28** + 文案 **22px/400 var(--color-lightgray)** |
| 协议链接 | **22px/400 var(--color-indigo-1)**，如「《购票须知》」「《退改签规则》」「《隐私政策》」 |
| 未勾选提交 | checkbox 边框变 **var(--color-warning-1)** + 抖动动画 |

---

## 结构与层次

```
.agreement-section
├── .agreement-checkbox（checkbox）
└── .agreement-text
    ├── 「我已阅读并同意」
    ├── .agreement-link（《购票须知》）
    ├── .agreement-link（《退改签规则》）
    └── .agreement-link（《隐私政策》）
```

---

## 变更记录

| 日期 | 说明 |
|------|------|
| 2026-04-13 | 初版。 |
