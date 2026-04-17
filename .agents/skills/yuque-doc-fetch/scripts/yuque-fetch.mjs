#!/usr/bin/env node
/**
 * yuque-fetch.mjs — 一条命令抓取语雀文档 Markdown
 *
 * 用法：
 *   node yuque-fetch.mjs <yuque-url> [--output <out.md>]
 *
 * 示例：
 *   node yuque-fetch.mjs https://aliyuque.antfin.com/foo/bar/slug
 *   node yuque-fetch.mjs https://aliyuque.antfin.com/foo/bar/slug --output /tmp/doc.md
 */

import { execFileSync } from 'node:child_process';
import path from 'node:path';
import fs from 'node:fs';

// ─── CLI 工具 ─────────────────────────────────────────────────────────────

function callMtopDevtools(action, payload, { timeoutSec = 30 } = {}) {
  try {
    const stdout = execFileSync('mtop-devtools', [
      action, '--payload', JSON.stringify(payload), '--compact', '--timeout', String(timeoutSec),
    ], { encoding: 'utf-8', timeout: (timeoutSec + 5) * 1000, stdio: ['pipe', 'pipe', 'pipe'] });
    return JSON.parse(stdout.trim());
  } catch (error) {
    if (error.status === null) {
      throw new Error('未找到 mtop-devtools 命令，请先执行: npm install -g @mtop-devtools/client');
    }
    throw new Error(error.stderr?.toString().trim() || error.message);
  }
}

function proxyRequest(url, { responseType = 'text', timeoutSec = 20 } = {}) {
  return callMtopDevtools('proxy_request', { url, method: 'GET', responseType }, { timeoutSec });
}

// ─── 提取 book_id ────────────────────────────────────────────────────────────

function tryParseJson(text) {
  try { return JSON.parse(text); } catch { return null; }
}

function extractBookId(text) {
  const patterns = [
    /"book_id"\s*:\s*"?(\d+)"?/i,
    /book_id\s*:\s*['"]?(\d+)['"]?/i,
    /book_id=(\d+)/i,
    /bookId"?\s*:\s*"?(\d+)"?/i,
  ];
  for (const p of patterns) {
    const m = text.match(p);
    if (m?.[1]) return m[1];
  }
  return '';
}

function safeDecodeURIComponent(s) {
  try { return decodeURIComponent(s); } catch { return s; }
}

function findBookId(text) {
  const variants = [
    text,
    safeDecodeURIComponent(text),
    safeDecodeURIComponent(safeDecodeURIComponent(text)),
    text.replace(/\\u0026/g, '&').replace(/\\\"/g, '"'),
  ];
  for (const v of variants) {
    const id = extractBookId(v);
    if (id) return id;
  }
  // 尝试从 decodeURIComponent("...") 块中提取
  const m = text.match(/decodeURIComponent\("([\s\S]*?)"\)/i);
  if (m?.[1]) {
    const id = extractBookId(safeDecodeURIComponent(m[1]));
    if (id) return id;
  }
  return '';
}

function resolveBookId(proxyResult) {
  const body = typeof proxyResult.body === 'string' ? proxyResult.body : JSON.stringify(proxyResult.body ?? '');
  return findBookId(body);
}

// ─── 提取 Markdown ───────────────────────────────────────────────────────────

function cleanupMarkdown(md) {
  return md
    .replace(/<font[^>]*>/g, '')
    .replace(/<\/font>/g, '')
    .replace(/\r\n/g, '\n')
    .trim() + '\n';
}

function extractMarkdown(proxyResult) {
  const body = proxyResult.body;
  if (typeof body === 'string') {
    const bodyJson = tryParseJson(body);
    if (bodyJson?.data?.sourcecode) return cleanupMarkdown(bodyJson.data.sourcecode);
    return cleanupMarkdown(body);
  }
  if (body && typeof body === 'object') {
    if (body?.data?.sourcecode) return cleanupMarkdown(body.data.sourcecode);
    if (typeof body.sourcecode === 'string') return cleanupMarkdown(body.sourcecode);
  }
  throw new Error('响应中未找到 sourcecode 或可用文本内容');
}

// ─── URL 解析 ────────────────────────────────────────────────────────────────

function parseYuqueUrl(rawUrl) {
  // 去掉末尾 /markdown
  const url = rawUrl.replace(/\/markdown\/?$/, '').replace(/\/$/, '');
  const u = new URL(url);
  const parts = u.pathname.split('/').filter(Boolean);
  // 期望 /{group}/{book}/{slug}
  if (parts.length < 3) {
    throw new Error(`无法从 URL 解析 slug: ${rawUrl}`);
  }
  const slug = parts[parts.length - 1];
  return { normalizedUrl: url, slug };
}

// ─── 主流程 ─────────────────────────────────────────────────────────────────

function parseArgs(argv) {
  const args = { url: '', output: '' };
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === '--output') {
      args.output = argv[++i] || '';
    } else if (!args.url && !argv[i].startsWith('--')) {
      args.url = argv[i];
    }
  }
  return args;
}

function main() {
  const { url: rawUrl, output } = parseArgs(process.argv.slice(2));

  if (!rawUrl) {
    console.error('用法: node yuque-fetch.mjs <yuque-url> [--output <out.md>]');
    process.exit(2);
  }

  const { normalizedUrl, slug } = parseYuqueUrl(rawUrl);

  // 步骤 1：获取页面 HTML，提取 book_id
  process.stderr.write(`[1/2] 获取页面以提取 book_id: ${normalizedUrl}\n`);
  const pageResult = proxyRequest(normalizedUrl);
  const bookId = resolveBookId(pageResult);
  if (!bookId) {
    throw new Error('无法从页面 HTML 提取 book_id，请检查链接是否可访问或当前登录态是否有效');
  }
  process.stderr.write(`      book_id = ${bookId}\n`);

  // 步骤 2：调用 api/docs 获取 Markdown
  const apiUrl = `https://aliyuque.antfin.com/api/docs/${slug}?book_id=${bookId}&mode=markdown`;
  process.stderr.write(`[2/2] 调用 api/docs: ${apiUrl}\n`);
  const apiResult = proxyRequest(apiUrl);
  const markdown = extractMarkdown(apiResult);

  // 输出
  if (output) {
    const abs = path.resolve(process.cwd(), output);
    fs.writeFileSync(abs, markdown, 'utf8');
    console.log(abs);
  } else {
    process.stdout.write(markdown);
  }
}

try {
  main();
} catch (err) {
  console.error(err instanceof Error ? err.message : String(err));
  process.exit(1);
}
