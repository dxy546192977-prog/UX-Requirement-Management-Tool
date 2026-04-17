#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const homepagePath = path.join(__dirname, "首页.html");
const specialModulePath = path.join(__dirname, "5 特价机票", "特价机票.html");

function readText(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function normalizeNewlines(text) {
  return text.replace(/\r\n/g, "\n");
}

function extractBetween(text, startMarker, endMarker, label) {
  const start = text.indexOf(startMarker);
  const end = text.indexOf(endMarker);

  if (start === -1 || end === -1 || end < start) {
    throw new Error(`未找到 ${label} 标记: ${startMarker} ... ${endMarker}`);
  }

  return text.slice(start + startMarker.length, end).trim();
}

function replaceBetween(text, startMarker, endMarker, replacement, indent = "") {
  const start = text.indexOf(startMarker);
  const end = text.indexOf(endMarker);

  if (start === -1 || end === -1 || end < start) {
    throw new Error(`未找到首页注入标记: ${startMarker} ... ${endMarker}`);
  }

  const injected = replacement
    .split("\n")
    .map((line) => `${indent}${line}`.replace(/[ \t]+$/g, ""))
    .join("\n");

  return [
    text.slice(0, start + startMarker.length),
    "\n",
    injected,
    "\n",
    text.slice(end),
  ].join("");
}

function main() {
  const moduleSource = normalizeNewlines(readText(specialModulePath));
  const homepageSource = normalizeNewlines(readText(homepagePath));

  const specialStyles = extractBetween(
    moduleSource,
    "/* @homepage-module-styles:start */",
    "/* @homepage-module-styles:end */",
    "模块样式"
  );
  const specialMarkup = extractBetween(
    moduleSource,
    "<!-- @homepage-module-markup:start -->",
    "<!-- @homepage-module-markup:end -->",
    "模块结构"
  );

  let nextHomepage = replaceBetween(
    homepageSource,
    "/* @generated-special-module-styles:start */",
    "/* @generated-special-module-styles:end */",
    [
      "/* 特价机票模块样式由构建脚本注入，请勿手改 */",
      specialStyles,
    ].join("\n"),
    "    "
  );

  nextHomepage = replaceBetween(
    nextHomepage,
    "<!-- @generated-special-module-markup:start -->",
    "<!-- @generated-special-module-markup:end -->",
    [
      "<!-- 特价机票模块内容由构建脚本注入，请勿手改 -->",
      specialMarkup,
    ].join("\n"),
    "    "
  );

  fs.writeFileSync(homepagePath, `${nextHomepage.trimEnd()}\n`, "utf8");
  console.log(`已同步特价机票模块到 ${homepagePath}`);
}

main();
