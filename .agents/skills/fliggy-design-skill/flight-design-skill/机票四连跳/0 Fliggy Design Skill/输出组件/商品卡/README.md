# 商品卡组件

通用信息卡片（固定组件），左图右文布局，适用于酒店、景点 POI、签证、套餐商品等场景。四个变体共享相同 HTML 结构和样式，仅数据填充不同。

## 四种变体

| 变体 | 典型标题 | 信息行内容 | 价格格式 | 按钮文本 |
|------|---------|-----------|---------|---------|
| 酒店卡 | 杭州西湖国宾馆 [豪华型] | 评分 + 推荐率 / 位置 | ¥1280起 + 优惠 | 预订 |
| POI 卡 | 故宫博物院 | 评分 + 点评数 / 区域距离 | 会员价¥40起 | 购票 |
| 签证卡 | 泰国个人旅游签证 | 销量+出签率 / 办理说明 | ¥258.99起 + 优惠 | 办理 |
| 套餐商品卡 | 龙井茶叶特级250g | 月销量 + 产区 / 店铺 | ¥199 + 满减 | 购买 |

## 规范参数（@2x）

### 外层容器 `.info-card-wrapper`

宽度: 690px; 上间距: 24px (`padding-top: 24px`)

### 卡片主体 `.info-card`

| 属性 | 值 |
|------|------|
| 背景色 | var(--color-white) |
| 圆角 | **var(--radius-xl)** |
| 内边距 | 24px |
| 布局 | `display: flex; gap: 24px` |

### 左侧图片 `.card-image`

| 属性 | 值 |
|------|------|
| 宽度 | **140px** |
| 高度 | **210px**（2:3） |
| 圆角 | var(--radius-l) |
| 填充模式 | `background-size: cover; background-position: center` |
| 占位色 | #E0E0E0 |
| 收缩 | `flex-shrink: 0` |

### 右侧内容区 `.card-content`

布局: `flex-grow: 1; flex-direction: column; justify-content: space-between`; 溢出: `min-width: 0`

### 上部信息区 `.content-main`

布局: `flex-direction: column; gap: 6px`

#### 标题行 `.title-line`

布局: `flex; align-items: center; gap: 6px`; 最小高度: 42px

#### 标题 `.card-title`

字号: **30px**; 字重: 500; 颜色: var(--color-darkgray); 行高: 1.4; 溢出: `nowrap; overflow: hidden; text-overflow: ellipsis`

#### 标题标签 `.title-tag`（可选）

| 属性 | 值 |
|------|------|
| 背景色 | var(--color-bg) |
| 圆角 | var(--radius-s) |
| 内边距 | 0 8px |
| 高度 | 32px |
| 字号 | 22px |
| 颜色 | var(--color-lightgray) |
| 收缩 | `flex-shrink: 0` |

#### 信息行 `.info-line`

布局: `flex; align-items: center; gap: 18px`; 字号: 24px; 行高: 1.4; 最小高度: 34px

| 子元素 | 颜色 | 字重 |
|--------|------|------|
| `.rating` | **var(--color-indigo-1)** | 500 |
| `.description` | var(--color-midgray) | 400 |

### 下部价格与操作区 `.content-footer`

布局: `flex; justify-content: flex-end; align-items: center; gap: 12px`

#### 价格区 `.price-area`

布局: `flex-direction: column; align-items: flex-end; gap: 4px`

#### 价格 `.price`

布局: `flex; align-items: flex-end; gap: 2px`; 颜色统一 **var(--color-darkgray)**

| 子元素 | 字号 | 字重 | 字体 |
|--------|------|------|------|
| `.prefix` | 20px | 400 | 系统字体（可选，如"会员价"） |
| `.currency` | 24px | **700** | `Fliggy Sans 102` |
| `.amount-major` | **42px** | 400 | `Fliggy Sans 102`（line-height: 0.64） |
| `.amount-minor` | **28px** | 400 | `Fliggy Sans 102`（可选，如".99"） |
| `.suffix` | 20px | 400 | 系统字体（可选，如"起"） |

#### 优惠标签 `.discount-tag`

字号: 20px; 颜色: **var(--color-pay-1)**; 最小高度/行高: 28px（可选，无优惠时留空占位）

#### 操作按钮 `.action-button`

尺寸: 96x60px; 背景色: var(--color-indigo-4); 文字颜色: var(--color-indigo-1); 字号: 24px; 字重: 600; 圆角: var(--radius-l); 文本随场景变化: "预订"/"购票"/"办理"/"购买"

完整 HTML 结构详见 [example.html](example.html)。
