# 机票首页 — 页面框架（`vertical.flight.home`）

## 元信息

- **page_id**：`vertical.flight.home`  
- **设计基准**：**750 × 1624px（@2x）**；`viewport` **`width=750, user-scalable=no`**  
- **依赖**：[`foundations/design-foundations.md`](../../../../foundations/design-foundations.md)  
- **最后同步**：2026-04-05  

---

## 固定组成（自上而下）

1. **首屏氛围（沉浸式导航栏）** — `flight-home-atmosphere`  
2. **小搜模块（核心搜索）** — `flight-home-mini-search`（与氛围在 **hero** 内纵向叠放，见下）  
3. **小金刚** — `flight-home-kingkong`  
4. **省钱模块** — `flight-home-savings`  
5. **特价机票** — `flight-home-special-fares`  
6. **活动长图** — `flight-home-activity-strip`（两张图 + 间距）  
7. **行业底栏**（值机/收藏/发票/动态/订单）— `flight-home-industry-tabbar`  

> **说明**：此处 **第 7 项** 为 **机票首页内** 的 **5 入口快捷底栏**（与 App **主 Tabbar** 五 Tab 不同）；主 Tabbar 仍引用平台 **`tabbar`** spec（若整页嵌在 App 内）。

---

## 整页骨架（逻辑结构）

- **`.page`**：`width: 750px`，`min-height: 100vh`，背景 **`#f2f3f5`**，`padding-bottom` 预留 **行业底栏高度（约 150px）+ 安全区**。  
- **`.hero`**：`position: relative`，`padding-top` 约 **225px**（使小搜与氛围底部渐变衔接；数值以实现稿为准）。  
  - **氛围**：`position: absolute; left:0; top:0; width:750px; height:310px; z-index` 高于背景、低于或与导航同级按稿。  
  - **小搜**：紧随 hero 流内布局，白底卡片与一级 Tab 毛玻璃区衔接。  
- **`.sidebar-section`**：`width: 702px`，`margin: 24px auto 0`，`display: flex; flex-direction: column; gap: 18px`（模块 3～6）。  
- **行业底栏**：`position: fixed; bottom: 0; left: 50%; transform: translateX(-50%); width: 750px; z-index: 1000`（与供稿一致）。

---

## 与各模块 spec 的关系

尺寸、CDN、交互细节以各 **`modules/<slug>/spec.md`** 与 **`example.html`** 为准；本文件只定 **整页拼装顺序与滚动/吸底关系**。

---

## 变更记录

| 日期 | 说明 |
|------|------|
| 2026-04-05 | 骨架版。 |
| 2026-04-05 | 对齐供稿《机票首页-框架组件》与 hero/sidebar 模板。 |
