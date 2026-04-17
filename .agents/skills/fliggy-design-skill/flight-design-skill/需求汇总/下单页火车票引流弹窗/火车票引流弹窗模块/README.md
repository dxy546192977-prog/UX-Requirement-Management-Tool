# 火车票引流弹窗模块

## 1. 这是什么？

机票下单页中的**火车票引流弹窗**，当同线路高铁直达二等座价格低于机票经济舱价格时，以半屏弹窗形式引导用户查看更省钱的火车票方案。弹窗覆盖在下单页之上，带半透明遮罩层。

### 业务背景

当用户在机票下单页准备购买机票时，如果同线路存在高铁动车直达（G/D/C/S 车次）且价格更低，通过弹窗引导用户去火车票频道查看，实现交叉导购引流。

**核心价值**：帮助用户发现更优出行方案，同时为火车票频道引流。

---

## 2. 如何配置它？

### 触发条件

| 条件 | 规则 | 说明 |
|------|------|------|
| 价差阈值 | 机票经济舱单成人惠后价 - 高铁直达二等座最低价 > 阈值 | 阈值可配置，价差足够大时才展示 |
| 车次类型 | 仅高铁动车直达（G/D/C/S） | 不含普速列车、非直达车次 |
| 乘机人状态 | 已勾选乘机人 | 未勾选乘机人时不触发 |
| 频控规则 | 同一用户每天在同 OD 下至多弹 x 次（x=1，可配置） | 口径为系统时间的自然日 |

### 弹窗优先级

```
crm 弹窗 > 火车票引流弹窗 > 端侧兜底挽留弹窗
```

### 配置项

| 配置 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `priceDiffThreshold` | number | — | 价差阈值，机票价-高铁价超过此值时展示 |
| `trainTypes` | string[] | `['G', 'D', 'C', 'S']` | 允许推荐的车次类型 |
| `maxShowPerDay` | number | `1` | 同一用户同 OD 每天最多展示次数 |
| `jumpUrl` | string | 火车票 listing 页 | 点击"去看火车票"跳转链接，自动带上筛选参数 |
| `originCity` | string | — | 出发城市（动态填充） |
| `destCity` | string | — | 到达城市（动态填充） |
| `originCode` | string | — | 出发城市三字码（如 PEK） |
| `destCode` | string | — | 到达城市三字码（如 SHA） |
| `duration` | string | — | 高铁行程时长（如"约 4.5 小时"） |
| `flightPrice` | number | — | 机票总价（含税费） |
| `trainPrice` | number | — | 高铁二等座价格 |
| `trainOriginalPrice` | number | — | 高铁原价（用于划线价展示，可选） |
| `savedAmount` | number | — | 立省金额（机票价 - 高铁价） |
| `promoText` | string | — | 优惠标签文案（如"限时优惠 减20元"，可选） |

### 数据埋点

| 埋点类型 | SPM 值 |
|---------|--------|
| 弹窗曝光 | `a]].b]].train-diversion-modal.show` |
| 关闭弹窗 | `a]].b]].train-diversion-modal.close` |
| 点击"狠心离开" | `a]].b]].train-diversion-modal.dismiss` |
| 点击"去看火车票" | `a]].b]].train-diversion-modal.go-train` |

### 火车票跳转承接

点击"去看火车票"后跳转到火车票 listing 页，自动筛选：
- 车次类型：高铁
- 余票状态：有票
- 排序规则：按价格从低到高

---

## 3. 一些例子

> **组件基线**：基于 FDG 平台组件 `dialog`（`components/platform/feedback/dialog/spec.md`），扩展橙色渐变头部、航线信息、价格对比与关闭按钮。类名前缀统一使用 `fdl-dialog__*`。

### 基础用法（默认弹窗）

