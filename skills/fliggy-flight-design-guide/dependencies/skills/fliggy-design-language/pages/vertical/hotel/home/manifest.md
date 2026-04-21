# 酒店首页 — manifest（`vertical.hotel.home`）

## 元信息

- **page_id**：`vertical.hotel.home`  
- **最后同步**：2026-04-06  

---

## 允许的 spec 路径（闭包）

外加 [`page-frame.md`](page-frame.md)、**`foundations/design-foundations.md`**、（配图时）**`foundations/image-library.md`**。

### 基础与平台（按需）

```text
foundations/design-foundations.md
foundations/image-library.md
components/platform/display/banner/spec.md
components/platform/navigation/tabbar/spec.md
components/platform/widgets/price/spec.md
```

### 本页模块（`modules/`，顺序同 [`page-frame.md`](page-frame.md)）

```text
pages/vertical/hotel/home/modules/hotel-home-banner/spec.md
pages/vertical/hotel/home/modules/hotel-home-search/spec.md
pages/vertical/hotel/home/modules/hotel-home-inspiration/spec.md
pages/vertical/hotel/home/modules/hotel-home-promo-row/spec.md
pages/vertical/hotel/home/modules/hotel-home-hotel-card/spec.md
pages/vertical/hotel/home/modules/hotel-home-tabbar/spec.md
```

---

## 备注

- **促销三卡** 两种 SKU 排布：`hotel-home-promo-row/example.html`（左大 APNG 品牌闪促）与 **`example-layout-b.html`**（左小「品牌闪促」+ 中大「特价酒店」底图）。  
- **Tabbar** 为酒店频道内底栏；全局 **`tabs.*`** 见各 Tab 的 `manifest.md`。  

---

## 变更记录

| 日期 | 说明 |
|------|------|
| 2026-04-06 | 初版。 |
