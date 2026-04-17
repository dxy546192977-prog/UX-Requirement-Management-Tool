---
name: fliggy-design-gui
version: 0.3.4
description: 飞猪 App 移动端页面生成 Skill。告诉我你想做什么（新增模块 / 修改现有页面 / 全新设计），我会先问清楚意图，再按飞猪设计规范生成单文件 HTML。支持酒店、机票、火车票、度假、汽车票、搜索等场景，输出可直接在手机浏览器预览。生成后自动做设计审查，关键问题清零才算完成。
---

# Fliggy Design GUI — 编排 Skill

本文件为 **唯一编排入口**。规范正文在仓库内 markdown/html，**禁止**在未命中触发条件时通读全部组件。

**spec_version**：与 `foundations/design-foundations.md` 的 `version` 对齐维护（当前 foundations **0.2.8**）。


## 意图识别（启用本 Skill 后优先执行）

在读取页面闭包或动手写 HTML 之前，必须先进行 **意图问答（2～4 轮）**，判断用户属于下列 **三类意图之一**。  
**硬规则：每次任务都要问，不得因为“看起来已经明确”而跳过。**

### 三类意图与编排策略

| 意图 | 典型表述 | 必须遵守 | 组件与模板 |
|------|----------|----------|------------|
| **A. 在现有页面上增加模块** | 「首页加一个 banner」「酒店列表加筛选项」 | **严格**使用目标页的 **现有模板**：`pages/tabs/...` 或 `pages/vertical/<行业>/<场景>/` 下的 **`example.html`** 与 **`spec.md`**（整页单文件真相源）；颜色、圆角、栅格、字体 **仅**通过 **design-foundations** 的 token（`var(--*)`）表达 | 先在 [`docs/component-index.md`](docs/component-index.md) 按 taxonomy **查询平台组件**。**命中则读 spec → 必要时 example → 再嵌入**。**无组件且无合理组合**时，才允许页面内 **token 自造**，并建议后续补组件与索引 |
| **B. 在现有页面上修改模块** | 「把搜索框变矮」「火车票 OTA 某模块改文案」 | 在 **已有模块的 DOM/结构语义** 上改造（除非用户明确要求删块重组）；**全程**基于 **design-foundations**（及页面已声明的 `:root` 扩展 token）改样式与文案，**禁止**为省事写规范外 hex/圆角 | 垂类页改对应场景 **`example.html`** 并同步 **`spec.md`**；**`tabs/member`** 改 [`pages/tabs/member/example.html`](pages/tabs/member/example.html) 并同步 [`pages/tabs/member/spec.md`](pages/tabs/member/spec.md)；平台能力仍走 **component-index → spec** |
| **C. 大改版 / 全新页面创意** | 「重新设计一版首页」「做一个活动落地页」 | **不强制**套用现有 manifest 闭包；可依提示词做版式与模块编排 **创意发挥** | **仍必须**遵守 **design-foundations** 与 [**image-library.md**](foundations/image-library.md)（若配图）。鼓励仍查阅 **component-index** 与 **pages/** 内相近场景复用模块切片 |

### 意图判定：禁止把「增模块 / 混合模块」误判为 C（强制）

以下情况 **一律归为 A 或 B，禁止归为 C**（除非用户**同时**明确说「不要现有页 / 从零重做 / 完全重新设计」）：

| 用户表述 | 正确分类 | 基线 |
|----------|----------|------|
| 「生成酒店首页，中间加双 11 模块」「标准酒店首页 + 某块」 | **A** | [`pages/vertical/hotel/home/example.html`](pages/vertical/hotel/home/example.html) + [`spec.md`](pages/vertical/hotel/home/spec.md) |
| 问答里选 **「混合模块」**（在标准页上叠营销/活动块） | **A** | 同上，或用户指定的 `page_id` 对应 **`example.html`** |
| 「沿用 tabs.home 的频道 / Feeds」「和推荐首页一样的频道+双列」 | **A** | [`pages/tabs/home/example.html`](pages/tabs/home/example.html) 中 **完整** `channel-wrap` 与 **`fdl-feeds-dual`** 区块（含样式），见下节 |
| 「改文案 / 改高度 / 换一张图」 | **B** | 当前页已有 DOM |
| 「生成线路商详 / 度假线路详情 / `vertical.vacation.line_detail`」或 **与仓库存稿像素级一致** | **A** | [`pages/vertical/vacation/line-detail/example.html`](pages/vertical/vacation/line-detail/example.html) + [`spec.md`](pages/vertical/vacation/line-detail/spec.md) — **整页为基线**，含：头图内 **状态栏 + 白字导航（返回/分享/收藏/更多）**、**四 Tab（图片/商品特色/用户印象/商家服务）**、**出发日历 + 套餐卡**、底栏 **咨询·店铺·收藏** 与 **加入购物车 / 立即购买**；**禁止**换成泛化商详（如「行程/点评/详情」、AI 点评块、「想要/立即预订」等）除非用户**书面**要求重做 IA |
| 用户只说「生成某 `page_id` 对应页」且 **page-index 已指向单文件 example** | **A**（默认） | 以该路径 **`example.html` 为唯一 DOM/CSS 真相源** 拷贝或在其上改；**不是 C**，除非用户同时声明 **从零重做 / 不要仓库示例** |
| 「`tabs.home` 首页改推荐词 / 金刚某格」「推荐首页在金刚与频道间加模块」等（基线为首页、未要求重做整页 IA） | **A** | 整页以 [`pages/tabs/home/example.html`](pages/tabs/home/example.html) 为底稿；**仅**在用户点名的区域改 DOM/文案，未点名区块必须与 example 一致——详见下节 **「A 类 · `tabs.home` 增模块」** |

**混合模块**在本 Skill 中的定义：**在仓库已有整页骨架上增加或替换局部模块**，不是「全新页面」。深度思考 / 计划阶段 **必须写明「Type A，基线文件：…」**；**禁止**写「Type C 全新页面」除非满足上一段排除条件。

### 意图与启动问答的衔接

- **A / B**：必须 **收敛目标页面**：优先 [`docs/page-index.md`](docs/page-index.md) 中的 **`page_id`**，或明确文件路径（如 `pages/vertical/hotel/list/spec.md`）。未给出 → **启动问答** 对齐。  
- **C**：`page_id` **可选**；问答收敛 **页面类型**（营销落地 / 列表 / 表单等）与 **是否配图**；若用户希望对齐仓库规范，可从 **page-index** 推荐最接近的垂类场景作参考。**注意**：仓库 **已有** `example.html` 的 `page_id`，用户若未明确说「不要示例 / 全新 IA」，**不得归为 C**；应归为 **A** 并打开对应 `example.html`。

### 三条硬纪律（三类意图通用）

1. **凡生成必最先读** [`foundations/design-foundations.md`](foundations/design-foundations.md)。  
2. **含真实配图** 时读 [`foundations/image-library.md`](foundations/image-library.md)。  
3. **A 类增模块**：**先组件库、后自造**；自造仅限 token，且需在回复中交代缺口。

### A/B 拷贝优先总规则（硬规则，默认适用）

适用：**意图 A / B** 且目标 `page_id` 在 [`docs/page-index.md`](docs/page-index.md) 已有对应 `example.html`。

1. **先拷贝，再修改**：交付文件必须先以目标页 `example.html` 作为底稿（整页 `<style>` + `<body>`），再进行局部改动。
2. **未点名区块不得重写**：用户未明确要求变更的模块，必须保持与基线 `example.html` 一致（DOM 子树 + 关联样式）。
3. **禁止空白起稿**：A/B 默认禁止从空白 HTML 起稿，除非用户书面要求「从零重做」并被判定为 C。
4. **摘要强制对照**：审查摘要必须列出「相对基线未改」与「实际改动」字段，不得只写笼统结论。


---

## 读取顺序（必须遵守，按意图微调）

**共性前置（始终）：**

1. [`foundations/design-foundations.md`](foundations/design-foundations.md)  
2. 若含真实配图：[`foundations/image-library.md`](foundations/image-library.md)  
3. 若涉及 icon / SVG：[`foundations/icon-svg.md`](foundations/icon-svg.md)（先按**别名**匹配，再取对应 icon）

完成上述 3 步后，按意图识别已判定的分支（A/B 或 C）进入对应读取链：

**A. 增模块 / B. 改模块 — 在共性前置之后：**

4. [`docs/page-index.md`](docs/page-index.md) 解析 **`page_id`** → **`spec.md` + `example.html`**
5. 读目标 **`spec.md`** 与 **`example.html`**：对齐固定头、安全区、滚动容器后再改 DOM
6. 平台组件：[`docs/component-index.md`](docs/component-index.md) — 仅 **命中项**的 **`spec.md`**；不足再读该组件 **`example.html`**（**`tabs/member`** 仍以 [`spec.md`](pages/tabs/member/spec.md) + [`example.html`](pages/tabs/member/example.html) 为闭包）

**C. 大改版 — 在共性前置之后：**

4. 按需查阅 [**page-index**](docs/page-index.md) 与 **相近场景的 `example.html`**，减少重复造轮子  
5. 按需查阅 **component-index** 复用 banner、price、tabbar 等

**闭包原则**：除上述路径外，**不**为「以防万一」打开未列入索引或未点名的文件。

**交付闭包**：对涉及 `pages/**/example.html` 的实现任务，在输出 HTML 后须接 **「设计审查（/design-review）」**（见下文专节）；**Key 未清零**不得作规范完成结项。

---

## 模块实装纪律（禁止「说明性灰块」占位，强制）

凡用户要求展示 **与 `tabs.home` 一致或可复用的「多功能频道」「双列 Feeds」**，或输出中出现「沿用 tabs.home」类表述时：

1. **必须**打开并基于 [`pages/tabs/home/example.html`](pages/tabs/home/example.html) **内联拷贝**（到目标单文件 HTML 的 `<style>` + `<body>`）下列结构的 **完整 DOM**，不得删减为一句文案：  
   - **`channel-wrap`** → **`channel-container`** 及其子树（至 `channel-card-*` / `sub-card` 等结束）；  
   - **`fdl-feeds-dual-wrap`** → **`fdl-feeds-dual`** 及其子树（含 `fdl-feeds-dual__bg`、双列卡片等，至 Feeds 区块结束）。  
2. **必须**同步拷贝上述区块在 `example.html` 中 **所依赖的 CSS**（同一 `<style>` 内已有选择器；若合并到其他页，须合并冲突选择器，禁止只留空壳 class）。  
3. **禁止**：用灰色矩形 + 说明文字（例如「首页频道模块（沿用 tabs.home…）」「首页双列 Feeds 模块…」）代替真实模块——**视为未通过规范**。  
4. 若仅需 Feeds 原子规范，可额外读 [`components/platform/widgets/feeds-dual-column/spec.md`](components/platform/widgets/feeds-dual-column/spec.md)，但 **整页拼接仍以 `tabs.home` 的 example 为真相源**，避免与现网 DOM 漂移。

**输出前自检（须在思考或文末显式确认）**：页面上是否存在可滚区域内的「仅文字描述的假模块」？若有，改为实装或从 example 拷贝。

---

## A 类 · `tabs.home` 增/改模块（整页拷贝再改，硬规则）

适用：**意图 A** 且 `page_id` 为 **`tabs.home`**（含「首页改金刚 / 频道」「推荐首页加某可滚模块」等）。**不是**从零画一版「看起来像飞猪的首页」。

1. **工作流（顺序不可打乱）**  
   - 先读 [`pages/tabs/home/spec.md`](pages/tabs/home/spec.md) 与 [`pages/tabs/home/example.html`](pages/tabs/home/example.html) 全量。  
   - **交付**：以 example 为底稿，**整页拷贝** `<style>` + `<body>`（含该页 `:root` 变量）到输出 HTML，再 **仅**在用户点名的区域改 DOM/文案/局部样式。  
   - **禁止**：不打开仓库 example、凭印象重写顶栏、固定搜索条、金刚区、底栏、频道或 Feeds。

2. **用户未书面要求替换 = 禁止改动（Key）**  
   以下子树须与仓库 example **DOM + 关联 CSS 一致**（仅允许为合并样式表做等价选择器合并，**禁止**改 class 语义、删子节点、换成「风格接近」的自制结构或 3D 重绘图标）：  
   - **固定层**：`status-bar`、`titlebar-container`、`search-box-fixed-wrap`（固定搜索条）及 spec 中「固定在视口」的头部渐变层  
   - **可滚区**：`search-module-wrap`（推荐词）、**`jinggang-wrap`（金刚区）**、**`fdl-tabbar`（一级底栏）**  
   - 若需求仅为改推荐词、金刚某一格、频道某卡等：**优先**只改对应 `search-module-wrap` / `jinggang-wrap` / `channel-wrap` 内局部；**`jinggang-wrap` 以下**的多功能频道与双列 Feeds **整段保持与 example 一致**（见上节「模块实装纪律」）。

3. **金刚与下方衔接**  
   **`jinggang-wrap` 下方**必须紧接 **未删减的** `channel-wrap` + `fdl-feeds-dual-wrap`（含样式），**禁止**用大段纹理底、空 `min-height`/`vh` 或 skeleton 充当「后续内容」。

4. **同条回复须写明（硬规则）**  
   用简短列表声明：**哪些区块与 `pages/tabs/home/example.html` 完全一致未改**；**实际改动的模块/类名**（如仅 `jinggang-wrap` 内某格）。不得笼统写「遵循 tabs.home」而无对照。

5. **可选锚点约定（推荐）**  
   为减少模型误改，可在基线页面中使用注释锚点限定可编辑区：
   - `<!-- FDG_EDIT_START:<module-id> -->`
   - `<!-- FDG_EDIT_END:<module-id> -->`
   规则：A/B 仅允许修改锚点内内容；锚点外视为基线保护区。若页面尚未加锚点，仍按「未点名区块不得重写」执行。

---

## 页面目录与 `page_id`（必读摘要）

- **总览**：[`pages/README.md`](pages/README.md) — `tabs/`（底栏）与 `vertical/`（行业场景）分工。  
- **路由表**：[`docs/page-index.md`](docs/page-index.md) — `tabs.*` 与 `vertical.<行业>.<场景>` → **`spec.md` + `example.html`**。  
- **底栏顺序**：[`docs/tab-pages-order.md`](docs/tab-pages-order.md)。  
- **垂类页典型闭包**（A/B 类）：[`spec.md`](pages/vertical/hotel/home/spec.md) + [`example.html`](pages/vertical/hotel/home/example.html)（路径随 `page_id` 替换；**`tabs/member`** 同形态）。
- **与平台组件关系**：业务块在页面 **`example.html`** 内拼装；原子能力仍以 **`components/platform/`** + [`docs/component-index.md`](docs/component-index.md) 为准。

---

## 页面编排 Guardrail（防大空白，强制）

以下规则用于避免首页/列表页出现“模块之间大面积留白”，**A/B/C 三类意图全部强制执行**：

1. 主内容区必须采用纵向流式布局（`display:flex; flex-direction:column` 或等价文档流）；禁止用 `position:absolute + top` 编排主流程模块。  
2. 模块间距必须由单一容器统一控制（推荐 `gap`）；禁止在多个模块上叠加大 `margin-top/margin-bottom`。  
3. 主流程模块禁止使用 `vh`/大 `min-height` 撑高；高度应由内容驱动（`height:auto`）。  
4. 固定头/固定搜索条存在时，必须使用 token 化占位（如 `--home-content-offset-top`），并保持“固定层高度”与“内容区 padding-top”同源。  
5. 任意两个相邻可见模块间垂直空白不得超过 `24px`（确有设计说明时可放宽到 `32px`，需在输出中说明理由）。  
6. 输出前必须执行一次“空白自检”：检查是否存在固定高度背景层、遗留 skeleton、异常占位节点导致的大空白。

---

## 组件选用规则（细化）

1. **A 类**：新增能力 → **先**在 component-index 按 taxonomy 查（如「banner」「价格」「Tabbar」）→ 有则 **引用平台组件** 的 DOM + 样式约定（内联或随页面 `:root` token）。**无**则 token 自造，并提示补组件与索引。  
2. **B 类**：以 **当前页已有模块** 为主；替换型需求（如统一换成平台 price 组件）→ 按索引引入对应平台组件。  
3. **C 类**：组件选用 **可选**；若用平台组件，仍通过索引 → spec → example。  
4. **整块复合结构**（价+主按钮+副操作等）→ 先组合现有平台组件，不臆造不存在的组件名。  
5. **仅原子级主/次按钮或链接** → 平台 button 规范 + design-foundations token。

---

## 启动问答（每次必做）

无论用户是否已提供明确 **`page_id`**、页面路径或改动描述，均需先执行 **2～4 轮**问答；可简短，但不得省略。

1. **Re-ground**：一句说明当前仓库与 FDG 任务。  
2. **意图确认**（若首轮未分三类）：增模块 / 改模块 / 大改版。  
3. **Simplify**：A/B 时确认「哪一页」；C 时确认页面类型与约束。  
4. **Recommend**：推荐最匹配的 `page_id` 或路径 + 一句理由。  
5. **选项**：A/B/C… 对应 [`docs/taxonomy.md`](docs/taxonomy.md) 与页面索引。

**结束条件**：意图 +（A/B 时）页面落点明确，再进入读取链；若用户拒绝补充信息，需明确记录默认假设后再继续。

---

## 输出与纪律

- 单文件 HTML + 内联 `<style>`；viewport 见 foundations「一、技术基准」。  
- 颜色、圆角仅用 `var(--*)`；`:root` 中可含 foundations 全量 token + 页面局部扩展（hex **仅**出现在 `:root`）。  
- `@font-face` 按需包含 foundations「字体」节。  
- **同一轮**优先读完当前意图下的闭包再输出；文件过多时可分轮，但 **不得**跳过 foundations。  
- **A 类**输出中建议简述：引用了哪些 `components/platform/...` 路径；若自造了块，说明索引缺口。  
- **A 类（酒店首页 + 活动块）**：以 [`pages/vertical/hotel/home/example.html`](pages/vertical/hotel/home/example.html) 为底稿，**仅**在约定位置插入/替换营销模块；**不得**整页重写为与本页 [`spec.md`](pages/vertical/hotel/home/spec.md) 无关的新 IA。  
- **A 类（线路商详 `vertical.vacation.line_detail`）**：以 [`pages/vertical/vacation/line-detail/example.html`](pages/vertical/vacation/line-detail/example.html) 为底稿；**头图区必须保留** `.status-overlay` 内 **`.status-bar` + `.nav-bar`**（含右侧三 icon），**禁止**输出无状态栏、无导航或仅单色头图占位。**配图**在示例中为外链占位；交付生产稿时应按 [`foundations/image-library.md`](foundations/image-library.md) 替换 URL，**不得**用无关占位图凑数。  
- 违反「模块实装纪律」的占位灰块：**不允许**作为最终交付。  
- **SVG / 内联图标（硬规则）**：凡与仓库 **页面 `example.html`** 或 **`components/platform/...` 示例** 中 **已有**的图标一致（导航、底栏、状态栏装饰、列表前缀等），必须 **从该源文件整段拷贝** 对应的 `<svg>...</svg>`（含 `viewBox`、`width`/`height`、`fill`、`path` 的 `d` 等 **全部属性与子节点**），**禁止**凭记忆重画、`path` **改写/缩写**、替换为近似图形或 Emoji。**仅当**业务明确要求新图标且源中不存在时，才可新增 SVG；新增须在输出说明中标注「无现成示例、自绘」，且仍须保证语法完整可解析。
- **Icon 别名检索（硬规则）**：当需求仅给语义词（如“返回”“电话”“定位”“收藏”）时，先查 [`foundations/icon-svg.md`](foundations/icon-svg.md)；该文件支持**一个 icon 对应多个别名**。实现时应先做别名命中，再引用对应 icon（URL 或 SVG 片段），避免语义偏差。
- **Icon 别名匹配优先级（硬规则）**：按以下顺序命中并在首次命中即停止：`精确别名完全匹配` → `主名称完全匹配` → `同义词别名匹配` → `语义关键词部分匹配`。若出现多个候选，优先 `当前页面已使用过的 icon`，其次选择 `语义更具体` 的项；仍无法唯一确定时，必须先向用户确认，不得自行猜测。
- **真实数据能力依赖（硬规则）**：要走“真实数据替换”，执行层依赖 **flyai skill**（安装：[ali-skills.alibaba-inc.com → flyai](https://ali-skills.alibaba-inc.com/skills/alibaba-flyai/flyai-skill/flyai)）；若环境中 flyai 不可用，则不得执行真实数据拉取。
- **真实数据能力检测前置（硬规则）**：默认先按 [`foundations/image-library.md`](foundations/image-library.md) 生成页面；在“生成后追问”之前，必须先检测 flyai 是否可调用。
- **真实数据替换流程（硬规则）**：检测可用时，页面生成完成后必须追加追问：`是否需要为你替换成真实飞猪数据？预计耗时约 X 分钟。` 用户明确同意后，才可进入 flyai 真实数据替换流程。
- **真实数据替换估时（硬规则）**：`2-4 分钟`（单模块或少量卡片）；`4-8 分钟`（酒店+机票或多区块）；`8-15 分钟`（整页多业务域与字段校验）。追问中的 `X` 必须按本分级填写，不得省略。
- **真实数据失败回退（硬规则）**：检测不可用时，必须提示：`检测到当前环境未安装 flyai 能力，暂无法拉取真实数据。可先使用素材库版本；如需真实数据，请先安装并启用 flyai。` 并自动回退素材库版本，保证流程不中断。
- **真实数据追问可见性（硬规则，防漏执行）**：凡本次交付的 HTML **含可替换为飞猪真实数据的业务内容**（商品名/价/酒店或线路标题、库存活动等，非纯占位文案），在 **flyai 可调用** 时，必须在 **用户可见正文** 中单独输出一段 **「真实数据追问」**（不得仅写在思考链/内部备注，也不得只塞进设计审查表格而不出现可读的问句）。问句须包含完整原文：`是否需要为你替换成真实飞猪数据？预计耗时约 X 分钟。`（`X` 已按上条估时替换为具体数字）。**仅当**用户在本轮已事先声明「不要真实数据 / 只要占位」或本轮为纯文档/索引任务时，可跳过追问，但须在可见说明中写一句 **「已跳过真实数据追问，理由：…」**。
- **真实数据与设计审查对齐**：执行了追问或跳过追问时，须在 **`## FDG 设计审查摘要`** 的 **「修复与同步」或单独一行** 写明：`真实数据追问：已发出 | 已跳过（理由）| 不适用（flyai 不可用）`，不得留空或含糊。
- **设计审查（必经，硬规则）**：凡 **新增** 或 **实质修改** 任意 `pages/**/example.html`，或 **新增** 页面场景目录（含 `spec.md` / 仅 spec 占位），在宣称 **任务完成、可合并、无需再改** 之前，必须执行下文 **「设计审查（/design-review）」** 并产出审查摘要；**Key 级问题未清零** 时，只能交付为 **「实现稿 / 待修复」**，不得表述为最终可入库稿。用户仅要求「读规范 / 改索引文案 / 不动 HTML」且确实未改 `example.html` 时，可声明 **审查豁免** 并说明理由。  
- **结语文禁（硬规则）**：同一条用户可见回复里，若使用「完成」「搞定」「成功生成」「已生成」等 **结语式收束**，则 **必须** 在同条回复中给出 **`## FDG 设计审查摘要`**（或 Markdown 同级标题）及第 6 节要求的字段；**缺少摘要块 = 未执行审查**，禁止宣称规范交付。  
- **站外单文件（硬规则）**：输出写在仓库外路径（如用户工作区 `*.html`）时，**审查与「相对基线 example 未改区块」声明仍适用**，不得以「未改仓库内 example」为由跳过。

