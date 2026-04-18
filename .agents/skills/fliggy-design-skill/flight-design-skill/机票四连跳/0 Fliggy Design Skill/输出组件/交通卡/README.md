# 交通卡组件

交通信息卡片（固定组件），用于展示机票、火车票、汽车票等出行方案。三种变体共享统一布局，仅在图标、辅助信息和价格区细节上有差异。AI 根据交通类型选择对应变体并填充行程数据。

## 三种变体对比

| 属性 | 机票卡 | 火车票卡 | 汽车票卡 |
|------|--------|---------|---------|
| 图标底色 | #4DA6FF（蓝色） | #0BC968（绿色） | #FFC522（黄色） |
| 图标图案 | 飞机 | 火车 | 巴士 |
| 头部文本 | "机票丨{日期} {城市}" | "火车票丨{日期} {城市}" | "汽车票丨{日期} {城市}" |
| 辅助信息行数 | **2 行**（22px） | 1 行（20px） | 1 行（20px） |
| 价格区 | 原价删除线 + 现价 + 优惠标签 | 仅现价 | 仅现价 |
| 卡片内部 gap | 12px | 10px | 10px |

## 共享规范参数（@2x）

### 卡片容器

| 属性 | 值 |
|------|------|
| 宽度 | 690px |
| 背景色 | var(--color-white) |
| 圆角 | **var(--radius-xl)** |
| 内边距 | 24px |
| 布局 | `flex-direction: column` |

### 头部 `.card-header`

布局: `flex; align-items: center; gap: 12px`; 图标: 32x32px 圆形内嵌 SVG; 标题: 24px / 400 / 行高 1.7 / var(--color-darkgray); 格式: `{交通类型}丨{月日周几} {出发城市}-{到达城市}`

### 内容区 `.card-body`

布局: `flex; justify-content: space-between`; 左侧: flex-column, gap: 18px; 右侧: flex-column, align-items: flex-end

### 行程区 `.itinerary`

上内边距: 24px; 布局: `flex; justify-content: space-between; align-items: center`

#### 出发/到达

| 属性 | 值 |
|------|------|
| 时间字号 | **42px** |
| 时间字体 | `'Fliggy Sans 102', 'PingFang SC', 'SimHei', sans-serif` |
| 时间颜色 | var(--color-darkgray) |
| 站点字号 | 22px |
| 站点颜色 | var(--color-darkgray) |
| 时间与站点间距 | 14px |
| 出发对齐 | `align-items: flex-start` |
| 到达对齐 | `align-items: flex-end` |

#### 中间连线

布局: `flex: 1; flex-direction: column; align-items: center; gap: 4px`; 时长: 22px / #999999; 箭头线: #E6E7EB（0.8 透明度）

### 预订按钮

尺寸: 96x60px; 背景色: var(--color-indigo-4); 文字颜色: var(--color-indigo-1); 字号: 24px; 字重: 600; 圆角: var(--radius-l); 文本: "预订"

## 机票卡专属参数

### 左侧信息区

宽度: 420px; 卡片 gap: 12px

### 辅助信息（2 行）

**第 1 行**（航司信息）: 布局 `flex; align-items: center; gap: 6px; height: 32px`; 22px / var(--color-lightgray); 内容: 航司 Logo（25x25px）+ 航司名称 + 航班号 + 分隔线(1px x 18px, #D2D4D9) + 机型

**第 2 行**（票务信息）: 舱位折扣 + 分隔线 + 行李额度 + 分隔线 + 退改费用; 颜色: **var(--color-darkgray)**（深色）

### 价格区（完整版）

| 属性 | 值 |
|------|------|
| 上内边距 | 24px |
| 下内边距 | 12px |
| 原价 | 20px / var(--color-lightgray) / `text-decoration: line-through` |
| 现价符号 | `'Fliggy Sans 102'` / 24px / 700 |
| 现价数字 | `'Fliggy Sans 102'` / **42px** / var(--color-darkgray) |
| 原价与现价间距 | 5px |

### 优惠标签

高度: 28px; 内边距: 0 4px; 字号: 20px; 颜色: **var(--color-pay-1)**; 分隔线: 1px dashed, 高度 14px, 颜色 #FFB2A3

## 火车票卡 / 汽车票卡 专属参数

### 左侧信息区

宽度: 自适应; 卡片 gap: 10px

### 辅助信息（1 行）

字号: 20px; 颜色: var(--color-lightgray); 分隔线: 1px x 18px, #E0E0E0
- 火车票: 铁路局 + 车次 + 分隔线 + 车型
- 汽车票: 运营商 + 分隔线 + 车型/座型

### 价格区（简化版）

上内边距: 24px; 现价符号/数字与机票卡相同; 无原价、无优惠标签

完整 HTML 结构详见 [example.html](example.html)。
