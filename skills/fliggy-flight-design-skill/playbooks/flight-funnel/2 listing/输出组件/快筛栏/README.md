# 快筛栏组件

机票列表页快速筛选栏（固定组件），提供常用筛选条件的快捷入口。位于营销条下方、航班卡片列表上方。

## 规范参数（@2x）

### 整体容器

| 属性 | 值 |
|------|------|
| 宽度 | 750px |
| 高度 | 84px |
| 背景色 | var(--color-white) |
| 底部边框 | 1px solid var(--color-bg) |
| 布局 | flex; flex-direction: row; align-items: center; gap: 12px |
| 内边距 | 12px |
| 溢出 | overflow-x: auto; overflow-y: hidden（横向可滑动） |
| isolation | isolate |

### 筛选项 `.filter-item`

| 属性 | 值 |
|------|------|
| 高度 | 60px（固定） |
| 宽度 | 自适应（由文本内容撑开） |
| 背景色 | var(--color-bg-light) (#F7F8FA) |
| 圆角 | var(--radius-m) (6px) |
| 布局 | flex; flex-direction: row; align-items: center; gap: 6px |
| 内边距 | 12px 18px |
| 收缩 | flex-shrink: 0（不被压缩） |

### 筛选项选中态 `.filter-item.active`

| 属性 | 值 |
|------|------|
| 背景色 | var(--color-selected-bg) (#FFFCE9) |
| 边框 | 1px solid var(--color-selected-border) (#FFDF00) |

### 筛选文字

| 属性 | 值 |
|------|------|
| 字体 | 'PingFang SC' |
| 字号 | 24px |
| 字重 | 400（选中态500） |
| 行高 | 140% (34px) |
| 颜色 | var(--color-primary) |

### 筛选图标

| 属性 | 值 |
|------|------|
| 尺寸 | 26×26px |
| 切图 | https://gw.alicdn.com/imgextra/i3/O1CN01g6ILzY1Gs7GhECdHN_!!6000000000677-2-tps-26-26.png |

### 下拉箭头

| 属性 | 值 |
|------|------|
| 尺寸 | 20×20px |
| 切图 | https://gw.alicdn.com/imgextra/i4/O1CN010GUEsm1pGZLnYT9L2_!!6000000005333-2-tps-14-10.png |

完整结构详见 [example.html](example.html)。
