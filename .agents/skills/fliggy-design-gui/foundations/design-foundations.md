# Fliggy Design GUI — 设计基础

> **version**：0.2.8 — 增补「阴影与层级」全局约定（少用大扩散 `box-shadow`）；与根目录 `SKILL.md` 互链不变。

飞猪旅行 **App 常规范式** 移动端 UI 设计基础，指导大模型输出符合飞猪设计标准的 **HTML + CSS**。

> **与对话 Skill 的边界**  
> 本文件仅服务于 **Fliggy Design GUI**（标准 App 页：导航、纵向滚动、横滑模块等）。**fliggy-design-skill**（对话式 AI 页）使用 **另一套** 文档与 token；**禁止**在同一输出中混用两套 `:root`。  
> 下列变量名（如 `--color-bg`、`--color-label`）在 **本文件中的语义与取值** 以本文为准；若对话 Skill 文档中的同名变量含义不同，**不得以对话 Skill 为准覆盖 FDG 页面**。

> **读取策略**  
> 生成任意 FDG 界面：**先读本文件**。需要配图时再读 [image-library.md](image-library.md)；需要 icon / SVG 时读 [icon-svg.md](icon-svg.md)（支持别名匹配）。**编排流程（增模块 / 改模块 / 大改版意图分流、读取闭包顺序）以仓库根目录 [SKILL.md](../SKILL.md) 为准**。组件/页面细则由该 Skill 指向的索引与 `manifest` 按需加载，**禁止一次性读取全部组件文件**。`example.html` 仅在组件 spec 不足以确定结构时查阅。

> **编排 Skill 放哪里**  
> - **仓库内（推荐，便于 Git 管理）**：在本仓库 **根目录** 维护 [`SKILL.md`](../SKILL.md)，作为 Fliggy Design GUI 的编排入口（**意图分流** + 薄入口 + 页面/组件索引 + 启动问答）。文档与 `foundations/`、`components/`、`pages/` 使用 **相对路径** 互链。  
> - **Cursor 生效位置**：将目录链到或复制到 `~/.cursor/skills/fliggy-design-gui/SKILL.md`（与 Cursor Agent Skills 约定一致）；多机器以仓库内 `SKILL.md` 为 **唯一真相源**，避免两处漂移。

---

## 一、技术基准

- **输出格式**：单文件 HTML + 内联 CSS（`<style>` 标签）
- **目标平台**：移动端（App WebView / H5）
- **设计基准**：750 × 1624px（@2x），标注均为 @2x px
- **适配方案**：固定 viewport 宽度等比缩放，`<head>` 中必须包含：

  ```html
  <meta name="viewport" content="width=750, user-scalable=no">
  ```

  布局视口锁定 750px，真机宽度不同时由浏览器缩放；样式中直接使用 @2x 数值，**不做 rem/vw 换算**。

---

## 二、Design Tokens（全局规范）

### 字体

```css
@font-face {
  font-family: 'Fliggy Sans 102';
  src: url('https://g.alicdn.com/trip/common-assets/1.1.9/fonts/FliggySans102-Md.ttf') format('truetype');
  font-weight: 500;
  font-display: swap;
}

@font-face {
  font-family: 'Fliggy Fonts';
  src: url('https://g.alicdn.com/trip/common-assets/1.1.31/fonts/FliggyFonts-MediumItalicVer0711.ttf') format('truetype');
  font-weight: 500;
  font-style: italic;
  font-display: swap;
}
```

- **数字 / 货币**：`font-family: 'Fliggy Sans 102', 'PingFang SC', 'SimHei', sans-serif; font-weight: bold;`
- **默认汉字**：`font-family: 'PingFang SC', 'SimHei', sans-serif;`
- **品牌汉字（Fliggy Fonts）**：`font-family: 'Fliggy Fonts', 'PingFang SC', 'SimHei', sans-serif; font-weight: 500; font-style: italic;`  
  用于品牌向中文标题、活动氛围字等；**具体层级与字号以各组件 spec 为准**。凡页面中用到该字体，须在 `<style>` 内包含 **上述 `@font-face`（Fliggy Fonts）**，与 Fliggy Sans 102 并列。

