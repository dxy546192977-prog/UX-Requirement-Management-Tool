# 输入标准

这份文件只负责 intake 精度和升级策略。报告、HTML 与 sidecar 的输出规则在别的文件里定义。

---

## 快速开始（给设计师）

如何给我一个 Figma 链接：

1. 在 Figma 中打开你想评审的画板
2. 右键点击画板
3. 选择 **Copy link to selection**
4. 把链接粘贴给我

就这样。不需要额外准备任何东西。

---

## 推荐的 Figma 输入

做 Figma 审核时，最理想的输入是已经带上 `fileKey` 和 `node-id` 的 board 或 frame URL。

可接受的输入示例：

- 一个明确指向某条旅程图或某块 review board 的 board URL
- 一个明确指向单个页面、弹窗或状态的 frame URL
- 一个 frame URL，再加 PRD 或补充说明

设计师不需要一开始就给每个页面都贴一个链接。一个 board 或 frame URL 就足够开始 intake。

## 常见输入问题和解决办法

| 问题 | 原因 | 解决办法 |
|------|------|----------|
| 「链接指向整个文件」 | 复制时没有选中具体画板 | 在 Figma 左侧面板选中画板，再右键 -> Copy link to selection |
| 「链接格式不对」 | 可能复制了浏览器地址栏的 URL | 改用右键 -> Copy link to selection |
| 「访问不了这个文件」 | 文件权限设置为私有 | 在 Figma 文件设置里把链接权限改成 "Anyone with the link can view" |
| 「这是一个很大的 board」 | board 包含很多页面 | 正常，我会自动拆分成多个 review unit |

## 尽量避免

- 明明只想审一个 board，却给整页或整文件
- 已经有可用 Figma 链接时，还用截图替代

## 精度要求

`UXdesign-buff` 应该：

- 以 intake board 或 frame 作为根节点
- 自动把大 board 拆成 screen-level review units
- 对每个 review unit 用 `get_design_context` 精读，再用 `get_screenshot` 交叉确认
- 只有当该 unit 已经被完整读过，才宣称高精度

`UXdesign-buff` 不应该：

- 把一张巨大的 board 截图假装成精确的 screen read
- board 太大时悄悄退化成模糊点评
- 在自己尝试自动拆分前，就让设计师先补十几个 URL

## 输入容错行为

`UXdesign-buff` 会尽量包容不完美的输入：

- **文件级 URL（没有 `node-id`）**：不直接报错。用 MCP 读取文件结构，列出顶层 frame 让用户选择，或让用户确认要评审的范围。
- **多个 URL**：支持批量 intake，按顺序处理或询问优先级。
- **URL 解析失败**：给出清晰的错误原因和修复指引，而不是报一个技术错误码。

## 升级与兜底

如果 Figma MCP 不可用，或重复出现工具边界导致精度受阻：

- 继续使用当前能拿到的最佳可见证据
- 明确写出被卡住的细节
- 微观细节问题下调置信度
- 只有在自动拆分路径彻底走不通时，才要求补更窄的材料