---

## 设计审查（/design-review）

参考 gstack `/design-review` 的 **分级 → 修复 → 再验收** 思路，适配 FDG：**以 `design-foundations` + 页面 `spec.md` / `example.html` 真相源为核心**，不默认要求打开线上站点；若用户用浏览器本地打开 `example.html` 做视觉核对，可作为 **补充证据**，非替代规范审查。

### 1. 定位

- **目标**：把「符合飞猪 FDG 规范、可维护、spec 与实现对齐」从软建议变为 **交付门禁**。
- **不替代**：产品/用研决策、品牌大改版拍板、需设计稿对齐的像素验收（后者应另开「对照设计稿」任务）。
- **与创意（意图 C）**：C 类 **不**以「必须像某个垂类 `example.html`」为审查标准；审查重点是 **token / 配图与 icon 规则 / 输出形态 / 反模板化 slop**，以及 **自洽的主路径与层级**。

### 2. 必经门禁（完成定义，Definition of Done）

满足以下全部条件，才允许在回复中使用 **「已完成 / 可合并 / 规范交付」** 等结语：

1. 已按当前任务的 **意图 A / B / C** 完成实现（或明确仅为文档任务并适用豁免）。  
2. 已执行本节 **第 4 节审查清单**（深度见第 3 节），并产出 **第 6 节摘要模板**。  
3. **Key = 0**（无阻断项）。若仍存在 Key，必须改为：「实现已完成，审查未通过，阻断项如下：…」。  
4. **Medium** 默认同轮清零；若时间不足，须在摘要中列为 **明确待办** 并标影响，不得静默省略。  
5. **Low** 可在摘要中批量列出，允许登记后续优化，但不得与 Key 混淆。  
6. **意图 A / B 且涉及基线 `example.html`**：摘要中须有一句 **「相对基线 `example.html` 未改动的区块」**（列类名/模块名）与 **「实际改动的区块」**；含糊写「已对齐仓库」不算通过。

