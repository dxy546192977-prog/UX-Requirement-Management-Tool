---
name: flight-prd-to-design
version: 0.1.0
description: 飞猪机票场景统一入口。把 PRD 拆解、页面路由、设计生成、审查与 Figma 导入交付串成一条可执行链路。
---

# Flight PRD to Design

## 目标

给实际工作提供一个统一入口，避免使用者手动拼接多个 skill。首期只覆盖飞猪机票场景，并以“可快速进入 Figma 精调”为交付目标。

交付链路：

`PRD/语雀 -> 结构化拆解 -> 页面路由 -> HTML/H5 设计稿 -> 设计审查 -> Figma 导入交付包`

## 适用范围

- 适用：飞猪机票需求（首页/下单页优先）
- 不适用：直接写入 Figma 原生节点；跨行业通用方案
- 首期页面范围：`home`、`booking`
- 未覆盖页（如 `list`、`ota`）：按降级策略执行，见 `routing.md`

## 依赖与职责

### 需求拆解

- 主拆解 skill：`skills/prd-recognition/SKILL.md`
- 强制三技能：`idea`、`ceo`、`uxdesign-buff`
- 产出：可路由执行单（不是纯描述性摘要）

### 设计生成

- 设计编排：`.agents/skills/fliggy-design-gui/SKILL.md`
- 机票垂类策略：`skills/fliggy-flight-design-skill/设计哲学.md`
- 页面真相源：`example-full.html` + `spec.md`
- 底层对标基线：`google-awesome-design-baseline.md`

### 审查与交付

- 审查：按 fliggy-design-gui 的审查门禁执行
- Figma：通过 HTML to Figma 插件导入，不承诺直接写 Figma 原生对象
- 交付标准：见 `figma-handoff-standard.md`

## 标准执行流程

### Phase 0：输入规范化

统一支持三类输入：

1. 语雀/在线 PRD 链接
2. 本地 PRD 文档
3. 需求摘要（缺上下文时需先补假设）

输出统一元信息：

- `requirement_id`
- `source_type`
- `delivery_target`（默认 `html-to-figma`）
- `scope`（固定 `flight-only-v1`）

### Phase 1：PRD 拆解

1. 读取 PRD
2. 执行三技能拆解（idea / ceo / uxdesign-buff）
3. 调用 `prd-recognition` 输出结构化执行单
4. 执行单必须包含：
   - 页面、模块、变更类型
   - `page_id`、`baseline_artifact`、`module_slug`
   - `delivery_target`、`review_required`、`figma_handoff`

### Phase 1.5：Google 对标映射

在进入路由前，按 `google-awesome-design-baseline.md` 完成对标映射：

1. 识别本次需求涉及的对标维度（至少三类）：
   - `styleguide_branding`
   - `color_typography`
   - `usability_review`
2. 为每个页面或模块补充：
   - `benchmark_source`（固定 `gztchan/awesome-design`）
   - `benchmark_dimensions`（数组）
   - `benchmark_notes`（说明应用方式与取舍）
3. 如与飞猪页面基线冲突，必须记录冲突与保留策略，禁止静默覆盖。

### Phase 2：页面路由

根据执行单做路由，规则见 `routing.md`：

- 命中 `vertical.flight.home`：进入 `home` 流程
- 命中 `vertical.flight.booking`：进入 `booking` 流程
- 未命中：降级到“插入现有页面模块”或“人工确认”

### Phase 3：设计生成

按路由结果逐页面或逐模块生成 HTML：

1. 读取 design foundations
2. 读取目标页面 `example-full.html` 与 `spec.md`
3. 按 `Type A / Type B / Direct Reuse` 实施
4. 产出单文件 HTML（可预览）

### Phase 4：审查与 Figma 交付

1. 执行设计审查并清 Key 问题
2. 生成交付包（HTML + 截图 + 导入说明 + 审查摘要）
3. 输出 `figma_handoff` 状态

## 输出协议（面向下游 AI）

每次执行应产出三个层级：

1. **执行计划**：页面、模块、路由和降级策略
2. **设计产物**：按页面或模块组织的 HTML 文件
3. **Figma 交付包**：遵循 `figma-handoff-standard.md`

并且上述三个层级都要包含“对标可追溯信息”：

- `benchmark_source`
- `benchmark_dimensions`
- `benchmark_notes`

## 完成判定

只有当以下条件全部满足，任务才算完成：

- 拆解执行单字段完整，可直接路由
- 设计稿已生成且通过审查门禁
- 交付包字段完整，能够直接导入 Figma
- 未覆盖页面已明确降级处理，不存在静默跳过
- Google 对标信息完整且可追溯（不是仅附参考链接）
