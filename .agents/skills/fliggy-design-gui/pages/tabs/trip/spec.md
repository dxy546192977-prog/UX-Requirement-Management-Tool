# 行程 Tab（tabs.trip）— 页面结构与滚动

## 元信息

- **page_id**：`tabs.trip`（与 [docs/page-index.md](../../../docs/page-index.md) 一致时引用）  
- **参考实现**：[example.html](example.html)（本目录仅保留 **`spec.md` + `example.html`**，样式与结构均在单文件内维护）  
- **依赖**：[foundations/design-foundations.md](../../../foundations/design-foundations.md)；双排 Feeds 细则见 [feeds-dual-column spec](../../../components/platform/widgets/feeds-dual-column/spec.md)（与首页 `fdl-feeds-dual` 共用样式）  
- **编排入口**：[SKILL.md](../../../SKILL.md)  
- **最后同步**：2026-04-12  

### 与首页复用部分

- **猜你喜欢**：DOM + CSS 与 `tabs.home` 中 `fdl-feeds-dual-wrap` 一致；若首页该块有迭代，可对照 [home/example.html](../home/example.html) 将对应片段手工同步到本页 `example.html`。  
- **一级 Tabbar**：`fdl-tabbar` 结构与样式同源；本页示例中 **「行程」为当前选中**（`fdl-tabbar__item--active` + `aria-current="page"`）。

---

## 一、视口与全局

| 项 | 值 |
|----|-----|
| 设计基准 | @2x，画布 750×1624 |
| 视口 | `width=750`（与兄弟 Tab 示例一致） |
| 页面背景 | `#F5F6FA` |
| 字体栈 | `-apple-system`, `"PingFang SC"`, `"Helvetica Neue"`, `"Microsoft YaHei"`, sans-serif |

---

## 二、固定与滚动

### 固定在视口顶部

- **顶栏容器**：`trip-page__header`（内含 `top-nav`：88px 状态栏 + 105px 标题栏，总高 **193px**）。  
- **滚动过渡**：初始顶栏区域背景与页面底一致（透明顶栏下的 `top-nav` 背景透明）；`scrollY > 100` 时为 `trip-page__header` 增加 **`is-scrolled`**，顶栏过渡为白底 `#FFFFFF`（样式见 [example.html](example.html) 内 `<style>`）。

### 随文档滚动

- **AI 入口**：`trip-page__ai-wrap` → `ai-entry`（690×117 白卡、「问一问」等），**不吸顶**，与主内容一起滚动。  
- **行程时间线**：`section.trip-timeline`（竖轴 + 多组「节点行 + 660px 卡片」）。  
- **猜你喜欢**：`fdl-feeds-dual-wrap` 接在时间线之后。

### 固定在视口底部

- **`fdl-tabbar`** + 安全区，与首页示例一致。

主滚动区为 **`main.trip-page__main`**，使用 **`padding-top: var(--trip-header-h)`**（193px）为固定顶栏留出空间。

---

## 三、时间线布局（摘要）

| 位置 | 值 |
|------|-----|
| viewport 左 → 圆点左缘 | 30px |
| 圆点直径 | 20px |
| 圆点右缘 → 卡片左缘 | 10px |
| 卡片宽 | 660px |
| 卡片右缘 → viewport 右 | 30px |
| 竖轴线宽 / 色 | 2px / `#E5E7EB`，轴线中心距左 **40px** |
| 节点行底 → 卡片顶 | 12px |
| 组与组之间 | 56px |

节点行：左侧圆点 + 日期描述（26px / 500 / `#333333`）+ 右侧天气区（温度 24px `#9CA3AF`、示意图标与 `>`）。  
卡片：`order-card` / `train-card` / `hotel-card` / `ticket-card`（BEM 与 DOM 均以 [example.html](example.html) 为准）。

---

## 四、顶栏与 AI 文案

- **标题**：「行程」；右侧：**添加、分享、更多**（图标 URL 以 [example.html](example.html) 为准）。  
- **AI 卡片**：`ai-entry`，中间文案示例含中文引号；右侧主按钮 `#6666FF`。
