# 机票 OTA — 商品卡与更多报价（`flight-ota-price-section`）

## 元信息

- **模块 slug**：`flight-ota-price-section`  
- **所属页**：`vertical.flight.ota`  
- **示例（默认）**：[`example.html`](example.html)（首坑 · 带辅营）  
- **变体**：[`example-02-bare-ticket.html`](example-02-bare-ticket.html)、[`example-03-crowd-price.html`](example-03-crowd-price.html)、[`example-04-selected-benefits.html`](example-04-selected-benefits.html)  
- **更多报价入口**：[`example-more-quotes.html`](example-more-quotes.html)  
- **依赖**：[`page-frame.md`](../../page-frame.md)、[`components/platform/widgets/price/spec.md`](../../../../../../components/platform/widgets/price/spec.md)  
- **最后同步**：2026-04-06  

---

## 用途

商品模块内的 **4 张报价卡**（共享 `goods-card` 骨架：价格列、权益行、预订按钮等）+ 列表收尾 **「更多报价」入口**。

---

## 装配顺序（与框架一致）

1. `example.html` — 首坑带辅营  
2. `example-02-bare-ticket.html` — 2 坑裸票  
3. `example-03-crowd-price.html` — 人群好价  
4. `example-04-selected-benefits.html` — 精选权益  
5. `example-more-quotes.html` — 更多报价  

卡片之间默认垂直间距 **18px**（整页由 `example-full.html` 体现）。

---

## 变更记录

| 日期 | 说明 |
|------|------|
| 2026-04-05 | 占位「报价区」。 |
| 2026-04-06 | 对齐四商品卡 + 更多报价；多文件变体。 |
