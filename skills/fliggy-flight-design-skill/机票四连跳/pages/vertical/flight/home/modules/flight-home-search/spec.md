# 机票首页 — 搜索模块（`flight-home-search`）

## 元信息

- **模块 slug**：`flight-home-search`
- **所属页**：`vertical.flight.home`
- **示例**：[`example.html`](example.html)
- **依赖**：[`foundations/design-foundations.md`](../../../../../../foundations/design-foundations.md)
- **最后同步**：2026-04-13

---

## 用途

机票首页 **核心搜索区**：一级品类 Tab（**机票选中** / 火车票 / 汽车票 / 租车）+ 二级 **单程 / 往返 / 多程** + 白底搜索卡（出发地-目的地 OD、日期、乘客与舱等、黄色搜索按钮）+ 底部历史搜索。

---

## 规格摘要

| 区块 | 要点 |
|------|------|
| 整体 `.flight-search-module` | **702×680**（品类 Tab 区 + 搜索卡体），白底，圆角 **var(--radius-l)** |
| 一级 Tab `.category-tabs` | 毛玻璃顶；选中态白底 + 黄色下划线 **46×6**；文案 **28px/500**，选中 `var(--color-darkgray)`，未选 `var(--color-lightgray)` |
| 二级 Tab `.trip-type-tabs` | **702×80**；文案 **单程/往返/多程**；选中 **30px/500** + 下划线 **46×6 var(--color-brand-1)**；未选 **28px/400 var(--color-midgray)** |
| OD 行 `.od-row` | 高 **120px**；城市名 **42px/500 var(--color-darkgray)**；三字码 **22px/400 var(--color-lightgray)**；换向按钮 **68×68** 居中旋转图标 |
| 日期行 `.date-row` | 高 **100px**；日期数字 **Fliggy Sans 102 48px/bold**；月日 **26px/400 PingFang**；星期 **22px/400 var(--color-lightgray)** |
| 乘客舱等行 `.pax-cabin-row` | 高 **80px**；文案 **28px/400 var(--color-midgray)**；右侧箭头 **24×24** |
| 搜索按钮 `.search-btn` | **var(--color-brand-1)** 底，高 **84px**，圆角 **42px**；文案「搜索机票」**32px/500 var(--color-darkgray)** |
| 历史搜索 `.search-history` | **22px/400 var(--color-lightgray)**；最多展示 3 条 |

---

## 结构与层次

```
.flight-search-module
├── .category-tabs（一级品类 Tab）
│   ├── .tab-item（机票 ✓）
│   ├── .tab-item（火车票）
│   ├── .tab-item（汽车票）
│   └── .tab-item（租车）
├── .trip-type-tabs（二级行程类型）
│   ├── .tab-item（单程 ✓）
│   ├── .tab-item（往返）
│   └── .tab-item（多程）
├── .search-form
│   ├── .od-row（出发地 ↔ 目的地）
│   │   ├── .city-block.departure
│   │   ├── .swap-btn
│   │   └── .city-block.arrival
│   ├── .date-row（出发日期 / 返程日期）
│   │   ├── .date-block.depart
│   │   └── .date-block.return（往返时显示）
│   └── .pax-cabin-row（乘客数 + 舱等）
├── .search-btn
└── .search-history
```

---

## 状态与变体

| 状态 | 说明 |
|------|------|
| **单程** | 默认态；日期行仅显示出发日期 |
| **往返** | 日期行显示出发+返程两个日期块，中间分割线 |
| **多程** | 表单切换为多段 OD 输入（最多 3 段），每段含独立 OD + 日期 |
| **已选城市** | 城市名黑色 42px；未选时显示占位文案「出发城市」灰色 |

---

## 交互

- 点击 OD 城市 → 唤起 `destination-picker` 半屏
- 点击日期 → 唤起 `time-picker` 日历半屏
- 点击换向按钮 → OD 互换，按钮旋转 180° 动画（0.3s ease）
- 点击搜索按钮 → 跳转机票列表页
- 点击历史条目 → 自动填充 OD + 日期并搜索

---

## 变更记录

| 日期 | 说明 |
|------|------|
| 2026-04-13 | 初版。 |
