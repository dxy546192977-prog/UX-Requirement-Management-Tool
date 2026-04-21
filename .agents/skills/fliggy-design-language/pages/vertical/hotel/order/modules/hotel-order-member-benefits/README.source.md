# 会员权益模块

会员等级和权益展示，包含会员徽章、权益列表、优惠券信息。

## 视觉效果

- **布局**：通栏白色卡片
- **会员徽章**：右上角定位，米色背景 `#FDEBD7`
- **操作按钮**：黄色背景 `#FFE566`

## 结构规范

### 通栏容器 `.benefits-wrapper`

| 属性 | 值 |
|------|-----|
| 宽度 | `750px`（通栏） |
| 左偏移 | `margin-left: -24px` |
| 背景 | `var(--color-white)` |
| 内边距 | `padding: 24px 30px` |
| 上间距 | `margin-top: 24px` |
| 定位 | `position: relative` |

### 会员徽章 `.member-badge`

| 属性 | 值 |
|------|-----|
| 定位 | `position: absolute; top: 0; right: 0` |
| 背景 | `#FDEBD7` |
| 圆角 | `0 var(--radius-l) 0 12px` |
| 内边距 | `8px 16px` |
| 字号 | `22px` |
| 字重 | `500` |
| 颜色 | `#8D735A` |

### 权益标题 `.benefit-title`

| 属性 | 值 |
|------|-----|
| 字号 | `32px` |
| 字重 | `500` |
| 颜色 | `var(--color-darkgray)` |
| 下间距 | `margin: 0 0 18px 0` |

### 权益项 `.benefit-item`

| 属性 | 值 |
|------|-----|
| 布局 | `display: flex; justify-content: space-between; align-items: center` |
| 内边距 | `padding: 18px 0` |

### 权益标签 `.benefit-label`

| 属性 | 值 |
|------|-----|
| 字号 | `24px` |
| 颜色 | `var(--color-lightgray)` |

### 权益值 `.benefit-value`

| 属性 | 值 |
|------|-----|
| 字号 | `24px` |
| 颜色 | `var(--color-darkgray)` |

### 操作按钮 `.benefit-action`

| 属性 | 值 |
|------|-----|
| 背景 | `#FFE566`（黄色） |
| 圆角 | `32px`（胶囊） |
| 内边距 | `12px 24px` |
| 字号 | `24px` |
| 颜色 | `var(--color-darkgray)` |
| 边框 | `none` |

### 禁用按钮 `.benefit-action.disabled`

| 属性 | 值 |
|------|-----|
| 背景 | `transparent` |
| 颜色 | `var(--color-lightgray)` |
| 边框 | `1px solid var(--color-lightgray)` |

### 权益卡片 `.benefit-card`

| 属性 | 值 |
|------|-----|
| 背景 | `var(--color-label)` |
| 圆角 | `var(--radius-l)` 6px |
| 内边距 | `padding: 24px` |
| 布局 | `display: flex; justify-content: space-between; align-items: center` |
| 上间距 | `margin-top: 12px` |

### 分隔线 `.section-divider`

| 属性 | 值 |
|------|-----|
| 边框 | `none` |
| 边距 | `margin: 24px 0` |

### 优惠券卡片 `.coupon-card`

| 属性 | 值 |
|------|-----|
| 背景 | `var(--color-label)` |
| 圆角 | `var(--radius-l)` 6px |
| 内边距 | `padding: 24px` |
| 上间距 | `margin-top: 12px` |

### 展开按钮 `.expand-btn`

| 属性 | 值 |
|------|-----|
| 布局 | `display: flex; justify-content: center; align-items: center` |
| 间距 | `gap: 8px` |
| 上间距 | `margin-top: 18px` |
| 字号 | `24px` |
| 颜色 | `var(--color-indigo-1)` |
| 背景 | `none` |
| 边框 | `none` |
| 宽度 | `100%` |

## 关键约束

1. **通栏布局**：`width: 750px; margin-left: -24px`
2. **会员徽章定位**：右上角 `position: absolute`
3. **操作按钮黄色**：`background: #FFE566`
4. **胶囊按钮**：`border-radius: 32px`
