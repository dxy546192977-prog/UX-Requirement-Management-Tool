# 火车票列表 — 外部参考（`listing-page`）

本页 **实现与文档** 以本地包为准（与机票列表 **750×1624 @2x** 供稿不同）：

**路径**：`/Users/huangxuefeng/Downloads/listing-page`

| 文件 | 说明 |
|------|------|
| `README.md` | 布局尺寸、组件表、功能说明 |
| `SKILL.md` | 触发条件、`fetch_trains.py` 用法 |
| `demo.html` | 整页 Web Components + 列表逻辑（已同步为仓库内 [`example-full.html`](example-full.html)） |
| `fetch_trains.py` | 12306 拉数写入 `demo.html` 标记区间 |
| `train_data.js` | （可选）独立数据文件 |

**组件名映射（listing-page → FDL slug）**

| listing-page 标签 | FDL 模块 slug |
|-------------------|----------------|
| （壳层）状态栏 + `listing-titlebar` | `train-list-header` |
| `listing-calendar-bar` | `train-list-calendar-bar` |
| `listing-tab` | `train-list-channel-tab` |
| `listing-train-card` + `train-tag` / `small-label` / `train-seat` / `train-price` | `train-list-train-card` |
| `listing-bottom-bar` + Home Indicator | `train-list-footer-bar` |
