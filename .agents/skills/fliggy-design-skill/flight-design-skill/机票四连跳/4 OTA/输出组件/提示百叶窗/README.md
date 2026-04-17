# 提示百叶窗

用于行程卡下方的一行横向提示条，结构是顶部绝对定位虚线、左侧 teal 提示标签、右侧灰色 OTA 权益横向条和最右侧灰箭头。

## 用途

- 展示机场提示
- 展示 OTA 权益信息
- 作为一行轻量跳转入口

## 默认可见态

- 左侧提示标签：`机场提示`
- 右侧权益条：`国航快线 ｜ 赠¥10接送机券 ｜ 赠机场免费冰淇淋券包`
- 最右灰箭头
- 顶部 `714px` dashed 分隔线

## 结构层级

```html
<section class="shutter">
  <div class="shutter-main">
    <div class="shutter-label"></div>
    <div class="shutter-rights">
      <div class="shutter-rights-track">
        <span></span>
        <img class="shutter-divider" alt="">
        <span></span>
        <img class="shutter-divider" alt="">
        <span></span>
      </div>
      <div class="shutter-mask"></div>
    </div>
  </div>
  <img class="shutter-arrow" alt="">
  <div class="shutter-dashed"></div>
</section>
```

## 关键尺寸 / 字体 / 排版

- 外层：`750×67`
- 外层 padding：`18px 24px 18px 30px`
- 主内容区：`672×31`
- 左侧提示标签：`88×31`，`22px / 31px / 600`，颜色 `#009DAA`
- 右侧权益条可视区：`578×31`
- 权益轨道总宽：`746×31`
- 权益文字：`22px / 31px / 400`，颜色 `#90949A`
- 右侧箭头：`12×12`
- 顶部虚线：`left: 18px`，`width: 714px`，`1px dashed #D2D4DA`
- 遮挡渐变：`31×30`，从 `#F4F5F6` 向透明过渡

## 资产映射

| 名称 | 用途 | URL |
|------|------|-----|
| 灰箭头 | 最右跳转箭头 | `https://gw.alicdn.com/imgextra/i4/O1CN017pJeeo1OH27tRM2ci_!!6000000001679-2-tps-12-12.png` |
| 分隔线切图 | 权益条竖分隔 | `https://gw.alicdn.com/imgextra/i4/O1CN01ECpVp31Qe3GP2GbZ2_!!6000000002000-2-tps-1-22.png` |

## 可选态

- 左侧 teal 标签可以替换为其他提示词，但保留 `22px / 600`
- 右侧权益条内容可替换或延长，超出部分必须通过 `shutter-mask` 做右侧渐隐
- 右侧权益条只允许灰色常规字，不切回 teal 粗体

## 组合约束

- 顶部虚线必须是绝对定位单独一层，不要直接写在容器 `border-top`
- 左侧提示标签与右侧权益条是同一行的两段内容，不要把整行都写成 teal
- 右侧权益条默认是单行横向滚动感的内容带，使用分隔线切图串联
- 组件位于行程卡下方、营销小黄条上方，不额外包白卡
