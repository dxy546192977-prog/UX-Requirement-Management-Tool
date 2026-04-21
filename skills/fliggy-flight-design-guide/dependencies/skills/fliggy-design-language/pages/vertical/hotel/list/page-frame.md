# 酒店列表页框架（`vertical.hotel.list`）

## 元信息

- **page_id**：`vertical.hotel.list`  
- **设计基准**：**750px 宽**；`viewport` **`width=750, user-scalable=no`**  
- **依赖**：[`foundations/design-foundations.md`](../../../../foundations/design-foundations.md)  
- **最后同步**：2026-04-06  

---

## 布局结构

### 顶部（固定 + 吸顶）

1. **固定顶栏** — 不随列表滚动：系统状态栏 + **返回** + **黄框搜索条**（城市、住离日期、间/人、占位「试试…」）+ 右侧 **地图/列表切换** 与 **更多**（常规）或 **攻略 + 地图**（AI 入口变体）。  
2. **吸顶筛选** — 初始在内容顶或 AI 模块下方；上滑至顶栏下缘后 **sticky** 贴顶：  
   - **主筛一行**：`推荐排序` / `位置距离` / `价格星级` / `筛选`（▼）。  
   - **次筛横滑**：热门优惠、热门品牌、里程抵房费等（隐藏滚动条）。  
3. **地图模式切换**：点击顶栏 **地图钉图标** 后，主筛 **隐藏「推荐排序」**，余下三项 **space-around**；图标变为 **列表三线**；再点恢复（见 `hotel-list-top-chrome/example.html` 内脚本）。

### 可滚动主体（无固定底栏 Tab）

- **变体 A（常规）**：吸顶筛下方 → **权益条** → **酒店行卡**列表（可分页）。  
- **变体 B（含 AI 快筛）**：顶栏下 → **本地人认证模块**（标题 + 横滑目的地 + 图文推荐）→ 权益条（可与稿序微调）→ 行卡列表。完整串联见 **`hotel-list-ai-locals/example.html`**（自带底部筛选白板，与列表流衔接方式以稿为准）。

### 地图模式（列表外场景）

- 底图为地图；**悬浮罗盘按钮**、**距 POI 文案条**、**圆角白卡** 行式酒店信息 — `hotel-list-map-scene/example.html`。

---

## 模块映射

| 区域 | slug | 说明 |
|------|------|------|
| 顶栏 + 主/快筛 + 视图切换 | `hotel-list-top-chrome` | 高 **320px** 切片 |
| AI 本地人认证 + 底筛白板 | `hotel-list-ai-locals` | 与常规顶栏二选一或上下拼接 |
| 里程/优住会条 | `hotel-list-benefit-bar` | 灰底权益横条 |
| 列表行卡 | `hotel-list-row-card` | 左图右文 **750×312** |
| 地图场景卡 | `hotel-list-map-scene` | 含 FAB、定位条、卡片 |

---

## 产出

- [`manifest.md`](manifest.md)  
- 各模块 `spec.md` + `example.html`  
- [`example-full.html`](example-full.html)：**常规**顶栏 + 权益 + 双行卡  

---

## 变更记录

| 日期 | 说明 |
|------|------|
| 2026-04-06 | 初版：常规顶栏 / AI 模块 / 权益 / 行卡 / 地图场景。 |
