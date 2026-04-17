# 订单状态头部

订单详情页首个内容模块，用于展示订单当前状态、到场提醒与快捷操作。固定出现在导航栏下方。

**AI 可配置项**：修改状态标题 / 修改状态说明 / 控制是否显示箭头 / 配置 1~4 个快捷操作胶囊 / 修改胶囊文案

## 规范参数（@2x）

### 外层容器 `.status-hero`

| 属性 | 值 |
|------|------|
| 宽度 | 750px |
| 内边距 | `0 36px` |
| 布局 | `flex-direction: column` |
| 间距 | 12px |

### 状态标题行 `.status-title-row`

布局：`flex; align-items: center; gap: 12px`

| 子元素 | 字号 | 字重 | 颜色 |
|--------|------|------|------|
| `.status-title` | 42px | 500 | var(--color-darkgray) |
| `.status-arrow` | 12 x 21px | — | var(--color-darkgray) |

### 状态说明 `.status-desc`

| 属性 | 值 |
|------|------|
| 字号 | 26px |
| 字重 | 400 |
| 行高 | 140% |
| 颜色 | var(--color-darkgray) |
| 宽度 | 678px |

### 快捷操作组 `.quick-actions`

| 属性 | 值 |
|------|------|
| 宽度 | 750px |
| 内边距 | `0 24px` |
| 布局 | `display: flex; gap: 12px; overflow-x: auto;` |

#### 单个胶囊 `.quick-pill`

| 属性 | 值 |
|------|------|
| 最小宽度 | 166px |
| 高度 | 72px |
| 内边距 | `10px 30px` |
| 背景色 | var(--color-emphasis-soft) |
| 圆角 | var(--radius-pill) |
| 文字字号 | 30px |
| 文字字重 | 500 |
| 文字颜色 | var(--color-darkgray) |

完整 HTML 结构详见 [example.html](example.html)。
