# 入住人信息

入住人详细信息展示，包含入住人姓名、联系手机、特殊要求、备注提示。

## 视觉效果

- **位置**：在房型日期信息卡片内部
- **分隔**：与早餐卡片之间有上边距分隔

## 结构规范

### 容器 `.guest-info-section`

| 属性 | 值 |
|------|-----|
| 上内边距 | `padding-top: 24px` |
| 上间距 | `margin-top: 24px` |

### 信息行 `.info-row`

| 属性 | 值 |
|------|-----|
| 布局 | `display: flex` |
| 间距 | `gap: 24px` |
| 字号 | `24px` |
| 下间距 | `margin-bottom: 18px`（最后一行为0） |

### 信息标签 `.info-label`

| 属性 | 值 |
|------|-----|
| 宽度 | `120px` |
| 颜色 | `var(--color-lightgray)` #919499 |
| 防缩 | `flex-shrink: 0` |

### 信息值 `.info-value`

| 属性 | 值 |
|------|-----|
| 颜色 | `var(--color-darkgray)` |
| 扩展 | `flex-grow: 1` |

### 备注提示 `.info-note`

| 属性 | 值 |
|------|-----|
| 字号 | `22px` |
| 颜色 | `var(--color-lightgray)` |
| 上间距 | `margin-top: 12px` |
| 布局 | `display: flex; align-items: center` |
| 间距 | `gap: 8px` |

### 备注图标 `.note-icon`

| 属性 | 值 |
|------|-----|
| 尺寸 | `28px × 28px` |
| 防缩 | `flex-shrink: 0` |

## 关键约束

1. **在房型卡片内**：不是独立通栏模块，而是在 `.room-date-wrapper` 内部
2. **标签宽度**：固定 `120px` 对齐
3. **备注提示**：小字号 `22px`，灰色
