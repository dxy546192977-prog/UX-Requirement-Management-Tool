# 酒店下单 — manifest（`vertical.hotel.booking`）

## 元信息

- **page_id**：`vertical.hotel.booking`  
- **最后同步**：2026-04-06  

---

## 允许的 spec 路径（闭包）

外加 [`page-frame.md`](page-frame.md)、[design-framework-components.md](design-framework-components.md)、**`foundations/design-foundations.md`**、（配图时）**`foundations/image-library.md`**。

### 基础（按需）

```text
foundations/design-foundations.md
foundations/image-library.md
components/platform/widgets/price/spec.md
```

### 本页模块（切片；整页仍以 `example-full.html` 为准）

```text
pages/vertical/hotel/booking/modules/hotel-booking-info-card/spec.md
pages/vertical/hotel/booking/modules/hotel-booking-notice-card/spec.md
pages/vertical/hotel/booking/modules/hotel-booking-checkin-card/spec.md
pages/vertical/hotel/booking/modules/hotel-booking-challenge-task-card/spec.md
pages/vertical/hotel/booking/modules/hotel-booking-savings-card/spec.md
pages/vertical/hotel/booking/modules/hotel-booking-payment-selector/spec.md
pages/vertical/hotel/booking/modules/hotel-booking-invoice-card/spec.md
pages/vertical/hotel/booking/modules/hotel-booking-protection-card/spec.md
pages/vertical/hotel/booking/modules/hotel-booking-agreement-section/spec.md
pages/vertical/hotel/booking/modules/hotel-booking-bottom-pay-bar/spec.md
```

---

## 备注

- **会员权益整图、无痕预订、预订提示与入住卡视觉衔接**等仅在 [`example-full.html`](example-full.html) 中完整呈现；编排时以整页为真相源，模块用于局部复用与预览。  
- **静态资源**：[`assets/`](assets/)。  

---

## 变更记录

| 日期 | 说明 |
|------|------|
| 2026-04-06 | 初版。 |
