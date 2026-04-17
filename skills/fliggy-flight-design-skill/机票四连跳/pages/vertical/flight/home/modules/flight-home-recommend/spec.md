# 机票首页 — 推荐航线（`flight-home-recommend`）

## 元信息

- **模块 slug**：`flight-home-recommend`
- **所属页**：`vertical.flight.home`
- **示例**：[`example.html`](example.html)
- **依赖**：[`foundations/design-foundations.md`](../../../../../../foundations/design-foundations.md)、平台 `price` 组件
- **最后同步**：2026-04-13

---

## 用途

机票首页 **推荐航线区**，包含两部分：
1. **低价日历横滑**：展示近期各日最低价，引导用户选择出行日期
2. **航线卡片双列**：展示热门/推荐航线，含目的地图片、航线信息、最低价

---

## 规格摘要

### 区域标题

| 项 | 值 |
|----|-----|
| 标题 | **36px/500 var(--color-darkgray)**，如「低价航线推荐」 |
| 副标题 | **24px/400 var(--color-lightgray)**，如「为你精选特惠航线」 |
| 间距 | 标题距卡片区 **18px** |

### 低价日历横滑 `.price-calendar`

| 项 | 值 |
|----|-----|
| 容器 | 宽 **702**，高 **100px**，横滑 `overflow-x: auto` |
| 日期项 `.calendar-item` | 宽 **96px**，高 **80px**，圆角 **var(--radius-m)** |
| 日期 | **26px/500 var(--color-darkgray)**，如「4月15日」 |
| 星期 | **20px/400 var(--color-lightgray)**，如「周二」 |
| 价格 | **Fliggy Sans 102 24px/bold var(--color-pay-1)**，如「¥299」 |
| 选中态 | 底色 `var(--color-brand-4)`，文字不变 |
| 间距 | 项间 **8px** |

### 航线卡片双列 `.route-cards`

| 项 | 值 |
|----|-----|
| 布局 | `display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px` |
| 单卡 `.route-card` | 宽 **345**，圆角 **var(--radius-l)**，白底 |
| 头图 | **345×200**，`background-size: cover`，圆角顶部 **var(--radius-l)** |
| 头图标签 | 左下角 `tag-mental`（如「直飞」「红眼」），半透黑底白字 |
| 航线文案 | **28px/500 var(--color-darkgray)**，如「杭州 → 三亚」 |
| 航司信息 | **22px/400 var(--color-lightgray)**，如「南方航空 · 2h30m」 |
| 价格行 | 走 `price` 组件：整数 **Fliggy Sans 102 36px/bold var(--color-pay-1)**；「起」**22px/400 var(--color-lightgray)** |
| 内边距 | 文案区 **18px** |

---

## 结构与层次

```
.flight-recommend
├── .section-header
│   ├── .section-title
│   └── .section-subtitle
├── .price-calendar（低价日历横滑）
│   ├── .calendar-item（日期+价格）× N
├── .route-cards（双列航线卡片）
│   ├── .route-card
│   │   ├── .route-card-image（头图 + 标签）
│   │   ├── .route-card-route（航线文案）
│   │   ├── .route-card-airline（航司信息）
│   │   └── .route-card-price（价格）
│   ├── .route-card × N
```

---

## 状态与变体

| 变体 | 说明 |
|------|------|
| **有低价日历** | 日历 + 双列卡片完整展示 |
| **无低价日历** | 仅双列卡片，日历区隐藏 |
| **加载中** | 卡片区显示 skeleton 占位（灰色圆角块） |
| **无数据** | 显示空态提示「暂无推荐航线」 |

---

## 交互

- 点击日历项 → 选中态切换，下方卡片刷新为该日航线
- 点击航线卡片 → 跳转机票列表页（预填 OD + 日期）
- 双列卡片支持下拉加载更多

---

## 变更记录

| 日期 | 说明 |
|------|------|
| 2026-04-13 | 初版。 |
