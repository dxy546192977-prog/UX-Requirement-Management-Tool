---
name: fliggy-design-flight-ota-skill
description: 飞猪国内机票 OTA 结果页移动端 UI 设计规范。当需要生成固定 750 宽、1624 高视窗、导航栏固定、内容区滚动的机票报价页面、航班行程卡、提示百叶窗、营销黄条、OTA tab、商品卡片和底部心智模块时使用此 Skill。
user-invocable: true
allowed-tools:
  - Read
  - Write
  - Edit
  - Glob
  - Grep
  - Bash
---

# Fliggy Design Flight OTA Skill

飞猪国内机票 OTA 结果页的专用移动端 UI 规范，指导大模型输出符合当前页面截图、切图资产和最新 CSS 口径的 HTML + CSS 代码。

> **读取策略（重要）**：沿用 `fliggy-design-skill` 的组织逻辑。正确流程：读完本文件 → 判断任务是整页还是单模块 → 整页任务读取 `框架组件.md` → 仅按需读取对应组件 `README.md` → 仅在结构不明确时读取对应 `example.html`。
> 本 Skill 的默认实现就是当前这张国内机票 OTA 页面，不覆盖聊天页、输入栏、AI 回复气泡、酒店房型卡、订单卡等其他页面族。

---

## 一、技术基准

- **输出格式**：单文件 HTML + 内联 CSS（`<style>` 标签）
- **目标平台**：移动端（App WebView / H5）
- **设计宽度**：`750px`
- **展示视窗**：`750 × 1624px`
- **参考整页内容高度**：约 `2333px`
- **适配方案**：通过固定 viewport 宽度实现等比缩放，`<head>` 中必须包含：

```html
<meta name="viewport" content="width=750, user-scalable=no">
```

- **滚动机制**：
  - `body` 不承担页面滚动
  - 页面根容器固定为 `750 × 1624`
  - 顶部 `导航栏` 固定，高度 `176`
  - 下方内容区滚动，高度 `1448`
- **当前默认页面顺序**：
  - 导航栏
  - 行程卡
  - 提示百叶窗
  - 营销小黄条
  - OTA tab
  - 商品卡_首坑_带辅营_左右
  - 商品卡_2坑_裸票_左右
  - 商品卡_人群好价_左右
  - 商品卡_精选权益_左右
  - 更多报价入口
  - 心智模块

---

## 二、Design Tokens（页面专属）

### 字体

```css
@font-face {
  font-family: 'Fliggy Sans 102';
  src:
    local('Fliggy Sans 102'),
    local('FliggySans102-Md'),
    url('https://g.alicdn.com/trip/common-assets/1.1.9/fonts/FliggySans102-Md.ttf') format('truetype');
  font-display: swap;
}
```

- `PingFang SC`：正文、标签、按钮、说明文案
- `Fliggy Sans 102`：时间数字、辅助大数字
- `Alibaba Sans 102`：主价格数字和货币符号，可无缝降级到 `Fliggy Sans 102`
- 标题切图、品牌字样不使用纯文本临摹，优先使用已提供的 URL 切图

### 颜色

```css
:root {
  --color-page-bg: #F2F3F5;
  --color-surface: #FFFFFF;
  --color-surface-soft: #F7F8FA;
  --color-text-primary: #0E131B;
  --color-text-secondary: #5B5F67;
  --color-text-tertiary: #90949A;
  --color-divider: #D2D4DA;
  --color-divider-soft: #E0E0E0;
  --color-info: #009DAA;
  --color-price: #FF4119;
  --color-warning: #FF0020;
  --color-cta: #FF8400;
  --color-title-underline: #FFDF00;
  --color-tag-warm: #FFEAD6;
  --color-tag-warm-text: #87533C;
  --color-promo-warm-start: #FFE5DF;
  --color-promo-warm-end: rgba(255, 229, 223, 0.0001);
  --color-upsell-start: #FFF9F2;
  --color-upsell-end: #FFF1E6;
  --color-info-pill-bg: rgba(0, 157, 170, 0.07);
}
```

