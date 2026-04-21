# 价格信息模块

订单支付金额展示模块，显示支付方式、金额、附加费用。

## 视觉效果

- **容器**：通栏白色卡片 `.price-policy-card`
- **背景**：`var(--color-white)` 白色

## 结构规范

### 通栏容器 `.price-policy-card`

| 属性 | 值 |
|------|-----|
| 宽度 | `750px`（通栏） |
| 左偏移 | `margin-left: -24px` |
| 背景 | `var(--color-white)` |
| 上间距 | `margin-top: 24px` |

### 内容区 `.price-info-wrapper`

| 属性 | 值 |
|------|-----|
| 内边距 | `20px 30px` |

### 主行 `.price-main`

| 属性 | 值 |
|------|-----|
| 布局 | `display: flex; justify-content: space-between; align-items: center` |

### 左侧区域 `.price-left`

| 属性 | 值 |
|------|-----|
| 布局 | `display: flex; align-items: center` |
| 间距 | `gap: 12px` |

### 支付方式 `.pay-type`

| 属性 | 值 |
|------|-----|
| 字号 | `30px` |
| 字重 | `500` |
| 颜色 | `var(--color-darkgray)` |
| 间距 | `gap: 8px` |

### 帮助图标 `.pay-type-icon`

| 属性 | 值 |
|------|-----|
| 尺寸 | `32px × 32px` |

### 价格展示 `.price-display`

| 属性 | 值 |
|------|-----|
| 布局 | `display: flex; align-items: baseline` |
| 间距 | `gap: 2px` |

### 货币符号 `.currency`

| 属性 | 值 |
|------|-----|
| 字号 | `28px` |
| 字重 | `500` |
| 颜色 | `var(--color-pay-1)` #ff5533 |
| 字体 | `Fliggy Sans 102` |

### 金额数字 `.amount`

| 属性 | 值 |
|------|-----|
| 字号 | `36px` |
| 字重 | `500` |
| 颜色 | `var(--color-pay-1)` #ff5533 |
| 字体 | `Fliggy Sans 102` |

### 箭头图标 `.price-arrow`

| 属性 | 值 |
|------|-----|
| 尺寸 | `16px × 16px` |
| 防变形 | `object-fit: contain` |

### 附加费用 `.extra-fee`

| 属性 | 值 |
|------|-----|
| 字号 | `24px` |
| 颜色 | `#919499` |
| 上间距 | `margin-top: 12px` |

## 关键约束

1. **通栏布局**：`width: 750px; margin-left: -24px`
2. **金额字号**：固定 `36px`，使用 Fliggy Sans 字体
3. **金额颜色**：`var(--color-pay-1)` 橙红色
4. **箭头尺寸**：`16px`，需 `object-fit: contain`
