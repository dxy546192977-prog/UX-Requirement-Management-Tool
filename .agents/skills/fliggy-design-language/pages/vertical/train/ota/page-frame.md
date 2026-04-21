# 火车 OTA 页框架（`vertical.train.ota`）

## 元信息

- **page_id**：`vertical.train.ota`  
- **设计基准**：**750px 宽（@2x）**；`viewport` **`width=750, user-scalable=no`**  
- **依赖**：[`foundations/design-foundations.md`](../../../../foundations/design-foundations.md)  
- **最后同步**：2026-04-06  

---

## 固定组成（自上而下）

1. **title（导航栏）** — `train-ota-title`（状态栏 **88** + 导航 **88** = **176**；中间**日期+星期+▼**；黑色图标切图、**无**毛玻璃）  
2. **行程卡** — `train-ota-itinerary`  
3. **营销条** — `train-ota-promo-bar`  
4. **座席区** — `train-ota-seat-section`  
5. **报价区** — `train-ota-quote-section`（多方案纵向排列）  
6. **飞猪水印** — `train-ota-watermark`（与首页水印**同切图**，OTA 页可用全宽 **750×116** 简版容器）  

---

## 主内容区

- 整页 **`body` / 根宽 750**；模块多为 **全宽 750**（与供稿一致）。  
- 模块之间垂直间距：**`gap: 18px`**（与骨架模板一致）。  
- **字体**：大号价格 **Alibaba Sans 102**；小数/负数等 **Fliggy Sans 102**；正文 **PingFang SC**（示例内 CDN `@font-face`）。  
- **Token（摘录）**：`--color-darkgray: #0f131a`、`--color-price: #ff5533`、`--color-button: #FF8C1A`、`--color-benefit-text: #805540`、`--color-seat-selected: #FFF7CC`、`--color-bg: #F2F3F5` 等（见各模块与 `example-full.html`）。  

---

## 产出

- [`manifest.md`](manifest.md)  
- 各模块 `spec.md` + `example.html`  
- 可选整页：[`example-full.html`](example-full.html)  

---

## 变更记录

| 日期 | 说明 |
|------|------|
| 2026-04-06 | 初版，对齐火车 OTA 框架供稿。 |