### 圆角

```css
:root {
  --radius-shell: 24px;
  --radius-card: 12px;
  --radius-pill: 30px;
  --radius-tag: 6px;
}
```

### 文字角色

- 导航标题：`30-34px`，`600`
- 时间数字：`42-62px`，`Fliggy Sans 102`
- 商品主价格：`¥` 用 `36px`，数字用 `54px`
- 正文主信息：`22px`
- 次级说明：`20-22px`
- 标签和权益小标：`16-24px`

---

## 三、资产映射（当前页面权威源）

| 资产名 | 尺寸 | 默认位置 | URL |
|------|------|----------|-----|
| 状态栏右侧 | 134×24 | 状态栏右上 | `https://gw.alicdn.com/imgextra/i1/O1CN01fDXHWq1je1wcx12ia_!!6000000004572-2-tps-134-24.png` |
| 返回箭头 | 48×48 | 导航栏左侧 | `https://gw.alicdn.com/imgextra/i1/O1CN01DTmWga1piVVizwK8x_!!6000000005394-2-tps-48-48.png` |
| 导航栏单程icon（深色） | 42×42 | 导航标题中间 / 深色航线表达 | `https://gw.alicdn.com/imgextra/i1/O1CN015RbuWn1af6KRGgKmO_!!6000000003356-2-tps-42-42.png` |
| 低价提醒 | 36×36 | 导航右侧第 1 位 | `https://gw.alicdn.com/imgextra/i1/O1CN015uzCtj1heN0PLsbOK_!!6000000004302-2-tps-36-36.png` |
| 我的收藏 | 36×36 | 导航右侧第 2 位 | `https://gw.alicdn.com/imgextra/i4/O1CN01x00HtJ1vG0YmOniAx_!!6000000006144-2-tps-36-36.png` |
| 出行提醒 | 26×26 | 行程卡右上胶囊 | `https://gw.alicdn.com/imgextra/i1/O1CN01CCuCiC1SguyQWAkf3_!!6000000002277-2-tps-26-26.png` |
| 单程 icon 灰色 | 42×42 | 行程卡时间中轴 | `https://gw.alicdn.com/imgextra/i3/O1CN013xUKFA1fIGf6QEliq_!!6000000003983-2-tps-42-42.png` |
| 新标签 | 28×28 | 服务标签可选态 | `https://gw.alicdn.com/imgextra/i3/O1CN01xS7HS4258M6FdMh3k_!!6000000007481-2-tps-28-28.png` |
| 国航 logo | 22×22 | 行程卡 / 商品卡航司信息 | `https://gw.alicdn.com/imgextra/i1/O1CN019HfUvn1PTggSJApOx_!!6000000001842-2-tps-22-22.png` |
| 分隔线 | 2×20 | 元信息竖分隔 | `https://gw.alicdn.com/imgextra/i4/O1CN01KYPosW1eXYGNaNvHV_!!6000000003881-2-tps-2-20.png` |
| 灰箭头 | 12×12 | 百叶窗 / 卡内弱操作 | `https://gw.alicdn.com/imgextra/i4/O1CN017pJeeo1OH27tRM2ci_!!6000000001679-2-tps-12-12.png` |
| 深灰箭头 | 12×12 | 出行提醒 / 更多报价入口 | `https://gw.alicdn.com/imgextra/i3/O1CN01r65nUg1Eh0QgL9Edx_!!6000000000382-2-tps-12-12.png` |
| 分隔线切图 | 1×22 | 提示百叶窗权益条竖分隔 | `https://gw.alicdn.com/imgextra/i4/O1CN01ECpVp31Qe3GP2GbZ2_!!6000000002000-2-tps-1-22.png` |
| 享免单切图 | 65×33 | 营销小黄条左侧氛围图 | `https://gw.alicdn.com/imgextra/i3/O1CN0121KqdT1Hyog7f4ABg_!!6000000000827-2-tps-65-33.png` |
| 座椅可平躺 | 120×32 | otatab 第 3 项角标 | `https://gw.alicdn.com/imgextra/i3/O1CN01EQpKX51lf44Qu5vec_!!6000000004845-2-tps-120-32.png` |
| 超值精选 | 105×34 | 商品卡 01 标题切图 | `https://gw.alicdn.com/imgextra/i4/O1CN01prBGxg1bPMKbP0dVL_!!6000000003457-2-tps-105-34.png` |
| 人群好价 | 105×34 | 商品卡 03 标题切图 | `https://gw.alicdn.com/imgextra/i4/O1CN016gr1GI24Uy2R1ZzrI_!!6000000007395-2-tps-105-34.png` |
| 精选权益 | 105×34 | 商品卡 04 标题切图 | `https://gw.alicdn.com/imgextra/i4/O1CN016QHX501Kgu2CX3b2h_!!6000000001194-2-tps-105-34.png` |
| 延误无忧 | 90×24 | 商品卡 01 辅营条 | `https://gw.alicdn.com/imgextra/i1/O1CN01iPOAcf1wfUCumFpaH_!!6000000006335-2-tps-90-24.png` |
| 礼 | 24×24 | 权益赠礼 / 旅行套餐 | `https://gw.alicdn.com/imgextra/i4/O1CN01IINuL62A20gw5YBi0_!!6000000008144-2-tps-24-24.png` |
| 旅行套餐 | 83×20 | 商品卡权益信息 | `https://gw.alicdn.com/imgextra/i2/O1CN01GPCFyc1pSw2oml6Ti_!!6000000005360-2-tps-83-20.png` |
| 限 | 24×24 | 人群好价 / 精选权益限制说明 | `https://gw.alicdn.com/imgextra/i1/O1CN01AbkL5R1LC2y0N4C6J_!!6000000001262-2-tps-24-24.png` |
| 返现金 | 56×19 | 精选权益返现标签 | `https://gw.alicdn.com/imgextra/i3/O1CN017gisda1bnAvVisw4P_!!6000000003509-2-tps-56-19.png` |
| 更多三点 | 48×48 | 导航栏右侧第 3 位 | `https://gw.alicdn.com/imgextra/i1/O1CN014bSFyZ1xCv7asQHR9_!!6000000006408-2-tps-48-48.png` |
| 飞猪旅行·安心票 | 282×41 | 底部心智模块 | `https://gw.alicdn.com/imgextra/i2/O1CN01WkEORs1xqlZt4YvON_!!6000000006495-2-tps-282-41.png` |

