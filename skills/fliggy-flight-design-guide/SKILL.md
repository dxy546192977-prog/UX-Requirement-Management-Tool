---
name: fliggy-flight-design-guide
version: 1.0.0
description: |
  飞猪机票 UX/设计执行指南：PRD 拆解接入 → 审查闸门 → 对标 → 单文件 H5 设计稿 → 审查 → Figma 交付。
  与页面物料库（playbooks/flight-funnel）、mock 演示（mock-tests）配套使用。
---

# 飞猪机票设计指南（标准入口）

本目录为**可安装的 Agent Skill 包**。执行任何机票相关设计任务前，先读本文件，再按「执行步骤」打开 `references/` 中的细则。

## Skill 职责

1. **编排机票设计流水线**：从 PRD 拆解 Markdown 到可交付 HTML，再到审查与 Figma 交接语义（与上游看板、中游 `fliggy-flight-prd-to-h5` 衔接时，以 `references/workflow-master.md` 为流程真相源）。
2. **约束设计稿形态**：单文件 HTML + 内联 CSS、750 视口、Design Token、图片与组件读取顺序（细则见 `references/html-and-token-standard.md`，完整组件/token 以物料库为准）。
3. **方法层质量闸门**：gstack 结构审查 + `awesome-design` 四维（`references/awesome-design-gates.md`）；全链路字段与状态见 `references/deliverables-and-state.md`。
4. **行为与决策协议**：输入识别、多分支执行流程、学习日志、flyai 字段映射等见 `references/agent-protocol.md`。
5. **自动化辅助**：Figma/HTML 解析脚本在 `scripts/`；页面骨架与报告模板在 `assets/`。

## 触发场景（何时加载本 Skill）

在以下任一情况**必须**加载并遵循本 Skill：

- 用户提到：飞猪机票、机票首页/列表/OTA/下单/订单详情、PRD 转设计稿、机票 H5 mock、价格提醒等**机票域**界面生成或改版。
- 用户给出：PRD 拆解 Markdown、模块清单、或「按 Workflow 走」的显式指令。
- 需要将产出对齐：**单文件 HTML**、**750 viewport**、**`:root` + `var()`**、**benchmark\_\*** 追溯字段、**figma_handoff** 交付结构。
- 用户要求使用本仓库内「playbooks/flight-funnel」页面物料（原称机票四连跳）或 Fliggy Design Chat 规范生成代码。

## 物料库路径（本包内相对路径）

| 用途 | 路径 |
|------|------|
| 对话式 UI 规范入口（生成前必读） | `playbooks/flight-funnel/0 Fliggy Design Skill/SKILL.md` |
| 各页面模块（首页/列表/OTA/订单等） | `playbooks/flight-funnel/` 下对应数字目录 |
| 流程演示与样例产出 | `mock-tests/` |

**读取纪律**：先读 `0 Fliggy Design Skill/SKILL.md`，再**按需**读组件 `README.md`；禁止一次性全量读取所有组件目录。

## 执行步骤（Agent 必做顺序）

### A. 接入与结构化（Phase 1）

1. 取得上游 **PRD 拆解 Markdown**（或本地等价文档）。
2. 解析模块表：模块名、页面、意图、`change_type`、`notes`；补齐路由/执行所需字段（如 `page_id`、`module_slug`、`baseline_artifact`），与 `prd-recognition` 契约对齐（见 `references/workflow-master.md` 字段映射表）。
3. 输出执行计划，**暂停**等用户确认（可用 `assets/execution-plan.template.md`）。

### B. 审查闸门（Phase 1.2）

1. 结构审查：模块边界、页面归属、冲突项。
2. **awesome-design 四维**：`styleguide_branding`、`color_typography`、`usability_review`、`user_testing`；标注 blocking / advisory。
3. 无 blocking 才允许进入设计生成；否则回退修正 MD 并重审（见 `references/awesome-design-gates.md`）。

### C. 外部基线对标（Phase 1.5）

1. 固定参考源与方法维度；产出 `benchmark_source`、`benchmark_dimensions`、`benchmark_notes`。
2. 与飞猪信息架构冲突时，**保留业务路径**，不破坏性套用外部视觉（见 `references/workflow-master.md`）。

