# 飞猪机票：PRD 到 Figma 工作流（V1）

## 适用目标

用于飞猪机票首期场景，把需求从 PRD 快速推进到可编辑的 Figma 初稿。

V1 范围：

- 支持页面：`vertical.flight.home`、`vertical.flight.booking`
- 交付方式：HTML/H5 设计稿 + Figma 导入交付包
- 不包含：直接写 Figma 原生节点

## 使用入口

- 统一编排入口：`skills/flight-prd-to-design/SKILL.md`
- 拆解执行单：`skills/prd-recognition/SKILL.md`
- 路由规则：`skills/flight-prd-to-design/routing.md`
- Figma 交付标准：`skills/flight-prd-to-design/figma-handoff-standard.md`

## 标准流程

### Step 1：投喂 PRD

支持三种输入：

1. 语雀链接
2. 本地 PRD 文档
3. 需求摘要（信息不足时会先补假设）

### Step 2：产出执行计划（先确认再生成）

系统会返回：

- 需求摘要
- 页面清单
- 模块拆解
- 路由结果（supported/partial/unsupported）
- 风险与降级策略

你只需要确认：

- 页面范围是否正确
- 模块边界是否合理
- 是否允许降级执行

### Step 3：设计稿生成

按确认后的执行单逐页面或逐模块生成 HTML：

- `Type A`：在现有页面插入新模块
- `Type B`：在现有模块上改造
- `Direct Reuse`：保留并说明原因

### Step 4：设计审查

在声明完成前必须给出审查摘要：

- 审查结论：`PASS` / `PASS_WITH_NOTES` / `FAIL`
- Key 问题数量
- Medium 问题数量
- 修复动作与待办

### Step 5：Figma 交付

交付包最少包含：

- HTML 文件路径
- 全页预览截图
- 导入步骤
- 审查摘要

导入方式（V1）：

1. 在 Figma 安装 `HTML to Figma Importer` 或 `html.to.design`
2. 复制 HTML 完整代码并转换
3. 导入后由设计师在 Figma 精调

## 路由与降级策略

### supported（home/booking）

直接生成并进入审查。

### partial（list/ota）

默认降级到“插入已覆盖页面”：

- 优先挂靠到 `home` 或 `booking`
- 必须说明挂靠理由与风险

### unsupported（unknown）

停止自动生成，返回人工确认项：

- 建议挂靠页面
- 关键假设
- 下一步建议

## 团队协作建议

### PM / 业务

- PRD 明确写出页面、模块、目标指标
- 模糊需求先给业务约束，减少后续回滚

### 设计

- 先确认执行计划，不要等到出图后再改边界
- 导入 Figma 后专注精调和品牌一致性

### Agent 运行者

- 不要绕过 `prd-recognition` 直接出图
- 不要在 `unsupported` 场景强行生成“伪完整页面”

## 完成标准

任务只有在以下条件同时满足时才算完成：

1. 执行计划已确认
2. 设计稿已生成并通过审查门禁
3. Figma 交付包字段完整
4. 降级或人工确认项被明确记录
