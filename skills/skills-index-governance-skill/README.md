# skills-index-governance-skill

用于把一个项目内的 `skills/` 目录治理成可维护、可扩展、可安装的标准 Agent Skill 集合。

## 适用场景

- 你有多个 Skill，但结构混乱、入口不统一。
- 你希望新增 Skill 时按统一模板创建。
- 你希望自动检查 Skill 结构是否达标。
- 你希望维护一个稳定的 `skills/README.md` 作为团队索引。

## 目录结构

```text
skills-index-governance-skill/
├── SKILL.md
├── README.md
├── references/
│   ├── README.md
│   ├── skill-folder-standard.md
│   ├── content-standard.md
│   ├── dependency-boundary-standard.md
│   └── installation-standard.md
├── scripts/
│   ├── validate_skill_structure.py
│   └── generate_index_snippet.py
├── assets/
│   ├── skill-md.template.md
│   ├── readme.template.md
│   └── references-readme.template.md
└── .learnings/
    └── GOVERNANCE_LEARNINGS.md
```

## 快速开始

1. 读取 `SKILL.md`。
2. 按 `references/` 标准整理目标 Skill。
3. 使用 `scripts/validate_skill_structure.py` 校验结果。

## 脚本

- `scripts/validate_skill_structure.py`：校验当前目录是否符合标准 Skill 结构。
- `scripts/generate_index_snippet.py`：根据 Skill 元数据输出可粘贴到索引 README 的 Markdown 表格片段。

## 安装

- Cursor：复制到 `.cursor/skills/skills-index-governance-skill/`
- Claude Code：复制到 `.claude/skills/skills-index-governance-skill/`
