# 机票列表页框架（`vertical.flight.list`）

## 元信息

- **page_id**：`vertical.flight.list`  
- **设计基准**：**750 × 1624px（@2x）**；`viewport` **`width=750, user-scalable=no`**  
- **供稿对齐**：`fliggy-design-flight-listing-skill/框架组件.md` + `输出组件/`（还原基准另见该包内 `listing.png`、`listing css.txt`、`example.html`）  
- **依赖**：[`foundations/design-foundations.md`](../../../../foundations/design-foundations.md)  
- **最后同步**：2026-04-06  

---

## 全局壳与固定区

| 区域 | 规格 | 说明 |
|------|------|------|
| **页面壳** `.page` | `width: 750px; margin: 0 auto` | 整页预览时水平居中 |
| **导航栏** | **吸顶**，**176px**（状态栏 **88** + 栏 **88**） | `position: fixed; top: 0; left: 50%; transform: translateX(-50%); width: 750px; z-index: 9999`；白底 |
| **底 bar** | **吸底**，**160px**（按钮区 **96** + 安全区 **64**） | `position: fixed; bottom: 0; left: 50%; transform: translateX(-50%); width: 750px; z-index: 9999` |
| **可滚动内容区** | 上下留白 | `padding-top: 176px; padding-bottom: 160px` |

---

## `:root` Token（列表页扩展，与供稿一致）

实现时可在整页或各模块 `example.html` 中复用下列变量（名称以供稿为准）：

- **文字**：`--color-primary: #0E131B`、`--color-secondary: #90949A`、`--color-muted: #5B5F67`、`--color-price: #FF4119`、`--color-accent: #009DAA`、`--color-indigo: #6666FF`  
- **面**：`--color-white`、`--color-bg: #F2F3F5`、`--color-bg-light: #F7F8FA`、`--color-bg-card: #FAFAFA`  
- **线**：`--color-border`、`--color-divider`  
- **选中 / 快筛**：`--color-selected`、`--color-selected-bg`、`--color-selected-border`、`--color-chip-border` 等  
- **圆角**：`--radius-xl: 24px`、`--radius-l: 12px`、`--radius-m: 6px`、`--radius-s: 4px`  

数字体：**Fliggy Sans 102**（CDN 与 FDL 其他页一致，见各模块示例 ` @font-face`）。

---

## 模块排列顺序（固定）

1. **导航栏** — `flight-list-header`  
2. **日历** — `flight-list-date-bar`  
3. **营销条** — `flight-list-promo-bar`  
4. **快筛栏** — `flight-list-sort-tabs`  
5. **直飞卡片列表** — `flight-list-flight-card`（多条；多种变体见该模块下 `example*.html`）  
6. **省钱推荐**（可选；当前整页还原稿可省略）— `flight-list-savings-strip`  
7. **分割**（直飞 / 中转之间）— `flight-list-transfer-divider`  
8. **中转快筛栏** — `flight-list-transfer-filter`（**独立** `.transfer-filter-wrapper` 骨架，**不可**复用顶部快筛 DOM；内层滚动最小宽约 **854px**）  
9. **中转卡片列表** — `flight-list-transfer-card`（多条；**6** 种变体见 `example*.html`）  
10. **心智模块** — `flight-list-mind-module`  
11. **底 bar** — `flight-list-footer-bar`  

---

## 间距与分隔规则（摘录）

- 日历 ↔ 营销条 ↔ 快筛栏 ↔ 首张直飞卡：**无额外间距（紧贴）**。  
- **直飞卡片**之间：**1px solid #F2F3F5** 底部分隔。  
- **分割区**：高 **90px**，背景 `#F2F3F5`；左右 **220×1** 分割线切图 + 上下边界线（见 `flight-list-transfer-divider`）。  
- **中转卡片**之间：同 **1px** 底部分隔。  
- **中转箭头**：起飞/降落间统一 **124×68** 直飞同款切图；`可平躺` 后及联程/通程优惠外侧小箭头 **12×7**；中转标签左右内边距 **8px**，宽随文案。  

---

## 产出

- [`manifest.md`](manifest.md)  
- 各模块 `spec.md` + `example.html`（及直飞/中转多 `example-*.html` 变体）  

---

## 变更记录

| 日期 | 说明 |
|------|------|
| 2026-04-05 | 初版骨架。 |
| 2026-04-06 | 对齐 `框架组件.md`：固定区高度、Token、全链路模块顺序与间距规则。 |
