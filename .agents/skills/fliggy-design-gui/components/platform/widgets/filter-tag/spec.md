# 选项标签（筛选标签）

## 元信息

- **slug**：`filter-tag`  
- **分类**：平台通用 — 小组件（taxonomy **「筛选标签」**；交互上为 **选项卡片 / Choice Tag**）  
- **依赖**：[`foundations/design-foundations.md`](../../../../foundations/design-foundations.md)（含 `--color-brand-2`）  
- **最后同步**：2026-04-05  

---

## 概述

用于 **尺码、颜色、问卷选项、搜索结果筛选** 等并列选项：比传统单选/复选框更 **块状、可扫读**。通过 **背景、边框、字重** 区分态；**复选选中** 时右下角为 **与圆角贴合的黄色角标 + 对勾**，与 **单选选中**（浅黄底 + 品牌黄描边、无角标）区分。

供稿类名 `choice-tag` / `choice-tag--selected-*` 已统一为 **`fdl-filter-tag`** 及下表修饰符。

---

## 结构

```text
.fdl-filter-tag                    — 可点击区域（建议 <button type="button">）
  ├── .fdl-filter-tag__text        — 文案（居中）
  └── .fdl-filter-tag__badge       — 复选角标容器（仅复选选中显示；pointer-events: none）
        └── svg                    — 24×21，黄底 + 深字对勾
```

**修饰符**

- `fdl-filter-tag--radio`：单选选中（浅黄底 `brand-2`、黄边 `brand-1`、字重 Medium）。  
- `fdl-filter-tag--multi`：复选选中（黄底 `brand-4`、无边框、显示角标、字重 Medium）。  
- `:disabled`：不可选（灰底同默认、文案 `auxiliary`）。  

---

## 视觉规范（@2x px）

| 状态 | 背景 | 边框 | 字重 | 角标 |
|------|------|------|------|------|
| 未选 | `var(--color-label)` | `1px solid transparent`（占位，避免选中时跳动） | Regular | 无 |
| 单选选中 | `var(--color-brand-2)` | `1px solid var(--color-brand-1)` | Medium (500) | 无 |
| 复选选中 | `var(--color-brand-4)` | `transparent` | Medium (500) | 右下 24×21 SVG |
| 禁用 | `var(--color-label)` | `transparent` | Regular | 无 |

| 几何 | 值 |
|------|-----|
| 默认尺寸（示例） | 宽 **230** × 高 **72**，水平内边距 **18** |
| 圆角 | `var(--radius-s)`（6px） |
| 字号 / 行高 | **26px**，行高约 **1.4** |
| 文案色 | 默认 / 选中：`var(--color-darkgray)`；禁用：`var(--color-auxiliary)` |

**动效**：背景、边框、字重等 `transition` 约 **0.2s ease-in-out**。  
**布局**：根节点 **勿** 对整块设 `overflow: hidden`，以免裁切右下角角标形状。

---

## 无障碍（建议）

- 使用 `<button type="button">`，禁用用原生 `disabled`。  
- 单选组：各按钮 `role="radio"` + 父级 `role="radiogroup"` + `aria-checked`；或保留 radio 控件仅样式化为本组件（更利于表单）。  
- 复选：`aria-pressed="true|false"` 或关联隐藏 checkbox。  
- 角标为纯装饰，可对 `svg` 设 `aria-hidden="true"`。  

---

## 产出物

- **spec.md**：本文件。  
- **example.html**：[`example.html`](example.html)  

---

## 变更记录

| 日期 | 说明 |
|------|------|
| 2026-04-05 | 供稿落地；`choice-tag` → `fdl-filter-tag`；色/圆角 token 化；foundations 增补 `--color-brand-2`（单选选中底）。 |
