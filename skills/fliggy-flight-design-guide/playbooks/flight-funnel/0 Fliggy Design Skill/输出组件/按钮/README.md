# 按钮组件

AI 回复中的操作按钮，包含 4 个视觉层级：强（Primary）、中（Secondary）、弱（Tertiary）、失效（Disabled）。这是一个**固定组件**，AI 根据场景选择合适的按钮层级并填充文本。

## 规范参数（@2x）

### 基础样式（所有层级共享）

| 属性 | 值 |
|------|------|
| 高度 | 80px |
| 内边距 | 20px 32px |
| 圆角 | var(--radius-l) |
| 字号 | 26px |
| 字重 | 500 (Medium) |
| 行高 | 1.4 (140%) |
| 布局 | `inline-flex; justify-content: center; align-items: center;` |
| 图标间距 | 8px (`gap: 8px`) |

### 层级=强 Primary `.btn-primary`

背景: var(--color-indigo-1); 文字: var(--color-white); Hover: #5555EE

### 层级=中 Secondary `.btn-secondary`

背景: var(--color-indigo-4); 文字: var(--color-indigo-1); Hover: #DDDDFF

### 层级=弱 Tertiary `.btn-tertiary`

背景: var(--color-bg); 文字: var(--color-darkgray); Hover: #E5E6E8

### 层级=失效 Disabled `.btn:disabled`

背景: var(--color-bg); 文字: var(--color-darkgray); 透明度: 0.4; `cursor: not-allowed`

图标支持: 预留 32x32px 图标位（`.btn-icon`），默认 `display: none`，启用时设为 `display: inline-flex`。完整结构详见 [example.html](example.html)。
