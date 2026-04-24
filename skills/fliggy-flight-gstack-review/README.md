# fliggy-flight-gstack-review

飞猪机票场景的 H5 审查编排 skill，负责把生成好的 H5 或产品提供的 H5 附件交给 gstack 做浏览器驱动审查。

## 文件说明

- `SKILL.md`：主入口，定义输入、审查策略、输出格式和边界

## 当前边界

- 上游输入：`skills/fliggy-flight-prd-to-h5/SKILL.md` 产出的 H5 和 `review_handoff`
- 当前职责：H5 浏览器审查、截图取证、输出**单文件 HTML 可视化报告**（结论 `PASS / PASS_WITH_NOTES / FAIL` + CEO Section 11 评估 + impeccable 反模式扫描 + issues + 截图证据），并附带结构化 JSON 供机器读取
- HTML 报告本身遵循 impeccable 设计语言约束（暗色基调、系统字体、1px hairline 分隔、无渐变文字、无侧边条纹、离线可双击打开）
- 不负责：PRD 拆解、H5 生成、Figma 导入、Markdown 报告生成
