# 支付方式选择器组件

支付方式选择卡片，包含信用住、在线付、分期支付等多种支付选项。

**AI 可配置项**: 增删支付选项 / 配置支付方式描述 / 配置优惠信息

## 规范参数（@2x）

### 卡片容器

| 属性 | 值 |
|------|------|
| 宽度 | 714px |
| 背景色 | var(--color-white) |
| 圆角 | 12px |
| 内边距 | 24px |

### 卡片标题 `.card-title`

字号: 32px; 字重: 600; 颜色: var(--color-darkgray); 下间距: 18px

### 支付选项 `.payment-option`

| 属性 | 值 |
|------|------|
| 布局 | `flex; justify-content: space-between; align-items: center` |
| 内边距 | 24px |
| 背景色 | #F7F8FA |
| 圆角 | 12px |
| 下间距 | 12px（最后一个无） |

### 支付左侧内容 `.payment-left`

| 变体 | 布局 |
|------|------|
| 默认 | `flex-direction: column; gap: 8px` |
| `.inline` | `flex-direction: row; align-items: center; gap: 12px` |

### 支付标题 `.payment-title`

| 属性 | 值 |
|------|------|
| 布局 | `flex; align-items: center; gap: 8px` |
| 字号 | 28px |
| 颜色 | var(--color-darkgray) |

### 支付描述 `.payment-desc`

字号: 24px; 颜色: var(--color-lightgray)

### 支付优惠 `.payment-promo`

字号: 24px; 颜色: var(--color-lightgray)

### 价格高亮 `.price-highlight`

颜色: var(--color-pay-1)

### 单选按钮 `.radio-btn`

| 属性 | 值 |
|------|------|
| 尺寸 | 44px x 44px |
| 选中态 | 使用勾选图标 |
| 未选中态 | 使用空心圆图标 |

### 图标规范

| 图标 | 尺寸 |
|------|------|
| 帮助图标 | 28px x 28px |
| 箭头图标 | 12px x 22px |

完整 HTML 结构详见 [example.html](example.html)。