### 3. 审查深度

| 深度 | 适用 | 要求 |
|------|------|------|
| `quick` | 单文件小改、仅样式微调 | 至少覆盖 **规范一致性 + 真相源一致（若 A/B）** 中的 Key 项 |
| `standard`（默认） | 常规增删模块、整页调整 | Key + Medium 全覆盖 |
| `full` | 新场景页、链路多页、发布前 | Key + Medium + Low 全覆盖；多页时增加 **跨页一致性**（同类组件、状态栏、主色、圆角语言） |

用户未指定深度时，取 **`standard`**。

### 4. 审查清单（按意图分流）

#### 4.1 共性（A / B / C 均查）

| 项 | 说明 | 默认级别 |
|----|------|----------|
| Foundations | 已遵守 [`foundations/design-foundations.md`](foundations/design-foundations.md)；viewport、单文件 HTML、字体与字号规则未被绕过 | Key |
| Token | 颜色、圆角等使用 `var(--*)`；hex 仅出现在 `:root` 扩展 | Key |
| 边界 | 未混用 fliggy-design-skill 的 token 语义或另一套 `:root` | Key |
| 配图 | 若使用真实配图路径，符合 [`foundations/image-library.md`](foundations/image-library.md) 或该页既定策略；禁止无关占位凑数（与现有输出纪律一致） | Key |
| Icon / SVG | 与仓库已有示例一致时 **整段拷贝**；别名走 [`foundations/icon-svg.md`](foundations/icon-svg.md) | Key |
| 占位与实装 | 无「说明性灰块」替代 `channel-wrap` / `fdl-feeds-dual` 等应实装模块（见上文模块实装纪律） | Key |
| Guardrail | 主流程布局、固定头占位、相邻模块空白上限等符合 **页面编排 Guardrail** | Medium |
| AI Slop | 明显模板化 SaaS 风、无意义装饰、与飞猪业务气质严重不符的版式（结合常识判断） | Medium |
| 真实数据追问 | 含可替换业务数据且 flyai **可用**时，用户可见正文已发出标准问句；或已写明跳过理由；摘要中已登记「真实数据追问：…」 | Key |

