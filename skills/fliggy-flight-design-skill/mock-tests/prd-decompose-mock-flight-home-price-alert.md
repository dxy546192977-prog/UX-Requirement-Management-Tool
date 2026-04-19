# AI 设计执行文档：机票首页价格提醒入口增强（Mock）

> 需求 ID：MOCK-FLIGHT-20260419-001
> 生成时间：2026-04-19 16:30
> PRD 链接：mock://flight/home/price-alert
> 识别 Skill：prd-recognition
> 下游设计 Skill：fliggy-design-gui
> 交付目标：html-to-figma
> 场景范围：flight-only-v1
> 对标来源：gztchan/awesome-design

## 需求摘要

在机票首页搜索区下方新增“降价提醒入口”轻量模块，提升价格订阅转化。

## 发散拆解（idea）

- 用户在搜前需要更低决策成本，入口应在首屏可见但不抢主 CTA。
- 模块支持“开关状态 + 简短价值描述 + 一键订阅”。
- 弱网和未登录状态需有降级文案。

## 商业与战略压测（ceo）

- 不改变首页主信息架构，不新增复杂路径。
- 以最小可行模块验证点击率与订阅率。
- 若效果不达标，可无损回退为普通文案条。

## 体验与设计评审视角（UXdesign-buff）

- 首屏层级：搜索主路径 > 价格提醒入口 > 促销模块。
- 文案需清晰说明收益，避免误导为“自动下单”。
- Figma 导入时保持单模块独立图层，便于后续迭代。

## Google 对标映射

- benchmark_source：gztchan/awesome-design
- benchmark_dimensions：styleguide_branding, color_typography, usability_review, user_testing
- benchmark_notes：沿用飞猪首页骨架，仅增强信息层级、可读性与可验证路径。

## 涉及页面

- 机票首页

## 页面路由摘要

| 页面 | page_id | 路由状态 | 基线物料 |
|---|---|---|---|
| 机票首页 | vertical.flight.home | supported | playbooks/flight-funnel/1 首页/首页.html |

---

## 页面 1：机票首页

> 基线页面：playbooks/flight-funnel/1 首页/首页.html

### 模块 1：降价提醒入口条

- 变更类型：新建
- 执行类型：Type A
- 设计意图：在不打断主搜索流程的前提下提升价格提醒订阅转化
- 备注：入口位于搜索模块下方、促销模块上方；首屏可见；弱网有降级文案
- page_id：vertical.flight.home
- baseline_artifact：playbooks/flight-funnel/1 首页/首页.html
- module_slug：flight-home-price-alert
- delivery_target：html-to-figma
- review_required：true
- route_status：supported
- execution_mode：normal
- fallback_reason：none
- benchmark_source：gztchan/awesome-design
- benchmark_dimensions：styleguide_branding|color_typography|usability_review|user_testing
- benchmark_notes：强调层级清晰、点击区域明确、状态文案可测试
- 插入锚点：section.kong 之后、section.save-money 之前

#### 可直接发给 AI 的执行指令

请使用 `fliggy-design-gui` 能力处理该模块。  
按 `Type A` 方式执行。  
优先沿用首页现有骨架，不改动搜索主模块。  
本模块核心目标：提升价格提醒订阅转化。  
额外约束：仅新增一条轻量模块，不新增复杂交互路径。

---

## 给 AI 的统一要求

- 使用 `fliggy-design-gui` 进行模块设计。
- 不脱离首页现有信息架构。
- 输出必须体现对标结果：样式一致性、信息层级、可用性风险和导入可执行性。

## Figma 交付包（执行后回填）

```json
{
  "figma_handoff": {
    "status": "draft",
    "delivery_mode": "html-to-figma",
    "benchmark_source": "gztchan/awesome-design",
    "benchmark_dimensions": [
      "styleguide_branding",
      "color_typography",
      "usability_review",
      "user_testing"
    ],
    "benchmark_notes": "待生成后回填",
    "html_files": [],
    "preview_screenshots": [],
    "review_summary": {
      "result": "PENDING",
      "key_issues": 0,
      "medium_issues": 0
    }
  }
}
```
