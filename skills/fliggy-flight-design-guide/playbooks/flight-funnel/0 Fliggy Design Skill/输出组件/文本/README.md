# 文本组件

AI 回复中的 Markdown 文本排版组件，定义了标题（H1/H2/H3）和正文段落的样式规范。规范化自由组合类组件。

**文本内容直接平铺在页面背景（var(--color-label)）上，禁止包裹在白底卡片容器中。**

## 规范参数（@2x）

### 内容容器 `.article-content`

宽度: 690px | 背景: 透明（继承页面 var(--color-label)，不使用白色背景）

### H1 主标题

| 属性 | 值 |
|------|------|
| 字号 | 42px |
| 字重 | 500 (Medium) |
| 行高 | 1.4 |
| 颜色 | var(--color-darkgray) |
| margin-top | 0（作为首个元素时） |

### H2 副标题

| 属性 | 值 |
|------|------|
| 字号 | 36px |
| 字重 | 500 (Medium) |
| 行高 | 1.4 |
| 颜色 | var(--color-darkgray) |
| margin-top | **42px** |

### H3 小节标题

| 属性 | 值 |
|------|------|
| 字号 | 30px |
| 字重 | 500 (Medium) |
| 行高 | 1.4 |
| 颜色 | var(--color-darkgray) |
| margin-top | **24px** |

### 正文段落 `<p>`

| 属性 | 值 |
|------|------|
| 字号 | 30px |
| 字重 | 400 (Regular) |
| 行高 | 1.7 |
| 颜色 | var(--color-darkgray) |
| margin-top | **24px** |

完整 HTML 示例详见 [example.html](example.html)。
