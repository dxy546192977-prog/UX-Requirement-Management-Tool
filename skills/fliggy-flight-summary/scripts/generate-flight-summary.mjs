#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const ALLOWED_SKILLS = new Set([
  "fliggy-flight-prd-to-h5",
  "fliggy-flight-design-guide",
  "fliggy-flight-h5-to-review",
  "fliggy-flight-h5-to-figma"
]);

function parseArgs(argv) {
  const args = {};
  for (let i = 2; i < argv.length; i += 1) {
    const token = argv[i];
    if (!token.startsWith("--")) continue;
    const key = token.slice(2);
    const value = argv[i + 1];
    args[key] = value;
    i += 1;
  }
  return args;
}

function fail(message) {
  console.error(`[fliggy-flight-summary] ${message}`);
  process.exit(1);
}

function ensureFileExists(filePath, label) {
  if (!fs.existsSync(filePath)) {
    fail(`${label} 不存在: ${filePath}`);
  }
}

function sanitizeInput(raw) {
  if (!raw || typeof raw !== "object") fail("输入 JSON 不是对象");
  if (!raw.monitor || typeof raw.monitor !== "object") fail("缺少 monitor 字段");
  if (!raw.monitor.taskName) fail("缺少 monitor.taskName");
  if (!raw.monitor.requirementName) fail("缺少 monitor.requirementName");
  if (!Array.isArray(raw.skills)) fail("缺少 skills 数组");
  if (!Array.isArray(raw.runs)) fail("缺少 runs 数组");

  const skills = raw.skills.filter((s) => s && ALLOWED_SKILLS.has(s.id));
  const skillIds = new Set(skills.map((s) => s.id));
  const runs = raw.runs.filter((r) => r && skillIds.has(r.skillId)).map((run) => ({
    ...run,
    phases: Array.isArray(run.phases) ? run.phases : []
  }));

  const filteredSkillIds = Array.from(skillIds);
  if (filteredSkillIds.length === 0) {
    fail("输入中没有命中 4 个指定 skill 的数据");
  }

  return {
    updatedAt: raw.updatedAt || new Date().toISOString().slice(0, 19).replace("T", " "),
    monitor: {
      taskName: raw.monitor.taskName,
      requirementName: raw.monitor.requirementName,
      skillIds: filteredSkillIds
    },
    skills,
    runs
  };
}

function injectLoadData(html, payload) {
  const serialized = JSON.stringify(payload, null, 8)
    .split("\n")
    .map((line) => `      ${line}`)
    .join("\n");

  const replacement = [
    "    async function loadData() {",
    "      return (",
    `${serialized}`,
    "      );",
    "    }"
  ].join("\n");

  const pattern = /    async function loadData\(\)\s*\{[\s\S]*?    \}\n\n    \/\* ======================================================================/;
  if (!pattern.test(html)) {
    fail("未找到 loadData() 代码块，无法注入 summary 数据");
  }
  return html.replace(pattern, `${replacement}\n\n    /* ======================================================================`);
}

function main() {
  const args = parseArgs(process.argv);
  const cwd = process.cwd();
  const inputPath = args.input ? path.resolve(cwd, args.input) : null;
  const monitorPath = path.resolve(cwd, args.monitor || "workflow-monitor.html");

  if (!inputPath) fail("缺少 --input 参数");
  ensureFileExists(inputPath, "输入文件");
  ensureFileExists(monitorPath, "monitor 文件");

  let input;
  try {
    input = JSON.parse(fs.readFileSync(inputPath, "utf8"));
  } catch (err) {
    fail(`输入 JSON 解析失败: ${err.message}`);
  }
  const payload = sanitizeInput(input);

  const originalHtml = fs.readFileSync(monitorPath, "utf8");
  const nextHtml = injectLoadData(originalHtml, payload);
  fs.writeFileSync(monitorPath, nextHtml, "utf8");

  console.log("[fliggy-flight-summary] 已更新 workflow-monitor.html");
  console.log(`[fliggy-flight-summary] task: ${payload.monitor.taskName}`);
  console.log(`[fliggy-flight-summary] requirement: ${payload.monitor.requirementName}`);
  console.log(`[fliggy-flight-summary] skills: ${payload.monitor.skillIds.join(", ")}`);
  console.log(`[fliggy-flight-summary] runs: ${payload.runs.length}`);
}

main();
