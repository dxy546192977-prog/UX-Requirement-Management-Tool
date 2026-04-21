# 选项卡 Tab（样式三 · 胶囊分类导航栏）

## 元信息

- **slug**：`tabs-style-3`  
- **分类**：平台通用 — **导航**（taxonomy **「选项卡 Tab」— 样式三）  
- **依赖**：[`foundations/design-foundations.md`](../../../../foundations/design-foundations.md)；叠图场景配图见 [`foundations/image-library.md`](../../../../foundations/image-library.md)  
- **最后同步**：2026-04-05  

---

## 概述

**横向滚动的胶囊 Tabs**（列表始终 **`overflow-x: auto`**、**`gap: 12`**、隐藏滚动条）。**双档尺寸**：**`fdl-tabs-style-3--sm`** 半透明白底 + 选中靛浅底与靛字（适合 **叠在摄影图/彩色底**）；**`fdl-tabs-style-3--lg`** 白底深字 + 选中 **品牌黄**（适合 **浅灰/白页内筛选**）。定位 **次级 / 三级筛选或子分类**，一般不作应用主导航。

供稿 `pill-tabs` / `pill-tabs__*` / `pill-tabs--sm|lg` → **`fdl-tabs-style-3`** / **`fdl-tabs-style-3__*`** / **`fdl-tabs-style-3--sm`** | **`fdl-tabs-style-3--lg`**。

---

## 使用场景

- 列表页 **筛选 chips**（精选、好评、有图等）。  
- 模块内 **子分类切换**（收藏：酒店 / 景点 / 攻略）。  
- **小档**：头图、Banner 下沿、半透明顶栏下方等 **需要透底** 的区域。  
- **大档**：白或 **`--color-label`** 类浅底内容区。  
- **不宜**：与 **filter-tag**（选项标签）同屏重复同一套语义时未区分层级。

---

## 视觉规范（@2x px）

| 项目 | 小档 `--sm` | 大档 `--lg` |
|------|-------------|-------------|
| 列表水平 padding | **0 24** | **0 30** |
| 链高 | **48** | **60** |
| 链水平 padding | **24** | **30** |
| 胶囊圆角 | **`border-radius: 9999px`** | 同左 |
| 字号 / 行高 | **24** / **1.4** | **28** / **1.4** |
| 默认底 / 字 | `color-mix(in srgb, var(--color-white) 72%, transparent)` · **`var(--color-midgray)`** · 400 | **`var(--color-white)`** · **`var(--color-darkgray)`** · 400 |
| 选中底 / 字 | `color-mix(in srgb, var(--color-indigo-1) 12%, transparent)` · **`var(--color-indigo-1)`** · 500 | **`var(--color-brand-1)`** · **`var(--color-darkgray)`** · 500 |

**动效**：底 / 字色 **0.3s**（供稿一致）。

---

## 结构与层次

```text
nav.fdl-tabs-style-3.fdl-tabs-style-3--sm | fdl-tabs-style-3--lg（aria-label 如「筛选」）
  └── ul.fdl-tabs-style-3__list
        └── li.fdl-tabs-style-3__item [+ --active]
              └── a.fdl-tabs-style-3__link
```

根 **`overflow: hidden`** 包住横向滚动列表（供稿一致）。

---

## 状态与变体

| 变体 | 未选中 | 选中 |
|------|--------|------|
| `--sm` | 半透明白 + 中灰字 | 靛 12% 混透明底 + 靛字 Medium |
| `--lg` | 白底 + 深灰字 | 品牌黄底 + 深灰字 Medium |

---

## 可访问性

- **`nav` + `aria-label`**。  
- 当前项 **`a[aria-current="true"]`**。  
- **`focus-visible`**：建议 `outline: 2px solid var(--color-indigo-1)`（大档黄底上仍可见）。

---

## 与样式一、二差异

| | 样式一 | 样式二 | 样式三 |
|--|--------|--------|--------|
| 形态 | 顶栏均分/横滑 + 指示条 | 托起渐变块 | **独立胶囊**、**始终可横滑** |
| 尺寸主题 | 单一 | 单一 | **sm / lg** 两档 |
| 典型场景 | 频道主分类 | 强焦点频道 Tab | **筛选 / 子分类** |

---

## 产出物

- **spec.md**：本文件。  
- **example.html**：[`example.html`](example.html)（小档底图使用 **image-library** 酒店池 URL，禁止外链占位图）。  

---

## 变更记录

| 日期 | 说明 |
|------|------|
| 2026-04-05 | 样式三供稿落地：`pill-tabs*` → `fdl-tabs-style-3*`；半透明/靛浅混色用 `color-mix` + token；双示例 + CDN 底图。 |
