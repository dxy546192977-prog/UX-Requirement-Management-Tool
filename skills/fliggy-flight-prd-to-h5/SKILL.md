---
name: fliggy-flight-prd-to-h5
version: 0.1.0
description: 飞猪机票场景前半段统一入口。基于 online-index.html 的 PRD 入口，把需求拆解成可路由执行单，并在 fliggy-flight-design-guide 设计约束下形成最终 H5。支持两条路径：基于 PRD 图文从 0 到 1 生成 H5，或对产品提供的 H5 做飞猪风格优化校准。不负责 gstack 审查和 Figma 交付。
---

# Fliggy Flight PRD to H5

## 目标

给实际工作提供一个统一入口，避免使用者手动拼接多个 skill。首期只覆盖飞猪机票场景，并把前半段稳定收敛成一件事：

`PRD / 产品输入 -> 结构化拆解 -> 页面路由 -> H5 形成`

这里的“最终产出”是 H5，本 skill 到此为止。后面的 gstack 审查和 Figma 交付是下游流程，不在本 skill 内完成。

H5 形成分为两条路径：

1. **从 0 到 1 生成**
   基于 PRD 里的图文内容和结构化执行单，生成一个符合飞猪设计约束的 H5。
2. **风格优化校准**
   针对产品已经提供的 H5，在尽量保留现有结构和信息架构的前提下，按飞猪设计约束做风格优化校准。

## 适用范围

- 适用：飞猪机票需求前期编排，尤其是从需求看板中的 PRD 条目产出 H5
- 上游入口：`online-index.html` 中的需求卡片 / `req.prd_url` / `ai_design` 生命周期
- 首期页面范围：`home`、`booking`
- 未覆盖页（如 `list`、`ota`）：按降级策略执行，见 `routing.md`
- 不适用：
  - 直接写入 Figma 原生节点
  - H5 之后的 gstack 审查
  - H5 之后的 Figma 导入交付
  - 跨行业通用方案

## 共同基线

无论走哪条路径，最终 H5 都必须遵循 `skills/fliggy-flight-design-guide` 的设计和格式约束。

### 必读约束

- 总入口：`skills/fliggy-flight-design-guide/SKILL.md`
- 格式硬约束：`skills/fliggy-flight-design-guide/references/html-and-token-standard.md`
- 页面与组件物料：`skills/fliggy-flight-design-guide/playbooks/flight-funnel/`

### 共同输出要求

- 单文件 HTML + 内联 CSS
- `<meta name="viewport" content="width=750, user-scalable=no">`
- 使用 `:root` + `var(--*)` token
- 按需读取物料，不全量扫组件目录
- 保持飞猪机票业务路径和页面骨架，不做无依据重构

### 路径差异

- **generate_from_prd**
  从 PRD 图文和结构化执行单生成 H5。
- **calibrate_provided_h5**
  以产品提供的 H5 为底稿，保留现有结构和信息架构，只做以下类型的校准：
  - token 对齐
  - 间距节奏
  - 字体与字号层级
  - 配色与品牌表达
  - 组件样式与局部层级优化

## 依赖关系

### 需求拆解

- 主拆解 skill：`skills/prd-recognition/SKILL.md`
- 强制三技能：`idea`、`ceo`、`uxdesign-buff`
- 产出：可路由执行单（不是纯描述性摘要）

### 设计生成

- 设计编排：`.agents/skills/fliggy-design-gui/SKILL.md`
- 机票垂类策略：`skills/fliggy-flight-design-guide/设计哲学.md`
- 页面真相源：`example-full.html` + `spec.md`
- 底层对标基线：`google-awesome-design-baseline.md`

### H5 交接

- 本 skill 只负责交出 H5 和审查 handoff 信息
- H5 审查应交给独立 skill：`skills/fliggy-flight-h5-to-review/SKILL.md`
- 若后续需要 Figma 交付，再进入独立的 Figma/Handoff 流程

## 标准执行流程

### Phase 0：输入规范化

优先对齐需求看板 `online-index.html` 的上游字段：

- `req.id`
- `req.prd_url`
- `req.ai_design`
- 产品补充材料（若有）
- 产品提供的 H5 附件（若有）

兼容三类输入：

1. 语雀/在线 PRD 链接
2. 本地 PRD 文档
3. 需求摘要（缺上下文时需先补假设）

输出统一元信息：

- `requirement_id`
- `source_type`
- `delivery_target`（固定 `h5-review-ready`）
- `scope`（固定 `flight-only-v1`）
- `h5_path_type`（`generate_from_prd` / `calibrate_provided_h5`）

### Phase 0.5：H5 路径判断

先判断本次 H5 应该走哪条路径。

#### 路径 A：基于 PRD 图文从 0 到 1 生成

适用条件：

- PRD 里主要给的是图文内容、原型截图、结构描述
- 没有可直接复用的产品 H5
- 需要从需求出发形成一个符合飞猪约束的新 H5

