### gstack-review-and-design-skill-integration ###
在 AI 设计助理流程中集成两项能力：1) H5 生成时读取 fliggy-flight-design-skill 的完整设计规范作为 prompt 约束；2) 需求拆解阶段新增 Gstack 四维审查，在模块清单中展示每个模块的设计审查结论。


# 集成 Gstack 审查与飞猪设计规范到 AI 设计助理

## Proposed Changes

### 后端 - AI 设计服务

#### [MODIFY] [ai-design-service.js](file:///Users/dengxinyang/Desktop/AI·Project/Requirements Management/services/ai-design-service.js)

**改动 1：升级 H5 生成 prompt，集成 fliggy-flight-design-skill 完整规范**

当前 `FLIGGY_FLIGHT_H5_SYSTEM` 是硬编码的简化版设计规范。需要：
- 在服务启动时读取 `skills/fliggy-flight-design-skill/playbooks/flight-funnel/0 Fliggy Design Skill/SKILL.md` 的核心内容（Design Tokens、组件索引、输出规范）
- 读取 `skills/fliggy-flight-design-skill/references/html-and-token-standard.md` 的硬性格式要求
- 将这些规范内容注入到 `FLIGGY_FLIGHT_H5_SYSTEM` prompt 中，替代当前硬编码的简化版

```diff
- const FLIGGY_FLIGHT_H5_SYSTEM = `你是飞猪机票资深 UX 工程师...（硬编码简化版）`;
+ // 启动时读取设计规范文件
+ const _designSkillContent = _loadDesignSkillContent();
+ const FLIGGY_FLIGHT_H5_SYSTEM = _buildH5SystemPrompt(_designSkillContent);
```

新增 `_loadDesignSkillContent()` 函数：
- 读取 `0 Fliggy Design Skill/SKILL.md` 中的 Design Tokens（`:root` 变量）、字体规范、颜色体系、圆角体系
- 读取 `html-and-token-standard.md` 中的硬性格式要求
- 读取 `框架组件.md` 中的页面骨架模板
- 返回结构化的规范内容对象

新增 `_buildH5SystemPrompt(designSkill)` 函数：
- 将读取到的规范内容组装成完整的 system prompt
- 保留现有的格式硬约束
- 增加从规范文件中提取的 token 定义、组件规范、图片库等

**改动 2：新增 Gstack 四维审查阶段**

在 `_runJob` 的 Phase 2（decomposing）和 Phase 3（planning）之间，插入 Phase 2.5（reviewing）：

```javascript
// Phase 2.5: Gstack + awesome-design 四维审查
_updateJob(job, { stage: 'reviewing' });
const reviewResult = await _callAi(planAiConfig, _buildGstackReviewPrompt(...));
```

新增 `_buildGstackReviewPrompt(title, bodyText, modules, skillKey)` 函数：
- 基于 `awesome-design-gates.md` 的四维审查框架
- 对每个模块输出四维审查结论：
  - `styleguide_branding`: 信息与品牌表达一致性
  - `color_typography`: 信息层级、可读性
  - `usability_review`: 关键任务路径完整性
  - `user_testing`: 最小可验证用例
- 每个维度标注 `PASS` / `ADVISORY` / `BLOCKING`
- 输出 JSON 格式，每个模块附带 `review` 字段

新增 `_parseReviewResult(text, modules)` 函数：
- 解析 AI 返回的审查结果
- 将审查结论合并到 modules 数组中，每个 module 增加 `review` 字段：

```json
{
  "name": "火车票引流弹窗模块",
  "review": {
    "gate_result": "PASS_WITH_NOTES",
    "dimensions": {
      "styleguide_branding": { "verdict": "PASS", "note": "模块语义清晰" },
      "color_typography": { "verdict": "PASS", "note": "层级稳定" },
      "usability_review": { "verdict": "PASS", "note": "路径完整" },
      "user_testing": { "verdict": "ADVISORY", "note": "建议补充频控验收口径" }
    },
    "blocking_count": 0,
    "summary": "结构审查通过，建议补充频控验收标准"
  }
}
```

---

### 前端 - 需求看板

#### [MODIFY] [online-index.html](file:///Users/dengxinyang/Desktop/AI·Project/Requirements Management/pages/online-index.html)

**改动 1：新增 Gstack 审查结果的 CSS 样式**

在模块卡片区域新增审查结论的展示样式：
- 四维审查标签（PASS/ADVISORY/BLOCKING 不同颜色）
- 审查摘要文本
- 折叠/展开审查详情

```css
.ai-module-review { ... }
.ai-review-tag-pass { background: rgba(52,211,153,0.12); color: #34d399; }
.ai-review-tag-advisory { background: rgba(251,191,36,0.12); color: #fbbf24; }
.ai-review-tag-blocking { background: rgba(239,68,68,0.12); color: #ef4444; }
.ai-review-summary { font-size: 11px; color: var(--text-muted); }
```

**改动 2：模块清单渲染逻辑增加审查信息**

在 `renderAiDesignSection` 中，每个模块卡片下方增加审查结论展示：
- 显示 `gate_result`（PASS / PASS_WITH_NOTES / BLOCKED）
- 四维审查标签横排展示
- 审查摘要一行文字

**改动 3：新增 reviewing 阶段的进度展示**

在 AI 设计助理进度条中增加 `reviewing` 阶段的文案：
- `reviewing` → "正在进行设计审查..."

## Verification Plan

### Manual Verification

1. 触发 AI 拆解，观察终端日志确认：
   - 设计规范文件被正确读取
   - Gstack 审查阶段被执行
   - 审查结果被正确解析并合并到 modules
2. 前端模块清单中每个模块卡片下方显示审查结论
3. 确认方案后生成的 H5 页面符合 `0 Fliggy Design Skill/SKILL.md` 的 token 和组件规范
4. 对比生成的 H5 与设计规范，验证：
   - `:root` token 定义与 SKILL.md 一致
   - 颜色使用 `var(--token-name)` 引用
   - 视口为 `width=750, user-scalable=no`
   - 图片使用 Unsplash 规范


updateAtTime: 2026/4/22 10:34:59

planId: a89f176a-59ac-4fa9-b65c-4b0256c5b761