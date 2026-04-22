# 分割组件

机票列表页直飞与中转航班之间的分割区域（固定组件），用于视觉分隔直飞航班列表和中转航班列表。

## 规范参数（@2x）

### 整体容器

| 属性 | 值 |
|------|------|
| 宽度 | 750px |
| 高度 | 90px |
| 背景色 | #F2F3F5 |
| 布局 | flex; flex-direction: row; justify-content: center; align-items: center |
| 其他 | padding: 0; isolation: isolate; position: relative |

### 分栏提示（内容区）

| 属性 | 值 |
|------|------|
| 布局 | flex; flex-direction: row; justify-content: center; align-items: center |
| 内边距 | 24px |
| 间距 | gap: 24px |
| 尺寸 | width: 750px; height: 90px |
| 层级 | z-index: 0 |

### 左侧分割线

| 属性 | 值 |
|------|------|
| 切图 | `https://gw.alicdn.com/imgextra/i1/O1CN012sISRA1g4MFUYzYtV_!!6000000004088-2-tps-220-1.png` |
| 透明度 | 0.5 |
| 弹性 | flex: 1（自适应宽度） |

### 中间文字

| 属性 | 值 |
|------|------|
| 文字 | "以下为其他中转航班" |
| 最大宽度 | 570px |
| 高度 | 34px |
| 字体 | 'PingFang SC' |
| 字号 | 24px |
| 字重 | 400 |
| 行高 | 140% |
| 对齐 | text-align: center |
| 颜色 | #5B5F67 |
| 弹性 | flex: none |

### 右侧分割线

| 属性 | 值 |
|------|------|
| 切图 | `https://gw.alicdn.com/imgextra/i2/O1CN01yVrJ6I1urHAlDG4uo_!!6000000006090-2-tps-220-1.png` |
| 透明度 | 0.5 |
| 弹性 | flex: 1（自适应宽度） |

### 上分割线

| 属性 | 值 |
|------|------|
| 定位 | position: absolute; top: 0; left: 0 |
| 尺寸 | width: 750px; height: 0 |
| 边框 | border: 1px solid #F2F3F5 |
| 层级 | z-index: 1 |

### 下分割线

| 属性 | 值 |
|------|------|
| 定位 | position: absolute; bottom: 0; left: 0 |
| 尺寸 | width: 750px; height: 0 |
| 边框 | border: 1px solid #F2F3F5 |
| 层级 | z-index: 2 |

完整结构详见 [example.html](example.html)。
