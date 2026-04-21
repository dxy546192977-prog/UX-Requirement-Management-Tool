# 酒店详情 — manifest（`vertical.hotel.detail`）

## 元信息

- **page_id**：`vertical.hotel.detail`  
- **最后同步**：2026-04-06  

---

## 允许的 spec 路径（闭包）

外加 [`page-frame.md`](page-frame.md)、**`foundations/design-foundations.md`**、（配图时）**`foundations/image-library.md`**。

### 基础（按需）

```text
foundations/design-foundations.md
foundations/image-library.md
components/platform/widgets/price/spec.md
```

### 本页模块（顺序同 [`page-frame.md`](page-frame.md)）

```text
pages/vertical/hotel/detail/modules/hotel-detail-media/spec.md
pages/vertical/hotel/detail/modules/hotel-detail-info/spec.md
pages/vertical/hotel/detail/modules/hotel-detail-member-card/spec.md
pages/vertical/hotel/detail/modules/hotel-detail-filter/spec.md
pages/vertical/hotel/detail/modules/hotel-detail-sticky-rate/spec.md
pages/vertical/hotel/detail/modules/hotel-detail-rate-cards/spec.md
pages/vertical/hotel/detail/modules/hotel-detail-store/spec.md
pages/vertical/hotel/detail/modules/hotel-detail-reviews/spec.md
pages/vertical/hotel/detail/modules/hotel-detail-highlights/spec.md
pages/vertical/hotel/detail/modules/hotel-detail-facilities/spec.md
pages/vertical/hotel/detail/modules/hotel-detail-surroundings/spec.md
pages/vertical/hotel/detail/modules/hotel-detail-policy/spec.md
pages/vertical/hotel/detail/modules/hotel-detail-recommend-rooms/spec.md
pages/vertical/hotel/detail/modules/hotel-detail-recommend-list/spec.md
```

---

## 备注

- **04 筛选**：同一 `example.html` 通过 URL **`mode=regular` / `mode=sticky`** 与 **`component=`** 区分常规/吸顶与 postMessage key；编排页叠一层 fixed 承载吸顶 iframe。  
- **高度**：以 iframe + `embed-autosize.js` 为准，勿写死整页高度。  
- **本地预览**：需 **HTTP 服务**（同源 iframe 才能读 `contentDocument` 做初始高度）；仅 `file://` 时高度同步可能受限，可依赖子页 `postMessage`。  
- **整页串联**：[`example-full.html`](example-full.html)。  

---

## 变更记录

| 日期 | 说明 |
|------|------|
| 2026-04-06 | 初版。 |
