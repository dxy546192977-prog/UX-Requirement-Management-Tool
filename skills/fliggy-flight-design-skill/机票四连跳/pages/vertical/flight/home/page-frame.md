# 机票首页框架（`vertical.flight.home`）

## 元信息

- **page_id**：`vertical.flight.home`
- **设计基准**：**750px 宽（@2x）**；`viewport` **`width=750, user-scalable=no`**
- **依赖**：[`foundations/design-foundations.md`](../../../../foundations/design-foundations.md)
- **最后同步**：2026-04-13

---

## 布局结构（自上而下）

1. **顶部氛围区** — 750×360 品牌渐变背景（`#FFE033` → `#FFF7CC` 向下渐变）+ 状态栏 88px + 透明导航栏（城市定位 + 消息图标）
2. **搜索模块** — `flight-home-search`（白底圆角卡：品类 Tab + 单程/往返/多程 + OD 表单 + 日期 + 乘客舱等 + 黄色搜索按钮）
3. **可滚动主体**（搜索卡与氛围区叠压，搜索卡底部与主体无缝衔接）：
   - **金刚区** — `flight-home-kingkong`（2×4 图标入口白卡）
   - **公告条** — `flight-home-notice`（小黄条：航变/天气/疫情提醒）
   - **营销横滑** — `flight-home-promo`（横滑 Banner 卡片 + 分页条）
   - **推荐航线** — `flight-home-recommend`（低价日历横滑 + 双列航线卡片）
4. **底部悬浮栏** — `flight-home-bottom-bar`（750×145，五入口：**推荐**高亮黄圆 + 我的行程/航班动态/客服/更多）

> **说明**：本页底栏为 **机票频道内** 导航，**非** App 全局 `tabs.*` 五大 Tab。

---

## 固定层

- **顶部**：透明导航栏（navbar transparent），高 88px；滚动后渐变为白底 `.scrolled`
- **底部**：机票频道底栏（flight-home-bottom-bar），高 145px（Tab 81px + 安全区 env(safe-area-inset-bottom)）

## 内容区

- `padding-top: var(--flight-home-content-offset-top, 0)`（搜索卡与氛围区叠压，无额外 padding）
- `padding-bottom: var(--flight-home-content-offset-bottom, 145px)`
- 主内容：`display: flex; flex-direction: column; gap: 18px`

---

## Token（摘录）

- 氛围渐变起：`var(--color-brand-1)` (#FFE033)
- 氛围渐变止：`var(--color-brand-4)` (#FFF7CC)
- 主色文字：`var(--color-darkgray)` (#0F131A)
- 次要文字：`var(--color-midgray)` (#5C5F66)
- 辅助文字：`var(--color-lightgray)` (#919499)
- 搜索主按钮：`var(--color-brand-1)` (#FFE033)
- 价格强调：`var(--color-pay-1)` (#FF5533)

数字体：**Fliggy Sans 102**（CDN `@font-face`）。

---

## 产出

- [`manifest.md`](manifest.md)
- 各模块 `spec.md` + `example.html`
- [`example-full.html`](example-full.html) 整页串联

---

## 变更记录

| 日期 | 说明 |
|------|------|
| 2026-04-13 | 初版，对齐机票首页框架。 |
