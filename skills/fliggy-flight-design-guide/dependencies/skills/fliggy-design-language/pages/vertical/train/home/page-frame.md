# 火车票首页框架（`vertical.train.home`）

## 元信息

- **page_id**：`vertical.train.home`  
- **设计基准**：**750 × 1624px（@2x）**；`viewport` **`width=750, user-scalable=no`**  
- **依赖**：[`foundations/design-foundations.md`](../../../../foundations/design-foundations.md)  
- **最后同步**：2026-04-06  

---

## 固定组成（自上而下）

1. **首页 title（沉浸式导航栏）** — `train-home-title`（**750×194**：状态栏 **88** + **gap 18** + 导航 **88**）  
2. **搜索模块** — `train-home-search`  
3. **金刚区** — `train-home-kingkong`  
4. **优惠专区** — `train-home-promo-zone`  
5. **火车路线专家** — `train-home-route-expert`  
6. **添加微信助手** — `train-home-wechat-assistant`  
7. **火车票水印** — `train-home-watermark`  
8. **火车票底 bar** — `train-home-bottom-bar`（**非** App 全局主 Tabbar）  

---

## 内容区与间距

- 主内容：`padding: 0 24px`，`flex-direction: column`，**`gap: 18px`**（与供稿骨架一致）。  
- **底 bar**：`position: fixed; bottom: 0`，**750×150**（Tab **86** + 安全区 **64**）；页面主体需 **`padding-bottom: 150px`**（或等价留白）。  
- **水印**：宽 **750×116** 图 **`absolute` 水平居中**；距**可滚动内容最底部** **60px**（整页拼装时预留）。  

---

## Token（摘录，与供稿对齐）

- `--color-darkgray: #0f131a`、`--color-midgray: #5c5f66`、`--color-lightgray: #919499`  
- `--color-brand: #ffe033`、`--color-price: #ff5533`  
- `--color-white: #ffffff`、`--color-bg: #f5f5f5`（或 `#F2F3F5`，以实现稿为准）  

数字体：**Fliggy Sans 102**（示例内 CDN `@font-face`）。  

---

## 产出

- [`manifest.md`](manifest.md)  
- 各模块 `spec.md` + `example.html`  

---

## 变更记录

| 日期 | 说明 |
|------|------|
| 2026-04-06 | 初版，对齐火车票首页框架供稿。 |
