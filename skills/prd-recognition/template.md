# AI 设计执行文档：{需求名称}

> 需求 ID：{id}
> 生成时间：{datetime}
> PRD 链接：{url}
> 识别 Skill：prd-recognition
> 下游设计 Skill：fliggy-design-gui
> 交付目标：{delivery_target: html-only | html-to-figma}
> 场景范围：{scope: flight-only-v1}
> 对标来源：{benchmark_source: gztchan/awesome-design}

## 使用方式

将下方任一页面或模块片段直接发给 AI，要求其基于 `fliggy-design-gui` 输出设计稿方案。
如果只想先做部分页面，可以按页面维度分开发送。

## 需求摘要

{summary}

## 发散拆解（idea）

{idea_divergence_and_assumptions}

## 商业与战略压测（ceo）

{ceo_challenge_and_clarifications}

## 体验与设计评审视角（UXdesign-buff）

{ux_path_risks_and_figma_notes}

## Google 对标映射

- benchmark_source：{gztchan/awesome-design}
- benchmark_dimensions：{styleguide_branding, color_typography, usability_review}
- benchmark_notes：{how_applied_and_tradeoffs}

## 涉及页面

- {page_1}
- {page_2}

## 页面路由摘要

| 页面 | page_id | 路由状态 | 基线物料 |
|---|---|---|---|
| {page_name} | {page_id} | {supported | partial | unsupported} | {baseline_artifact} |

---

## 页面 1：{page_name}

> 基线页面：{page_baseline}

### 模块 1：{module_name}

- 变更类型：{新建|改现有|直接复用}
- 执行类型：{Type A|Type B|Direct Reuse}
- 设计意图：{intent}
- 备注：{notes}
- page_id：{page_id}
- baseline_artifact：{baseline_artifact}
- module_slug：{module_slug_or_none}
- delivery_target：{delivery_target}
- review_required：{true|false}
- route_status：{supported|partial|unsupported}
- execution_mode：{normal|fallback-insert|human-confirmation}
- fallback_reason：{fallback_reason_or_none}
- benchmark_source：{gztchan/awesome-design}
- benchmark_dimensions：{styleguide_branding|color_typography|usability_review|toolchain_readiness}
- benchmark_notes：{module_level_benchmark_notes}

#### 可直接发给 AI 的执行指令

请使用 `fliggy-design-gui` 能力处理该模块。
按 `{Type A|Type B|Direct Reuse}` 的方式执行。
优先沿用现有页面骨架，不要脱离当前页面的信息架构重做。
本模块核心目标：{intent}
额外约束：{notes}

### 模块 2：{module_name}

- 变更类型：{新建|改现有|直接复用}
- 执行类型：{Type A|Type B|Direct Reuse}
- 设计意图：{intent}
- 备注：{notes}
- page_id：{page_id}
- baseline_artifact：{baseline_artifact}
- module_slug：{module_slug_or_none}
- delivery_target：{delivery_target}
- review_required：{true|false}
- route_status：{supported|partial|unsupported}
- execution_mode：{normal|fallback-insert|human-confirmation}
- fallback_reason：{fallback_reason_or_none}
- benchmark_source：{gztchan/awesome-design}
- benchmark_dimensions：{styleguide_branding|color_typography|usability_review|toolchain_readiness}
- benchmark_notes：{module_level_benchmark_notes}

#### 可直接发给 AI 的执行指令

请使用 `fliggy-design-gui` 能力处理该模块。
按 `{Type A|Type B|Direct Reuse}` 的方式执行。
优先沿用现有页面骨架，不要脱离当前页面的信息架构重做。
本模块核心目标：{intent}
额外约束：{notes}

---

## 给 AI 的统一要求

- 使用 `fliggy-design-gui` 进行页面或模块设计。
- 优先复用现有页面骨架，不要脱离当前信息架构从零发散。
- 对于 `modify` 类型模块，按改现有模块的方式产出。
- 对于 `create` 类型模块，按在现有页面插入新模块的方式产出。
- 对于 `reuse` 类型模块，只需在整体方案中保留并说明原因。
- 如果信息不足，请先列出假设，再继续产出设计稿。
- 输出必须体现 Google 对标结果：样式一致性、信息层级、可用性风险和导入可执行性。

## Figma 交付包（执行后回填）

```json
{
  "figma_handoff": {
    "status": "draft",
    "delivery_mode": "{html-only|html-to-figma}",
    "benchmark_source": "gztchan/awesome-design",
    "benchmark_dimensions": [
      "styleguide_branding",
      "color_typography",
      "usability_review"
    ],
    "benchmark_notes": "{handoff_level_benchmark_notes}",
    "html_files": [],
    "preview_screenshots": [],
    "review_summary": {
      "result": "PENDING",
      "key_issues": 0,
      "medium_issues": 0
    },
    "import_guide": {
      "plugin_options": [
        "HTML to Figma Importer",
        "html.to.design"
      ],
      "steps": [
        "在 Figma 中安装并打开插件",
        "复制 HTML 文件完整内容",
        "粘贴并执行 Convert",
        "导入后进入精调"
      ]
    }
  }
}
```
