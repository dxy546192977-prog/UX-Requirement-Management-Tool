# 机票首页 — manifest（`vertical.flight.home`）

## 元信息

- **page_id**：`vertical.flight.home`  
- **最后同步**：2026-04-05  

---

## 允许的 spec 路径（闭包）

外加 [`page-frame.md`](page-frame.md)、**`foundations/design-foundations.md`**、（配图时）**`foundations/image-library.md`**。

### 基础与平台（按需）

```text
foundations/design-foundations.md
foundations/image-library.md
components/platform/navigation/tabbar/spec.md
components/platform/display/banner/spec.md
components/platform/widgets/price/spec.md
components/platform/widgets/carousel-bar/spec.md
```

### 本页模块（`modules/`）

```text
pages/vertical/flight/home/modules/flight-home-atmosphere/spec.md
pages/vertical/flight/home/modules/flight-home-mini-search/spec.md
pages/vertical/flight/home/modules/flight-home-kingkong/spec.md
pages/vertical/flight/home/modules/flight-home-savings/spec.md
pages/vertical/flight/home/modules/flight-home-special-fares/spec.md
pages/vertical/flight/home/modules/flight-home-activity-strip/spec.md
pages/vertical/flight/home/modules/flight-home-industry-tabbar/spec.md
```

---

## 备注

- **行业底栏**（模块 7）≠ App **主 Tabbar**；主 Tab 高亮仍由 **`tabbar`** 承载。  
- **小搜二级 Tab**：框架文案曾为「单程/往返/多程」，当前 **`example.html`** 以实现稿 **「国内/国际/港澳台」** 为准；若产品改回行程类型，只改该模块示例与 spec。  
- 数字 / 价格：**Fliggy Sans 102**（示例内使用 CDN `@font-face`，与 FDL 其他页一致）。  

---

## 变更记录

| 日期 | 说明 |
|------|------|
| 2026-04-05 | 初版骨架。 |
| 2026-04-05 | 增补活动长图、行业底栏；示例对齐供稿 UI。 |
