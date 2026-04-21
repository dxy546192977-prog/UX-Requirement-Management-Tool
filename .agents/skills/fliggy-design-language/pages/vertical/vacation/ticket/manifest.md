# 门票·玩乐频道 — manifest（`vertical.vacation.ticket`）

## 元信息

- **page_id**：`vertical.vacation.ticket`  
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
pages/vertical/vacation/ticket/modules/ticket-channel-banner/spec.md
pages/vertical/vacation/ticket/modules/ticket-channel-sticky-nav/spec.md
pages/vertical/vacation/ticket/modules/ticket-channel-search/spec.md
pages/vertical/vacation/ticket/modules/ticket-channel-recommend/spec.md
pages/vertical/vacation/ticket/modules/ticket-channel-category/spec.md
pages/vertical/vacation/ticket/modules/ticket-channel-dropdown-filter/spec.md
pages/vertical/vacation/ticket/modules/ticket-channel-quick-filter/spec.md
pages/vertical/vacation/ticket/modules/ticket-channel-poi-card/spec.md
```

---

## 备注

- **整页串联**：[`example-full.html`](example-full.html)（导航 `position: fixed` 叠 Banner，滚动后变色）。  
- **配图**：Banner / 推荐 / POI 示例可用外链占位图，落地项目替换为 CDN 或 `assets/`。  

---

## 变更记录

| 日期 | 说明 |
|------|------|
| 2026-04-06 | 初版。 |
