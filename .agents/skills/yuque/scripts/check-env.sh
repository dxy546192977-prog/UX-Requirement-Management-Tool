#!/usr/bin/env bash
# 语雀 skill 环境自检：只读检查，不安装、不改配置。
# 用法：bash ./scripts/check-env.sh

HAS_MCPCLI=0
HAS_UTOO=0
HAS_PORT_4402=0
HAS_SKYLARK=0

echo "== ali-mcpcli =="
if command -v ali-mcpcli >/dev/null 2>&1; then
  HAS_MCPCLI=1
  ali-mcpcli --version 2>/dev/null || ali-mcpcli --help 2>/dev/null | head -n 1 || true
else
  echo "missing: ali-mcpcli"
fi

echo "== utoo-proxy =="
if command -v utoo-proxy >/dev/null 2>&1; then
  HAS_UTOO=1
  command -v utoo-proxy
  utoo-proxy --version 2>/dev/null || true
elif [ -x "${HOME}/.utoo-proxy/utoo-proxy" ]; then
  HAS_UTOO=1
  "${HOME}/.utoo-proxy/utoo-proxy" --version 2>/dev/null || echo "binary: ${HOME}/.utoo-proxy/utoo-proxy"
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
if command -v ali-mcpcli >/dev/null 2>&1; then
  if ali-mcpcli info skylark >/dev/null 2>&1; then
    HAS_SKYLARK=1
    echo "skylark server visible"
  else
    echo "warn: skylark not reachable (need VPN/utoo-proxy/auth?)"
  fi
else
  echo "warn: skip (ali-mcpcli not installed)"
fi

echo "== summary =="
echo "ali-mcpcli: $HAS_MCPCLI"
echo "utoo-proxy: $HAS_UTOO"
echo "port-4402: $HAS_PORT_4402"
echo "skylark-visible: $HAS_SKYLARK"

if [ "$HAS_MCPCLI" -eq 1 ] && [ "$HAS_UTOO" -eq 1 ] && [ "$HAS_SKYLARK" -eq 1 ]; then
  echo "result: prereqs mostly ready; next run: ali-mcpcli call skylark skylark_user_info '{}'"
else
  echo "result: blocked before minimal API verification; fix the missing items above first"
fi
