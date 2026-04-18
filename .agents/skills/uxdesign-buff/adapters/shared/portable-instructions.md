# UXdesign-buff Portable Instructions

Use this workflow when the user asks for a design review, self-check, flow diagnosis, or UX critique from Figma, screenshots, exported frames, PRDs, or product notes.

## What This Is For

- product- and UX-led design review, not taste-only commentary
- reconstructing missing context before judging the draft
- diagnosing structural, cognitive, trust, and continuity problems
- producing a human-readable review plus machine-friendly structured state when file output is available

## Do Not Use It For

- pure visual styling commentary with no product or UX question
- trend-chasing advice with no task or business context
- replacing formal user research when research evidence is required

## Core Working Model

- review the design as a real user path, not as isolated pages
- reconstruct the scenario, target user, business goal, and chain position before critique
- judge the decisions the design forces the user to make
- prefer structural correction over decorative correction
- keep machine state and human-facing output aligned if both are produced

## Evidence Order

Prefer evidence in this order whenever possible:

1. confirmed user context
2. product documents or business materials
3. Figma structure and screenshots from the runtime's design tooling or MCP integration
4. screenshots, exports, or long images
5. explicit inference

Always distinguish:

- `confirmed`
- `visible`
- `inferred`
- `unknown`

Do not present guesses as conclusions.

## Input Guidance

When guiding a user to provide Figma input:

> Open the board you want reviewed in Figma, right-click it, select "Copy link to selection", then paste the link.

If the user provides a file-level URL (no `node-id`):

> This link points to the whole file. I need a specific board. You can select a board in Figma's left panel, then right-click and copy the link.
>
> Or I can list the top-level boards in this file for you to choose from.

If the URL format is invalid:

> This link format doesn't look right. A Figma link usually looks like:
> `https://www.figma.com/design/xxx/xxx?node-id=xxx`
>
> Try selecting the board in Figma and using right-click -> Copy link to selection.

## Input Tolerance

- If a file-level URL is given (no `node-id`), do not fail immediately. Use MCP to read the file structure and list top-level frames for selection.
- If multiple URLs are given, support batch intake and process in order or ask for priority.
- If URL parsing fails, provide a clear error reason and recovery guidance instead of a technical error code.

## Review Workflow

### 1. Normalize Intake

- identify the design target and the narrowest review lane that preserves judgment quality
- if a prior review exists, load it before starting a fresh pass
- prefer the smallest review unit that answers the current question

### Report Mode

- default to `self-check`
- switch to `agent-review` only when the user explicitly wants machine-first handoff or the primary audience is another agent / automation step
- being inside an agent runtime, IDE, or CLI is not enough to justify `agent-review`
- reviewing an AI-generated draft is also not enough by itself; if human designers are still the main readers, stay in `self-check`

### 2. Collect Evidence

- if the runtime supports Figma or MCP, read structure first and screenshots second
- do not start with full-board deep inspection when a smaller node can answer the question
- if only screenshots or exports are available, reconstruct context from visible evidence and mark confidence clearly

### 3. Reconstruct Background

Before critique, determine:

- what the design is trying to help the user do
- who the user is and what they likely already know
- what business target this flow is serving
- where this screen or step sits in the larger journey
- which details are known versus inferred

## 4. Critique

Review from business and UX rationality, not surface beauty.

At minimum, inspect:

- scenario fit
- cognition and operation cost
- user expectation, trust, and mental model
- value carry-through
- baseline experience quality

Mandatory passes:

- cognitive and copy load check
- three-flow continuity review
- scenario stress test on the most important pressure or failure path

#### Issue Diagnosis Depth

每个发现的问题必须包含：

- **问题是什么**：一句话描述现象
- **为什么这是个问题**：从用户行为和心理分析为什么当前设计会伤害体验，至少 3 句话
- **会造成什么后果**：用户会怎么做、会有什么感受、对业务有什么影响
 **修改建议**：用简洁的动作短语开头，后面跟扩展解释。不要使用"首选方案"、"折中方案"、"兜底方案"、"第一层"、"第二层"这类标签

诊断不是列清单，是讲道理。写的时候想象你在跟设计师面对面解释"这里为什么不行"。

好的诊断示例：
> "用户未必知道自己到底算'还没注册万豪'还是'已经有账号但还没绑定'。他选了'开通'，走到一半发现自己其实该选'绑定'，但已经回不去了；失败页虽然给了重新选择的机会，却没有解释为什么会走到这里，于是用户只能再猜一次。"