### D. 设计稿生成（Phase 2）

1. 确认中游路由：`route_key`、`route_status`、`execution_mode`、`resolved_baseline_artifact`；`unsupported` 不得进入生成。
2. 严格执行 `playbooks/flight-funnel/0 Fliggy Design Skill/SKILL.md` 的技术与读取策略。
3. 按需读页面 `example-full.html` / 模块 `spec.md`、回顾 `.learnings/DESIGN_LEARNINGS.md`（若存在）。
4. 需要真实航班数据时：使用 `flyai`（字段映射见 `references/flyai-field-mapping.md`）。
5. 生成单文件 HTML，**暂停**等用户确认。

### E. 审查（Phase 3）

1. 截图/快照验证（如 gstack browse）；CEO + Design 维度审查；核对 `benchmark_*` 完整性。
2. 输出审查报告（可用 `assets/phase3-review-report.template.md`）；`key_issues > 0` 或对标字段缺失时，交付状态不得标为 `ready`（见 `references/deliverables-and-state.md`）。

### F. Figma 交接（Phase 4）

1. 全页截图存档；HTML to Figma 插件导入；交付清单含对标说明。
2. 结构化交接可使用 `assets/figma-handoff.manifest.template.json`。

### G. 持续学习

失败与返工记录写入 `.learnings/DESIGN_LEARNINGS.md`（条目格式见 `references/agent-protocol.md`）；日志分类与优先级见 `references/self-evolution-log.md`。

## 输出标准（验收清单）

生成类产出须同时满足：

| 类别 | 标准 |
|------|------|
| 文件形态 | 单文件 `.html`，样式仅内联 `<style>`，无外链 CSS |
| 视口 | `<meta name="viewport" content="width=750, user-scalable=no">` |
| Token | 颜色、圆角等使用 `var(--*)`；`:root` 中集中定义 token，禁止无依据散落 hex |
| 组件读取 | 遵守「入口 SKILL → 按需 README → 必要时 example」顺序 |
| 图片 | 默认 Unsplash 真实图 + 尺寸参数；若改用飞猪线上素材须在产出中注明取舍 |
| 追溯 | 携带 `benchmark_source`、`benchmark_dimensions`、`benchmark_notes`（贯穿 Phase 1.5–4） |
| 测试产物 | 非正式基线 mock 放入 `mock-tests/`，勿污染物料库 |

审查类产出须包含：结构检查结果、规则基线检查、对标追溯检查、风险分级、`result` 与 `key_issues` 结论（与 `figma_handoff.review_summary` 对齐）。

## 目录结构（安装后）

```text
fliggy-flight-design-guide/
├── SKILL.md                 ← 本文件：职责、触发、步骤、输出标准
├── README.md                ← 人类说明与安装方式
├── Workflow.md              ← 与 references/workflow-master.md 同步的流程锚点（保留兼容）
├── 设计哲学.md              ← 与 references/agent-protocol.md 同步（保留兼容文件名）
├── references/              ← 格式要求、流程、状态机、协议全文
├── scripts/                 ← 可执行自动化脚本
├── assets/                  ← 可复用模板
├── playbooks/flight-funnel/ ← 页面与组件物料库（机票漏斗）
└── mock-tests/              ← 演示与样例输出
```

## 相关引用速查

| 文档 | 用途 |
|------|------|
| `references/workflow-master.md` | 端到端阶段、交互协议、原则 |
| `references/html-and-token-standard.md` | HTML/token/图片硬性格式 |
| `references/awesome-design-gates.md` | 四维审查与 Phase 1.2/1.5 |
| `references/deliverables-and-state.md` | 字段、状态机、与 Figma 交接约束 |
| `references/agent-protocol.md` | 自动决策、分支流程、学习日志、spec 写法 |
| `references/flyai-field-mapping.md` | flyai JSON → 界面字段 |
| `references/self-evolution-log.md` | 自我进化记录结构 |

外部编排（若已安装）：`fliggy-flight-prd-to-h5`、`prd-recognition`、项目内 `docs/*workflow*.md` 与本 Skill 并行阅读，以字段对齐表为准。
