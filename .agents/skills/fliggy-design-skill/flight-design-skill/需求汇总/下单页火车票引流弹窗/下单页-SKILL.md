---
name: fliggy-booking-train-diversion
description: 飞猪机票下单页火车票引流弹窗设计规范。当机票价格高于同线路高铁直达二等座时，以弹窗形式引导用户查看更省钱的火车票方案。采用遮罩弹窗 + 价格对比的形式，指导大模型输出符合飞猪下单页场景的 HTML + CSS。
---

# Fliggy Booking Page - Train Diversion Modal Skill

飞猪机票下单页的火车票引流弹窗设计规范，适用于机票下单页中的交叉导购引流场景。当同线路高铁直达二等座价格低于机票经济舱价格时，弹窗引导用户查看火车票。

> **读取策略（重要）**：本文件是唯一入口。正确流程：读完本文件 -> 读取 [下单页-框架组件.md](下单页-框架组件.md) -> 读取 [火车票引流弹窗模块/README.md](火车票引流弹窗模块/README.md) -> 按需参考下单页 HTML 示例。

## 一、技术基准

> **FDG 组件基线**：弹窗基于 FDG 平台组件 `fdl-dialog`（`components/platform/feedback/dialog/spec.md`），遵循 FDG `design-foundations.md` 全局 token 体系。

- 输出格式：单文件 HTML + 内联 CSS（`<style>` 标签）
- 目标平台：移动端（App WebView / H5）
- 设计基准：750 × 1624px（@2x），标注均为 @2x px
- 弹窗组件：`fdl-dialog`，面板宽度 630px（扩展标准 600px）
- 弹窗圆角：`var(--radius-l)` (24px)
- 遮罩背景：`color-mix(in srgb, var(--color-darkgray) 60%, transparent)`（FDG 标准）
- 遮罩 z-index：1000（FDG 标准）
- 入场动画：`scale(0.95)->1` + `opacity 0->1`，0.3s
- 显隐控制：`fdl-dialog--visible` 类切换 + `aria-hidden`
- 默认中文字体：`PingFang SC`
- 金额数字优先使用 `Fliggy Sans 102`
- `<head>` 必须包含：
  ```html
  <meta name="viewport" content="width=750, user-scalable=no">
  ```

## 二、Design Tokens（FDG 全局规范）

> 完整 token 定义见 FDG `foundations/design-foundations.md`。以下为本弹窗使用的核心 token。

```css
:root {
  /* 灰阶 */
  --color-darkgray: #0f131a;
  --color-midgray: #5c5f66;
  --color-lightgray: #919499;
  --color-auxiliary: #d2d4d9;
  --color-bg: #f2f3f5;
  --color-label: #f7f8fa;
  --color-white: #ffffff;
  /* 品牌 */
  --color-brand-1: #ffe033;
  --color-brand-2: #fffceb;
  --color-brand-4: #fff7cc;
  /* 辅助 */
  --color-indigo-1: #6666ff;
  --color-indigo-4: #ebebff;
  --color-warning-1: #ff3333;
  /* 支付/价格 */
  --color-pay-1: #ff5533;
  --color-pay-2: #ff8c1a;
  --color-notice-tint: #fff6ee;
  /* 大促 */
  --color-promo-1: #ff0036;
  --color-promo-2: #9537fd;
  /* 正向反馈 */
  --color-green-0: #149aa8;
  /* 会员/保障 */
  --color-safeguard-4: #fef5ec;
  --color-safeguard-5: #5d3521;
  /* 圆角 */
  --radius-l: 24px;
  --radius-m: 12px;
  --radius-s: 6px;
}
```

## 三、弹窗结构（基于 fdl-dialog）

弹窗基于 FDG `fdl-dialog` 组件，扩展橙色渐变头部、航线信息、价格对比与关闭按钮：

```text
div.fdl-dialog [+ --visible]（遮罩层，点击关闭）
  └── div.fdl-dialog__panel（role="dialog" aria-modal="true"）
        ├── button.fdl-dialog__close（扩展：右上角关闭按钮）
        ├── header.fdl-dialog__header--gradient（扩展：橙色渐变头部）
        │     ├── span.fdl-dialog__header-icon（高铁 emoji）
        │     ├── h2.fdl-dialog__title--white（标题）
        │     └── p.fdl-dialog__subtitle（副标题）
        ├── div.fdl-dialog__body（标准身体）
        │     ├── div.fdl-dialog__route（航线信息区）
        │     └── div.fdl-dialog__price-section（价格对比区）
        └── footer.fdl-dialog__footer（标准脚部）
              └── div.fdl-dialog__actions
                    ├── button.fdl-dialog__btn--secondary（狠心离开）
                    └── button.fdl-dialog__btn--primary（立即抢订）
```

## 四、需求分析（每次生成前执行）

收到火车票引流弹窗需求后，按以下顺序判断：

1. **航线信息**：出发城市、到达城市、城市三字码
2. **价格数据**：机票总价（含税费）、高铁二等座价格、高铁原价（可选）、立省金额
3. **车次信息**：高铁车次号（如 G11）、行程时长
4. **优惠信息**：是否有限时优惠标签
5. **按钮文案**：是否需要自定义按钮文案

分析结果格式：

```text
【弹窗类型】火车票引流弹窗
【航线】出发城市 -> 到达城市
【价格对比】机票 ¥xxx vs 高铁 ¥xxx，立省 ¥xxx
【触发条件】价差阈值 / 乘机人已勾选 / 频控未超限
【需要读取的组件】火车票引流弹窗模块
```

## 五、组件索引

### 框架组件（生成弹窗时始终读取）

| 组件 | 文件 | 何时读取 |
|------|------|----------|
| 弹窗层级 / 遮罩 / 展示控制 | [下单页-框架组件.md](下单页-框架组件.md) | 生成含弹窗的下单页时**始终读取** |

### 输出组件（按需读取）

| 组件 | 文件 | 触发条件 |
|------|------|----------|
| 火车票引流弹窗 | [火车票引流弹窗模块/README.md](火车票引流弹窗模块/README.md) | 需要展示火车票引流弹窗时 |

## 六、输出规范

- 所有样式必须写在 `<style>` 标签内
- 颜色、圆角仅用 `var(--*)`；hex **仅**出现在 `:root`
- 弹窗作为独立浮层（`fdl-dialog`），放在 `<body>` 末尾
- 弹窗展示时下单页不可滚动
- 橙色渐变头部：`linear-gradient(180deg, var(--color-pay-2) 0%, var(--color-pay-1) 100%)`
- 遮罩：`color-mix(in srgb, var(--color-darkgray) 60%, transparent)`（FDG 标准）
- 入场动画：`scale(0.95)->1` + `opacity`，0.3s（FDG 标准）
- 关闭方式：点遮罩 / Escape / `data-fdl-dialog-close` 按钮
- 可访问性：`role="dialog"` + `aria-modal="true"` + `aria-labelledby`
- 金额数字优先使用 `Fliggy Sans 102` 字体
- 立省金额必须突出显示（大字号 + `var(--color-pay-1)`）
- 设计诉求：**简单明了，突出火车票价格和省钱金额，轻量化**

## 七、适用与不适用场景

### 适用

- 机票下单页火车票引流弹窗
- 同线路高铁价格对比弹窗
- 交叉导购引流弹窗

### 不适用

- 下单页挽留弹窗（非火车票引流）
- crm 营销弹窗
- 支付结果页弹窗
