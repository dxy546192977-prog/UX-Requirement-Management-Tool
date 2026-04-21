# 酒店详情页框架（`vertical.hotel.detail`）

## 元信息

- **page_id**：`vertical.hotel.detail`  
- **设计基准**：**750px 宽**单列纵向流；组件高度随内容自适应，不锁死裁切  
- **依赖**：[`foundations/design-foundations.md`](../../../../foundations/design-foundations.md)  
- **最后同步**：2026-04-06  

---

## 整体结构（三层）

1. **主内容流**：媒体 → 信息 → 会员 → 筛选 → 置顶 Rate → Rate 卡片 → 店铺 → 评价 → 亮点 → 设施 → 周边 → 说明 → 推荐（含房型）→ 推荐列表。  
2. **04 筛选常规态**：正文一段，位于会员卡之后、置顶 Rate 之前，**不固定**。  
3. **04 筛选吸顶态**：默认不占流；常规态滑出视口后 **fixed 顶**；当 **05 置顶 Rate + 05 Rate 卡片** 整体继续上滑离开承接区间后 **消失**。  

**无** 固定顶导航、**无** 主 Tab 底栏。  

**滚动边界**：禁止顶部下拉、底部上拉越界（整页 `overscroll-behavior` + `touchmove` 拦截，见 [`example-full.html`](example-full.html)）。

---

## 组件顺序（强制，不可缺、不可调）

| # | 模块 slug | 说明 |
|---|-----------|------|
| 01 | `hotel-detail-media` | 媒体容器 |
| 02 | `hotel-detail-info` | 信息区 |
| 03 | `hotel-detail-member-card` | 二官会员卡 |
| 04 | `hotel-detail-filter` | 筛选（`mode=regular` / `mode=sticky` + `component` 区分 postMessage key） |
| 05 | `hotel-detail-sticky-rate` | 置顶 Rate |
| 05 | `hotel-detail-rate-cards` | Rate 卡片列表 |
| 06 | `hotel-detail-store` | 店铺 |
| 07 | `hotel-detail-reviews` | 评价 |
| 08 | `hotel-detail-highlights` | 酒店亮点 |
| 09 | `hotel-detail-facilities` | 酒店设施 |
| 10 | `hotel-detail-surroundings` | 酒店周边 |
| 11 | `hotel-detail-policy` | 说明 |
| 12 | `hotel-detail-recommend-rooms` | 推荐酒店（含房型） |
| 13 | `hotel-detail-recommend-list` | 推荐酒店 |

---

## 间距规则（设计稿 px，随 `--page-scale` 缩放）

| 关系 | 间距 |
|------|------|
| 01 媒体 ↔ 02 信息 | **-24**（叠压贴合） |
| 04 筛选 ↔ 05 置顶 Rate | **-6** |
| 12 推荐含房型 ↔ 13 推荐列表 | **0**（连续区块） |
| 其余相邻模块 | **18** |

---

## 技术编排（仓库内）

- 各切片为独立 **`example.html`**，供 iframe 嵌入；`embed=1` 时加载同级目录上 **`embed-autosize.js`**，通过 `postMessage` 回传高度。  
- **整页串联**：[`example-full.html`](example-full.html)（iframe + 吸顶逻辑 + 块间距）。  
- 单组件预览：直接打开对应 `modules/<slug>/example.html`。

---

## 变更记录

| 日期 | 说明 |
|------|------|
| 2026-04-06 | 初版：自供稿包迁入 14 模块 + 编排页。 |
