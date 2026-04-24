---
name: fliggy-flight-gstack-review
description: 审查飞猪机票场景的 H5 原型或产品提供的 H5 附件，编排 gstack 的浏览器审查能力并输出审查报告。用于拿到本地 H5 文件、预览地址或 fliggy-flight-prd-to-h5 的 review_handoff 后，执行结构、视觉、交互和控制台层面的页面审查。
---

# Fliggy Flight Gstack Review

## 目标

把已经拿到的 H5 工件交给 gstack 做浏览器驱动审查，并输出统一的审查结论：

- `PASS`
- `PASS_WITH_NOTES`
- `FAIL`

这个 skill 只负责审查，不负责重新生成 H5，不负责直接修图，不负责 Figma 导入。

## 何时使用

在以下任一场景加载本 skill：

- 已经通过 `skills/fliggy-flight-prd-to-h5/SKILL.md` 拿到了 `html_outputs`
- 产品已经提供了 H5 附件，且文件可在本地打开
- 你有一个本地 H5 路径或预览 URL，想交给 gstack 做正式审查
- 需要在人工看稿前，先做一轮浏览器驱动的设计/交互检查

## 输入要求

优先接收来自 `fliggy-flight-prd-to-h5` 的 handoff：

- `requirement_id`
- `summary`
- `pages`
- `html_outputs` 或 `provided_h5_artifacts`
- `review_handoff`

至少需要以下最小输入之一：

1. 本地 H5 文件路径
2. 可访问的预览 URL
3. `review_handoff.entry_paths`

如果没有可打开的 H5 路径或 URL，不要继续审查。

## 审查策略

这个 skill 是多层审查能力的编排器。

### 能力选型

