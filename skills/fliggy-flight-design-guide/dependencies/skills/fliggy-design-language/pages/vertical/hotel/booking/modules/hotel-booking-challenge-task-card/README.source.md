# 挑战任务卡组件

展示挑战任务（如住五送一）的卡片。

**AI 可配置项**: 修改任务标题 / 修改任务描述 / 配置奖励内容

## 规范参数（@2x）

### 卡片容器

| 属性 | 值 |
|------|------|
| 宽度 | 714px |
| 背景色 | var(--color-white) |
| 圆角 | 12px |
| 内边距 | 24px |

### 卡片标题

字号: 32px; 字重: 500; 颜色: var(--color-darkgray); 下间距: 24px

### 任务行

布局: `flex; justify-content: space-between; align-items: center`

### 任务名称区

布局: `flex; align-items: center; gap: 8px`

### 任务名称

字号: 28px; 颜色: var(--color-lightgray)

### 任务奖励区

布局: `flex; align-items: center; gap: 16px`

### 任务奖励文字

字号: 28px; 颜色: var(--color-darkgray)

### 图标规范

| 图标 | 尺寸 |
|------|------|
| 帮助图标 | 28px x 28px |
| 单选按钮 | 44px x 44px |

完整 HTML 结构详见 [example.html](example.html)。
