# 门票·玩乐频道页框架（`vertical.vacation.ticket`）

## 元信息

- **page_id**：`vertical.vacation.ticket`  
- **设计基准**：**750 × 1624px（@2x）**；整页预览 `viewport` 建议 **`width=750, user-scalable=no`**  
- **页面背景**：`#F2F3F5`  
- **依赖**：[`foundations/design-foundations.md`](../../../../foundations/design-foundations.md)；**详细 Token / 间距 / 骨架 YAML** 见 [design-framework-components.md](design-framework-components.md)  

---

## 布局结构（自上而下）

1. **Banner 区** — `ticket-channel-banner`（**750 × 359**，可上移滚出视口）  
2. **沉浸式吸顶导航** — `ticket-channel-sticky-nav`（**176px**：状态栏 88 + 导航 88；叠在 Banner 上，滚动后白底+标题浮现）  
3. **滚动主内容**（搜索及以下随页面滚动）：  
   - **搜索框** — `ticket-channel-search`（左右 18、距导航底 **50**、距推荐区 **18**）  
   - **推荐卡片区** — `ticket-channel-recommend`（左右 18，距类目快筛 **18**）  
   - **类目快筛** — `ticket-channel-category`（白底，`24px 24px 0 0` 顶圆角）  
   - **下拉筛选** — `ticket-channel-dropdown-filter`（与上、与下间距 **0**）  
   - **快筛** — `ticket-channel-quick-filter`（与上、与下间距 **0**）  
   - **POI 列表** — `ticket-channel-poi-card`（可多段重复；与快筛间距 **0**，白底连续）  

> **硬规则**：类目快筛、下拉筛选、快筛、POI 卡四段之间 **垂直间距必须为 0**；搜索/推荐与上下段的间距以 `design-framework-components.md` 为准。

---

## 产出

- [`manifest.md`](manifest.md)  
- [`design-framework-components.md`](design-framework-components.md)（Skill 级完整规范）  
- 各模块 `spec.md` + `example.html`  
- [`example-full.html`](example-full.html) 整页串联  

---

## 变更记录

| 日期 | 说明 |
|------|------|
| 2026-04-06 | 初版，对齐门票·玩乐频道供稿与框架说明。 |
