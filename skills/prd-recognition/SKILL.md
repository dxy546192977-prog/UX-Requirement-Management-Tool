---
name: prd-recognition
description: Read PRD documents, especially Yuque PRDs, and decompose them into AI-executable design briefs. Use when the user asks to identify a PRD,拆解需求,整理页面模块,生成可发给 AI 的 Markdown 文档, or prepare input for fliggy-design-gui.
---

# PRD Recognition

## Purpose

Turn a PRD into a structured execution brief that another AI can directly use for design generation.

This skill focuses on:

- reading PRD title, summary, and body
- identifying pages and modules
- classifying each module as `create`, `modify`, or `reuse`
- mapping work items into `fliggy-design-gui` execution instructions
- outputting a Markdown brief that can be downloaded or pasted into another AI

This skill does not generate final design稿 itself. It prepares the brief for downstream design execution.

## When To Use

Use this skill when the user asks to:

- 识别 PRD
- 拆解语雀 PRD
- 把 PRD 变成 AI 可执行点
- 输出一份 Markdown 给 AI
- 让 AI 根据 PRD 继续出设计稿
- 为 `fliggy-design-gui` 准备输入

## Default Workflow

1. Read the PRD source.
   If the input is a Yuque link, fetch title and body first.

2. Extract the product goal.
   Summarize the core requirement in one short paragraph.

3. Identify involved pages.
   Use page-level granularity such as `首页`、`列表页`、`下单页`、`订单详情页`.

4. Decompose each page into modules.
   For each module, output:
   - `name`
   - `page`
   - `intent`
   - `change_type`
   - `notes`

5. Map each module to execution type.
   - `create` -> `Type A`
   - `modify` -> `Type B`
   - `reuse` -> direct reuse, no standalone redraw needed

6. Produce a Markdown brief.
   The brief must be directly usable as downstream AI input.

## Output Rules

- Always prefer Markdown.
- Keep the brief practical, not descriptive.
- Write for the next AI, not for human-only reading.
- Each module must include a concrete execution instruction.
- Mention `fliggy-design-gui` explicitly as the downstream design skill.
- If information is missing, state assumptions before continuing.

## Markdown Structure

Use this structure:

```markdown
# AI 设计执行文档：{需求名称}

> 需求 ID：{id}
> PRD 链接：{url}
> 下游设计 Skill：fliggy-design-gui

## 使用方式
将下方页面或模块片段直接发给 AI，要求其基于 fliggy-design-gui 输出设计稿方案。

## 需求摘要
{summary}

## 涉及页面
- 页面 A
- 页面 B

## 页面 1：{page}

### 模块 1：{module_name}
- 变更类型：新建 / 改现有 / 直接复用
- 执行类型：Type A / Type B / Direct Reuse
- 设计意图：{intent}
- 备注：{notes}

#### 可直接发给 AI 的执行指令
请使用 fliggy-design-gui 能力处理该模块。
优先沿用现有页面骨架，不要脱离当前页面的信息架构重做。
...
```

Full template: [template.md](template.md)

## Decomposition Heuristics

### Page Detection

Prefer stable page buckets:

- 首页
- 搜索页
- 列表页
- 下单页
- 订单详情页
- 支付页
- 个人中心
- 弹窗/浮层
- 活动页

If the PRD is ambiguous, choose the smallest page set that still covers the requirement.

### Module Detection

A module should be a designable UI unit such as:

- 搜索入口
- Banner
- 列表卡片
- 筛选栏
- 价格明细
- 乘客信息区
- 底部支付条
- 状态头部
- 快捷操作区

Avoid overly abstract modules like “核心流程” unless the PRD truly gives no smaller unit.

### Change Type

- `create`: new module or new slot inserted into an existing page
- `modify`: existing module changes behavior, layout, copy, or hierarchy
- `reuse`: keep as-is, only mention for context

## Downstream Instruction Rules

For each module, write execution instructions that:

- tell the next AI which page to work on
- tell it whether this is Type A or Type B
- preserve existing information architecture by default
- mention important constraints from the PRD
- include placeholders for states, actions, and key content if needed

Good instruction:

```markdown
请使用 fliggy-design-gui 能力处理该模块。
按 `Type B（在现有页面上修改模块）` 的方式执行。
优先沿用现有页面骨架，不要脱离当前页面的信息架构重做。
本模块核心目标：提升筛选效率并强化价格排序的可见性。
额外约束：价格排序默认为第一优先级，需要兼容低价日历联动。
```

Bad instruction:

```markdown
帮我优化一下这个页面，看起来更好。
```

## If Source Is Yuque

- fetch the readable title first
- prefer full PRD body over only summary
- if the body is noisy, strip formatting noise and keep requirement semantics
- if body content is unavailable, fall back to title + summary and mark assumptions

## Boundaries

- Do not output final HTML or final Figma code here.
- Do not invent a completely new IA unless the PRD explicitly asks for a redesign.
- Do not skip the module-level instruction block.
- Do not collapse all work into one generic paragraph.

## Success Criteria

The output is successful only if:

- another AI can read it and immediately start producing design稿
- page list is explicit
- module list is explicit
- each module has an actionable instruction
- `fliggy-design-gui` is named as the downstream execution skill
