# skills/ — 本项目自研 Skill 索引

> 本目录是 **UX-Requirement-Management-Tool 项目自研** 的 Agent Skill 集合。
> 外部锁定（GitHub / 内部 Git）的 skill 在 `.agents/skills/`（如 `ceo`、`idea`、`uxdesign-buff`、`yuque`、`fliggy-design-gui`、`fliggy-design-skill`、`yuque-doc-fetch`），由 `skills-lock.json` 管理，**不在本目录维护**。

## 本目录一览

| 目录 | 定位 | 触发语（示例） | 何时用 |
|---|---|---|---|
| [`flight-prd-to-design/`](./flight-prd-to-design/) | **飞猪机票场景统一入口**（编排层） | "把 PRD 变成设计稿"、"走一遍机票完整流程" | 需要一条龙从 PRD → 设计 → Figma 时 |
| [`prd-recognition/`](./prd-recognition/) | **PRD 结构化拆解**（通用） | "拆解语雀 PRD"、"把 PRD 变成 AI 可执行文档" | 任何 PRD 需要结构化、可路由化时 |
| [`fliggy-flight-design-skill/`](./fliggy-flight-design-skill/) | **机票 UX 执行层**（物料 + 规则 + 模板） | "飞猪机票首页/列表/OTA/下单"、"按 Workflow 生成 H5" | 已经拆解好，需要真正生成机票 H5 设计稿时 |
| [`vibecoding-helper-skill/`](./vibecoding-helper-skill/) | **通用 Vibecoding 引导**（与机票无关） | "我想做一个产品"、"帮我 vibecoding" | 非技术用户从模糊想法到可交付 PRD 文档包时 |
| [`skills-index-governance-skill/`](./skills-index-governance-skill/) | **Skill 目录治理与标准化**（治理层） | "整理 skill 文件夹"、"标准化 Agent Skill" | 需要治理/新增/校验技能目录时 |

## 调用链：飞猪机票 PRD → 设计稿 → Figma

```text
用户 PRD（语雀 / 本地 / 摘要）
        │
        ▼
┌────────────────────────────────┐
│ flight-prd-to-design (编排)     │  统一入口
└────────────────────────────────┘
        │
        ├── 调用 prd-recognition                 → 结构化执行单
        │    （并强制贯彻 idea / ceo / uxdesign-buff 三技能，位于 .agents/skills/）
        │
        ├── 执行 routing.md                      → page_id + 基线物料
        │
        ▼
┌────────────────────────────────┐
│ fliggy-flight-design-skill     │  执行层：Workflow + 物料 + 审查
│  ├── references/ (规则真相源)  │
│  ├── playbooks/flight-funnel/  │
│  ├── scripts/ (Figma/HTML 脚本)│
│  └── mock-tests/ (演示输出)    │
└────────────────────────────────┘
        │
        ▼
单文件 H5 HTML  ──→  HTML to Figma 插件  ──→  Figma 交付包
```

> `vibecoding-helper-skill` 独立于上面这条链路，面向的是"我有个想法但不知道怎么开始"的非技术用户，目标产物是 `PRDS/` 文档包给 Cursor/Trae 开发。

## 快速选 Skill 决策树

1. 用户说"做一个 xxx 产品 / 工具"且**不是**机票场景
   → 进 `vibecoding-helper-skill/SKILL.md`
2. 用户给了一份机票 PRD（语雀链接或文档），希望最终交付 Figma 稿
   → 进 `flight-prd-to-design/SKILL.md`（它会自动调用下面两个）
3. 用户只想拆解 PRD，不一定要到设计稿
   → 进 `prd-recognition/SKILL.md`
4. 用户已经有拆解好的 MD 或想直接生成机票 H5
   → 进 `fliggy-flight-design-skill/SKILL.md`
5. 用户要整理 `skills/` 目录、沉淀标准结构、生成可安装 Skill 包
   → 进 `skills-index-governance-skill/SKILL.md`

## 安装 / 加载方式

本目录下每个子目录都是一个**独立可安装的 Agent Skill 包**，有自己的 `SKILL.md` 入口。

