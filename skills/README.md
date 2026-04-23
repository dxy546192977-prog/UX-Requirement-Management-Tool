# skills/ — 本项目自研 Skill 索引

> 本目录是 **UX-Requirement-Management-Tool 项目自研** 的 Agent Skill 集合。
> 外部锁定（GitHub / 内部 Git）的 skill 通常在 `.agents/skills/`（如 `ceo`、`idea`、`uxdesign-buff`、`yuque`、`fliggy-design-gui`、`yuque-doc-fetch`），由 `skills-lock.json` 管理。  
> 机票训练与生成统一入口为 `skills/fliggy-flight-design-guide/`，规则基线读取 `references/workflow-master.md` 等文档。

## 本目录一览

| 目录 | 定位 | 触发语（示例） | 何时用 |
|---|---|---|---|
| [`fliggy-flight-prd-to-h5/`](./fliggy-flight-prd-to-h5/) | **飞猪机票前半段编排入口**（PRD → H5） | "把 PRD 变成 H5"、"走一遍机票前期流程" | 需要从 PRD 拆解、路由并产出 H5 时 |
| [`fliggy-flight-design-guide/`](./fliggy-flight-design-guide/) | **机票 UX 执行层**（物料 + 规则 + 模板） | "飞猪机票首页/列表/OTA/下单"、"按 Workflow 生成 H5" | 已经拆解好，需要真正生成机票 H5 设计稿时 |
| [`fliggy-flight-h5-to-review/`](./fliggy-flight-h5-to-review/) | **飞猪机票 H5 审查入口**（H5 → gstack report） | "审查这个 H5"、"把 H5 丢给 gstack 看看" | 已经有 H5，需要浏览器驱动审查和放行结论时 |
| [`fliggy-flight-h5-to-figma/`](./fliggy-flight-h5-to-figma/) | **飞猪机票 H5 → Figma 改稿**（Vibma + MCP） | "用 Vibma 改 Figma 文案"、"只改文本不改 UI" | 已有 Figma 链接与 node-id，需 relay、节点级改稿与交付报告时 |
| [`fliggy-flight-summary/`](./fliggy-flight-summary/) | **机票流程收口汇总**（执行监控看板） | "生成流程摘要"、"输出 workflow-monitor"、"汇总这次机票需求的执行数据" | 4 个机票 skill 执行完毕后，需要生成可视化监控看板时 |

## 调用链：飞猪机票 PRD → H5 → 审查 → 汇总

```text
用户 PRD（语雀 / 本地 / 摘要）
        │
        ▼
┌────────────────────────────────┐
│  fliggy-flight-prd-to-h5       │  前半段：PRD → H5
│  （编排入口）                  │
└────────────────────────────────┘
        │
        ├── 执行 routing.md                      → page_id + 基线物料
        │    （可调用 idea / ceo / uxdesign-buff，位于 .agents/skills/）
        │
        ▼
┌────────────────────────────────┐
│  fliggy-flight-design-guide    │  执行层：Workflow + 物料 + 审查
│  ├── references/ (规则真相源)  │
│  ├── playbooks/flight-funnel/  │
│  ├── scripts/ (Figma/HTML 脚本)│
│  └── assets/ (模板)            │
└────────────────────────────────┘
        │
        ▼
单文件 H5 HTML
        │
        ▼
┌──────────────────────────────────────┐
│  fliggy-flight-h5-to-review          │  审查层：H5 → gstack report
└──────────────────────────────────────┘
        │
        ▼
审查报告 / 放行结论
        │
        ├──→  fliggy-flight-h5-to-figma          Figma 文案改稿（可选）
        │
        ▼
┌──────────────────────────────────────┐
│  fliggy-flight-summary               │  收口层：生成 workflow-monitor.html
└──────────────────────────────────────┘
        │
        ▼
可视化流程监控看板（workflow-monitor.html）
```

> 机票场景长期优化时，`fliggy-flight-design-guide` 的规则基线读取 `skills/fliggy-flight-design-guide/references/workflow-master.md`。

## 快速选 Skill 决策树

1. 用户给了一份机票 PRD（语雀链接或文档），希望先产出 H5
   → 进 `fliggy-flight-prd-to-h5/SKILL.md`
