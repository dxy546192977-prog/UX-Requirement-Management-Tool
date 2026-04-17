# 机票首页 — 公告条（`flight-home-notice`）

## 元信息

- **模块 slug**：`flight-home-notice`
- **所属页**：`vertical.flight.home`
- **示例**：[`example.html`](example.html)
- **依赖**：[`foundations/design-foundations.md`](../../../../../../foundations/design-foundations.md)、平台 `notice-bar` 组件
- **最后同步**：2026-04-13

---

## 用途

机票首页 **横向通知条**，用于展示航变通知、天气预警、疫情政策等即时信息。基于平台 `notice-bar` 组件，适配机票业务场景。

---

## 规格摘要

| 项 | 值 |
|----|-----|
| 容器 `.flight-notice` | **702×72**，圆角 **var(--radius-m)** |
| 背景 | 渐变 `linear-gradient(90deg, var(--color-notice-tint), var(--color-white))` |
| 左侧图标 | **28×28** 喇叭图标，`var(--color-pay-2)` |
| 文案 | **24px/400 var(--color-darkgray)**，单行截断 `text-overflow: ellipsis` |
| 右侧 | 箭头 **24×24 var(--color-lightgray)** 或 关闭按钮 **24×24** |

---

## 结构与层次

```
.flight-notice（走平台 notice-bar DOM）
├── .notice-icon（喇叭）
├── .notice-text（滚动/静态文案）
└── .notice-action（箭头 / 关闭）
```

---

## 状态与变体

| 变体 | 说明 |
|------|------|
| **静态** | 单条文案，不滚动 |
| **滚动** | 多条文案纵向轮播，3s 间隔 |
| **可关闭** | 右侧显示关闭按钮，点击后隐藏 |
| **可跳转** | 右侧显示箭头，点击跳转详情 |

---

## 变更记录

| 日期 | 说明 |
|------|------|
| 2026-04-13 | 初版。 |
