# 机票列表 — manifest（`vertical.flight.list`）

## 元信息

- **page_id**：`vertical.flight.list`  
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
components/platform/widgets/filter-tag/spec.md
```

### 本页模块（`modules/`，顺序同 [`page-frame.md`](page-frame.md)）

```text
pages/vertical/flight/list/modules/flight-list-header/spec.md
pages/vertical/flight/list/modules/flight-list-date-bar/spec.md
pages/vertical/flight/list/modules/flight-list-promo-bar/spec.md
pages/vertical/flight/list/modules/flight-list-sort-tabs/spec.md
pages/vertical/flight/list/modules/flight-list-flight-card/spec.md
pages/vertical/flight/list/modules/flight-list-savings-strip/spec.md
pages/vertical/flight/list/modules/flight-list-transfer-divider/spec.md
pages/vertical/flight/list/modules/flight-list-transfer-filter/spec.md
pages/vertical/flight/list/modules/flight-list-transfer-card/spec.md
pages/vertical/flight/list/modules/flight-list-mind-module/spec.md
pages/vertical/flight/list/modules/flight-list-footer-bar/spec.md
```

---

## 备注

- **快筛栏** slug 仍为 `flight-list-sort-tabs`，语义对应供稿「快筛栏」；与 OTA / 其他页的「排序 Tab」勿混用。  
- **直飞 / 中转卡片**：除 `example.html` 外，同目录下 `example-*.html` 为**变体预览**，编排时按业务数据择一结构。  
- **省钱推荐**：整页还原可省略；manifest 仍收录以便闭环。  
- 外部供稿包：`fliggy-design-flight-listing-skill`（`框架组件.md`、`输出组件/*`）。  

---

## 变更记录

| 日期 | 说明 |
|------|------|
| 2026-04-05 | 初版 5 模块。 |
| 2026-04-06 | 扩充为 11 模块，对齐列表页完整骨架。 |
