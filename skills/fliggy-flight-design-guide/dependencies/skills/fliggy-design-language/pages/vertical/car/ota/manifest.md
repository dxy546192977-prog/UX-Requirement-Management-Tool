---
page_id: vertical.car.ota
title: 租车 OTA 详情
route: /vertical/car/ota
viewport: "750×4505（设计稿宽度 750px）"
industry: car
---

# 租车 OTA 详情 · Manifest

## 页面意图

车型详情 + 报价列表的 **高保真 OTA 页**：头图沉浸、摘要区压住头图、报价区固定高度栈与 8 张报价卡变体，底部仅 Home Indicator，无对话输入框。

## 页面骨架（4 层）

1. **头图**（750×524，`top: 0`）
2. **车型摘要区**（750×335，`top: 500`，与头图重叠 24px）
3. **报价列表区**（714×3602，`left: 18px`，`top: 839`，子项 `gap: 18px`）
4. **Home Indicator**（750×64，贴底）

## 模块清单（按阅读顺序）

| 顺序 | 模块 | 目录 |
|------|------|------|
| 1 | 头图 | `modules/car-ota-hero/` |
| 2 | 车辆信息 | `modules/car-ota-vehicle-summary/` |
| 3 | 88VIP 小黄条 | `modules/car-ota-vip-strip/` |
| 4 | 租车取还信息 | `modules/car-ota-pickup-return/` |
| 5 | 报价卡片（多变体） | `modules/car-ota-quote-card/` |
| 6 | 展开收起 | `modules/car-ota-expand-row/` |
| 7 | 分组标题 | `modules/car-ota-section-title/` |
| 8 | 推荐车型卡 | `modules/car-ota-recommend-card/` |

## 报价列表 11 项（固定顺序与高度）

| # | 模块 | 高度 |
|---|------|------|
| 1 | 品牌周·精选车 | 318px |
| 2 | 总价最低·特惠车 | 408px |
| 3 | 品质新车 | 408px |
| 4 | 飞猪优选车（可选送取） | 398px |
| 5 | 飞猪优选车（取还三行） | 398px |
| 6 | 全国连锁·大牌好车 | 408px |
| 7 | 小伤免赔·剐蹭无忧车 | 318px |
| 8 | 一口价·舒心租车 | 406px |
| 9 | 查看更多1个报价 | 60px |
| 10 | 热销车型推荐 | 39px |
| 11 | 推荐车型卡 | 261px |

## 参考实现

- 整页：`example-full.html`
- 框架说明：`design-framework-components.md`
- 切片与坐标：`page-frame.md`
