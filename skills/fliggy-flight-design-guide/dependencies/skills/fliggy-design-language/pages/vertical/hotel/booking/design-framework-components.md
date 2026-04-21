# 框架组件

生成完整页面时**始终读取本文件**。包含 3 个固定框架组件，每次输出必须全部包含。AI 仅需替换标注了 `<!-- AI替换 -->` 的内容，不修改结构和样式。

---

## 1. 顶部渐变背景 + 导航栏（顶部固定）

### 顶部渐变背景

- 绝对定位：`position: absolute; top: 0; left: 0;`
- 尺寸：750px × 514px
- 渐变色：`linear-gradient(180deg, rgba(255, 224, 51, 1) 0%, rgba(255, 224, 51, 0) 100%)`
- 层级：`z-index: -1`，不影响内容点击

### 导航栏

- 固定定位：`position: fixed; top: 0; left: 0; z-index: 100;`
- 尺寸：750px × 88px
- 背景：默认 transparent，滚动后切换为 var(--color-white)
- 返回按钮：48px × 48px，距左 24px
- 标题：34px / 500 / var(--color-darkgray)，水平居中

### 可复制 HTML

```html
<!-- ====== 顶部渐变背景 开始 ====== -->
<div class="top-gradient-bg" style="
  position: absolute;
  top: 0;
  left: 0;
  width: 750px;
  height: 514px;
  background: linear-gradient(180deg, rgba(255, 224, 51, 1) 0%, rgba(255, 224, 51, 0) 100%);
  z-index: -1;
  pointer-events: none;
"></div>
<!-- ====== 顶部渐变背景 结束 ====== -->

<!-- ====== 顶部导航栏 开始 ====== -->
<header class="nav-header" style="
  position: fixed;
  top: 0;
  left: 0;
  width: 750px;
  height: 88px;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  transition: background 0.2s ease;
">
  <div class="nav-back" style="
    position: absolute;
    left: 24px;
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
  ">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M15 19L8 12L15 5" stroke="#0F131A" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </div>
  <h1 class="nav-title" style="
    font-size: 34px;
    font-weight: 500;
    color: var(--color-darkgray);
    margin: 0;
  "><!-- AI替换：酒店名称 -->杭州余杭万豪行政公寓</h1>
</header>
<!-- ====== 顶部导航栏 结束 ====== -->
```

> 导航栏滚动变白需 JS 控制，添加 `.scrolled` 类：
> ```javascript
> window.addEventListener('scroll', function() {
>   const nav = document.querySelector('.nav-header');
>   if (window.scrollY > 50) {
>     nav.classList.add('scrolled');
>   } else {
>     nav.classList.remove('scrolled');
>   }
> });
> ```

---

## 2. 内容区域容器

- 布局：`display: flex; flex-direction: column;`
- 上边距：`padding-top: 112px`（导航栏 88px + 间距 24px）
- 左右边距：`padding: 0 18px`
- 模块间距：`gap: 18px`
- 下边距：由 body 的 `padding-bottom: 160px` 预留底部支付栏空间

### 可复制 HTML

```html
<!-- ====== 内容区域 开始 ====== -->
<main class="content" style="
  padding: 112px 18px 0;
  display: flex;
  flex-direction: column;
  gap: 18px;
">
  <!-- AI替换：在此放置业务组件卡片 -->
  
  <!-- 酒店预订信息卡 -->
  <!-- 入住信息卡 -->
  <!-- 优惠权益卡 -->
  <!-- 挑战任务卡 -->
  <!-- 出行保障卡 -->
  <!-- 发票报销卡 -->
  <!-- 重要提醒卡 -->
  <!-- 支付方式选择器 -->
  <!-- 协议信息区 -->
  
</main>
<!-- ====== 内容区域 结束 ====== -->
```

---

## 3. 底部支付栏（底部固定）

- 固定定位：`position: fixed; bottom: 0; left: 0; z-index: 100;`
- 尺寸：750px × 140px
- 背景：var(--color-white)
- 上边框：`1px solid #EEEEEE`
- 布局：`display: flex; justify-content: flex-end; align-items: center; gap: 24px;`
- 左右边距：`padding: 0 18px`

### 价格区域

- 纵向布局，右对齐
- 货币符号：32px / 700 / var(--color-pay-1) / Fliggy Sans 102
- 价格金额：48px / 700 / var(--color-pay-1) / Fliggy Sans 102
- 价格小数：32px / 700 / var(--color-pay-1) / Fliggy Sans 102
- 明细入口：22px / var(--color-lightgray)

### 支付按钮

