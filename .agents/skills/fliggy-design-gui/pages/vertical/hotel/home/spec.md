# 酒店首页（`vertical.hotel.home`）— 页面结构

## 元信息

- **page_id**：`vertical.hotel.home`（与 [docs/page-index.md](../../../docs/page-index.md) 一致时引用）  
- **参考实现**：[example.html](example.html)（**唯一** HTML/CSS 真相源；无 `modules/`、`manifest.md`）  
- **依赖**：[foundations/design-foundations.md](../../../foundations/design-foundations.md)；配图见 [foundations/image-library.md](../../../foundations/image-library.md)；Banner / Tabbar 等可对照 `components/platform/display/banner/spec.md`、`components/platform/navigation/tabbar/spec.md`  
- **Skill 编排入口**：[SKILL.md](../../../../SKILL.md)  
- **最后同步**：2026-04-12  

---

## 一、视口与布局骨架

- **viewport**：`width=750, user-scalable=no, viewport-fit=cover`  
- **根容器**：`.hotel-home-full` — `width: 750px` 居中、`flex-direction: column`、`gap: 18px`；底部为 **固定酒店 Tabbar**（**145px** + `env(safe-area-inset-bottom)`）预留 `padding-bottom: calc(145px + env(safe-area-inset-bottom, 0px) + 18px)`（与 [example.html](example.html) 一致）。  
- **固定顶栏**：`.hotel-fixed-chrome` — 状态栏 + 导航栏 **不随内容滚动**；页面上滑时 **`#hotelFixedChromeScrim` 白底不透明度** 随 `scrollY` 渐增，并切换 `.is-scrolled` 以反转状态栏/导航图标为深色。  
- **Banner**：`.banner-component` 高度 **282px**（较历史 332px **减 50px**），仅承载头图，**不再**内嵌状态栏/导航 DOM。  
- **酒店频道底栏**：`.bottom-bar` — `position: fixed` 吸底，**非**文档流末尾随滚模块；底侧含 `padding-bottom: env(safe-area-inset-bottom)`。  

---

## 二、主内容模块顺序（自上而下）

[example.html](example.html) 内样式分区以注释 `/* --- modules/hotel-home-*/` 标记，逻辑顺序为：

| 顺序 | 模块 | 说明 |
|:----:|------|------|
| 1 | `hotel-home-banner` | 顶区 Banner / 氛围 |
| 2 | `hotel-home-search` | 搜索条（与 Banner 叠压关系见示例 `margin-top`） |
| 3 | `hotel-home-inspiration` | 灵感横滑；模块宽 **714px**（`750 − 18×2`）居中，距屏幕 **左右各 18px**；头区与横滑区内边距 **18px** |
| 4 | `hotel-home-promo-row` | 促销三卡；历史另有 `example-layout-b.html` 变体稿，**整页默认以本 `example.html` 为准** |
| 5 | `hotel-home-hotel-card` | 猜你喜欢 / 酒店卡片流 |
| 6 | `hotel-home-tabbar` | 酒店频道底栏 |

---

## 三、维护约定

- 促销排布、卡片数量变化时，同步检查 **搜索条与 Banner 叠压**、**底部 Tabbar 避让**（`padding-bottom` 等）。  
- **阴影**：本页模块已去 `box-shadow`；新增块时遵守 [foundations/design-foundations.md](../../../foundations/design-foundations.md)「阴影与层级」— **尽量少用阴影**，优先分割线与背景层级。  
- **A 类扩写**（在首页插入活动模块）须以 [example.html](example.html) 为底稿在约定纵向位置插入，不得整页重写脱离本页 IA；见根目录 [SKILL.md](../../../../SKILL.md)。  

---

## 四、变更记录

| 日期 | 说明 |
|------|------|
| 2026-04-12 | 对齐 `tabs.*` 范式：仅保留 `spec.md` + `example.html`；原 `manifest.md`、`page-frame.md`、`modules/` 已并入单页。 |
| 2026-04-12 | 固定顶栏（白底渐显）+ 固定底栏；Banner 高度 −50px；灵感区左右 **18px**；去模块 `box-shadow`。 |
