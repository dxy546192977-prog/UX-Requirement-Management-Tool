# 酒店信息卡

酒店基本信息展示卡片，包含店铺名、酒店图片、酒店名称、设施服务链接、地址卡片。

## 视觉效果

- **布局**：通栏白色卡片
- **地址卡片**：浅蓝色背景 `#E8F4FC`

## 结构规范

### 通栏容器 `.hotel-info-wrapper`

| 属性 | 值 |
|------|-----|
| 宽度 | `750px`（通栏） |
| 左偏移 | `margin-left: -24px` |
| 上间距 | `margin-top: 24px` |

### 卡片内容 `.hotel-info-card`

| 属性 | 值 |
|------|-----|
| 背景 | `var(--color-white)` |
| 内边距 | `padding: 24px 30px` |

### 店铺名 `.shop-name`

| 属性 | 值 |
|------|-----|
| 字号 | `24px` |
| 颜色 | `var(--color-lightgray)` #919499 |
| 下间距 | `margin: 0 0 18px 0` |

### 主内容区 `.hotel-main`

| 属性 | 值 |
|------|-----|
| 布局 | `display: flex` |
| 间距 | `gap: 18px` |
| 对齐 | `align-items: flex-start` |

### 酒店图片 `.hotel-image`

| 属性 | 值 |
|------|-----|
| 尺寸 | `140px × 140px` |
| 圆角 | `var(--radius-l)` 6px |
| 防缩 | `flex-shrink: 0` |
| 填充 | `background-size: cover; background-position: center` |

### 酒店内容 `.hotel-content`

| 属性 | 值 |
|------|-----|
| 布局 | `display: flex; flex-direction: column` |
| 高度 | `140px`（与图片等高） |
| 对齐 | `justify-content: space-between` |

### 酒店名称 `.hotel-name`

| 属性 | 值 |
|------|-----|
| 字号 | `30px` |
| 字重 | `500` |
| 颜色 | `var(--color-darkgray)` |
| 行高 | `1.4` |
| 间距 | `gap: 8px` |

### 酒店名称箭头 `.hotel-name-arrow`

| 属性 | 值 |
|------|-----|
| 尺寸 | `24px × 24px` |
| 颜色 | `var(--color-lightgray)` |

### 设施服务链接 `.facility-link`

| 属性 | 值 |
|------|-----|
| 字号 | `24px` |
| 颜色 | `var(--color-indigo-1)` #6666ff |
| 间距 | `gap: 6px` |
| 位置 | `align-self: flex-end` |

### 地址区域 `.address-section`

| 属性 | 值 |
|------|-----|
| 上间距 | `margin-top: 18px` |

### 地址卡片 `.address-card`

| 属性 | 值 |
|------|-----|
| 背景 | `#E8F4FC`（浅蓝色） |
| 圆角 | `var(--radius-l)` 6px |
| 内边距 | `padding: 24px` |
| 布局 | `display: flex; gap: 12px` |

### 地址文字 `.address-text`

| 属性 | 值 |
|------|-----|
| 字号 | `26px` |
| 颜色 | `var(--color-midgray)` |
| 行高 | `1.4` |

### 快捷按钮 `.quick-btn`

| 属性 | 值 |
|------|-----|
| 背景 | `var(--color-white)` |
| 圆角 | `32px`（胶囊） |
| 内边距 | `12px 24px` |
| 字号 | `24px` |
| 边框 | `none` |

## 关键约束

1. **通栏布局**：`width: 750px; margin-left: -24px`
2. **图片尺寸**：固定 `140px × 140px`
3. **地址卡片背景**：使用浅蓝色 `#E8F4FC`
4. **快捷按钮胶囊**：`border-radius: 32px`
