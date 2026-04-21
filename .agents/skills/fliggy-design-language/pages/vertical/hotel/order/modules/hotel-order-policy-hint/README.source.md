# 政策提示模块

订单相关政策提示列表，显示取消政策、入住须知等信息。与价格模块在同一通栏卡片内。

## 视觉效果

- **位置**：在价格信息模块下方，同一卡片内
- **分隔线**：与价格模块之间有 `1px` 分隔线

## 结构规范

### 分隔线 `.module-divider`

| 属性 | 值 |
|------|-----|
| 高度 | `1px` |
| 背景 | `var(--color-bg)` #f2f3f5 |
| 边距 | `margin: 0 30px` |

### 容器 `.policy-wrapper`

| 属性 | 值 |
|------|-----|
| 内边距 | `padding: 0 30px 0` |

### 政策行 `.policy-item`

| 属性 | 值 |
|------|-----|
| 布局 | `display: flex; align-items: center` |
| 间距 | `gap: 12px` |
| 高度 | `96px`（固定行高） |
| 内边距 | `padding: 0 24px` |
| 边距调整 | `margin: 0 -24px` |
| 底部边框 | `1px solid var(--color-bg)` |

### 政策图标 `.policy-icon`

| 属性 | 值 |
|------|-----|
| 尺寸 | `32px × 32px` |
| 防缩 | `flex-shrink: 0` |

### 政策内容 `.policy-content`

| 属性 | 值 |
|------|-----|
| 布局 | `flex: 1; display: flex; justify-content: space-between; align-items: center` |
| 间距 | `gap: 12px` |

### 政策文字 `.policy-text`

| 属性 | 值 |
|------|-----|
| 字号 | `26px` |
| 字重 | `400` |
| 颜色 | `var(--color-darkgray)` |
| 行高 | `1.4` |
| 单行省略 | `white-space: nowrap; overflow: hidden; text-overflow: ellipsis` |

### 高亮文字 `.highlight`

| 属性 | 值 |
|------|-----|
| 颜色 | `var(--color-pay-1)` #ff5533 |

### 政策标题 `.policy-title`

| 属性 | 值 |
|------|-----|
| 字号 | `26px` |
| 字重 | `400` |
| 单行省略 | `white-space: nowrap; overflow: hidden; text-overflow: ellipsis` |

#### 标题颜色变体

| class | 颜色 | 用途 |
|-------|------|------|
| `.warning` | `var(--color-pay-1)` | 警告信息 |
| `.normal` | `var(--color-midgray)` | 普通信息 |

### 箭头图标 `.policy-arrow`

| 属性 | 值 |
|------|-----|
| 尺寸 | `16px × 16px` |
| 防缩 | `flex-shrink: 0` |
| 防变形 | `object-fit: contain` |

## 关键约束

1. **固定行高**：每行 `96px`
2. **文字省略**：长文字单行截断显示
3. **高亮颜色**：重要信息用 `var(--color-pay-1)` 橙红色
