# 飞猪机票设计指南（可安装包）

本文件夹为 **Agent Skill 标准布局**：根目录 `SKILL.md` 为执行入口，`references/` 为格式与流程真相源，`scripts/` 为可自动化脚本，`assets/` 为可复用模板；`playbooks/flight-funnel/` 为页面与组件物料库（机票漏斗 playbook），`mock-tests/` 为演示与样例输出。

## 安装方式

### Cursor

将本目录**整个拷贝**到：

- 项目内：`<你的项目>/.cursor/skills/fliggy-flight-design-guide/`
- 或用户级：`%USERPROFILE%\.cursor\skills\fliggy-flight-design-guide\`

在规则或对话中引导模型：**加载** `fliggy-flight-design-guide/SKILL.md`。

### Claude Code / 通用 `.claude/skills`

拷贝到：

- `~/.claude/skills/fliggy-flight-design-guide/`

确保 `SKILL.md` 位于该文件夹根目录。

## 本地依赖 Skill（已内置）

为便于在当前仓库内持续优化，本 skill 已 vendoring 三个飞猪相关依赖到本目录：

- `dependencies/skills/fliggy-design-skill/`（对话式 AI 页面规范）
- `dependencies/skills/fliggy-design-system/`（飞猪移动端通用页面设计系统）
- `dependencies/skills/fliggy-design-language/`（FDL：常规 App 页编排）

建议在优化 `fliggy-flight-design-guide` 时优先读取以上本地路径，不依赖全局安装路径。

### 验证安装

1. 确认存在文件：`SKILL.md`、`references/workflow-master.md`、`playbooks/flight-funnel/0 Fliggy Design Skill/SKILL.md`。
2. （可选）运行静态检查：

```bash
python scripts/validate_design_html.py mock-tests/outputs/flight-home-price-alert-v5.shaped-from-1-home.mock.html
```

## 目录结构（标准）

```text
fliggy-flight-design-guide/
├── SKILL.md              # Agent 主入口：职责、触发、步骤、输出标准
├── README.md             # 本文件
├── Workflow.md           # 流程锚点（与 references/workflow-master.md 一致）
├── 设计哲学.md           # 行为协议全文（与 references/agent-protocol.md 一致）
├── 自我进化.md           # 与 references/self-evolution-log.md 一致
├── references/           # 格式要求、闸门、状态机、协议索引
├── scripts/              # Figma 解析、HTML 校验等
├── assets/               # 执行计划、审查报告、交接 JSON、HTML 骨架模板
├── playbooks/            # 场景化物料编排
│   └── flight-funnel/    # 机票漏斗：页面与组件物料（含 0 Fliggy Design Skill）
├── mock-tests/           # 工作流演示与 mock 产出
└── 需求/                 # 业务专项资料（若有）
```

## 与其它 Skill 的关系

- **编排总入口**（若已安装）：`fliggy-flight-prd-to-h5`（PRD → 设计 → Figma）。
- **本包定位**：机票域 **执行层** 物料 + 规则 + 模板；详细阶段衔接见 `references/workflow-master.md` 首节「项目位置与职责边界」。

## 首期推荐工作流（与本仓库其它目录联用时）

- 统一入口（若存在于本仓库）：`skills/fliggy-flight-prd-to-h5/SKILL.md`
- 团队 SOP（若存在）：`docs/flight-prd-to-figma-workflow.md`
- 拆解模板（若存在）：`skills/prd-recognition/template.md`
- 执行主锚：`Workflow.md` 或 `references/workflow-master.md`

## 生成规则基线（强制摘要）

- 设计生成前必读：`playbooks/flight-funnel/0 Fliggy Design Skill/SKILL.md`
- 读取顺序：入口 SKILL → 按需组件 `README.md` → 必要时 `example.html`；禁止全量读取所有组件
- 技术约束摘要见 `references/html-and-token-standard.md`
- mock 与实验性 HTML 放在 `mock-tests/`，避免污染物料库

## 文档类型约定

- `SKILL.md`：流程与行为规范（Agent）
- `框架组件.md`、`框架结构.md`、`page-frame.md`：页面骨架层
- `spec.md`：模块配置与变体
- `README.md`：模块说明或目录索引

## 维护约定

- 修改流程时：同时更新 `Workflow.md` 与 `references/workflow-master.md`（保持内容一致）。
- 修改 Agent 行为协议时：同时更新 `设计哲学.md` 与 `references/agent-protocol.md`。
