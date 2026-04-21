# 酒店首页框架（`vertical.hotel.home`）

## 元信息

- **page_id**：`vertical.hotel.home`  
- **设计基准**：**750px 宽（@2x）**；`viewport` **`width=750, user-scalable=no`**  
- **依赖**：[`foundations/design-foundations.md`](../../../../foundations/design-foundations.md)  
- **最后同步**：2026-04-06  

---

## 布局结构（自上而下）

1. **营销 Banner** — `hotel-home-banner`（**750×332**，背景图 + 状态栏 + 毛玻璃导航按钮）  
2. **酒店搜索** — `hotel-home-search`（圆角白卡：四 Tab + 表单 + 热搜 + 黄钮 + 保障条）  
3. **可滚动主体**（与 Banner/搜索叠压关系以实现稿为准）：  
   - **当季热门灵感** — `hotel-home-inspiration`（横滑卡片）  
   - **快捷促销三卡** — `hotel-home-promo-row`（两种排布见 `example.html` / `example-layout-b.html`）  
   - **酒店推荐 / 猜你喜欢** — `hotel-home-hotel-card`（双列时每格 **348** 宽 + **8px** 左边距等，以示例为准）  
4. **底部悬浮栏** — `hotel-home-tabbar`（**750×145**，五入口：**推荐**高亮黄圆 + 收藏/套餐/权益/订单）  

> **说明**：本页底栏为 **酒店频道内** 导航，**非** App 全局 `tabs.*` 五大 Tab。

---

## Token（摘录）

- 主色文字 `#0F131A`，次要 `#919499` / `#5C5F66`  
- 搜索主按钮 `#FFE033`  
- 推荐位品牌色圆 `#FFE033`  
- 价格强调 `#FF5533`，评分 `#6666FF`  

数字体：示例中日期等使用 **Fliggy Sans 102**（CDN）；Banner 状态栏时间为 **SF Pro Text**（`local('San Francisco')` 降级）。

---

## 产出

- [`manifest.md`](manifest.md)  
- 各模块 `spec.md` + `example.html`（促销行另有 **`example-layout-b.html`**）  
- [`example-full.html`](example-full.html) 整页串联（可选本地预览）  

---

## 变更记录

| 日期 | 说明 |
|------|------|
| 2026-04-06 | 初版，对齐酒店首页供稿。 |