- 尺寸：260px × 88px
- 背景：`linear-gradient(135deg, #FF6B4A 0%, #FF5533 100%)`
- 圆角：44px（胶囊形）
- 文字：32px / 600 / var(--color-white)
- 无边框：`border: none`

### 可复制 HTML

```html
<!-- ====== 底部支付栏 开始 ====== -->
<footer class="bottom-bar" style="
  position: fixed;
  bottom: 0;
  left: 0;
  width: 750px;
  height: 140px;
  background: var(--color-white);
  border-top: 1px solid #EEEEEE;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 24px;
  padding: 0 18px;
  z-index: 100;
  box-sizing: border-box;
">
  <!-- 价格区域 -->
  <div class="price-section" style="
    display: flex;
    flex-direction: column;
    gap: 2px;
    align-items: flex-end;
  ">
    <div class="total-price" style="
      display: flex;
      align-items: baseline;
      gap: 0;
    ">
      <span class="price-currency" style="
        font-size: 32px;
        font-weight: 700;
        color: var(--color-pay-1);
        font-family: 'Fliggy Sans 102', 'PingFang SC', sans-serif;
      ">¥</span>
      <span class="price-amount" style="
        font-size: 48px;
        font-weight: 700;
        color: var(--color-pay-1);
        font-family: 'Fliggy Sans 102', 'PingFang SC', sans-serif;
      "><!-- AI替换：整数部分 -->1,088</span>
      <span class="price-decimal" style="
        font-size: 32px;
        font-weight: 700;
        color: var(--color-pay-1);
        font-family: 'Fliggy Sans 102', 'PingFang SC', sans-serif;
      ">.<!-- AI替换：小数部分 -->00</span>
    </div>
    <div class="price-desc" style="
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 22px;
      color: var(--color-lightgray);
    ">
      <span>明细</span>
      <img src="assets/支付组件进入箭头.png" alt="" style="width: 10px; height: 18px; object-fit: contain;">
    </div>
  </div>
  
  <!-- 支付按钮 -->
  <button class="pay-btn" style="
    width: 260px;
    height: 88px;
    background: linear-gradient(135deg, #FF6B4A 0%, #FF5533 100%);
    border: none;
    border-radius: 44px;
    font-size: 32px;
    font-weight: 600;
    color: var(--color-white);
    cursor: pointer;
  ">提交订单</button>
</footer>
<!-- ====== 底部支付栏 结束 ====== -->
```

> body 需预留底部空间：`padding-bottom: 160px;`

---

## 页面骨架模板

完整页面的基本结构参考（AI 根据需求在内容区域填充组件）：

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=750, user-scalable=no">
  <title>酒店下单 - <!-- AI替换：酒店名称 --></title>
  <style>
    :root {
      --color-darkgray: #0f131a;
      --color-midgray: #5c5f66;
      --color-lightgray: #919499;
      --color-indigo-1: #6666ff;
      --color-indigo-4: #EBEBFF;
      --color-warning-1: #ff3333;
      --color-pay-1: #ff5533;
      --color-white: #ffffff;
      --color-label: #F7F8FA;
      --color-bg: #f2f3f5;
      --radius-xl: 36px;
      --radius-l: 24px;
      --radius-m: 12px;
      --radius-s: 6px;
    }

    @font-face {
      font-family: 'Fliggy Sans 102';
      src: url('https://g.alicdn.com/trip/common-assets/1.1.9/fonts/FliggySans102-Md.ttf') format('truetype');
      font-weight: 500;
      font-display: swap;
    }

    * { margin: 0; padding: 0; box-sizing: border-box; }
    
    body {
      background-color: var(--color-label);
      font-family: 'PingFang SC', 'SimHei', sans-serif;
      padding-bottom: 160px;
    }

    /* 通用卡片样式 */
    .card {
      background: var(--color-white);
      border-radius: 12px;
      padding: 24px;
    }

    /* 导航栏滚动状态 */
    .nav-header.scrolled {
      background: var(--color-white);
    }

    /* 组件样式写在这里 */
  </style>
</head>
<body>
  <!-- 顶部渐变背景 -->
  ...顶部渐变背景组件...

  <!-- 顶部导航栏 -->
  ...顶部导航栏组件...

  <!-- 内容区域 -->
  <main class="content" style="padding: 112px 18px 0; display: flex; flex-direction: column; gap: 18px;">
    <!-- AI 根据需求填充业务组件 -->
  </main>

  <!-- 底部支付栏 -->
  ...底部支付栏组件...

  <!-- 滚动监听脚本 -->
  <script>
    window.addEventListener('scroll', function() {
      const nav = document.querySelector('.nav-header');
      if (window.scrollY > 50) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    });
  </script>
</body>
</html>
```
