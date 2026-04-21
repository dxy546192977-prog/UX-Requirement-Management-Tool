# 火车票列表页框架（`vertical.train.list`）

## 元信息

- **page_id**：`vertical.train.list`  
- **设计基准**：与 **`listing-page`** 一致 — **375×812**（iPhone X 逻辑宽），`viewport` **`width=375, initial-scale=1.0`**；**非** 机票列表的 **750 @2x** 供稿体系。  
- **参考源**：[`listing-reference.md`](listing-reference.md)（目录 `/Users/huangxuefeng/Downloads/listing-page`）  
- **整页预览**：[`example-full.html`](example-full.html)（由 `listing-page/demo.html` 同步）  
- **依赖**：[`foundations/design-foundations.md`](../../../../foundations/design-foundations.md)  
- **最后同步**：2026-04-06  

---

## 固定区与滚动区（摘自 listing-page README）

| 区域 | 高度 | 说明 |
|------|------|------|
| Status Bar | **44px** | iOS 状态栏（刘海区） |
| Titlebar | **44px** | `listing-titlebar`：返回 + 出发⇄到达 + 更多 |
| Calendar Bar | **56px** | `listing-calendar-bar`：约 30 天横滑 + 右侧日历入口 |
| Tab | **52px** | `listing-tab`：火车票（含最低价副标题）/ 智能中转 / 机票；**上滑隐藏、下滑显示** |
| 列表 | flex 填充 | `listing-train-card` 纵向排列，卡片间 **1px #F2F3F5** |
| Bottom Bar | **50px** | `listing-bottom-bar`：高级筛选 / 价格 / 耗时 / 出发时间 |
| Home Indicator | **34px** | 底部指示条 |

壳层 `#phone-frame`：**375×812**，圆角外框等为演示用；真机嵌入时可去掉。

---

## 行为摘要

- **默认排序**：出发 **早→晚**（与 `demo` 内 `TrainListPage` 一致）。  
- **最低价**：列表数据驱动 `listing-tab` 火车票副标题（如 `¥179起`）。  
- **底栏排序**：`tab-change` 事件联动重排列表（见 `example-full.html` 脚本）。  

---

## 产出

- [`manifest.md`](manifest.md)  
- `modules/<slug>/spec.md` + `example.html`（单组件可运行切片）  

---

## 变更记录

| 日期 | 说明 |
|------|------|
| 2026-04-06 | 初版：对齐 `listing-page`，与 `vertical.flight.list` 基准区分说明。 |
