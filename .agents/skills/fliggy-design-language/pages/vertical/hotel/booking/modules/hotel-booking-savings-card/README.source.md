# 优惠权益卡组件

展示用户本单可享优惠、里程抵现、入住权益、离店返赠等信息的卡片。

**AI 可配置项**: 修改节省金额 / 增删优惠行 / 配置里程/权益内容

## 规范参数（@2x）

### 卡片容器 `.savings-card`

| 属性 | 值 |
|------|------|
| 宽度 | 714px |
| 背景色 | var(--color-white) |
| 圆角 | 12px |
| 内边距 | 0 24px |

### 卡片头部 `.savings-header`

| 属性 | 值 |
|------|------|
| 高度 | 90px |
| 布局 | `flex; justify-content: space-between; align-items: center` |
| 底部边框 | 1px solid #EEEEEE |

#### 标题 `.savings-title`

字号: 30px; 字重: 600; 颜色: var(--color-darkgray)

#### 节省金额 `.savings-amount`

字号: 28px; 字重: 600; 颜色: var(--color-pay-1)

### 优惠行 `.savings-row`

| 属性 | 值 |
|------|------|
| 高度 | 90px |
| 布局 | `flex; justify-content: space-between; align-items: center` |
| 底部边框 | 1px solid #EEEEEE（最后一个无） |

#### 行标签 `.savings-label`

| 属性 | 值 |
|------|------|
| 布局 | `flex; align-items: center; gap: 8px` |
| 字号 | 26px |
| 颜色 | var(--color-lightgray) |

#### 行值组 `.savings-value-group`

布局: `flex; align-items: center; gap: 12px`

#### 行值 `.savings-value`

字号: 26px; 颜色: var(--color-darkgray)

#### 价格高亮 `.price-highlight`

颜色: var(--color-pay-1)

### 优惠标签 `.savings-tag`

| 属性 | 值 |
|------|------|
| 高度 | 30px |
| 内边距 | 0 10px 0 8px |
| 背景色 | var(--color-pay-1) |
| 圆角 | 6px 0 0 6px |
| 字号 | 22px |
| 字重 | 500 |
| 颜色 | #FFFFFF |
| 尾部三角 | `::after` 伪元素实现 |

### 图标规范

| 图标 | 尺寸 |
|------|------|
| `.info-icon` | 28px x 28px |
| `.expand-icon` | 24px x 24px |
| `.radio-btn` | 44px x 44px |

完整 HTML 结构详见 [example.html](example.html)。
