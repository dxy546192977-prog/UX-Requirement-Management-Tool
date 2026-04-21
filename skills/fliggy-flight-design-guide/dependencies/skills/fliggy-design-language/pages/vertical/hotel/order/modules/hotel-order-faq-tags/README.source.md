# 常见问题标签

常见问题快捷入口标签组，可自动换行排列。

## 视觉效果

- **布局**：通栏白色卡片
- **标签**：灰色背景胶囊，自动换行

## 结构规范

### 通栏容器 `.faq-wrapper`

| 属性 | 值 |
|------|-----|
| 宽度 | `750px`（通栏） |
| 左偏移 | `margin-left: -24px` |
| 背景 | `var(--color-white)` |
| 内边距 | `padding: 24px 30px 36px` |
| 上间距 | `margin-top: 24px` |

### 头部 `.faq-header`

| 属性 | 值 |
|------|-----|
| 布局 | `display: flex; justify-content: space-between; align-items: center` |
| 下间距 | `margin-bottom: 18px` |

### 标题 `.faq-title`

| 属性 | 值 |
|------|-----|
| 字号 | `28px` |
| 字重 | `500` |
| 颜色 | `var(--color-darkgray)` |

### 更多链接 `.faq-more`

| 属性 | 值 |
|------|-----|
| 字号 | `24px` |
| 颜色 | `var(--color-indigo-1)` |
| 间距 | `gap: 4px` |

### 更多箭头 `.faq-more-arrow`

| 属性 | 值 |
|------|-----|
| 尺寸 | `20px × 20px` |
| 防变形 | `object-fit: contain` |

### 标签容器 `.faq-tags`

| 属性 | 值 |
|------|-----|
| 布局 | `display: flex; flex-wrap: wrap` |
| 间距 | `gap: 18px` |

### 标签按钮 `.faq-tag`

| 属性 | 值 |
|------|-----|
| 背景 | `var(--color-label)` #F7F8FA |
| 圆角 | `32px`（胶囊） |
| 内边距 | `18px 24px` |
| 字号 | `24px` |
| 颜色 | `var(--color-darkgray)` |
| 边框 | `none` |
| 宽度 | `flex: 1; min-width: 180px` |
| 对齐 | `text-align: center` |

## 关键约束

1. **通栏布局**：`width: 750px; margin-left: -24px`
2. **标签换行**：`flex-wrap: wrap`
3. **胶囊圆角**：`border-radius: 32px`
4. **灰色背景**：`var(--color-label)`
5. **底部内边距**：`36px`（比顶部多12px）
