---
name: fliggy-flight-prd-to-h5
version: 0.2.0
description: 飞猪机票场景全链路统一入口。基于 online-index.html 的 PRD 入口，把需求拆解成可路由执行单，在 fliggy-flight-design-guide 设计约束下生成 H5，并内嵌自动 review 闭环（原 fliggy-flight-h5-to-review 逻辑）。H5 生成后自动执行审查，Key 问题清零才算完成。支持两条路径：基于 PRD 图文从 0 到 1 生成 H5，或对产品提供的 H5 做飞猪风格优化校准。Figma 交付为可选下游。
---

# Fliggy Flight PRD to H5

## 目标

给实际工作提供一个统一入口，避免使用者手动拼接多个 skill。首期只覆盖飞猪机票场景，把完整链路收敛成一件事：

`PRD / 产品输入 -> 结构化拆解 -> 页面路由 -> H5 生成（design-guide 约束内嵌）-> 自动 review（h5-to-review 逻辑内嵌）-> 修改迭代 -> Key=0 完成`

**v0.2 核心变化：**
- `fliggy-flight-design-guide` 的约束从"参考"升级为**强制内嵌**：H5 生成阶段直接执行 design-guide 的格式硬约束、审查闸门和 token 规范，不再是事后对齐。
- `fliggy-flight-h5-to-review` 的 review 逻辑从"下游独立 skill"升级为**内嵌自动 review**：H5 生成完成后立即执行 review，发现 Key 问题自动修改 H5，循环直到 Key=0，不需要人工触发下游 skill。
- Figma 交付保留为可选下游，不在本 skill 内强制执行。

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

### 设计生成（内嵌约束，不再是外部参考）

- 设计编排：`.agents/skills/fliggy-design-gui/SKILL.md`
- **强制内嵌**：`skills/fliggy-flight-design-guide/SKILL.md` — H5 生成阶段直接执行其格式硬约束、审查闸门和 token 规范
- **强制内嵌**：`skills/fliggy-flight-design-guide/references/html-and-token-standard.md` — 格式硬约束逐条执行
- 机票垂类策略：`skills/fliggy-flight-design-guide/设计哲学.md`
- 页面真相源：`example-full.html` + `spec.md`
- 底层对标基线：`google-awesome-design-baseline.md`

### H5 自动 Review（内嵌闭环，不再是下游独立 skill）

- **强制内嵌**：`skills/fliggy-flight-h5-to-review/SKILL.md` — H5 生成完成后立即执行 review，发现 Key 问题自动修改 H5，循环直到 Key=0
- 若后续需要 Figma 交付，再进入独立的 Figma/Handoff 流程（可选）

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

### Phase 3：H5 生成（内嵌 design-guide 约束，强制执行）

> **重要**：本 Phase 直接内嵌 `skills/fliggy-flight-design-guide` 的全部约束，不再是"参考"。
> 生成前必须读取 design-guide 的格式硬约束，生成过程中逐条执行，不允许事后对齐。

#### 3.0 生成前必读（每次必做，不可跳过）

按顺序读取以下文件，再开始生成：

1. `skills/fliggy-flight-design-guide/SKILL.md` — 职责、触发、步骤、输出标准
2. `skills/fliggy-flight-design-guide/references/html-and-token-standard.md` — 格式硬约束逐条执行
3. 按需读取目标页面 `example-full.html` 与 `spec.md`（不全量扫目录）

#### 3.1 design-guide 格式硬约束（生成时强制执行）

以下约束来自 `html-and-token-standard.md`，生成时必须逐条满足：

| 约束项 | 要求 |
|---|---|
| 文件形态 | 单文件 `.html`，样式仅内联 `<style>`，禁止外链 CSS |
| 视口 | `<meta name="viewport" content="width=750, user-scalable=no">` |
| Token | 颜色、圆角等使用 `var(--*)`；`:root` 中集中定义，hex **仅**出现在 `:root` |
| 布局 | 主内容纵向 flex；禁止 `position:absolute` 做纵向排版；相邻模块空白不超过 24px |
| 图片 | Unsplash 真实图 + 尺寸参数；禁止纯色大块占位 |
| 类名 | 建议 `fdl-*` 前缀 |
| 组件读取 | 入口 SKILL → 按需 README → 必要时 example；禁止全量扫目录 |
| 追溯字段 | 携带 `benchmark_source`、`benchmark_dimensions`、`benchmark_notes` |

#### 3.2 design-guide 审查闸门（生成前执行，有 blocking 不得进入生成）

按 `skills/fliggy-flight-design-guide/references/awesome-design-gates.md` 执行四维审查：

- `styleguide_branding`：token 统一命名、品牌表达一致
- `color_typography`：色彩字体规范统一、信息层级清晰
- `usability_review`：可用性风险、关键路径可理解
- `user_testing`：关键动作可发现、交付前可验证检查点

有 **blocking** 项时，回退修正执行单后重审，不得进入生成。

#### 3.3 路径 A：generate_from_prd

仅在 `h5_path_type = generate_from_prd` 时执行。

按路由结果逐页面或逐模块生成 H5：

1. 完成 3.0 必读、3.1 约束确认、3.2 闸门审查
2. 读取 `playbooks/flight-funnel/0 Fliggy Design Skill/SKILL.md`
3. 按 `Type A / Type B / Direct Reuse` 实施
4. 产出单文件 HTML/H5（可预览）
5. 用 `skills/fliggy-flight-design-guide/scripts/validate_design_html.py` 做基础静态校验

