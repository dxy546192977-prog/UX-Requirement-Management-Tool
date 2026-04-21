#!/usr/bin/env bash
set -euo pipefail

echo "[vibma] checking node/npm ..."
command -v npx >/dev/null 2>&1 || { echo "[vibma] npx not found"; exit 1; }

echo "[vibma] starting relay on port 3055 ..."
echo "[vibma] keep this terminal running while editing in Figma"
npx @ufira/vibma-tunnel
