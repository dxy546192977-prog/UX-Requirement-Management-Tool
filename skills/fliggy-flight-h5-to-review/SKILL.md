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

这个 skill 是 gstack 审查的编排器，不是 gstack 本体。

### 能力选型

- **主能力**：沿用 gstack `design-review` 的视觉、层级、交互和 AI slop 审查思路
- **辅助能力**：沿用 gstack `qa-only` 的浏览器打开、截图、控制台检查和基本交互取证
- **不使用**：gstack `/review` 作为主审查器，因为它面向代码 diff，不面向 H5 原型

### 审查重点

对每个 H5 页面至少检查：

1. 信息架构与首屏层级
2. 核心模块是否符合 PRD 意图
3. 视觉节奏、间距、字体和 CTA 突出度
4. 关键交互是否可用
5. 控制台是否有报错
6. 是否存在明显 AI 味或模板味
7. 是否破坏飞猪机票现有页面骨架

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

### Step 3：形成审查判断

按以下口径输出：

- `PASS`：可进入下一步，无 Key 问题
- `PASS_WITH_NOTES`：可继续，但有中等级备注问题
- `FAIL`：存在阻断问题，需要回到 H5 阶段修正

建议分级：

- `key_issues`：阻断继续流转的问题
- `medium_issues`：不阻断，但会影响质量的问题
- `notes`：低风险提醒

### Step 4：输出统一报告

输出内容必须同时包含：

1. 审查结论
2. 问题分级统计
3. 每个问题的证据
4. 建议动作
5. 对应 H5 工件路径

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

## 关键发现
### 1. {问题标题}
- 严重级别：key / medium / note
- 页面：{page}
- 证据：{截图或控制台说明}
- 判断：{为什么这是问题}
- 建议动作：{如何回退到 H5 阶段修正}

## 建议下一步
- 若 PASS：可进入人工审查或后续精修
- 若 PASS_WITH_NOTES：建议先看备注，再决定是否继续
- 若 FAIL：返回 H5 阶段修正后重审
```

## 结构化返回建议

如果需要机器可读结果，补充：

```json
{
  "result": "PASS",
  "key_issues": 0,
  "medium_issues": 1,
  "review_scope": ["vertical.flight.home"],
  "artifact_paths": ["outputs/flight/home-v1.html"],
  "issues": [
    {
      "severity": "medium",
      "page": "首页",
      "title": "首屏 CTA 不够突出",
      "evidence": "screenshot: .gstack/design-reports/screenshots/home-first-screen.png",
      "action": "回到 H5 阶段增强按钮层级和间距"
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
- gstack 视觉审查参考：`/Users/dengxinyang/.claude/skills/gstack/.agents/skills/gstack-design-review/SKILL.md`
- gstack 浏览器取证参考：`/Users/dengxinyang/.claude/skills/gstack/.agents/skills/gstack-qa-only/SKILL.md`
