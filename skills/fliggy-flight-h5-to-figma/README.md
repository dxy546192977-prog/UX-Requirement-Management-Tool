# fliggy-flight-h5-to-figma

Vibma + Figma MCP 文案改稿 Skill（飞猪机票链路中 H5 定稿后进入 Figma 改稿时常用），沉淀自本次实战流程，支持：

- 本地 relay 启动与连接验证
- Node 级文本批量改写
- 多页面逻辑串联
- 截图验证与标准化交付

## 目录结构

```text
fliggy-flight-h5-to-figma/
├── SKILL.md
├── README.md
├── references/
│   ├── vibma-connection-standard.md
│   ├── content-structure-standard.md
│   └── troubleshooting-playbook.md
├── scripts/
│   ├── start-vibma-relay.sh
│   ├── check-vibma-relay.sh
│   └── install-to-cursor.sh
└── assets/
    ├── rewrite-plan.template.md
    ├── node-rewrite-batch.template.json
    └── delivery-report.template.md
```

## 安装

放到任一可加载目录：

- 项目级：`<repo>/.cursor/skills/fliggy-flight-h5-to-figma/`
- 本仓库技能目录：`skills/fliggy-flight-h5-to-figma/`
- 一键安装到个人目录：`bash scripts/install-to-cursor.sh`

## 使用触发词示例

- “用 Vibma MCP 改这个 Figma 文案”
- “只改文本，不改 UI”
- “把几个页面串联成一个完整流程”
- “先帮我连接 Vibma，再改内容”
