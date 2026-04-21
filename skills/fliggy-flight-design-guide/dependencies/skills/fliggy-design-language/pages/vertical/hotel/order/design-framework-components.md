# 框架组件

生成完整页面时**始终读取本文件**。包含 3 个固定组件，每次输出必须全部包含。

---

## 1. 导航栏（顶部固定）

176px = 状态栏 88px + 导航栏 88px | `position: fixed; top: 0; z-index: 9999;`

导航栏背景透明（依托黄色头部），图标 48×48px SVG

### 规范参数

| 属性 | 值 |
|------|-----|
| 总高度 | `176px` |
| 状态栏高度 | `88px` |
| 导航栏高度 | `88px` |
| 定位 | `position: fixed; top: 0; left: 0` |
| 层级 | `z-index: 9999` |
| 背景 | `transparent` |

### 可复制 HTML

```html
<!-- ====== 导航栏组件 开始 ====== -->
<header class="nav-header">
    <div class="status-bar"></div>
    <nav class="nav-bar">
        <div class="nav-back">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M30 12L18 24L30 36" stroke="#0F131A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </div>
        <div class="nav-more">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="24" r="3" fill="#0F131A"/>
                <circle cx="24" cy="24" r="3" fill="#0F131A"/>
                <circle cx="36" cy="24" r="3" fill="#0F131A"/>
            </svg>
        </div>
    </nav>
</header>
<!-- ====== 导航栏组件 结束 ====== -->
```

### 对应 CSS

```css
.nav-header {
    position: fixed;
    top: 0;
    left: 0;
    width: 750px;
    height: 176px;
    z-index: 9999;
    display: flex;
    flex-direction: column;
    background: transparent;
}
.status-bar {
    height: 88px;
    width: 750px;
    flex-shrink: 0;
}
.nav-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 24px;
    height: 88px;
}
.nav-back, .nav-more {
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}
```

---

## 2. 黄色头部背景（随页面滚动）

480px 高 | `position: absolute; top: 0; z-index: 1;`

### 规范参数

| 属性 | 值 |
|------|-----|
| 高度 | `480px` |
| 宽度 | `750px` |
| 背景色 | `#FFE566` |
| 定位 | `position: absolute; top: 0; left: 0` |
| 层级 | `z-index: 1` |

### 可复制 HTML

```html
<!-- ====== 黄色头部背景 开始 ====== -->
<div class="yellow-header-bg"></div>
<!-- ====== 黄色头部背景 结束 ====== -->
```

### 对应 CSS

```css
.yellow-header-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 750px;
    height: 480px;
    background: #FFE566;
    z-index: 1;
}
```

---

## 3. 主内容区容器

为导航栏预留 176px 顶部空间，为底部操作栏预留 250px 底部空间

### 规范参数

| 属性 | 值 |
|------|-----|
| 顶部内边距 | `176px`（导航栏高度） |
| 左右内边距 | `24px`（页面边距） |
| 底部内边距 | `250px`（底部操作栏+安全距离） |
| 宽度 | `750px` |
| 层级 | `z-index: 2` |
| 定位 | `position: relative` |

### 可复制 HTML

```html
<!-- ====== 主内容区 开始 ====== -->
<main class="main-content">
    <!-- 订单状态头部 -->
    <!-- 价格与政策通栏卡片 -->
    <!-- 酒店信息卡 -->
    <!-- 房型日期信息 -->
    <!-- 会员权益模块 -->
    <!-- 订单信息模块 -->
    <!-- 常见问题标签 -->
</main>
<!-- ====== 主内容区 结束 ====== -->
```

### 对应 CSS

```css
.main-content {
    padding: 176px 24px 250px;
    width: 750px;
    position: relative;
    z-index: 2;
}
```

---

## 4. 底部操作栏（底部固定）

134px = 内容区 100px + 安全区 34px | `position: fixed; bottom: 0; z-index: 999;`

详细规范见 [components/底部操作栏/README.md](components/底部操作栏/README.md)

### 规范参数

