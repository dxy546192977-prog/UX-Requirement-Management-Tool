# 火车票列表 — 顶栏（`train-list-header`）

## 元信息

- **模块 slug**：`train-list-header`  
- **所属页**：`vertical.train.list`  
- **示例**：[`example.html`](example.html)  
- **依赖**：[`page-frame.md`](../../page-frame.md)、[`listing-reference.md`](../../listing-reference.md)  
- **最后同步**：2026-04-06  

---

## 用途

**iOS 状态栏（44px）** + **`listing-titlebar`（44px）**：返回、出发/到达（⇄ 图标）、更多；城市名超长 **5 字截断**。

---

## 规格摘要（375 逻辑宽）

| 项 | 值 |
|----|-----|
| 状态栏 | 高 **44**，左右 **24** padding；时间 **15px/600**；刘海 `sb-notch` **120×28** |
| Titlebar | **375×44**，白底；侧按钮 **24×24**；中间文案 **15px/500/#0F131A**，`gap: 8` |

实现为 **Shadow DOM** 的自定义元素 `listing-titlebar`，属性：`departure-city`、`arrival-city`。

---

## 变更记录

| 日期 | 说明 |
|------|------|
| 2026-04-06 | 初版，对齐 `listing-page`。 |
