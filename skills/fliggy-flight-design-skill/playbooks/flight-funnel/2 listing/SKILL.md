---
name: fliggy-design-flight-listing-skill
description: 飞猪机票航班列表页（Listing）移动端 UI 设计规范。当需要生成飞猪风格的机票搜索结果列表页、航班列表页面时使用此 Skill。涵盖导航栏、日历、快筛栏、直飞/中转航班卡片、省钱推荐、底部排序栏等完整组件规范。
---

# Fliggy Design Flight Listing Skill

飞猪机票航班列表页（Listing）的移动端 UI 设计规范，指导大模型输出符合飞猪设计标准的 HTML + CSS 代码。

> **读取策略（重要）**：本文件是唯一入口，包含所有决策所需的信息。**禁止一次性读取全部组件文件。** 正确流程：读完本文件 → 需求分析 → 确定需要的组件 → 仅读取对应的组件 README → 生成代码。example.html 仅在组件结构不明确时才查阅。

## 一、技术基准

- 输出格式：单文件 HTML + 内联 CSS（`<style>` 标签）
- 目标平台：移动端（App WebView / H5）
- 设计基准：750 × 1624px（@2x），所有组件标注均为 @2x px 值
- **适配方案**：通过固定 viewport 宽度实现等比缩放，`<head>` 中必须包含：
  ```html
  <meta name="viewport" content="width=750, user-scalable=no">
  ```
  原理：浏览器将布局视口锁定为 750px，在不同宽度的设备上自动等比缩放（375px 设备 → 缩放 0.5×，414px → 0.552×）。因此所有组件直接使用 @2x px 值书写，无需做任何单位换算。
- 页面背景色：#F2F3F5
- 布局结构：导航栏吸顶、底bar吸底、中间内容区可滚动
- 根目录 `listing.png` 与 `listing css.txt` 是最终还原基准；根目录 `example.html` 是当前完整拼装稿，应始终与这两份参考保持一致

## 二、Design Tokens（全局规范，始终生效）

### 字体

```css
@font-face {
  font-family: 'Fliggy Sans 102';
  src: url('https://g.alicdn.com/trip/common-assets/1.1.9/fonts/FliggySans102-Md.ttf') format('truetype');
  font-weight: 500;
  font-display: swap;
}
```

- 数字/货币字体：`font-family: 'Fliggy Sans 102', 'PingFang SC', 'SimHei', sans-serif; font-weight: bold;`
- 价格符号字体：`font-family: 'Alibaba Sans 102', 'PingFang SC', 'SimHei', sans-serif; font-weight: 700;`
- 默认汉字字体：`font-family: 'PingFang SC', 'SimHei', sans-serif;`

### 颜色

```css
:root {
  --color-primary: #0E131B;      /* 主文字色 */
  --color-secondary: #90949A;    /* 次要文字、航司信息 */
  --color-muted: #5B5F67;        /* 分割文案、弱提示 */
  --color-price: #FF4119;        /* 价格色、优惠标签 */
  --color-accent: #009DAA;       /* 强调色：少量余票、省钱推荐 */
  --color-indigo: #6666FF;       /* 共享航班“玩1天”紫色中转态 */
  --color-white: #FFFFFF;        /* 卡片背景 */
  --color-bg: #F2F3F5;           /* 页面背景、分割线 */
  --color-bg-light: #F7F8FA;     /* 筛选项背景 */
  --color-bg-card: #FAFAFA;      /* 推荐卡片背景 */
  --color-border: #E6E7EB;       /* 边框色 */
  --color-divider: #E0E0E0;      /* 分隔线 */
  --color-selected: #FFE747;     /* 日历选中态 */
  --color-selected-bg: #FFFCE9;  /* 筛选选中背景 */
  --color-selected-border: #FFDF00; /* 筛选选中边框 */
  --color-heart: #212121;        /* 心智模块文字 */
  --color-heart-icon: #FFD600;   /* 心智模块图标 */
  --color-tag-bg: rgba(0, 157, 170, 0.1);       /* 直飞顶部标签底色 */
  --color-discount-bg-start: rgba(255, 229, 223, 0.0001); /* 优惠条渐变起点 */
  --color-discount-bg-end: #FFE5DF;             /* 优惠条渐变终点 */
  --color-discount-arrow: #FF775D;              /* 优惠条尾部箭头 */
  --color-chip-border: rgba(144, 148, 154, 0.5); /* 权益 chip 描边 */
  --color-cashback-border: rgba(255, 65, 25, 0.5); /* 返现金 chip 描边 */
}
```

