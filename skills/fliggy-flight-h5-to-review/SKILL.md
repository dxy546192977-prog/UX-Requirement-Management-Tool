---
name: fliggy-flight-h5-to-review
description: 审查飞猪机票场景的 H5 原型或产品提供的 H5 附件，编排 gstack 的浏览器审查能力并输出审查报告。用于拿到本地 H5 文件、预览地址或 fliggy-flight-prd-to-h5 的 review_handoff 后，执行结构、视觉、交互和控制台层面的页面审查。
---

# Fliggy Flight H5 to Review

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

### Step 4：输出统一报告

输出内容必须同时包含：

1. 审查结论
2. CEO Section 11 设计体验评估（交互状态覆盖图 + 情感弧线）
3. impeccable 反模式扫描结果
4. 问题分级统计与证据
5. 建议动作
6. 对应 H5 工件路径

## 输出模板

推荐使用以下结构：

```markdown
# Flight H5 Review: {requirement_id}

## 审查对象
- 来源：generated / provided_attachment
- 页面：{pages}
- H5 路径：{paths}

## 审查结论
- Result: PASS | PASS_WITH_NOTES | FAIL
- Key issues: N
- Medium issues: N
- Notes: N

---

## CEO Section 11 设计体验评估

### 信息架构
- 首屏第一眼：{用户首先看到什么}
- 第二层级：{其次}
- 第三层级：{再次}
- 层级判断：OK / WARNING / HIGH RISK

### 交互状态覆盖图

| 功能模块 | 加载中 | 空状态 | 错误 | 成功 | 部分 |
|---------|--------|--------|------|------|------|
| {功能1} | ✓/✗ | ✓/✗ | ✓/✗ | ✓/✗ | ✓/✗ |
| {功能2} | ✓/✗ | ✓/✗ | ✓/✗ | ✓/✗ | ✓/✗ |

未覆盖状态：{列出所有 ✗ 的状态及影响}

### 用户旅程情感弧线
- 进入页面：{情绪预期}
- 核心操作路径：{情绪变化}
- 挫败感节点：{哪里可能让用户卡住或困惑}
- 惊喜节点：{哪里有超预期的体验}
- 整体弧线判断：OK / WARNING / HIGH RISK

### AI slop 风险
- 是否有具体设计意图：是 / 否
- 通用模板特征：{描述或"无"}
- 判断：OK / WARNING / HIGH RISK

### 品牌与飞猪机票一致性
- 骨架符合度：OK / WARNING / HIGH RISK
- 调性偏差：{描述或"无"}

### 响应式与无障碍
- 触摸目标尺寸：OK / WARNING
- 对比度：OK / WARNING
- 移动端适配：OK / WARNING / HIGH RISK

---

## impeccable 反模式扫描

### 字体
- 是否命中黑名单字体：是（{字体名}）/ 否
- 字体层级比例：OK / WARNING
- 行宽控制：OK / WARNING

### 色彩
- AI 标志性配色：发现（{描述}）/ 未发现
- 纯黑/纯白使用：发现 / 未发现
- 彩色背景灰色文字：发现 / 未发现
- 渐变文字：发现 / 未发现

### 布局
- 卡片嵌套：发现 / 未发现
- 全居中布局：发现 / 未发现
- 间距无节奏：发现 / 未发现

### 视觉细节绝对禁止项
- 侧边条纹（border-left/right > 1px）：发现 → KEY ISSUE / 未发现
- 渐变文字（background-clip: text）：发现 → KEY ISSUE / 未发现
- 泛滥毛玻璃：发现 → KEY ISSUE / 未发现
- 通用阴影卡片：发现 / 未发现

### 动效
- bounce/elastic 缓动：发现 / 未发现
- 布局属性动画：发现 / 未发现

### UX 写作
- 通用按钮文案：发现（{示例}）/ 未发现
- 重复信息：发现 / 未发现
- 无引导空状态：发现 / 未发现

---

## 关键发现

### 1. {问题标题}
- 严重级别：key / medium / note
- 来源：CEO Section 11 / impeccable / 控制台
- 页面：{page}
- 证据：{截图路径或控制台说明}
- 判断：{为什么这是问题}
- 建议动作：{如何回退到 H5 阶段修正}

---

## 建议下一步
- 若 PASS：可进入人工审查或后续精修
- 若 PASS_WITH_NOTES：建议先处理 medium issues，再决定是否继续
- 若 FAIL：返回 H5 阶段修正后重审
```

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

## 相关文件

- 上游 H5 编排：`skills/fliggy-flight-prd-to-h5/SKILL.md`
- 机票生成规范：`skills/fliggy-flight-design-guide/SKILL.md`
- **CEO 设计体验审查（主框架）**：`.agents/skills/ceo/SKILL.md` — 执行 Section 11（信息架构、交互状态覆盖、用户旅程情感弧线、AI slop 风险、品牌一致性、响应式、无障碍）
- gstack 浏览器取证参考：`/Users/dengxinyang/.claude/skills/gstack/.agents/skills/gstack-qa-only/SKILL.md`
- impeccable 设计语言框架：[https://github.com/pbakaus/impeccable](https://github.com/pbakaus/impeccable)（字体、色彩、空间、动效、交互、响应式、UX 写作的深度反模式识别）
