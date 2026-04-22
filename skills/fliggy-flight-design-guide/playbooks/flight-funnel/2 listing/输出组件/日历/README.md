# 日历组件

机票列表页日期选择栏（固定组件），横向滚动展示多个日期，每个日期显示星期、日期数字和最低价格。支持选中态高亮和节假日标识。

## 规范参数（@2x）

### 整体容器

| 属性 | 值 |
|------|------|
| 宽度 | 750px |
| 高度 | 102px |
| 背景色 | var(--color-white) |
| 布局 | flex-direction: column; align-items: flex-start; gap: 10px |
| 内边距 | 0 0 6px |
| 溢出 | overflow-x: auto; overflow-y: hidden |

### 日期滚动容器

| 属性 | 值 |
|------|------|
| 宽度 | 自适应（内容撑开） |
| 高度 | 96px |
| 布局 | flex; flex-direction: row; align-items: center |

### 单个日期项 `.date-item`

| 属性 | 值 |
|------|------|
| 宽度 | 126px |
| 高度 | 96px |
| 布局 | flex-direction: column; justify-content: center; align-items: center; gap: 8px |
| 内边距 | 10px 0 |
| 背景色 | var(--color-white) |

### 选中态 `.date-item.active`

| 属性 | 值 |
|------|------|
| 背景色 | var(--color-selected) (#FFE747) |
| 圆角 | var(--radius-l) (12px) |
| 宽度 | 114px（外层有6px padding） |

### 星期文字

| 属性 | 值 |
|------|------|
| 字体 | 'PingFang SC' |
| 字号 | 18px |
| 字重 | 400 |
| 行高 | 100% |
| 颜色 | var(--color-primary) |
| 对齐 | text-align: center |

### 日期数字

| 属性 | 值 |
|------|------|
| 字体 | 'Fliggy Sans 102', 'PingFang SC', sans-serif |
| 字号 | 30px |
| 字重 | bold |
| 行高 | 20px (67%) |
| 颜色 | #0E131B |

### 价格文字

| 属性 | 值 |
|------|------|
| 字体 | 'PingFang SC' |
| 字号 | 20px |
| 字重 | 400 |
| 行高 | 100% |
| 颜色 | var(--color-primary) |
| 对齐 | text-align: center |

### 星期文字行 `.weekday-row` / `.calendar-weekday-row`

| 属性 | 值 |
|------|------|
| 布局 | display: flex; flex-direction: row; justify-content: center; align-items: flex-start |
| 间距 | gap: 2px |
| 高度 | 18px |
| 说明 | 星期文字和"休"标签在同一行内横向排列 |

### 节假日标识 `.holiday-badge` / `.calendar-holiday`

| 属性 | 值 |
|------|------|
| 定位 | **inline**（在星期文字旁边，非绝对定位） |
| 尺寸 | 18×18px |
| 背景色 | #FFDF00 |
| 圆角 | 3.6px |
| 文字 | '休' |
| 文字字号 | 14.4px |
| 文字字重 | 500 |
| 文字颜色 | **#0E131B**（黑色，非白色） |

### 日期滚动容器

| 属性 | 值 |
|------|------|
| 定位 | position: absolute; left: 0; top: 0 |
| 尺寸 | 650×96px（限制在650px内，右侧留给遮罩和展开按钮） |
| 布局 | display: flex; flex-direction: row; align-items: center |
| 溢出 | overflow-x: auto; overflow-y: hidden |

### 阴影遮罩 `.shadow-mask`

| 属性 | 值 |
|------|------|
| 尺寸 | 100×96px |
| 定位 | position: absolute; **left: 596px**; top: 0 |
| 背景 | **radial-gradient**(100% 100% at 100% 52.49%, #E0E0E0 0%, rgba(255,255,255,0.0001) 100%) |
| 交互 | pointer-events: none |
| 层级 | z-index: 1 |

### 日历展开按钮 `.calendar-expand`

| 属性 | 值 |
|------|------|
| 尺寸 | 100×96px |
| 定位 | position: absolute; **left: 650px**; top: 0 |
| 背景 | #FFFFFF |
| 布局 | flex-direction: column; justify-content: center; align-items: center |
| 内边距 | 41px 32px |
| 间距 | gap: 6px |
| 层级 | z-index: 2 |

#### 日历图标
| 属性 | 值 |
|------|------|
| 尺寸 | 36×36px |
| 切图 | https://gw.alicdn.com/imgextra/i1/O1CN01n46BJU1JInZenKstw_!!6000000001006-2-tps-36-36.png |

#### 展开箭头
| 属性 | 值 |
|------|------|
| 尺寸 | 14×10px |
| 切图 | https://gw.alicdn.com/imgextra/i4/O1CN010GUEsm1pGZLnYT9L2_!!6000000005333-2-tps-14-10.png |

完整结构详见 [example.html](example.html)。
