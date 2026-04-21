---
name: fliggy-design-language
version: 0.1.0
description: "Fliggy Design Language（FDL）：飞猪 App 常规范式界面编排 Skill。薄入口 + 按需读取 foundations、页面 manifest、组件 spec；启动问答收敛 page_id。输出单文件 HTML+CSS。与 fliggy-design-skill（对话 AI 页）双轨隔离，禁止混用 token。"
---
  
## 真实使用效果截图
![](https://img.alicdn.com/imgextra/i2/O1CN018RqGmQ1HK3QhSnmTY_!!6000000000738-2-tps-1680-1324.png)

# Fliggy Design Demo — 编排 Skill

本文件为 **唯一编排入口**。规范正文在仓库内 markdown/html，**禁止**在未命中触发条件时通读全部组件。

**spec_version**：与 `foundations/design-foundations.md` 的 `version` 对齐维护（当前 foundations **0.2.5**，已含 `--color-notice-tint` 等）。

## 与 fliggy-design-skill 的边界

- **FDL**：标准 App 页（导航栏、纵向滚动、横滑模块等）。
- **fliggy-design-skill**：对话式 AI 消息流与卡片。
- **禁止**在同一 HTML 中合并两套 `:root` 或混用对方文档中的 token 语义。

## 读取顺序（必须遵守）

1. [`foundations/design-foundations.md`](foundations/design-foundations.md) — **凡生成必最先读**  
2. 若含真实配图：[`foundations/image-library.md`](foundations/image-library.md)  
3. 若已确定 `page_id`：该 Tab 的 `pages/tabs/<tab>/page-frame.md` + 对应 [`manifest.md`](docs/page-index.md)  
4. 仅读取 **manifest 列出**的路径：[`docs/component-index.md`](docs/component-index.md) 中命中的平台/业务组件 **`spec.md`**，以及 **`pages/tabs/<tab>/modules/*/spec.md`**（页面内模块）  
5. **example.html**（平台组件或 Tab 模块下）：仅当 spec 不足以确定结构时再读  

**闭包原则**：除上述外，**不**为「以防万一」打开未列入 manifest 的文件。多业务域时以 manifest + 用户确认的域列表为界。

## 平台组件 vs 业务组件（选用）

1. **manifest / page-frame 已点名** → 必须用该业务组件。  
2. **整块业务复合结构**（价+主按钮+副操作等）→ 用业务组件，不拆成多个平台原子件硬拼。  
3. **仅原子级主/次按钮或链接且未点名业务组件** → 默认平台按钮/链接 + `design-foundations` token。  

## 启动问答（未给出 page_id 时）

用户已提供明确 `page_id` 或 manifest 路径 → **跳过**。否则用 **2～4 轮**澄清，风格对齐 gstack **AskUserQuestion**：

1. **Re-ground**：一句说明当前仓库任务。  
2. **Simplify**：说明在选「哪类页面」。  
3. **Recommend**：推荐最匹配的 `page_id` + 一句理由。  
4. **选项**：A/B/C… 对应 [`docs/page-index.md`](docs/page-index.md) 中的别名或 `page_id`（表未填满前可结合 [`docs/taxonomy.md`](docs/taxonomy.md) 临时映射）。

**结束条件**：得到确认的 `page_id`（及可选：是否横滑、是否多域），再进入读取链。

## 输出与纪律

- 单文件 HTML + 内联 `<style>`；viewport 见 foundations「一、技术基准」。  
- 颜色、圆角仅用 `var(--*)`；`@font-face` 按需包含 foundations「字体」节。  
- **同一轮**优先读完闭包再输出；文件过多时可分轮，但 **不得**跳过 foundations。

## 索引（真相源）

| 类型 | 文件 |
|------|------|
| 分类树 | [`docs/taxonomy.md`](docs/taxonomy.md) |
| 页面索引 | [`docs/page-index.md`](docs/page-index.md) |
| 五大 Tab 顺序 | [`docs/tab-pages-order.md`](docs/tab-pages-order.md) |
| 组件索引 | [`docs/component-index.md`](docs/component-index.md) |

索引表增量更新后，**无需**在本 SKILL 重复粘贴全表。


## Cursor 安装

将本仓库目录链到或复制到：`~/.cursor/skills/fliggy-design-language/`，使根目录 `SKILL.md` 即为技能入口；以 **本仓库 Git 内容** 为唯一真相源。
