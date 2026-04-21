# 入住信息卡组件

入住信息表单卡片，包含房间数量控制、入住人信息、联系方式、邮箱等表单单元。

**AI 可配置项**: 修改房间数量 / 增删表单单元 / 配置标签内容

## 规范参数（@2x）

### 卡片容器 `.checkin-card`

| 属性 | 值 |
|------|------|
| 宽度 | 714px |
| 背景色 | var(--color-white) |
| 圆角 | 0 0 var(--radius-l) var(--radius-l) |
| 内边距 | 0 24px |

### 卡片头部 `.card-header`

| 属性 | 值 |
|------|------|
| 高度 | 90px |
| 布局 | `flex; justify-content: space-between; align-items: center` |
| 下间距 | 0 |

#### 卡片标题 `.card-title`

字号: 32px; 字重: 600; 颜色: var(--color-darkgray)

### 房间数量控制 `.room-control`

布局: `flex; align-items: center; gap: 12px`

#### 房间数量步进器 `.room-stepper`

| 属性 | 值 |
|------|------|
| 宽度 | 190px |
| 内边距 | 5px |
| 背景色 | #F7F8FA |
| 圆角 | 100px |
| 布局 | `flex; align-items: center; justify-content: space-between` |

#### 步进按钮 `.room-btn`

尺寸: 42px x 42px; 背景: 透明; 边框: 无

#### 房间数量 `.room-count`

字号: 32px; 字重: 600; 颜色: var(--color-darkgray)

### 表单单元 `.form-cell`

| 属性 | 值 |
|------|------|
| 高度 | 90px |
| 布局 | `flex; align-items: center` |
| 内边距 | 0 |

#### 单元标签 `.cell-label`

| 属性 | 值 |
|------|------|
| 宽度 | 180px |
| 字号 | 28px |
| 颜色 | var(--color-lightgray) |

#### 单元值区域 `.cell-value-area`

| 属性 | 值 |
|------|------|
| 布局 | `flex: 1; display: flex; align-items: center` |
| 高度 | 100% |
| 底部边框 | 1px solid #EEEEEE（最后一个无） |

#### 单元值 `.cell-value`

字号: 28px; 字重: 500; 颜色: var(--color-darkgray)

#### 占位符 `.cell-placeholder`

字号: 28px; 颜色: #D2D4D9

#### 单元操作区 `.cell-action`

布局: `flex; align-items: center; gap: 12px; margin-left: auto`

#### 帮人代订标签 `.cell-tag`

| 属性 | 值 |
|------|------|
| 内边距 | 12px 24px |
| 背景色 | #F5F5F7 |
| 圆角 | 100px |
| 字号 | 24px |
| 颜色 | var(--color-lightgray) |

### 图标规范

| 图标 | 尺寸 | 资源路径 |
|------|------|------|
| `.booking-tip-icon` | 32px x 32px | assets/like.png |
| `.room-btn img` | 42px x 42px | assets/reduce.png / assets/add.png |
| `.info-icon` | 24px x 24px | assets/提示.png |
| `.cell-icon` (入住人) | 42px x 42px | assets/guest.png |
| `.cell-icon` (联系方式) | 42px x 42px | assets/phone.png |

完整 HTML 结构详见 [example.html](example.html)。
