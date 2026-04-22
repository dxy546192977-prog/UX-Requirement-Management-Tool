# 表格组件

AI 回复中的 Markdown 表格，使用原生 `<table>` 标签渲染，适用于航班对比、价格对比、酒店参数对比等场景。规范化自由组合类组件。

表格包裹在白色圆角容器中（文本平铺规则的例外——表格需白底保证可读性）。

## 规范参数（@2x）

### 表格容器 `.table-wrapper`

| 属性 | 值 |
|------|------|
| 宽度 | 690px |
| margin-top | **24px** |
| 圆角 | **var(--radius-xl)** |
| 背景色 | var(--color-white) |
| 溢出 | `overflow: hidden` |
| 水平滚动 | `overflow-x: auto` |

### 表头 `<thead>`

| 属性 | 值 |
|------|------|
| 背景色 | var(--color-bg) |
| 字号 | 26px |
| 字重 | 500 (Medium) |
| 颜色 | var(--color-darkgray) |
| 单元格内边距 | 24px |
| 文本对齐 | 左对齐 |

### 表体 `<tbody>`

| 属性 | 值 |
|------|------|
| 背景色 | var(--color-white) |
| 字号 | 26px |
| 字重 | 400 (Regular) |
| 颜色 | var(--color-darkgray) |
| 单元格内边距 | 24px |
| 行分割线 | `1px solid var(--color-bg)` |
| 最后一行 | 无底部分割线 |

完整 HTML 示例详见 [example.html](example.html)。
