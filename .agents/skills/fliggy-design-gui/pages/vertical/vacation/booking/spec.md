# 门票/玩乐下单（`vertical.vacation.booking`）— 页面结构与滚动

## 元信息

- **page_id**：`vertical.vacation.booking`（与 [docs/page-index.md](../../../../docs/page-index.md) 一致时引用）  
- **参考实现**：[example.html](example.html)（**唯一** HTML/CSS 真相源；无 `modules/`、`manifest.md`）  
- **来源**：由用户本地桌面目录 **`门票下单页/index.html`** 迁入并收束为单文件；后续以本仓库 **[example.html](example.html)** 为准维护。  
- **依赖**：[foundations/design-foundations.md](../../../../foundations/design-foundations.md)；配图见 [foundations/image-library.md](../../../../foundations/image-library.md)  
- **编排入口**：[SKILL.md](../../../../SKILL.md)  
- **最后同步**：2026-04-12  

---

## 一、滚动方式（与 `tabs.home` 的对照）

| 维度 | `tabs.home` | 本页 `vertical.vacation.booking` |
|------|----------------|-----------------------------------|
| 文档滚动 | **`body` / `main.page` 随文档流整体上移** | **`body` 不承载主列表滚动**；主列表在 **`.scroll-content`**（`#pageScroller`）内 **`overflow-y: auto`** |
| 固定顶区 | `header-bg-scrim` + `titlebar` 等叠在 **文档流** 之上 | **`.page-header`**（`#pageHeader`）叠在 **滚动区之上**，高 **178px**（状态栏区 + 主导航） |
| 顶区背景反馈 | `header-bg-scrim` **透明度**随滚动 | **顶栏 `background-color`** 随 `#pageScroller` 的 `scrollTop` 在 **0～178px** 内从透明过渡到 **不透明白**（与 `tabs.home` 的 scrim 思路一致，实现为整段 `rgba(255,255,255,opacity)`） |
| 固定底区 | `fdl-tabbar` + 安全区 | **`.mod-pay`** 贴 **`.page` 底**（小红条 + 价格条 + Home Indicator 区） |

**说明**：本页采用 **「壳 `.page` 定高 1624 + 内层单滚动区」**，与首页 **「整页文档流滚动」** 不同；编排时勿把首页的 `padding-top` / `main.page` 模式机械套入，以 **[example.html](example.html)** 现有 DOM 为准。

---

## 二、固定在视口（不随 `#pageScroller` 离开）

| 区域 | 类名 / 节点 | 说明 |
|------|-------------|------|
| 顶栏整体 | `#pageHeader` · `.page-header` | **绝对定位**贴 `.page` 顶；内含 **`.indicator-bar`**（时间 + 系统状态示意）、**`.main-nav`**（返回 + 标题「填写订单」） |
| 底栏整体 | `.mod-pay` · `.payment-footer` | **绝对定位**贴 `.page` 底；含 **通知条**、**价格 + 明细 + 立即支付**、**Home Indicator** |

---

## 三、主内容区（随 `#pageScroller` 滚动）

可滚内容在 **`#pageScroller` → `.scroll-inner`** 内。

- **顶占位**：`.header-spacer` **178px**，与固定顶栏同高，避免首屏内容被遮挡。  
- **氛围背景**：`.gradient-container` — **绝对定位**叠在滚动内容背后，**黄顶渐变**（与商详/频道黄氛围同系）。  
- **模块纵向编排**：`.main-modules` — **`display: flex; flex-direction: column; align-items: center; gap: 18px;`**；与 `tabs.home` 的 **`content-placeholder` + `gap`** 思路一致，**模块间距由容器 `gap` 统一**，避免各卡再叠加大 `margin-top`。  
- **底占位**：`.footer-spacer` **280px**，为固定底栏 + 安全示意区让位。

---

## 四、模块顺序（自上而下，与示例注释一致）

| 顺序 | 区块 | 类名 / 说明 |
|:----:|------|-------------|
| 1 | 头部基础信息 | `.order-card` — 场次日期、票名、套餐、品牌条、信息行 |
| 2 | 货架 / 票种 | `.mod-shelf` · `.ticket-selection-card` — 票型、标签、步进器、营销条、「更多门票」 |
| 3 | 出行人 | `.mod-traveler` · `.passenger-card` — 选择游客、列表、联系电话 |
| 4 | 本单可享 | `.mod-benefits` · `.membership-card` — 优惠折叠、里程抵现等 |
| 5 | 底支付 | `.mod-pay` — 固定于壳底（见第二节） |

---

## 五、通栏与卡片宽（对齐 `tabs.home` 的「通栏 vs 内容」心智）

| 类型 | 规则 |
|------|------|
| 通栏 | **750 宽**：顶栏、黄渐变、底支付条等与 **`.page` 同宽**。 |
| 卡片内容 | 主白卡 **714px** 宽、**`border-radius: 12px`**，在 **`.main-modules`** 内水平居中；与首页主内容 **左右留白** 的约束同类（首页为 30px 边距，本页为 **(750−714)/2**）。 |

---

## 六、维护约定

- 改交互或增块时保持 **750 设计坐标系**；若改为文档流整页滚动，须同步改 **`spec.md`** 第一节对照表。  
- 顶栏滚动阈值 **`scrollThreshold = 178`** 与 **`.header-spacer`** 高度须同源。  

---

## 七、变更记录

| 日期 | 说明 |
|------|------|
| 2026-04-12 | 新增 `vertical.vacation.booking`：迁入桌面 `index.html` 为 `example.html`，并撰写本 spec。 |