- **Cursor**：把目录整个拷到 `<project>/.cursor/skills/<skill-name>/` 或 `%USERPROFILE%\.cursor\skills\<skill-name>\`
- **Claude Code / 通用 `.claude/skills`**：拷到 `~/.claude/skills/<skill-name>/`
- **本仓库内**：Agent 可直接读 `skills/<skill-name>/SKILL.md` 加载，无需额外安装

单个 skill 的详细安装说明见各自的 `README.md`。

## 目录内容清单

```text
skills/
├── README.md                         ← 本文件：自研 skill 索引与调用链
├── flight-prd-to-design/             ← 机票场景统一编排入口
│   ├── SKILL.md
│   ├── routing.md                    （首期路由与降级策略）
│   ├── figma-handoff-standard.md     （HTML → Figma 交付标准）
│   └── google-awesome-design-baseline.md
├── prd-recognition/
│   ├── SKILL.md
│   └── template.md                   （输出 Markdown 模板）
├── fliggy-flight-design-skill/       ← 机票执行层（大包）
│   ├── SKILL.md                      （入口）
│   ├── README.md                     （人类说明 + 安装）
│   ├── Workflow.md / 设计哲学.md / 自我进化.md  ← references/ 的兼容镜像
│   ├── references/                   （规则真相源）
│   ├── playbooks/flight-funnel/      （页面与组件物料库）
│   ├── scripts/                      （Figma/HTML 自动化脚本）
│   ├── assets/                       （模板）
│   ├── mock-tests/                   （演示与样例产出）
│   └── .learnings/                   （失败与返工学习日志）
├── vibecoding-helper-skill/          ← 通用（非机票）
    ├── SKILL.md
    ├── agents/agent1-3-*.md          （三阶段 Agent 分工）
    ├── assets/
    └── references/
└── skills-index-governance-skill/    ← Skill 目录治理（本次新增）
    ├── SKILL.md
    ├── README.md
    ├── references/                   （结构/内容/边界/安装标准）
    ├── scripts/                      （结构校验与索引生成）
    ├── assets/                       （SKILL/README 模板）
    └── .learnings/                   （治理学习记录）
```

## 外部依赖的 Skill（位于 `.agents/skills/`）

`flight-prd-to-design` / `prd-recognition` 在执行时会调用以下外部锁定的 skill，它们**不在本目录**，由 `skills-lock.json` 统一拉取到 `.agents/skills/`：

| 外部 Skill | 路径 | 用途 |
|---|---|---|
| `idea` | `.agents/skills/idea/SKILL.md` | 发散、假设、待验证点 |
| `ceo` | `.agents/skills/ceo/SKILL.md` | 商业与战略压测 |
| `uxdesign-buff` | `.agents/skills/uxdesign-buff/SKILL.md` | 体验与设计评审 |
| `fliggy-design-gui` | `.agents/skills/fliggy-design-gui/SKILL.md` | 设计编排 |
| `fliggy-design-skill` | `.agents/skills/fliggy-design-skill/SKILL.md` | 飞猪设计规范 |
| `yuque` / `yuque-doc-fetch` | `.agents/skills/yuque*/SKILL.md` | 语雀文档抓取 |

> 之前本目录下存在 `fliggy-design-gui`、`fliggy-design-skill`、`yuque-doc-fetch` 三个**无扩展名的文本文件**，内容是指向 `.agents/skills/` 的相对路径。它们在 Windows 下并不是真正的符号链接，也没有被任何代码引用，属于失效的占位文件，已清理。需要引用这些外部 skill 时，**请直接写 `.agents/skills/<name>/SKILL.md`**。

## 维护约定

- 本目录下每个 skill 必须有 `SKILL.md`（Agent 入口）和 `README.md`（人类说明）
- 修改 `fliggy-flight-design-skill/Workflow.md` 或 `设计哲学.md` 时，**同步更新** `references/workflow-master.md` 与 `references/agent-protocol.md`（已在该 skill README 中约定）
- 新增 skill 时，请在本文件的"本目录一览"表格和决策树中补充条目
- 跨 skill 引用统一写相对仓库根的路径，例如 `skills/fliggy-flight-design-skill/playbooks/...`
