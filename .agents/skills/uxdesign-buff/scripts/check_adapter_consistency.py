#!/usr/bin/env python3
"""
Adapter Consistency Checker for UXdesign-buff

Verifies that installed adapters contain the latest portable-instructions.md content.
"""

from __future__ import annotations

import argparse
import sys
from pathlib import Path


def repo_root() -> Path:
    return Path(__file__).resolve().parents[1]


def read_portable_instructions(root: Path) -> str:
    path = root / "adapters" / "shared" / "portable-instructions.md"
    return path.read_text(encoding="utf-8").strip()


def normalize_text(text: str) -> str:
    """Normalize text for comparison by removing extra whitespace."""
    lines = [line.strip() for line in text.strip().splitlines()]
    return "\n".join(lines)


def check_qoder(target: Path, portable: str) -> tuple[bool, str]:
    """Check Qoder adapter consistency."""
    skill_path = target / ".qoder" / "skills" / "UXdesign-buff" / "SKILL.md"
    if not skill_path.exists():
        return False, f"未找到 Qoder Skill 文件: {skill_path}"

    content = skill_path.read_text(encoding="utf-8")
    normalized_content = normalize_text(content)
    normalized_portable = normalize_text(portable)

    # Check if portable instructions are included (allowing for frontmatter and reference list additions)
    for line in normalized_portable.splitlines():
        if line and line not in normalized_content:
            return False, f"Qoder SKILL.md 缺少基准内容行: {line[:60]}..."

    return True, "Qoder 适配一致"


def check_codex(target: Path, portable: str) -> tuple[bool, str]:
    """Check Codex adapter consistency."""
    # Codex uses its own SKILL.md format which embeds the methodology differently
    skill_path = target / "SKILL.md"
    if not skill_path.exists():
        return False, f"未找到 Codex Skill 文件: {skill_path}"

    # Codex SKILL.md contains the full workflow, just verify it exists and has content
    content = skill_path.read_text(encoding="utf-8")
    if len(content) < 1000:
        return False, "Codex SKILL.md 内容过短，可能不完整"

    return True, "Codex 适配存在（使用独立格式）"


def check_claude_code(target: Path, portable: str) -> tuple[bool, str]:
    """Check Claude Code adapter consistency."""
    claude_md = target / ".claude" / "CLAUDE.md"
    if not claude_md.exists():
        return False, f"未找到 Claude Code 配置: {claude_md}"

    content = claude_md.read_text(encoding="utf-8")
    normalized_content = normalize_text(content)
    normalized_portable = normalize_text(portable)

    # Check if key portable instructions lines are present
    missing_lines = []
    for line in normalized_portable.splitlines():
        if line and len(line) > 20 and line not in normalized_content:
            missing_lines.append(line[:60])

    if len(missing_lines) > 10:
        return False, f"Claude Code CLAUDE.md 缺少大量基准内容，可能需要重新安装"

    return True, "Claude Code 适配一致"


def check_cursor(target: Path, portable: str) -> tuple[bool, str]:
    """Check Cursor adapter consistency."""
    rule_path = target / ".cursor" / "rules" / "UXdesign-buff-review.mdc"
    if not rule_path.exists():
        return False, f"未找到 Cursor 规则文件: {rule_path}"

    content = rule_path.read_text(encoding="utf-8")
    normalized_content = normalize_text(content)
    normalized_portable = normalize_text(portable)

    # Check if key portable instructions lines are present
    missing_lines = []
    for line in normalized_portable.splitlines():
        if line and len(line) > 20 and line not in normalized_content:
            missing_lines.append(line[:60])

    if len(missing_lines) > 10:
        return False, f"Cursor 规则文件缺少大量基准内容，可能需要重新安装"

    return True, "Cursor 适配一致"


def check_generic_agents(target: Path, portable: str) -> tuple[bool, str]:
    """Check generic AGENTS.md consistency."""
    agents_md = target / "AGENTS.md"
    if not agents_md.exists():
        return False, f"未找到 AGENTS.md: {agents_md}"

    content = agents_md.read_text(encoding="utf-8")
    normalized_content = normalize_text(content)
    normalized_portable = normalize_text(portable)

    # Check if key portable instructions lines are present
    missing_lines = []
    for line in normalized_portable.splitlines():
        if line and len(line) > 20 and line not in normalized_content:
            missing_lines.append(line[:60])

    if len(missing_lines) > 10:
        return False, f"AGENTS.md 缺少大量基准内容，可能需要重新安装"

    return True, "Generic Agents 适配一致"


PLATFORM_CHECKERS = {
    "qoder": check_qoder,
    "codex": check_codex,
    "claude-code": check_claude_code,
    "cursor": check_cursor,
    "generic-agents": check_generic_agents,
}


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Check adapter consistency against portable-instructions.md baseline."
    )
    parser.add_argument(
        "--platform",
        choices=list(PLATFORM_CHECKERS.keys()),
        help="Check specific platform only.",
    )
    parser.add_argument(
        "--all",
        action="store_true",
        help="Check all platforms.",
    )
    parser.add_argument(
        "--target",
        type=Path,
        required=True,
        help="Target project path to check.",
    )
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    root = repo_root()
    target = args.target.resolve()

    if not target.exists():
        print(f"错误: 目标路径不存在: {target}", file=sys.stderr)
        sys.exit(1)

    portable = read_portable_instructions(root)

    platforms_to_check = []
    if args.all:
        platforms_to_check = list(PLATFORM_CHECKERS.keys())
    elif args.platform:
        platforms_to_check = [args.platform]
    else:
        print("错误: 请指定 --platform 或 --all", file=sys.stderr)
        sys.exit(1)

    print(f"基准文件: adapters/shared/portable-instructions.md")
    print(f"检查目标: {target}")
    print(f"检查平台: {', '.join(platforms_to_check)}")
    print("-" * 60)

    results = []
    for platform in platforms_to_check:
        checker = PLATFORM_CHECKERS[platform]
        consistent, message = checker(target, portable)
        results.append((platform, consistent, message))
        status = "✓" if consistent else "✗"
        print(f"[{status}] {platform}: {message}")

    print("-" * 60)

    consistent_count = sum(1 for _, c, _ in results if c)
    total_count = len(results)
    print(f"一致性结果: {consistent_count}/{total_count} 平台同步")

    if consistent_count < total_count:
        print("\n建议: 对不一致的平台重新运行 install_adapter.py")
        sys.exit(1)


if __name__ == "__main__":
    main()
