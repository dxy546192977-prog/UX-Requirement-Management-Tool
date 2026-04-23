---
name: fliggy-flight-design-guide
description: 飞猪机票设计执行标准。用于机票首页/列表/OTA/下单/订单详情的 PRD 转单文件 HTML、审查与 Figma 交接。用户提到飞猪机票改版、PRD 转设计稿、机票 H5、750 视口或 benchmark/figma_handoff 字段时触发。
---

# Fliggy Flight Design Guide

## Skill 职责

1. 统一机票设计链路：PRD 拆解接入、审查闸门、设计生成、审查、Figma 交接。
2. 约束输出格式：单文件 HTML、750 视口、Design Token、可追溯交付字段。
3. 固化执行标准：统一读取顺序、审查维度、状态跃迁和交付口径。
4. 提供复用能力：模板放在 `assets/`，自动化检查放在 `scripts/`。

## 触发场景

在以下情况加载本 Skill：

- 用户提到飞猪机票页面设计（首页、列表、OTA、下单、订单详情）。
- 用户要求 PRD 转设计稿、机票 H5 页面生成或改版。
- 用户明确要求符合单文件 HTML、750 viewport、`:root + var()`。
- 用户要求携带 `benchmark_*` 或 `figma_handoff` 结构化交付字段。

## 执行步骤

1. **Phase 1：接入与结构化**
   - 读取 PRD 拆解 Markdown。
   - 提取并补齐字段：`name`、`page`、`intent`、`change_type`、`notes`、`page_id`、`module_slug`、`baseline_artifact`。
   - 输出执行计划（模板：`assets/execution-plan.template.md`），等待确认。

2. **Phase 1.2：审查闸门**
   - 执行结构审查和 `awesome-design` 四维审查。
   - 四维包含：`styleguide_branding`、`color_typography`、`usability_review`、`user_testing`。
   - 有 blocking 项则回退修正，不进入生成阶段。

3. **Phase 1.5：外部对标**
   - 固定对标源：`gztchan/awesome-design`。
   - 生成并保留：`benchmark_source`、`benchmark_dimensions`、`benchmark_notes`。
   - 与飞猪业务路径冲突时，优先保留业务信息架构。

4. **Phase 2：设计生成**
   - 先校验路由字段：`route_key`、`route_status`、`execution_mode`、`resolved_baseline_artifact`。
   - `route_status=unsupported` 时中止并回退。
   - 按读取顺序执行：入口 `playbooks/flight-funnel/0 Fliggy Design Skill/SKILL.md` -> 组件 `README.md` -> 必要时 `example`。
   - 产出单文件 HTML，等待确认。

5. **Phase 3：设计审查**
   - 快照验证 + 规则核验 + 对标字段完整性核验。
   - 输出审查报告（模板：`assets/phase3-review-report.template.md`）。
   - `key_issues > 0` 或 `benchmark_*` 缺失，禁止标记 ready。

6. **Phase 4：Figma 交接**
   - 输出交付清单与结构化交接文件。
   - 交接模板：`assets/figma-handoff.manifest.template.json`。

## 输出标准

### 设计稿输出标准

- 文件形态：单文件 `.html`，仅内联 `<style>`。
- 视口：`<meta name="viewport" content="width=750, user-scalable=no">`。
- Token：在 `:root` 统一定义，样式通过 `var(--*)` 使用。
- 组件读取：仅按需读取组件说明，禁止全量扫描物料目录。
- 可追溯性：必须包含 `benchmark_source`、`benchmark_dimensions`、`benchmark_notes`。

### 审查输出标准

- 必须给出 `result`、`key_issues`、风险分级和修复建议。
- 必须核对 `figma_handoff.review_summary` 与审查结论一致。
- 必须在结论中说明是否满足 `references/deliverables-and-state.md`。

## 标准目录结构

```text
fliggy-flight-design-guide/
├── SKILL.md
├── README.md
├── references/
├── scripts/
├── assets/
└── playbooks/flight-funnel/
```

## 参考文档

- 总流程：`references/workflow-master.md`
- HTML 与 Token：`references/html-and-token-standard.md`
- 审查闸门：`references/awesome-design-gates.md`
- 状态与交付：`references/deliverables-and-state.md`
- Agent 协议：`references/agent-protocol.md`
- flyai 字段映射：`references/flyai-field-mapping.md`
- 演进日志标准：`references/self-evolution-log.md`
