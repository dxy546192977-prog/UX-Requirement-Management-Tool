# 省钱推荐组件

机票列表页省钱推荐模块（固定组件）。横向滚动展示低价航班推荐卡片，位于直飞卡片列表末尾，帮助用户发现更优惠的出行选择。

## 变体总览

| 变体 | 卡片宽度 | 标题行内容 | 适用场景 |
|------|----------|------------|----------|
| 不同日期推荐 | 246px | 日期 + 周几 | 推荐不同出行日期的航班 |
| 不同城市推荐 | 250px | 城市 + 箭头 + 城市 | 推荐不同出发/到达城市的航班 |

## 共享骨架

### 整体容器

| 属性 | 值 |
|------|------|
| 宽度 | 750px |
| 高度 | 102px |
| 背景色 | `var(--color-white)` |
| 布局 | `display:flex; flex-direction:row; align-items:flex-start` |
| 间距 | `gap:12px` |

### 左侧标题区

| 属性 | 值 |
|------|------|
| 尺寸 | 42px × 102px |
| 定位 | `position:relative` |

#### 蒙版层

| 属性 | 值 |
|------|------|
| 定位 | `position:absolute; left:0; top:0; bottom:0` |
| 宽度 | 42px |
| 背景 | `linear-gradient(89.72deg, #E6F7F7 0.2%, rgba(230,247,247,0.26) 99.71%)` |

#### 标题文字

| 属性 | 值 |
|------|------|
| 定位 | `position:absolute; left:9px; top:calc(50% - 88px/2)` |
| 尺寸 | 18px × 88px |
| 字体 | PingFang SC, 18px, 600 |
| 行高 | 22px |
| 颜色 | `var(--color-accent)` (#009DAA) |
| 排版 | `writing-mode:vertical-rl` |

### 卡片滚动区

| 属性 | 值 |
|------|------|
| 布局 | `display:flex; flex-direction:row; align-items:center` |
| 间距 | `gap:12px` |
| 高度 | 102px |
| 溢出 | `overflow-x:auto` |

### 推荐卡片（共享）

| 属性 | 不同日期推荐 | 不同城市推荐 |
|------|--------------|--------------|
| 宽度 | 246px | 250px |
| 高度 | 102px | 102px |
| 背景色 | `var(--color-bg-card)` | `var(--color-bg-card)` |
| 圆角 | 12px | 12px |
| 布局 | `flex-direction:column` | `flex-direction:column` |
| 间距 | `gap:8px` | `gap:8px` |
| 内边距 | `12px 24px 18px` | `12px 24px 18px` |

### 价格行

| 属性 | 值 |
|------|------|
| 布局 | `display:flex; flex-direction:row; align-items:flex-end` |
| 间距 | `gap:6px` |
| 高度 | 30px |

#### 价格符号 ¥

| 属性 | 值 |
|------|------|
| 字体 | `Alibaba Sans 102`, 24px, 700 |
| 尺寸 | 14px × 24px |
| 颜色 | `var(--color-price)` |

#### 价格数字

| 属性 | 值 |
|------|------|
| 字体 | `Fliggy Sans 102`, 32px, 400 |
| 行高 | 23px |
| 颜色 | `var(--color-price)` |

#### "起"字

| 属性 | 值 |
|------|------|
| 字体 | PingFang SC, 20px, 400 |
| 尺寸 | 20px × 24px |
| 颜色 | `var(--color-price)` |

### 优惠标签

| 属性 | 值 |
|------|------|
| 布局 | `display:flex; justify-content:center; align-items:center` |
| 边框 | `1px solid rgba(255,65,25,0.5)` |
| 圆角 | 4px |
| 内边距 | `3px 6px` |
| 高度 | 24px |
| 文字 | PingFang SC, 18px, 400, `var(--color-price)` |

## 不同日期推荐

适用于推荐不同出行日期的航班，标题行只显示日期和周几。

### 标题行结构

| 属性 | 值 |
|------|------|
| 布局 | `display:flex; flex-direction:row; align-items:flex-start` |
| 高度 | 34px |

#### 日期数字（如 04/05）

| 属性 | 值 |
|------|------|
| 字体 | `Alibaba Sans 102`, 26px, 700 |
| 行高 | 100% |
| 高度 | 34px |
| 颜色 | `var(--color-primary)` |

#### 周几（如 周六）

| 属性 | 值 |
|------|------|
| 字体 | PingFang SC, 24px, 500 |
| 行高 | 140% |
| 高度 | 34px |
| 颜色 | `var(--color-primary)` |

### 推荐结构

1. 标题行：日期数字 + 周几
2. 价格行：¥ + 价格数字 + 起 + 优惠标签

## 不同城市推荐

适用于推荐不同出发/到达城市的航班，标题行显示出发城市、箭头、到达城市。

### 标题行结构

| 属性 | 值 |
|------|------|
| 布局 | `display:flex; flex-direction:row; align-items:center` |
| 间距 | `gap:3px` |
| 高度 | 34px |

#### 城市名（如 天津）

| 属性 | 值 |
|------|------|
| 字体 | PingFang SC, 24px, 500 |
| 行高 | 140% |
| 高度 | 34px |
| 颜色 | `var(--color-primary)` |

#### 航线箭头

| 属性 | 值 |
|------|------|
| 容器尺寸 | 32px × 32px |
| SVG 尺寸 | 25.25px × 5.45px |
| 颜色 | #D2D4DA |

### 推荐结构

1. 标题行：出发城市 + 箭头 + 到达城市
2. 价格行：¥ + 价格数字 + 起 + 优惠标签

完整实现以本目录 [example.html](example.html) 为准。
