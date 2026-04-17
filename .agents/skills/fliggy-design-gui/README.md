# Fliggy Design GUI

飞猪 App **常规范式界面** 的设计规范仓库。

## 结构

| 路径 | 说明 |
|------|------|
| [`SKILL.md`](SKILL.md) | 编排入口（Cursor Agent Skill） |
| [`foundations/design-foundations.md`](foundations/design-foundations.md) | Design Tokens、字号、栅格、输出规则 |
| [`foundations/image-library.md`](foundations/image-library.md) | 飞猪 CDN 配图 URL |
| [`docs/taxonomy.md`](docs/taxonomy.md) | 平台组件分类树 |
| [`docs/component-index.md`](docs/component-index.md) | 平台组件触发条件索引 |
| [`docs/platform-components-order.md`](docs/platform-components-order.md) | 平台组件按序落地清单（slug + 路径） |
| [`docs/manifest-template.md`](docs/manifest-template.md) | 通用 `manifest.md` 模板 |
| [`docs/spec-template.md`](docs/spec-template.md) | `spec.md` 统一章节结构 |
| [`docs/page-index.md`](docs/page-index.md) | `page_id` → manifest / 页面入口索引 |
| [`pages/README.md`](pages/README.md) | 页面层说明：`tabs/` 底栏 + `vertical/` 垂类 |
| [`scripts/README.md`](scripts/README.md) | 维护用 Python 脚本说明（非 Skill 安装流程） |
| `components/platform/` | 平台通用组件 spec 与 example |

## 使用

1. 将仓库链到 `~/.cursor/skills/fliggy-design-gui/`（或 `git clone` 到该路径）。  
2. 在对话中启用本 Skill，按 `SKILL.md` 的读取顺序生成页面。

## 更新技能

在本仓库 `git pull` 获取最新内容后，将 `~/.cursor/skills/fliggy-design-gui/` **重新链到或复制**仓库目录（与「使用」一致）。`SKILL.md` 顶部的 **`version:`** 仍建议随重要变更在仓库内**人工递增**。

## 维护

- 改 token：先改 `foundations/design-foundations.md` 并 bump `version`。  
- 新组件：增加 `components/platform/.../spec.md` 与 `docs/component-index.md` 一行。
