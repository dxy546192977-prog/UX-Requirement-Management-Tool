# 首页 — 目的地顶 Tab 页面框架（`tabs.home` · 目的地态）

## 元信息

- **page_id**：`tabs.home`（**顶 Tab = 目的地 / 城市** 时的内容与间距约定）  
- **依赖**：[`page-frame.md`](page-frame.md)（共用视口与底栏规则）；[`foundations/design-foundations.md`](../../../foundations/design-foundations.md)；顶栏/搜索复用 **`home-titlebar`** + **`home-search`**（与「推荐」态同一套 Global Header）  
- **最后同步**：2026-04-05  

---

## 布局模式：固定 + 滚动

| 区域 | 行为 | 说明 |
|------|------|------|
| **顶部固定区** | `fixed` / 独立层叠 | **状态栏占位 + `home-titlebar` + `home-search`** 与推荐态 **共用组件**；总高约 **304px**（88 + 88 + 128，以实际实现为准）。 |
| **底部 Tab 栏** | `fixed; bottom: 0` | **平台 `fdl-tabbar`**；目的地态仍属首页底栏，**当前高亮 = 首页**。 |
| **可滚动内容区** | `overflow-y: auto` | 背景 **`var(--color-bg)`**；**`padding-top`** 预留顶固定区高度；**`padding-bottom`** 预留底栏（约 **168px** 含安全区，以 tabbar spec 为准）。 |

---

## 水平边距（与推荐态差异）

- 目的地滚动区内模块采用 **`--fdl-home-dest-page-padding: 30px`**（对应供稿 **`var(--spacing-page)`**），**内容区宽 690px**（`750 − 30×2`）。  
- **推荐态**仍以 `page-frame.md` 的 **24px / 702** 为准；同一 `tabs.home` 两种顶 Tab **仅内容区边距不同**，勿混用。

---

## 可滚动区内模块顺序（自上而下）

| 顺序 | 模块 | 路径 | 上间距（相对上一块） |
|------|------|------|----------------------|
| 1 | 目的地金刚区（5×2 大图标） | `modules/home-destination-kingkong/` | **`margin-top: 24px`** |
| 2 | 榜单（Tab + 横滑卡片） | `modules/home-destination-ranking/` | **`margin-top: 48px`** |
| 3 | 当地体验 | `modules/home-destination-local-experience/` | **`margin-top: 48px`** |
| 4 | 推荐 / 猜你喜欢 | `modules/home-destination-recommendation/`（**卡片与 `home-feeds` 同构**） | **`margin-top: 48px`** |

**大卡片圆角**：供稿 JSON 为 **24px** → 与 **`var(--radius-l)`** 对齐（当地体验外卡、榜单卡、推荐卡等）。

---

## JSON 结构（对接摘要）

完整字段见供稿；仓库内 **manifest 闭包** 以 `manifest.md` 中 **spec 路径列表** 为准，**不**将 JSON 当作第二真相源。

---

## 产出物索引

| 类型 | 路径 |
|------|------|
| 推荐态框架 | [`page-frame.md`](page-frame.md) |
| 目的地框架 | 本文件 |
| 模块 | `modules/home-destination-kingkong/`、`home-destination-ranking/`、`home-destination-local-experience/`、`home-destination-recommendation/` |

---

## 变更记录

| 日期 | 说明 |
|------|------|
| 2026-04-05 | 初版：固定顶/底 + 30px 内容边距 + 四模块顺序。 |
