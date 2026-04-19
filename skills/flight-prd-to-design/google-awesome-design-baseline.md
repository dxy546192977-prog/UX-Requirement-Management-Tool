# Google Awesome Design 对标基线（V1）

## 目标

将 [gztchan/awesome-design](https://github.com/gztchan/awesome-design) 作为外部参考源，引入到飞猪机票 skill 链路中，但不直接照搬其资源清单。  
本基线只提炼可执行的方法层约束，用于提升设计交付质量和可追溯性。

## 参考原则

- awesome-design 是“资源索引库”，不是单一设计规范，不能作为直接 UI token 源。
- 对标重点放在方法论维度：设计系统、品牌一致性、可访问性、用户测试与交付完整性。
- 业务语义优先：若外部参考与飞猪业务约束冲突，优先满足飞猪机票场景可执行性。

## 对标范围（从 awesome-design 抽取）

### 1) Styleguide and Branding

用于约束以下输出：

- 设计 token 是否统一命名并可复用
- 模块/页面是否遵循一致的品牌表达
- 交付文档是否具备清晰的设计决策说明

### 2) Color + Typography

用于约束以下输出：

- 色彩与字体规范是否统一，并在全链路保持一致
- 关键信息层级是否清晰（标题、正文、辅助信息）
- 设计稿与交付包是否存在“样式漂移”

### 3) User Testing

用于约束以下输出：

- 审查结论是否只停留在视觉层，还是覆盖可用性风险
- 交付前是否给出可验证的检查点（例如关键路径可理解、关键动作可发现）

### 4) Prototyping / Toolkit

用于约束以下输出：

- 产物是否可在工具链中无歧义流转（HTML -> Figma）
- 导入指南是否可执行，是否包含必要的路径和步骤

## 三层映射规则

`Google awesome-design -> 项目 DESIGN.md -> 飞猪机票技能链路`

- 外部参考层：提供“行业通用方法集合”
- 项目设计层：`docs/DESIGN.md` 提供本项目视觉与交互约束
- 业务执行层：`prd-recognition`、`flight-prd-to-design`、`fliggy-flight-design-skill` 产出可执行设计交付

## 输出侧强制字段（新增）

每次执行文档与交付包必须包含：

- `benchmark_source`: 固定为 `gztchan/awesome-design`
- `benchmark_dimensions`: 至少包含 `styleguide_branding`、`color_typography`、`usability_review`
- `benchmark_notes`: 说明本次如何应用外部参考（不是贴链接）

## 冲突处理策略

当外部参考建议与飞猪页面基线冲突时：

1. 保留页面信息架构与业务流程（不改核心路径）
2. 仅在模块样式、信息层级、文案结构上做增强
3. 在 `benchmark_notes` 中记录“冲突点 + 取舍理由”

## 最小验收

- 输出文档可明确看出“参考了什么、应用了什么、放弃了什么”
- `figma_handoff` 保持可导入、可审查、可追溯
- 不出现“引用了外部资源但无法落到当前页面”的空洞结论
