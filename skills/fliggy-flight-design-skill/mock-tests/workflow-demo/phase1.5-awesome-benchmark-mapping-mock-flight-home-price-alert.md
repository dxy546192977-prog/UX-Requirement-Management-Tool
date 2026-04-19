# Phase 1.5 对标映射记录（Mock 演示）

- workflow_ref: `skills/fliggy-flight-design-skill/Workflow.md`
- input_from: `mock-tests/workflow-demo/phase1.2-gstack-awesome-review-mock-flight-home-price-alert.md`
- output_to: `mock-tests/outputs/flight-home-price-alert-v5.shaped-from-1-home.mock.html`
- mapping_time: `2026-04-19 21:18`

## 1) 参考源

- benchmark_source: `https://github.com/gztchan/awesome-design`

## 2) 维度映射

### styleguide_branding
- 映射点：维持飞猪首页“搜索优先”主路径，新增模块只做轻量增强。
- 取舍：不引入外部品牌样式，不改变原页面导航与主框架。

### color_typography
- 映射点：新增模块颜色、圆角、阴影均复用基线 token。
- 取舍：避免裸色与新 token，保持视觉系统一致性。

### usability_review
- 映射点：CTA 直接可见，信息文案突出收益（“已降”“近7天最低”）。
- 取舍：不增加复杂交互流程，减少跳转认知负担。

### user_testing
- 映射点：将“入口曝光 -> CTA 点击 -> 订阅成功”设为最小验证路径。
- 取舍：当前为视觉稿演示，埋点字段定义放到后续实现阶段。

## 3) 对标冲突处理

- 冲突项：无结构冲突。
- 冲突原则：若与飞猪现有信息架构冲突，优先保留飞猪主路径（已遵循）。

## 4) 可继承字段（供 Phase 2/3/4）

```json
{
  "benchmark_source": "gztchan/awesome-design",
  "benchmark_dimensions": [
    "styleguide_branding",
    "color_typography",
    "usability_review",
    "user_testing"
  ],
  "benchmark_notes": "保持飞猪首页骨架，新增轻量价格提醒入口；强调信息层级、可读性和可验证路径。"
}
```
