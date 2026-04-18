#!/usr/bin/env bash
# 语雀 skill 环境准备：检测依赖，缺失则自动安装，再做最小验证。
# 用法：bash ./scripts/ensure-env.sh

set -u

HAS_MCPCLI=0
HAS_UTOO=0
HAS_PORT_4402=0
HAS_SKYLARK=0
HAS_USER_INFO=0
UTOO_BIN=""
CHECK_TIMEOUT_SECONDS="${CHECK_TIMEOUT_SECONDS:-20}"

find_utoo() {
  if command -v utoo-proxy >/dev/null 2>&1; then
    command -v utoo-proxy
    return 0
  fi

  if [ -x "${HOME}/.utoo-proxy/utoo-proxy" ]; then
    printf '%s\n' "${HOME}/.utoo-proxy/utoo-proxy"
    return 0
  fi

  return 1
}

install_mcpcli() {
  echo "installing: ali-mcpcli"
  npm install -g @ali/mcpcli --registry=https://registry.anpm.alibaba-inc.com
}

install_utoo() {
  echo "installing: utoo-proxy"
  curl -L -o- https://registry.antgroup-inc.cn/@alipay/utoo-proxy/latest/files/setup.sh | bash
  xattr -c ~/.utoo-proxy/utoo-proxy 2>/dev/null || true
}

run_with_timeout() {
  python3 - "$CHECK_TIMEOUT_SECONDS" "$@" <<'PY'
import subprocess
import sys

timeout_seconds = int(sys.argv[1])
command = sys.argv[2:]

try:
    result = subprocess.run(command, capture_output=True, text=True, timeout=timeout_seconds)
except subprocess.TimeoutExpired as error:
    if error.stdout:
        sys.stdout.write(error.stdout)
    if error.stderr:
        sys.stderr.write(error.stderr)
    sys.stderr.write(f"timed out after {timeout_seconds}s: {' '.join(command)}\n")
    sys.exit(124)

if result.stdout:
    sys.stdout.write(result.stdout)
if result.stderr:
    sys.stderr.write(result.stderr)
sys.exit(result.returncode)
PY
}

echo "== detect =="
if ! command -v ali-mcpcli >/dev/null 2>&1; then
  echo "missing: ali-mcpcli"
  install_mcpcli || echo "warn: ali-mcpcli install failed"
fi

if ! UTOO_BIN="$(find_utoo)"; then
  echo "missing: utoo-proxy (PATH or ~/.utoo-proxy/utoo-proxy)"
  install_utoo || echo "warn: utoo-proxy install failed"
fi

echo "== ali-mcpcli =="
if command -v ali-mcpcli >/dev/null 2>&1; then
  HAS_MCPCLI=1
  ali-mcpcli --version 2>/dev/null || ali-mcpcli --help 2>/dev/null | head -n 1 || true
else
  echo "missing: ali-mcpcli"
fi

echo "== utoo-proxy =="
if UTOO_BIN="$(find_utoo)"; then
  HAS_UTOO=1
  echo "$UTOO_BIN"
  "$UTOO_BIN" --version 2>/dev/null || true
else
  echo "missing: utoo-proxy (PATH or ~/.utoo-proxy/utoo-proxy)"
fi

echo "== SSO local port (AliLangCl) =="
if command -v lsof >/dev/null 2>&1 && lsof -i :4402 >/dev/null 2>&1; then
  HAS_PORT_4402=1
  echo "port 4402 listening"
else
  echo "warn: port 4402 not listening (may still auth via browser)"
fi

echo "== skylark reachability =="
if [ "$HAS_MCPCLI" -eq 1 ]; then
  if run_with_timeout ali-mcpcli info skylark >/dev/null 2>&1; then
    HAS_SKYLARK=1
    echo "skylark server visible"
  else
    echo "warn: skylark not reachable (need VPN/utoo-proxy/auth?)"
  fi
else
  echo "warn: skip (ali-mcpcli not installed)"
fi

echo "== minimal verification =="
if [ "$HAS_SKYLARK" -eq 1 ]; then
  USER_INFO_OUTPUT="$(run_with_timeout ali-mcpcli call skylark skylark_user_info '{}' 2>&1)"
  USER_INFO_STATUS=$?
  if [ "$USER_INFO_STATUS" -eq 0 ]; then
    HAS_USER_INFO=1
    echo "$USER_INFO_OUTPUT"
  else
    echo "warn: skylark_user_info failed"
    echo "$USER_INFO_OUTPUT"
  fi
else
  echo "warn: skip (skylark not reachable)"
fi

echo "== summary =="
echo "ali-mcpcli: $HAS_MCPCLI"
echo "utoo-proxy: $HAS_UTOO"
echo "port-4402: $HAS_PORT_4402"
echo "skylark-visible: $HAS_SKYLARK"
echo "user-info-ok: $HAS_USER_INFO"

if [ "$HAS_MCPCLI" -eq 1 ] && [ "$HAS_UTOO" -eq 1 ] && [ "$HAS_SKYLARK" -eq 1 ] && [ "$HAS_USER_INFO" -eq 1 ]; then
  echo "result: ready for skylark operations"
  exit 0
fi

echo "result: blocked; inspect the warnings above"
exit 1
