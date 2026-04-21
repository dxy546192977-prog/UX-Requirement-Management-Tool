# 机票首页 — 特价机票（`flight-home-special-fares`）

## 元信息

- **模块 slug**：`flight-home-special-fares`  
- **所属页**：`vertical.flight.home`  
- **示例**：[`example.html`](example.html)  
- **依赖**：[`foundations/design-foundations.md`](../../../../../../foundations/design-foundations.md)、[`components/platform/widgets/price/spec.md`](../../../../../../components/platform/widgets/price/spec.md)（价格展示原则）  
- **最后同步**：2026-04-05  

---

## 用途

**特价机票** 推荐卡：淡紫渐变容器 + 标题/城市下拉 + 一级主题 Tab（横滑）+ 国内/国际二级切图 + 筛选行 + **5** 条航班 + 「更多低价方案」按钮。

---

## 实现说明

- **一级 Tab 字体**：设计稿为方正隽黑 + `skewX(-8deg)`；仓库示例无该字体 CDN，使用 **PingFang SC** + **font-weight:500** + **skew** 近似。若后续有官方 Webfont，在示例中补 `@font-face` 即可。  
- **价格数字**：**Fliggy Sans 102**，**42px**，**#FF5533**（示例为 CDN **FliggySans102-Md.ttf**，`font-weight:700`）。  
- **排行角标**：使用 **`<img src="...">`** 指向 TOP1/2/3 切图；**勿**对 `img` 使用 `content: url()`（兼容性差）。  

---

## 规格摘要（摘录）

| 项 | 值 |
|----|-----|
| 外容器 | **702px** 宽，渐变 **#f5f5ff → #f8f8ff**，`backdrop-filter: blur(4px)`，圆角 **18px**，`padding: 24px` |
| 列表图 | **108×80**，圆角 **12px** |
| 底部按钮 | 背景 **#F5F5FF**，字色 **#6666FF**，圆角 **117px** |

根节点：**`fdl-flight-home-special-fares`** + **`deal-flights`**。

---

## 变更记录

| 日期 | 说明 |
|------|------|
| 2026-04-05 | 初版骨架。 |
| 2026-04-05 | 对齐供稿全结构；角标与字体说明。 |
