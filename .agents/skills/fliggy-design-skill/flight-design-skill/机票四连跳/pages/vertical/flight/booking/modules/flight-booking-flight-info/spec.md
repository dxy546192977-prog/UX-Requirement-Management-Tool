# 航班信息卡（`flight-booking-flight-info`）

## 元信息

- **模块 slug**：`flight-booking-flight-info`
- **所属页**：`vertical.flight.booking`
- **示例**：[`example.html`](example.html)
- **依赖**：[`foundations/design-foundations.md`](../../../../../../foundations/design-foundations.md)、平台 `tag-service` 组件
- **最后同步**：2026-04-13

---

## 用途

机票下单页 **顶部航班信息卡**，展示所选航班的完整航程信息，包含航程时间轴、航司信息、机型、舱等、行李额、退改签政策摘要。用户在此确认航班详情后继续填写订单。

---

## 规格摘要

| 区块 | 要点 |
|------|------|
| 容器 `.flight-info-card` | 白底 `var(--color-white)`，圆角 **var(--radius-l)**，内边距 **24px** |
| 航司行 `.airline-row` | 高 **48px**；航司 logo **36×36** 圆角 **var(--radius-s)** + 航司名 **28px/500** + 机型 **22px/400 var(--color-lightgray)** |
| 航程时间轴 `.timeline` | 高 **140px**；出发时间 **Fliggy Sans 102 48px/bold**；到达时间同；中间飞行时长 **22px/400 var(--color-lightgray)** + 虚线 + 飞机图标 |
| 出发/到达信息 | 城市 **28px/500**；机场+航站楼 **22px/400 var(--color-lightgray)** |
| 舱等标签 `.cabin-tag` | `tag-service` 样式；文案如「经济舱 Y」**22px/400** |
| 行李额 `.baggage-info` | **24px/400 var(--color-midgray)**；如「免费托运 20kg · 手提 7kg」 |
| 退改摘要 `.refund-summary` | **22px/400 var(--color-lightgray)**；如「退票手续费¥50起 · 改签免费」；右侧「详情」链接 **var(--color-indigo-1)** |
| 分割线 | **1px var(--color-bg)**，各区块间 |

---

## 结构与层次

```
.flight-info-card
├── .airline-row
│   ├── .airline-logo（36×36）
│   ├── .airline-name
│   ├── .flight-number（如 CZ3101）
│   └── .aircraft-type（如 空客A320）
├── .timeline
│   ├── .timeline-depart
│   │   ├── .time（出发时间）
│   │   ├── .city（出发城市）
│   │   └── .airport（机场+航站楼）
│   ├── .timeline-line
│   │   ├── .duration（飞行时长）
│   │   └── .line-icon（飞机图标）
│   └── .timeline-arrive
│       ├── .time（到达时间）
│       ├── .city（到达城市）
│       └── .airport（机场+航站楼）
├── .divider
├── .cabin-baggage-row
│   ├── .cabin-tag（舱等标签）
│   └── .baggage-info（行李额）
├── .divider
└── .refund-summary
    ├── .refund-text
    └── .refund-detail-link
```

---

## 状态与变体

| 变体 | 说明 |
|------|------|
| **直飞** | 时间轴中间无经停标记 |
| **经停** | 时间轴中间增加经停城市标记 + 经停时长 |
| **往返** | 两段航程信息卡纵向排列，中间 **18px** 间距 |
| **多程** | 多段航程信息卡纵向排列 |

---

## 变更记录

| 日期 | 说明 |
|------|------|
| 2026-04-13 | 初版。 |