2. 用户已经有拆解好的 MD 或想直接生成机票 H5
   → 进 `fliggy-flight-design-guide/SKILL.md`
3. 用户已经有 H5，想交给 gstack 审查
   → 进 `fliggy-flight-h5-to-review/SKILL.md`
4. 用户要在 Figma 里改文案 / 接 Vibma MCP、节点级批量改写
   → 进 `fliggy-flight-h5-to-figma/SKILL.md`
5. 用户需要汇总本次机票需求的执行数据、生成流程监控看板
   → 进 `fliggy-flight-summary/SKILL.md`

## 安装 / 加载方式

本目录下每个子目录都是一个**独立可安装的 Agent Skill 包**，有自己的 `SKILL.md` 入口。

- **Cursor**：把目录整个拷到 `<project>/.cursor/skills/<skill-name>/` 或 `%USERPROFILE%\.cursor\skills\<skill-name>\`
- **Claude Code / 通用 `.claude/skills`**：拷到 `~/.claude/skills/<skill-name>/`
- **本仓库内**：Agent 可直接读 `skills/<skill-name>/SKILL.md` 加载，无需额外安装

单个 skill 的详细安装说明见各自的 `README.md`。

## 目录内容清单

```text
skills/
├── README.md                              ← 本文件：自研 skill 索引与调用链
├── fliggy-flight-prd-to-h5/              ← 机票前半段编排入口（PRD → H5）
│   ├── SKILL.md
│   ├── README.md
│   ├── routing.md                         （首期路由与降级策略）
│   ├── figma-handoff-standard.md          （HTML → Figma 交付标准）
│   ├── google-awesome-design-baseline.md
│   └── image/                             （参考图资源）
├── fliggy-flight-design-guide/            ← 机票执行层（大包）
│   ├── SKILL.md                           （入口）
│   ├── README.md                          （人类说明 + 安装）
│   ├── references/                        （规则真相源）
│   ├── playbooks/flight-funnel/           （页面与组件物料库）
│   ├── scripts/                           （Figma/HTML 自动化脚本）
│   ├── assets/                            （模板）
│   └── dist/                              （打包产物）
├── fliggy-flight-h5-to-review/            ← H5 审查编排入口（H5 → gstack report）
│   ├── SKILL.md
│   └── README.md
├── fliggy-flight-h5-to-figma/            ← H5 / Figma：Vibma + MCP 文案改稿
│   ├── SKILL.md
│   ├── README.md
│   ├── references/
│   ├── scripts/
│   └── assets/
└── fliggy-flight-summary/                 ← 机票流程收口汇总（执行监控看板）
    ├── SKILL.md
    ├── README.md
    ├── assets/                            （输入样例 JSON）
    └── scripts/                           （generate-flight-summary.mjs）
```

## 外部依赖的 Skill（位于 `.agents/skills/`）

`fliggy-flight-prd-to-h5` 在执行时可调用以下外部锁定的 skill，由 `skills-lock.json` 统一拉取到 `.agents/skills/`：

| 外部 Skill | 路径 | 用途 |
|---|---|---|
| `idea` | `.agents/skills/idea/SKILL.md` | 发散、假设、待验证点 |
| `ceo` | `.agents/skills/ceo/SKILL.md` | 商业与战略压测 |
| `uxdesign-buff` | `.agents/skills/uxdesign-buff/SKILL.md` | 体验与设计评审 |
| `fliggy-design-gui` | `.agents/skills/fliggy-design-gui/SKILL.md` | 设计编排 |
| `yuque` / `yuque-doc-fetch` | `.agents/skills/yuque*/SKILL.md` | 语雀文档抓取 |

> 机票相关规范入口统一收敛到 `skills/fliggy-flight-design-guide/`；规则真相源位于 `skills/fliggy-flight-design-guide/references/`。

## 维护约定

- 本目录下每个 skill 必须有 `SKILL.md`（Agent 入口）和 `README.md`（人类说明）
- 修改 `fliggy-flight-design-guide` 的规则文档时，**同步更新** `references/workflow-master.md` 与 `references/agent-protocol.md`
- 新增 skill 时，请在本文件的"本目录一览"表格、调用链和决策树中补充条目
- 跨 skill 引用统一写相对仓库根的路径，例如 `skills/fliggy-flight-design-guide/playbooks/...`
