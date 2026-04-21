# 首页 Tab 页面框架（`tabs.home`）

## 元信息

- **page_id**：`tabs.home`  
- **依赖**：[`foundations/design-foundations.md`](../../../foundations/design-foundations.md)；底栏一级导航见 [`components/platform/navigation/tabbar/spec.md`](../../../components/platform/navigation/tabbar/spec.md)  
- **最后同步**：2026-04-05  

---

## 框架简介

首页采用 **模块化 + 卡片化**：**通栏**（顶栏、底栏）与 **内容区**（左右留白内的模块）组合。主列 **纵向堆叠** 多个独立模块；除通栏外，业务模块放在 **统一水平内边距** 内，模块之间 **垂直间距** 固定，卡片 **圆角** 与全局 token 对齐。

---

## 布局规范（供稿收敛 + FDL 对齐）

| 规则 | 取值 | 说明 |
|------|------|------|
| 视口 | **750** 宽（@2x） | 与 foundations「技术基准」一致；`viewport` 见各 `example.html`。 |
| 内容区水平边距 | **24px** | 非通栏模块（搜索、金刚、多功能频道、Feeds 等）**左右各 24px**；内容区可用宽 **702px**（`750 − 24×2`）。*注：foundations 栅格默认写过 18px 页边距；**本 Tab 以本 frame 24px 为准**。* |
| 大模块垂直间距 | **30px** | 金刚区 / 运营位 / 多列区 / Feeds 等 **块与块之间**约 30px。 |
| 内容卡片圆角 | **`var(--radius-m)`（12px）** | 与供稿「约 12px」一致。 |
| 通栏 | **顶标题栏**、**底栏 Tabbar** | 横向铺满 **750**；底栏使用 **平台 `fdl-tabbar`**，本页 **当前 Tab = 首页**（`--active` + `--fliggy` 焦点位按 tabbar spec）。 |

---

## 纵向信息架构（推荐态）

自上而下（**顶 Tab 为「推荐」等主内容流**时；**「目的地」等顶 Tab** 另由 `modules/` 下目的地相关模块扩展，供稿未到前仅占位）：

1. **首页顶标题栏** — `modules/home-titlebar/`（Logo + 顶 Tab + 右侧快捷入口）  
2. **搜索框** — `modules/home-search/`  
3. **金刚区** — `modules/home-kingkong/`  
4. **运营位 / 横幅** — 可用平台 [`banner`](../../../components/platform/display/banner/spec.md) 或运营稿；**未单独建 home 子模块前**由 manifest 按需列入 `banner` spec。  
5. **多功能频道** — `modules/home-multi-channel/`（1+1+1+2）  
6. **双列 Feeds** — `modules/home-feeds/`  
7. **底部一级导航** — **不建页面内模块文件**；实现时引用 **`components/platform/navigation/tabbar`**，固定在视口底并预留 **`padding-bottom`**（导航高度 + `safe-area-inset-bottom`）。

---

## 顶 Tab 与「目的地」

- 顶 Tab **混合形态**（纯文、图标+文、品牌标）见 `home-titlebar` spec。  
- **「目的地」非底栏**：切换为目的地主列时，**固定顶/底不变**，滚动区内模块与间距见 **[`page-frame-destination.md`](page-frame-destination.md)**；对应实现见 **`modules/home-destination-*`**（金刚区、榜单、当地体验、推荐）。

---

## 滚动与安全区

- **推荐结构**：主内容区 **`overflow-y: auto`**（或整页滚动容器），**底栏 `position: fixed; bottom: 0`**，主区 **`padding-bottom`** ≥ `fdl-tabbar` 占用高度 + 安全区。  
- **顶栏是否吸顶**：供稿示例为静态块；产品若吸顶，可在实现层对 `home-titlebar` / `home-search` 做 `sticky`/`fixed`，不改变单模块 spec 边界。

---

## 产出物索引

| 类型 | 路径 |
|------|------|
| 闭包清单 | [`manifest.md`](manifest.md) |
| 模块 | `modules/home-titlebar/`、`home-search/`、`home-kingkong/`、`home-multi-channel/`、`home-feeds/` |

---

## 变更记录

| 日期 | 说明 |
|------|------|
| 2026-04-05 | 初版：框架 + 推荐流模块位；底栏引用平台 tabbar。 |
