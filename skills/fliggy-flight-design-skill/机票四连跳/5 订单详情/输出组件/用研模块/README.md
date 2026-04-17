# 用研模块

对应设计稿 `5 用研`。这是一个独立的支持模块，不等于常见问题。用于承接用户调研引导、问题入口提示和数字型快捷问答条。

**AI 可配置项**：修改标题 / 修改左右两枚引导标签 / 配置数字范围 / 控制数字条是否显示 0~9 或 0~10

## 规范参数（@2x）

### 外层容器 `.research-block`

| 属性 | 值 |
|------|------|
| 宽度 | 750px |
| 参考高度 | 256px |
| 底部内边距 | 36px |
| 背景 | var(--color-white) |

### 渐变标题头 `.research-head`

| 属性 | 值 |
|------|------|
| 高度 | 92px |
| 内边距 | `36px 24px 24px` |
| 背景 | `linear-gradient(180deg, #FFFDF2 0%, #FFFFFF 108.15%)` |
| 标题字号 | 28px / 500 / var(--color-darkgray) |

### 引导标签行 `.research-intros`

| 属性 | 值 |
|------|------|
| 布局 | `display: flex; justify-content: space-between;` |
| 内边距 | `0 24px 24px` |
| 图标尺寸 | 32 x 32px |
| 文案字号 | 26px |
| 文案颜色 | var(--color-lightgray) |

### 数字快捷条 `.digit-strip`

| 属性 | 值 |
|------|------|
| 宽度 | 702px |
| 高度 | 72px |
| 内边距 | `10px 20px` |
| 背景色 | #FFF8CC |
| 圆角 | `36px 2px 36px 36px` |

#### 数字泡 `.digit-bubble`

| 属性 | 值 |
|------|------|
| 尺寸 | 52 x 52px |
| 背景色 | var(--color-white) |
| 边框 | `1px solid #FFE033` |
| 文字字号 | 26px / 700 |
| 文字颜色 | `#B29A00` |

完整 HTML 结构详见 [example.html](example.html)。
