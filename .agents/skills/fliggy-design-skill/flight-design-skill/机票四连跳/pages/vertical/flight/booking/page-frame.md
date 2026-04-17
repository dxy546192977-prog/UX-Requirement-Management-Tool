# 机票下单页框架（`vertical.flight.booking`）

## 元信息

- **page_id**：`vertical.flight.booking`
- **设计基准**：**750px** 宽；`viewport` **`width=750, user-scalable=no`**
- **依赖**：[`foundations/design-foundations.md`](../../../../foundations/design-foundations.md)
- **最后同步**：2026-04-13

---

## 三层固定框架

1. **顶部**：750×514 品牌渐变（`var(--color-brand-1)` → `var(--color-brand-4)` → 透明，`z-index: -1`）+ **fixed 导航栏** 88px（透明 → 滚动后白底 `.scrolled`），标题「填写订单」居中。
2. **内容区**：`padding: 112px 18px 0`（88 导航 + 24 间距）、`flex column`、`gap: 18px`；`body` 预留 **`padding-bottom: 160px`** 给底栏。
3. **底部支付栏**：fixed，750×140，左侧总价（可展开明细）+ 右侧「去支付」胶囊按钮。

宽屏下 **body `max-width: 750px` 居中**。

---

## 主内容流（串联顺序）

| 顺序 | 内容 | 模块 slug |
|------|------|-----------|
| 1 | 航班信息卡（航程时间轴 + 航司 + 舱等 + 行李 + 退改摘要） | `flight-booking-flight-info` |
| 2 | 乘机人信息（多人表单：姓名/证件/生日） | `flight-booking-passenger` |
| 3 | 联系人信息（手机号 + 邮箱） | `flight-booking-contact` |
| 4 | 航空保险（延误险/取消险/意外险，可选） | `flight-booking-insurance` |
| 5 | 附加服务（选座/餐食/行李加购/贵宾厅，可选） | `flight-booking-addon` |
| 6 | 优惠券（可用券列表 + 兑换码输入） | `flight-booking-coupon` |
| 7 | 价格明细（票价 + 税费 + 保险 + 附加 - 优惠 = 总价） | `flight-booking-price-detail` |
| 8 | 协议信息（购票须知 + 退改规则 + 隐私协议勾选） | `flight-booking-agreement` |
| 9 | 底部支付栏（总价 + 去支付按钮） | `flight-booking-bottom-pay-bar` |

---

## Token（摘录，与 foundations 对齐）

- 顶部渐变起：`var(--color-brand-1)` (#FFE033)
- 顶部渐变止：`var(--color-brand-4)` (#FFF7CC)
- 卡片背景：`var(--color-white)`
- 价格强调：`var(--color-pay-1)` (#FF5533)
- 支付按钮：`var(--color-pay-1)` 底 + `var(--color-white)` 字
- 保障标签：`var(--color-green-0)` (#149AA8)

数字体：**Fliggy Sans 102**（CDN `@font-face`）。

---

## 产出

- [`manifest.md`](manifest.md)
- [`example-full.html`](example-full.html) — 完整下单页
- `modules/*/spec.md` — 各模块规范

---

## 变更记录

| 日期 | 说明 |
|------|------|
| 2026-04-13 | 初版。 |
