# 个人中心 Feeds（`mine-feeds`）

## 元信息

- **模块 slug**：`mine-feeds`  
- **示例**：[`example.html`](example.html)  
- **依赖**：[`foundations/design-foundations.md`](../../../../../foundations/design-foundations.md)、[`components/platform/widgets/price/spec.md`](../../../../../components/platform/widgets/price/spec.md)  
- **最后同步**：2026-04-05  

---

## 用途

**双列**推荐流（总宽 **690px** 居中，列 **336px**，列间距 **18px**，卡片纵向间距 **18px**）。  
- **顶 60px**：白 → 浅灰 **垂直渐变**（与供稿「背景层」一致）  
- **主体背景**：`#F2F3F5`（`--color-bg`）  
- **左列顶部**：**轮播大卡** **336×440**，圆角 **12**，底 **3** 点指示器  
- **卡片通用**：图区 **336×336**，仅 **上圆角 12**；内容区白底 **下圆角 12**，内边距 **12 / 12 / 18**；主标题 **28 / 500**；价格 **42** 数字 **Fliggy Sans 102**，色 **`#FF5533`**

---

## DOM

- **`.fdl-mine-feeds`**  
- **`.fdl-mine-feeds__top-fade`**（60px 高渐变带）  
- **`.fdl-mine-feeds__grid`**（flex 双列，`gap: 18px`）  
- **`.fdl-mine-feeds__col`**  
- **`.fdl-mine-feeds__carousel`**  
- **`.fdl-mine-feeds__card`**  

---

## 说明

完整 **`feeds-component-done.html`** 未随稿提供时，本示例按框架 **表格示例**（西湖游船 / 灵隐寺 / 莫干山 / 千岛湖）做 **结构占位**；角标、视频播放钮、评价归类等 **按数据扩展**。

---

## 变更记录

| 日期 | 说明 |
|------|------|
| 2026-04-05 | 初版。 |