### 圆角

```css
:root {
  --radius-xl: 24px;   /* 底bar顶部圆角 */
  --radius-l: 12px;    /* 日历选中态、营销条、推荐卡片 */
  --radius-m: 6px;     /* 筛选项、中转城市标签、节假日标识 */
  --radius-s: 4px;     /* 优惠标签、权益标签 */
}
```

## 三、需求分析（每次生成前执行）

收到需求后，按以下步骤分析：

1. **场景识别**：单程/往返？国内/国际？
2. **航线信息**：出发城市、到达城市、日期
3. **组件选择**：查阅下方「组件索引」，确定需要的组件列表
4. **按需读取**：仅读取选中组件的 README.md，不读取其他文件

分析结果格式：
```
【需求摘要】一句话描述
【核心模块】需要的组件列表（从索引中选择）
【航线信息】出发城市 -> 到达城市，日期
```

## 四、组件索引

### 页面框架（每次生成完整页面时读取）

| 组件 | 文件 | 何时读取 |
|------|------|----------|
| 页面骨架 + 模块排列 | [框架组件.md](框架组件.md) | 生成完整页面时**始终读取** |

### 输出组件（按需读取，仅读取需要的）

| 组件 | 文件 | 触发条件 |
|------|------|----------|
| 导航栏 | [输出组件/导航栏/README.md](输出组件/导航栏/README.md) | 始终需要 |
| 日历 | [输出组件/日历/README.md](输出组件/日历/README.md) | 始终需要 |
| 营销条 | [输出组件/营销条/README.md](输出组件/营销条/README.md) | 有营销活动时 |
| 快筛栏 | [输出组件/快筛栏/README.md](输出组件/快筛栏/README.md) | 始终需要 |
| 直飞卡片 | [输出组件/直飞卡片/README.md](输出组件/直飞卡片/README.md) | 展示直飞航班时 |
| 省钱推荐 | [输出组件/省钱推荐/README.md](输出组件/省钱推荐/README.md) | 有跨日期低价推荐时 |
| 分割 | [输出组件/分割/README.md](输出组件/分割/README.md) | 直飞与中转分区时 |
| 中转快筛栏 | [输出组件/中转快筛栏/README.md](输出组件/中转快筛栏/README.md) | 展示中转航班时 |
| 中转卡片 | [输出组件/中转卡片/README.md](输出组件/中转卡片/README.md) | 展示中转航班时 |
| 心智模块 | [输出组件/心智模块/README.md](输出组件/心智模块/README.md) | 列表底部始终展示 |
| 底bar | [输出组件/底bar/README.md](输出组件/底bar/README.md) | 始终需要 |

### example.html 读取策略

各组件目录下的 example.html 包含完整 HTML 实现示例。**仅在以下情况读取**：
- README 规范参数不足以确定组件结构时
- 需要参考复杂组件的嵌套关系时
- 首次使用某个不熟悉的组件时

**常规情况下，README 中的规范参数足以生成代码，无需读取 example.html。**

## 五、排版与输出策略

### 模块排列顺序

页面模块按以下顺序排列（从上到下）：
1. 导航栏（吸顶）
2. 日历
3. 营销条（如有）
4. 快筛栏
5. 直飞卡片列表
6. 省钱推荐（如有）
7. 分割
8. 中转快筛栏（如有中转航班）
9. 中转卡片列表（如有中转航班）
10. 心智模块
11. 底bar（吸底）

