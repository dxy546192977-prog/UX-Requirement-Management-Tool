# 机票列表 — 直飞卡片（`flight-list-flight-card`）

## 元信息

- **模块 slug**：`flight-list-flight-card`  
- **所属页**：`vertical.flight.list`  
- **示例（默认）**：[`example.html`](example.html)（**当日低价型**）  
- **变体示例**：[`example-cross-day.html`](example-cross-day.html)、[`example-direct-low-price.html`](example-direct-low-price.html)、[`example-cashback.html`](example-cashback.html)、[`example-few-seats.html`](example-few-seats.html)  
- **依赖**：[`page-frame.md`](../../page-frame.md)、[`components/platform/widgets/price/spec.md`](../../../../../../components/platform/widgets/price/spec.md)  
- **最后同步**：2026-04-06  

---

## 用途

**直飞** 列表单行卡片：时间/机场/航司/标签/权益行/价格列等；多 **变体** 对应不同高度与信息组合。

---

## 变体与文件

| 变体 | 文件 | 要点 |
|------|------|------|
| 当日低价型 | `example.html` | 顶标「当日低价」+ 权益行（返现金、飞飞乐等） |
| 跨天型 | `example-cross-day.html` | 到达侧跨天日期（深色小字） |
| 直飞低价型 | `example-direct-low-price.html` | 顶标「直飞低价」，无权益行 |
| 返现金型 | `example-cashback.html` | 权益行 + 含共享等 |
| 少量余票型 | `example-few-seats.html` | 较矮卡高，价格区加宽 |

---

## 共享规格（摘录）

- 宽 **750px**，项间 **1px solid var(--color-bg)** 底分隔。  
- 中间大箭头切图：**124×68**（见各 `example`）。  
- 时间：**Fliggy Sans 102**，**42px**，**700**，`--color-primary`。  

完整尺寸、标签与权益组合见供稿 **`输出组件/直飞卡片/README.md`**。

---

## 变更记录

| 日期 | 说明 |
|------|------|
| 2026-04-05 | 单卡占位。 |
| 2026-04-06 | 五变体 HTML + 对齐 listing 还原说明。 |