#### 4.2 意图 A / B 追加（对齐真相源）

| 项 | 说明 | 默认级别 |
|----|------|----------|
| `page_id` 与路径 | 与 [`docs/page-index.md`](docs/page-index.md) 一致；新增页必须已登记（未登记 = **Key**） | Key |
| `spec.md` ↔ `example.html` | 结构、模块列表、已移除模块的表述一致；**二者冲突须在摘要中裁定并改一侧** | Key |
| 基线 DOM | A 类增模块须在指定 **`example.html` 基线**上扩展，未擅自整页改 IA（除非用户书面从零重做） | Key |
| 未动区块一致（A·`tabs.home`） | 用户未要求替换的顶栏、固定搜索条、**金刚区 `jinggang-wrap`**、底栏 **`fdl-tabbar`**、`channel-wrap`、`fdl-feeds-dual-wrap` 等与 [`pages/tabs/home/example.html`](pages/tabs/home/example.html) **子树 + CSS 一致**；无凭记忆重绘 | Key |
| 组件引用 | A 类已优先走 [`docs/component-index.md`](docs/component-index.md)；自造块已说明索引缺口 | Medium |

#### 4.3 意图 C 追加（创意页）

| 项 | 说明 | 默认级别 |
|----|------|----------|
| 合规底线 | 仍满足 4.1 共性 Key；不因「创意」跳过 token / 配图 / icon 规则 | Key |
| 主路径与层级 | 首屏能否在约 3 秒内理解页面用途；主 CTA / 主路径是否清晰 | Medium |
| 与垂类 example 差异 | **允许**与任意 `example.html` 不同；须在摘要中 **一句话说明设计意图**（可选，但推荐） | Low |

