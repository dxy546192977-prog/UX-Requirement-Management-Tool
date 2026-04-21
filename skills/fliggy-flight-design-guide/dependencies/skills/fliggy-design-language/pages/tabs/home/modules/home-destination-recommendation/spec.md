# 目的地推荐 / 猜你喜欢（Home Destination Recommendation）

## 元信息

- **slug**：`home-destination-recommendation`  
- **page_id**：`tabs.home`（**顶 Tab = 目的地**）  
- **分类**：首页 Tab — 筛选 pills + 双列商品栅格  
- **依赖**：[`home-feeds/spec.md`](../home-feeds/spec.md)（**卡片结构、价字体、间距与 `fdl-home-feeds__*` 同构**）；[`foundations/design-foundations.md`](../../../../../foundations/design-foundations.md)；[`page-frame-destination.md`](../../page-frame-destination.md)  
- **最后同步**：2026-04-05  

---

## 概述

在 **`home-feeds`** 双列瀑布流/栅格规则不变的前提下，增加 **顶区横滑筛选**（猜你喜欢、一口特价、好口碑等）：**`padding: 0 30px`** 与目的地 frame 一致；**`gap: 12`**；单 pill **`height: 48`**、**`color-mix(in srgb, var(--color-darkgray) 6%, transparent)`** 底、**24** 字 **`--color-midgray`**，选中态可用 **`indigo-1` 边框** 或 **brand 底**（示例为 **indigo 描边 + 白底**）。

类名前缀：**`fdl-home-dest-rec`**（筛选）；卡片区域 **复用 `fdl-home-feeds` 的类名与量纲**（见 [`home-feeds/example.html`](../home-feeds/example.html)）。

---

## 产出物

- [`example.html`](example.html) — 筛选 + 简化双列演示（完整卡片以 `home-feeds` 为准）。

---

## 变更记录

| 日期 | 说明 |
|------|------|
| 2026-04-05 | 初版：与 `home-feeds` 共用样式约定。 |
