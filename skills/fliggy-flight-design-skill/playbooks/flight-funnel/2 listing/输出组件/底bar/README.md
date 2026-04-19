# 底bar组件

机票列表页底部排序栏（固定组件），提供时间排序、低价优先、惠后价三种排序方式。吸底固定显示。

## 规范参数（@2x）

### 外层容器 `.bottom-bar`

| 属性 | 值 |
|------|------|
| 布局 | display: flex; flex-direction: column; align-items: flex-start |
| 内边距 | 0 |
| 定位 | position: fixed; bottom: 0; left: 0; z-index: 9999 |
| 尺寸 | 750×160px |
| 阴影 | filter: drop-shadow(0px 6px 20px rgba(0, 0, 0, 0.1)) |

### 按钮区 `.bottom-bar__button-area`

| 属性 | 值 |
|------|------|
| 布局 | display: flex; flex-direction: row; align-items: center |
| 内边距 | 0 24px |
| 尺寸 | 750×96px |
| 背景 | #FFFFFF |
| 圆角 | 24px 24px 0 0 |
| 其他 | flex: none; order: 0; align-self: stretch; flex-grow: 0 |

### 单个按钮 `.bottom-bar__button`

| 属性 | 值 |
|------|------|
| 布局 | display: flex; flex-direction: column; justify-content: center; align-items: center |
| 内边距 | 0 48px |
| 间距 | gap: 6px |
| 尺寸 | 234×96px |
| 背景 | #FFFFFF |
| 其他 | flex: none; align-self: stretch; flex-grow: 1 |

### 按钮图标 `.bottom-bar__icon`

| 属性 | 值 |
|------|------|
| 尺寸 | 36×36px |
| 其他 | flex: none; order: 0; flex-grow: 0 |

### 文字区 `.bottom-bar__label`

| 属性 | 值 |
|------|------|
| 布局 | display: flex; flex-direction: row; justify-content: center; align-items: center |
| 间距 | gap: 6px |
| 高度 | 28px |
| 其他 | flex: none; order: 1; align-self: stretch; flex-grow: 0 |

### 按钮文字 `.bottom-bar__text`

| 属性 | 值 |
|------|------|
| 字体 | 'PingFang SC' |
| 字号 | 20px |
| 行高 | 140%（28px） |
| 字重 | 400（普通态）/ 500（选中态 `.active`） |
| 颜色 | #0E131B |
| 对齐 | text-align: center |

### 更多箭头 `.bottom-bar__arrow`

| 属性 | 值 |
|------|------|
| 显示 | display: none（隐藏） |
| 尺寸 | 12×6.75px |
| 颜色 | #0E131B |

### iPhone安全区 `.bottom-bar__safe-area`

| 属性 | 值 |
|------|------|
| 尺寸 | 750×64px |
| 背景 | #FFFFFF |
| 其他 | flex: none; order: 1; align-self: stretch; flex-grow: 0; position: relative |

### 底部条 `.bottom-bar__home-indicator`

| 属性 | 值 |
|------|------|
| 定位 | position: absolute; left: calc(50% - 268px/2 + 1px); top: calc(50% - 10px/2 + 15px) |
| 尺寸 | 268×10px |
| 圆角 | 20px |
| 切图 | `https://gw.alicdn.com/imgextra/i1/O1CN01kYyq8C1SeAb6K7wIx_!!6000000002271-2-tps-268-10.png` |

### 三个按钮（Figma 中 order 从左到右）

| 序号 | 按钮 | order | 选中态 | 图标切图 |
|------|------|-------|--------|----------|
| 03 | 时间排序 | 0 | 普通（400） | `https://gw.alicdn.com/imgextra/i4/O1CN017xYij91ps7pOwTilH_!!6000000005415-2-tps-36-36.png` |
| 02 | 低价优先 | 1 | **选中（500）** | `https://gw.alicdn.com/imgextra/i2/O1CN01KKwfc41KPUz474TW3_!!6000000001156-2-tps-36-36.png` |
| 01 | 惠后价 | 2 | 普通（400） | `https://gw.alicdn.com/imgextra/i2/O1CN016nCy0c1QOTnUhCRVh_!!6000000001966-2-tps-36-36.png` |

完整结构详见 [example.html](example.html)。
