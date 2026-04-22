### gstack-review-and-design-skill-integration ###
# 任务清单

## 后端改进

- [ ] 改进 `_buildGstackReviewPrompt`：新增 `design_focus` 和 `design_constraints` 输出要求
- [ ] 改进 `_parseReviewResult`：解析 `design_focus` 和 `design_constraints` 字段
- [ ] 改进 `_buildH5Prompt`：将审查结果（design_focus、design_constraints、审查建议）注入 H5 prompt
- [ ] 修改 `proxy-server.js`：根路径映射到 `pages/online-index.html`

## 前端改进

- [ ] 改进审查结果展示：明确展示 skill 名称、设计要点、每个维度的具体建议
- [ ] 删除根目录旧的 `online-index.html`，避免不同步

## 验证

- [ ] 重启后端，触发完整 AI 拆解流程，确认审查结果包含 design_focus
- [ ] 确认方案后生成 H5，验证 H5 中体现了审查约束

updateAtTime: 2026/4/22 12:30:56

planId: a89f176a-59ac-4fa9-b65c-4b0256c5b761