# 底部操作栏

页面底部固定的操作工具栏，提供联系酒店、联系客服等快捷入口。

## 视觉效果

- **定位**：固定在页面底部
- **背景**：白色，顶部有分隔线
- **安全区**：底部留 `34px` 安全区适配全面屏

## 结构规范

### 容器 `.bottom-bar-wrapper`

| 属性 | 值 |
|------|-----|
| 宽度 | `750px` |
| 背景 | `var(--color-white)` |
| 顶部边框 | `1px solid rgba(15, 19, 26, 0.06)` |
| 定位 | `position: fixed; bottom: 0; left: 0` |
| 层级 | `z-index: 999` |

### 内容区 `.bar-content`

| 属性 | 值 |
|------|-----|
| 布局 | `display: flex; justify-content: space-around; align-items: center` |
| 高度 | `100px` |
| 内边距 | `padding: 0 30px` |

### 操作按钮 `.bar-btn`

| 属性 | 值 |
|------|-----|
| 布局 | `display: flex; flex-direction: column; align-items: center` |
| 间距 | `gap: 8px` |
| 背景 | `transparent` |
| 边框 | `none` |
| 内边距 | `0` |

### 按钮图标 `.btn-icon`

| 属性 | 值 |
|------|-----|
| 尺寸 | `40px × 40px` |
| 防变形 | `object-fit: contain` |

### 按钮文字 `.btn-text`

| 属性 | 值 |
|------|-----|
| 字号 | `22px` |
| 颜色 | `var(--color-darkgray)` |

### 安全区 `.safe-area`

| 属性 | 值 |
|------|-----|
| 高度 | `34px` |
| 背景 | `var(--color-white)` |

## 关键约束

1. **固定定位**：`position: fixed; bottom: 0`
2. **最高层级**：`z-index: 999`
3. **内容高度**：`100px`
4. **安全区高度**：`34px`
5. **总高度**：`134px`（100 + 34）
6. **图标尺寸**：`40px`，使用 `object-fit: contain`
