# 目的地当地体验（Home Destination Local Experience）

## 元信息

- **slug**：`home-destination-local-experience`  
- **page_id**：`tabs.home`（**顶 Tab = 目的地**）  
- **分类**：首页 Tab — 图卡分类 + 纵向列表 + 展开更多  
- **依赖**：[`foundations/design-foundations.md`](../../../../../foundations/design-foundations.md)；[`image-library.md`](../../../../../foundations/image-library.md)；[`page-frame-destination.md`](../../page-frame-destination.md)  
- **最后同步**：2026-04-05  

---

## 概述

**白底大卡** **`--radius-l`**、宽 **750**（或内容区 **690** + **30** 边距与 frame 一致）。**头**：左标题 **36** Medium、右「查看全部」+ 箭头。**分类横滑**：**140×140** 图卡、底渐变蒙层、选中 **3px `indigo-1` 描边** + 白底托起文案 + **三角指示**。**列表**：**160×210**（或 **170** 矮卡）左图 + 右文；**`padding: 12px 30px`**；**`gap: 12`**；价 **Fliggy Sans 102** + **`--color-pay-1`**；底 **「展开更多」** 胶囊（**`--color-label`** 底 **indigo-1** 字）。

类名前缀：**`fdl-home-dest-local`**。

---

## 视觉规范（@2x px）

| 项目 | 值 |
|------|-----|
| 头高 | 约 **50**；标题 **36**；更多 **24** |
| 分类 | **140** 方卡 **`--radius-m`**；标签 **28** Medium |
| 商品图 | **160×210**，**`--radius-m`**；角标 **20** 白字 **70% darkgray** 底 |
| 展开更多 | **224×60** 圆角 **30** |

---

## 产出物

- [`example.html`](example.html)  

---

## 变更记录

| 日期 | 说明 |
|------|------|
| 2026-04-05 | 初版；配图来自 image-library。 |
