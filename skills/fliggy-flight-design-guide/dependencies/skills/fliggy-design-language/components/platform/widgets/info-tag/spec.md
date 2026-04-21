# 信息标签（Info Tag）

## 元信息

- **slug**：`info-tag`  
- **分类**：平台通用 — 小组件（taxonomy **「气泡」** 对应本实现：卡片/按钮上的信息角标，非 IM 会话气泡）  
- **依赖**：[`foundations/design-foundations.md`](../../../../foundations/design-foundations.md)  
- **最后同步**：2026-04-05  

---

## 概述

小巧、高对比的 **信息标签**，用于突出「热销」「新品」「官方」「限时优惠」等 **≤4 字** 短文案。定稿视觉为 **固定外框尺寸** + **左上 / 右上 / 右下大圆角、左下小圆角**（`border-radius: 14px 14px 14px 2px`）。

---

## 使用场景

- **适合**：营销强调、状态背书、短时活动提示。  
- **不适合**：长句说明；文案超出固定宽度导致截断或换行（需改设计或换组件）。  

---

## 视觉规范（@2x px）

| 项 | 规范 |
|----|------|
| 外框 | **宽 92px，高 28px**（`inline-flex` + 固定宽高） |
| 内边距 | **4px 6px**（上下 4、左右 6） |
| 字号 / 字重 | **20px**，`font-weight: 400`，`line-height: 1`，`text-align: center`，`white-space: nowrap` |
| 默认背景 | `var(--color-pay-1)`（对应 `#FF5533`） |
| 默认字色 | `var(--color-white)` |
| 圆角 | `border-radius: 14px 14px 14px 2px`（TL, TR, BR, BL）。**14px / 2px 为组件专用尺度**，与全局 `--radius-s/m/l` 不对齐；若未来纳入 foundations，再改为 `var(--*)`。 |
| 阴影（可选） | `box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1)`，仅增强层次，非品牌 token。 |
| 预览页背景 | `var(--color-bg)`（供稿 `#f0f2f5` 与 `--color-bg` `#f2f3f5` 接近，统一用 token）。 |

---

## 结构与层次

```text
.fdl-info-tag   — 单行内联 flex，文案可直接为文本子节点
```

- 推荐 **BEM** 类名 `fdl-info-tag`（供稿为 `.info-tag`，落地统一前缀）。  
- 贴在卡片角上时：`position: absolute; top: 0; right: 0;`（或由设计指定边）。

---

## 状态与变体

- **默认**：`background: var(--color-pay-1)`，`color: var(--color-white)`。  
- **自定义色**：须使用 foundations 已注册 token，**禁止**随意 hex。  

---

## 参数约定（供设计 / 实现对照）

| 参数 | 含义 | 默认 |
|------|------|------|
| `text` | 标签文案（建议 ≤4 字） | — |
| `color` | 背景 | `var(--color-pay-1)` |
| `textColor` | 字色 | `var(--color-white)` |

---

## 产出物

- **spec.md**：本文件。  
- **example.html**：[`example.html`](example.html)（含居中预览 + 卡片角标示例）  

---

## 变更记录

| 日期 | 说明 |
|------|------|
| 2026-04-05 | 初版：描述 md 规范化；token 化颜色。 |
| 2026-04-05 | 合并供稿 html：固定 92×28、padding 4px 6px、圆角 14/14/14/2、字重 400；viewport 按 FDL 使用 `width=750`。 |
