# 重要提醒卡组件

展示重要提醒信息的警告卡片。

**AI 可配置项**: 修改提醒标题 / 增删提醒内容

## 规范参数（@2x）

### 卡片容器 `.notice-card`

| 属性 | 值 |
|------|------|
| 宽度 | 714px |
| 背景色 | var(--color-white) |
| 圆角 | 12px |
| 内边距 | 24px |

### 提醒头部 `.notice-header`

布局: `flex; align-items: center`; 下间距: 18px

### 提醒图标 `.notice-icon`

尺寸: 32px x 32px; 右间距: 12px; 颜色: var(--color-pay-1)

### 提醒标题 `.notice-title`

字号: 28px; 字重: 600; 颜色: var(--color-darkgray); 行高: 1

### 提醒文本 `.notice-text`

字号: 24px; 颜色: var(--color-darkgray); 行高: 1.5

### 提醒圆点 `.notice-dot`

| 属性 | 值 |
|------|------|
| 尺寸 | 8px x 8px |
| 背景色 | var(--color-pay-1) |
| 圆角 | 50% |
| 右间距 | 12px |

完整 HTML 结构详见 [example.html](example.html)。
