---
page_id: vertical.car.list
title: 租车列表
route: /vertical/car/list
viewport: "750×1624（视口裁剪）；内容画布 750×2111"
industry: car
---

# 租车列表 · Manifest

## 页面意图

租车 **LIST**：白顶（状态栏 + 二级导航 + 取还/搜车）+ 快筛 + 大筛选服务卡 + **新客专享** 黄条 + 左右分栏（侧导航 148px + 车型卡 602px×5，第 5 张仅露顶）。

## 页面骨架（7 层）

1. iPhone 上状态栏（88px，`#FFFFFF`）
2. 二级导航（88px，`#FFFFFF`）
3. 取还信息 + **搜车型** 搜索框（含于导航行内）
4. 快筛栏（84px）
5. 大筛选服务卡（113px）
6. 新客专享黄条（**96px** 白底带区，内嵌 **714×72** `promo-bar`）
7. 主列表舞台（`top: 469px`，左 148 + 右 602）

## 模块清单

| 顺序 | 模块 | 目录 |
|------|------|------|
| 1 | 上状态栏 | `modules/car-list-status-bar/` |
| 2 | 二级导航 | `modules/car-list-nav/` |
| 3 | 快筛栏（无联订任务） | `modules/car-list-quick-filter/` |
| 4 | 大筛选 | `modules/car-list-big-filter/` |
| 5 | 新客专享黄条 | `modules/car-list-promo-bar/` |
| 6 | 侧导航 | `modules/car-list-side-nav/` |
| 7 | 车型卡片（602px） | `modules/car-list-car-card/` |

## 右列车型卡（固定顺序）

| # | 车型 | 角标 | 日价 | 总价 |
|---|------|------|------|------|
| 1 | 大众朗逸 | 最近浏览 | ¥110/天 | 总价¥440起 |
| 2 | 特斯拉Model3 | 低碳车型 | ¥90/天 | 总价¥440起 |
| 3 | AITO问界M7 | 总价最低 | ¥150/天 | 总价¥440起 |
| 4 | 日产轩逸 | 无 | ¥110/天 | 总价¥330起 |
| 5 | 日产轩逸 | 无 | 视口内仅露顶部 | — |

## 参考实现

- 整页：`example-full.html`
- 框架：`design-framework-components.md` · 坐标：`page-frame.md`
