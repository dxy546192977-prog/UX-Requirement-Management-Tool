# 底部支付栏组件

页面底部固定吸底的支付操作栏，包含价格展示和支付按钮。

**AI 可配置项**: 修改价格 / 修改按钮文案 / 配置离店后付描述

## 规范参数（@2x）

### 容器 `.bottom-bar`

| 属性 | 值 |
|------|------|
| 定位 | fixed; bottom: 0; left: 0 |
| 宽度 | 750px |
| 高度 | 140px |
| 背景色 | var(--color-white) |
| 顶部边框 | 1px solid #EEEEEE |
| 布局 | `flex; justify-content: flex-end; align-items: center; gap: 24px` |
| 内边距 | 0 18px |
| 层级 | z-index: 100 |

### 价格区域 `.price-section`

| 属性 | 值 |
|------|------|
| 布局 | `flex; flex-direction: column; gap: 2px; align-items: flex-end` |

### 总价 `.total-price`

布局: `flex; align-items: baseline; gap: 0`

### 货币符号 `.price-currency`

| 属性 | 值 |
|------|------|
| 字号 | 32px |
| 字重 | 700 |
| 颜色 | var(--color-pay-1) |
| 字体 | 'Fliggy Sans 102', 'PingFang SC', sans-serif |

### 价格金额 `.price-amount`

| 属性 | 值 |
|------|------|
| 字号 | 48px |
| 字重 | 700 |
| 颜色 | var(--color-pay-1) |
| 字体 | 'Fliggy Sans 102', 'PingFang SC', sans-serif |

### 价格小数 `.price-decimal`

| 属性 | 值 |
|------|------|
| 字号 | 32px |
| 字重 | 700 |
| 颜色 | var(--color-pay-1) |
| 字体 | 'Fliggy Sans 102', 'PingFang SC', sans-serif |

### 价格描述 `.price-desc`

字号: 22px; 颜色: var(--color-lightgray)

### 支付按钮 `.pay-btn`

| 属性 | 值 |
|------|------|
| 宽度 | 260px |
| 高度 | 88px |
| 背景 | linear-gradient(135deg, #FF6B4A 0%, #FF5533 100%) |
| 边框 | 无 |
| 圆角 | 44px（全圆角） |
| 字号 | 32px |
| 字重 | 600 |
| 颜色 | var(--color-white) |

### 图标规范

| 图标 | 尺寸 |
|------|------|
| 进入箭头 | 10px x 18px |

完整 HTML 结构详见 [example.html](example.html)。