#### 4.4 链路审查（可选加强）

当用户明确多页流程（如 `search.search` → `search.search_sug` → `search.search_result`）时，在 `full` 下检查：搜索框、返回、主色、圆角、列表密度等 **跨页是否同一套语言**。

### 5. 分级定义

- **Key（阻断）**：违反硬规则、或会导致索引/真相源漂移（必须先修才能叫「规范交付」）。  
- **Medium（重要）**：影响一致性、可维护性、布局 guardrail、组件索引闭环（应在本轮修完或显式待办）。  
- **Low（优化）**：文案统一、注释、次要视觉节奏、可选说明增强（可登记后续）。

每一项审查发现必须写清：**现象 → 涉及文件 → 建议改法 → 修毕如何验收**。

### 6. 审查摘要模板（交付物）

审查结束后，在回复中固定输出以下小节（可精简列表，但 **不得删节标题含义**）。

**结论取值：** `PASS`（Key=0 且无未闭环 Medium）｜`PASS_WITH_NOTES`（Key=0 但有登记待办的 Medium）｜`FAIL`（Key>0）。

```text
## FDG 设计审查摘要
- 范围：{page_id 或文件路径 / 链路说明}
- 意图：{A | B | C}
- 深度：{quick | standard | full}
- 结论：PASS（Key=0）| PASS_WITH_NOTES | FAIL（Key>0）
- 相对基线未改：{意图 A 且整页基线时：列出与仓库 example 保持一致的区块/类名；否则写「不适用」}
- 实际改动：{本次动过的模块或选择器；无则写「无」}
- 真实数据追问：{已发出 | 已跳过（理由）| 不适用（flyai 不可用 / 无业务数据占位）}

### Key（0 项即 PASS）
- …

### Medium
- …

### Low
- …

### 修复与同步
- 已修改文件：…
- 待办：…
```

