# 国内机票 OTA 页框架（`vertical.flight.ota`）

## 元信息

- **page_id**：`vertical.flight.ota`  
- **设计基准**：**750 × 1624px（@2x）**；根壳 **750×1624**，**单滚动区**（见下）  
- **供稿对齐**：`fliggy-design-flight-ota-skill/框架组件.md` + `输出组件/`；整页还原另见供稿包根目录 **`example.html`**（已同步为 [`example-full.html`](example-full.html)）  
- **依赖**：[`foundations/design-foundations.md`](../../../../foundations/design-foundations.md)  
- **最后同步**：2026-04-06  

---

## 整页壳层（强制）

| 项 | 规则 |
|----|------|
| 页面宽度 | **750px** |
| 根容器 | **750 × 1624**；**`body` 不做纵向滚动**（`overflow: hidden`），由 **唯一** 内层滚动区承担滚动 |
| 背景 | `var(--color-page-bg)`（与供稿 token 一致） |
| 禁止 | 第二个外层滚动容器；禁止把整页改成普通长文档流 |

### 高度切分

- **顶部导航**：固定 **176px**（状态栏 **88** + 导航栏 **88**）  
- **下方滚动区**：**1448px**（1624 − 176）  

### 导航栏（固定）

- 背景 `var(--color-surface)`，贴在壳层顶部。  
- **默认态**：左返回；**中部航线组**（如 `杭州 + 单程 icon + 北京`）须 **绝对居中**，不因左右功能位宽度不均而视觉偏移；**禁止**用 `—`、`->`、`→` 文本代替中间 icon。  
- **右侧**：低价提醒 / 我的收藏 / 更多（尺寸见供稿）。  
- 状态栏右侧 **134×24** 切图（见示例）。  
- **下游**：滚动区从 **176px** 下缘开始；**行程卡紧贴导航**，不加额外白边。  

---

## 滚动区内模块顺序（自上而下）

1. **行程卡** — `flight-ota-itinerary`（高约 **280–340px**，白→灰渐变等，供稿为准）  
2. **提示百叶窗** — `flight-ota-shutter-strip`（约 **67px**，顶 **714px** dashed 分隔；不另包白卡）  
3. **营销小黄条** — `flight-ota-promo-bar`（**96px** 区，白卡 **714×72**，左右 **18**）  
4. **商品模块壳**（白到底灰渐变，顶圆角 **24px**，内容宽约 **714–715**）：  
   - **otatab** — `flight-ota-cabin-section`（三列舱位切换，**106px** 高等，供稿为准）  
   - **商品卡 ×4** — `flight-ota-price-section`（见该模块下 `example*.html` 变体）  
   - **卡片垂直间距** 默认 **18px**  
   - **更多报价入口** — 同属 `flight-ota-price-section`（[`example-more-quotes.html`](modules/flight-ota-price-section/example-more-quotes.html)）  
5. **心智模块** — `flight-ota-watermark`（约 **186px**，底部内容区；**不吸底**）  

> **说明**：`flight-ota-header` 对应 **导航栏**，物理上在滚动区外、壳层顶部（实现上与 `example-full.html` 一致）。

---

## 组合约束（摘录）

- 框架 **不写** 商品卡内部 DOM 细节，细节见 **`输出组件/商品卡片`**。  
- **出行提醒** 属行程卡默认态，**不**单独拆目录。  
- 商品模块内 **更多报价** 为收尾，不单独漂浮在壳外。  

---

## 产出

- [`manifest.md`](manifest.md)  
- 各模块 `spec.md` + `example.html`（及报价区多文件变体）  

---

## 变更记录

| 日期 | 说明 |
|------|------|
| 2026-04-05 | 初版骨架。 |
| 2026-04-06 | 对齐 OTA skill `框架组件.md`：壳层、导航、滚动区高度、模块顺序与约束。 |
