# 轻提示（Toast）

## 元信息

- **slug**：`toast`  
- **分类**：平台通用 — **反馈**（taxonomy **「轻提示 Toast」**）  
- **依赖**：[`foundations/design-foundations.md`](../../../../foundations/design-foundations.md)  
- **最后同步**：2026-04-05  

---

## 概述

**非模态、短时居中条**：**`fixed`** 视口 **50%/50%** 居中，**深底 + 白字**（底 **`color-mix(in srgb, var(--color-darkgray) 80%, transparent)`** 对应供稿 **80% 黑**），**`--radius-l`**，**`pointer-events: none`**。文案 **30px**、**行高 170%**、**`min-width: 180`** **max-width: 360**、**`padding: 30px 36`**。显隐 **`fdl-toast--visible`** + **`opacity` / `transform scale`** **0.3s**；展示时长由业务定（示例 **3s**）。

供稿 `toast` / `toast__*` / `is-visible` → **`fdl-toast`** / **`fdl-toast__*`** / **`fdl-toast--visible`**。

---

## 使用场景

- 成功反馈：已复制、已保存、发送成功。  
- 轻错误：网络超时、格式不支持（无需立即处理）。  
- 状态一句：已切换主题等。  
- **禁止**：需确认/分支选择 → 用 **Dialog**；长文/多操作 → 用 **Sheet** 或页面。

---

## 视觉规范（@2x px）

| 项目 | 值 |
|------|-----|
| 定位 | **`left: 50%`** **`top: 50%`** **`translate(-50%, -50%)`**；隐藏时 **`scale(0.95)`**，显示 **`scale(1)`** |
| 底 / 字 | 见概述；字 **`var(--color-white)`** |
| 圆角 | **`var(--radius-l)`** |
| 内边距 | **30** 上下 **36** 左右 |
| 文案区 | **`min-width: 180`** **`max-width: 360`**，**居中** |
| 字号 | **30** Regular |
| 层级 | **`z-index`** 高于 Dialog/Sheet（示例 **2000**） |

---

## 结构与层次

```text
div.fdl-toast [+ --visible]（role="status" aria-live="polite"；可见性变化时同步 aria-hidden）
  └── p.fdl-toast__text
```

---

## 交互与无障碍

- **不可点**：**`pointer-events: none`**。  
- **读屏**：**`role="status"`** + **`aria-live="polite"`**；更新文案前先 **`fdl-toast--visible`** 再改文本，或同时更新以保证播报。  
- **隐藏**：移除 **`--visible`** 后可将 **`aria-hidden="true"`**。  
- 连续触发须 **清除上一段定时器** 再展示新文案（示例脚本）。

---

## 产出物

- **spec.md**：本文件。  
- **example.html**：[`example.html`](example.html)  

---

## 变更记录

| 日期 | 说明 |
|------|------|
| 2026-04-05 | 初版：`toast*` → `fdl-toast*`；底 token 化；短/长文案双触发示例 + aria。 |
