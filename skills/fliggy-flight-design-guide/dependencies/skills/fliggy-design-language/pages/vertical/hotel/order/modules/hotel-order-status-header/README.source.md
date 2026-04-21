# 订单状态头部

订单详情页顶部状态展示模块，包含状态标题、描述文案、操作按钮组。

## 视觉效果

- **背景**：透明（依托黄色头部背景 `#FFE566`）
- **布局**：无通栏，跟随页面 `padding: 0 24px`

## 结构规范

### 容器 `.order-status-wrapper`

| 属性 | 值 |
|------|-----|
| padding-top | `30px` |
| padding-bottom | `0` |

### 状态标题行 `.status-title`

| 属性 | 值 |
|------|-----|
| 布局 | `display: flex; align-items: center` |
| 间距 | `gap: 8px` |

### 状态文字 `.status-text`

| 属性 | 值 |
|------|-----|
| 字号 | `42px` |
| 字重 | `500` |
| 颜色 | `var(--color-darkgray)` #0f131a |

### 状态箭头 `.status-arrow`

| 属性 | 值 |
|------|-----|
| 尺寸 | `24px × 24px` |
| 防变形 | `object-fit: contain` |

### 状态描述 `.status-desc`

| 属性 | 值 |
|------|-----|
| 字号 | `28px` |
| 字重 | `400` |
| 颜色 | `var(--color-midgray)` #5c5f66 |
| 行高 | `1.4` |
| 上间距 | `margin-top: 24px` |

### 操作按钮组 `.action-btn-group`

| 属性 | 值 |
|------|-----|
| 布局 | `display: flex` |
| 间距 | `gap: 18px` |
| 上间距 | `margin-top: 30px` |

### 操作按钮 `.action-btn`

| 属性 | 值 |
|------|-----|
| 宽度 | `flex: 1`（均分） |
| 高度 | `64px` |
| 内边距 | `0` |
| 背景 | `var(--color-white)` |
| 边框 | `none`（无描边） |
| 圆角 | `32px`（胶囊） |
| 字号 | `26px` |
| 字重 | `400` |
| 颜色 | `var(--color-darkgray)` |
| 文字不换行 | `white-space: nowrap` |

## 关键约束

1. **按钮均分**：使用 `flex: 1` 让所有按钮等宽
2. **无边框**：`border: none` 去除描边
3. **胶囊圆角**：`border-radius: 32px` = 高度的一半
4. **按钮间距**：固定 `gap: 18px`
5. **图标防变形**：所有图标 `object-fit: contain`
