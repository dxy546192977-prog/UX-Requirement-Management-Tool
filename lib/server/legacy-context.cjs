"use strict";

const crypto = require("crypto");
const fs = require("fs");
const https = require("https");
const path = require("path");

const yuqueSvc = require("../../services/yuque-service");
const aiDesignSvc = require("../../services/ai-design-service");

const ROOT_DIR = process.cwd();
const CONFIG_PATH = path.join(ROOT_DIR, "config", "config.json");
const LEGACY_CONFIG_PATH = path.join(ROOT_DIR, "config.json");
const DEFAULT_OSS_BUCKET = "designacceleration";
const DEFAULT_OSS_REGION = "oss-cn-beijing";
const DEFAULT_OSS_FILE_KEY = "requirements.json";
const DINGTALK_WEBHOOK_PREFIX = "https://oapi.dingtalk.com/robot/send";

const ALLOWED_ORIGINS = new Set([
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  "http://localhost:3001",
  "http://127.0.0.1:3001",
  ...(process.env.ALLOWED_ORIGIN ? [process.env.ALLOWED_ORIGIN] : [])
]);

function readJsonFile(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf-8"));
  } catch (err) {
    if (err.code !== "ENOENT") {
      console.error(`[Config] Failed to read ${filePath}:`, err.message);
    }
    return null;
  }
}

function pickEnvConfig() {
  const envMap = {
    yuque_api_base: process.env.YUQUE_API_BASE,
    yuque_token: process.env.YUQUE_TOKEN,
    dingtalk_webhook: process.env.DINGTALK_WEBHOOK,
    oss_access_key_id: process.env.OSS_ACCESS_KEY_ID,
    oss_access_key_secret: process.env.OSS_ACCESS_KEY_SECRET,
    oss_bucket: process.env.OSS_BUCKET,
    oss_region: process.env.OSS_REGION,
    oss_file_key: process.env.OSS_FILE_KEY,
    ai_provider: process.env.AI_PROVIDER,
    ai_api_base: process.env.AI_API_BASE,
    ai_api_key: process.env.AI_API_KEY,
    ai_model: process.env.AI_MODEL,
    ai_decompose_provider: process.env.AI_DECOMPOSE_PROVIDER,
    ai_decompose_api_base: process.env.AI_DECOMPOSE_API_BASE,
    ai_decompose_api_key: process.env.AI_DECOMPOSE_API_KEY,
    ai_decompose_model: process.env.AI_DECOMPOSE_MODEL,
    ai_decompose_max_images: process.env.AI_DECOMPOSE_MAX_IMAGES
  };

  return Object.fromEntries(
    Object.entries(envMap).filter(([, value]) => value !== undefined && value !== "")
  );
}

function loadConfig() {
  const fileConfig = readJsonFile(CONFIG_PATH) || readJsonFile(LEGACY_CONFIG_PATH) || {};
  const envConfig = pickEnvConfig();
  const merged = { ...fileConfig, ...envConfig };
  return Object.keys(merged).length ? merged : null;
}

function saveConfig(config) {
  if (process.env.VERCEL) {
    console.warn("[Config] Runtime config writes are disabled on Vercel. Use environment variables instead.");
    return false;
  }

  try {
    const configDir = path.dirname(CONFIG_PATH);
    if (!fs.existsSync(configDir)) fs.mkdirSync(configDir, { recursive: true });
    fs.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2), "utf-8");
    return true;
  } catch (err) {
    console.error("[Config] Failed to write config/config.json:", err.message);
    return false;
  }
}

function normalizeAiKey(value) {
  const key = String(value || "").trim();
  if (!key || key === "YOUR_AI_API_KEY_HERE") return "";
  return key;
}

function hasAnyAiKey(config) {
  if (!config) return false;
  return Boolean(normalizeAiKey(config.ai_api_key) || normalizeAiKey(config.ai_decompose_api_key));
}