### 字号

**字重**：`Medium (500)` — 标题与强调；`Regular (400)` — 正文与说明。CSS 中写作 `font-weight: 500` / `font-weight: 400`。

**行高**：除段落外统一 **140%**；**段落（Paragraph）** 为 **170%**。

#### 标题（Headings，均为 Medium）

| 等级 | 字号 |
| :--- | :--- |
| H1 | 48px |
| H2 | 42px |
| H3 | 36px |
| H4 | 30px |

#### 副标题与段落

| 样式 | 字号 | 字重 | 行高 |
| :--- | :--- | :--- | :--- |
| Paragraph | 30px | Regular | 170% |

#### 正文 Body（Regular / Medium）

| 样式 | 字号 |
| :--- | :--- |
| Body 1 / Bold | 28px |
| Body 2 / Bold | 26px |
| Body 3 / Bold | 24px |

#### 说明 Caption

| 样式 | 字号 | 字重 |
| :--- | :--- | :--- |
| Body 4 / Bold | 22px | Regular / Medium |
| Caption / Bold | 20px | Regular / Medium |
| Caption 1（更小） | 18px | Regular |

### 颜色

**FDG 语义说明（勿与对话 Skill 混用）**

- `--color-bg`：页面底层背景、分割线、次级按钮背景等。
- `--color-label`：浅灰辅底（如按钮底、卡片内色块），**不是**对话 Skill 里可能使用的「全局页灰底」定义；若对话文档与本文冲突，**FDG 页面以本文为准**。
- `--color-brand-2`：比 `brand-4` 更浅的淡黄辅底（如 **选项标签单选选中**）；与 `brand-4`（复选选中、更饱和黄底）区分。
- `--color-promo-1` / `--color-promo-2`：**大促** 高饱和角标底（如双 11 红、预售紫）；**禁止**通栏铺色。
- `--color-pay-2`：**次级转化** 按钮底（如预订操作栏「加入购物车」、与 `--color-pay-1` 主按钮并存时）。
- `--color-notice-tint`：**小黄条** 等横向通知条渐变左端暖白（与 `--color-safeguard-4` 可区分一档）。

```css
:root {
  --color-darkgray: #0f131a;   /* 标题、正文、按钮文字等强层级 */
  --color-midgray: #5c5f66;    /* 副标题、标签、次级按钮文字等 */
  --color-lightgray: #919499;  /* 更弱的说明、副文案 */
  --color-auxiliary: #d2d4d9;  /* 最弱：失效文案等 */
  --color-bg: #f2f3f5;         /* 见上文 FDG 语义 */
  --color-label: #f7f8fa;      /* 见上文 FDG 语义 */
  --color-white: #ffffff;      /* 卡片主背景 */

  --color-brand-1: #ffe033;    /* 品牌主色：按钮、页头顶部氛围等 */
  --color-brand-2: #fffceb;    /* 更浅黄辅底：选项标签单选选中等 */
  --color-brand-4: #fff7cc;    /* 品牌辅助：卡片/标签底，禁止大面积铺色 */
  --color-indigo-1: #6666ff;   /* 辅助色：按钮、标签文字、链接；禁止大面积 */
  --color-indigo-4: #ebebff;   /* 浅紫辅底：卡片、标签 */
  --color-warning-1: #ff3333;    /* 删除、警告 */
  --color-pay-1: #ff5533;        /* 价格、支付、优惠标等 */
  --color-pay-2: #ff8c1a;        /* 预订/支付条次按钮、购物车等次级转化 */
  --color-notice-tint: #fff6ee;  /* 小黄条渐变起点（暖白） */
  --color-promo-1: #ff0036;      /* 大促红底：双11 等角标 */
  --color-promo-2: #9537fd;      /* 大促紫底：预售等角标 */
  --color-green-0: #149aa8;    /* 正向反馈、提示 */
  --color-safeguard-4: #fef5ec; /* 会员、保障：金属浅底 */
  --color-safeguard-5: #5d3521; /* 会员、保障：金属深字 */
}
```

