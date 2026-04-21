# 机票列表 — 中转卡片（`flight-list-transfer-card`）

## 元信息

- **模块 slug**：`flight-list-transfer-card`  
- **所属页**：`vertical.flight.list`  
- **示例（默认）**：[`example.html`](example.html)（**普通中转型**）  
- **变体示例**：[`example-cross-day.html`](example-cross-day.html)、[`example-connecting-service.html`](example-connecting-service.html)、[`example-through-service.html`](example-through-service.html)、[`example-shared-flight.html`](example-shared-flight.html)、[`example-shared-play-one-day.html`](example-shared-play-one-day.html)  
- **依赖**：[`page-frame.md`](../../page-frame.md)、[`components/platform/widgets/price/spec.md`](../../../../../../components/platform/widgets/price/spec.md)  
- **最后同步**：2026-04-06  

---

## 用途

**中转** 列表卡片（与直飞 **不同** 骨架）：中间中转信息块 + 服务条 / 双 chip（联程、通程）+ 价格区；列表页真实稿共 **6** 种变体（含 **共享航班玩1天**）。

---

## 变体与文件

| 变体 | 文件 |
|------|------|
| 普通中转型 | `example.html` |
| 跨天中转型 | `example-cross-day.html` |
| 联程服务型 | `example-connecting-service.html` |
| 通程服务型 | `example-through-service.html` |
| 共享航班中转型 | `example-shared-flight.html` |
| 共享航班玩1天型 | `example-shared-play-one-day.html` |

---

## 共享规格（摘录）

- 卡片高多为 **212px**，内边距 **42px 30px 24px**，底 **1px** 分隔。  
- 中间块：**124×68** 航线箭头与直飞 **同款切图**；中转标签 **左右 padding 8px**；**玩1天** 系紫色 **#6666FF**。  
- `可平躺` 后小箭头、联程/通程优惠外侧箭头：**12×7** 切图。  

详参供稿 **`输出组件/中转卡片/README.md`**。

---

## 变更记录

| 日期 | 说明 |
|------|------|
| 2026-04-06 | 初版，六变体 HTML。 |
