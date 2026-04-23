#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SKILL_NAME="fliggy-flight-design-guide"
OUT_DIR="${ROOT_DIR}/dist"
STAMP="$(date +%Y%m%d-%H%M%S)"
ARCHIVE="${OUT_DIR}/${SKILL_NAME}-${STAMP}.zip"

mkdir -p "${OUT_DIR}"

bash "${ROOT_DIR}/scripts/doctor.sh"

cd "$(dirname "${ROOT_DIR}")"
zip -qr "${ARCHIVE}" "${SKILL_NAME}" \
  -x "${SKILL_NAME}/dist/*" \
  -x "${SKILL_NAME}/.DS_Store"

echo "Package created: ${ARCHIVE}"