### 航班展示规则

- **直飞卡片**：按价格/时间排序，展示所有匹配航班
- **省钱推荐**：插入在直飞卡片列表末尾
- **中转航班**：独立分区，通过分割线与直飞区分
- 当前根目录 `example.html` 的真实模块顺序是：导航栏 → 日历 → 营销条 → 快筛栏 → 5 张直飞卡 → 分割 → 中转快筛栏 → 6 张中转卡 → 心智模块 → 底bar
- 中转卡片中，起飞/降落之间的航线箭头统一复用直飞卡片同款 `124×68` 航线切图；`可平躺` 后的小箭头和联程/通程优惠标签外侧箭头统一使用 `12×7` 新切图；中转标签左右间距为 `8px` 且宽度随文案自适应

### 组件选择优先级

| 场景 | 必选组件 | 可选组件 |
|------|----------|----------|
| 直飞航班 | 导航栏、日历、快筛栏、直飞卡片、心智模块、底bar | 营销条、省钱推荐 |
| 中转航班 | 导航栏、日历、快筛栏、分割、中转快筛栏、中转卡片、心智模块、底bar | 营销条 |
| 直飞+中转 | 所有直飞组件 + 分割 + 所有中转组件 | 营销条、省钱推荐 |

## 六、输出规范

- 所有样式使用 `<style>` 标签，不依赖外部样式文件
- **颜色和圆角必须使用 `var(--token-name)` 引用**，禁止硬编码 hex 值或 px 数值。唯一的 token 定义来源是本文件「二、Design Tokens」中的 `:root` 声明
- 生成的 HTML 必须在 `<style>` 标签中包含完整的 `:root` 变量声明（基础颜色 + listing 扩展 token + 圆角 + 字体），确保 `var()` 引用能正确解析
- 图标使用切图 URL 引用，详见下方「七、切图资源索引」
- 绝不允许出现规范之外的色值、间距或圆角

## 七、切图资源索引

生成页面时，根据组件需求从下方表格中选择对应的切图 URL。

