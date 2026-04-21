# Dependencies 调用指南（给 AI 执行时使用）

本目录用于 `fliggy-flight-design-guide` 的本地依赖编排。  
目标：让 AI 在不同页面类型下，稳定选择正确的 skill，避免混用规则冲突。

## 依赖清单

- `skills/fliggy-flight-design-guide/dependencies/skills/fliggy-design-system/`
  - 定位：飞猪移动端通用设计系统（方法论和页面设计原则）
- `skills/fliggy-flight-design-guide/dependencies/skills/fliggy-design-language/`
  - 定位：FDL，飞猪常规 App 页面编排（manifest/page_id 驱动）
- `skills/fliggy-flight-design-guide/dependencies/skills/fliggy-design-skill/`
  - 定位：对话式 AI 页面（消息流 + 卡片）规范

## 一句话分流

- 做常规 App 页面（频道/列表/详情/下单）：优先 `fliggy-design-language`
- 做对话式 AI 页面（聊天流/问答流/AI 卡片流）：优先 `fliggy-design-skill`
- 需求模糊、先收敛设计方向：先 `fliggy-design-system`，再切到上面两者之一落地

## 推荐调用顺序

### 场景 A：常规 App 页面

1. 先读：`fliggy-design-language/SKILL.md`
2. 按其规则先读 `foundations/design-foundations.md`
3. 明确 `page_id` 后，读对应 `page-frame.md` + `manifest.md`
4. 仅按 manifest 命中的组件 `spec.md` 继续读取
5. 输出单文件 HTML + 内联 CSS

### 场景 B：对话式 AI 页面

1. 先读：`fliggy-design-skill/SKILL.md`
2. 按需读取相关组件 `README.md`
3. 仅在结构不明确时再读 `example.html`
4. 输出单文件 HTML + 内联 CSS

### 场景 C：先定风格，再落地

1. 先读：`fliggy-design-system/SKILL.md`（明确骨架、层级、状态策略）
2. 判断落地类型：
   - 常规页 -> 切 `fliggy-design-language`
   - 对话页 -> 切 `fliggy-design-skill`

## 强约束（必须遵守）

1. `fliggy-design-language` 与 `fliggy-design-skill` 的 token 体系禁止同页混用。  
2. 任何任务都禁止“全量通读所有组件”；只读命中路径。  
3. 常规页不要套对话页消息流骨架；对话页不要套常规频道页骨架。  
4. 生成代码默认单文件 HTML + 内联 CSS（除非任务明确要求其他形式）。  

## 决策表（执行前 10 秒判断）

- 用户提到：频道、列表、详情、下单、订单填写 -> `fliggy-design-language`
- 用户提到：AI 助手、问答、聊天、IM、消息流 -> `fliggy-design-skill`
- 用户只说“做个飞猪风格页面”但没说类型 -> 先 `fliggy-design-system` 收敛再选

## 给 AI 的可复用提示词模板

### 模板 1：常规页（FDL）

请使用 `skills/fliggy-flight-design-guide/dependencies/skills/fliggy-design-language/SKILL.md`。  
这是常规 App 页面任务，请按 FDL 读取顺序执行：先 foundations，再 page-frame/manifest，再命中组件 spec。  
禁止读取未命中文件，输出单文件 HTML + 内联 CSS。

### 模板 2：对话式 AI 页

请使用 `skills/fliggy-flight-design-guide/dependencies/skills/fliggy-design-skill/SKILL.md`。  
这是对话式 AI 页面任务，请先做需求分析，再按需读取组件 README。  
仅在结构不明确时读取 example.html，输出单文件 HTML + 内联 CSS。

### 模板 3：先收敛后落地

先读取 `skills/fliggy-flight-design-guide/dependencies/skills/fliggy-design-system/SKILL.md`，  
给出页面骨架和状态策略。随后判断页面类型：  
- 常规页：切换到 `fliggy-design-language` 落地  
- 对话页：切换到 `fliggy-design-skill` 落地  
最终输出单文件 HTML + 内联 CSS。