#### 3.4 路径 B：calibrate_provided_h5

仅在 `h5_path_type = calibrate_provided_h5` 时执行。

1. 完成 3.0 必读、3.1 约束确认
2. 以产品提供的 H5 为底稿，保持现有结构和信息架构
3. 只做以下类型的校准：token 对齐、间距节奏、字体与字号层级、配色与品牌表达、组件样式与局部层级优化
4. 输出校准后的单文件 HTML/H5
5. 同样运行基础静态校验

---

### Phase 3.5：内嵌自动 Review（原 h5-to-review 逻辑，强制执行）

> **重要**：H5 生成完成后，**立即**在本 skill 内执行 review，不需要人工触发下游 skill。
> review 发现 Key 问题时，**自动修改 H5**，修改完成后重新 review，循环直到 Key=0。
> 本节逻辑来自 `skills/fliggy-flight-h5-to-review/SKILL.md`，已内嵌，不再是外部依赖。

#### 3.5.1 Review 执行步骤

**Step 1：确认工件**
- 验证 H5 文件存在、路径正确、可在浏览器打开
- 确认页面不是空白页

**Step 2：浏览器取证（若 gstack 可用）**
- 打开本地文件或预览地址
- 截图首屏或整页
- 检查控制台错误
- 对关键交互元素做最小可行交互验证

**Step 3：逐项审查**

对每个 H5 页面至少检查以下 7 项：

| 审查项 | 说明 | 级别 |
|---|---|---|
| 信息架构与首屏层级 | 用户首屏能否在 3 秒内理解页面用途 | Key |
| 核心模块符合 PRD 意图 | 模块内容、位置、交互是否与 PRD 一致 | Key |
| design-guide 格式合规 | viewport、单文件、token、图片、类名等硬约束全部满足 | Key |
| 飞猪页面骨架完整 | 未破坏现有页面骨架和业务路径 | Key |
| 控制台无报错 | 无 JS 错误、资源加载失败等 | Key |
| 视觉节奏与 CTA 突出度 | 间距节奏、字体层级、主操作是否清晰 | Medium |
| AI 味 / 模板味检查 | 是否存在明显 SaaS 风、无意义装饰、与飞猪气质不符的版式 | Medium |

**Step 4：问题分级与自动修复**

- **Key（阻断）**：立即修改 H5，修改完成后重新执行 Step 3，循环直到 Key=0
- **Medium（重要）**：同轮修改；若时间不足，在报告中列为明确待办
- **Note（低风险）**：在报告中登记，允许后续优化

**Step 5：输出 Review 报告**

```markdown
# Flight H5 Review: {requirement_id}

## 审查对象
- 来源：generated / provided_attachment
- 页面：{pages}
- H5 路径：{paths}

## 审查结论
- Result: PASS | PASS_WITH_NOTES | FAIL
- Key issues: N
- Medium issues: N

## 关键发现
### 1. {问题标题}
- 严重级别：key / medium / note
- 页面：{page}
- 证据：{截图或控制台说明}
- 判断：{为什么这是问题}
- 修复动作：{已修改 / 待办}

## 建议下一步
- 若 PASS：可进入人工审查或 Figma 交付（可选）
- 若 PASS_WITH_NOTES：建议先看备注，再决定是否继续
- 若 FAIL（Key>0）：继续修改 H5，重新 review
```

#### 3.5.2 自动修复循环规则

- Key=0 才允许输出最终 review 报告，宣称"H5 完成"
- 每轮修改后必须重新执行 Step 3 的 Key 项检查
- 最多循环 3 轮；第 3 轮仍有 Key 问题时，暂停并向用户说明阻断原因，等待人工介入
- 禁止在 Key>0 时用"差不多"类措辞掩盖问题

---

### Phase 4：H5 交接整理

H5 通过 review（Key=0）后，整理统一 handoff：

1. 明确 H5 路径类型（generate_from_prd / calibrate_provided_h5）
2. 输出最终文件路径
3. 标记对应页面和模块范围
4. 附上 review 报告结论（Result、Key issues、Medium issues）
5. 补齐 benchmark 追溯字段
6. 若需要 Figma 交付，提示进入独立的 Figma/Handoff 流程（可选，不在本 skill 内强制执行）

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

所有字段都要包含"对标可追溯信息"：

- `benchmark_source`
- `benchmark_dimensions`
- `benchmark_notes`

## 完成判定

只有当以下条件**全部满足**，任务才算完成：

- 拆解执行单字段完整，可直接路由
- 已得到最终 H5（从零生成或校准后二选一）
- H5 文件可被本地浏览器打开
- H5 生成时已强制执行 `fliggy-flight-design-guide` 格式硬约束（不是事后对齐）
- 内嵌 review 已执行，`inline_review.key_issues = 0`（Key 问题清零）
- 未覆盖页面已明确降级处理，不存在静默跳过
- Google 对标信息完整且可追溯（不是仅附参考链接）

**不再要求**：`review_handoff` 字段完整可交给独立审查 skill（已内嵌，不需要外部 skill）

## 边界

- 不在本 skill 内输出 Figma 导入包（Figma 交付为可选下游）
- 不把"风格优化校准"误写成"重生成一版"
- 当输入是产品提供的 H5 时，默认保留现有结构和信息架构
- 内嵌 review 最多循环 3 轮；第 3 轮仍有 Key 问题时，暂停等待人工介入，不得静默跳过