```html
<!-- fdl-dialog 遮罩层 -->
<div class="fdl-dialog fdl-dialog--visible"
     id="fdl-dialog-train-diversion"
     aria-hidden="false"
     data-spm="train-diversion-modal">

  <div class="fdl-dialog__panel"
       role="dialog"
       aria-modal="true"
       aria-labelledby="fdl-dialog-train-title">

    <!-- 关闭按钮（扩展） -->
    <button type="button"
            class="fdl-dialog__close"
            aria-label="关闭弹窗"
            data-fdl-dialog-close></button>

    <!-- 头部：橙色渐变（扩展 fdl-dialog__header） -->
    <header class="fdl-dialog__header--gradient">
      <span class="fdl-dialog__header-icon">&#128645;</span>
      <h2 class="fdl-dialog__title--white" id="fdl-dialog-train-title">发现更优出行方案</h2>
      <p class="fdl-dialog__subtitle">同线路高铁更便宜，立即查看</p>
    </header>

    <!-- 身体：航线信息 + 价格对比 -->
    <div class="fdl-dialog__body">
      <!-- 航线信息 -->
      <div class="fdl-dialog__route">
        <div class="fdl-dialog__route-city">
          <span class="fdl-dialog__route-city-name">北京</span>
          <span class="fdl-dialog__route-city-code">PEK</span>
        </div>
        <div class="fdl-dialog__route-line">
          <div class="fdl-dialog__route-dash"></div>
          <span class="fdl-dialog__route-duration">约 4.5 小时</span>
        </div>
        <div class="fdl-dialog__route-city">
          <span class="fdl-dialog__route-city-name">上海</span>
          <span class="fdl-dialog__route-city-code">SHA</span>
        </div>
      </div>

      <!-- 价格对比区 -->
      <div class="fdl-dialog__price-section">
        <!-- 优惠标签（可选） -->
        <div class="fdl-dialog__promo-tag">
          <span class="fdl-dialog__promo-dot"></span>
          <span class="fdl-dialog__promo-text">限时优惠 减20元</span>
        </div>
        <!-- 机票价格行 -->
        <div class="fdl-dialog__price-row">
          <div class="fdl-dialog__price-label">
            <span class="fdl-dialog__price-icon">&#9992;</span>
            <span class="fdl-dialog__price-label-text">机票总价（含税费）</span>
          </div>
          <span class="fdl-dialog__price-value">¥820</span>
        </div>
        <!-- 高铁价格行 -->
        <div class="fdl-dialog__price-row">
          <div class="fdl-dialog__price-label">
            <span class="fdl-dialog__price-icon">&#128644;</span>
            <span class="fdl-dialog__price-label-text">高铁二等座</span>
          </div>
          <div class="fdl-dialog__price-compare">
            <span class="fdl-dialog__price-original">¥553</span>
            <span class="fdl-dialog__price-current">¥533</span>
          </div>
        </div>
        <!-- 立省金额 -->
        <div class="fdl-dialog__savings">
          <span class="fdl-dialog__savings-label">立省</span>
          <span class="fdl-dialog__savings-amount">¥287</span>
        </div>
      </div>
    </div>

    <!-- 脚部：操作按钮（标准 fdl-dialog__footer） -->
    <footer class="fdl-dialog__footer">
      <div class="fdl-dialog__actions">
        <button type="button"
                class="fdl-dialog__btn fdl-dialog__btn--secondary"
                data-fdl-dialog-close>狠心离开</button>
        <button type="button"
                class="fdl-dialog__btn fdl-dialog__btn--primary"
                data-fdl-dialog-close>立即抢订</button>
      </div>
    </footer>

  </div>
</div>
```

### 不展示优惠标签

删除 `<div class="fdl-dialog__promo-tag">` 即可。

### 不展示划线价

删除 `<span class="fdl-dialog__price-original">` 即可，仅保留当前价格。

### 自定义按钮文案

PRD 中按钮文案为"狠心离开"和"去看火车票"，设计稿中为"狠心离开"和"立即抢订"，可根据 AB 实验配置。

---

## 4. 设计细节备忘

> **FDG 组件基线**：`fdl-dialog`（`components/platform/feedback/dialog/spec.md`）。以下标注均为 @2x px，颜色/圆角使用 FDG Design Token。

### 弹窗整体（fdl-dialog 标准 + 扩展）

