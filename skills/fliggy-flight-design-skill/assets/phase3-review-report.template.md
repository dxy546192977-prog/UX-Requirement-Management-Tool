# Phase 3 审查报告

- workflow_ref: `{path/to/Workflow.md 或 references/workflow-master.md}`
- target_html: `{相对或绝对路径}`
- review_time: `{ISO 或本地时间}`

## 1) 结构与顺序检查

- 结果：{PASS / FAIL}
- 检查项：
  - …

## 2) 规则基线检查（0 Fliggy Design Skill）

- 视口检查：{PASS / FAIL}（期望 `width=750, user-scalable=no`）
- 单文件 HTML + 内联 CSS：{PASS / FAIL}
- token 使用：{PASS / FAIL}
- 图片资源：{PASS / FAIL}

## 3) awesome-design 对标追溯检查

- benchmark_source：{PASS / FAIL}
- benchmark_dimensions：{PASS / FAIL}
- benchmark_notes：{PASS / FAIL}

## 4) 风险与建议

- key_issues: {N}
- medium_issues: {N}
- advisory:
  - …

## 5) 审查结论

```json
{
  "result": "PASS | PASS_WITH_NOTES | FAIL",
  "key_issues": 0,
  "medium_issues": 0,
  "status_recommendation": "draft | reviewed | ready"
}
```
