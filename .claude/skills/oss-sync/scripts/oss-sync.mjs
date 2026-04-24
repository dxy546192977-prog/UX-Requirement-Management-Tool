#!/usr/bin/env node
/**
 * oss-sync.mjs — 本地 data/requirements.json ↔ OSS 双向同步工具
 *
 * 用法：
 *   node oss-sync.mjs push    # 本地 → OSS（上传）
 *   node oss-sync.mjs pull    # OSS → 本地（下载）
 *   node oss-sync.mjs status  # 对比本地与 OSS 的最后修改时间和条数
 */

import crypto from 'crypto';
import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// ── 路径解析 ──────────────────────────────────────────────────────────────────
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, '../../../..');
const CONFIG_PATH  = path.join(PROJECT_ROOT, 'config/config.json');
const LOCAL_FILE   = path.join(PROJECT_ROOT, 'data/requirements.json');

// ── OSS 配置 ──────────────────────────────────────────────────────────────────
const BUCKET = 'designacceleration';
const REGION = 'oss-cn-beijing';
const OBJECT = 'requirements.json';
const HOST   = `${BUCKET}.${REGION}.aliyuncs.com`;

// ── 读取 AccessKey ────────────────────────────────────────────────────────────
function loadCredentials() {
  if (!fs.existsSync(CONFIG_PATH)) {
    console.error(`[oss-sync] 找不到配置文件：${CONFIG_PATH}`);
    process.exit(1);
  }
  const config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));
  const accessKeyId     = config.oss_access_key_id;
  const accessKeySecret = config.oss_access_key_secret;
  if (!accessKeyId || !accessKeySecret) {
    console.error('[oss-sync] config.json 中缺少 oss_access_key_id 或 oss_access_key_secret');
    process.exit(1);
  }
  return { accessKeyId, accessKeySecret };
}

// ── 生成 OSS 签名 ─────────────────────────────────────────────────────────────
function buildAuthHeader({ accessKeyId, accessKeySecret, method, contentMd5 = '', contentType = '', date }) {
  const stringToSign = `${method}\n${contentMd5}\n${contentType}\n${date}\n/${BUCKET}/${OBJECT}`;
  const signature = crypto.createHmac('sha1', accessKeySecret).update(stringToSign).digest('base64');
  return `OSS ${accessKeyId}:${signature}`;
}

// ── HTTPS 请求封装 ────────────────────────────────────────────────────────────
function httpsRequest(options, body = null) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, res => {
      const chunks = [];
      res.on('data', chunk => chunks.push(chunk));
      res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body: Buffer.concat(chunks) }));
    });
    req.on('error', reject);
    if (body) req.write(body);
    req.end();
  });
}

// ── push：本地 → OSS ──────────────────────────────────────────────────────────
async function push() {
  if (!fs.existsSync(LOCAL_FILE)) {
    console.error(`[oss-sync] 本地文件不存在：${LOCAL_FILE}`);
    process.exit(1);
  }

  const credentials = loadCredentials();
  const body        = fs.readFileSync(LOCAL_FILE);
  const contentType = 'application/json';
  const date        = new Date().toUTCString();
  const contentMd5  = crypto.createHash('md5').update(body).digest('base64');
  const auth        = buildAuthHeader({ ...credentials, method: 'PUT', contentMd5, contentType, date });

  const localData = JSON.parse(body);
  const count     = localData?.requirements?.length ?? '?';

  console.log(`[oss-sync] 正在上传本地数据（${count} 条需求）→ OSS...`);

  const result = await httpsRequest({
    hostname: HOST,
    port: 443,
    path: `/${OBJECT}`,
    method: 'PUT',
    headers: {
      'Content-Type':   contentType,
      'Content-MD5':    contentMd5,
      'Content-Length': body.length,
      'Date':           date,
      'Authorization':  auth,
    },
  }, body);

  if (result.status === 200) {
    console.log(`[oss-sync] ✅ 上传成功！OSS 已更新（${count} 条需求）`);
    console.log(`[oss-sync] 线上访问：https://${HOST}/${OBJECT}`);
  } else {
    console.error(`[oss-sync] ❌ 上传失败，HTTP ${result.status}`);
    console.error(result.body.toString());
    process.exit(1);
  }
}

// ── pull：OSS → 本地 ──────────────────────────────────────────────────────────
async function pull() {
  const credentials = loadCredentials();
  const date        = new Date().toUTCString();
  const auth        = buildAuthHeader({ ...credentials, method: 'GET', date });

  console.log('[oss-sync] 正在从 OSS 下载最新数据...');

  const result = await httpsRequest({
    hostname: HOST,
    port: 443,
    path: `/${OBJECT}`,
    method: 'GET',
    headers: {
      'Date':          date,
      'Authorization': auth,
    },
  });

  if (result.status !== 200) {
    console.error(`[oss-sync] ❌ 下载失败，HTTP ${result.status}`);
    console.error(result.body.toString());
    process.exit(1);
  }

  fs.writeFileSync(LOCAL_FILE, result.body);
  const ossData = JSON.parse(result.body);
  const count   = ossData?.requirements?.length ?? '?';
  console.log(`[oss-sync] ✅ 下载成功！本地已更新（${count} 条需求）`);
}

