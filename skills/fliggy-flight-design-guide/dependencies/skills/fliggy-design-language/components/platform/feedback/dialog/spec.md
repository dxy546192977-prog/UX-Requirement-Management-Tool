# 对话框（模态 Dialog）

## 元信息

- **slug**：`dialog`  
- **分类**：平台通用 — **反馈**（taxonomy **「对话框」**）  
- **依赖**：[`foundations/design-foundations.md`](../../../../foundations/design-foundations.md)；**身体配图**见 [`foundations/image-library.md`](../../../../foundations/image-library.md)  
- **最后同步**：2026-04-05  

---

## 概述

**居中模态卡片**：**半透明遮罩** + **白底圆角面板**（**`--radius-l`**），**头 / 身 / 脚** 三段式。身体可 **纯文案**、**配图** 或组合；脚部 **双按钮**（次 **`--color-label`** 底 + **`--color-midgray`** 字，主 **`--color-brand-1`** 底 + **`--color-darkgray`** 字）或 **单主按钮**；可选 **`__meta`** 补充说明（积分扣除等）。供稿 `dialog-overlay` / `dialog-modal__*` → **`fdl-dialog`** / **`fdl-dialog__*`**；显隐用根 **`fdl-dialog--visible`**。

---

## 使用场景

- 破坏性操作 **确认**、登录/离开 **二次确认**。  
- **结果反馈**、轻量 **警告/重试**。  
- **版本更新 / 新功能**（标题 + 图 + 主行动点）。  
- **不宜**：高频打断、可非模态完成的信息（优先 Toast / 内联）。

---

## 视觉规范（@2x px）

| 项目 | 值 |
|------|-----|
| 遮罩 | 全屏 **`fixed`**；**`background: color-mix(in srgb, var(--color-darkgray) 60%, transparent)`**（供稿 60% 黑，收敛为 **darkgray 混透明**）；**`z-index`** 由页面约定（示例 **1000**） |
| 面板 | **`width: 600`**（@2x），**`max-height: 90vh`**，**`var(--color-white)`**，**`border-radius: var(--radius-l)`**，**`overflow: hidden`**；入场 **`scale(0.95)→1`** + 遮罩 **`opacity`**，**0.3s** |
| 头 | **`padding: 36px 30px 18px`** |
| 标题 | **36px** Medium、居中、**`var(--color-darkgray)`** |
| 身 | **`padding: 0 30`**，**`overflow-y: auto`** |
| 正文 | **30px** Regular、**行高 170%**（段落）、居中、**`var(--color-darkgray)`** |
| 配图 | **`width: 100%`**，`**border-radius: var(--radius-m)**` |
| 脚 | **`padding: 24`** |
| 按钮行 | **`display: flex`**，**`gap: 18`**；单按钮时一项 **`flex: 1`** 即可撑满 |
| 按钮 | 高 **84**，**`border-radius: 9999px`**，**30px** Medium；主/次见概述 |
| **meta** | **24px**、行高 1.4、**`var(--color-lightgray)`**、居中，**`margin-top: 24`**（相对按钮行） |

---

## 结构与层次

```text
div.fdl-dialog [+ --visible]（点击遮罩关闭时绑定于此层；关闭时 aria-hidden="true"）
  └── div.fdl-dialog__panel（role="dialog" aria-modal="true" aria-labelledby → 标题 id）
        ├── header.fdl-dialog__header
        │     └── h2.fdl-dialog__title#…
        ├── div.fdl-dialog__body
        │     ├── p.fdl-dialog__text（可选）
        │     └── img.fdl-dialog__image（可选，CDN 见 image-library）
        └── footer.fdl-dialog__footer
              ├── div.fdl-dialog__actions
              │     └── button.fdl-dialog__btn [+ --primary | --secondary] ×1～2
              └── p.fdl-dialog__meta（可选）
```

---

## 状态与变体

| 变体 | 脚部 |
|------|------|
| 标准 | 次 + 主 |
| 单按钮 | 仅 **`fdl-dialog__btn--primary`** |
| 带 meta | 双按钮或单按钮 + **`__meta`** |
| 图片身 | **`__body`** 内 **`__image`**（建议 **`alt`** 有意义） |

---

## 交互与可访问性

- **打开**：根加 **`fdl-dialog--visible`**，**`aria-hidden="false"`**；焦点移至面板内第一可聚焦元素（生产必备；示例可简）。  
- **关闭**：点遮罩层本身、点按钮回调；建议 **Escape** 关闭（示例实现）。  
- **点击面板内容区**不得冒泡关闭（仅 **`e.target === overlay`** 关闭）。  
- **`role="dialog"`**、**`aria-modal="true"`**、**`aria-labelledby`** 绑定标题。  
- **`button:focus-visible`**：轮廓 **`var(--color-indigo-1)`**。  

---

## 产出物

- **spec.md**：本文件。  
- **example.html**：[`example.html`](example.html)  

---

## 变更记录

| 日期 | 说明 |
|------|------|
| 2026-04-05 | 初版：`dialog-modal*` → `fdl-dialog*`；色/圆角 token 化；示例图改 **image-library**；Escape 关闭。 |
