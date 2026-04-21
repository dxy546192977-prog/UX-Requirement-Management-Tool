# 火车票列表 — 频道 Tab（`train-list-channel-tab`）

## 元信息

- **模块 slug**：`train-list-channel-tab`  
- **所属页**：`vertical.train.list`  
- **示例**：[`example.html`](example.html)  
- **依赖**：[`page-frame.md`](../../page-frame.md)、[`listing-reference.md`](../../listing-reference.md)  
- **最后同步**：2026-04-06  

---

## 用途

三栏：**火车票**（副标题为最低价文案）、**智能中转**、**机票**；选中加粗 + 底指示条 **24×3**；整页内随滚动 **上滑隐藏 / 下滑显示**（见 `example-full.html`）。

---

## 规格摘要

| 项 | 值 |
|----|-----|
| 宿主 | **375** 宽，**52** 高 |
| 标题 | **15px**，选中 **600** |
| 副标题 | **11px/#5C5F66**，选中主色 |
| 指示条 | **#0F131A**，圆角 **1.5** |

自定义元素 **`listing-tab`**，属性 **`lowest-price`**（如 `¥179起`）；方法 `setLowestPrice(s)`；事件 **`tab-change`**。

---

## 变更记录

| 日期 | 说明 |
|------|------|
| 2026-04-06 | 初版。 |