// ── status：对比本地与 OSS ────────────────────────────────────────────────────
async function status() {
  const credentials = loadCredentials();

  // 本地信息
  let localInfo = '（文件不存在）';
  if (fs.existsSync(LOCAL_FILE)) {
    const localStat = fs.statSync(LOCAL_FILE);
    const localData = JSON.parse(fs.readFileSync(LOCAL_FILE, 'utf8'));
    const count     = localData?.requirements?.length ?? '?';
    localInfo = `${count} 条需求，最后修改：${localStat.mtime.toLocaleString('zh-CN')}`;
  }

  // OSS HEAD 请求获取元信息
  const date = new Date().toUTCString();
  const auth = buildAuthHeader({ ...credentials, method: 'HEAD', date });

  const result = await httpsRequest({
    hostname: HOST,
    port: 443,
    path: `/${OBJECT}`,
    method: 'HEAD',
    headers: {
      'Date':          date,
      'Authorization': auth,
    },
  });

  let ossInfo = '（获取失败）';
  if (result.status === 200) {
    const lastModified = result.headers['last-modified'] ?? '未知';
    const size         = result.headers['content-length'] ?? '?';
    ossInfo = `大小 ${Math.round(size / 1024)}KB，OSS 最后修改：${new Date(lastModified).toLocaleString('zh-CN')}`;
  }

  console.log('');
  console.log('┌─────────────────────────────────────────────┐');
  console.log('│           OSS Sync Status                   │');
  console.log('├─────────────────────────────────────────────┤');
  console.log(`│ 本地：${localInfo}`);
  console.log(`│ OSS ：${ossInfo}`);
  console.log('└─────────────────────────────────────────────┘');
  console.log('');
  console.log('  push  → 把本地数据上传覆盖 OSS（本地 → 线上）');
  console.log('  pull  → 把 OSS 数据下载覆盖本地（线上 → 本地）');
  console.log('');
}

// ── auto：自动判断方向同步 ───────────────────────────────────────────────────
async function auto() {
  const credentials = loadCredentials();

  // 获取本地文件修改时间
  if (!fs.existsSync(LOCAL_FILE)) {
    console.log('[oss-sync] 本地文件不存在，从 OSS 拉取...');
    await pull();
    return;
  }
  const localMtime = fs.statSync(LOCAL_FILE).mtime;

  // 获取 OSS 文件最后修改时间（HEAD 请求）
  const date = new Date().toUTCString();
  const auth = buildAuthHeader({ ...credentials, method: 'HEAD', date });

  let ossMtime = null;
  try {
    const result = await httpsRequest({
      hostname: HOST,
      port: 443,
      path: `/${OBJECT}`,
      method: 'HEAD',
      headers: { 'Date': date, 'Authorization': auth },
    });
    if (result.status === 200 && result.headers['last-modified']) {
      ossMtime = new Date(result.headers['last-modified']);
    }
  } catch (err) {
    console.warn('[oss-sync] 无法获取 OSS 状态，跳过同步：', err.message);
    return;
  }

  if (!ossMtime) {
    console.log('[oss-sync] OSS 文件不存在，上传本地数据...');
    await push();
    return;
  }

  const localData = JSON.parse(fs.readFileSync(LOCAL_FILE, 'utf8'));
  const localCount = localData?.requirements?.length ?? '?';

  console.log(`[oss-sync] 本地最后修改：${localMtime.toLocaleString('zh-CN')}`);
  console.log(`[oss-sync] OSS  最后修改：${ossMtime.toLocaleString('zh-CN')}`);

  // 对比时间戳，差距小于 10 秒视为相同
  const diffMs = localMtime.getTime() - ossMtime.getTime();
  if (Math.abs(diffMs) < 10000) {
    console.log(`[oss-sync] ✅ 本地与 OSS 数据一致（${localCount} 条需求），无需同步`);
    return;
  }

  if (diffMs > 0) {
    console.log('[oss-sync] 本地数据更新，自动上传到 OSS...');
    await push();
  } else {
    console.log('[oss-sync] OSS 数据更新，自动下载到本地...');
    await pull();
  }
}

// ── 入口 ──────────────────────────────────────────────────────────────────────
const command = process.argv[2];
if (!command || !['push', 'pull', 'status', 'auto'].includes(command)) {
  console.log('用法：node oss-sync.mjs <push|pull|status|auto>');
  console.log('  push   — 本地 data/requirements.json → OSS（更新线上）');
  console.log('  pull   — OSS → 本地 data/requirements.json（更新本地）');
  console.log('  status — 查看本地与 OSS 的数据状态对比');
  console.log('  auto   — 自动判断哪边更新，智能同步');
  process.exit(0);
}

if (command === 'push')   await push();
if (command === 'pull')   await pull();
if (command === 'status') await status();
if (command === 'auto')   await auto();
