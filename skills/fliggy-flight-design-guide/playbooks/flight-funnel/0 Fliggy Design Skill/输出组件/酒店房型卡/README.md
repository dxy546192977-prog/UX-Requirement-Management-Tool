# 酒店房型卡组件

酒店详情展示卡片（固定组件），包含酒店基本信息、主图、房型列表和页脚链接四个区域。AI 根据酒店数据填充标题、评分、图片和多个房型信息。

## 规范参数（@2x）

### 卡片容器 `.hotel-details-card`

| 属性 | 值 |
|------|------|
| 宽度 | 690px |
| 背景色 | var(--color-white) |
| 圆角 | **var(--radius-xl)** |
| 内边距 | 24px |
| 布局 | `flex-direction: column; gap: 28px` |

## 区域一：酒店头部 `.hotel-header`

布局: `flex-direction: column; gap: 18px`

### 头部信息 `.header-info`

布局: `flex-direction: column; gap: 6px`

#### 标题行 `.header-title-line`

布局: `flex; align-items: flex-start; gap: 12px`（flex-start 允许长标题换行）

#### 酒店标题 `.hotel-title`

| 属性 | 值 |
|------|------|
| 字号 | 30px |
| 字重 | 500 (Medium) |
| 颜色 | var(--color-darkgray) |
| 行高 | 1.4 |
| 溢出 | 允许换行（不设 nowrap） |

#### 类型标签 `.hotel-category-tag`

| 属性 | 值 |
|------|------|
| 背景色 | `rgba(34, 34, 34, 0.06)` |
| 圆角 | var(--radius-s) |
| 内边距 | 0 8px |
| 高度 | 32px |
| 字号 | 22px |
| 颜色 | #999999 |
| 收缩 | `flex-shrink: 0` |

#### 评分行 `.hotel-rating-line`

布局: `flex; align-items: center; gap: 16px`; 字号: 24px; 行高: 1.4

| 子元素 | 颜色 |
|--------|------|
| `.score` | **var(--color-indigo-1)** |
| `.ranking` | var(--color-midgray) |

### 主图 `.main-image-container`

| 属性 | 值 |
|------|------|
| 宽度 | 100% |
| 高度 | **300px** |
| 圆角 | var(--radius-l) |
| 填充 | `background-size: cover; background-position: center` |
| 内边距 | 12px |
| 布局 | `align-items: flex-end` |

#### 图片覆盖物 `.image-overlays`

布局: `flex; gap: 12px`

| 元素 | 尺寸 | 样式 |
|------|------|------|
| 播放按钮 `.play-button` | 40 x 40px | `rgba(0,0,0,0.4)` 底，圆角 var(--radius-s)，内嵌播放 SVG |
| 图片计数 `.image-counter` | 高度 40px，padding 0 12px | 同底色，20px/300 字重，白字 |

## 区域二：房型列表 `.room-list`

布局: `flex-direction: column; gap: 10px`

### 单个房型 `.room-type-item`

布局: `flex; gap: 24px`（左图右文）; 内边距: `padding: 9px 0`

#### 房型图片 `.room-image`

| 属性 | 值 |
|------|------|
| 宽度 | **150px** |
| 高度 | **224px**（约 2:3） |
| 圆角 | var(--radius-l) |
| 填充 | `background-size: cover` |
| 底部渐变 | `::after` 伪元素，底部 50%，`linear-gradient(180deg, rgba(15,19,26,0) 0%, rgba(15,19,26,0.7) 100%)` |

#### 房型详情 `.room-details`

布局: `flex-grow: 1; flex-direction: column; justify-content: space-between`

#### 房型信息 `.room-info`

布局: `flex-direction: column; gap: 12px`

| 元素 | 字号 | 字重 | 颜色 |
|------|------|------|------|
| `.room-title` | 30px | 500 | var(--color-darkgray) |
| `.room-features` | 24px | 400 | var(--color-midgray) |

`.room-features` 布局: `flex-wrap: wrap; gap: 6px 12px`

#### 房型预订 `.room-booking`

布局: `flex; justify-content: flex-end; align-items: center; gap: 12px`

#### 房型价格区 `.room-price-area`

布局: `flex-direction: column; align-items: flex-end; gap: 12px`

| 元素 | 字号 | 字重 | 字体 |
|------|------|------|------|
| `.currency` ¥ | 24px | 700 | `Fliggy Sans 102` |
| `.amount` 数字 | 42px | 400 | `Fliggy Sans 102` |

颜色统一 var(--color-darkgray)

#### 优惠标签 `.room-discount-tags`

字号: 20px; 颜色: var(--color-pay-1); 最小高度: 28px; 分隔线: 1px dashed, 高度 14px, 颜色 #FFB2A3

#### 预订按钮 `.room-action-button`

| 属性 | 值 |
|------|------|
| 尺寸 | 96 x 60px |
| 背景色 | var(--color-indigo-4) |
| 文字颜色 | var(--color-indigo-1) |
| 字号 | 24px |
| 字重 | 600 |
| 圆角 | var(--radius-l) |

## 区域三：分割线 `.card-divider`

`<hr>` 样式: `border-top: 1px solid #EEEEEE`

## 区域四：页脚链接 `.card-footer-link`

布局: `flex; justify-content: space-between; align-items: center`; 字号: 24px; 颜色: var(--color-darkgray); 右侧图标: 右箭头 SVG（12x20px，#666666）; 文案格式: "查看全部{N}种房型"

完整 HTML 结构详见 [example.html](example.html)。
