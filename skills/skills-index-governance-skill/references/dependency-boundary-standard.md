# 依赖边界标准

## 自研 Skill（`skills/`）

- 由当前项目团队维护。
- 允许按业务需要改造结构与内容。
- 必须遵循本 Skill 的结构和内容标准。

## 外部 Skill（`.agents/skills/`）

- 由 `skills-lock.json` 锁定与拉取。
- 不在 `skills/` 目录维护副本。
- 仅通过路径引用，例如：`.agents/skills/idea/SKILL.md`。

## 引用规则

- 本地 Skill 引用：`skills/<skill-name>/SKILL.md`
- 外部 Skill 引用：`.agents/skills/<skill-name>/SKILL.md`
- 禁止使用无扩展名占位文件做“伪链接”。

## 变更策略

- 新增本地 Skill：更新 `skills/README.md` 一览表和决策树。
- 调整外部依赖：更新 `skills-lock.json`，并同步说明到索引文档。
