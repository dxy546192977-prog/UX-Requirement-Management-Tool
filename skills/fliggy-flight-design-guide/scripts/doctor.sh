#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

required_paths=(
  "SKILL.md"
  "README.md"
  "references/README.md"
  "references/workflow-master.md"
  "references/html-and-token-standard.md"
  "references/awesome-design-gates.md"
  "references/deliverables-and-state.md"
  "references/agent-protocol.md"
  "scripts/validate_design_html.py"
  "assets/execution-plan.template.md"
  "assets/phase3-review-report.template.md"
  "assets/figma-handoff.manifest.template.json"
  "assets/html-page-scaffold.html"
  "playbooks/flight-funnel/0 Fliggy Design Skill/SKILL.md"
)

echo "Checking skill package at: ${ROOT_DIR}"
missing=0

for p in "${required_paths[@]}"; do
  if [[ ! -e "${ROOT_DIR}/${p}" ]]; then
    echo "MISSING: ${p}"
    missing=1
  fi
done

if [[ ${missing} -ne 0 ]]; then
  echo "Doctor check failed."
  exit 1
fi

echo "Doctor check passed."