### 圆角

```css
:root {
  --radius-l: 24px;  /* 对话框、浮层、通栏卡片 */
  --radius-m: 12px;  /* 非通栏卡片 */
  --radius-s: 6px;   /* 小标签、极小元素 */
}
```

### 阴影与层级

- **默认尽量少用 `box-shadow` / `drop-shadow`**：层次优先用 **背景色差、1px 分割线（`border` / `linear-gradient` 模拟发丝线）**、**留白与圆角** 区分区块；避免「卡片飘在灰底上」的通用 AI 阴影堆叠。
- **确需强调浮层**（如固定底栏与内容分界、模态）时：用 **低扩散、低透明度** 的单层阴影，且**单页内同类用法保持一致**；禁止大模糊 + 深黑色的重阴影。
- **文字在摄影图/渐变上**：可读性优先可用 **`text-shadow`** 作轻微描边式对比；与 `box-shadow` 分开看待，仍须克制（避免厚描边）。

### 栅格

- 基础单位：**6px**；左右各留 3 个单位 → **页面水平边距 18px**（模块距屏幕左右）。
- 模块 **水平** 间距常规 **18px**；模块 **内** 元素间距常用 **6px、12px**；模块 **内边距** 常用 **18px、24px**。
- 模块 **之间垂直** 间距常用 **18px、24px、30px**。

---

## 三、需求分析（每次生成前执行）

收到需求后按下列步骤执行（与根目录 [SKILL.md](../SKILL.md) 编排、页面 `manifest` 一致）：

0. **意图分流（编排入口）**  
   按 [SKILL.md](../SKILL.md) 区分 **增模块 / 改模块 / 大改版**；不同意图下 **读取闭包与是否强制套现有页模板** 以该文件为准。

1. **场景识别**  
   明确页面类型：列表 / 详情 / 表单 / 营销聚合 / 其他；是否需要 **顶部导航**、**整页纵向滚动**、**局部横向滑动**（Banner、横滑卡片区）。

2. **业务域**  
   标注涉及的业务域（酒景、交通、交易、会员等）；**可多域**。若用户未给出 `page_id` 或 manifest，由编排 Skill 的 **启动问答** 收敛到具体页面模板（大改版等意图见 SKILL）。

3. **确定闭包**  
   在 **页面索引** 中定位 `page_id`，读取对应 `page-frame.md` 与 `manifest.md`，得到本页允许的组件列表（含平台组件 / 业务组件边界）。**大改版** 等可不强制 manifest 的情形见 [SKILL.md](../SKILL.md)。

4. **读取顺序**  
   始终以本文件（tokens）为先；其后 **page-frame / manifest / 组件 spec** 的先后顺序与是否必读以 [SKILL.md](../SKILL.md) 按意图拆分的链条为准。常规闭包可记为：`design-foundations.md`（本文件）→ `page-frame` → `manifest` 所列组件 **spec** → 必要时 **example.html**；**含真实配图** 时再读 `image-library.md`。

5. **输出预判**  
   用一两句话写出：页面意图、主要模块、是否含图；再开始写 HTML/CSS。

---

## 四、组件索引

**真相源**：[docs/component-index.md](../docs/component-index.md)。由该表维护「组件 slug → spec 路径 → 触发条件」。新增组件时同步更新索引，**禁止**在未索引的情况下扫描整个 `components/` 目录。

**编排入口**：[SKILL.md](../SKILL.md)（**意图分流**、读取顺序与启动问答）。**页面路由**：[docs/page-index.md](../docs/page-index.md)。**分类树**：[docs/taxonomy.md](../docs/taxonomy.md)。

### example.html 读取策略

仅在以下情况读取各组件目录下的 `example.html`：

- 组件 spec 不足以确定 DOM 结构或层级；
- 复杂嵌套（如组合业务块）需对照实现；
- 首次使用该组件且 spec 较简。

常规实现 **以 spec 为准即可**，无需读取 `example.html`。

---

## 五、排版与输出策略

**待补充**：可按业务线补充「方案对比」「模块优先级」「横滑与通栏混排」等版式策略；须与本文件 token、边距一致。

