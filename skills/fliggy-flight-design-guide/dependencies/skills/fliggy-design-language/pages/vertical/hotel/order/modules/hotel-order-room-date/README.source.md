# 房型日期信息

房型预订详情展示，包含房型名称、规格、入离日期、早餐信息。

## 视觉效果

- **布局**：通栏白色卡片
- **早餐卡片**：灰色背景 `var(--color-label)`

## 结构规范

### 通栏容器 `.room-date-wrapper`

| 属性 | 值 |
|------|-----|
| 宽度 | `750px`（通栏） |
| 左偏移 | `margin-left: -24px` |
| 背景 | `var(--color-white)` |
| 内边距 | `padding: 24px 30px` |
| 上间距 | `margin-top: 24px` |

### 房型头部 `.room-header`

| 属性 | 值 |
|------|-----|
| 布局 | `display: flex; justify-content: space-between; align-items: flex-start` |

### 房型名称 `.room-name`

| 属性 | 值 |
|------|-----|
| 字号 | `30px` |
| 字重 | `500` |
| 颜色 | `var(--color-darkgray)` |
| 行高 | `1.4` |

### 房型详情链接 `.room-detail-link`

| 属性 | 值 |
|------|-----|
| 字号 | `24px` |
| 颜色 | `var(--color-indigo-1)` #6666ff |
| 间距 | `gap: 6px` |
| 防缩 | `flex-shrink: 0` |

### 房型规格 `.room-specs`

| 属性 | 值 |
|------|-----|
| 字号 | `24px` |
| 颜色 | `var(--color-lightgray)` |
| 上间距 | `margin: 12px 0 0 0` |

### 日期行 `.date-row`

| 属性 | 值 |
|------|-----|
| 布局 | `display: flex; align-items: center` |
| 上间距 | `margin-top: 24px` |

### 日期项 `.date-item`

| 属性 | 值 |
|------|-----|
| 布局 | `flex: 1; display: flex; align-items: baseline` |
| 间距 | `gap: 8px` |

### 日期文字 `.date-text`

| 属性 | 值 |
|------|-----|
| 字号 | `28px` |
| 字重 | `500` |
| 颜色 | `var(--color-darkgray)` |

### 时间文字 `.time-text`

| 属性 | 值 |
|------|-----|
| 字号 | `28px` |
| 颜色 | `var(--color-lightgray)` |

### 早餐卡片 `.breakfast-card`

| 属性 | 值 |
|------|-----|
| 背景 | `var(--color-label)` #F7F8FA |
| 圆角 | `var(--radius-l)` 6px |
| 内边距 | `padding: 24px` |
| 上间距 | `margin-top: 24px` |

### 早餐行 `.breakfast-row`

| 属性 | 值 |
|------|-----|
| 布局 | `display: flex` |
| 间距 | `gap: 24px` |
| 字号 | `26px` |
| 颜色 | `var(--color-darkgray)` |
| 下间距 | `margin-bottom: 12px`（最后一行为0） |

### 早餐标签 `.breakfast-label`

| 属性 | 值 |
|------|-----|
| 颜色 | `var(--color-lightgray)` |
| 宽度 | `100px` |
| 防缩 | `flex-shrink: 0` |

## 关键约束

1. **通栏布局**：`width: 750px; margin-left: -24px`
2. **日期行内布局**：入住/离店在同一行均分显示
3. **早餐卡片**：灰色背景，固定内边距
