# 行程卡

用于导航栏下方的航班摘要区域，展示日期、OD 主信息、机场简称组、航司信息和右上角出行提醒。

## 用途

- 整页顶部的航班摘要
- 单独输出机票行程信息时

## 默认可见态

- 摘要行：`06-24 周二 · 直飞2h25m`
- 时间组：`07:10 + 单程 icon + 09:20`
- 机场组：`萧山 T3 + 分割线 + 首都 T3 + 新`
- 航司信息：`国航CA1742 ｜ 波音787(大) ｜ 梦想宽体机`
- 右上保留 `出行提醒` 胶囊

## 结构层级

```html
<section class="journey-module">
  <button class="journey-pill"></button>
  <div class="journey-card">
    <div class="journey-summary"></div>
    <div class="journey-od">
      <div class="journey-time-group">
        <div class="journey-time-start">
          <div class="journey-time"></div>
        </div>
        <img class="journey-oneway-icon" alt="">
        <div class="journey-time-end">
          <div class="journey-time"></div>
        </div>
      </div>
      <div class="journey-airport-group">
        <div class="journey-airport-route">
          <div class="journey-airport-start">
            <div class="journey-airport-copy">
              <span></span>
              <span></span>
            </div>
          </div>
          <div class="journey-airport-divider-wrap">
            <div class="journey-airport-divider"></div>
          </div>
          <div class="journey-airport-end">
            <div class="journey-airport-copy">
              <span></span>
              <span></span>
            </div>
            <img class="journey-service-tag" alt="">
          </div>
        </div>
      </div>
    </div>
    <div class="journey-meta"></div>
  </div>
</section>
```

## 关键尺寸 / 字体 / 排版

- `journey-od`：`458×42`，只容纳两组并列内容，不再写成左右机场列 + 中间 icon 的三列结构
- 时间组：`256×42`，内部顺序固定为 `起飞时间 / 单程 icon / 落地时间`
- 起飞时间容器：`98×42`
- 落地时间容器：`104×42`
- 时间数字：`42px / 42px / 400`，字体 `Fliggy Sans 102`
- 机场组：`190×42`
- 起飞机场：`73×31`，落地机场：`105×31`
- 机场简称与航站楼：`22px / 31px / 400`
- 分割线：`8px` 横线，`1.5px solid #000`
- 服务标签 `新`：`28×28`
- 胶囊高度：`48px`
- 航司元信息：`22px / 31px`

## 资产映射

| 名称 | 用途 | URL |
|------|------|-----|
| 出行提醒 | 右上胶囊 icon | `https://gw.alicdn.com/imgextra/i1/O1CN01CCuCiC1SguyQWAkf3_!!6000000002277-2-tps-26-26.png` |
| 单程 icon 灰色 | 时间组中轴 | `https://gw.alicdn.com/imgextra/i3/O1CN013xUKFA1fIGf6QEliq_!!6000000003983-2-tps-42-42.png` |
| 导航栏单程icon（深色） | 导航标题中间 / 行程深色可选态复用 | `https://gw.alicdn.com/imgextra/i1/O1CN015RbuWn1af6KRGgKmO_!!6000000003356-2-tps-42-42.png` |
| 国航 logo | 航司信息 | `https://gw.alicdn.com/imgextra/i1/O1CN019HfUvn1PTggSJApOx_!!6000000001842-2-tps-22-22.png` |
| 分隔线 | 航司信息竖分隔 | `https://gw.alicdn.com/imgextra/i4/O1CN01KYPosW1eXYGNaNvHV_!!6000000003881-2-tps-2-20.png` |
| 深灰箭头 | 胶囊右箭头 | `https://gw.alicdn.com/imgextra/i3/O1CN01r65nUg1Eh0QgL9Edx_!!6000000000382-2-tps-12-12.png` |
| 新标签 | 落地机场尾部服务标签 | `https://gw.alicdn.com/imgextra/i3/O1CN01xS7HS4258M6FdMh3k_!!6000000007481-2-tps-28-28.png` |

## 可选态

- 服务标签 `新` 可隐藏，但默认示例保留
- 单程 icon 可切换深色版本
- 机场组可以替换为其他机场简称与航站楼组合，但仍保持两组机场 + 中间短横分割

## 组合约束

- `journey-od` 必须保持两组并列：
  - 左侧时间组
  - 右侧机场组
- 不再使用“左时间左机场 / 中间 icon / 右时间右机场”的三列旧结构
- 下方 `journey-meta` 继续承接航司、机型和富内容标签
- 默认位于导航栏下方，并与提示百叶窗直接相邻