| 属性 | FDG 标准值 | 本弹窗扩展 |
|------|-----------|-----------|
| 遮罩层背景 | `color-mix(in srgb, var(--color-darkgray) 60%, transparent)` | 同标准 |
| 遮罩 z-index | 1000 | 同标准 |
| 面板宽度 | 600px | **630px**（设计稿） |
| 面板圆角 | `var(--radius-l)` (24px) | 同标准 |
| 面板背景 | `var(--color-white)` | 同标准 |
| 面板 max-height | 90vh | 同标准 |
| 入场动画 | `scale(0.95)->1` + `opacity 0->1`，0.3s | 同标准 |
| 显隐控制 | `fdl-dialog--visible` 类切换 | 同标准 |

### 关闭按钮（扩展：标准 fdl-dialog 无此元素）

| 属性 | 值 |
|------|------|
| 类名 | `fdl-dialog__close` |
| 尺寸 | 48 x 48px |
| 位置 | absolute，距顶 16px，距右 16px |
| 背景 | `color-mix(in srgb, var(--color-darkgray) 15%, transparent)`，圆形 |
| 图标 | 白色叉号，20px 线条宽 2px |
| z-index | 3 |
| 关闭属性 | `data-fdl-dialog-close` |

### 橙色渐变头部（扩展 fdl-dialog__header）

| 属性 | 值 |
|------|------|
| 类名 | `fdl-dialog__header--gradient` |
| padding | 48px 30px 40px |
| 背景渐变 | `linear-gradient(180deg, var(--color-pay-2) 0%, var(--color-pay-1) 100%)` |
| 高铁图标 | 居中，emoji `&#128645;`，72px |
| 标题 | "发现更优出行方案"，36px/500，`var(--color-white)` |
| 副标题 | "同线路高铁更便宜，立即查看"，26px/400，`color-mix(in srgb, var(--color-white) 80%, transparent)` |

### 航线信息区

| 属性 | 值 |
|------|------|
| 类名 | `fdl-dialog__route` |
| 背景 | `var(--color-white)` |
| 城市名 | 42px/500，`var(--color-darkgray)` |
| 城市三字码 | 24px/400，`var(--color-lightgray)` |
| 虚线 | 3px dashed `var(--color-pay-1)` |
| 箭头 | `var(--color-pay-1)` 三角 |
| 时长文字 | 22px/400，`var(--color-pay-1)` |

### 价格对比区

| 属性 | 值 |
|------|------|
| 类名 | `fdl-dialog__price-section` |
| 内边距 | 24px 0 0（在 body padding 0 30px 内） |
| 优惠标签背景 | `var(--color-notice-tint)`，圆角 `var(--radius-s)` |
| 优惠标签文字 | 22px/500，`var(--color-pay-1)` |
| 标签文字 | 26px/400，`var(--color-darkgray)` |
| 机票价格 | Fliggy Sans 102，28px/500，`var(--color-darkgray)` |
| 高铁划线价 | Fliggy Sans 102，26px/400，`var(--color-lightgray)`，line-through |
| 高铁现价 | Fliggy Sans 102，36px/500，`var(--color-pay-1)` |
| 分割线 | 1px solid `var(--color-bg)` |
| 立省文字 | 28px/500，`var(--color-pay-1)` |
| 立省金额 | Fliggy Sans 102，42px/700，`var(--color-pay-1)` |

### 操作按钮区（标准 fdl-dialog__footer）

| 属性 | FDG 标准值 | 本弹窗扩展 |
|------|-----------|-----------|
| padding | 24px | 同标准 |
| 按钮间距 | gap: 18px | 同标准 |
| 按钮高度 | 84px | 同标准 |
| 按钮圆角 | 9999px | 同标准 |
| 按钮字号 | 30px/500 | 同标准 |
| 次按钮"狠心离开" | bg `var(--color-label)`, color `var(--color-midgray)` | bg **`var(--color-bg)`**（更深灰底） |
| 主按钮"立即抢订" | bg `var(--color-brand-1)`, color `var(--color-darkgray)` | bg **`var(--color-pay-1)`**, color **`var(--color-white)`**（橙红 CTA） |
| 关闭属性 | `data-fdl-dialog-close` | 同标准 |

