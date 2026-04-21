# 目的地榜单（Home Destination Ranking）

## 元信息

- **slug**：`home-destination-ranking`  
- **page_id**：`tabs.home`（**顶 Tab = 目的地**）  
- **分类**：首页 Tab — Tab 切换 + 横滑榜单卡  
- **依赖**：[`foundations/design-foundations.md`](../../../../../foundations/design-foundations.md)；[`image-library.md`](../../../../../foundations/image-library.md)；[`page-frame-destination.md`](../../page-frame-destination.md)  
- **最后同步**：2026-04-05  

---

## 概述

**顶栏**：本地榜 / 周边榜 / 时令榜 / 爆款榜（**Fliggy Fonts** **36** Medium，未选 **`--color-midgray`**，选中 **`--color-darkgray`** + **54×6** 下划线）；可选 **营销气泡**（**`--color-pay-1`** 底白字）。**主体**：**`padding-left: 30px`** 起横向滚动，**`gap: 18`**；单卡 **312px** 宽（供稿视觉；JSON 写 330 时以设计最终稿为准）、**`--radius-l`**、浅底 **`#fbfbfc`** 可用 **`color-mix(in srgb, var(--color-white) 97%, var(--color-bg))`** 近似。卡内 **Top3**：**84×84** 图 + 排名角标（CDN 图）+ 标题 + 价（**Fliggy Sans 102**）或点评数。

类名前缀：**`fdl-home-dest-ranking`**。

---

## 视觉规范（@2x px）

| 项目 | 值 |
|------|-----|
| 根 | 宽 **750**；顶 Tab 区 **80** 高 |
| 卡头渐变 | 分卡主题色（蓝 / 绿 / 紫）→ 透明，见示例 `:root` **`--fdl-home-dest-rank-h1-*`** |
| 列表项 | **84** 图圆角 **`--radius-m`**；标题 **24** Medium；价 **pay-1** |

---

## 结构与层次

```text
section.fdl-home-dest-ranking
  ├── nav.fdl-home-dest-ranking__tabs（role="tablist"）
  │     ├── button.fdl-home-dest-ranking__tab [aria-selected]
  │     └── span.fdl-home-dest-ranking__bubble（可选）
  └── div.fdl-home-dest-ranking__scroller
        └── article.fdl-home-dest-ranking__card × N
              ├── header.fdl-home-dest-ranking__card-head
              └── div.fdl-home-dest-ranking__card-body
                    └── div.fdl-home-dest-ranking__row × 3
```

---

## 产出物

- [`example.html`](example.html)  

---

## 变更记录

| 日期 | 说明 |
|------|------|
| 2026-04-05 | 初版；列表图用 image-library。 |
