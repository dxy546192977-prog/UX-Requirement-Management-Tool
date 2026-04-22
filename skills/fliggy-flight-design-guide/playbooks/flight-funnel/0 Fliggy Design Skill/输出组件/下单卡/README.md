# 下单卡组件

订单确认表单卡片（可配置固定组件），包含标题、摘要信息、可自由配置的表单单元列表、协议勾选和操作按钮。表单单元的数量和内容由 AI 根据场景动态配置。

**AI 可配置项**: 修改标题 / 修改摘要 / 增删表单单元 `.form-cell` / 修改单元标签和内容 / 配置协议文本 / 配置按钮文案

## 规范参数（@2x）

### 卡片容器 `.order-card`

| 属性 | 值 |
|------|------|
| 宽度 | 690px |
| 背景色 | var(--color-white) |
| 圆角 | **var(--radius-xl)** |
| 内边距 | 24px |
| 布局 | `flex-direction: column; gap: 10px` |
| 上间距 | 24px（外层 `.order-card-wrapper` 的 padding-top） |

### 头部 `.order-card-header`

下内边距: 18px

#### 标题 `.card-title`

字号: **28px**; 字重: 500; 颜色: var(--color-darkgray); 行高: 1.4

### 摘要信息 `.summary-info`

布局: `flex; align-items: center; gap: 12px`; 字号: 24px; 颜色: var(--color-darkgray); 行高: 1.4; 下内边距: 18px; 分隔符 `.divider`: 1px x 20px, #D2D4D9

### 表单主体 `.order-form-body`

布局: `flex-direction: column`

#### 表单单元 `.form-cell`

| 属性 | 值 |
|------|------|
| 布局 | `flex; justify-content: space-between; align-items: center` |
| 内边距 | `padding: 24px 0` |
| 分割线 | `border-bottom: 1px solid #EEEEEE`（最后一个无底线） |
| 可点击 | `<a>` 标签带右箭头；不可点击用 `<div>` |

#### 单元标签 `.cell-label`

字号: 28px; 颜色: var(--color-lightgray); `flex-shrink: 0`; `min-width: 140px`（统一标签宽度，使内容列左对齐）; 右间距: 24px

#### 单元内容 `.cell-content`

布局: `flex; align-items: center; gap: 18px; flex-grow: 1; justify-content: flex-start`

#### 主内容文本 `.cell-content-main`

- 默认: 28px / 500 / var(--color-darkgray) / 左对齐
- `.is-prompt` 变体: 24px / 400 / **var(--color-pay-1)**

#### 右箭头图标 `.cell-arrow-icon`

尺寸: 12 x 22px; 颜色: var(--color-lightgray); `margin-left: auto`（始终靠右）; 仅在可点击单元中出现

### 特殊单元类型

#### 出行人信息 `.traveler-info`

布局: `flex-direction: column; align-items: flex-start; gap: 6px`

| 子元素 | 样式 |
|--------|------|
| 姓名行 `.name-line` | `flex; gap: 12px` |
| 姓名 `.name` | 28px / 500 / var(--color-darkgray) |
| 标签 `.tag` | 背景 var(--color-bg)，圆角 var(--radius-s)，padding 2px 6px，16px / var(--color-midgray) |
| 证件信息 `.id-info` | 24px / var(--color-lightgray) |

#### 总价展示 `.total-price-display`

布局: `flex; align-items: flex-end; gap: 4px`; 字体: `Poppins, sans-serif`; 颜色: **var(--color-pay-1)**; 货币符号: 22px; 金额数字: **32px** / 500

### 页脚 `.order-card-footer`

布局: `flex-direction: column; gap: 18px`; 上内边距: 18px

#### 协议行 `.agreement-line`

| 属性 | 值 |
|------|------|
| 布局 | `flex; align-items: center; gap: 16px` |
| 复选框 | 40x40px SVG，选中态 var(--color-indigo-1) + 白色对勾 |
| 文本字号 | 22px |
| 文本颜色 | var(--color-darkgray) |
| 链接颜色 | var(--color-indigo-1) |
| 行高 | 1.45 |

#### 操作按钮组 `.action-buttons`

布局: `flex; gap: 16px`; 按钮宽度: `flex: 1`; 按钮高度: **80px**; 按钮圆角: var(--radius-l); 字号: 26px; 字重: 500

| 按钮类型 | 背景色 | 文字颜色 | 典型文案 |
|----------|--------|---------|---------|
| 次要 `.btn-secondary` | var(--color-bg) | var(--color-darkgray) | "返回修改" |
| 主要 `.btn-primary` | var(--color-indigo-4) | var(--color-indigo-1) | "去支付" |

完整 HTML 结构详见 [example.html](example.html)。
