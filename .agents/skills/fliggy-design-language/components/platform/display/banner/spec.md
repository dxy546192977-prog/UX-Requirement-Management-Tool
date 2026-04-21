# 营销横幅（Banner）

## 元信息

- **slug**：`banner`  
- **分类**：平台通用 — **展示**（taxonomy **「banner」**：首页/频道顶区 **702×148** 营销横卡，常与轮播组合）  
- **依赖**：[`foundations/design-foundations.md`](../../../../foundations/design-foundations.md)（**Fliggy Fonts**、`--color-brand-1`、`--color-darkgray`、`--color-white`、`--radius-m` 等）；配图须来自 [`foundations/image-library.md`](../../../../foundations/image-library.md)  
- **最后同步**：2026-04-05  

---

## 概述

**圆角横卡** **702×148**，**`--radius-m`**，**`overflow: hidden`**。层次从下到上：**底图**（`background-size: cover` + **`#d9d9d9` 或 `#e0e0e0` 级兜底**，允许硬编码）、**左→右线性渐变蒙版**（左侧饱和蓝、中段收束、右侧透明，保证左文可读）、**内容层**（**Fliggy Fonts** **60** **斜体** **白** 主标题 + **28** **`brand-1`** 副标题 + **28** 圆底 **`brand-1`** 内 **chevron `darkgray`**）、**左下横条分页**（**24×6** 胶囊条，默认 **`color-mix(in srgb, var(--color-white) 80%, transparent)`**，当前页 **`brand-1`**）。

供稿 `c-banner*` → **`fdl-banner`** / **`fdl-banner__*`**。**蒙版蓝** 在全局 `:root` 尚无旅行蓝 token 时，于页面/示例 `:root` 注册 **`--fdl-banner-mask-1`** / **`--fdl-banner-mask-2`** / **`--fdl-banner-mask-transparent`**（与供稿 `#19AAFD` → `#009CE7` → `rgba(1,157,232,0)` 对齐）；日后若 foundations 增补语义色，可迁移为 `var(--color-*)`。

**DOM 注意**：整卡可点进落地页时，**分页控件不得放在 `<a>` 内**（避免嵌套交互）。推荐 **`article.fdl-banner`** + **`a.fdl-banner__link`**（铺满内容区）+ **`nav.fdl-banner__pagination`**（`position: absolute`，`z-index` 高于链接）。

---

## 视觉规范（@2x px）

| 项目 | 值 |
|------|-----|
| 尺寸 | **702×148** |
| 内容区内边距 | **`padding: 22px 30px`**（与供稿一致；左与分页左对齐 **30**） |
| 主标题 | **Fliggy Fonts** **60** Medium **italic**，**`--color-white`**，行高约 **1.2** |
| 副标题行 | **28** **`--color-brand-1`**，与文案基线对齐 **`gap: 8`** |
| 箭头钮 | **28×28** 圆 **`--color-brand-1`**，内 **SVG** **16**，描边 **`--color-darkgray`** **2.5** |
| 分页 | **`bottom: 10px` `left: 30px`**，**`gap: 6`**；条 **24×6** **`--radius-s` 一半即 3px 圆角** |

---

## 结构与层次

```text
article.fdl-banner
  ├── ::before（渐变蒙版，z-index: 1）
  ├── a.fdl-banner__link（relative z-index: 2，块级、height: 100%，可含 aria-label）
  │     └── div.fdl-banner__content
  │           └── div.fdl-banner__text
  │                 ├── h2.fdl-banner__title
  │                 └── p.fdl-banner__subtitle
  │                       ├── span（文案）
  │                       └── span.fdl-banner__arrow（内嵌 SVG）
  └── nav.fdl-banner__pagination（absolute, z-index: 3, aria-label）
        └── button.fdl-banner__dot [+ --active] × N
```

---

## 状态与变体

- **分页**：**`fdl-banner__dot--active`** 表示当前帧；切换逻辑由外层 Swiper/轮播托管，本组件仅样式与可聚焦控件。  
- **蒙版主题**：可通过替换 **`--fdl-banner-mask-*`** 做绿/紫营销主题，须保持 **左深右透** 以保证白字对比。

---

## 可访问性

- **`a.fdl-banner__link`**：若标题不足以说明目的地，加 **`aria-label`**。  
- **`nav.fdl-banner__pagination`**：**`aria-label="轮播图页码"`**（或产品文案）。  
- **`button.fdl-banner__dot`**：**`type="button"`**，**`aria-label="第 N 页"`** / **`aria-current="true"`**（当前项）。  
- **`:focus-visible`**：**`outline: 2px solid var(--color-indigo-1)`**（链接与分页钮）。

---

## 产出物

- **spec.md**：本文件。  
- **example.html**：[`example.html`](example.html)  

---

## 变更记录

| 日期 | 说明 |
|------|------|
| 2026-04-05 | 初版：`c-banner*` → `fdl-banner*`；分页移出 `<a>`；底图改 image-library；蒙版 token `--fdl-banner-mask-*`。 |
