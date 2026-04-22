# 营销条组件

机票列表页营销信息条（固定组件），展示购买优惠、促销活动等营销信息。位于日历下方、快筛栏上方。

## 规范参数（@2x）

### 外容器

| 属性 | 值 |
|------|------|
| 宽度 | 750px |
| 高度 | 96px |
| 背景色 | var(--color-bg) (#F2F3F5) |
| 布局 | flex-direction: column; align-items: flex-start; gap: 10px |
| 内边距 | 12px |

### 内容容器

| 属性 | 值 |
|------|------|
| 宽度 | 726px |
| 高度 | 72px |
| 背景色 | var(--color-white) |
| 圆角 | var(--radius-l) (12px) |
| 布局 | flex; align-items: center; gap: 12px |
| 内边距 | 0 24px |

### Logo区域

| 属性 | 值 |
|------|------|
| 布局 | flex; align-items: center; gap: 6px |
| 图标尺寸 | 154×30px |
| 切图 | https://gw.alicdn.com/imgextra/i2/O1CN01LNtweJ1ywYCGM029m_!!6000000006643-2-tps-154-30.png |

### 文本区域

| 属性 | 值 |
|------|------|
| 布局 | flex; flex-direction: row; align-items: center |
| 普通文字字体 | 'PingFang SC' |
| 普通文字字号 | 26px |
| 普通文字字重 | 400 |
| 普通文字行高 | 140% |
| 普通文字颜色 | var(--color-primary) (#0E131B) |
| 高亮数字字体 | 'Alibaba Sans 102' |
| 高亮数字字号 | 26px |
| 高亮数字字重 | 700 |
| 高亮数字行高 | 140% |
| 高亮数字颜色 | var(--color-price) (#FF4119) |
| 高亮文字字体 | 'PingFang SC' |
| 高亮文字字号 | 26px |
| 高亮文字字重 | 400 |
| 高亮文字行高 | 140% |
| 高亮文字颜色 | var(--color-price) (#FF4119) |

### 右侧箭头

| 属性 | 值 |
|------|------|
| 尺寸 | 12×12px |
| 切图 | https://gw.alicdn.com/imgextra/i3/O1CN01r65nUg1Eh0QgL9Edx_!!6000000000382-2-tps-12-12.png |

完整结构详见 [example.html](example.html)。
