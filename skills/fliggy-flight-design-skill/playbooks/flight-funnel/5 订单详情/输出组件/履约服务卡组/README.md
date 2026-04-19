# 履约服务卡组

履约区的服务卡片集合，通常包含一个强动作卡（如国际值机）和一个信息提示卡（如出行必读）。适合放在订单状态头部之后。

**AI 可配置项**：修改主卡标题 / 配置主按钮文案 / 配置预定编码与可复制项 / 修改提示卡标题与标签组 / 控制是否显示次按钮

## 模块组成

### 1. 主服务卡 `.service-primary-card`

用于值机、在线选座、航变处理等强动作场景。

#### 卡片容器

| 属性 | 值 |
|------|------|
| 宽度 | 714px |
| 背景色 | var(--color-white) |
| 圆角 | var(--radius-l) |
| 布局 | `flex-direction: column` |

#### 顶部浅色头 `.service-primary-head`

| 属性 | 值 |
|------|------|
| 高度 | 84px |
| 背景色 | var(--color-brand-soft) |
| 内边距 | `18px 24px` |
| 圆角 | `12px 12px 0 0` |

#### 主操作按钮 `.service-cta`

| 属性 | 值 |
|------|------|
| 宽度 | 140px |
| 高度 | 48px |
| 背景色 | var(--color-emphasis) |
| 圆角 | var(--radius-pill) |
| 文字 | 24px / 500 / var(--color-darkgray) |

#### 信息列表 `.service-primary-body`

信息区使用两行文本，第一行可携带复制操作，第二行用于补充说明。

### 2. 提示卡 `.service-note-card`

用于出行必读、防诈骗、托运规则、证件提醒等轻动作场景。

#### 头部 `.note-card-head`

| 属性 | 值 |
|------|------|
| 布局 | `flex; justify-content: space-between; align-items: center;` |
| 图标尺寸 | 36 x 36px |
| 标题字号 | 28px / 500 |
| 次按钮 | 140 x 48px，描边按钮 |

#### 标签串 `.note-tags`

使用横向标签排列，字号 24px，颜色 `var(--color-midgray)`，标签间用 20px 竖线分隔。

完整 HTML 结构详见 [example.html](example.html)。
