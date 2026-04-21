# 火车 OTA — manifest（`vertical.train.ota`）

## 元信息

- **page_id**：`vertical.train.ota`  
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
```

### 本页模块（`modules/`，顺序同 [`page-frame.md`](page-frame.md)）

```text
pages/vertical/train/ota/modules/train-ota-title/spec.md
pages/vertical/train/ota/modules/train-ota-itinerary/spec.md
pages/vertical/train/ota/modules/train-ota-promo-bar/spec.md
pages/vertical/train/ota/modules/train-ota-seat-section/spec.md
pages/vertical/train/ota/modules/train-ota-quote-section/spec.md
pages/vertical/train/ota/modules/train-ota-watermark/spec.md
```

---

## 备注

- **title** 与火车票首页顶栏类似，但中为**日期选择器**，图标为 **#0F131A** 黑标、**无**毛玻璃。  
- **水印**与 [`train-home-watermark`](../../home/modules/train-home-watermark/spec.md) 同一张切图；OTA 示例可为 **750 宽**整图平铺。  

---

## 变更记录

| 日期 | 说明 |
|------|------|
| 2026-04-06 | 初版。 |
