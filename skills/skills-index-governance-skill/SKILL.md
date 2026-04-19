---
name: skills-index-governance-skill
version: 1.0.0
description: |
  将项目中的 skills 目录治理成可维护、可扩展、可安装的标准 Agent Skill 集合。
  负责技能分类、依赖映射、索引文档维护、结构校验与模板化产出。
---

# Skills Index Governance Skill

## Skill 职责

1. 统一维护 `skills/` 下自研 Skill 的结构标准和命名约定。
2. 维护技能索引文档（如 `skills/README.md`）的一致性与可读性。
3. 明确自研 Skill 与外部锁定 Skill（`.agents/skills/`）的职责边界。
4. 为新增 Skill 提供可复用模板（入口、说明、标准引用、脚本框架）。
5. 提供自动化校验与自动生成能力，降低手工维护成本。

## 触发场景

出现以下任意情况时必须加载本 Skill：

- 用户要求“整理 skill 文件夹 / 标准化 skill / 生成可安装 skill 包”。
- 需要新增一个 Skill 并确保具备标准目录结构。
- 需要统一维护或重写 `skills/README.md` 索引。
- 需要区分“自研 skills”与“.agents/skills 外部依赖”并修复错误引用。
- 需要批量检查哪些 Skill 缺少 `SKILL.md`、`README.md`、`references/` 等核心内容。

## 执行步骤

### Phase 1：识别与盘点

1. 扫描 `skills/` 子目录，识别所有候选 Skill。
2. 识别并标注无效占位文件（如伪符号链接文本文件）。
3. 生成盘点结果：
   - 自研 Skill 列表
   - 外部依赖 Skill 列表（来自 `.agents/skills/` 与 `skills-lock.json`）
   - 缺失标准文件的 Skill 列表

### Phase 2：标准化建模

1. 依据 `references/` 中的标准，确定目标目录结构：
   - `SKILL.md`
   - `README.md`
   - `references/`
   - `scripts/`
   - `assets/`
   - `.learnings/`（可选但推荐）
2. 将“职责、触发、流程、输出标准”固化进 `SKILL.md`。
3. 将“格式要求与内容标准”固化到 `references/`。

### Phase 3：自动化与模板化

1. 将可自动化步骤落到 `scripts/`：
   - 结构校验
   - 索引自动生成
2. 将可复用产物模板落到 `assets/`：
   - `SKILL.md` 模板
   - `README.md` 模板
   - `references` 标准模板

### Phase 4：回写与验收

1. 更新 `skills/README.md`，补充新增 Skill 的索引信息。
2. 运行 `scripts/validate_skill_structure.py` 校验结构完整性。
3. 输出安装说明，确保可直接复制到 `.cursor/skills` 或 `.claude/skills` 使用。

## 输出标准（验收清单）

产出必须同时满足：

- 目录完整：至少包含 `SKILL.md`、`README.md`、`references/`、`scripts/`、`assets/`。
- `SKILL.md` 完整：明确职责、触发场景、执行步骤、输出标准。
- `references/` 完整：包含结构标准、内容标准、依赖映射标准、安装标准。
- `scripts/` 可执行：至少一个结构校验脚本可运行。
- `assets/` 可复用：至少提供 `SKILL.md` 与 `README.md` 模板。
- 可安装性：具备独立目录，可直接复制安装，不依赖当前工作区隐式上下文。

## 推荐命令

```bash
python scripts/validate_skill_structure.py
python scripts/generate_index_snippet.py
```

## 安装方式

- Cursor：复制整个目录到 `<project>/.cursor/skills/skills-index-governance-skill/` 或 `%USERPROFILE%\\.cursor\\skills\\skills-index-governance-skill\\`
- Claude Code：复制到 `~/.claude/skills/skills-index-governance-skill/`
