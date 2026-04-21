# fliggy-flight-summary

机票流程收口汇总 Skill。把 4 个指定 skill 的执行记录自动写入 `workflow-monitor.html`，形成可视化流程监控页。

## 监测范围（固定）

- `fliggy-flight-prd-to-h5`
- `fliggy-flight-design-guide`
- `fliggy-flight-h5-to-review`
- `fliggy-flight-h5-to-figma`

## 快速开始

1. 准备输入文件（可参考 `assets/flight-summary.sample.json`）
2. 执行：

```bash
node "skills/fliggy-flight-summary/scripts/generate-flight-summary.mjs" \
  --input "skills/fliggy-flight-summary/assets/flight-summary.sample.json" \
  --monitor "workflow-monitor.html"
```

3. 打开 `workflow-monitor.html` 查看看板

## 输入格式

见 `SKILL.md` 的“输入契约”章节，或直接复制 `assets/flight-summary.sample.json` 修改。

## 注意事项

- 脚本会过滤监测范围外的 skill run。
- 输入里缺少 `monitor.taskName` / `monitor.requirementName` 时会报错并中断。
- 本 skill 不会调用 gstack、不会写入 Figma，仅生成监控看板数据。
