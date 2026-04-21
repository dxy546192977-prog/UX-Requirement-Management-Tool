# 首页 Tab — manifest（`tabs.home`）

## 元信息

- **page_id**：`tabs.home`  
- **最后同步**：2026-04-05  

---

## 允许的 spec 路径（闭包）

生成或复核 **首页 Tab** 时，读取下列文件，外加 **`foundations/design-foundations.md`**、（含真实配图策略时）**`foundations/image-library.md`**。

**布局（非 `spec.md`，实现前必读）**

- 推荐主列：[`page-frame.md`](page-frame.md)  
- **目的地顶 Tab**：[`page-frame-destination.md`](page-frame-destination.md)  

### 基础与平台组件

```text
foundations/design-foundations.md
foundations/image-library.md
components/platform/navigation/tabbar/spec.md
components/platform/display/banner/spec.md
components/platform/widgets/carousel-bar/spec.md
components/platform/widgets/price/spec.md
```

### 本 Tab 页面模块（`modules/`）

**推荐态 / 共用顶栏**

```text
pages/tabs/home/modules/home-titlebar/spec.md
pages/tabs/home/modules/home-search/spec.md
pages/tabs/home/modules/home-kingkong/spec.md
pages/tabs/home/modules/home-multi-channel/spec.md
pages/tabs/home/modules/home-feeds/spec.md
```

**目的地顶 Tab（滚动区内）**

```text
pages/tabs/home/modules/home-destination-kingkong/spec.md
pages/tabs/home/modules/home-destination-ranking/spec.md
pages/tabs/home/modules/home-destination-local-experience/spec.md
pages/tabs/home/modules/home-destination-recommendation/spec.md
```

---

## 备注

- **顶栏复用**：目的地与推荐共用 **`home-titlebar`** + **`home-search`**（同一 `GlobalFixedHeader`）。  
- **底栏**：**`fdl-tabbar`**；当前在首页 Tab 时高亮首页项。  
- **目的地推荐双列**：**`home-destination-recommendation`** 与 **`home-feeds`** 卡片样式一致，生成时两模块 spec 可同时命中。  
- **运营 Banner**：按需引用平台 `banner` spec（已列上表）。

---

## 变更记录

| 日期 | 说明 |
|------|------|
| 2026-04-05 | 推荐态五模块 + 目的地四模块 + 双 frame；tabbar/banner/carousel-bar/price。 |
