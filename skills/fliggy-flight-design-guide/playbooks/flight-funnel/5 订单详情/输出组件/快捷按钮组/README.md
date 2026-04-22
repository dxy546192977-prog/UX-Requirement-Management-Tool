# 快捷按钮组

对应设计稿 `1-4 按钮`，位于订单状态下方、履约卡上方。用于承接退改签、选座、行李额、产品说明等高频入口。

**AI 可配置项**：配置 1~4 个按钮 / 修改按钮文案 / 控制按钮数量 / 控制是否横向滚动

## 规范参数（@2x）

### 容器 `.quick-action-strip`

| 属性 | 值 |
|------|------|
| 宽度 | 750px |
| 高度 | 72px |
| 内边距 | `0 24px` |
| 布局 | `display: flex; gap: 12px; overflow-x: auto;` |

### 单按钮 `.quick-action-pill`

| 属性 | 值 |
|------|------|
| 宽度 | 166px |
| 高度 | 72px |
| 内边距 | `10px 23px` 左右可按文案微调 |
| 背景色 | var(--color-emphasis-soft) |
| 圆角 | 42px |
| 文案字号 | 30px |
| 文案字重 | 500 |
| 文案颜色 | var(--color-darkgray) |

完整 HTML 结构详见 [example.html](example.html)。
