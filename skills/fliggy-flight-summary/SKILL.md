---
name: fliggy-flight-summary
version: 0.1.0
description: 飞猪机票流程收口汇总 Skill。用于在 fliggy-flight-prd-to-h5、fliggy-flight-design-guide、fliggy-flight-gstack-review、fliggy-flight-h5-to-figma 执行后，自动生成 workflow-monitor.html 监控看板，统一呈现任务、需求、模型、token 与耗时。
---

# Fliggy Flight Summary

## 目标

在机票设计流程收尾阶段，把执行数据自动汇总为一个可打开的 H5 看板（`workflow-monitor.html`），让团队快速看到：

- 当前检测任务是什么
- 对应的是哪条需求
- 4 个指定 skill 的执行轨迹
- 每个阶段用的模型、token、耗时、状态

本 skill 只做“汇总与出板”，不替代上游设计与审查 skill。

## 仅支持的监测范围

只监测以下 4 个 skill：

1. `skills/fliggy-flight-prd-to-h5`
2. `skills/fliggy-flight-design-guide`
3. `skills/fliggy-flight-gstack-review`
4. `skills/fliggy-flight-h5-to-figma`

出现其他 skill 数据时，默认过滤，不进入看板统计。

## 触发时机（必须）

当以下条件满足时触发：

- 本次需求在上述 4 个 skill 中至少执行了 1 个
- 需要输出“流程执行摘要”给业务、设计或评审方

推荐触发点：

- `fliggy-flight-gstack-review` 结束后（拿到审查结论）
- `fliggy-flight-h5-to-figma` 结束后（形成完整交付链路）

## 输入契约

输入为一个 JSON 文件（建议命名：`flight-summary.input.json`），最小结构如下：

```json
{
  "updatedAt": "2026-04-20 16:10",
  "monitor": {
    "taskName": "机票订详页海免商品推荐链路监测",
    "requirementName": "机票订详页新增海南离岛免税商品推荐模块（REQ-FLT-2026-0419-HM01）",
    "skillIds": [
      "fliggy-flight-prd-to-h5",
      "fliggy-flight-design-guide",
      "fliggy-flight-gstack-review",
      "fliggy-flight-h5-to-figma"
    ]
  },
  "skills": [
    { "id": "fliggy-flight-prd-to-h5", "name": "fliggy-flight-prd-to-h5", "description": "..." }
  ],
  "runs": [
    {
      "id": "run-001",
      "skillId": "fliggy-flight-prd-to-h5",
      "taskTitle": "海免离岛免税推荐 · PRD 路由",
      "requirementId": "REQ-FLT-2026-0419-HM01",
      "requirementTitle": "机票订详页新增海南离岛免税商品推荐模块",
      "startedAt": "2026-04-20 13:52",
      "finishedAt": "2026-04-20 14:09",
      "status": "pass",
      "phases": [
        {
          "name": "Phase 0 · 抓取语雀",
          "model": "composer-2",
          "promptTokens": 2100,
          "completionTokens": 180,
          "durationMs": 4100,
          "status": "pass"
        }
      ]
    }
  ]
}
```

## 执行方式

运行脚本：

```bash
node "skills/fliggy-flight-summary/scripts/generate-flight-summary.mjs" \
  --input "path/to/flight-summary.input.json" \
  --monitor "/absolute/path/to/workflow-monitor.html"
```

参数说明：

- `--input`：必填，输入 JSON 路径
- `--monitor`：可选，默认 `./workflow-monitor.html`

## 输出

- 直接改写 `workflow-monitor.html` 的 `loadData()` 数据源
- 页面打开即可看到最新监测结果（不依赖后端）

## 完成判定

满足以下条件才算完成：

1. `workflow-monitor.html` 顶部显示了检测任务与需求
2. 仅出现 4 个指定 skill 的数据
3. KPI、模型占比、skill 泳道、run 时间线均可渲染
4. 每个 run 都能追溯到需求信息（`requirementTitle` / `requirementId`）
