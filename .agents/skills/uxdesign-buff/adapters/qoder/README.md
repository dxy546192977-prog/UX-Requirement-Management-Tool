# Qoder 适配

这份文件说明如何在 Qoder 中安装和使用 UXdesign-buff。

## 安装方式

Qoder 支持两种安装范围:

### 项目级安装

```bash
python3 scripts/install_adapter.py qoder --scope project --target /path/to/project
```

会把 UXdesign-buff 安装到 `<project>/.qoder/skills/UXdesign-buff/`，只对当前项目生效。

### 用户级安装

```bash
python3 scripts/install_adapter.py qoder --scope user
```

会安装到 `~/.qoder/skills/UXdesign-buff/`，对所有项目生效。

## 安装内容

安装脚本会复制以下内容:

- `SKILL.md` - 主入口文件（Qoder 格式，只含 name 和 description 两个 frontmatter 字段）
- `references/` - 参考文档目录
- `scripts/` - 工具脚本目录
- `templates/` - 模板目录
- `LICENSE` - 许可证

## 使用方式

### 自动触发

在 Qoder 对话中直接描述设计评审需求，并附上 Figma 链接、截图或相关材料。Qoder 会根据 SKILL.md 中的 description 自动判断是否触发 UXdesign-buff。

### 手动触发

输入 `/UXdesign-buff` 明确调用这个 Skill。

## 与其他平台的区别

| 特性 | Qoder | Codex |
|------|-------|-------|
| Frontmatter 字段 | 只需 `name` + `description` | 支持 `compatibility`、`metadata.version` 等扩展字段 |
| 安装位置 | 项目级 `.qoder/skills/` 或用户级 `~/.qoder/skills/` | `${CODEX_HOME:-~/.codex}/skills/` |
| 触发方式 | 自动触发或 `/skill-name` | 自动触发或 `$skill-name` |

## 输出

和其他平台一致，UXdesign-buff 会产出:

- `UXdesign-buff-reviews/<review-slug>/report.html` - 人类可读的评审报告
- `UXdesign-buff-reviews/<review-slug>/review-state.json` - 结构化状态文件
