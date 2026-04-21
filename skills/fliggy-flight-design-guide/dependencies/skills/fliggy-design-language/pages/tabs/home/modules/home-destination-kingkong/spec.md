# 目的地金刚区（Home Destination King Kong）

## 元信息

- **slug**：`home-destination-kingkong`  
- **page_id**：`tabs.home`（**顶 Tab = 目的地**）  
- **分类**：首页 Tab — 目的地滚动区  
- **依赖**：[`foundations/design-foundations.md`](../../../../../foundations/design-foundations.md)；布局见 [`page-frame-destination.md`](../../page-frame-destination.md)  
- **最后同步**：2026-04-05  

---

## 概述

**2 行 × 5 列**共 **10** 个入口；**白底通栏**（宽 **750**），**水平内边距 30px**（与目的地 frame 一致），**行间距 24px**，**图标区 120×120**，**图标与文案间距 12px**，文案 **22** Regular **`--color-darkgray`**。与首页 `home-kingkong`（多行小图标 + 分页）**形态不同**，独立模块。

类名前缀：**`fdl-home-dest-kingkong`**。

---

## 视觉规范（@2x px）

| 项目 | 值 |
|------|-----|
| 容器 | `max-width: 750px`；**`padding: 24px 30px`**（首块上 **24** 由页面级 `margin-top` 亦可）；**`gap: 24`**（行间） |
| 行 | **`justify-content: space-between`**，五列均分 |
| 图标 | **120×120** 容器，`object-fit: contain` |
| 文案 | **22**，行高 **140%** |

---

## 结构与层次

```text
section.fdl-home-dest-kingkong
  └── div.fdl-home-dest-kingkong__row × 2
        └── a.fdl-home-dest-kingkong__item × 5
              ├── div.fdl-home-dest-kingkong__icon-wrap > img
              └── span.fdl-home-dest-kingkong__label
```

---

## 产出物

- [`example.html`](example.html)  

---

## 变更记录

| 日期 | 说明 |
|------|------|
| 2026-04-05 | 初版。 |