function normalizeDingTalkWebhook(url) {
  const val = String(url || "").trim();
  if (!val) return "";
  if (!val.startsWith(DINGTALK_WEBHOOK_PREFIX)) return "";
  return val;
}

function fetchYuqueDoc(config, groupLogin, bookSlug, docSlug) {
  return new Promise((resolve, reject) => {
    const apiUrl = `${config.yuque_api_base}/api/v2/repos/${groupLogin}/${bookSlug}/docs/${docSlug}`;
    const parsed = new URL(apiUrl);
    const options = {
      hostname: parsed.hostname,
      port: parsed.port || 443,
      path: parsed.pathname + parsed.search,
      method: "GET",
      headers: {
        "X-Auth-Token": config.yuque_token,
        "Content-Type": "application/json",
        "User-Agent": "RequirementsManagement/1.0"
      }
    };

    const req = https.request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => { data += chunk; });
      res.on("end", () => {
        try {
          const json = JSON.parse(data);
          if (res.statusCode !== 200) {
            reject(new Error(`Yuque API returned ${res.statusCode}: ${json.message || data}`));
            return;
          }
          resolve(json);
        } catch (err) {
          reject(new Error("Failed to parse Yuque API response: " + err.message));
        }
      });
    });

    req.on("error", (err) => reject(new Error("Yuque API request failed: " + err.message)));
    req.setTimeout(30000, () => {
      req.destroy();
      reject(new Error("Yuque API request timed out"));
    });
    req.end();
  });
}

function getYuqueConfigOrError(res) {
  const config = loadConfig();
  if (!config) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Failed to load config from environment variables or config/config.json" }));
    return null;
  }
  if (!config.yuque_token || config.yuque_token === "YOUR_YUQUE_API_TOKEN_HERE") {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Yuque API Token not configured. Set YUQUE_TOKEN on Vercel." }));
    return null;
  }
  return config;
}

function getFileExtFromUrl(url, contentType) {
  const byType = {
    "image/jpeg": ".jpg",
    "image/png": ".png",
    "image/gif": ".gif",
    "image/webp": ".webp",
    "image/svg+xml": ".svg",
    "image/bmp": ".bmp"
  };
  if (contentType && byType[contentType.toLowerCase()]) return byType[contentType.toLowerCase()];

  try {
    const parsed = new URL(url);
    const ext = path.extname(parsed.pathname || "").toLowerCase();
    if (ext && ext.length <= 5) return ext;
  } catch (_) {
    // ignore
  }
  return ".bin";
}

function getOssConfig(config) {
  if (!config) return null;
  const accessKeyId = String(config.oss_access_key_id || "").trim();
  const accessKeySecret = String(config.oss_access_key_secret || "").trim();
  if (!accessKeyId || !accessKeySecret || accessKeyId === "YOUR_OSS_ACCESS_KEY_ID" || accessKeySecret === "YOUR_OSS_ACCESS_KEY_SECRET") {
    return null;
  }
  const bucket = String(config.oss_bucket || DEFAULT_OSS_BUCKET).trim();
  const region = String(config.oss_region || DEFAULT_OSS_REGION).trim();
  const fileKey = String(config.oss_file_key || DEFAULT_OSS_FILE_KEY).trim();
  const host = `${bucket}.${region}.aliyuncs.com`;
  return { accessKeyId, accessKeySecret, bucket, region, fileKey, host };
}

function getOssReadTarget(config) {
  const bucket = String((config && config.oss_bucket) || DEFAULT_OSS_BUCKET).trim();
  const region = String((config && config.oss_region) || DEFAULT_OSS_REGION).trim();
  const fileKey = String((config && config.oss_file_key) || DEFAULT_OSS_FILE_KEY).trim();
  const host = `${bucket}.${region}.aliyuncs.com`;
  return { bucket, region, fileKey, host };
}