不好的诊断示例：
> "入口分流要求用户先推断自己的万豪账号状态。"

好的修改建议格式：
> · 增加决策引导——在用户选择前展示"不确定？系统帮你判断"的入口
> · 默认推荐绑定——对已授权用户，根据手机号自动判断并推荐路径
> · 简化说明——把两段式描述压缩为一句话加一个行动按钮

不好的修改建议格式：
> · 首选方案：系统自动判断路径
> · 折中方案：增加"不确定"选项
> · 兜底方案：优化失败页提示

#### Coverage Completeness

审查必须覆盖完整的用户旅程，包括：

- 正常路径（happy path）
- 异常路径（error/failure path）
- 边缘状态（如身份校验失败、网络中断、外跳后回调）
- 恢复路径（从错误状态回到正常流程）

不要只关注主流程，异常处理往往是用户体验最脆弱的地方。如果设计中有失败页面、错误提示、重试流程，都必须纳入审查范围。

在最终输出前，自查一遍是否遗漏了设计稿中可见的任何状态或分支。

### 5. Synthesize One Canonical Review

- keep one canonical review object behind every output
- do not let the human HTML report become the internal schema
- keep issue IDs stable enough for reruns and comparison
- the HTML report and structured sidecar must come from the same review object, not two separately improvised summaries

### 6. Render Outputs

If file output is allowed, write:

- `UXdesign-buff-reviews/<review-slug>/report.html`
- `UXdesign-buff-reviews/<review-slug>/review-state.json`

Optional technical scratch can live under:

- `.UXdesign-buff/<review-slug>/`

If file output is not available, keep the same review logic in chat and state the persistence limit explicitly.

Rendering guardrails:

- keep the fixed report section ids: `review-overview`, `executive-summary`, `highest-priority-issue`, `background-and-evidence`, `full-review`, `issue-list`, `three-flow-consistency`, `resolution-tracks`, `open-questions`, `next-actions`
- write constrained content slots first, then render the final `report.html` through `scripts/render_report.py`; do not improvise a fresh HTML shell
- if the report language is Chinese, keep section titles, labels, chips, and helper text in Chinese too; do not leave English scaffolding such as `Executive Summary`, `Issue List`, `Resolution Tracks`, `Project`, or `Review Slug`
- show stable issue identifiers in the human report as well as display numbers
- do not invent new classes, CSS, or alternate section compositions such as `hero-side`, stacked-only `timeline-card` lists, `tracks/track-card`, or separate `open-questions` and `next-actions` sections
- if the full repository or validator script is available, run the contract validator after writing and repair until it passes

## Three-Flow Continuity Review

This is the signature check in UXdesign-buff.

For at least one key task path, explicitly inspect whether these three flows stay aligned:

- `旅程流`: whether the macro path still holds from entry to outcome
- `操作流`: whether each concrete action and response stays clear and continuous
- `心智流`: whether user certainty and trust move forward instead of collapsing mid-path

This check exists to catch a common failure mode: pages may look locally correct one by one, while the full task chain is still broken.

Focus on:

- whether the design only looks right at page level but fails as one connected path
- whether the large journey, concrete actions, and user confidence support each other
- exactly where the break happens and what kind of break it is

### Timeline Coverage

三流时间轴必须覆盖设计稿中可见的所有关键阶段，包括但不限于：

- 入口/起点
- 关键决策点（用户需要做选择的地方）
- 信息确认/填写步骤
- 外部跳转或系统交互（如跳转第三方、调用验证服务）
- 失败/异常处理页面
- 恢复路径（从异常回到正常流程）
- 成功/完成页面

不要只覆盖 happy path 的阶段。失败和恢复路径是三流断裂的高发区域，必须单独分析。

如果设计稿中有 N 个可辨识的阶段或状态，时间轴节点数不应少于 N-1 个。

### 时间轴覆盖自检

时间轴生成后，逐一核对 `selected_unit_ids` 和 `structural_only_unit_ids` 中的每个 frame：如果某个 frame 代表的交互状态没有出现在任何时间轴节点中，必须补回为独立节点或在相邻节点中显式说明。

以下类型的交互点不允许被合并或省略：
- 跨系统跳转（离开当前环境去第三方，如跳转万豪登录）
- 身份/实名校验（如实名信息确认页）
- 异常处理与恢复路径（如失败后的修正或申诉入口）
- 跳转前的说明页（如告知用户即将离开、如何回来）

自检方法：将时间轴节点列表与 selected_unit_ids + structural_only_unit_ids 做交叉比对，确保每个代表独立交互状态的 frame 都能在时间轴中找到对应。如果时间轴节点数明显少于 selected units 数量，说明存在遗漏。

