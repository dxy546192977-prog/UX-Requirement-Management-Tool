# awesome-design 审查与对标（方法层）

> 参考源（方法层，不照搬视觉）：`https://github.com/gztchan/awesome-design`

## Phase 1.2：需求审查闸门（先审后生）

在 PRD 拆解 MD 结构化完成后、进入设计生成前，**必须**完成：

1. **结构审查**：模块边界、页面归属、意图类型、冲突项。
2. **awesome-design 四维检查**（每条标注 `blocking` 或 `advisory`）：

| 维度 key | 检查重点 |
|----------|----------|
| `styleguide_branding` | 信息与品牌表达一致；模块命名与语义清晰 |
| `color_typography` | 信息层级、可读性、文本组织是否支撑落地 |
| `usability_review` | 关键任务路径完整；无阻断交互或缺失场景 |
| `user_testing` | 最小可验证用例与验收口径可复现 |

3. **通过条件**：结构审查通过，且四维**无 blocking**。
4. **阻断处理**：任一维度 blocking → 回退 Phase 1 修正 MD → 重审 Phase 1.2。
5. **审查输出契约**：审查结论摘要 + blocking 清单 + 修正建议；可映射到后续 `benchmark_source` / `benchmark_dimensions` / `benchmark_notes`。

## Phase 1.5：外部设计基线对标

对每个页面/模块做方法层映射（非抄样式）：

1. `benchmark_source`：固定为 `gztchan/awesome-design`（或工作流约定的等价写法）。
2. `benchmark_dimensions`：至少包含上述三类维度中的相关子集（常见为四维数组）。
3. `benchmark_notes`：应用点、取舍点、与飞猪基线冲突时的处理。
4. **冲突原则**：与机票/飞猪信息架构冲突时，**优先保留飞猪页面 IA 与业务路径**，不做结构性破坏。

## 返工循环（设计不通过时）

1. `web_search` 等优先参考 `gztchan/awesome-design` 相关分类。
2. 可补充竞品参考 → 展示参考 → 询问方向 → 重新生成。
3. 记录失败经验到 `.learnings/`（见 `agent-protocol.md`）。
