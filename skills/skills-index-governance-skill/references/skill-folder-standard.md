# Skill 文件夹结构标准

## 强制结构

每个可安装 Skill 至少包含：

```text
<skill-name>/
├── SKILL.md
├── README.md
├── references/
├── scripts/
└── assets/
```

## 推荐结构

```text
<skill-name>/
├── SKILL.md
├── README.md
├── references/
│   └── README.md
├── scripts/
│   └── *.py
├── assets/
│   └── *.template.md
└── .learnings/
    └── *.md
```

## 文件职责

- `SKILL.md`：Agent 执行入口（机器优先）。
- `README.md`：人类说明（安装、用途、快速开始）。
- `references/`：格式、流程、边界、验收标准。
- `scripts/`：可自动化步骤。
- `assets/`：可复用模板。
- `.learnings/`：持续学习日志（可选）。

## 禁止项

- 仅用无扩展名文本文件冒充符号链接。
- 只有 README 而没有 `SKILL.md`。
- 把外部依赖 Skill 复制进 `skills/` 冒充本地维护。
