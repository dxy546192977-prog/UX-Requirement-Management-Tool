# 交付物、字段与状态对齐

> 与上游看板、中游 `flight-prd-to-design`、下游 Figma 交接对齐时，以本表为**审计口径**。若仓库内另有 `figma-handoff-standard.md` 等文件，以**字段名一致**为原则合并理解。

## 1. 贯穿全链路的追溯字段（强制）

以下字段在 Phase 1.5 产生，并延续至 Phase 4；**缺失则禁止**将 `figma_handoff.status` 置为 `ready`：

| 字段 | 说明 |
|------|------|
| `benchmark_source` | 对标来源，如 `gztchan/awesome-design` |
| `benchmark_dimensions` | 维度数组，如 `styleguide_branding`、`color_typography` 等 |
| `benchmark_notes` | 方法层应用点、取舍、冲突处理文字说明 |

## 2. 状态与闸门（摘录）

| 维度 | 典型状态 / 取值 | 说明 |
|------|-----------------|------|
| 上游 `ai_design.status` | `idle` → … → `completed` | `completed` 且 PRD 拆解 MD 可用后才进入本 Skill Phase 1 |
| `prd_decompose_md` | `ready` | 非空且可解析；缺失则不启动后续阶段 |
| Phase 1.2 | `must_pass` | 结构 + awesome-design 无 blocking；未通过禁止 Phase 2 |
| `route_status` | `supported` / `partial` / `unsupported` | `unsupported` 禁止进入生成，回退人工 |
| `execution_mode` | `normal` / `fallback-insert` / `human-confirmation` | 生成时必须遵守 |
| `phase2_rule_check` | `pass` | 满足 `0 Fliggy Design Skill` 输出规则 |
| `figma_handoff.status` | `draft` → `reviewed` → `ready` → `imported` → `refined` | `key_issues > 0` 时不得 `ready`；`benchmark_*` 缺失不得 `ready` |

## 3. Phase 3 与 Figma 交接一致性

- 审查结论须与 `figma_handoff.review_summary` 一致。
- `review_summary.key_issues` 与模板中的 `key_issues` 定义保持一致。

## 4. JSON 交付包形态（示例字段）

见 `../assets/figma-handoff.manifest.template.json`。实际路径按项目约定替换。