function postJsonToRemoteUrl(targetUrl, payload) {
  return new Promise((resolve, reject) => {
    let parsed;
    try {
      parsed = new URL(targetUrl);
    } catch {
      reject(new Error("Invalid URL"));
      return;
    }
    if (parsed.protocol !== "https:") {
      reject(new Error("Only https URL is allowed"));
      return;
    }

    const body = JSON.stringify(payload || {});
    const req = https.request({
      hostname: parsed.hostname,
      port: parsed.port || 443,
      path: parsed.pathname + parsed.search,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(body, "utf8")
      }
    }, (res) => {
      let chunks = "";
      res.on("data", (chunk) => { chunks += chunk; });
      res.on("end", () => resolve({ statusCode: res.statusCode || 500, body: chunks }));
    });
    req.on("error", reject);
    req.setTimeout(15000, () => req.destroy(new Error("DingTalk request timed out")));
    req.write(body);
    req.end();
  });
}

function requestHttps(options, body) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let chunks = "";
      res.on("data", (chunk) => { chunks += chunk; });
      res.on("end", () => resolve({ statusCode: res.statusCode, headers: res.headers, body: chunks }));
    });
    req.on("error", reject);
    req.setTimeout(15000, () => req.destroy(new Error("HTTPS request timed out")));
    if (body) req.write(body);
    req.end();
  });
}

async function loadRequirementsFromOss(config) {
  const oss = getOssReadTarget(config);
  const res = await requestHttps({
    hostname: oss.host,
    port: 443,
    path: `/${oss.fileKey}?t=${Date.now()}`,
    method: "GET"
  });
  if (res.statusCode !== 200) throw new Error(`OSS GET returned ${res.statusCode}`);
  const parsed = JSON.parse(res.body || "{}");
  if (!Array.isArray(parsed.requirements)) throw new Error("OSS requirements.json format invalid");
  return parsed;
}

function buildOssAuthHeaders(oss, method, filePath, contentType) {
  const date = new Date().toUTCString();
  const stringToSign = `${method}\n\n${contentType}\n${date}\n/${oss.bucket}/${filePath}`;
  const signature = crypto
    .createHmac("sha1", oss.accessKeySecret)
    .update(stringToSign, "utf8")
    .digest("base64");
  return {
    Date: date,
    Authorization: `OSS ${oss.accessKeyId}:${signature}`
  };
}

async function saveRequirementsToOss(config, payload) {
  const oss = getOssConfig(config);
  if (!oss) return false;

  const body = JSON.stringify(payload, null, 2);
  const contentType = "application/json";
  const authHeaders = buildOssAuthHeaders(oss, "PUT", oss.fileKey, contentType);
  const res = await requestHttps({
    hostname: oss.host,
    port: 443,
    path: `/${oss.fileKey}`,
    method: "PUT",
    headers: {
      ...authHeaders,
      "Content-Type": contentType,
      "Content-Length": Buffer.byteLength(body, "utf8")
    }
  }, body);

  if (res.statusCode >= 200 && res.statusCode < 300) return true;
  throw new Error(`OSS PUT returned ${res.statusCode}: ${res.body || ""}`);
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => { body += chunk; });
    req.on("end", () => resolve(body));
    req.on("error", reject);
  });
}

function getCorsHeaders(requestOrigin) {
  const headers = new Headers({
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
  });
  if (requestOrigin && ALLOWED_ORIGINS.has(requestOrigin)) {
    headers.set("Access-Control-Allow-Origin", requestOrigin);
    headers.set("Vary", "Origin");
  }
  return headers;
}

function buildLegacyRouteContext() {
  return {
    loadConfig,
    saveConfig,
    getOssConfig,
    normalizeDingTalkWebhook,
    postJsonToRemoteUrl,
    requestHttps,
    loadRequirementsFromOss,
    saveRequirementsToOss,
    fetchYuqueDoc,
    getYuqueConfigOrError,
    getFileExtFromUrl,
    normalizeAiKey,
    hasAnyAiKey,
    readBody,
    yuqueSvc,
    aiDesignSvc
  };
}

module.exports = {
  buildLegacyRouteContext,
  getCorsHeaders
};
