#!/usr/bin/env python3
"""Minimal static checks for Fliggy flight design HTML outputs."""
from __future__ import annotations

import sys
from pathlib import Path


def main() -> int:
    if len(sys.argv) < 2:
        print("Usage: validate_design_html.py <file.html>", file=sys.stderr)
        return 2

    path = Path(sys.argv[1])
    if not path.is_file():
        print(f"Not a file: {path}", file=sys.stderr)
        return 2

    text = path.read_text(encoding="utf-8", errors="replace")
    issues: list[str] = []

    if "width=750" not in text or "user-scalable=no" not in text:
        issues.append("Missing required viewport meta (width=750, user-scalable=no).")

    if "<style" not in text.lower():
        issues.append("No inline <style> block found.")

    if ":root" not in text:
        issues.append("No :root token block found.")

    if "var(--" not in text:
        issues.append("No var(--*) usage found; likely missing token references.")

    if issues:
        print(f"FAIL: {path}")
        for i in issues:
            print(f"  - {i}")
        return 1

    print(f"PASS: {path}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
