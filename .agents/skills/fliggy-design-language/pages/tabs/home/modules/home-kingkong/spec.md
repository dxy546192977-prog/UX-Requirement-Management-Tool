# 首页金刚区（Home King Kong）

## 元信息

- **slug**：`home-kingkong`  
- **page_id**：`tabs.home`  
- **分类**：首页 Tab — 内容区卡片模块  
- **依赖**：[`foundations/design-foundations.md`](../../../../../foundations/design-foundations.md)  
- **最后同步**：2026-04-05  

---

## 概述

置于 **702** 宽内容区内的 **圆角大卡**（**`--radius-l`** 外框、**浅描边** **`color-mix(in srgb, var(--color-darkgray) 6%, transparent)`**、**顶白渐变到底白** 氛围）。**首行 5 个大入口**（大图标区 + **22** 字标签），**第 2、3 行**各 **5 个小入口**（**64** 高图标带 + 文案）。多页时底部 **横条分页点**（与 [`carousel-bar`](../../../../../components/platform/widgets/carousel-bar/spec.md) 语义一致：**当前 `--color-brand-1`**，未选 **`--color-bg`**）。

供稿 `jinggang-*` → **`fdl-home-kingkong`** / **`fdl-home-kingkong__*`**。

---

## 视觉规范（@2x px）

| 项目 | 值 |
|------|-----|
| 外卡 | 宽 **702**；**`padding: 12px 0 18px`**；行间距 **18**；大行行高约 **136**，小行 **95** |
| 大图标 | **84×84** 视觉中心偏上；文案 **22** Regular **`--color-darkgray`** |
| 小图标 | **132×64** 背景图区域；**`gap: 8`** 与标签 |
| 分页点 | **24×6**，**`border-radius: 3px`**（条形态）；**`gap: 6`** |

---

## 结构与层次

```text
section.fdl-home-kingkong
  ├── div.fdl-home-kingkong__row（大）
  │     └── a.fdl-home-kingkong__item.fdl-home-kingkong__item--lg × 5
  ├── div.fdl-home-kingkong__row（小）× 2
  │     └── a.fdl-home-kingkong__item.fdl-home-kingkong__item--sm × 5
  └── div.fdl-home-kingkong__dots（可选）
        └── button.fdl-home-kingkong__dot [aria-current]
```

---

## 可访问性

- 入口为 **`a`** 或 **`button`** + **`aria-label`**。  
- 分页点 **`type="button"`**、`aria-label`、当前页 **`aria-current="true"`**。

---

## 产出物

- [`example.html`](example.html)  

---

## 变更记录

| 日期 | 说明 |
|------|------|
| 2026-04-05 | 初版。 |
