# 出行保障卡组件

展示出行保障服务选项的卡片，包含保险产品列表和更多保障展开提示。

**AI 可配置项**: 增删保障项目 / 修改价格 / 配置描述内容

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

### 保障项 `.protection-item`

| 属性 | 值 |
|------|------|
| 布局 | `flex; justify-content: space-between; align-items: center` |
| 内边距 | 20px 0 |
| 底部边框 | 1px solid #EEEEEE（最后一个无） |

### 保障左侧 `.protection-left`

布局: `flex; flex-direction: column; gap: 8px; flex: 1`

### 保障标题 `.protection-title`

| 属性 | 值 |
|------|------|
| 布局 | `flex; align-items: center; gap: 8px` |
| 字号 | 28px |
| 颜色 | var(--color-darkgray) |

### 保障描述 `.protection-desc`

字号: 24px; 颜色: var(--color-lightgray)

### 保障价格 `.protection-price`

字号: 26px; 颜色: var(--color-darkgray); 右间距: 18px

### 更多保障提示

字号: 22px; 颜色: var(--color-lightgray); 上间距: 12px; 居中对齐

### 图标规范

| 图标 | 尺寸 |
|------|------|
| 提示图标 | 28px x 28px |
| 展开图标 | 24px x 24px |
| 单选按钮 | 44px x 44px |

完整 HTML 结构详见 [example.html](example.html)。
