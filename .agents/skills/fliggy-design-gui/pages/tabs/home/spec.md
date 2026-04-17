# 首页（tabs.home）— 页面结构与滚动

## 元信息

- **page_id**：`tabs.home`（与 [docs/page-index.md](../../../docs/page-index.md) 一致时引用）  
- **参考实现**：[example.html](example.html)  
- **依赖**：[foundations/design-foundations.md](../../../foundations/design-foundations.md)；配图见 [foundations/image-library.md](../../../foundations/image-library.md)  
- **编排入口**：[SKILL.md](../../../SKILL.md)（意图分流、读取闭包）  
- **最后同步**：2026-04-14  

---

## 一、滚动方式

### 整页随文档滚动

**`body` 随文档滚动**：`main.page` 内与文档流一致的内容 **整体上移**，与页面一起滚动。

### 固定在视口、不随滚动离开

| 区域 | 类名 / 说明 |
|------|-------------|
| 头部白底渐变层 | `header-bg-scrim` — **仅透明度**随滚动变化，不离开视口 |
| 状态栏图 | `status-bar` |
| 顶栏导航 | `titlebar-container` — 含 Logo、飞猪千问/推荐/杭州、我的收藏 |
| 仅搜索输入条 | `search-box-fixed-wrap` 内的 **`search-box`** — **不含**下方推荐词（推荐词在可滚主内容区） |

### 固定在底部

- **一级 Tabbar**：`fdl-tabbar` + **安全区**（`env(safe-area-inset-bottom)` 等与示例一致）。

---

## 二、主内容区（随页面滚动）

上述可滚内容均在 **`main.page` → `section.content-placeholder`** 内。

- **顶部占位**：`content-placeholder` 使用 **`padding-top: var(--home-content-offset-top)`**（当前等于 286px），由 token 统一计算「状态栏 + 导航 + 固定搜索条」高度，避免固定头改动后出现异常大空白。
- **模块纵向编排**：`content-placeholder` 采用 **`display: flex; flex-direction: column; gap: var(--space-module-y);`**，统一管理模块间距，禁止各模块再叠加大 `margin-top`。

### 模块顺序（自上而下）

| 顺序 | 模块 | 类名 / 说明 |
|:----:|------|-------------|
| 1 | 搜索推荐词 | `search-module-wrap` → `quick-tags-strip` → `quick-tags` |
| 2 | 金刚区 | `jinggang-wrap` — 含大图标行、两行小图标、轮播指示点。**可按需求改结构**：例如仅一行小图标、不要大图标、替换图标等 |
| 3 | 多功能频道 | `channel-wrap` — **1+1+1+2** 四块卡片区域。**可增加或删除卡片**；增删后布局需 **自适应** |
| 4 | 双排推荐 Feeds | `fdl-feeds-dual-wrap` → `fdl-feeds-dual`（双列 + 背景条等）；细则见 [feeds-dual-column spec](../../../components/platform/widgets/feeds-dual-column/spec.md) |

### 氛围背景（同属可滚区域）

- **`section.hero-atmosphere`**：位于 `main` 内，`position: absolute`，宽 **750**、高 **350**，作为顶部氛围背景。  
- 与 **推荐词 / 金刚区 / 频道 / Feeds** 一样随 **`main` 与文档** 滚动；视觉上叠在模块 **上方**，不参与固定头/底的 sticky/fixed 逻辑。

---

## 三、模块左右间距

| 类型 | 规则 |
|------|------|
| 通栏模块 | **左右间距 = 0px**。仅限：状态栏（`status-bar`）、导航栏（`titlebar-container`）、头部渐变层（`header-bg-scrim`）、底部 Tabbar（`fdl-tabbar` + 安全区）。 |
| 普通内容模块 | **左右间距 = 30px**。适用于搜索框、金刚区、多功能频道、Feeds 等主内容模块。 |
| 新增可滚动模块 | 只要属于主内容区并随页面滚动，**左右间距必须统一为 30px**，不得单独使用其他值。 |

---

## 四、垂直间距（模块之间）

| 区间 | 规则 |
|------|------|
| 推荐词 ↔ 金刚区 | 由 `content-placeholder` 的 **`gap: 24px`** 统一控制 |
| 金刚区 ↔ 多功能频道 | 由 `content-placeholder` 的 **`gap: 24px`** 统一控制 |
| 多功能频道 ↔ 双排 Feeds | 由 `content-placeholder` 的 **`gap: 24px`** 统一控制 |
| Feeds 区域底部 | `fdl-feeds-dual-wrap` 使用 **`padding-bottom: 48px`**（与底部 Tabbar 之间的留白；另叠加 `body` 的 `padding-bottom` 为 Tabbar 让位） |

### 与固定头相关的占位（非「模块间距」）

- **`content-placeholder` 的 `padding-top: 286px`**  
  - 对应：**状态栏 88** + **导航 88** + **固定搜索条区域**（上 **12** + 框高 **80** + 下 **18**）。  
  - 目的：首屏推荐词出现在固定搜索框 **下方**，并与搜索条保留 **18px** 间隔。

- **`body` 的 `padding-bottom`**  
  - **`102px`（导航栏）+ `64px`（安全区占位）+ `env(safe-area-inset-bottom)`**（与 [example.html](example.html) 中 token 一致时可写为 `calc(var(--fdl-tabbar-nav-h) + var(--fdl-tabbar-safe-h) + env(...))`）。  
  - 避免最后一块内容被固定 Tabbar 挡住。

---

## 五、固定 vs 滚动 — 一览

| 固定在视口 | 随页面滚动 |
|------------|------------|
| 头部白底渐变层、状态栏、顶栏导航、搜索输入条（不含推荐词） | `hero-atmosphere`（氛围区） |
| 底部 Tabbar（含安全区） | 推荐词、金刚区、多功能频道、双排 Feeds（均在 `content-placeholder` 文档流内） |

---

## 六、实现注意

- 固定层与 `content-placeholder` 的 **`padding-top` / `body` 的 `padding-bottom`** 必须 **同算**，否则会出现遮挡或过大留白。  
- 修改金刚区、频道 **卡片数量或行数** 时，同步检查 **286px** 占位是否仍与固定搜索条对齐（若固定头高度变化，应更新占位与本文档）。  
- 双排 Feeds 的 DOM 与 token 以组件 spec 为准；页面只负责 **wrap 级** margin/padding 与在 manifest 中的登记。

---

## 七、生成纪律（禁止用占位块代替真模块）

单文件 HTML 交付时，**禁止**用灰色底 + 说明文案（例如「首页频道模块（沿用 tabs.home…）」「双列 Feeds 模块…」）替代下列已落地实现：

- **多功能频道**：须保留 [example.html](example.html) 中 **`channel-wrap` → `channel-container`** 完整子树及配套 CSS。  
- **双排 Feeds**：须保留 **`fdl-feeds-dual-wrap` → `fdl-feeds-dual`** 完整子树及配套 CSS（与 [feeds-dual-column spec](../../../components/platform/widgets/feeds-dual-column/spec.md) 一致时可再对细节对齐）。

若合并到其他页面（如酒店首页），仍须 **内联拷贝**上述 DOM 与样式，不得省略为占位符。编排要求见根目录 [SKILL.md](../../../SKILL.md)「模块实装纪律」。
