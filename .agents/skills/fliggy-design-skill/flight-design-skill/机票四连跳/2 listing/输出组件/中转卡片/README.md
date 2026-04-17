# 中转卡片组件

机票列表页中转航班卡片（固定组件）。当前目录已按 `listing.png` 与 `listing css.txt` 重新校准，直接对应列表页中转区真实出现的 6 张卡片，而不是之前错误抽象成的 5 张。

## 变体总览

| 变体 | 文件 | 卡片高度 | 中间信息块 | 服务区 |
|------|------|----------|-----------|--------|
| 普通中转型 | `普通中转型.html` | 212px | `乌鲁木齐转 / 停3h30m` | `中转服务 + 航变保障·免费休息区·消费补贴` |
| 跨天中转型 | `跨天中转型.html` | 212px | `西安转 / 停3h30m`，到达侧带日期 | `中转服务 + 航变保障·免费休息区·消费补贴` |
| 联程服务型 | `联程服务型.html` | 212px | `重庆联程 / 停22h45m` | `联程服务 + 凯悦80元优惠券包` |
| 通程服务型 | `通程服务型.html` | 212px | `重庆通程 / 停22h45m` | `通程服务 + 凯悦80元优惠券包` |
| 共享航班中转型 | `共享航班中转型.html` | 212px | `1停1转 / 停8h30m`，到达侧带日期 | `中转服务 + 航变保障·免费休息区·消费补贴` |
| 共享航班玩1天型 | `共享航班玩1天型.html` | 212px | `杭州转 / 玩1天`，紫色中转文案 | `中转服务 + 航变保障·免费休息区·消费补贴` |

## 共享骨架

### 卡片容器

| 属性 | 值 |
|------|------|
| 宽度 | 750px |
| 高度 | 212px |
| 背景色 | `var(--color-white)` |
| 分隔线 | `1px solid var(--color-bg)` |
| 内边距 | `42px 30px 24px` |
| 布局 | `display:flex; justify-content:space-between; align-items:flex-start` |

### 左侧信息区

| 属性 | 值 |
|------|------|
| 宽度 | 430px |
| 布局 | `display:flex; flex-direction:column; gap:18px` |
| OD 行高度 | 68px |
| 出发/到达时间 | `Fliggy Sans 102`, 42px, 700, `var(--color-primary)` |
| 机场名称 | PingFang SC, 22px, `var(--color-primary)` |

### 中间信息块

分两类：

1. 普通中转骨架
   - 区域宽度 136px
   - 起飞/降落之间统一复用直飞卡片同款航线箭头切图：`https://gw.alicdn.com/imgextra/i4/O1CN01Zz6fJr1hyypVXg88S_!!6000000004347-2-tps-124-68.png`
   - 中间标签：白底、2px 描边、6px 圆角，左右 `8px` 内边距，宽度随文案自适应
   - 下方补充文案：20px，深色
2. 共享航班骨架
   - 区域宽度 124px
   - 同样复用直飞同款航线箭头切图，但中间文案更紧凑
   - `共享航班玩1天型` 的中转标签和第二行文案使用紫色 `#6666FF`

### 航司信息行

| 属性 | 值 |
|------|------|
| 布局 | `display:flex; align-items:center; gap:8px` |
| 文字 | PingFang SC, 20px |
| 常规文本色 | `var(--color-secondary)` |
| 强调文本 | `可平躺` 使用 `var(--color-accent)` |
| 分隔线 | `1px × 20px`, `var(--color-divider)` |
| 可平躺箭头 | `https://gw.alicdn.com/imgextra/i1/O1CN01XtHUaA1GvmR9qkuqh_!!6000000000685-2-tps-12-7.png`，12×7px |

### 服务区

#### 服务条形态（普通中转 / 共享中转）

| 元素 | 样式 |
|------|------|
| 左侧 service chip | 28px 高，灰色描边，icon + 文案 |
| 右侧说明文案 | PingFang SC, 20px, `var(--color-secondary)` |

#### 双 chip 形态（联程 / 通程）

| 元素 | 样式 |
|------|------|
| 服务 chip | `联程服务` / `通程服务` |
| 优惠 chip | 心形 icon + `凯悦80元优惠券包`，chip 外侧紧跟一个 `12×7` 外置箭头 |

### 价格区

| 属性 | 值 |
|------|------|
| 布局 | `display:flex; flex-direction:column; align-items:flex-end; gap:12px` |
| 删除线原价 | PingFang SC, 20px, `var(--color-secondary)` |
| 价格符号 | `Alibaba Sans 102`, 24px, 700, `var(--color-price)` |
| 价格数字 | `Fliggy Sans 102`, 42px, 700, `var(--color-price)` |
| 优惠条 | 28px 高，浅橙渐变底 |
| 舱位文案 | PingFang SC, 22px, `var(--color-secondary)` |

说明：

- `普通中转型` 和 `跨天中转型` 的优惠条文案是 `2项已优惠¥70›`。
- `联程服务型` 和 `通程服务型` 的优惠条也是 `2项已优惠¥70›`，但舱位文案是 `经济舱3.3折`。
- 两个共享航班变体的优惠条为 `新人特惠 | 3项已优惠¥70›`，中间用虚线分隔。

## 切图映射

以下路径均以组件 HTML 文件所在目录为基准：

| 元素 | 相对路径 | 尺寸 |
|------|----------|------|
| 山航 logo | `../../../list切图/山航logo.png` | 20×20 |
| 东航 logo | `../../../list切图/东方航空logo.png` | 20×20 |
| 国航 logo | `../../../ota切图/国航logo.png` | 20×20 |
| 航线箭头 | `https://gw.alicdn.com/imgextra/i4/O1CN01Zz6fJr1hyypVXg88S_!!6000000004347-2-tps-124-68.png` | 124×68 |
| 中转服务 icon | `../../../list切图/权益标小icon_中转logo.png` | 20×20 |
| 优惠券 icon | `../../../list切图/权益标小icon.png` | 20×20 |
| 可平躺箭头 | `https://gw.alicdn.com/imgextra/i1/O1CN01XtHUaA1GvmR9qkuqh_!!6000000000685-2-tps-12-7.png` | 12×7 |
| 联程/通程优惠外置箭头 | `https://gw.alicdn.com/imgextra/i1/O1CN01XtHUaA1GvmR9qkuqh_!!6000000000685-2-tps-12-7.png` | 12×7 |

## 页面对应顺序

`listing.png` 中转区真实顺序如下：

1. 跨天中转型
2. 普通中转型
3. 联程服务型
4. 通程服务型
5. 共享航班玩1天型
6. 共享航班中转型

根目录 `example.html` 已按这个顺序重新拼装。
