# 中转快筛栏组件

机票列表页中转航班快速筛选栏（固定组件），提供中转城市和到达时间的快捷筛选。位于分割区域下方、中转卡片列表上方。

## 规范参数（@2x）

### 外层容器 `.transfer-filter-wrapper`

| 属性 | 值 |
|------|------|
| 宽度 | 750px |
| 高度 | 84px |
| 背景 | linear-gradient(0deg, #FFFFFF, #FFFFFF), linear-gradient(0deg, #FFFFFF, #FFFFFF), #F9F9F9 |
| 底部边框 | 1px solid #F2F3F5 |
| 布局 | flex; flex-direction: row; align-items: center |
| 其他 | padding: 0; isolation: isolate; overflow: hidden; position: relative |

### 内层快筛栏 `.transfer-filter-bar`

| 属性 | 值 |
|------|------|
| 最小宽度 | 854px（超出750px可横向滚动） |
| 高度 | 84px |
| 背景 | 同外层容器 |
| 底部边框 | 1px solid #F2F3F5 |
| 布局 | flex; flex-direction: row; align-items: center |
| 内边距 | 12px |
| 间距 | gap: 12px |
| 其他 | box-sizing: border-box; isolation: isolate; overflow-x: auto |

### 筛选项0（筛选，隐藏） `.transfer-filter-item--hidden`

| 属性 | 值 |
|------|------|
| 显示 | display: none |
| 尺寸 | 116×60px |
| 背景色 | #F7F8FA |
| 圆角 | 6px |

### 筛选项（普通态） `.transfer-filter-item`

| 属性 | 值 |
|------|------|
| 高度 | 60px |
| 背景色 | #F7F8FA |
| 圆角 | 6px |
| 布局 | flex; flex-direction: row; align-items: center; gap: 6px |
| 内边距 | 12px 18px |
| 其他 | flex: none; flex-shrink: 0; position: relative |

### 筛选项（选中态） `.transfer-filter-item.active`

| 属性 | 值 |
|------|------|
| 背景色 | #FFFCE9 |
| 边框 | 1px solid #FFDF00 |
| 文字字重 | 500 |
| 选中勾 | 右下角 24×21px 切图 |

### 选中勾图标 `.transfer-filter-check`

| 属性 | 值 |
|------|------|
| 定位 | position: absolute; right: 0; bottom: 0 |
| 尺寸 | 24×21px |
| 切图 | `https://gw.alicdn.com/imgextra/i2/O1CN01x9n4nt1MKZxdcQRl1_!!6000000001416-2-tps-24-21.png` |

### 筛选文字 `.transfer-filter-text`

| 属性 | 值 |
|------|------|
| 字体 | 'PingFang SC' |
| 字号 | 24px |
| 字重 | 400（选中态 500） |
| 行高 | 140% (34px) |
| 颜色 | #0E131B |
| 其他 | white-space: nowrap; flex: none |

### 下拉箭头 `.transfer-filter-arrow`

| 属性 | 值 |
|------|------|
| 尺寸 | 20×20px |
| 默认 | display: none（带箭头的筛选项添加 `.visible` 类显示） |

### 人均价（隐藏） `.transfer-filter-avg-price`

| 属性 | 值 |
|------|------|
| 显示 | display: none |
| 定位 | position: absolute; right: 0 |
| 尺寸 | 230×60px |

完整结构详见 [example.html](example.html)。
