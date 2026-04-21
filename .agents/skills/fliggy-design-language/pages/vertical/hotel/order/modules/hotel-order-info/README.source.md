# 订单信息模块

订单基础信息展示，包含订单号、卖家信息等。

## 视觉效果

- **布局**：通栏白色卡片
- **行高**：固定 `96px`

## 结构规范

### 通栏容器 `.order-info-wrapper`

| 属性 | 值 |
|------|-----|
| 宽度 | `750px`（通栏） |
| 左偏移 | `margin-left: -24px` |
| 背景 | `var(--color-white)` |
| 内边距 | `padding: 0 30px`（上下为0） |
| 上间距 | `margin-top: 24px` |

### 信息行 `.order-row`

| 属性 | 值 |
|------|-----|
| 布局 | `display: flex; justify-content: space-between; align-items: center` |
| 高度 | `96px`（固定行高） |
| 内边距 | `0` |
| 底部边框 | `1px solid var(--color-bg)`（最后一行无） |

### 行标签 `.row-label`

| 属性 | 值 |
|------|-----|
| 字号 | `24px` |
| 颜色 | `var(--color-lightgray)` |

### 行内容 `.row-content`

| 属性 | 值 |
|------|-----|
| 布局 | `display: flex; align-items: center` |
| 间距 | `gap: 12px` |

### 行值 `.row-value`

| 属性 | 值 |
|------|-----|
| 字号 | `24px` |
| 颜色 | `var(--color-darkgray)` |

### 复制按钮 `.copy-btn`

| 属性 | 值 |
|------|-----|
| 字号 | `24px` |
| 颜色 | `var(--color-indigo-1)` |
| 背景 | `transparent` |
| 边框 | `none` |
| 内边距 | `0` |

### 旺旺图标 `.wangwang-icon`

| 属性 | 值 |
|------|-----|
| 尺寸 | `32px × 32px` |

## 关键约束

1. **通栏布局**：`width: 750px; margin-left: -24px`
2. **固定行高**：`96px`
3. **上下内边距为0**：`padding: 0 30px`，行高撑起高度
4. **复制按钮**：无背景无边框的文字按钮
