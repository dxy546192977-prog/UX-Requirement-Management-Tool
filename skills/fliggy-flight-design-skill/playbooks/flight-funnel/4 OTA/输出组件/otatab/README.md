# otatab

用于商品模块顶部的 3 列舱位切换区，采用 `106px` 高三列结构，每列由气泡行、主标题、副标题和可选选中条组成；第三列的 `座椅可平躺` 角标挂在顶部气泡行上方。

## 用途

- 展示经济舱、超级经济舱、公务/头等舱切换入口
- 作为商品模块顶部导航

## 默认可见态

- 第 1 项选中：`经济舱 / ¥550起`
- 第 2 项未选中：`超级经济舱 / ¥550起`
- 第 3 项未选中：`公务/头等舱 / ¥1520起`
- 第 3 项顶部有 `座椅可平躺` 角标，并相对 tab 顶部上移

## 结构层级

```html
<section class="ota-tab">
  <div class="tab-style">
    <button class="tab-item active">
      <div class="tab-inner">
        <div class="tab-bubble-row"></div>
        <div class="tab-title"></div>
        <div class="tab-sub"></div>
      </div>
      <div class="tab-underline"></div>
    </button>
    <button class="tab-item"></button>
    <button class="tab-item third">
      <div class="tab-inner">
        <div class="tab-bubble-row">
          <img class="seat-tag" alt="">
        </div>
        <div class="tab-title"></div>
        <div class="tab-sub"></div>
      </div>
    </button>
  </div>
</section>
```

## 关键尺寸 / 字体 / 排版

- 模块尺寸：`750×106`
- 外层布局：`padding: 0 24px`
- 单列尺寸：`180×106`
- 内容区：`180×94`
- 气泡行：`180×28`
- 主标题：`30px / 30px / 500`
- 副标题：`20px / 28px / 400`
- 选中条：`54×6`
- `seat-tag`：`120×32`
- `seat-tag` 定位：`top: -6px; right: -6px`，挂在第三列顶部气泡行，不与标题基线居中

## 资产映射

| 名称 | 用途 | URL |
|------|------|-----|
| 座椅可平躺 | 第 3 项顶部角标 | `https://gw.alicdn.com/imgextra/i3/O1CN01EQpKX51lf44Qu5vec_!!6000000004845-2-tps-120-32.png` |

## 可选态

- 切换选中项
- 第 3 项角标隐藏
- 第 3 项标题宽度可缩到 `165px`，避免与角标抢位

## 组合约束

- 每一列都保留 `28px` 高的顶部气泡行，即使前两列没有角标也不能删除这一层
- `seat-tag` 只能挂在第三列气泡行并向上偏移，不直接贴在标题区
- 组件只负责 tab，不承载商品卡内容
- 默认位于商品模块最顶部