### 7. 修复闭环

1. **先清 Key**，再处理 Medium，最后 Low。  
2. 每轮修改后 **重新跑一遍** 与本次改动相关的清单项（至少 Key + 受影响的 Medium）。  
3. **`spec.md` / `example.html` / `docs/page-index.md` / `pages/README.md`** 中任一更新，检查兄弟文件是否需同步。  
4. **禁止**在 Key 未清零时，用「差不多」类措辞掩盖。

### 8. 与「启动问答」的衔接

- 启动问答收敛 **意图 + page_id** 后进入实现；实现结束后 **自动进入** 本节审查（除非适用输出纪律中的 **审查豁免**）。  
- 若用户开场即说「只做 design-review」：跳过实现，直接按用户指定的 `page_id` 或路径对现有文件执行本节清单。

---

## 索引（真相源）

| 类型 | 文件 |
|------|------|
| 分类树 | [`docs/taxonomy.md`](docs/taxonomy.md) |
| 页面层说明 | [`pages/README.md`](pages/README.md) |
| 页面索引（`page_id`） | [`docs/page-index.md`](docs/page-index.md) |
| 底栏 Tab 顺序 | [`docs/tab-pages-order.md`](docs/tab-pages-order.md) |
| 组件索引 | [`docs/component-index.md`](docs/component-index.md) |

索引表增量更新后，**无需**在本 SKILL 重复粘贴全表。
