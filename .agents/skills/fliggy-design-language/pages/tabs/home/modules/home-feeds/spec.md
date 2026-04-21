# 首页双列 Feeds（Home Feeds）

## 元信息

- **slug**：`home-feeds`  
- **page_id**：`tabs.home`  
- **分类**：首页 Tab — 双列瀑布流（示例为 **静态两列占位**，真瀑布流由实现层计算列高）  
- **依赖**：[`foundations/design-foundations.md`](../../../../../foundations/design-foundations.md)  
- **最后同步**：2026-04-05  

---

## 概述

**702** 总宽：**左/右列各 342**，**`column-gap: 18`**。卡片 **`--radius-m`**，图区 **342 方图**（顶圆角与卡一致），下 **白底内容区**。含：**首卡可为全高轮播大图** + **多条商品卡**（角标、位置条、播放钮、标题、亮点 pill、评分 **`--color-indigo-1`**、**`--color-pay-1`** 价 + **Fliggy Sans 102**、月销、分割线、评价条 **`--color-safeguard-4`/`--color-safeguard-5`** 等）。

供稿 `feeds-container` / `feeds-card` → **`fdl-home-feeds`** / **`fdl-home-feeds__*`**。

---

## 视觉规范（@2x px）

| 项目 | 值 |
|------|-----|
| 栅格 | **342 + 18 + 342 = 702**；列内 **`gap: 18`** |
| 标题 | **28** Medium **`--color-darkgray`** |
| 评分 | **24** Medium **`--color-indigo-1`** |
| 价格 | **Fliggy Sans 102** **42** + **24** ¥ **`--color-pay-1`**（对齐平台 price） |
| 角标浅底 | **`--color-safeguard-4`** 系；深底条 **`color-mix(in srgb, var(--color-darkgray) 70%, transparent)`** |
| 轮播点 | 与金刚一致：**当前 `brand-1`**，未选 **白 80%**（`color-mix` 白 80%） |

---

## 结构与层次

```text
section.fdl-home-feeds
  ├── div.fdl-home-feeds__bg（可选顶渐变）
  ├── div.fdl-home-feeds__col（左）
  │     ├── article.fdl-home-feeds__carousel（可选）
  │     └── article.fdl-home-feeds__card × N
  └── div.fdl-home-feeds__col（右）
        └── article.fdl-home-feeds__card × N
```

---

## 产出物

- [`example.html`](example.html)  

---

## 变更记录

| 日期 | 说明 |
|------|------|
| 2026-04-05 | 初版；数字字体 Fliggy Sans 102。 |
