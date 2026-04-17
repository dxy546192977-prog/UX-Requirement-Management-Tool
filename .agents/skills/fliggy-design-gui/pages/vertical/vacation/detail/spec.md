# 门票 / 玩乐商详（`vertical.vacation.detail`）— 页面结构

## 元信息

- **page_id**：`vertical.vacation.detail`（与 [docs/page-index.md](../../../../docs/page-index.md) 一致时引用）
- **参考实现**：[example.html](example.html)（**唯一** HTML/CSS 真相源；无 `modules/`、`manifest.md`）
- **依赖**：[foundations/design-foundations.md](../../../../foundations/design-foundations.md)；配图见 [foundations/image-library.md](../../../../foundations/image-library.md)
- **Skill 编排入口**：[SKILL.md](../../../../SKILL.md)
- **最后同步**：2026-04-12

---

## 一、说明

头图、基础信息、POI、货架、富详情、底栏等。

- **顶栏**：与 [`line-detail/example.html`](../line-detail/example.html) 一致——头图上的 **`.status-overlay`**（含 **`.status-bar`** 信号格与 **`.nav-bar`** 返回 / 分享 / 收藏 / 更多白标），**非**独立 fixed 渐变顶栏。
- **底栏**：与 line-detail 一致——**`.bottom-bar`**、**`.icon-nav`**（咨询 / 店铺 / 收藏 SVG）与 **`.action-buttons`**（加入购物车 / 立即购买，半圆拼合）。
- **配图**：示例内使用 [image-library.md](../../../../foundations/image-library.md) **共享池** URL；同页多图须换不同条目。

整页布局、固定层与滚动行为以 **[example.html](example.html)** 内结构与样式为准。历史 **`page-frame.md` / `manifest.md` / `modules/`** 已收束到本单文件。

---

## 二、变更记录

| 日期 | 说明 |
|------|------|
| 2026-04-12 | 收束为 `example.html` + `spec.md`（与 `tabs.home` 同形态）。 |
| 2026-04-12 | 顶栏/底栏对齐 line-detail；头图与图文详情改用 image-library。 |
