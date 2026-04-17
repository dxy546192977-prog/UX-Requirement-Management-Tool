# 联系人信息（`flight-booking-contact`）

## 元信息

- **模块 slug**：`flight-booking-contact`
- **所属页**：`vertical.flight.booking`
- **示例**：[`example.html`](example.html)
- **依赖**：[`foundations/design-foundations.md`](../../../../../../foundations/design-foundations.md)
- **最后同步**：2026-04-13

---

## 用途

机票下单页 **联系人信息卡**，用于填写订单联系人的手机号和邮箱（用于接收行程单和航变通知）。

---

## 规格摘要

| 区块 | 要点 |
|------|------|
| 容器 `.contact-card` | 白底 `var(--color-white)`，圆角 **var(--radius-l)**，内边距 **24px** |
| 标题 | 「联系人」**30px/500 var(--color-darkgray)** |
| 手机号行 | label「手机号」**28px/400 var(--color-midgray)** + 国际区号选择 **28px/400** + 手机号 input |
| 邮箱行 | label「邮箱」**28px/400 var(--color-midgray)** + 邮箱 input |
| 提示 | 「航班变动将通过短信和邮件通知」**22px/400 var(--color-lightgray)** |

---

## 结构与层次

```
.contact-card
├── .card-title（联系人）
├── .form-row（手机号：区号选择 + input）
├── .form-row（邮箱：input）
└── .contact-hint（提示文案）
```

---

## 变更记录

| 日期 | 说明 |
|------|------|
| 2026-04-13 | 初版。 |