- **主审查框架**：调用 `ceo` skill 的 **Section 11（设计与体验审查）**，从信息架构、交互状态、用户旅程情感弧线、AI slop 风险、品牌一致性、响应式意图、无障碍基础等维度做结构化设计评审
- **设计质量增强**：引入 [impeccable](https://github.com/pbakaus/impeccable) 的设计语言框架，对字体、色彩、空间、动效、交互、响应式和 UX 写作做深度反模式识别
- **浏览器取证**：沿用 gstack `qa-only` 的浏览器打开、截图、控制台检查和基本交互取证
- **不使用**：gstack `/review` 作为主审查器，因为它面向代码 diff，不面向 H5 原型

### CEO Section 11 设计体验审查（主框架）

对每个 H5 页面，按 CEO skill 的 Section 11 口径逐项评估：

**信息架构：**
- 用户首先、其次、第三看到什么？层级是否尊重用户时间？
- 核心模块是否符合 PRD 意图，首屏信息密度是否合理？

**交互状态覆盖图：**

| 功能 | 加载中 | 空状态 | 错误 | 成功 | 部分 |
|------|--------|--------|------|------|------|
| （逐功能填写） | ? | ? | ? | ? | ? |

**用户旅程连贯性：**
- 用户旅程的情感弧线是什么？
- 哪里可能有挫败感？哪里有惊喜？

**AI slop 风险：**
- 是否使用了通用 UI 模式而缺乏具体设计意图？
- 是否存在明显 AI 味或模板味？

**品牌/调性/体验一致性：**
- 是否与飞猪机票现有页面骨架和品牌调性一致？

**响应式意图：**
- 移动端是否被明确考虑？H5 场景下的触摸目标是否合适？

**无障碍基础：**
- 对比度、触摸目标尺寸、关键操作是否可访问？

### impeccable 设计质量审查（深度反模式识别）

在 CEO Section 11 完成后，额外执行以下检查，识别 AI slop 特征：

#### 字体审查

检查是否使用了以下过度泛滥的字体（直接判定为 AI 默认输出）：

> Fraunces、Newsreader、Lora、Crimson Pro、Playfair Display、Cormorant、Syne、IBM Plex Mono/Sans/Serif、Space Mono、Space Grotesk、Inter、DM Sans、DM Serif Display、Outfit、Plus Jakarta Sans、Instrument Sans/Serif

- 字体层级是否清晰：标题与正文是否有至少 1.25 倍的尺寸比例差
- 正文行宽是否控制在 65–75ch 以内
- 是否存在全页只用一种字体族的情况

#### 色彩审查

- 是否使用了 cyan-on-dark、紫色到蓝色渐变、深色背景配霓虹色等 AI 标志性配色
- 是否使用了纯黑 `#000` 或纯白 `#fff`（应始终带色调倾向）
- 是否在彩色背景上使用了灰色文字（应改用背景色的深色变体）
- 是否使用了渐变文字（`background-clip: text` + gradient）

#### 空间与布局审查

- 是否将所有内容都套在卡片里，或卡片嵌套卡片
- 是否使用了完全相同的卡片网格（同尺寸卡片 + 图标 + 标题 + 文字，无限重复）
- 是否所有内容都居中对齐（缺乏设计感）
- 是否全页使用相同的间距（缺乏视觉节奏）

#### 视觉细节绝对禁止项

以下 CSS 模式是最典型的 AI 设计特征，发现即判定为 `key_issue`：

1. **侧边条纹**：`border-left` 或 `border-right` 宽度大于 1px 用于卡片/列表/提示框的装饰性强调
2. **渐变文字**：`background-clip: text` 配合渐变背景实现的文字填充效果
3. **泛滥的毛玻璃**：装饰性而非功能性的 `backdrop-filter: blur` + 发光边框
4. **通用阴影卡片**：圆角矩形 + 普通 `box-shadow`，无任何品牌特征

#### 动效审查

- 是否使用了 bounce 或 elastic 缓动（过时且廉价感）
- 是否对 `width`、`height`、`padding`、`margin` 做了动画（应只动 `transform` 和 `opacity`）

#### UX 写作审查

- 按钮文案是否过于通用（"点击这里"、"了解更多"等）
- 是否存在重复信息（标题和正文说同一件事）
- 空状态是否只写了"暂无数据"而没有引导性文案

## 工作流

### Step 0：确认工件

先确认 H5 工件来源：

- `generated`：来自 `fliggy-flight-prd-to-h5` 生成
- `provided_attachment`：来自产品提供附件

无论来源如何，都要先验证：

- 文件存在
- 浏览器能打开
- 页面不是空白页

### Step 1：读取上下文

读取审查所需的最少上下文：

- 需求摘要
- 页面列表
- 重点模块
- 审查重点

不要重新回头完整拆解 PRD，除非 handoff 明显缺失关键信息。

### Step 2：浏览器打开与取证

对每个 H5 页面执行：

1. 打开本地文件或预览地址
2. 截图首屏或整页
3. 检查控制台错误
4. 如有交互元素，做最小可行交互验证

### Step 2.5：CEO Section 11 设计体验审查

浏览器取证完成后，加载 `ceo` skill 并执行其 **Section 11（设计与体验审查）**，对每个页面逐项评估：

- 信息架构与层级（用户首先/其次/第三看到什么）
- 交互状态覆盖图（加载中 / 空状态 / 错误 / 成功 / 部分）
- 用户旅程情感弧线（哪里有挫败感，哪里有惊喜）
- AI slop 风险（是否使用了通用 UI 模式而缺乏设计意图）
- 品牌/调性/体验一致性（是否符合飞猪机票骨架）
- 响应式意图（H5 场景下触摸目标是否合适）
- 无障碍基础（对比度、触摸目标尺寸）

然后叠加 impeccable 设计质量审查，识别字体、色彩、布局、视觉细节、动效、UX 写作层面的反模式。

### Step 3：形成审查判断

按以下口径输出：

- `PASS`：可进入下一步，无 Key 问题
- `PASS_WITH_NOTES`：可继续，但有中等级备注问题
- `FAIL`：存在阻断问题，需要回到 H5 阶段修正

建议分级：

- `key_issues`：阻断继续流转的问题，包含 impeccable 绝对禁止项（侧边条纹、渐变文字等）
- `medium_issues`：不阻断，但会影响质量的问题，包含 impeccable 字体、色彩、布局反模式
- `notes`：低风险提醒，包含 impeccable UX 写作和动效建议

### Step 4：生成 HTML 可视化报告

不再输出 Markdown 给人读。审查产物的唯一人读形式是**单文件 HTML**，用户可以双击打开，或在终端运行 `open <path>` 打开。

生成流程：

1. **聚合数据**：把 CEO Section 11 评估、impeccable 扫描结果、issues 列表、截图路径整理成一个 JS 对象（对应下文"结构化返回建议"的 JSON schema）
2. **套用 HTML 模板**：按下文"HTML 报告结构"的七区块渲染单文件 HTML；所有 CSS 内联在 `<style>` 中，不加载外部字体、不引入任何框架/CDN
3. **内联截图**：用相对路径引用 `.gstack/screenshots/` 下的 PNG；如果报告要跨目录分享，改为 `file://` 绝对路径或 base64 内联
4. **自我审查**：生成后对照下文"impeccable 报告视觉规范"里的硬门槛自查一次；如果报告本身犯了禁止项（渐变文字、侧边条纹、纯黑纯白等），必须先改好再交付
5. **输出路径**：返回 HTML 的绝对路径，示例：`已生成审查报告：/Users/.../outputs/flight/review-<requirement_id>-<YYYYMMDD-HHmm>.html，双击或 open 命令打开`

## 输出形式

- **产物**：单文件 HTML，内联 CSS，不依赖网络
- **命名规则**：`outputs/flight/review-{requirement_id}-{YYYYMMDD-HHmm}.html`
- **交付**：审查结束后必须返回文件**绝对路径**
- **不再生成 Markdown 报告**；结构化 JSON 仍保留给机器读取
- **不生成 PDF/PNG** 版本；不引入任何前端框架或 CDN 依赖

## HTML 报告结构

HTML 固定由以下七个区块从上到下组成，每块一个 `<section>`：

### 1. Header
顶部信息条。内容：

- 需求 ID（`requirement_id`）
- 审查时间（ISO 8601，如 `2026-04-23 14:32`）
- H5 源路径（generated 或 provided_attachment）
- 来源类型标签

排版为单行或两行，左对齐；不使用装饰性边框或背景色。

### 2. Verdict Hero
审查结论的主视觉。内容：

- 大字号的结论文字：`PASS` / `PASS_WITH_NOTES` / `FAIL`（字重 500–600，字号 ≥ 72px）
- 结论下方一行副标题解释含义
- 右侧或下方三个数字指标：Key / Medium / Notes
- 三个指标用语义色点缀（key=暗红，medium=土黄，note=中性灰）

禁止用渐变文字、发光阴影、霓虹边框表现结论。

### 3. CEO Section 11 设计体验评估
六个子块按顺序呈现：

- **信息架构**：首屏第一眼/第二/第三层级 + OK/WARNING/HIGH RISK 判断
- **交互状态覆盖图**：HTML `<table>` 呈现，列为「加载中 / 空状态 / 错误 / 成功 / 部分」，单元格用 `✓` 或 `✗` 文本（非 emoji、非图标字体）；表格下方列出所有 `✗` 单元格对应的影响说明
- **用户旅程情感弧线**：进入/核心操作/挫败节点/惊喜节点 + 整体弧线判断；可选用一条横向的节点序列（纯 CSS，无动画）
- **AI slop 风险**：是否有具体设计意图 + 通用模板特征描述 + 判断
- **品牌与飞猪机票一致性**：骨架符合度 + 调性偏差
- **响应式与无障碍**：触摸目标尺寸、对比度、移动端适配

### 4. impeccable 反模式扫描
六组检查，每组用 chip 列表呈现命中/未命中。

每个 chip 是一个内联块，包含：检查项名称 + 状态标记（「未命中」中性、「命中」警告、「命中 → KEY」暗红）。

六组：字体 / 色彩 / 布局 / 视觉细节绝对禁止项 / 动效 / UX 写作。

### 5. 关键发现（Issues 列表）
按严重级别分三组：Key / Medium / Notes，每组一个子标题。

每条 issue 一个卡片，包含：

- 序号 + 标题
- 来源标签（CEO Section 11 / impeccable / 控制台）
- 所属页面
- 证据：截图文件名（可点击跳到第 6 区块对应截图）或控制台日志摘要
- 判断：为什么这是问题
- 建议动作：如何回退到 H5 阶段修正

卡片用 1px hairline 边框分隔，禁止使用 box-shadow 或侧边粗条纹。

### 6. 截图证据
gstack 截图的缩略图 grid。每张图点击后在同页面用 `<dialog>` 或纯 CSS `:target` 展开至全尺寸（禁止引入 JS 库）。图下标注页面名和截图时机（首屏 / 交互后 / 错误态等）。

### 7. 建议下一步
根据 Verdict 动态生成：

- `PASS`：可进入人工审查或后续精修
- `PASS_WITH_NOTES`：建议先处理 medium issues，再决定是否继续
- `FAIL`：返回 H5 阶段修正后重审

末尾列出对应 H5 工件路径，方便返修定位。

## impeccable 报告视觉规范

HTML 报告本身必须通过 impeccable 审查，不得犯任何禁止项。

### 基色

- 背景：`#0E0F12` 或 `#111318`（非纯黑，带冷色调）
- 主文字：`#E8E6E3` 或 `#EAE7E1`（非纯白，带暖色倾向）
- 次级文字：`rgba(232, 230, 227, 0.6)`
- 分隔线：`rgba(255, 255, 255, 0.08)`

### 字体

使用系统字体栈，严禁外部字体加载：

```css
font-family: -apple-system, BlinkMacSystemFont, "PingFang SC", "Hiragino Sans GB", "Helvetica Neue", sans-serif;
```

禁止使用 Inter / DM Sans / Space Grotesk / Plus Jakarta Sans / Fraunces / Newsreader / Playfair / Instrument 等 impeccable 黑名单字体。

### 层级比例

- H1（Verdict 主字）：≥ 72px，字重 500–600
- H2（区块标题）：28–32px，字重 500
- H3（子块标题）：18–20px，字重 500
- 正文：15–16px，行高 ≥ 1.6
- 正文段落 `max-width: 68ch`
- 标题与正文至少 1.25 倍比例差

### 状态语义色

- `PASS`：墨绿 `#5B8F75`
- `PASS_WITH_NOTES`：土黄 `#B58A4A`
- `FAIL`：暗红 `#B5574A`
- `OK` 判断：沿用主文字色或墨绿
- `WARNING` 判断：土黄
- `HIGH RISK` 判断：暗红

禁止霓虹绿、霓虹红、纯饱和色。

### 间距刻度

以 4px 为基准的阶梯：`4 / 8 / 12 / 16 / 24 / 40 / 64 / 96`。

区块之间至少 64px，区块内子块之间 40px，卡片之间 16px。禁止全页使用相同间距。

### 卡片与分隔

- 用 1px hairline 边框 `rgba(255,255,255,0.08)` 表达卡片边界
- 禁止 `box-shadow` 作为装饰
- 禁止卡片嵌套卡片

### 硬门槛（生成后必须自查）

以下任何一项命中，HTML 本身判定为 FAIL，必须重新生成：

- 使用 `background-clip: text` 做渐变文字
- `border-left` 或 `border-right` 宽度大于 1px 的侧边条纹
- 装饰性 `backdrop-filter: blur`
- 纯 `#000` 或 `#fff`
- cyan-on-dark、紫到蓝渐变等 AI 标志性配色
- 对 `width` / `height` / `padding` / `margin` 做 CSS 动画（只允许 `transform` 和 `opacity`）
- 加载任何外部字体、CSS、JS
- 使用 bounce / elastic 缓动

## 结构化返回建议

如果需要机器可读结果，补充：

```json
{
  "result": "PASS",
  "key_issues": 0,
  "medium_issues": 1,
  "notes": 2,
  "review_scope": ["vertical.flight.home"],
  "artifact_paths": ["outputs/flight/home-v1.html"],
  "ceo_section11": {
    "ia_rating": "OK",
    "interaction_states_uncovered": ["搜索结果-空状态", "支付-错误"],
    "journey_pain_points": ["筛选条件过多导致认知负担"],
    "ai_slop_risk": "WARNING",
    "brand_consistency": "OK"
  },
  "impeccable": {
    "blacklist_fonts_found": [],
    "absolute_bans_triggered": [],
    "color_issues": [],
    "layout_issues": ["全居中布局"]
  },
  "issues": [
    {
      "severity": "medium",
      "source": "CEO Section 11",
      "page": "搜索结果页",
      "title": "空状态未设计",
      "evidence": "screenshot: .gstack/screenshots/search-empty.png",
      "action": "回到 H5 阶段补充空状态引导文案和插图"
    }
  ]
}
```

## 边界

- 不重写 `fliggy-flight-prd-to-h5` 的拆解逻辑
- 不在审查阶段直接重生成 H5
- 不使用代码 diff review 代替页面审查
- 不把 Figma 导入视为本 skill 的完成标准
- 不生成 Markdown 版本的审查报告，HTML 为唯一人读产物
- 不引入任何前端框架、CDN 字体或 JS 库，HTML 必须离线可打开

## 相关文件

- 上游 H5 编排：`skills/fliggy-flight-prd-to-h5/SKILL.md`
- 机票生成规范：`skills/fliggy-flight-design-guide/SKILL.md`
- **CEO 设计体验审查（主框架）**：`.agents/skills/ceo/SKILL.md` — 执行 Section 11（信息架构、交互状态覆盖、用户旅程情感弧线、AI slop 风险、品牌一致性、响应式、无障碍）
- gstack 浏览器取证参考：`/Users/dengxinyang/.claude/skills/gstack/.agents/skills/gstack-qa-only/SKILL.md`
- impeccable 设计语言框架：[https://github.com/pbakaus/impeccable](https://github.com/pbakaus/impeccable)（字体、色彩、空间、动效、交互、响应式、UX 写作的深度反模式识别）
