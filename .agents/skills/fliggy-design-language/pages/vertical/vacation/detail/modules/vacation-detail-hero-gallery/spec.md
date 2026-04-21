# vacation-detail-hero-gallery · 头图画廊

## 用途

商详顶部 **750×750** 主图区；支持横向滑动多图；底部弱渐变 + 页码胶囊。

## 尺寸（@2x）

| 属性 | 值 |
|------|-----|
| 容器 | `750×750` |
| 行为 | 随页面滚动上移，**不** fixed |

## 层次

1. 横向 `slider-wrapper` + 多 `slider-slide`
2. 底部渐变遮罩（`pointer-events: none`）
3. 右下角计数器 `当前/总数`

## 参考

- [`example.html`](./example.html)
