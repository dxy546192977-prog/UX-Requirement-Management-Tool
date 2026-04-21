# 浮层（半屏 Bottom Sheet）

## 元信息

- **slug**：`sheet`  
- **分类**：平台通用 — **反馈**（taxonomy **「浮层」**）  
- **依赖**：[`foundations/design-foundations.md`](../../../../foundations/design-foundations.md)；与 [`dialog/spec.md`](../dialog/spec.md) 互为补充（**Dialog** 居中确认，**Sheet** 底出大内容）  
- **最后同步**：2026-04-05  

---

## 概述

**底部滑出**的 **白底面板**（顶圆角 **`--radius-l`**），**遮罩**略深于 Dialog（**`color-mix(in srgb, var(--color-darkgray) 70%, transparent)`**）。面板 **`min-height: 20vh`**、**`max-height: 85vh`**、**高度随内容**；**头 / 身 / 脚** 纵向 flex，**身体** **`flex: 1; min-height: 0; overflow-y: auto`** 以在触顶时独立滚动。**头** 固定 **88** 高、标题居中、**48×48** 关闭钮；**脚** 固定操作区 + **安全区**（**`padding-bottom` 含 `env(safe-area-inset-bottom)`**）。按钮与 Dialog 一致：**次 label 底**、**主 brand-1 底**。

供稿 `panel-overlay` / `half-panel__*` → **`fdl-sheet`** / **`fdl-sheet__*`**；显隐 **`fdl-sheet--visible`**。

---

## 使用场景

- 长文规则、活动说明、费用明细。  
- 列表页 **筛选 / 排序** 面板。  
- 多字段表单（乘机人、地址等）。  
- 关联列表（同店推荐、评价列表）。  
- **不宜**：仅需二选一确认且信息很短（优先 **Dialog**）。

---

## 视觉规范（@2x px）

| 项目 | 值 |
|------|-----|
| 遮罩 | 全屏 **`fixed`**；**70%** darkgray 混透明（见上）；**`z-index`** 与页面栈一致（示例 **1000**） |
| 面板 | **`width: 100%`** **`max-width: 750`**；**`min-height: 20vh`** **`max-height: 85vh`**；**`border-radius: var(--radius-l) var(--radius-l) 0 0`**；自底 **`translateY(100%) → 0`**，**0.3s ease-out** |
| 头 | 高 **88**，**`flex-shrink: 0`**；标题 **36** Medium、**`var(--color-darkgray)`** |
| 关闭 | **48×48**，距右 **24**，垂直居中；图标 **`currentColor`** = **`var(--color-darkgray)`** |
| 身 | **`padding: 0 30`**；**可滚动**（见概述 flex 约束） |
| 脚 | **`flex-shrink: 0`**，**`var(--color-white)`**；**`box-shadow: 0 -10px 20px -10px`** + **`color-mix(in srgb, var(--color-darkgray) 5%, transparent)`**（供稿浅影 token 化） |
| 按钮行 | **`padding: 24`**，底侧叠加 **`max(0px, env(safe-area-inset-bottom))`**（与 **24** 合并为 **`calc(24px + env(safe-area-inset-bottom, 0px))`**）；**`gap: 18`** |
| 按钮 | 高 **84**，**`border-radius: 9999px`**，**30** Medium；主/次同 Dialog |

---

## 结构与层次

```text
div.fdl-sheet [+ --visible]（aria-hidden；点遮罩关闭）
  └── div.fdl-sheet__panel（可选 role="dialog" aria-modal="true" aria-labelledby）
        ├── header.fdl-sheet__header
        │     ├── h2.fdl-sheet__title#…
        │     └── button.fdl-sheet__close（aria-label="关闭"）
        ├── div.fdl-sheet__body
        └── footer.fdl-sheet__footer
              └── div.fdl-sheet__actions
                    └── button.fdl-sheet__btn [+ --primary | --secondary] ×1～2
```

---

## 交互与可访问性

- **打开 / 关闭**：根 **`fdl-sheet--visible`**；**`aria-hidden`** 同步。  
- **关闭**：遮罩自身、关闭钮、操作钮（由业务决定）、**Escape**（示例）。  
- **焦点**：生产环境建议打开时移焦入面板、关闭时还原；与 Dialog 一致。  
- **`button:focus-visible`**：**`var(--color-indigo-1)`** 轮廓。

---

## 与 Dialog 差异

| | Dialog `fdl-dialog` | Sheet `fdl-sheet` |
|--|----------------------|-------------------|
| 位置 | 居中卡 **600** 宽 | **底出**，**满宽至 750** |
| 遮罩浓度 | 约 **60%** | 约 **70%** |
| 高度 | **`max-height: 90vh`** 整块卡 | **20vh～85vh** 随内容，**中部滚动** |
| 动效 | **scale** | **translateY** |

---

## 产出物

- **spec.md**：本文件。  
- **example.html**：[`example.html`](example.html)  

---

## 变更记录

| 日期 | 说明 |
|------|------|
| 2026-04-05 | 初版：`half-panel*` → `fdl-sheet*`；遮罩/阴影 token 化；安全区 `env`；双示例（长内容滚动 / 短内容 min-height）。 |
