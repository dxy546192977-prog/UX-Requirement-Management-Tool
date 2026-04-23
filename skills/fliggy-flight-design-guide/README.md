# fliggy-flight-design-guide

飞猪机票设计执行 Skill。已按标准 Agent Skill 目录整理，可直接安装使用。

## 安装

将整个文件夹复制到以下任一位置：

- 项目级：`<project>/.cursor/skills/fliggy-flight-design-guide/`
- 用户级：`~/.cursor/skills/fliggy-flight-design-guide/`

## 目录说明

```text
fliggy-flight-design-guide/
├── SKILL.md                         # 主入口：职责、触发、步骤、输出标准
├── README.md
├── references/                      # 确认过的格式要求与内容标准
├── scripts/                         # 自动化校验与打包脚本
├── assets/                          # 模板资产
└── playbooks/flight-funnel/         # 页面与组件物料库
```

## 快速自检

在 Skill 根目录运行：

```bash
bash scripts/doctor.sh
```

如需校验某个设计稿 HTML：

```bash
python3 scripts/validate_design_html.py path/to/output.html
```

## 维护约定

- 任何流程标准修改，先更新 `references/`，再更新 `SKILL.md`。
- 新增可自动化步骤，优先落到 `scripts/`，避免写成口头流程。
- 新增可复用模板，统一放到 `assets/`，避免散落在业务目录。
