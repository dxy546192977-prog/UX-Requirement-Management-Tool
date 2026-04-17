# 营销小黄条

用于提示百叶窗下方的营销信息卡，结构是左侧真实营销切图、中部红字和右侧深灰箭头。

## 用途

- 展示组队、免单、限时营销文案
- 作为商品模块前的氛围承接

## 默认可见态

- 左侧营销切图：`享免单`
- 中部文案：`组队满10800个全额免单`
- 右侧深灰箭头

## 结构层级

```html
<section class="promo-module">
  <div class="promo-card">
    <div class="promo-content">
      <img class="promo-image" alt="">
      <div class="promo-copy"></div>
    </div>
    <img class="promo-arrow" alt="">
  </div>
</section>
```

## 关键尺寸 / 字体 / 排版

- 模块高度：`96px`
- 白卡尺寸：`714×72`
- 白卡 padding：`0 18px`
- 左侧营销切图：`65×33`
- 红字：`24px / 34px / 400`
- 箭头：`12×12`

## 资产映射

| 名称 | 用途 | URL |
|------|------|-----|
| 享免单切图 | 左侧营销氛围图 | `https://gw.alicdn.com/imgextra/i3/O1CN0121KqdT1Hyog7f4ABg_!!6000000000827-2-tps-65-33.png` |
| 深灰箭头 | 右侧跳转 | `https://gw.alicdn.com/imgextra/i3/O1CN01r65nUg1Eh0QgL9Edx_!!6000000000382-2-tps-12-12.png` |

## 可选态

- 可替换中部营销文案
- 左侧营销切图可替换为同规格活动切图，但不回退到 CSS 造型标签

## 组合约束

- 位于提示百叶窗和商品模块之间
- 左侧氛围元素使用真实切图，不再用 CSS 渐变标签代替
- 白卡内保持单行信息，不拆成多层营销块
