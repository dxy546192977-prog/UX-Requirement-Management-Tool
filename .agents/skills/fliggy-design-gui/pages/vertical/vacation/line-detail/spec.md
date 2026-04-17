# 线路商品详情（`vertical.vacation.line_detail`）— 页面结构与滚动

## 元信息

- **page_id**：`vertical.vacation.line_detail`（与 [docs/page-index.md](../../../../docs/page-index.md) 一致时引用）  
- **参考实现**：[example.html](example.html)（**唯一** HTML/CSS 真相源；无 `modules/`、`manifest.md`）  
- **来源**：由用户本地 **`线路商详/product-detail.html`** 迁入；配图当前为 **外链**（`images.unsplash.com`、`gw.alicdn.com` 等），后续可收敛至 [foundations/image-library.md](../../../../foundations/image-library.md)。  
- **依赖**：[foundations/design-foundations.md](../../../../foundations/design-foundations.md)  
- **编排入口**：[SKILL.md](../../../../SKILL.md)  
- **最后同步**：2026-04-12  

---

## 生成纪律（使用 FDG Skill 时必读）

本页在仓库中 **已有完整 `example.html`**。使用 **Fliggy Design GUI** 生成或改稿时：

1. **意图必须为 A 或 B**：以 **[example.html](example.html)** 为 **唯一 DOM/CSS 基线**（可整段拷贝后再改文案/换图），**禁止**归为 **C 类「创意发挥」** 后按泛化「旅游商详」重画一套（常见错误：Tab 变成「行程/点评/详情」、中间换成「AI 点评总结」、底栏变成「收藏/客服/分享」+「想要/立即预订」等）。  
2. **状态栏与导航**：位于 **`.status-overlay`** 内，叠在头图上；**不得删除** `.status-bar`、`.nav-bar` 及右侧操作位。  
3. **配图**：示例内为 **外链占位**；正式稿须按 [image-library.md](../../../../foundations/image-library.md) 替换为 **素材库 URL**，且与业务语义一致（避免出现与线路无关的占位图）。  

若用户**明确要求**更换信息架构或从零设计，须在对话中**显式写出**「放弃仓库 line-detail 示例」后再按 C 类执行。

---

## 一、滚动方式（与 `tabs.home` 的对照）

| 维度 | `tabs.home` | 本页 `vertical.vacation.line_detail` |
|------|----------------|----------------------------------------|
| 文档滚动 | **`body` / `main.page`** 承载主内容纵向滚动 | **`body`** 承载主内容滚动；根容器 **`.page-container`** 为 **750px** 居中画布，**`padding-bottom: 172px`** 为底栏让位 |
| 固定顶区 | `header-bg-scrim`、`titlebar`、固定搜索条等叠在视口 | **无**与首页同构的独立「白底 scrim 顶栏」；**状态栏 + 导航**叠在 **头图**（`.media-container`）上，随 **`.header-section`** 与文档 **一起滚离视口**（沉浸式头图） |
| 头图内信息 | — | **`.status-overlay`** 顶暗角渐变；**`.slider-counter`** 右下张数；**`.tab-indicator-section`** 在头图下方、随文档流（非固定） |
| 固定底区 | `fdl-tabbar` + 安全区 | **`.bottom-bar`** — **`position: fixed`**，`bottom: 0`，**`left: 50%` + `translateX(-50%)`**，`width: 750px`，内含 **icon 导航 + 双主按钮 + Home Indicator 区** |

**说明**：本页是 **商详长页 + 底栏固定**，与首页 **「固定顶 + 可滚 Feeds + 固定底 Tab」** 的骨架不同；编排时以 **[example.html](example.html)** 为准，勿把首页 **`--home-content-offset-top`** 等 token 直接套入。

---

## 二、设计 Token（`:root`）

示例内已声明 **`--color-darkgray`**、**`--color-pay-1`**、**`--spacing-*`**、**`--radius-*`** 等，与 FDG foundations 语义对齐；新增字段时优先 **复用已有变量**，避免魔法数扩散。

---

## 三、主内容纵向顺序（自上而下）

样式与 DOM 以 [example.html](example.html) 为准；以下为 **阅读地图**：

| 顺序 | 区块 | 类名 / 说明 |
|:----:|------|-------------|
| 1 | 头图区 | **`.header-section`** — **750×750**；`#productGallery` 内 **横滑轮播**（脚本 `touchstart/move/end` + `translateX`）；底 **`.gradient-overlay`**、**`.slider-counter`** |
| 2 | 头图内顶栏 | **`.status-overlay`** — **`.status-bar`**（时间 + 示意图标）+ **`.nav-bar`**（返回、分享、收藏、更多） |
| 3 | 头图下 Tab | **`.tab-indicator-section`** — 图片 / 商品特色 / 用户印象 / 商家服务（示例为 **切换 active 态**，未接锚点滚动） |
| 4 | 商品信息卡 | **`section.info-card`** — 券后价、券条、品牌条、标题、保障条、评分摘要 |
| 5 | 日历与套餐 | **`.package-selector`** — **`.calendar-section`** 横滑日期 + **`.package-list`** 套餐卡列表 |
| 6 | 套餐详情摘要 | **`.package-summary`** — 行程维度列表（玩/住/团/交通/餐食等） |
| 7 | 行程卡片列表 | **`.itinerary-section`**（示例内多日 **`.itinerary-card`**） |
| 8 | 图文详情 | **`section.details-section`** — **`.details-content`** 限高 + **`.expand-footer`** 渐变遮罩与「展开全部」 |
| 9 | 底操作栏 | **`section.bottom-bar`** — 固定于视口底（见第一节） |

---

## 四、间距与卡片宽（对齐 `tabs.home` 心智）

| 类型 | 规则 |
|------|------|
| 通栏 | **750**：头图、底栏、日历横滑轨等与 **`.page-container`** 同宽。 |
| 内容白卡 | **`.info-card`** 等为 **714px** 宽 + **左右 `margin: 0 18px`**（与首页主内容 **约 30px 边距** 同量级）；模块间竖向间距大量使用 **`var(--spacing-md)`（18px）** 与 **`gap`**。 |

---

## 五、配图与资源

- 当前示例：**无** 本地 **`assets/`**；头图与详情图为 **HTTPS 外链**。若产品要求离线可预览，应迁入 **`assets/`** 并改 `src` 为相对路径，同时在本文 **元信息** 中补充 **`assets/`** 说明（比照 `vertical.hotel.booking`）。  

---

## 六、维护约定

- 头图轮播 **`slideWidth`** 与 **`.slider-slide` 宽** 须保持 **750** 一致。  
- 修改底栏高度时，同步 **`.page-container` 的 `padding-bottom`**，避免末段内容被遮挡。  

---

## 七、变更记录

| 日期 | 说明 |
|------|------|
| 2026-04-12 | 新增 `vertical.vacation.line_detail`：`product-detail.html` → `example.html`，并撰写本 spec。 |
