# 我的 Tab（tabs.mine）— 页面结构与滚动

## 元信息

- **page_id**：`tabs.mine`（与 [docs/page-index.md](../../../docs/page-index.md) 一致时引用）  
- **参考实现**：[example.html](example.html)（本目录仅 **`spec.md` + `example.html`**；原 `manifest.md`、`page-frame.md`、`modules/` 已并入单页）  
- **依赖**：[foundations/design-foundations.md](../../../foundations/design-foundations.md)；底栏见 [components/platform/navigation/tabbar/spec.md](../../../components/platform/navigation/tabbar/spec.md)；双排 Feeds 与 [home 示例](../home/example.html) 中 **`fdl-feeds-dual`** 一致，细则见 [feeds-dual-column spec](../../../components/platform/widgets/feeds-dual-column/spec.md)；Feeds 价格数字见 [price spec](../../../components/platform/widgets/price/spec.md)  
- **编排入口**：[SKILL.md](../../../SKILL.md)  
- **最后同步**：2026-04-12  

---

## 一、视口与页背景

| 项 | 值 |
|----|-----|
| 视口 | `width=750`（与兄弟 Tab 示例一致） |
| 与状态栏间距 | `.mine-page` 使用 **`padding-top: 30px`**，主内容整体下移，与固定状态栏留出空隙 |
| 首屏上部 | 径向渐变 `radial-gradient(248.04% 400.81% at 100% 0%, #FFFFFF 0%, #E4E4FD 50.35%)`，由 **`.fdl-mine-profile-header`** 承担 |
| Feeds / 工具栏下半 | 主体底 **`#F2F3F5`**（`--color-bg`），与工具栏渐变尾部一致；底部推荐区为首页同源 **`fdl-feeds-dual-wrap`** |

---

## 二、固定与滚动

### 固定在视口顶部

- **状态栏**：与 **`tabs.home`** 相同资源——**`.status-bar`** 固定 **`750×88`** 前景图（透明底 PNG，叠在个人中心径向渐变之上），`z-index: 100`，**`pointer-events: none`**，避免挡住下方点击。

### 整页纵向滚动

- **`body.tabs-mine`**：`padding-bottom` 预留 **一级 TabBar 高度 + 安全区**（`--fdl-tabbar-nav-h` + `--fdl-tabbar-safe-h` + `env(safe-area-inset-bottom)`），避免内容被底栏遮挡。

### 固定在视口底部

- **`fdl-tabbar`**：`position: fixed`，宽 **750px** 居中，`z-index: 1000`。  
- **当前 Tab**：**我的**（`fdl-tabbar__item--active` + `aria-current="page"`）；激活标签字色 **`#6666FF`**（与供稿一致，见 [example.html](example.html) 内样式）。

---

## 三、主内容区模块顺序（自上而下）

均在 **`main.mine-page__main`**（`.mine-page` 宽 750px 居中）内，**自上而下**：

| 顺序 | 区块 | 根类名 | 说明 |
|:----:|------|--------|------|
| 1 | 个人中心头部 | `.fdl-mine-profile-header` | 头像、昵称与进度、客服/设置、紫色会员大卡、品牌直通浮层、权益四宫格、省钱卡（无头像旁会员标签） |
| 2 | 工具栏 | `.fdl-mine-toolbar` | 三行 × 5 入口；**第一、三行**保留 **48×48** 图标 + 文案；**第二行**（我的收藏 / 购物车 / 浏览历史 / 红包卡券 / 我的里程）**无图标**，仅 **紫色数字**（`.fdl-mine-toolbar__count`，Fliggy Sans 102 **38px / `#6666FF`**）+ 文案；第三行底部双段指示器；与头部衔接处有轻微 **负 `margin-top`** |
| 3 | 猜你喜欢 Feeds | `.fdl-feeds-dual-wrap` → `.fdl-feeds-dual` | 与 **`tabs.home`** 同款双排组件（背景条、左列轮播大卡、双列卡片等）；维护时建议与 [home/example.html](../home/example.html) 同步 |

**不单独建底栏模块**：与 `tabs.home` / `tabs.member` 同源 **`fdl-tabbar`** DOM + CSS（从会员整页示例抽取并改为「我的」选中）。

---

## 四、层级（z-index 摘要）

- **吸底 TabBar**：最高（如 **1000**）。  
- **状态栏前景**：**100**（低于 TabBar，高于头部内容区）。  
- **头部**：品牌直通浮层等局部 **2～12**（见 [example.html](example.html)）。  
- **工具栏第三行指示器**：**5**（与模块原稿一致）。  

---

## 五、维护说明

- 头部 / 工具栏 / Feeds 的 **BEM 类名与量纲** 以 [example.html](example.html) 为唯一真相源。  
- 若需与首页底栏资源对齐，可对照 [home/example.html](../home/example.html) 或 [member/example.html](../member/example.html) 中的 **`fdl-tabbar`** 片段替换本页对应 HTML/CSS。

---

## 变更记录

| 日期 | 说明 |
|------|------|
| 2026-04-12 | 合并为 `spec.md` + `example.html`；状态栏与首页同源透明 PNG；底部 Feeds 为首页 `fdl-feeds-dual`；工具栏第二行仅紫色数字无图标。 |
| 2026-04-12 | `.mine-page` 增加 `padding-top: 30px`。 |
| 2026-04-12 | 移除头像旁会员标签（`member-pill`）。 |
