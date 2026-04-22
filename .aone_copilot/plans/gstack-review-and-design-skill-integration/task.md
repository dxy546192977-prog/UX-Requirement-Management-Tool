### gstack-review-and-design-skill-integration ###

# 任务清单

## 后端改造

- [x] 1. 新增 `_loadDesignSkillContent()` 函数，启动时读取 `0 Fliggy Design Skill/SKILL.md`、`html-and-token-standard.md`、`框架组件.md` 的核心内容
- [x] 2. 新增 `_buildH5SystemPrompt()` 函数，用读取到的设计规范替代硬编码的 `FLIGGY_FLIGHT_H5_SYSTEM`
- [x] 3. 新增 `_buildGstackReviewPrompt()` 函数，构建 Gstack 四维审查 prompt
- [x] 4. 新增 `_parseReviewResult()` 函数，解析审查结果并合并到 modules
- [x] 5. 在 `_runJob` 中插入 Phase 3.5 审查阶段（planning 之后、存入 job 之前）
- [x] 6. 更新 `_updateJob` 调用，将审查结果（review_summary、overall_gate_result）存入 job 对象

## 前端改造

- [x] 7. 在 `online-index.html` 中新增 Gstack 审查结果的 CSS 样式（审查标签、四维维度、摘要）
- [x] 8. 修改模块清单渲染逻辑，增加审查信息展示（四维标签 + 摘要）
- [x] 9. 在进度展示中增加 `reviewing` 阶段的文案和进度条区间

## 验证

- [/] 10. 重启后端，触发 AI 拆解，验证审查结果正确展示
- [ ] 11. 确认方案后生成 H5，验证 token 和组件规范符合 SKILL.md


updateAtTime: 2026/4/22 10:34:59

planId: a89f176a-59ac-4fa9-b65c-4b0256c5b761