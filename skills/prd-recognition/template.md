# AI 设计执行文档：{需求名称}

> 需求 ID：{id}
> 生成时间：{datetime}
> PRD 链接：{url}
> 识别 Skill：prd-recognition
> 下游设计 Skill：fliggy-design-gui

## 使用方式

将下方任一页面或模块片段直接发给 AI，要求其基于 `fliggy-design-gui` 输出设计稿方案。
如果只想先做部分页面，可以按页面维度分开发送。

## 需求摘要

{summary}

## 涉及页面

- {page_1}
- {page_2}

---

## 页面 1：{page_name}

> 基线页面：{page_baseline}

### 模块 1：{module_name}

- 变更类型：{新建|改现有|直接复用}
- 执行类型：{Type A|Type B|Direct Reuse}
- 设计意图：{intent}
- 备注：{notes}

#### 可直接发给 AI 的执行指令

请使用 `fliggy-design-gui` 能力处理该模块。
按 `{Type A|Type B|Direct Reuse}` 的方式执行。
优先沿用现有页面骨架，不要脱离当前页面的信息架构重做。
本模块核心目标：{intent}
额外约束：{notes}

### 模块 2：{module_name}

- 变更类型：{新建|改现有|直接复用}
- 执行类型：{Type A|Type B|Direct Reuse}
- 设计意图：{intent}
- 备注：{notes}

#### 可直接发给 AI 的执行指令

请使用 `fliggy-design-gui` 能力处理该模块。
按 `{Type A|Type B|Direct Reuse}` 的方式执行。
优先沿用现有页面骨架，不要脱离当前页面的信息架构重做。
本模块核心目标：{intent}
额外约束：{notes}

---

## 给 AI 的统一要求

- 使用 `fliggy-design-gui` 进行页面或模块设计。
- 优先复用现有页面骨架，不要脱离当前信息架构从零发散。
- 对于 `modify` 类型模块，按改现有模块的方式产出。
- 对于 `create` 类型模块，按在现有页面插入新模块的方式产出。
- 对于 `reuse` 类型模块，只需在整体方案中保留并说明原因。
- 如果信息不足，请先列出假设，再继续产出设计稿。