| 切图 URL / 路径 | 尺寸 | 对应组件/元素 |
|----------|------|---------------|
| https://gw.alicdn.com/imgextra/i1/O1CN01fDXHWq1je1wcx12ia_!!6000000004572-2-tps-134-24.png | 134×24 | 状态栏右侧图标合辑 |
| https://gw.alicdn.com/imgextra/i1/O1CN01DTmWga1piVVizwK8x_!!6000000005394-2-tps-48-48.png | 48×48 | 导航栏返回按钮 |
| https://gw.alicdn.com/imgextra/i1/O1CN015RbuWn1af6KRGgKmO_!!6000000003356-2-tps-42-42.png | 42×42 | 导航栏城市间箭头 |
| https://gw.alicdn.com/imgextra/i1/O1CN01zck7uV1dv4zfuDTnt_!!6000000003797-2-tps-20-20.png | 20×20 | 导航栏城市下拉箭头 |
| https://gw.alicdn.com/imgextra/i3/O1CN01IeFyHa1IyBkceWSy1_!!6000000000961-2-tps-34-36.png | 34×36 | 导航栏出行提醒 icon |
| https://gw.alicdn.com/imgextra/i1/O1CN015uzCtj1heN0PLsbOK_!!6000000004302-2-tps-36-36.png | 36×36 | 导航栏低价提醒 icon |
| https://gw.alicdn.com/imgextra/i1/O1CN014bSFyZ1xCv7asQHR9_!!6000000006408-2-tps-48-48.png | 48×48 | 导航栏更多菜单 icon |
| https://gw.alicdn.com/imgextra/i1/O1CN01n46BJU1JInZenKstw_!!6000000001006-2-tps-36-36.png | 36×36 | 日历展开按钮 icon |
| https://gw.alicdn.com/imgextra/i4/O1CN010GUEsm1pGZLnYT9L2_!!6000000005333-2-tps-14-10.png | 14×10 | 日历 / 快筛栏通用下拉箭头 |
| https://gw.alicdn.com/imgextra/i2/O1CN01LNtweJ1ywYCGM029m_!!6000000006643-2-tps-154-30.png | 154×30 | 营销条 logo |
| https://gw.alicdn.com/imgextra/i3/O1CN01r65nUg1Eh0QgL9Edx_!!6000000000382-2-tps-12-12.png | 12×12 | 营销条右箭头 |
| https://gw.alicdn.com/imgextra/i3/O1CN01g6ILzY1Gs7GhECdHN_!!6000000000677-2-tps-26-26.png | 26×26 | 快筛栏筛选 icon |
| https://gw.alicdn.com/imgextra/i1/O1CN012sISRA1g4MFUYzYtV_!!6000000004088-2-tps-220-1.png | 220×1 | 分割组件左侧线 |
| https://gw.alicdn.com/imgextra/i2/O1CN01yVrJ6I1urHAlDG4uo_!!6000000006090-2-tps-220-1.png | 220×1 | 分割组件右侧线 |
| https://gw.alicdn.com/imgextra/i2/O1CN01x9n4nt1MKZxdcQRl1_!!6000000001416-2-tps-24-21.png | 24×21 | 中转快筛栏选中勾 |
| https://gw.alicdn.com/imgextra/i4/O1CN01Zz6fJr1hyypVXg88S_!!6000000004347-2-tps-124-68.png | 124×68 | 直飞卡 / 中转卡起降航线箭头 |
| https://gw.alicdn.com/imgextra/i1/O1CN01XtHUaA1GvmR9qkuqh_!!6000000000685-2-tps-12-7.png | 12×7 | 中转卡 `可平躺` 后箭头、联程/通程优惠外置箭头 |
| https://gw.alicdn.com/imgextra/i2/O1CN01WkEORs1xqlZt4YvON_!!6000000006495-2-tps-282-41.png | 282×41 | 心智模块 logo |
| https://gw.alicdn.com/imgextra/i4/O1CN017xYij91ps7pOwTilH_!!6000000005415-2-tps-36-36.png | 36×36 | 底bar 时间排序 icon |
| https://gw.alicdn.com/imgextra/i2/O1CN01KKwfc41KPUz474TW3_!!6000000001156-2-tps-36-36.png | 36×36 | 底bar 低价优先 icon |
| https://gw.alicdn.com/imgextra/i2/O1CN016nCy0c1QOTnUhCRVh_!!6000000001966-2-tps-36-36.png | 36×36 | 底bar 惠后价 icon |
| https://gw.alicdn.com/imgextra/i1/O1CN01kYyq8C1SeAb6K7wIx_!!6000000002271-2-tps-268-10.png | 268×10 | 底bar Home Indicator |

补充说明：
- 航司 logo、餐食 icon、飞飞乐权益 icon、飞机共享 icon 等本地切图，统一以 `直飞卡片/README.md` 和 `中转卡片/README.md` 里的相对路径映射为准。
- `中转卡片` 中 `可平躺` 后箭头和联程/通程优惠标签外侧箭头统一使用上表的 `12×7` 新切图；优惠标签本体内部不再放箭头。

## 八、Token 维护指南

当需要批量修改设计风格时（如品牌升级、主题切换），按以下步骤操作：

1. **修改本文件**「二、Design Tokens」中 `:root` 里的变量值（如 `--color-price: #FF4119;` → `--color-price: #FF5533;`）
2. **同步修改** `框架组件.md` 页面骨架模板中的 `:root` 声明（保持一致）
3. **各组件 README.md 和 example.html 无需逐个修改**——它们通过 `var(--token-name)` 引用 token，AI 生成代码时会自动从本文件获取最新值
4. 如需新增 token，在 `:root` 中添加变量，然后在对应组件 README 中引用即可
