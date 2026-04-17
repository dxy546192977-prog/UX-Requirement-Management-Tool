# 机票下单页 — manifest（`vertical.flight.booking`）

## 元信息

- **page_id**：`vertical.flight.booking`
- **最后同步**：2026-04-13

---

## 允许的 spec 路径（闭包）

外加 [`page-frame.md`](page-frame.md)、**`foundations/design-foundations.md`**、（配图时）**`foundations/image-library.md`**。

### 基础与平台（按需）

```text
foundations/design-foundations.md
foundations/image-library.md
components/platform/widgets/price/spec.md
components/platform/navigation/navbar/spec.md
components/platform/widgets/radio-checkbox/spec.md
components/platform/widgets/number-picker/spec.md
components/platform/feedback/notice-bar/spec.md
components/platform/feedback/sheet/spec.md
components/platform/selection/coupon-selector/spec.md
components/platform/tags/tag-service/spec.md
components/platform/tags/tag-discount/spec.md
components/platform/buttons/button/spec.md
components/platform/buttons/collapse/spec.md
```

### 本页模块（`modules/`，顺序同 [`page-frame.md`](page-frame.md)）

```text
pages/vertical/flight/booking/modules/flight-booking-flight-info/spec.md
pages/vertical/flight/booking/modules/flight-booking-passenger/spec.md
pages/vertical/flight/booking/modules/flight-booking-contact/spec.md
pages/vertical/flight/booking/modules/flight-booking-insurance/spec.md
pages/vertical/flight/booking/modules/flight-booking-addon/spec.md
pages/vertical/flight/booking/modules/flight-booking-coupon/spec.md
pages/vertical/flight/booking/modules/flight-booking-price-detail/spec.md
pages/vertical/flight/booking/modules/flight-booking-agreement/spec.md
pages/vertical/flight/booking/modules/flight-booking-bottom-pay-bar/spec.md
```

---

## 备注

- **航班信息卡** 含航程时间轴（出发-到达-飞行时长）、航司 logo、机型、舱等、行李额、退改签政策摘要。
- **乘机人模块** 支持多乘客（成人/儿童/婴儿），每人含姓名、证件、生日等表单。
- **附加服务** 含选座、餐食、行李额加购、贵宾休息室等可选项。
- **底部支付栏** 为 fixed 定位，含总价明细展开 + 「去支付」主按钮。

---

## 变更记录

| 日期 | 说明 |
|------|------|
| 2026-04-13 | 初版。 |
