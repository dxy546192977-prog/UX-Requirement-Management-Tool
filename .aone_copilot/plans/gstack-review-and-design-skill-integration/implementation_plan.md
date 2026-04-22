### gstack-review-and-design-skill-integration ###
改进 Gstack 审查流程：审查阶段提炼设计要点，并将审查结论作为约束传递给 H5 生成阶段，实现"先审后生"的完整闭环。

# 改进 Gstack 审查流程：先审后生，审查约束驱动 H5 生成

## Proposed Changes

### 后端 AI 服务 (ai-design-service.js)

#### [MODIFY] [ai-design-service.js](file:///Users/dengxinyang/Desktop/AI·Project/Requirements Management/services/ai-design-service.js)

**改动 1：改进审查 prompt（`_buildGstackReviewPrompt`）**

当前审查 prompt 只输出四维评分 + 简单 note。需要改进为：
- 在每个模块的审查结果中新增 `design_focus` 字段：提炼出该模块需要重点设计的要点（如：信息层级、异常态处理、交互动效等）
- 在每个维度的 note 中，不只是描述问题，还要给出**具体的设计建议**
- 新增 `design_constraints` 字段：整体的设计约束清单（如：必须处理的异常流、必须遵循的品牌规范等）

输出 JSON 新增字段示例：
```json
{
  "modules": [
    {
      "name": "火车票引流弹窗",
      "design_focus": [
        "弹窗触发时机与动画过渡",
        "价差信息的视觉层级（主副文案字号对比）",
        "网络异常/无高铁票的降级展示",
        "按钮交互态（hover/press/disabled）"
      ],
      "dimensions": { ... }
    }
  ],
  "design_constraints": [
    "所有动态拼接文案需定义最大字符数和换行规则",
    "弹窗必须包含 Loading、异常、空态三种状态",
    "按钮文案需对齐飞猪品牌情感化设计规范"
  ]
}
```

**改动 2：审查结果传递到 H5 生成（`_buildH5Prompt`）**

当前 `_buildH5Prompt` 只传递了模块名称和意图，没有传递审查结果。需要改进为：
- 在 H5 prompt 中新增 `## Gstack 审查约束` 段落
- 列出每个模块的 `design_focus`（设计要点）
- 列出整体的 `design_constraints`（设计约束）
- 列出每个维度的具体建议（ADVISORY 和 BLOCKING 项）

```diff
## 已确认的模块清单
${moduleList}

+ ## Gstack 审查约束（必须在设计中体现）
+ ### 设计要点
+ ${designFocusList}
+ ### 设计约束
+ ${designConstraintsList}
+ ### 审查建议（ADVISORY/BLOCKING 项）
+ ${reviewNotesList}

## PRD 正文
```

**改动 3：`_parseReviewResult` 解析新增字段**

解析审查结果时，提取 `design_focus` 和 `design_constraints` 字段，合并到 modules 和 job 对象中。

---

### 前端展示 (online-index.html)

#### [MODIFY] [online-index.html](file:///Users/dengxinyang/Desktop/AI·Project/Requirements Management/pages/online-index.html)

**改动 4：改进审查结果展示**

在模块清单下方展示：
- 明确标注调用了 `Gstack awesome-design-gates` 的哪些维度
- 每个维度的具体建议（不只是标签，而是完整的 note）
- 设计要点清单（`design_focus`）
- 审查总结

**改动 5：同步根目录 HTML**

确保 `online-index.html`（根目录）和 `pages/online-index.html` 保持一致，或者修改 `proxy-server.js` 让根路径直接指向 `pages/online-index.html`。

---

### 静态文件路由 (proxy-server.js)

#### [MODIFY] [proxy-server.js](file:///Users/dengxinyang/Desktop/AI·Project/Requirements Management/proxy-server.js)

**改动 6：修改根路径映射**

将 `if (pathname === '/') pathname = '/online-index.html';` 改为 `if (pathname === '/') pathname = '/pages/online-index.html';`，避免两个文件不同步的问题。

## Verification Plan

### Automated Tests
- 重启后端，触发一次完整的 AI 拆解流程
- 检查后端日志确认审查阶段输出了 `design_focus` 和 `design_constraints`
- 检查 H5 生成 prompt 中是否包含审查约束
- 在浏览器中确认审查结果展示正确

### Manual Verification
- 在浏览器中打开需求看板，确认模块清单下方展示了完整的审查结果
- 确认方案后生成 H5，验证 H5 中是否体现了审查约束（如异常态处理、品牌规范等）

updateAtTime: 2026/4/22 12:30:56

planId: a89f176a-59ac-4fa9-b65c-4b0256c5b761