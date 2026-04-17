# 附加服务（`flight-booking-addon`）

## 元信息

- **模块 slug**：`flight-booking-addon`
- **所属页**：`vertical.flight.booking`
- **示例**：[`example.html`](example.html)
- **依赖**：[`foundations/design-foundations.md`](../../../../../../foundations/design-foundations.md)、平台 `radio-checkbox` + `number-picker` + `sheet` 组件
- **最后同步**：2026-04-13

---

## 用途

机票下单页 **附加服务选购区**，展示可选增值服务（选座、餐食、额外行李额、贵宾休息室等）。每项服务可展开查看详情，支持数量选择或规格选择。

---

## 规格摘要

| 区块 | 要点 |
|------|------|
| 容器 `.addon-card` | 白底 `var(--color-white)`，圆角 **var(--radius-l)**，内边距 **24px** |
| 标题行 | 「附加服务」**30px/500 var(--color-darkgray)** + 「可选」**22px/400 var(--color-lightgray)** |
| 服务项 `.addon-item` | 高 **96px**；左侧图标 **44×44** 圆角 **var(--radius-m)**；中间服务名 **28px/500** + 描述 **22px/400 var(--color-lightgray)**；右侧价格 + 「添加」按钮 |
| 添加按钮 | **var(--color-indigo-4)** 底 + **var(--color-indigo-1)** 文字，圆角 **var(--radius-s)**，**24px/500** |
| 已添加态 | 按钮变为 `number-picker`（- 数量 +） |
| 分割线 | 服务项间 **1px var(--color-bg)** |

---

## 服务清单（默认）

| 服务 | 图标语义 | 价格示例 |
|------|---------|---------|
| 选座服务 | 座位图标 | ¥30/人 |
| 机上餐食 | 餐具图标 | ¥45/份 |
| 额外行李 | 行李箱图标 | ¥120/件 |
| 贵宾休息室 | 沙发图标 | ¥99/人 |

---

## 结构与层次

```
.addon-card
├── .card-header
│   ├── .card-title（附加服务）
│   └── .card-optional（可选）
├── .addon-item
│   ├── .addon-icon（44×44）
│   ├── .addon-info
│   │   ├── .addon-name
│   │   └── .addon-desc
│   └── .addon-action
│       ├── .addon-price
│       └── .addon-add-btn / .number-picker
├── .addon-item × N
```

---

## 变更记录

| 日期 | 说明 |
|------|------|
| 2026-04-13 | 初版。 |