---

## 四、需求分析（每次生成前执行）

收到需求后，按以下步骤分析：

1. **识别任务类型**：整页、框架更新、单组件、商品卡变体
2. **识别口径**：固定导航 + 内容区滚动，还是单模块静态示例
3. **识别默认可见态**：只还原当前截图默认态，还是展开某个隐藏态
4. **按需读取**：
   - 整页任务：读 `框架组件.md` + 对应组件 `README.md`
   - 单组件任务：只读对应 `README.md`
   - 结构不明确：再读对应 `example.html`

输出分析格式：

```text
【需求摘要】一句话描述
【任务类型】整页 / 单组件 / 变体
【核心模块】从组件索引中选择
【滚动机制】固定导航 / 内容区滚动 / 静态模块示例
【默认可见态】仅当前页面默认态 / 指定展开态
```

---

## 五、组件索引

### 页面框架（整页任务始终读取）

| 组件 | 文件 | 何时读取 |
|------|------|----------|
| 整页壳层、导航固定、内容滚动、模块顺序 | `框架组件.md` | 生成完整 OTA 页时始终读取 |

### 输出组件（按需读取）

| 组件 | 文件 | 触发条件 |
|------|------|----------|
| 导航栏 | `输出组件/导航栏/README.md` | 需要顶部状态栏、返回、提醒/收藏/更多 |
| 行程卡 | `输出组件/行程卡/README.md` | 需要日期、时间、OD、航司、出行提醒 |
| 提示百叶窗 | `输出组件/提示百叶窗/README.md` | 需要紧跟行程卡的单行提示 |
| 营销小黄条 | `输出组件/营销小黄条/README.md` | 需要营销白卡和红色文案 |
| otatab | `输出组件/otatab/README.md` | 需要商品模块顶部三列切换 |
| 商品卡片 | `输出组件/商品卡片/README.md` | 需要四张默认报价卡 |
| 更多报价入口 | `输出组件/更多报价入口/README.md` | 需要页底更多报价入口 |
| 心智模块 | `输出组件/心智模块/README.md` | 需要底部“飞猪旅行·安心票”心智区 |

