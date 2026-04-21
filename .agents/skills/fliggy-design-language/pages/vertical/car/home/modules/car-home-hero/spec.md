# 模块：安心租首页 · 顶部氛围（`car-home-hero`）

## 用途

沉浸式暖金头图区，含状态栏、导航、主标题与轮播点等（高保真优先 **整图切片**，少手写重绘）。

## 尺寸与文件

| 项 | 值 |
|----|-----|
| 容器 `.az-hero` | 750×267px，`overflow: hidden` |
| 切片 `.az-hero-slice` | 750×267，`object-fit: cover` |
| 样式 | [`az-hero.css`](az-hero.css) |
| 示例图（当前） | `O1CN01CW9RnY1SNgL4XF1in_!!6000000002235-2-tps-1502-534.png`（@2x 1502×534） |

## AI 可配置

角标/主副标题文案、轮播点状态、右上操作数量等（切图已含则改资源）。

## 约束

- 顶部保持 **暖色**，避免整块深色主导。  
- 与下方搜索卡 **压接** 关系由整页 `.az-main-stack` 负边距控制，不单靠本模块。  

## 关联

- 整页：[`../../page-frame.md`](../../page-frame.md)、[`../../example-full.html`](../../example-full.html)  
