# 酒店下单页框架（`vertical.hotel.booking`）

## 元信息

- **page_id**：`vertical.hotel.booking`  
- **设计基准**：**750px** 宽；`viewport` **`width=750, user-scalable=no`**  
- **依赖**：[`foundations/design-foundations.md`](../../../../foundations/design-foundations.md)  
- **固定框架组件（供稿原文）**：[design-framework-components.md](design-framework-components.md)（渐变顶、内容区、底栏规范与可复制片段）  
- **最后同步**：2026-04-06  

---

## 三层固定框架（必须与供稿一致）

1. **顶部**：750×514 黄渐变（`z-index: -1`）+ **fixed 导航栏** 88px（透明 → 滚动后白底 `.scrolled`）。  
2. **内容区**：`padding: 112px 18px 0`（88+24）、`flex column`、`gap: 18px`；`body` 预留 **`padding-bottom: 160px`** 给底栏。  
3. **底部支付栏**：fixed，750×140，右对齐总价 + 「提交订单 / 立即支付」胶囊按钮。

宽屏下 **body `max-width: 750px` 居中**；顶栏、底栏、渐变与供稿对齐方式见 [`example-full.html`](example-full.html) 内样式。

---

## 主内容流（`example-full.html` 串联顺序）

与供稿 `hotel-booking.html` 一致，含未拆成独立组件的块（会员权益长图、预订提示条、无痕预订等）：

| 顺序 | 内容 | 独立模块 slug（若有） |
|------|------|------------------------|
| 1 | 酒店预订信息卡 | `hotel-booking-info-card` |
| 2 | 重要提醒 | `hotel-booking-notice-card` |
| 3 | 预订标签提示 + 入住信息 | `hotel-booking-checkin-card`（含 tip + 表单） |
| 4 | 会员权益（整图） | 仅 assets：`membership.png` |
| 5 | 挑战任务 | `hotel-booking-challenge-task-card` |
| 6 | F4 本单可享 | `hotel-booking-savings-card` |
| 7 | 支付方式 | `hotel-booking-payment-selector` |
| 8 | 发票报销 | `hotel-booking-invoice-card` |
| 9 | 无痕预订 | 内联于整页 |
| 10 | 出行保障 | `hotel-booking-protection-card` |
| 11 | 协议信息区 | `hotel-booking-agreement-section` |
| 12 | 底部支付栏 | `hotel-booking-bottom-pay-bar` |

---

## 资源

- 切图统一放在 **[`assets/`](assets/)**（与 `example-full.html` 中 `assets/…` 引用一致）。  
- 模块内预览：`modules/<slug>/example.html` 使用 **`../../../assets/`** 引用同级 `booking/assets/`。

---

## 产出

- [`manifest.md`](manifest.md)  
- [`example-full.html`](example-full.html) — 完整下单页（单一 HTML，含全部样式与脚本）  
- `modules/*/example.html` + `spec.md` — 可单独预览的切片  
- `modules/*/README.source.md` — 供稿组件说明（保留）  

---

## 变更记录

| 日期 | 说明 |
|------|------|
| 2026-04-06 | 初版：Design_DNA_Booking 迁入。 |
