# fliggy design system

这是一个面向飞猪移动端 UI 页面设计的可分享 skill。

- 展示名称：`fliggy design system`
- 发布标识：`fliggy-design-system`
- 作者工号：`250554`
- 作者展示名：`景桐`

## Overview

- 只服务于飞猪移动端 UI 页面
- 同时覆盖普通交易页与 AI 页面
- 适合输出 HTML、Vue、React 等前端原型代码
- 重点解决“不要做成通用 AI 模板页”，而是稳定生成有业务感、有飞猪产品感的移动端页面

## Design Goals

- 让普通页面有真实业务骨架，而不是固定模板
- 让 AI 页面有明确分流，不和普通页面混淆
- 让下单页、详情页、列表页、IM 页在顶部、模块和 CTA 逻辑上都有清晰区别
- 让 skill 可以持续沉淀来自 Figma、参考文档和真实页面的规律

## Quick Start

```bash
npx ali-skills add aone-open-skill/fliggy-design-system --skill fliggy-design-system
```

或者使用平台安装命令：

```bash
aone-kit skill install fliggy-design-system@1.0.3
```

## Dependencies

- 依赖组件：`aone-kit` CLI
- 作用：负责 skill 的安装、更新与管理
- 安装命令：

```bash
npm install -g @ali/aone-kit --registry=https://registry.anpm.alibaba-inc.com
```

- 检查命令：

```bash
which aone-kit
```

## Usage

- 做普通页面时，优先使用列表、详情、下单、频道四类骨架
- 做 AI 页面时，先判断是否需要 IM 对话型
- 做交易页时，确保价格、规则、表单、CTA 都清晰稳定
- 页面需要图片时，优先输出真实且与业务场景匹配的图片，不要留空白占位
- 常规主按钮默认黄底黑字；`预订`、`立即抢`、`支付` 这类强交易动作优先红底白字
- 做组件或实例校准时，优先查阅 `references/figma-source-map.md`

## Included Files

- `SKILL.md`：主规则
- `references/design-language-adaptation.md`：参考设计语言如何收敛到飞猪移动端
- `references/component-matrix.md`：普通组件与 AI 组件矩阵
- `references/figma-source-map.md`：Figma Page 的读取优先级与用途
- `references/mobile-page-rules.md`：普通移动端页面骨架和下单页规则
- `references/real-image-rules.md`：真实图片使用、搜图和运行时接入规则
- `references/ai-im-patterns.md`：AI IM 对话型页面规则
- `examples/prompts.md`：推荐触发语句
- `examples/eval-prompts.md`：用来回归测试 skill 的评测 prompts
- `evals/checklist.md`：分享前自检清单

## Publishing Notes

- 先走一遍 `examples/prompts.md`
- 再用 `examples/eval-prompts.md` 做回归测试
- 再按 `evals/checklist.md` 自检
- 后续新增真实页面规律时，优先沉淀到 `references/`
- 如果后续继续接入新的 Figma 页面，不要直接堆到主文件里，先补参考文档再更新 `SKILL.md`
- 如果接入图片接口，只通过运行时配置注入 API key，不要把 key 写进 skill 文件或仓库
- 图片检索优先考虑实体词与业务词组合，如 `Disneyland castle fireworks ticket`
