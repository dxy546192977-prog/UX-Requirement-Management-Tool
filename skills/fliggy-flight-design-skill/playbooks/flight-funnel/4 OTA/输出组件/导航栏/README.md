# 导航栏

用于国内机票 OTA 结果页的顶部固定区域，包含状态栏、返回、航线标题和右侧操作入口。

## 用途

- 生成整页时的固定顶部
- 单独演示 OTA 顶部导航时

## 默认可见态

- 标题：`杭州 + 导航栏单程icon + 北京`
- 左侧：返回箭头
- 右侧：`低价提醒 / 我的收藏 / 更多`
- 状态栏时间：`9:41`

## 结构层级

```html
<header class="app-nav">
  <div class="status-bar"></div>
  <div class="nav-bar">
    <button class="nav-back"></button>
    <div class="nav-title">
      <div class="nav-route">
        <span class="nav-city">杭州</span>
        <img class="nav-route-icon" alt="">
        <span class="nav-city">北京</span>
      </div>
    </div>
    <div class="nav-actions">
      <button class="nav-action"></button>
      <button class="nav-action"></button>
      <button class="nav-action nav-action-more"></button>
    </div>
  </div>
</header>
```

## 关键尺寸 / 字体 / 排版

- 总高度：`176px`
- 状态栏：`88px`
- 导航栏：`88px`
- 航线组：`190×48`
- 航线组定位：`left: 50% + translateX(-50%)`，必须视觉绝对居中，不能受左返回或右操作组宽度影响
- 城市名：`34px / 48px / 500`
- 导航栏单程icon：`42×42`
- 标签：`12px`，`400`
- 右侧功能组宽度：`168px`

## 资产映射

| 名称 | 用途 | URL |
|------|------|-----|
| 状态栏右侧 | 状态栏右上切图 | `https://gw.alicdn.com/imgextra/i1/O1CN01fDXHWq1je1wcx12ia_!!6000000004572-2-tps-134-24.png` |
| 返回箭头 | 导航左侧 | `https://gw.alicdn.com/imgextra/i1/O1CN01DTmWga1piVVizwK8x_!!6000000005394-2-tps-48-48.png` |
| 导航栏单程icon | 航线标题中间 | `https://gw.alicdn.com/imgextra/i1/O1CN015RbuWn1af6KRGgKmO_!!6000000003356-2-tps-42-42.png` |
| 低价提醒 | 导航右侧第 1 位 | `https://gw.alicdn.com/imgextra/i1/O1CN015uzCtj1heN0PLsbOK_!!6000000004302-2-tps-36-36.png` |
| 我的收藏 | 导航右侧第 2 位 | `https://gw.alicdn.com/imgextra/i4/O1CN01x00HtJ1vG0YmOniAx_!!6000000006144-2-tps-36-36.png` |
| 更多三点 | 导航右侧第 3 位 | `https://gw.alicdn.com/imgextra/i1/O1CN014bSFyZ1xCv7asQHR9_!!6000000006408-2-tps-48-48.png` |

## 可选态

- 只保留更多按钮
- 收藏切为已收藏态
- 标题换为其他航线

## 组合约束

- 整页中必须固定在顶部，不参与滚动
- 不允许混入聊天页分享/点赞工具条
- 更多按钮默认是 icon-only，不添加文字标签
- 航线标题必须是“城市 + 航线 icon + 城市”的三段结构，不允许直接写成 `杭州 — 北京`
