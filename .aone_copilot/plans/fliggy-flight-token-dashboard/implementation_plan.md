### fliggy-flight-token-dashboard ###
基于 skills/fliggy-flight-summary/assets/flight-summary.sample.json 数据，生成一个独立的 Token 消耗看板 HTML 文件，可视化展示各 Skill、Model、Phase 的 Token 使用情况。

# Token 消耗看板生成

基于 `flight-summary.sample.json` 的执行数据，生成一个独立的单文件 H5 看板，聚焦于 Token 消耗的多维度可视化分析。

## Proposed Changes

### Token Dashboard HTML

#### [NEW] [token-dashboard.html](file:///Users/dengxinyang/Desktop/AI·Project/Requirements Management/skills/fliggy-flight-summary/token-dashboard.html)

看板包含以下模块：

**顶部 KPI 卡片区**
- 总 Prompt Tokens
- 总 Completion Tokens
- 总 Token（合计）
- 平均每 Run Token 消耗

**模型占比环形图（Model Token Distribution）**
- 按 model 聚合所有 phase 的 total tokens
- 展示：`claude-4.6-sonnet` / `composer-2` / `composer-1.5` / `gpt-5.4-medium` 各自占比
- 使用纯 CSS + SVG 实现环形图，无需外部依赖

**Skill 维度 Token 横向柱状图**
- 4 个 Skill 各自的 prompt / completion token 堆叠条形图
- 颜色区分 prompt（蓝）和 completion（橙）

**Run 时间线 Token 明细表**
- 按 run 展开，列出每个 phase 的：Phase 名称 / Model / Prompt Tokens / Completion Tokens / Total / 耗时 / 状态
- 状态用色标标注：pass（绿）/ running（蓝动画）/ idle（灰）

**数据来源说明**
- 顶部显示 `updatedAt`、任务名、需求名
- 数据内嵌在 HTML 中（`const DATA = {...}`），无需后端

**技术约束**
- 单文件 HTML，零外部依赖
- 纯 CSS 实现图表（SVG + CSS 动画）
- 飞猪风格配色（主色 `#FF6600`，辅色 `#1677FF`）
- 移动端友好，最大宽度 480px 居中

## Verification Plan

### Manual Verification
- 用浏览器打开 `token-dashboard.html`，确认 KPI 数值与 JSON 数据一致
- 检查模型占比图各扇区比例正确
- 检查 Skill 柱状图数值正确
- 确认 running 状态的 phase 有动画效果


updateAtTime: 2026/4/23 11:28:01

planId: 0d0a2430-f971-4085-b220-4a9bfbe93aa3