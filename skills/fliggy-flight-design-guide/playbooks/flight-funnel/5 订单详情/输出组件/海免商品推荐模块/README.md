# 海免商品推荐模块

## 1. 这是什么？

订单详情页中的**海南免税商品推荐 Banner**，位于行程区（2 行程区）之后、出行信息（3 出行信息）之前。当航班出发或到达城市为三亚/海口时，向已支付且未退款的用户展示海南离岛免税商品推荐入口，点击跳转至淘宝侧承接页。

本期仅做 Banner 展示，后续迭代会做分群人群定投或千人千面、所见即所得。

### 业务背景

海南离岛免税购买条件：离岛日前 30 天至最后登机口扫码前均具备购买资格。目标人群包括：
- 已购海南离岛机票、船票、火车票的人群
- 已购海南酒店人群
- 已租且未还车海南用车人群
- 离开海南 6 个月人群（可购买完税会员购商品）

---

## 2. 如何配置它？

### 透出条件

| 条件 | 规则 | 说明 |
|------|------|------|
| 航线匹配 | 出发/到达城市包含 `三亚` 或 `海口` | 不区分单程/中转/往返，有一程符合即透出 |
| 订单状态 | 已支付 | `data-condition-status="paid"` |
| 退款状态 | 未退款 | `data-condition-refund="none"` |

### 配置项

| 配置 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `bannerImageUrl` | string | 海免运营图 | Banner 图片链接，支持分端分人群配置 |
| `jumpUrl` | string | 淘宝承接页 | 点击跳转链接，支持分端配置 |
| `jumpUrlFliggy` | string | — | 飞猪端专用跳转链接（淘宝侧提供唤端链接） |
| `jumpUrlAlipay` | string | — | 支付宝端专用跳转链接（淘宝侧提供唤端链接） |
| `jumpUrlTaobao` | string | — | 淘宝端直接跳转承接页 |
| `closeable` | boolean | `true` | 是否展示关闭按钮 |
| `targetCities` | string[] | `['三亚', '海口']` | 触发展示的目标城市列表 |

### 数据埋点

| 埋点类型 | SPM 值 |
|---------|--------|
| 模块曝光 | `181.7437879.Product recommendation` |
| 模块点击 | `181.7437879.Product recommendation` |

### 成交数据统计

- **飞猪端 & 支付宝端**：淘宝侧分别提供唤端链接，通过该链接的成交记为飞猪引导成交
- **淘宝端飞猪小程序**：直接跳转承接页，通过承接页的上个页面来源统计引导成交

---

## 3. 一些例子

### 基础用法（默认 Banner）

在 `<section class="duty-free-recommend">` 中放置一个 `<a>` 标签包裹 Banner 图片：

```html
<section class="duty-free-recommend"
         data-spm="Product recommendation"
         data-exposure="181.7437879.Product recommendation"
         data-condition-cities="三亚,海口"
         data-condition-status="paid"
         data-condition-refund="none">
  <a class="duty-free-recommend__banner"
     href="https://pages.tmall.com/wow/a/act/21266/hainan-duty-free"
     data-jump-fliggy="https://pages.tmall.com/wow/a/act/21266/hainan-duty-free?from=fliggy"
     data-jump-alipay="https://pages.tmall.com/wow/a/act/21266/hainan-duty-free?from=alipay"
     data-jump-taobao="https://pages.tmall.com/wow/a/act/21266/hainan-duty-free?from=taobao">
    <img src="https://gw.alicdn.com/imgextra/i2/O1CN01RWb2xb1u0bcvqN9xH_!!6000000005975-2-tps-1428-220.png"
         alt="海南免税购物 离岛免税 限时优惠">
    <button class="duty-free-recommend__close" aria-label="关闭推荐"></button>
  </a>
</section>
```

### 更换 Banner 图片

只需替换 `<img>` 的 `src` 属性即可：

```html
<img src="你的新运营图URL" alt="海南免税购物">
```

### 隐藏关闭按钮

删除 `<button class="duty-free-recommend__close">` 即可。

### 分端跳转逻辑

运行时根据当前端环境读取对应的 `data-jump-*` 属性：
- 飞猪 App → `data-jump-fliggy`
- 支付宝 → `data-jump-alipay`
- 淘宝 → `data-jump-taobao`
- 兜底 → `href`

---

## 4. 设计细节备忘

### 布局

| 属性 | 值 |
|------|------|
| 模块外层宽度 | 750px |
| 模块内边距 | 0 18px（左右各 18px） |
| Banner 可视宽度 | 714px |
| Banner 圆角 | 12px（`var(--radius-l)`） |
| 与上下模块间距 | 18px（由页面 `gap: 18px` 控制） |

### 关闭按钮

| 属性 | 值 |
|------|------|
| 尺寸 | 36 × 36px |
| 位置 | 右上角，距顶 12px，距右 12px |
| 背景 | `rgba(0, 0, 0, 0.3)` |
| 圆角 | 50%（圆形） |
| 叉号 | 白色 2px 线条，16px 长，45° 交叉 |

### 注意事项

- Banner 图片高度由图片本身决定（`height: auto`），不做固定高度约束
- 图片建议尺寸：**1428 × 220px**（@2x），实际渲染为 714 × 110px
- 模块不展示时（不满足透出条件），整个 `<section>` 不渲染，不占位
- 关闭后当次访问不再展示，下次进入订详页重新判断

---

## 5. 外部资源清单

| 资源 | 说明 | 当前值 |
|------|------|--------|
| Banner 默认图 | 海免运营 Banner | `https://gw.alicdn.com/imgextra/i2/O1CN01RWb2xb1u0bcvqN9xH_!!6000000005975-2-tps-1428-220.png` |
| 跳转链接（飞猪） | 淘宝侧提供的飞猪唤端链接 | 待运营配置 |
| 跳转链接（支付宝） | 淘宝侧提供的支付宝唤端链接 | 待运营配置 |
| 跳转链接（淘宝） | 淘宝端直接跳转承接页 | 待运营配置 |

---

## 6. CSS 规范

```css
.duty-free-recommend {
  width: 750px;
  padding: 0 18px;
}
.duty-free-recommend__banner {
  display: block;
  width: 714px;
  border-radius: var(--radius-l, 12px);
  overflow: hidden;
  position: relative;
  cursor: pointer;
}
.duty-free-recommend__banner img {
  display: block;
  width: 100%;
  height: auto;
  object-fit: cover;
}
.duty-free-recommend__close {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  z-index: 2;
}
.duty-free-recommend__close::before,
.duty-free-recommend__close::after {
  content: '';
  position: absolute;
  width: 16px;
  height: 2px;
  background: var(--color-white);
  border-radius: 1px;
}
.duty-free-recommend__close::before { transform: rotate(45deg); }
.duty-free-recommend__close::after { transform: rotate(-45deg); }
```
