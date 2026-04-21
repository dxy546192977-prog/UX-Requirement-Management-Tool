# 酒店预订信息卡组件

展示酒店预订摘要信息的卡片，包含日期、房型、取消政策、订房必读等关键信息。

**AI 可配置项**: 修改日期范围 / 修改房型信息 / 增删标签 / 配置订房必读内容

## 规范参数（@2x）

### 卡片容器 `.booking-info-card`

| 属性 | 值 |
|------|------|
| 宽度 | 714px |
| 背景色 | var(--color-white) |
| 圆角 | 12px |
| 内边距 | 24px |

### 头部 `.card-header`

布局: `flex; justify-content: space-between; align-items: center`; 下间距: 18px

#### 预订摘要 `.booking-summary`

| 属性 | 值 |
|------|------|
| 布局 | `flex; flex-wrap: wrap; align-items: center; gap: 0` |
| 字号 | 30px |
| 字重 | 500 |
| 颜色 | var(--color-darkgray) |

#### 日期分隔线 `.date-divider`

尺寸: 20px x 2px; 背景: var(--color-lightgray); 横向间距: 8px

#### 晚数分隔线 `.night-divider`

尺寸: 2px x 30px; 背景: var(--color-lightgray); 横向间距: 8px

#### 详情链接 `.card-link`

布局: `flex; align-items: center; gap: 6px`; 字号: 24px; 颜色: var(--color-darkgray); 箭头图标: 12px x 20px

### 房型详情 `.booking-detail-list`

| 属性 | 值 |
|------|------|
| 字号 | 26px |
| 颜色 | var(--color-darkgray) |
| 行高 | 1.7 |
| 下间距 | 18px |
| 最大宽度 | 540px |

#### 信息分隔线 `.divider`

尺寸: 2px x 28px; 背景: var(--color-lightgray); 横向间距: 12px

### 标签区域 `.booking-tags`

布局: `flex; align-items: center; gap: 10px`; 下间距: 18px

#### 免费取消标签 `.booking-tag`

| 属性 | 值 |
|------|------|
| 内边距 | 2px 6px |
| 边框 | 1px solid #14A883 |
| 圆角 | 6px |
| 字号 | 20px |
| 颜色 | #14A883 |

#### 确认标签 `.booking-tag-confirm`

| 属性 | 值 |
|------|------|
| 内边距 | 2px 6px |
| 边框 | 1px solid #D2D4D9 |
| 圆角 | 6px |
| 字号 | 20px |
| 颜色 | var(--color-midgray) |

### 订房必读 `.booking-notice`

布局: `flex; justify-content: space-between; align-items: center`

#### 须知文本 `.booking-notice-text`

| 属性 | 值 |
|------|------|
| 布局 | `flex; align-items: center; flex: 1` |
| 字号 | 26px |
| 颜色 | #919499 |
| 描述文本 | 单行省略 `text-overflow: ellipsis` |

#### 须知链接 `.booking-notice-link`

布局: `flex; align-items: center; gap: 6px`; 字号: 24px; 颜色: var(--color-darkgray)

完整 HTML 结构详见 [example.html](example.html)。
