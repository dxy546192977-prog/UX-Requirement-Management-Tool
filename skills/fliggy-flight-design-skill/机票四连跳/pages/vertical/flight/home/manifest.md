# 机票首页 — manifest（`vertical.flight.home`）

## 元信息

- **page_id**：`vertical.flight.home`
- **最后同步**：2026-04-13

---

## 允许的 spec 路径（闭包）

外加 [`page-frame.md`](page-frame.md)、**`foundations/design-foundations.md`**、（配图时）**`foundations/image-library.md`**。

### 基础与平台（按需）

```text
foundations/design-foundations.md
foundations/image-library.md
components/platform/navigation/navbar/spec.md
components/platform/navigation/tabbar/spec.md
components/platform/widgets/price/spec.md
components/platform/selection/time-picker/spec.md
components/platform/selection/destination-picker/spec.md
components/platform/feedback/notice-bar/spec.md
components/platform/display/banner/spec.md
components/platform/widgets/carousel-bar/spec.md
```

### 本页模块（`modules/`，顺序同 [`page-frame.md`](page-frame.md)）

```text
pages/vertical/flight/home/modules/flight-home-search/spec.md
pages/vertical/flight/home/modules/flight-home-kingkong/spec.md
pages/vertical/flight/home/modules/flight-home-notice/spec.md
pages/vertical/flight/home/modules/flight-home-promo/spec.md
pages/vertical/flight/home/modules/flight-home-recommend/spec.md
pages/vertical/flight/home/modules/flight-home-bottom-bar/spec.md
```

---

## 备注

- **搜索模块** 含一级品类 Tab（机票选中 / 火车票 / 汽车票 / 租车）+ 二级单程/往返/多程 + OD 表单 + 日期 + 乘客舱等 + 黄色搜索按钮。
- **金刚区** 为 2×4 或 2×5 图标入口（特价机票 / 国际机票 / 航班动态 / 退改签 / 值机选座 / 接送机 / 延误险 / 更多）。
- **推荐航线** 含低价日历横滑 + 航线卡片双列，价格走 `price` 组件 token。
- **底栏** 为机票频道内底栏（推荐/我的行程/航班动态/客服/更多），**非** App 全局 `tabs.*` 五大 Tab。

---

## 变更记录

| 日期 | 说明 |
|------|------|
| 2026-04-13 | 初版。 |
