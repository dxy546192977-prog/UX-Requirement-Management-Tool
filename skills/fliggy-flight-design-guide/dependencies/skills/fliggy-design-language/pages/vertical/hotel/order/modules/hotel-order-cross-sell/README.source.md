# 交叉销售模块

底部悬浮的交叉销售引导卡片，推荐关联产品。

## 视觉效果

- **定位**：固定定位，悬浮在底部操作栏上方
- **卡片**：白色背景带阴影

## 结构规范

### 悬浮容器 `.cross-sell-wrapper`

| 属性 | 值 |
|------|-----|
| 定位 | `position: fixed` |
| 底部 | `bottom: 134px`（底部操作栏高度100+安全区34） |
| 左侧 | `left: 0` |
| 宽度 | `750px` |
| 背景 | `transparent` |
| 内边距 | `padding: 24px 30px` |
| 层级 | `z-index: 998` |

### 卡片 `.cross-sell-card`

| 属性 | 值 |
|------|-----|
| 背景 | `var(--color-white)` |
| 圆角 | `var(--radius-l)` 6px |
| 内边距 | `padding: 24px` |
| 布局 | `display: flex; justify-content: space-between; align-items: center` |
| 阴影 | `box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06)` |

### 关闭按钮 `.close-btn`

| 属性 | 值 |
|------|-----|
| 定位 | `position: absolute; top: 24px; left: 30px` |
| 尺寸 | `24px × 24px` |
| 背景 | `none` |
| 边框 | `none` |
| 颜色 | `var(--color-lightgray)` |
| 层级 | `z-index: 1` |

### 内容区 `.cross-sell-content`

| 属性 | 值 |
|------|-----|
| 布局 | `display: flex; justify-content: space-between; align-items: center` |
| 扩展 | `flex: 1` |
| 左边距 | `margin-left: 24px` |

### 销售信息 `.sell-info`

| 属性 | 值 |
|------|-----|
| 布局 | `display: flex; flex-direction: column` |
| 间距 | `gap: 8px` |

### 销售标题 `.sell-title`

| 属性 | 值 |
|------|-----|
| 字号 | `28px` |
| 字重 | `500` |
| 颜色 | `var(--color-darkgray)` |

### 高亮文字 `.highlight`

| 属性 | 值 |
|------|-----|
| 颜色 | `var(--color-indigo-1)` #6666ff |

### 销售描述 `.sell-desc`

| 属性 | 值 |
|------|-----|
| 字号 | `22px` |
| 颜色 | `var(--color-lightgray)` |

### 展开箭头 `.expand-arrow`

| 属性 | 值 |
|------|-----|
| 尺寸 | `32px × 32px` |
| 颜色 | `var(--color-lightgray)` |

## 关键约束

1. **固定定位**：`position: fixed; bottom: 134px`
2. **悬浮层级**：`z-index: 998`（低于底部操作栏的999）
3. **卡片阴影**：`box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06)`
4. **高亮颜色**：`var(--color-indigo-1)` 紫色
