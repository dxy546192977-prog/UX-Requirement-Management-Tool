# 双排推荐 Feeds

## 元信息

- **slug**：`feeds-dual-column`  
- **分类**：平台通用 — 小组件（taxonomy **「内容流 / 双列卡片」**）  
- **依赖**：[`foundations/design-foundations.md`](../../../../foundations/design-foundations.md)（`Fliggy Sans 102`、主色与灰阶可与 token 对齐）  
- **最后同步**：2026-04-12  

---

## 概述

首页及频道常用的 **双列瀑布式推荐区**：中间 **690px** 内容宽、列 **336px**、列间距 **18px**；左侧可含 **顶部 Banner（轮播位）**，下列 **商品/内容卡**；右侧为 **一列卡片**。底层 **750 宽灰底渐变**（`__bg`）用于与通栏页面衔接，需在 **750 设计宽度** 下居中。

类名统一为 **`fdl-feeds-dual`** / **`fdl-feeds-dual__*`**；页面级外边距（如上间距 24px、底 padding）由 **`fdl-feeds-dual-wrap`** 承担，接入方也可去掉 wrap 自行控制。

---

## 结构

```text
.fdl-feeds-dual-wrap（可选：页面包一层，居中 + margin/padding）
  └── .fdl-feeds-dual（690 双列容器，position: relative）
        ├── .fdl-feeds-dual__bg（绝对定位 750 宽，贴页面中线）
        │     ├── .fdl-feeds-dual__bg-top（顶 60px 白→灰渐变）
        │     └── .fdl-feeds-dual__bg-solid（灰底延伸块，默认高度 1595px，可按业务加长）
        ├── .fdl-feeds-dual__col.fdl-feeds-dual__col--left
        │     ├── .fdl-feeds-dual__banner（可选；示例用 .fdl-feeds-dual__banner--demo 带图）
        │     │     └── .fdl-feeds-dual__dots + .fdl-feeds-dual__dot--on|--off
        │     └── .fdl-feeds-dual__card（×N）
        └── .fdl-feeds-dual__col.fdl-feeds-dual__col--right
              └── .fdl-feeds-dual__card（×N）

.fdl-feeds-dual__card（.fdl-feeds-dual__card--tall|--mid|--xl 固定总高，与供稿一致）
  ├── .fdl-feeds-dual__media（336×336 头图；业务用 background-image 或 --ex1…--ex4 示例修饰符）
  │     ├── .fdl-feeds-dual__tag（可选，浅底；.fdl-feeds-dual__tag--dark 深底）
  │     ├── .fdl-feeds-dual__loc（可选：头图左下地理胶囊；黑半透明底、**宽度随文案**、文案**左对齐**；`max-width` 不超出头图，过长省略号）
  │     └── .fdl-feeds-dual__play（可选，视频角标）
  └── .fdl-feeds-dual__body
        ├── .fdl-feeds-dual__titles
        │     └── .fdl-feeds-dual__title-row × N
        │           ├── .fdl-feeds-dual__title-main
        │           ├── .fdl-feeds-dual__pill + .fdl-feeds-dual__pill-text（可选）
        │           └── .fdl-feeds-dual__title-sub（可选）
        ├── .fdl-feeds-dual__desc（可选：.fdl-feeds-dual__rating / .fdl-feeds-dual__desc-long）
        ├── .fdl-feeds-dual__price-row
        ├── .fdl-feeds-dual__split（可选）
        └── .fdl-feeds-dual__review + .fdl-feeds-dual__review-text（可选）
```

---

## 尺寸（@2x px，与当前供稿一致）

| 区域 | 数值 |
|------|------|
| 双列容器宽 | 690 |
| 单列宽 | 336 |
| 列 gap | 18 |
| Banner 高 | 440 |
| 卡片头图 | 336 × 336，上圆角 12 |
| 卡片总高（修饰符） | tall **538** / mid **492** / xl **565** |
| 指示条（点） | 24 × 6，圆角 3px 0；选中 `#ffe033` |
| 地理标签 `.fdl-feeds-dual__loc` | `inline-flex` + `max-width: calc(100% - 24px)`（相对头图），底/左各 **12px** margin；内边距 **6×12**；底 `rgba(15,19,26,0.7)`（≈ `--color-darkgray-70`）；圆角 **48**（胶囊） |
| 标题主/副 | 28 / 500 / 140% |
| 价格数字 | 42 / Fliggy Sans 102 / 600；货币 24 |

**说明**：固定卡片高度为 **设计稿对齐** 用；若业务内容增高，可改为 **去掉高度修饰符** 或 **仅 min-height**，需另过视觉验收。

---

## 颜色（可与 foundations token 对齐）

| 用途 | 色值 / token |
|------|----------------|
| 页面灰底 | `#f2f3f5`（≈ `--color-bg`） |
| 卡片底 | `#ffffff` |
| 主文 | `#0f131a`（darkgray） |
| 辅文 / pill 字 | `#5c5f66`（midgray） |
| 评分 | `#6666ff`（indigo-1） |
| 价格 | `#ff5533`（pay-1） |
| 浅标签底 | `#feebd8` |
| 深标签底 / 地理胶囊底 | `rgba(15,19,26,0.7)`（≈ `--color-darkgray-70`）；地理条为 **随文案宽度** 的左下胶囊，非通栏 |
| 评价归类底 | `#fef5ec`，字 `#805540` |

---

## 依赖与接入

1. **样式**：与仓库内多数平台组件一致，写在 **[`example.html`](example.html)** 的 `<style>` 中（查找注释 **`fdl-feeds-dual（组件本体`**）。接入其他页面（如 `pages/tabs/home/example.html`）时 **复制该段 CSS** 到页面 `<style>`，并与 `example.html` **保持同步**。  
2. 页面加载 **Fliggy Sans 102**（与 [`widgets/price`](../price/spec.md) 相同 CDN 即可）。  
3. 头图/Banner：**勿依赖** `--ex1…--ex4` 生产环境；示例修饰符仅用于静态 demo，线上用 **内联 `style` 或业务 class** 设置 `background-image`。  
4. **`.fdl-feeds-dual__bg-solid` 高度** 默认 1595px；列表更长时请 **加大 height** 或改为 **min-height**，避免底部露白。

---

## 无障碍（建议）

- Banner / 卡片头图：对可点击区域使用 **`a` + `href`** 或 **`role="button"`** + **`aria-label`**。  
- 轮播点：当前为视觉示意，真实轮播需 **`role="tablist"`** / **`aria-selected`** 等。  
- 视频角标：父级补充 **`aria-label="播放视频"`**。

---

## 产出物

- **spec.md**：本文件。  
- **example.html**：[`example.html`](example.html)（含 **内联** 组件样式 + 完整 DOM 示例）  

---

## 变更记录

| 日期 | 说明 |
|------|------|
| 2026-04-08 | 从 `pages/tabs/home/example.html` 沉淀为独立组件，类名规范为 `fdl-feeds-dual__*`。 |
| 2026-04-08 | 去掉独立 `feeds-dual-column.css`，样式并入 `example.html`；首页复制同段 CSS 引用组件。 |
| 2026-04-12 | 地理标签 `.fdl-feeds-dual__loc`：左对齐文案、黑半透明胶囊宽度随内容（`inline-flex` + `max-width`），`pages/tabs/home/example.html` 内联样式同步。 |