---

## 5. 外部资源清单

| 资源 | 说明 | 当前值 |
|------|------|--------|
| 高铁图标 | 弹窗头部高铁 emoji | Unicode `&#128645;`（高速列车），72px |
| 火车票 listing 跳转链接 | 点击主按钮跳转 | 待运营配置，需带筛选参数 |

---

## 6. CSS 规范

> **FDG 组件基线**：`fdl-dialog`。遮罩、面板、脚部按钮遵循标准 spec；头部、身体内容、关闭按钮为本弹窗扩展。所有颜色/圆角使用 `var(--*)` token，hex 仅出现在 `:root`。

```css
/* ===== fdl-dialog 遮罩层（标准） ===== */
.fdl-dialog {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 24px;
  background: color-mix(in srgb, var(--color-darkgray) 60%, transparent);
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, visibility 0.3s ease;
}
.fdl-dialog--visible {
  opacity: 1;
  visibility: visible;
}

/* ===== fdl-dialog 面板（扩展宽度至 630px） ===== */
.fdl-dialog__panel {
  display: flex;
  flex-direction: column;
  width: 630px;
  max-width: 100%;
  max-height: 90vh;
  background: var(--color-white);
  border-radius: var(--radius-l);
  overflow: hidden;
  transform: scale(0.95);
  transition: transform 0.3s ease;
}
.fdl-dialog--visible .fdl-dialog__panel {
  transform: scale(1);
}

/* ===== 关闭按钮（扩展） ===== */
.fdl-dialog__close {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 48px;
  height: 48px;
  border: none;
  background: color-mix(in srgb, var(--color-darkgray) 15%, transparent);
  border-radius: 50%;
  cursor: pointer;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  -webkit-tap-highlight-color: transparent;
}
.fdl-dialog__close:focus-visible {
  outline: 2px solid var(--color-indigo-1);
  outline-offset: 2px;
}
.fdl-dialog__close::before,
.fdl-dialog__close::after {
  content: '';
  position: absolute;
  width: 20px;
  height: 2px;
  background: var(--color-white);
  border-radius: 1px;
}
.fdl-dialog__close::before { transform: rotate(45deg); }
.fdl-dialog__close::after { transform: rotate(-45deg); }

/* ===== 橙色渐变头部（扩展 fdl-dialog__header） ===== */
.fdl-dialog__header--gradient {
  padding: 48px 30px 40px;
  background: linear-gradient(180deg, var(--color-pay-2) 0%, var(--color-pay-1) 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
}
.fdl-dialog__header-icon {
  font-size: 72px;
  line-height: 1;
  margin-bottom: 16px;
}
.fdl-dialog__title--white {
  margin: 0;
  font-weight: 500;
  font-size: 36px;
  line-height: 1.4;
  text-align: center;
  color: var(--color-white);
}
.fdl-dialog__subtitle {
  font-weight: 400;
  font-size: 26px;
  line-height: 1.4;
  text-align: center;
  color: color-mix(in srgb, var(--color-white) 80%, transparent);
  margin-top: 6px;
}

/* ===== 身体（标准 fdl-dialog__body） ===== */
.fdl-dialog__body {
  padding: 0 30px;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

/* ===== 航线信息区 ===== */
.fdl-dialog__route {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 36px 24px 28px;
}
.fdl-dialog__route-city {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  min-width: 100px;
}
.fdl-dialog__route-city-name {
  font-size: 42px;
  font-weight: 500;
  line-height: 1;
  color: var(--color-darkgray);
}
.fdl-dialog__route-city-code {
  font-size: 24px;
  font-weight: 400;
  line-height: 1;
  color: var(--color-lightgray);
}
.fdl-dialog__route-line {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  padding: 8px 16px 0;
}
.fdl-dialog__route-dash {
  width: 100%;
  height: 20px;
  display: flex;
  align-items: center;
}
.fdl-dialog__route-dash::before {
  content: '';
  flex: 1;
  height: 0;
  border-top: 3px dashed var(--color-pay-1);
}
.fdl-dialog__route-dash::after {
  content: '';
  width: 0;
  height: 0;
  border-left: 10px solid var(--color-pay-1);
  border-top: 6px solid transparent;
  border-bottom: 6px solid transparent;
  flex-shrink: 0;
}
.fdl-dialog__route-duration {
  font-size: 22px;
  font-weight: 400;
  line-height: 1.4;
  color: var(--color-pay-1);
  white-space: nowrap;
  margin-top: 6px;
}

/* ===== 价格对比区 ===== */
.fdl-dialog__price-section {
  padding: 24px 0 0;
  display: flex;
  flex-direction: column;
}
.fdl-dialog__promo-tag {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  background: var(--color-notice-tint);
  border-radius: var(--radius-s);
  margin-bottom: 20px;
  align-self: flex-start;
}
.fdl-dialog__promo-dot {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--color-pay-1);
  flex-shrink: 0;
}
.fdl-dialog__promo-text {
  font-size: 22px;
  font-weight: 500;
  line-height: 1.4;
  color: var(--color-pay-1);
}
.fdl-dialog__price-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 0;
}
.fdl-dialog__price-row + .fdl-dialog__price-row {
  border-top: 1px solid var(--color-bg);
}
.fdl-dialog__price-label {
  display: flex;
  align-items: center;
  gap: 8px;
}
.fdl-dialog__price-icon {
  font-size: 24px;
  line-height: 28px;
  flex-shrink: 0;
}
.fdl-dialog__price-label-text {
  font-size: 26px;
  font-weight: 400;
  line-height: 1.4;
  color: var(--color-darkgray);
}
.fdl-dialog__price-value {
  font-family: 'Fliggy Sans 102', 'PingFang SC', sans-serif;
  font-size: 28px;
  font-weight: 500;
  line-height: 1;
  color: var(--color-darkgray);
}
.fdl-dialog__price-compare {
  display: flex;
  align-items: baseline;
  gap: 8px;
}
.fdl-dialog__price-original {
  font-family: 'Fliggy Sans 102', 'PingFang SC', sans-serif;
  font-size: 26px;
  font-weight: 400;
  line-height: 1;
  color: var(--color-lightgray);
  text-decoration: line-through;
}
.fdl-dialog__price-current {
  font-family: 'Fliggy Sans 102', 'PingFang SC', sans-serif;
  font-size: 36px;
  font-weight: 500;
  line-height: 1;
  color: var(--color-pay-1);
}

/* ===== 立省金额 ===== */
.fdl-dialog__savings {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 4px;
  padding: 28px 0 8px;
}
.fdl-dialog__savings-label {
  font-size: 28px;
  font-weight: 500;
  line-height: 1;
  color: var(--color-pay-1);
}
.fdl-dialog__savings-amount {
  font-family: 'Fliggy Sans 102', 'PingFang SC', sans-serif;
  font-size: 42px;
  font-weight: 700;
  line-height: 1;
  color: var(--color-pay-1);
}

/* ===== 脚部（标准 fdl-dialog__footer） ===== */
.fdl-dialog__footer {
  padding: 24px;
}
.fdl-dialog__actions {
  display: flex;
  gap: 18px;
}
.fdl-dialog__btn {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 84px;
  border: none;
  border-radius: 9999px;
  font-family: inherit;
  font-size: 30px;
  font-weight: 500;
  line-height: 1.4;
  cursor: pointer;
  transition: opacity 0.2s ease;
  -webkit-tap-highlight-color: transparent;
}
.fdl-dialog__btn:hover {
  opacity: 0.92;
}
.fdl-dialog__btn:focus-visible {
  outline: 2px solid var(--color-indigo-1);
  outline-offset: 2px;
  opacity: 1;
}
.fdl-dialog__btn--secondary {
  background: var(--color-bg);
  color: var(--color-midgray);
}
.fdl-dialog__btn--primary {
  background: var(--color-pay-1);
  color: var(--color-white);
}
```
