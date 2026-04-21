# 火车票列表 — 底栏排序（`train-list-footer-bar`）

## 元信息

- **模块 slug**：`train-list-footer-bar`  
- **所属页**：`vertical.train.list`  
- **示例**：[`example.html`](example.html)  
- **依赖**：[`page-frame.md`](../../page-frame.md)、[`listing-reference.md`](../../listing-reference.md)  
- **最后同步**：2026-04-06  

---

## 用途

**四键**：高级筛选、价格、耗时、出发时间；选中态 **黄底图标** + 文案加粗；价格/耗时/出发支持 **双向排序** 文案切换。整页下方另有 **Home Indicator**（**34px** 区域，条 **134×5**）。

---

## 规格摘要

| 项 | 值 |
|----|-----|
| 底栏白底条 | **50px** 高，顶圆角 **12**，上阴影 |
| 图标区 | **18×18**（SVG 自 **48** 矢量缩略） |
| 文案 | **10px**，默认 **#919499**，选中 **#0F131A / 600** |

自定义元素 **`listing-bottom-bar`**；方法 `setActiveSort(tabIndex, direction)`；事件 **`tab-change`**（`detail.tab`：`filter` | `price` | `duration` | `departure`）。

---

## 变更记录

| 日期 | 说明 |
|------|------|
| 2026-04-06 | 初版。 |
