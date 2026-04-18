# 跨平台适配

`UXdesign-buff` 的核心方法仍以仓库里的 `SKILL.md` 和 `references/` 为准，但主流 Agent 运行时接入方式不同，所以仓库里额外提供了一层轻量适配。

当前适配目标:

- `Qoder`
- `Codex`
- `Claude Code`
- `Cursor`
- 其他会读取 `AGENTS.md` 的兼容 Agent

这层适配遵循两个原则:

1. 核心方法只保留一套，避免多份 prompt 漂移
2. 平台差异只处理入口和载体，不改 UXdesign-buff 的评审标准

## Qoder

安装命令:

```bash
python3 scripts/install_adapter.py qoder --scope project --target /path/to/project
python3 scripts/install_adapter.py qoder --scope user
```

命令说明:

- 项目级安装会写入 `<project>/.qoder/skills/UXdesign-buff/`
- 用户级安装会写入 `~/.qoder/skills/UXdesign-buff/`
- 这条命令会复制整个 Skill 包，包括 Qoder 格式的 SKILL.md、references/、scripts/ 和 templates/
- Qoder 的 SKILL.md 只包含 `name` 和 `description` 两个 frontmatter 字段（比 Codex 更精简）

使用方式:

- 在 Qoder 里直接发起设计评审请求
- 如需明确点名，输入 `/UXdesign-buff`

## Codex

安装命令:

```bash
python3 scripts/install_adapter.py codex
```

命令说明:

- 默认安装到 `${CODEX_HOME:-~/.codex}/skills/UXdesign-buff`
- 如果你想装到自定义位置，可改成 `python3 scripts/install_adapter.py codex --target /path/to/skills/UXdesign-buff`
- 这条命令会复制整个 Skill 包，适合直接给 Codex 原生 Skill 系统使用

使用方式:

- 在 Codex 里直接发起设计评审请求
- 如需明确点名，直接写 `$UXdesign-buff`

## Claude Code

安装命令:

```bash
python3 scripts/install_adapter.py claude-code --scope project --target /path/to/project
python3 scripts/install_adapter.py claude-code --scope user
```

命令说明:

- 项目级安装会写入 `<project>/.claude/CLAUDE.md`
- 同时生成 `<project>/.claude/commands/UXdesign-buff-review.md`
- 用户级安装会写入 `~/.claude/CLAUDE.md` 和 `~/.claude/commands/UXdesign-buff-review.md`
- 如果原来已经有 `CLAUDE.md`，脚本会以托管区块追加，不会整份覆盖

使用方式:

- 在项目里直接运行 `/UXdesign-buff-review`
- 也可以补聚焦参数，例如 `/UXdesign-buff-review 重点看协议页和失败回退`

## Cursor

安装命令:

```bash
python3 scripts/install_adapter.py cursor --target /path/to/project
python3 scripts/install_adapter.py generic-agents --target /path/to/project
```

命令说明:

- 第一条会写入 `<project>/.cursor/rules/UXdesign-buff-review.mdc`
- 第二条是可选项，用于补 `<project>/AGENTS.md`，方便 Cursor CLI 或其他兼容 Agent 读取
- Cursor 没有和 Claude Code 完全对应的自定义 slash command，这里主要依赖规则触发

使用方式:

- 在 Cursor Agent 中直接请求设计评审
- 如需提高触发稳定性，可以明确写 `Use UXdesign-buff to review this flow`

## 通用 AGENTS 入口

安装命令:

```bash
python3 scripts/install_adapter.py generic-agents --target /path/to/project
```

命令说明:

- 会把 UXdesign-buff 作为托管区块写入 `<project>/AGENTS.md`
- 适合 Cursor CLI 和其他会读取 `AGENTS.md` 的 Agent 工具

## 官方依据

这层适配基于当前官方文档:

- Claude Code 通过 `CLAUDE.md` 提供持久指令，通过 `.claude/commands/` 提供自定义 slash commands，并支持 `.claude/rules/` 规则拆分
- Cursor 通过 `.cursor/rules/*.mdc` 提供项目规则；Cursor CLI 还会读取项目根目录的 `AGENTS.md` 和 `CLAUDE.md`

参考:

- [Claude Code: How Claude remembers your project](https://code.claude.com/docs/en/memory)
- [Claude Code: Slash commands](https://docs.anthropic.com/en/docs/claude-code/slash-commands)
- [Cursor: Rules](https://docs.cursor.com/context/rules)
- [Cursor: Using CLI](https://docs.cursor.com/en/cli/using)
- [Qoder: Skills](https://docs.qoder.ai/skills)