#### 路径 B：对产品提供的 H5 做风格优化校准

适用条件：

- 产品已经提供 H5 文件或稳定预览稿
- 希望保留现有结构和信息架构
- 目标是把页面校准成更符合飞猪机票设计约束的 H5

默认边界：

- 不重做核心结构
- 不改写主要业务路径
- 不把“校准”升级成“重生成一版”

### Phase 1：PRD 拆解

1. 读取 PRD
2. 执行三技能拆解（idea / ceo / uxdesign-buff）
3. 调用 `prd-recognition` 输出结构化执行单
4. 执行单必须包含：
   - 页面、模块、变更类型
   - `page_id`、`baseline_artifact`、`module_slug`
   - `delivery_target`
   - `review_required`
   - 审查 handoff 所需的上下文字段

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

### Phase 3：H5 形成

#### 路径 A：generate_from_prd

仅在 `h5_path_type = generate_from_prd` 时执行。

按路由结果逐页面或逐模块生成 H5：

1. 读取 `skills/fliggy-flight-design-guide/SKILL.md`
2. 读取 `playbooks/flight-funnel/0 Fliggy Design Skill/SKILL.md`
3. 按需读取目标页面 `example-full.html` 与 `spec.md`
4. 按 `Type A / Type B / Direct Reuse` 实施
5. 产出单文件 HTML/H5（可预览）
6. 用 `skills/fliggy-flight-design-guide/scripts/validate_design_html.py` 做基础静态校验

#### 路径 B：calibrate_provided_h5

仅在 `h5_path_type = calibrate_provided_h5` 时执行。

执行要求：

1. 先读取 `skills/fliggy-flight-design-guide/SKILL.md`
2. 再读取 `skills/fliggy-flight-design-guide/references/html-and-token-standard.md`
3. 以产品提供的 H5 为底稿
4. 保持现有结构和信息架构，只做风格优化校准
5. 输出校准后的单文件 HTML/H5
6. 同样运行基础静态校验

### Phase 3.5：形成说明

对每个 H5 明确记录：

- 走的是哪条路径
- 为什么选这条路径
- 参考了哪些飞猪约束
- 是否保留了原始 H5 结构
- 哪些地方做了优化或校准

### Phase 4：H5 交接整理

无论 H5 来自哪条路径，都要整理统一 handoff：

1. 明确 H5 路径类型
2. 输出最终文件路径
3. 标记对应页面和模块范围
4. 补齐审查重点和建议入口
5. 将 H5 交给 `skills/fliggy-flight-h5-to-review/SKILL.md`

## 输出协议（面向下游 AI / 审查 skill）

每次执行应至少产出以下结构：

1. **执行计划**
   - 页面
   - 模块
   - 路由结果
   - 降级策略
2. **H5 工件**
   - 从 PRD 生成的 H5，或
   - 校准后的产品 H5
3. **审查交接块 `review_handoff`**
   - 审查目标
   - 重点页面/模块
   - 建议入口 URL 或本地路径
   - 关键风险和重点检查项

推荐最小字段：

```json
{
  "requirement_id": "req-001",
  "delivery_target": "h5-review-ready",
  "h5_path_type": "generate_from_prd",
  "constraint_source": "skills/fliggy-flight-design-guide",
  "summary": "优化首页价格提醒入口",
  "pages": ["首页"],
  "route_result": [],
  "html_outputs": [
    {
      "page_id": "vertical.flight.home",
      "path": "outputs/flight/home-v1.html",
      "scope": "page"
    }
  ],
  "source_h5_artifacts": [],
  "review_handoff": {
    "entry_paths": ["outputs/flight/home-v1.html"],
    "focus_pages": ["首页"],
    "focus_modules": ["价格提醒入口"],
    "checks": [
      "信息层级是否清晰",
      "首屏 CTA 是否突出",
      "是否破坏飞猪首页骨架"
    ]
  }
}
```

上述层级都要包含“对标可追溯信息”：

- `benchmark_source`
- `benchmark_dimensions`
- `benchmark_notes`

## 完成判定

只有当以下条件全部满足，任务才算完成：

- 拆解执行单字段完整，可直接路由
- 已得到最终 H5（从零生成或校准后二选一）
- H5 文件可被本地浏览器打开
- 输出符合 `fliggy-flight-design-guide` 共同约束
- `review_handoff` 字段完整，可直接交给独立审查 skill
- 未覆盖页面已明确降级处理，不存在静默跳过
- Google 对标信息完整且可追溯（不是仅附参考链接）

## 边界

- 不在本 skill 内执行 gstack 审查
- 不在本 skill 内输出 Figma 导入包
- 不把“风格优化校准”误写成“重生成一版”
- 当输入是产品提供的 H5 时，默认保留现有结构和信息架构