### 示例文件读取策略

- 默认先读 `README.md`
- 只有在 DOM 层级或默认文案不明确时再读 `example.html`
- 根目录 `example.html` 是当前整页默认实现的权威示例
- 商品卡片目录下固定维护 4 张默认可见商品卡的独立示例

---

## 六、排版与输出策略

### 当前页面默认实现

- 导航栏采用“返回 + 杭州 / 导航栏单程icon / 北京 + 低价提醒 / 我的收藏 / 更多”结构
- 行程卡默认展示去程单段，不展开附加权益横条
- 百叶窗默认是一条 teal 单行提示
- 营销小黄条默认展示“享免单”营销卡
- 商品模块默认顺序固定为：otatab → 01 → 02 → 03 → 04 → 更多报价
- 底部心智区默认只显示品牌切图和三段安心文案

### 图标与切图使用规则

1. 已提供 URL 的图标和切图，优先直接使用，不用字符或纯 CSS 临摹替代。
2. 导航标题中间必须使用 `42×42` 的 `导航栏单程icon`，不允许退化成破折号、字符箭头或纯文本连字符。
3. 导航、百叶窗、更多报价入口、权益说明中的箭头统一使用现有 12×12 资产。
4. 商品卡标题统一使用 105×34 切图，不再退化为纯文本标题。
5. `礼 / 限 / 返现金 / 旅行套餐 / 延误无忧 / 座椅可平躺 / 飞猪旅行·安心票` 均按切图资产使用。

### 隐藏态规则

- `display: none` 的节点不能在文档中丢失，但整页默认态不主动展开
- 单组件示例优先展示截图中可见内容
- 若用户点名展开隐藏态，再在现有结构上打开对应节点，不重写组件体系

---

## 七、输出规范

- 所有样式写入 `<style>`，不依赖外部样式文件
- 根示例必须保留固定导航 + 内容区滚动，不允许把整页改成普通文档流长页
- 不允许再使用 `⌁ / ☆ / ⋯ / ›` 这类占位字符图标
- 不允许把 4 张商品卡重新抽象回旧的业务分组目录
- 组件 README 必须能直接指导生成，不得只停留在骨架说明
- 组件示例必须与根页面同口径，默认可见态、文案、图标、字重要一致

---

## 八、禁止项

| # | 禁止项 | 原因 |
|---|--------|------|
| P1 | 禁止恢复旧目录 `舱位Tab / 超值推荐 / 人群好价 / 精选权益 / 更多报价` | 当前目录结构已锁定 |
| P2 | 禁止引入聊天页输入栏、点赞分享、追问、用户气泡 | 本 Skill 只覆盖 OTA 结果页 |
| P3 | 禁止让 `body` 承担整页滚动 | 当前真实口径是固定导航 + 内容区滚动 |
| P4 | 禁止丢失真实切图资产映射 | 后续生成必须复用同一套资产 |
| P5 | 禁止回退到 demo 风格的占位实现 | 当前 skill 需要输出真实视觉实现 |
