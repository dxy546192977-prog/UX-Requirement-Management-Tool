# fliggy-flight-prd-to-h5

飞猪机票场景的前半段统一编排入口，聚焦把 PRD 变成最终 H5。

## 文件说明

- `SKILL.md`：统一执行入口（PRD 拆解、路由、H5 生成或附件直下、审查 handoff）
- `routing.md`：首期页面路由与降级策略
- `figma-handoff-standard.md`：后续 HTML 到 Figma 的交付标准，本 skill 当前不直接负责这一段

## 当前边界

- 上游来源：`online-index.html` 中的需求卡片和 PRD 链接
- 当前终点：H5 ready for review
- 下游审查：`skills/fliggy-flight-gstack-review/SKILL.md`
