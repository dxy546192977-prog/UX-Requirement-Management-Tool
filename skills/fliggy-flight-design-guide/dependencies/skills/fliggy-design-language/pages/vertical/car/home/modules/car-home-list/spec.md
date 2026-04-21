# 模块：安心租首页 · 列表主容器（`car-home-list`）

## 用途

**白底大容器**：标题头 → 城市 Tab → 4-3 视频组 → 车辆卡列表。

## 结构

1. `.az-list-header` — 左标题 32px / 右「更多」  
2. `.az-list-top-tabs` — 城市 Tab，激活浅黄顶渐变  
3. `.az-guide-rail` — 整组切图 **741×318** 置于 **654** 宽容器，第三张露边  
4. `.az-car-list` — `.az-car-card` 间距 **18px**  

## 车辆卡要点

- 左图 **190×127** 区，车图约 **188×90** contain  
- 价格 **`var(--az-pay)`**，数字 **Fliggy Sans 102**  
- CTA **120×48**（样式表内），圆角 42px，橙红底  
- 角标优先切图 **120×36**  

## 文件

- 样式：[`az-list-module.css`](az-list-module.css)  
- 预览：[`example.html`](example.html)（示例含多卡；可对照整页）  

## 关联

[`../../example-full.html`](../../example-full.html)  
