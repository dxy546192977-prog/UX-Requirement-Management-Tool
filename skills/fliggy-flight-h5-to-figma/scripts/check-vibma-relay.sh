#!/usr/bin/env bash
set -euo pipefail

PORT="${1:-3055}"
URL="http://127.0.0.1:${PORT}"

echo "[vibma] probing ${URL} ..."

if command -v curl >/dev/null 2>&1; then
  if curl -sS --max-time 2 "${URL}" >/dev/null; then
    echo "[vibma] relay reachable on port ${PORT}"
    exit 0
  fi
fi

if command -v nc >/dev/null 2>&1; then
  if nc -z 127.0.0.1 "${PORT}" >/dev/null 2>&1; then
    echo "[vibma] tcp port ${PORT} is open"
    exit 0
  fi
fi

echo "[vibma] relay not reachable on ${PORT}"
echo "[vibma] run: ./scripts/start-vibma-relay.sh"
exit 1
