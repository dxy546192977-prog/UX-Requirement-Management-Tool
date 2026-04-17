# 会员 Tab（`tabs.member`）— 页面结构与滚动

## 元信息

- **page_id**：`tabs.member`（与 [docs/page-index.md](../../../docs/page-index.md) 一致时引用）  
- **参考实现**：[example.html](example.html)（**唯一** HTML/CSS 真相源；无 `modules/`）  
- **依赖**：[foundations/design-foundations.md](../../../foundations/design-foundations.md)；配图见 [foundations/image-library.md](../../../foundations/image-library.md)  
- **编排入口**：[SKILL.md](../../../SKILL.md)（意图分流、读取闭包）  
- **最后同步**：2026-04-12  

### 读取闭包（生成/改页时允许打开的规范）

除上表 **依赖** 与 **编排入口** 外，按需查阅：

```text
components/platform/navigation/tabbar/spec.md
components/platform/widgets/price/spec.md
components/platform/display/banner/spec.md
```

顶栏为 **会员一级导航**（`member-page__nav-*`），内联于 [example.html](example.html)，不依赖 `components/platform/navigation/navbar/`。

---

## 一、滚动方式

### 整页随文档滚动

**`body` 随文档滚动**：`main.member-page__main` 内主内容 **整体上移**，与页面一起滚动。

### 固定在视口、不随滚动离开

| 区域 | 类名 / 说明 |
|------|-------------|
| 状态栏图 | **`.member-status-bar`** 容器：`background: #fff` 铺满 **750×88**；内层 **`.status-bar`** 为与 **tabs.home** 同款前景图，`position: absolute; inset: 0; object-fit: cover`；整体 **`position: fixed; top: 0; z-index: 100`** |
| 一级导航栏 | `header.member-page__head` — 内含 `member-page__nav-root` / `member-page__nav-bar`（会员标题 + 下划线 +「里程」+ 规则入口），**`top: 88px`**（紧贴状态栏下缘），`z-index: 99` |

### 固定在底部

- **一级 Tabbar**：`fdl-tabbar` + **安全区**（与 [example.html](example.html) 中 token、`env(safe-area-inset-bottom)` 一致）。

---

## 二、主内容区（随页面滚动）

主内容在 **`div.member-page` → `main.member-page__main`** 内。

- **顶部占位**：`main.member-page__main` 使用 **`padding-top: var(--member-content-offset-top)`**（当前等于 **176px** = 状态栏 **88** + 一级导航 **88**），避免首屏内容被固定头遮挡。
- **模块纵向编排**：`member-page__stack` 使用 **`display: flex; flex-direction: column; gap: 24px`**，与下方 **`member-page__feeds`** 的 **`margin-top: 24px`** 衔接酒店列表区。

### 模块顺序（自上而下）

| 顺序 | 模块 | 类名 / 说明 |
|:----:|------|-------------|
| 1 | 会员等级概览卡 | `fdl-member-level-card` — 头像/进度/里程·购物金/等级主视觉/权益宫格/任务横滑 |
| 2 | 专属品牌会员权益 | `fdl-member-brand-benefits`（外包 `fdl-member-brand-benefits__wrap`）— 区头主副标题 +「全部权益」；卡片 **横滑**（约 **252×170** / 张，列表隐藏滚动条），金色渐变 **「0 元开卡」** 主按钮；控制总高以利首屏屏效 |
| 3 | 航司会员挑战横幅 | `fdl-member-airline-banner` |
| 4 | 酒店 Feeds | `fdl-member-hotel-feeds-wrap` → `fdl-member-hotel-feeds` — 主 Tab、二级 Tab、日期筛选、酒店卡片列表 |

---

## 三、模块左右间距

| 类型 | 规则 |
|------|------|
| 通栏模块 | **左右间距 = 0px**。仅限：**状态栏**（`status-bar`）、**一级导航**（`member-page__head`）、**底部 Tabbar**（`fdl-tabbar` + 安全区）。 |
| 普通内容模块 | **距屏幕左右各 18px**。由 **`--space-page-gutter: 18px`** 与 **`--member-content-max-w: 714px`**（750 − 18×2）统一约束：`member-page__stack` / `member-page__feeds` 使用 **`padding-left/right: var(--space-page-gutter)`**；各主卡 **`width`/`max-width: var(--member-content-max-w)`** 或与 **100%** 同宽于已收窄的父级内。 |
| 新增模块 | 须落在主内容区并遵守 **18px** 边距与 **714px** 最大内容宽，不得单独使用其他水平边距。 |

---

## 四、垂直间距（模块之间）

| 区间 | 规则 |
|------|------|
| 固定头 ↔ 首模块 | 由 **`main.member-page__main` 的 `padding-top`** 承担（非模块间距） |
| 等级卡 ↔ 品牌权益 ↔ 航司横幅 | 由 **`member-page__stack` 的 `gap: 24px`** 统一控制 |
| 航司横幅 ↔ 酒店 Feeds | **`member-page__feeds` 的 `margin-top: 24px`** |
| 酒店 Feeds 底部 | **`member-page__feeds` 的 `padding-bottom: 32px`**；另叠加 **`body` 的 `padding-bottom`** 为 Tabbar 让位 |

### 与固定头相关的占位（非「模块间距」）

- **`padding-top: 176px`**：状态栏 + 一级导航总高。若固定头高度变化，须同步改 [example.html](example.html) 中 **`--member-fixed-header-h` / `--member-content-offset-top`** 与本节说明。  
- **`body` 的 `padding-bottom`**：`calc(var(--fdl-tabbar-nav-h) + var(--fdl-tabbar-safe-h) + env(safe-area-inset-bottom, 0px))`，避免底部内容被 Tabbar 挡住。

---

## 五、固定 vs 滚动 — 一览

| 固定在视口 | 随页面滚动 |
|------------|------------|
| 状态栏、一级导航、底部 Tabbar（含安全区） | 等级卡、品牌权益、航司横幅、酒店 Feeds（均在 `member-page__main` 文档流内） |

---

## 六、实现注意

- 固定头高度与 **`main` 的 `padding-top`** 必须 **同算**，否则会出现遮挡或过大留白。  
- **无 `box-shadow`** 的业务卡片样式以 [example.html](example.html) 为准；与灰底页面对比依赖白底块本身，勿随意加投影。  
- 酒店列表价数字字体与 **price** spec 对齐（示例内 **Fliggy Sans 102**）。

---

## 七、变更记录

| 日期 | 说明 |
|------|------|
| 2026-04-12 | 初版：对齐 [example.html](example.html) — 状态栏 + 固定一级导航、`--member-content-max-w` / **18px** 边距、单文件维护；取代原 `page-frame.md` / `manifest.md` / `README.md` 的叙述职责。 |
