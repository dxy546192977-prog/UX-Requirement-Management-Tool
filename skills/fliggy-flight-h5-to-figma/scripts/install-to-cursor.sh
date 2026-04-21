#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SKILL_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"
TARGET_DIR="${HOME}/.cursor/skills/fliggy-flight-h5-to-figma"

mkdir -p "${HOME}/.cursor/skills"
rm -rf "${TARGET_DIR}"
cp -R "${SKILL_DIR}" "${TARGET_DIR}"

echo "[install] installed to ${TARGET_DIR}"