---

## 六、输出规范

- 所有样式写在 `<style>` 中，**不**依赖外部 CSS 文件。
- **颜色、圆角** 必须使用 `var(--*)`，**禁止**在样式里写规范外的 hex 或圆角 px（`:root` 定义除外）。
- 生成的 HTML 须在 `<style>` 内包含 **完整** 本文件「颜色」「圆角」中的 `:root` 声明，保证 `var()` 可解析。
- 若页面使用数字/货币、品牌汉字字体，须在 `<style>` 内包含本节「字体」中对应的 **`@font-face`**（`Fliggy Sans 102` / `Fliggy Fonts`），未用到的可省略以减小体积。
- **配图** 须使用 **飞猪 CDN**，URL 取自 [image-library.md](image-library.md)，遵守该文件与下节「八」的规则；**禁止**用纯色块冒充成品配图。
- **真实数据能力依赖**：真实数据替换依赖 flyai skill（及其 CLI/配置）；若环境中 flyai 不可用，则不得执行真实数据拉取。
- **真实数据能力检测前置**：在页面生成完成后的追问前，必须先检测 flyai 是否可调用。
- **真实数据替换追问**：检测可用时，可在素材库版本基础上追问：`是否需要为你替换成真实飞猪数据？预计耗时约 X 分钟。` 用户明确同意后，才可用 flyai 返回字段覆盖页面内容。
- **真实数据失败回退**：检测不可用时，必须提示：`检测到当前环境未安装 flyai 能力，暂无法拉取真实数据。可先使用素材库版本；如需真实数据，请先安装并启用 flyai。` 并保持素材库版本作为最终结果。
- **图标** 优先从 [icon-svg.md](icon-svg.md) 检索；当需求给出语义词时，先按别名匹配对应 icon，再引用，避免同义词导致选错图标。
- **间距与圆角** 须落在本文与 `manifest` 允许范围内；禁止自造未定义 token。
- **创意与简化**：若用户明确要求提高创意权重、减少标准组件用量，允许在 **不破坏可读性与品牌底线** 的前提下简化结构，但 **颜色、字号阶梯、圆角、页面边距** 仍须完全遵守本文 Design Tokens；不得借「创意」绕过 token。

---

## 七、Token 维护指南

批量换肤或品牌升级时：

1. 修改本文件「二、Design Tokens」中 `:root` 取值。
2. **同步** 同仓库内 **页面骨架**（如 `patterns/`、`pages/*/page-frame` 或内联模板）中的 `:root`，与本文一致。
3. 各组件 spec / example 仅通过 `var(--*)` 引用则 **无需逐文件改色值**。
4. 新增 token 时：先在本文件 `:root` 注册，再在对应组件 spec 中引用并说明用途。
5. 升级 **CDN 字体**（如 `common-assets` 版本号变化）时：同步更新本节 `@font-face` 的 `src` URL，并 bump 本文件 `version`。

---

## 八、图片填充规范（飞猪 CDN）

生成含图的模块（商品卡、Banner、列表头图等）时，须使用 **飞猪 CDN 真实素材**，**禁止**用纯色占位敷衍。

### URL 形态

- 使用 [image-library.md](image-library.md) 中的 **完整 URL**（已含 `x-oss-process=image/format,webp` 等参数时保持原样）。
- **禁止**自行改写域名或路径；需要不同尺寸时，在符合 OSS 策略的前提下按设计同学提供的参数规则处理（无单独规范前 **不要臆造** 处理参数）。

### 使用规则

1. **按语境选图**：酒店 / 交通 / 度假 / 目的地 / 民宿 / 品牌 / 机票等，在 `image-library.md` 对应分区或共享池中选取。
2. **同页不重复**：同一页面内多图须使用 **不同** URL。
3. **CSS**：推荐 `background-image` + `background-size: cover` + `background-position: center`，并保留 `background-color: #e0e0e0` 作为加载中兜底（该兜底色 **允许** 硬编码，不属于品牌色 token）。

完整 URL 清单见 **[image-library.md](image-library.md)**（共享池 + 各业务专属列表）。
