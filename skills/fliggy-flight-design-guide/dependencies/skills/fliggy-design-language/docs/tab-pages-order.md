# 五大 Tab 页面 — 落地顺序

与 [platform-components-order.md](platform-components-order.md) 相同节奏：**你每次发该 Tab 的说明（描述 md + 可选结构稿 / html）**，我则按本表 **`page_id` / 目录** 落地。

---

## 底栏与「目的地」边界（已确认）

- **底栏固定 5 个 Tab**：**首页** → **会员** → **消息** → **行程** → **我的**。  
- **「目的地」不是底栏 Tab**：仅在 **首页** 通过 **顶部 Tab 栏** 切换进入；其模块规范落在 **`tabs.home` 目录下的 `modules/`**（与首页主内容并列），**不单独占用** `page_id = tabs.destination`。

---

## 单 Tab 目录结构（每页交付物）

每个底栏 Tab 对应 `pages/tabs/<tab>/`，**至少**包含：

| 文件 / 目录 | 说明 |
|-------------|------|
| **`page-frame.md`** | **1 份**：整页骨架（视口、根布局、顶栏/底栏、主滚动区、安全区、与首页顶 Tab / 底栏联动约定等）。 |
| **`manifest.md`** | 本页生成时的 **读取闭包**：列出所有需读的 **`spec.md`**（**平台 / 业务组件** + **本 Tab 下 `modules/*/spec.md`**）。 |
| **`modules/<模块 slug>/`** | **多个**：每个业务模块一个子目录，内含 **`spec.md`** + **`example.html`**（与平台组件「规范 + 示例」同构）。 |

可选：`example.html` 放在 Tab 根目录，用于 **整页串联预览**（非强制）。

**manifest 规则（摘要）**

- 路径均为仓库根相对路径，指向具体 **`spec.md`**。  
- **须包含**本页会用到的 **`pages/tabs/<tab>/modules/.../spec.md`**，否则编排不应「猜」未登记的模块。  
- 平台 / 业务组件：`components/platform/.../spec.md`、`components/business/.../spec.md` 按需列入。

---

## 落地顺序表

| 序号 | page_id | 目标目录 | 说明（taxonomy 对齐，随落地细化） |
|-----|---------|----------|-------------------------------------|
| 1 | `tabs.home` | `pages/tabs/home/` | 底栏「首页」：**含顶部 Tab**（首页主态 + **目的地**等）；模块含 titlebar、搜索、金刚区、多功能频道、feeds 等；**目的地**子模块：头部、金刚、榜单、当地体验、推荐（路径在 `home/modules/` 下拆分） |
| 2 | `tabs.member` | `pages/tabs/member/` | 底栏「会员」：等级卡片、一通百、Feeds 等 |
| 3 | `tabs.messages` | `pages/tabs/messages/` | 底栏「消息」：子模块清单随你供稿补充 |
| 4 | `tabs.trip` | `pages/tabs/trip/` | 底栏「行程」：机票 / 火车 / 酒店 / 景点门票等卡片与列表骨架 |
| 5 | `tabs.mine` | `pages/tabs/mine/` | 底栏「我的」：头部、工具栏等 |

---

## 进度（随落地勾选）

**序号 1 已落地**：`tabs.home` — **`page-frame.md`** + **`page-frame-destination.md`** + **`manifest.md`**；推荐模块 **`home-titlebar` / `home-search` / `home-kingkong` / `home-multi-channel` / `home-feeds`**；目的地滚动区 **`home-destination-kingkong` / `home-destination-ranking` / `home-destination-local-experience` / `home-destination-recommendation`**（各 `spec.md` + `example.html`）；底栏 **`tabbar`**；**运营 Banner** 走 manifest 中 **`banner`** spec。

**序号 2 已落地**：`tabs.member` — **`page-frame.md`** + **`manifest.md`** + **`member-level-card` / `member-brand-benefits` / `member-airline-challenge-banner` / `member-hotel-feeds`**（各 `spec.md` + `example.html`）；顶栏 **`navbar`**、底栏 **`tabbar`** 见 manifest；**框架扩展位**（里程差额条、保级三宫格等）见 `page-frame.md` 说明。

**序号 3、4 暂缓**：`tabs.messages`、`tabs.trip` — **待供稿**后再按本表落地。

**序号 5 已落地**：`tabs.mine` — **`page-frame.md`** + **`manifest.md`** + **`mine-profile-header` / `mine-toolbar` / `mine-feeds`**（各 `spec.md` + `example.html`）；底栏 **`tabbar`**（「我的」当前态）；整页径向背景与 Feeds 双列见 `page-frame.md`。

**当前可发**：`tabs.messages` / `tabs.trip` 供稿（描述 md + 可选 html），或迭代已落地 Tab。

---

## 检查清单

- [ ] `page-frame.md` 已写清：**底栏当前 Tab**、首页 **顶 Tab** 与内容切换关系（若适用）  
- [ ] 各模块已有 `modules/<slug>/spec.md` + `example.html`（随模块逐个补齐）  
- [ ] `manifest.md` 闭包与上述路径一致  
- [ ] [page-index.md](page-index.md) 对应行已更新  
