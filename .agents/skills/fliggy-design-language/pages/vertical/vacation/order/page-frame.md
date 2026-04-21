# 度假订单详情页框架（`vertical.vacation.order`）

## 元信息

- **page_id**：`vertical.vacation.order`  
- **设计基准**：**750 × 1624px（@2x）**；`viewport` **`width=750, user-scalable=no`**  
- **页面背景**：`#F2F3F5`  
- **依赖**：[`foundations/design-foundations.md`](../../../../foundations/design-foundations.md)；**Token / 间距 / 滚动与吸附** 见 [design-framework-components.md](design-framework-components.md)  

---

## 布局结构（自上而下）

1. **顶部状态栏（fixed）** — `vacation-order-sticky-nav`（**176px**，叠在黄头上；透明→白底，标题 `0→1`，icon 终态 `#0F131A`）  
2. **黄头订单状态** — `vacation-order-yellow-header`（**501px** 区 + 底白圆角过渡；随页滚动上移，**不吸顶**）  
3. **白底紧密链（间距 0）**  
   - **服务保障** — `vacation-order-service-guarantee`  
   - **基础信息** — `vacation-order-basic-info`  
   - **凭证区** — `vacation-order-voucher`  
4. **间距 18px**（露出 `#F2F3F5`）后依次：  
   - **退改政策** — `vacation-order-refund-policy`  
   - **POI 卡信息** — `vacation-order-poi-info`  
   - **订单卡** — `vacation-order-transaction-card`  
   - **出行信息** — `vacation-order-travel-info`  
   - **二销模块** — `vacation-order-upsell`  
5. **底部 bar（fixed 吸底）** — `vacation-order-bottom-bar`（**175px** + safe-area）  

> **硬规则**：黄头→服务保障→基础信息→凭证区 **垂直间距 0**（白底相连）；凭证区之后各白底模块之间 **18px** 间隔。底 bar **不随滚动消失**。普通说明文案 **不要** 无故包一层无定义白卡（见框架文档双轨策略）。

---

## 产出

- [`manifest.md`](manifest.md)  
- [`design-framework-components.md`](design-framework-components.md)  
- 各模块 `spec.md` + `example.html`  
- [`example-full.html`](example-full.html)  

---

## 变更记录

| 日期 | 说明 |
|------|------|
| 2026-04-06 | 初版，对齐度假订详供稿。 |
