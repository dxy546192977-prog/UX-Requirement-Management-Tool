# 发票报销卡组件

展示发票报销相关信息和标签的卡片。

**AI 可配置项**: 修改描述文字 / 增删发票标签

## 规范参数（@2x）

### 卡片容器

| 属性 | 值 |
|------|------|
| 宽度 | 714px |
| 背景色 | var(--color-white) |
| 圆角 | 12px |
| 内边距 | 24px |

### 卡片标题 `.card-title`

字号: 32px; 字重: 600; 颜色: var(--color-darkgray); 下间距: 18px

### 描述文字

字号: 28px; 颜色: var(--color-darkgray); 下间距: 12px

### 发票标签 `.invoice-tag`

| 属性 | 值 |
|------|------|
| 内边距 | 6px 10px |
| 边框 | 1px solid #E6E7EB |
| 圆角 | 4px |
| 字号 | 20px |
| 颜色 | var(--color-lightgray) |

### 标签容器

布局: `flex; gap: 12px; flex-wrap: wrap`

### 图标规范

帮助图标: 28px x 28px

完整 HTML 结构详见 [example.html](example.html)。
