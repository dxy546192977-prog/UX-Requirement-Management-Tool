# 图片组件

AI 回复中的图片展示组件，支持 1 图、2 图、3 图三种布局模式，所有图片**强制 1:1 正方形比例**。固定组件，AI 根据图片数量选择对应布局，填充图片 URL 和标签文本。

## 规范参数（@2x）

### 容器 `.image-gallery`

| 属性 | 值 |
|------|------|
| 宽度 | 690px |
| 布局 | `display: flex;` |
| 图片间距 | 12px (`gap: 12px`) |
| 上间距 | 24px (`padding-top: 24px`) |

### 图片项 `.item`

| 属性 | 值 |
|------|------|
| 比例 | `aspect-ratio: 1 / 1`（强制正方形） |
| 分配 | `flex: 1` |
| 溢出 | `overflow: hidden` |
| 图片填充 | `object-fit: cover` |

### 各布局圆角

1 图 (layout-1): var(--radius-xl) | 2 图 (layout-2): var(--radius-l) | 3 图 (layout-3): var(--radius-l)

### 图片标签 `.tag`

| 属性 | 值 |
|------|------|
| 定位 | `position: absolute; top: 12px; left: 12px;` |
| 背景 | `rgba(0, 0, 0, 0.6)` |
| 圆角 | var(--radius-m) |
| 内边距 | 2px 10px |
| 文字颜色 | var(--color-white) |
| 字号 | 20px |
| 字重 | 400 |
| 行高 | 1.4 |

完整 HTML 结构详见 [example.html](example.html)。
