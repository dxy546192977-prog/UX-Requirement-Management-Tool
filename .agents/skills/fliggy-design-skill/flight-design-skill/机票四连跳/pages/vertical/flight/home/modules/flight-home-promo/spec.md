# 机票首页 — 营销横滑（`flight-home-promo`）

## 元信息

- **模块 slug**：`flight-home-promo`
- **所属页**：`vertical.flight.home`
- **示例**：[`example.html`](example.html)
- **依赖**：[`foundations/design-foundations.md`](../../../../../../foundations/design-foundations.md)、平台 `banner` + `carousel-bar` 组件
- **最后同步**：2026-04-13

---

## 用途

机票首页 **营销 Banner 横滑区**，展示会员日、大促活动、航司直减、里程兑换等营销信息。基于平台 `banner` 组件，支持多卡横滑 + 分页条。

---

## 规格摘要

| 项 | 值 |
|----|-----|
| 容器 `.flight-promo` | 宽 **750**（通栏），内容区 **702** 居中 |
| 单卡 `.promo-card` | **702×148**，圆角 **var(--radius-l)**，底图 + 蒙版 + 文案 |
| 蒙版 | `linear-gradient(90deg, rgba(0,0,0,0.45) 0%, transparent 70%)`，左深右透 |
| 标题 | **Fliggy Fonts 36px/500 var(--color-white)**，italic，左下 |
| 副标题 | **24px/400 var(--color-brand-1)**，标题下方 |
| 右侧箭头 | **48×48** 白色圆底箭头，`var(--color-white)` 背景 20% 透明 |
| 分页条 `.promo-indicator` | 底部居中，走 `carousel-bar` 规范；≤3 全条，>3 条+点 |
| 卡片间距 | **12px**（横滑 `scroll-snap-type: x mandatory`） |

---

## 结构与层次

```
.flight-promo
├── .promo-scroll（横滑容器，overflow-x: auto）
│   ├── .promo-card
│   │   ├── .promo-bg（底图 background-image）
│   │   ├── .promo-mask（渐变蒙版）
│   │   ├── .promo-title（Fliggy Fonts 标题）
│   │   ├── .promo-subtitle（副标题）
│   │   └── .promo-arrow（右侧箭头）
│   ├── .promo-card × N
└── .promo-indicator（分页条）
```

---

## 状态与变体

| 变体 | 说明 |
|------|------|
| **单卡** | 仅 1 张，无分页条，无横滑 |
| **多卡横滑** | 2~5 张，横滑 + 分页条 |
| **大促态** | 卡片右上角叠加 `tag-promo` 角标（如「双11」） |

---

## 交互

- 横滑切换卡片，`scroll-snap-align: start`
- 点击卡片 → 跳转活动落地页
- 分页条跟随滚动位置高亮

---

## 变更记录

| 日期 | 说明 |
|------|------|
| 2026-04-13 | 初版。 |
