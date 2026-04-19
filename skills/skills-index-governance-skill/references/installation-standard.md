# 安装与验收标准

## 安装路径

- Cursor（项目级）：`<project>/.cursor/skills/<skill-name>/`
- Cursor（用户级）：`%USERPROFILE%\\.cursor\\skills\\<skill-name>\\`
- Claude Code：`~/.claude/skills/<skill-name>/`

## 最低安装校验

1. 目录存在 `SKILL.md`。
2. `SKILL.md` 可被 Agent 读取。
3. `references/`、`scripts/`、`assets/` 目录存在。
4. `scripts/validate_skill_structure.py` 可运行并通过。

## 交付判定

仅当以下全部满足时，Skill 才可标记为“可安装使用”：

- 结构校验通过。
- `SKILL.md` 四要素齐全（职责、触发、步骤、标准）。
- 引用路径清晰且无伪链接。
- README 提供明确安装方式。
