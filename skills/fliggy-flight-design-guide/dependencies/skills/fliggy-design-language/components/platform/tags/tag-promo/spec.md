# 大促类标签（促销标签）

## 元信息

- **slug**：`tag-promo`  
- **分类**：平台通用 — **标签**（taxonomy **「大促类」**）  
- **依赖**：[`foundations/design-foundations.md`](../../../../foundations/design-foundations.md)（`--color-promo-1`、`--color-promo-2`、`--color-white`）  
- **最后同步**：2026-04-05  

---

## 概述

**小尺寸、高饱和** 营销角标：**双 11** 为红底 + **官方白标 SVG**；**预售** 等为紫底 + **白字加粗**。固定 **52×28**、**4px** 圆角；**非交互** 展示。

供稿类名 `promo-tag` / `promo-tag__*` / `promo-tag--*` 已统一为 **`fdl-tag-promo`** / **`fdl-tag-promo__*`** / **`fdl-tag-promo--*`**。

---

## 结构

```text
span.fdl-tag-promo（建议 role="img" + aria-label 当仅图标时）
  ├── span.fdl-tag-promo__icon   — 双11 等图形（内嵌 SVG）
  └── span.fdl-tag-promo__text   — 文案（如「预售」）
```

**修饰符**

- `fdl-tag-promo--double-11`：底 `var(--color-promo-1)`，内容 **`__icon`** + 官方路径 SVG（fill `var(--color-white)`）。  
- `fdl-tag-promo--pre-sale`：底 `var(--color-promo-2)`，内容 **`__text`**。  

---

## 视觉规范（@2x px）

| 项目 | 值 |
|------|-----|
| 尺寸 | **52 × 28** |
| 圆角 | **4** |
| 布局 | `inline-flex`，水平垂直居中 |
| 双11 SVG | 视口约 **37×19**，白填充 |
| 文案 | **22px**，`font-weight: 600`，`line-height: 1`，`color: var(--color-white)` |
| 字体 | `PingFang SC`（或项目中文主字体） |

---

## 无障碍（建议）

- **仅图标**：`role="img"` + **`aria-label="双11"`**（或活动全名）。  
- **文案款**：可见文字即可；若图标+字并存，避免 `aria-label` 与文案重复朗读。  

---

## 产出物

- **spec.md**：本文件。  
- **example.html**：[`example.html`](example.html)  

---

## 变更记录

| 日期 | 说明 |
|------|------|
| 2026-04-05 | 供稿落地；`promo-tag` → `fdl-tag-promo`；foundations 增补 `--color-promo-1/2`；viewport 750。 |
