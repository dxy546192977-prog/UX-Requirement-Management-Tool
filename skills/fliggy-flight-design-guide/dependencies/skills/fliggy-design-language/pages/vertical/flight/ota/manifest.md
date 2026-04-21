# 机票 OTA — manifest（`vertical.flight.ota`）

## 元信息

- **page_id**：`vertical.flight.ota`  
- **最后同步**：2026-04-06  

---

## 允许的 spec 路径（闭包）

外加 [`page-frame.md`](page-frame.md)、**`foundations/design-foundations.md`**、（配图时）**`foundations/image-library.md`**。

### 基础与平台（按需）

```text
foundations/design-foundations.md
foundations/image-library.md
components/platform/navigation/navbar/spec.md
components/platform/widgets/price/spec.md
components/platform/display/banner/spec.md
```

### 本页模块（`modules/`，顺序同 [`page-frame.md`](page-frame.md) 滚动区装配）

```text
pages/vertical/flight/ota/modules/flight-ota-header/spec.md
pages/vertical/flight/ota/modules/flight-ota-itinerary/spec.md
pages/vertical/flight/ota/modules/flight-ota-shutter-strip/spec.md
pages/vertical/flight/ota/modules/flight-ota-promo-bar/spec.md
pages/vertical/flight/ota/modules/flight-ota-cabin-section/spec.md
pages/vertical/flight/ota/modules/flight-ota-price-section/spec.md
pages/vertical/flight/ota/modules/flight-ota-watermark/spec.md
```

---

## 备注

- **`flight-ota-cabin-section`**：本页语义为供稿 **otatab**（商品模块顶三列舱位切换），非旧版「舱位列表行」抽象。  
- **`flight-ota-price-section`**：供稿 **商品卡** 四变体 + **`example-more-quotes.html`**（更多报价入口）。  
- **`flight-ota-watermark`**：slug 保留；内容为 **心智模块（飞猪安心票）**，非仅角标水印。  
- **整页串联**：[`example-full.html`](example-full.html)。  
- 外部供稿包：`fliggy-design-flight-ota-skill`。  

---

## 变更记录

| 日期 | 说明 |
|------|------|
| 2026-04-05 | 初版 6 模块。 |
| 2026-04-06 | 增加 `flight-ota-shutter-strip`；对齐 OTA 框架与 skill 输出组件。 |
