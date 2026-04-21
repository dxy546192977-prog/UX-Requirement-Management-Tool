# 酒店订单详情页框架（`vertical.hotel.order`）

## 元信息

- **page_id**：`vertical.hotel.order`  
- **设计基准**：**750px**；`viewport` **`width=750, user-scalable=no`**  
- **依赖**：[`foundations/design-foundations.md`](../../../../foundations/design-foundations.md)  
- **固定框架原文**：[design-framework-components.md](design-framework-components.md)（导航 176px、黄头 480px、主内容区、底栏 134px、通栏规范）  
- **最后同步**：2026-04-06  

---

## 固定框架（四层）

1. **黄底背景**：`absolute`，750×480，`#FFE566`，`z-index: 1`，随文档流滚动。  
2. **顶栏**：`fixed`，高 **176px**（状态栏 88 + 导航 88），透明底；返回 + 更多。  
3. **主内容**：`padding-top: 176px`，左右 **24px**；`body` / 稿中预留 **`padding-bottom: 250px`** 避让底部区。  
4. **底部操作栏**：`fixed`，总高 **134px**（内容 100 + 安全区 34），三按钮（酒店 / 客服 / 直播客服）。  

**交叉销售条**：`fixed`，`bottom: 134px`，叠在底栏上方（见 [`example-full.html`](example-full.html)）。

宽屏下 **body `max-width: 750px` 居中**；黄底、顶栏、交叉销售、底栏使用 **`left: 50%` + `translateX(-50%)`** 与稿宽对齐。

---

## 主内容流（`example-full.html` 顺序）

| 顺序 | 区块 | 切片模块 slug |
|------|------|----------------|
| 1 | 订单状态头部 | `hotel-order-status-header` |
| 2 | 价格 + 政策通栏 | `hotel-order-price` + `hotel-order-policy-hint`（整页内合一卡片） |
| 3 | 酒店信息卡 | `hotel-order-hotel-card` |
| 4 | 房型日期 + 入住人 | `hotel-order-room-date`；入住人见 `hotel-order-guest-info`（整页内嵌于房型块） |
| 5 | 会员权益 | `hotel-order-member-benefits` |
| 6 | 订单信息 | `hotel-order-info` |
| 7 | 常见问题标签 | `hotel-order-faq-tags` |
| — | 交叉销售（主内容外） | `hotel-order-cross-sell` |
| — | 底部操作栏 | `hotel-order-bottom-actions` |

编排以 **整页 HTML** 为真相源；切片用于独立预览与复用。

---

## 资源

- 切图：**[`assets/`](assets/)**  
- 模块内：`../../../assets/`  

---

## 变更记录

| 日期 | 说明 |
|------|------|
| 2026-04-06 | 初版：Design_DNA_Order 迁入。 |
