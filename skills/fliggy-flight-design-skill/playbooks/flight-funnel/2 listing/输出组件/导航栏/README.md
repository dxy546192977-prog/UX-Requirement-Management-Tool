# 导航栏组件

机票列表页顶部导航栏（固定组件），包含状态栏、返回箭头、出发-到达城市、右侧功能图标组。吸顶固定在页面顶部。

## 规范参数（@2x）

### 整体容器

| 属性 | 值 |
|------|------|
| 宽度 | 750px |
| 高度 | 176px（状态栏88px + 导航栏88px） |
| 背景色 | var(--color-white) |
| 定位 | position: fixed; top: 0; z-index: 9999 |
| 布局 | flex-direction: column; align-items: flex-start |

### 状态栏 `.status-bar`

| 属性 | 值 |
|------|------|
| 宽度 | 750px |
| 高度 | 88px |
| 背景色 | var(--color-white) |

### 导航栏 `.navbar`

| 属性 | 值 |
|------|------|
| 宽度 | 750px |
| 高度 | 88px |
| 背景色 | var(--color-white) |
| 布局 | flex; align-items: center; justify-content: center |
| 内边距 | 0 24px |

### 返回箭头 `.back-btn`

| 属性 | 值 |
|------|------|
| 尺寸 | 48×48px |
| 定位 | position: absolute; left: 24px; top: 20px |
| 图标 | 48×48px |
| 切图 | https://gw.alicdn.com/imgextra/i1/O1CN01DTmWga1piVVizwK8x_!!6000000005394-2-tps-48-48.png |

### OD城市区 `.od-cities`

| 属性 | 值 |
|------|------|
| 布局 | flex; align-items: center; gap: 6px |
| 城市字体 | 'PingFang SC' |
| 城市字号 | 30px |
| 城市字重 | 500 |
| 城市颜色 | var(--color-primary) |
| 城市行高 | 140% (42px) |
| 箭头图标 | 42×42px |
| 箭头切图 | https://gw.alicdn.com/imgextra/i1/O1CN015RbuWn1af6KRGgKmO_!!6000000003356-2-tps-42-42.png |
| 下拉箭头 | 20×20px |
| 下拉切图 | https://gw.alicdn.com/imgextra/i1/O1CN01zck7uV1dv4zfuDTnt_!!6000000003797-2-tps-20-20.png |

### 右侧图标组 `.nav-icons`

| 属性 | 值 |
|------|------|
| 定位 | position: absolute; right: 24px |
| 布局 | flex; flex-direction: row; align-items: center; gap: 12px |
| 尺寸 | 168×48px |
| 图标尺寸 | 48×48px |

#### 出行提醒 `.travel-alert`
| 属性 | 值 |
|------|------|
| 容器尺寸 | 48×48px |
| 布局 | flex-direction: column; align-items: center; gap: 3px |
| 图标尺寸 | 34×36px |
| 切图 | https://gw.alicdn.com/imgextra/i3/O1CN01IeFyHa1IyBkceWSy1_!!6000000000961-2-tps-34-36.png |
| 文字 | '出行提醒' |
| 文字字号 | 12px |
| 文字行高 | 17px (140%) |
| 文字颜色 | var(--color-primary) |

#### 低价提醒 `.price-alert`
| 属性 | 值 |
|------|------|
| 容器尺寸 | 48×48px |
| 布局 | position: relative |
| 图标尺寸 | 36×36px |
| 图标定位 | position: absolute; left: 6px; top: 0 |
| 切图 | https://gw.alicdn.com/imgextra/i1/O1CN015uzCtj1heN0PLsbOK_!!6000000004302-2-tps-36-36.png |
| 文字 | '低价提醒' |
| 文字宽度 | 50px |
| 文字定位 | position: absolute; left: calc(50% - 50px/2); top: calc(50% - 17px/2 + 23.5px) |
| 文字字号 | 12px |
| 文字行高 | 17px (140%) |
| 文字颜色 | var(--color-primary) |

#### 更多
| 属性 | 值 |
|------|------|
| 切图 | https://gw.alicdn.com/imgextra/i1/O1CN014bSFyZ1xCv7asQHR9_!!6000000006408-2-tps-48-48.png |

完整结构详见 [example.html](example.html)。