| 属性 | 值 |
|------|-----|
| 总高度 | `134px` |
| 内容区高度 | `100px` |
| 安全区高度 | `34px` |
| 定位 | `position: fixed; bottom: 0; left: 0` |
| 层级 | `z-index: 999` |
| 背景 | `var(--color-white)` |
| 顶部边框 | `1px solid rgba(15, 19, 26, 0.06)` |

### 可复制 HTML

```html
<!-- ====== 底部操作栏 开始 ====== -->
<div class="bottom-bar-wrapper">
    <div class="bar-content">
        <button class="bar-btn">
            <img class="btn-icon" src="assets/jiudian.png" alt="">
            <span class="btn-text">联系酒店</span>
        </button>
        <button class="bar-btn">
            <img class="btn-icon" src="assets/kefu 1.png" alt="">
            <span class="btn-text">联系客服</span>
        </button>
        <button class="bar-btn">
            <img class="btn-icon" src="assets/shexiangji.png" alt="">
            <span class="btn-text">直播客服</span>
        </button>
    </div>
    <div class="safe-area"></div>
</div>
<!-- ====== 底部操作栏 结束 ====== -->
```

### 对应 CSS

```css
.bottom-bar-wrapper {
    width: 750px;
    background: var(--color-white);
    border-top: 1px solid rgba(15, 19, 26, 0.06);
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 999;
}
.bar-content {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 100px;
    padding: 0 30px;
}
.bar-btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
    font-family: 'PingFang SC', sans-serif;
}
.btn-icon {
    width: 40px;
    height: 40px;
    object-fit: contain;
}
.btn-text {
    font-size: 22px;
    color: var(--color-darkgray);
}
.safe-area {
    height: 34px;
    background: var(--color-white);
}
```

---

## 页面骨架模板

完整页面的基本结构：

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=750, user-scalable=no">
    <title>酒店订单详情</title>
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
            --radius-l: 6px;
            --radius-m: 12px;
            --radius-s: 6px;
        }

        @font-face {
            font-family: 'Fliggy Sans 102';
            src: url('https://g.alicdn.com/trip/common-assets/1.1.9/fonts/FliggySans102-Md.ttf') format('truetype');
            font-weight: 500;
            font-display: swap;
        }

        * { box-sizing: border-box; }

        body {
            background-color: var(--color-label);
            font-family: 'PingFang SC', 'SimHei', sans-serif;
            margin: 0;
            padding: 0;
            padding-bottom: 250px;
        }

        /* 框架组件样式写在这里 */
        /* 内容组件样式写在这里 */
    </style>
</head>
<body>
    <!-- 黄色头部背景 -->
    <div class="yellow-header-bg"></div>

    <!-- 导航栏 -->
    <header class="nav-header">
        ...导航栏组件...
    </header>

    <!-- 主内容区 -->
    <main class="main-content">
        <!-- 订单状态头部 -->
        <!-- 价格与政策通栏卡片 -->
        <!-- 酒店信息卡 -->
        <!-- 房型日期信息 -->
        <!-- 会员权益模块 -->
        <!-- 订单信息模块 -->
        <!-- 常见问题标签 -->
    </main>

    <!-- 交叉销售模块（可选） -->
    <!-- 底部操作栏 -->
    <div class="bottom-bar-wrapper">
        ...底部操作栏组件...
    </div>
</body>
</html>
```

---

## 通栏模块规范

订单详情页中大部分内容模块采用**通栏白色卡片**布局：

### 通栏样式

```css
.通栏模块 {
    width: 750px;
    margin-left: -24px;
    background: var(--color-white);
    padding: 24px 30px;  /* 或根据模块调整 */
    margin-top: 24px;    /* 模块间距 */
}
```

### 应用此规范的模块

| 模块 | 上内边距 | 下内边距 |
|------|---------|---------|
| 价格+政策卡片 | `20px` | `0` |
| 酒店信息卡 | `24px` | `24px` |
| 房型日期信息 | `24px` | `24px` |
| 会员权益模块 | `24px` | `24px` |
| 订单信息模块 | `0` | `0`（由行高控制） |
| 常见问题标签 | `24px` | `36px` |
