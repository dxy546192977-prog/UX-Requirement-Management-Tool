# -*- coding: utf-8 -*-
"""生成可粘贴到 skills/README.md 的索引表格行。"""

from pathlib import Path


def main() -> None:
    root = Path(__file__).resolve().parent.parent
    skill_name = root.name
    row = (
        f"| [`{skill_name}/`](./{skill_name}/) | "
        "**Skill 目录治理与标准化**（治理层） | "
        '"整理 skill 文件夹"、"标准化 Agent Skill" | '
        "需要治理/新增/校验技能目录时 |"
    )
    print(row)


if __name__ == "__main__":
    main()
