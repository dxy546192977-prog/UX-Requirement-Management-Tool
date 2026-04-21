# 火车票列表 — 日历条（`train-list-calendar-bar`）

## 元信息

- **模块 slug**：`train-list-calendar-bar`  
- **所属页**：`vertical.train.list`  
- **示例**：[`example.html`](example.html)  
- **依赖**：[`page-frame.md`](../../page-frame.md)、[`listing-reference.md`](../../listing-reference.md)  
- **最后同步**：2026-04-06  

---

## 用途

约 **30 天**横向滚动日期格 + 右侧 **日历按钮**；选中项黄底 **#FFE866**；支持节假日「休/班」小标（逻辑见组件内 `getHolidayData`）。

---

## 规格摘要

| 项 | 值 |
|----|-----|
| 宿主 | **375** 宽，白底 |
| 条高 | **56**（`.bar`） |
| 日期格 | `min-width: 56`，高 **44**，圆角 **8**；次行数字 **Fliggy Sans 102 15px** |
| 日历钮 | 宽 **48**，左阴影 `-4px 0 8px` |

自定义元素 **`listing-calendar-bar`**，派发 `date-change`（`detail.date` 为 `YYYY-MM-DD`）。

---

## 变更记录

| 日期 | 说明 |
|------|------|
| 2026-04-06 | 初版。 |
