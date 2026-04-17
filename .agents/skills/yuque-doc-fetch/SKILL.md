---
name: yuque-doc-fetch
description: 'Use when/适用于：用户给出 aliyuque.antfin.com 语雀链接，要求抓取文档正文并输出 Markdown，用于文档搬运、知识库入库或 RAG 预处理。'
argument-hint: '<yuque-url> [--output <path>]'
---

# 语雀文档抓取

依赖技能: `mtop-devtools-socket`

## 前置依赖

- 必须先安装 `mtop-devtools-socket` 技能（初始化后全局可用 `mtop-devtools` 命令）：
  - `https://ali-skills.alibaba-inc.com/skills/trip/mtop-devtools/mtop-devtools-socket`

## 适用场景

- 用户提供语雀文档链接，例如：
  - `https://aliyuque.antfin.com/<username>/<book>/<slug>`
  - `https://aliyuque.antfin.com/<username>/<book>/<slug>/markdown`
- 需要用当前浏览器登录态抓取文档内容
- 目标是得到可直接消费的 Markdown

## 输出目标

- 返回 Markdown 文本
- 如用户要求落盘，输出 `.md` 文件
- 失败时给出明确错误原因

## 决策流程

1. 从链接提取 `slug`（最后一段，忽略尾部 `/markdown`）。
2. 使用 `yuque-fetch.mjs` 自动获取文档页面并提取 `book_id`。
3. 脚本内部调用 `api/docs` 接口，解析 `data.sourcecode` 作为最终 Markdown。
4. 如需文件输出，写入 `.md` 并回传文件位置。

## 实施步骤

### 1. 一体化抓取（推荐）

使用 `yuque-fetch.mjs` 一条命令完成：获取页面 → 提取 book_id → 调用 api/docs → 输出 Markdown，全程内存处理，无临时文件。

```bash
# 直接输出到 stdout
node packages/skills/yuque-doc-fetch/scripts/yuque-fetch.mjs \
  https://aliyuque.antfin.com/<username>/<book>/<slug>

# 输出到文件
node packages/skills/yuque-doc-fetch/scripts/yuque-fetch.mjs \
  https://aliyuque.antfin.com/<username>/<book>/<slug> \
  --output /tmp/yuque_doc.md
```

验收条件：
- stderr 打印 `book_id = <数字>`
- stdout（或文件）中存在 Markdown 内容，至少包含一个标题或表格

### 2. 质量检查

- Markdown 至少包含一个标题或表格
- 非空行数量明显大于 5
- 若输出含明显页面导航噪音（如"分享/编辑/返回文档"），优先回到 `api/docs` + `sourcecode`

## 常见分支

- 用户只给 `/markdown` 链接：`yuque-fetch.mjs` 自动去掉后缀，无需手动处理。
- 用户要求保存结果：追加 `--output <path>` 输出到指定文件。

## 参考

- [一体化抓取脚本](./scripts/yuque-fetch.mjs)
