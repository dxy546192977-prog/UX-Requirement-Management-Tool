# 订单卡组件

已下单的订单详情展示卡片（可配置固定组件），包含订单金额、业务信息分区、费用明细和操作按钮。分区数量、内容和费用明细行可由 AI 动态配置。

**AI 可配置项**: 修改订单金额 / 增删分区 `.card-section` / 修改分区标签和标题 / 配置摘要信息 / 配置日期区块 / 增删费用明细行 / 修改退款总计 / 配置按钮文案

## 规范参数（@2x）

### 卡片容器 `.order-details-card`

| 属性 | 值 |
|------|------|
| 宽度 | 690px |
| 背景色 | var(--color-white) |
| 圆角 | **var(--radius-xl)** |
| 内边距 | `0 24px 24px`（上方由子元素 padding-top 控制） |
| 布局 | `flex-direction: column` |
| 上间距 | 24px（外层 wrapper 的 padding-top） |

### 订单金额 `.order-total-header`

布局: `flex; align-items: center; gap: 12px`; 上内边距: 24px

| 子元素 | 字号 | 字重 | 颜色 |
|--------|------|------|------|
| 标签 `.label` | 24px | 400 | var(--color-lightgray) |
| 货币符号 `.currency` | 20px | 400 | **var(--color-pay-1)** |
| 金额 `.amount` | 28px | 500 | **var(--color-pay-1)** |

### 通用分区 `.card-section`

布局: `flex-direction: column`; 上内边距: 18px

#### 分区头部 `.section-header`

布局: `flex; align-items: center; gap: 12px`

#### 分区标签 `.section-tag`

| 属性 | 值 |
|------|------|
| 尺寸 | 60 x 32px |
| 背景色 | **var(--color-indigo-4)** |
| 圆角 | var(--radius-s) |
| 字号 | 22px |
| 字重 | 500 |
| 颜色 | **var(--color-indigo-1)** |

#### 分区标题 `.section-title`

字号: 28px; 字重: 500; 颜色: var(--color-darkgray); 行高: 1.4

### 摘要信息行 `.summary-info-line`

布局: `flex; align-items: center; gap: 12px`; 字号: 24px; 颜色: var(--color-darkgray); 上内边距: 18px; 分隔符: 1px x 20px, #D2D4D9

### 日期区块 `.date-blocks`

布局: `flex; gap: 18px`; 上内边距: 18px

#### 单个日期区块 `.date-block`

| 属性 | 值 |
|------|------|
| 宽度 | `flex: 1`（等分） |
| 背景色 | **var(--color-label)** |
| 圆角 | var(--radius-l) |
| 内边距 | 18px 0 |
| 内部间距 | 12px |
| 布局 | `flex-direction: column; align-items: center` |

| 子元素 | 字号 | 字重 | 颜色 |
|--------|------|------|------|
| 日期 `.date-text` | 28px | 500 | var(--color-darkgray) |
| 时间 `.time-text` | 24px | 400 | var(--color-darkgray) |

### 费用明细 `.billing-details`

上内边距: **42px**; 布局: `flex-direction: column; gap: 18px`; 字号: 24px; 颜色: var(--color-lightgray)

#### 费用行 `.billing-item`

布局: `flex; justify-content: space-between`

| 子元素 | 说明 |
|--------|------|
| `.item-label` | 费用名称 |
| `.item-desc` | 中间描述（`flex-grow: 1; padding: 0 12px`） |
| `.item-value` | 金额，靠右 |

### 分割线 `.card-divider`

样式: `border-top: 1px solid var(--color-bg)`; 上间距: `margin: 24px 0 0 0`

### 退款/总计摘要 `.refund-summary`

布局: `flex; justify-content: space-between; align-items: center`; 上内边距: 24px

| 子元素 | 字号 | 字重 | 颜色 |
|--------|------|------|------|
| 标签 `.label` | 28px | 500 | var(--color-darkgray) |
| 货币符号 `.currency` | 22px | — | **var(--color-pay-1)** |
| 金额 `.amount` | **32px** | 500 | **var(--color-pay-1)** |

### 操作按钮 `.action-buttons`

布局: `flex; gap: 16px`; 按钮宽度: `flex: 1`; 按钮高度: 80px; 按钮圆角: var(--radius-l); 字号: 26px; 字重: 500

| 按钮类型 | 背景色 | 文字颜色 | 典型文案 |
|----------|--------|---------|---------|
| 次要 `.btn-secondary` | var(--color-bg) | var(--color-darkgray) | "返回修改" |
| 主要 `.btn-primary` | var(--color-indigo-4) | var(--color-indigo-1) | "确认取消"/"去支付" |

完整 HTML 结构详见 [example.html](example.html)。
