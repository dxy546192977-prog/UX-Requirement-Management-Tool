# fliggy-flight-h5-to-review

飞猪机票场景的 H5 审查编排 skill，负责把生成好的 H5 或产品提供的 H5 附件交给 gstack 做浏览器驱动审查。

## 文件说明

- `SKILL.md`：主入口，定义输入、审查策略、输出格式和边界

## 当前边界

- 上游输入：`skills/fliggy-flight-prd-to-h5/SKILL.md` 产出的 H5 和 `review_handoff`
- 当前职责：H5 浏览器审查、截图取证、输出 `PASS / PASS_WITH_NOTES / FAIL`
- 不负责：PRD 拆解、H5 生成、Figma 导入