### 三流正常的处理

当某个阶段三流对齐、没有问题时，应该记录为三流正常：

- `heading` 设为 "三流正常"
- `problem` 字段写该阶段具体做得好的地方（不是通用的"设计正常"，而是具体描述为什么这个阶段体验顺畅）
- 不需要 `solution` 和 `methodology_source` 字段

示例：
```json
{
    "heading": "三流正常",
    "problem": "信息填写页面结构清晰，用户能够理解需要做什么。"
}
```

渲染时，三流正常的 block 会：
- 直接显示描述文案，不加“问题：”前缀
- 不显示“解法：”行和方法论标注
- 使用 `flow-pass` CSS class 进行视觉区分

 Human Report Rules

### 首屏总述结构

executive-summary 的写作顺序是：先肯定好的部分，再说核心问题。

结构：
1. 先说这份设计做得好的地方（流程完整性、视觉质量、哪些环节体验顺畅）
2. 再说核心问题是什么——用一个具体的因果链描述，不要用抽象判断
3. 说明这个问题会导致什么后果

好的首屏示例：
> "整个流程的结构是完整的，视觉质量也在线，但首步分流的设计决策把一个系统本应自动判断的路径选择，变成了用户必须先自我诊断的决策。用户走进流程时往往不清楚自己有没有万豪账号，却被要求在「开通」和「绑定」之间做选择——选错了要等到失败页才发现。这不仅浪费用户时间，更会让用户觉得「是我自己没搞清楚」，而不是「系统没帮我判断好」。"

不好的首屏：
> "这份设计的核心问题在于入口分流逻辑不合理。"（上来就批评，没有肯定；表述太抽象）

- when the user writes in Chinese, the human report should read like natural Chinese design review, not translated schema output
- do not expose rigid labels such as `what i see`, `likely consequence`, or `discussion prompt` unless the user explicitly asks for audit framing
- 把多个相关事实组织成完整的因果分析段落，但不要因此丢失诊断深度
- 每个问题的诊断必须完整解释「是什么 → 为什么是问题 → 会怎样」，不允许压缩成一句话
- keep the machine identity in structured fields, not in awkward human titles
- the human-facing artifact should be `report.html`, not a long raw chat dump

### 中文表达风格

写诊断时，要像跟设计师面对面聊天一样说人话：

- **用用户的视角描述问题，不要用系统视角**。写"用户不知道自己该选哪个"，不要写"入口分流要求用户推断账号状态"
- **用具体的场景举例，不要只下判断**。写"他选了'开通'，走到一半发现自己其实该选'绑定'，但已经回不去了"，不要写"选择错误后缺乏回退机制"
- **多用因果句式**。写"因为……所以用户会……"，不要只写"这里有问题"
- **保持口语化但不啰嗦**。每句话都有信息量

不好的表达：
> "协议确认页面存在必选与可选项的视觉混淆问题"

好的表达：
> "用户打开协议页，看到两个勾选框长得一模一样，但一个必须勾、一个随便勾——他怎么知道？"

#### Issue 标题写法

Issue 标题是设计师最先看到的一句话，必须用用户视角写，不要用系统视角。

不好的标题："首步分流强迫用户自诊断万豪账号状态"
- 问题："首步分流"、"自诊断"、"账号状态"都是系统术语，设计师需要翻译才能理解

好的标题："用户可能不知道自己是否注册过万豪，却必须先选开通还是绑定"
- 用户能直接理解这句话描述的场景

规则：
- 标题中不出现"分流"、"链路"、"路径"、"状态"、"校验"等系统术语
- 用"用户看到什么 → 遇到什么困难"的句式
- 如果需要用到系统概念，翻译成用户能理解的语言

## Non-Negotiables

- do not default to aesthetic commentary unless aesthetics affect clarity, trust, or task success
- do not hand out vague praise
- challenge the problem before endorsing the solution
- distinguish what is visible from what is inferred
- mark uncertain conclusions as hypotheses
- if the biggest issue is strategic or contextual, say it before page-level details
- if tooling limits block precision, record the limit instead of guessing

## Canonical Source Files

If the full UXdesign-buff repository is available, these files remain the source of truth:

- `SKILL.md`
- `references/input-standard.md`
- `references/figma-high-precision.md`
- `references/review-playbook.md`
- `references/report-contract.md`
- `references/review-state-schema.md`
- `references/report-style-context.md`
- `templates/report-shell.html`
