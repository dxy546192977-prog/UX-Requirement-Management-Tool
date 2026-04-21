# 酒店订单详情 — manifest（`vertical.hotel.order`）

## 元信息

- **page_id**：`vertical.hotel.order`  
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

### 本页模块（切片）

```text
pages/vertical/hotel/order/modules/hotel-order-status-header/spec.md
pages/vertical/hotel/order/modules/hotel-order-price/spec.md
pages/vertical/hotel/order/modules/hotel-order-policy-hint/spec.md
pages/vertical/hotel/order/modules/hotel-order-hotel-card/spec.md
pages/vertical/hotel/order/modules/hotel-order-room-date/spec.md
pages/vertical/hotel/order/modules/hotel-order-guest-info/spec.md
pages/vertical/hotel/order/modules/hotel-order-member-benefits/spec.md
pages/vertical/hotel/order/modules/hotel-order-info/spec.md
pages/vertical/hotel/order/modules/hotel-order-faq-tags/spec.md
pages/vertical/hotel/order/modules/hotel-order-cross-sell/spec.md
pages/vertical/hotel/order/modules/hotel-order-bottom-actions/spec.md
```

---

## 备注

- **价格 + 政策**在整页中为 **同一通栏卡片**；模块仍分 `hotel-order-price` / `hotel-order-policy-hint` 供拆分预览。  
- **入住人**在整页中位于房型日期块内；独立预览见 `hotel-order-guest-info`。  
- **整页串联**：[`example-full.html`](example-full.html)。  

---

## 变更记录

| 日期 | 说明 |
|------|------|
| 2026-04-06 | 初版。 |
