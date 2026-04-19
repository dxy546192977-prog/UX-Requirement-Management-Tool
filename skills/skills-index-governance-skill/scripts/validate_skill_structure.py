# -*- coding: utf-8 -*-
"""校验当前目录是否符合标准 Agent Skill 结构。"""

from pathlib import Path
import sys

REQUIRED_FILES = ["SKILL.md", "README.md"]
REQUIRED_DIRS = ["references", "scripts", "assets"]


def main() -> int:
    root = Path(__file__).resolve().parent.parent
    missing = []

    for file_name in REQUIRED_FILES:
        if not (root / file_name).is_file():
            missing.append(file_name)

    for dir_name in REQUIRED_DIRS:
        if not (root / dir_name).is_dir():
            missing.append(f"{dir_name}/")

    if missing:
        print("[FAIL] Skill 结构不完整，缺失：")
        for item in missing:
            print(f" - {item}")
        return 1

    print("[OK] Skill 结构校验通过")
    print(f"Root: {root}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
