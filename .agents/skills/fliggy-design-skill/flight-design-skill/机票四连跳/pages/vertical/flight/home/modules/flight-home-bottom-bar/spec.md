# 机票首页 — 频道底栏（`flight-home-bottom-bar`）

## 元信息

- **模块 slug**：`flight-home-bottom-bar`
- **所属页**：`vertical.flight.home`
- **示例**：[`example.html`](example.html)
- **依赖**：[`foundations/design-foundations.md`](../../../../../../foundations/design-foundations.md)、平台 `tabbar` 组件
- **最后同步**：2026-04-13

---

## 用途

机票频道内 **底部导航栏**（5 入口），用于频道内页面切换。**非** App 全局 `tabs.*` 五大 Tab。

---

## 规格摘要

| 项 | 值 |
|----|-----|
| 容器 `.flight-bottom-bar` | `position: fixed; bottom: 0`；**750×145**（Tab 81px + 安全区 64px） |
| 背景 | `var(--color-white)`，顶部 **1px** `var(--color-bg)` 分割线 |
| 布局 | `display: flex; justify-content: space-around; align-items: center` |
| 单项 `.bar-item` | 宽 **150**，居中 |
| 图标 | **44×44**，未选 `var(--color-lightgray)`，选中 `var(--color-darkgray)` |
| 选中态图标底 | **60×60** 圆底 `var(--color-brand-1)`，图标白色 |
| 文案 | **20px/400**；未选 `var(--color-lightgray)`，选中 `var(--color-darkgray)` |

---

## 入口清单（5 个）

| 位置 | 名称 | 图标语义 | 选中态 |
|------|------|---------|--------|
| 1 | 推荐 | 首页/星标 | 黄圆底 ✓ |
| 2 | 我的行程 | 行李箱 | — |
| 3 | 航班动态 | 飞机+时钟 | — |
| 4 | 客服 | 耳机 | — |
| 5 | 更多 | 九宫格 | — |

---

## 结构与层次

```
.flight-bottom-bar
├── .bar-item.active（推荐 — 选中）
│   ├── .bar-icon-wrap（黄圆底 + 白图标）
│   └── .bar-label
├── .bar-item（我的行程）
│   ├── .bar-icon
│   └── .bar-label
├── .bar-item × 3
```

---

## 状态与变体

| 状态 | 说明 |
|------|------|
| **选中** | 图标底部黄圆 + 文案加粗变深 |
| **未选** | 灰色图标 + 灰色文案 |
| **带角标** | 个别入口右上角红点（如「我的行程」有新订单） |

---

## 变更记录

| 日期 | 说明 |
|------|------|
| 2026-04-13 | 初版。 |
