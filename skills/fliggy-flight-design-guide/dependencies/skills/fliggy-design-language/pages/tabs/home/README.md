# 首页 Tab（`tabs.home`）

- **框架（推荐主列）**：[page-frame.md](page-frame.md)  
- **框架（顶 Tab = 目的地）**：[page-frame-destination.md](page-frame-destination.md)  
- **闭包**：[manifest.md](manifest.md)  

## 模块（`modules/`）

**推荐态 / 共用顶栏**

| 目录 | 说明 |
|------|------|
| `home-titlebar` | Logo + 顶 Tab + 收藏（与目的地共用） |
| `home-search` | 搜索框 + 快捷标签（与目的地共用） |
| `home-kingkong` | 首页金刚区（多行 + 分页点） |
| `home-multi-channel` | 多功能频道 1+1+1+2 |
| `home-feeds` | 双列信息流 |

**目的地顶 Tab（仅滚动区内）**

| 目录 | 说明 |
|------|------|
| `home-destination-kingkong` | 5×2 大图标金刚区 |
| `home-destination-ranking` | 本地/周边… Tab + 横滑榜单卡 |
| `home-destination-local-experience` | 当地体验：图卡分类 + 列表 + 展开更多 |
| `home-destination-recommendation` | 筛选 pills + 双列（卡片同 `home-feeds`） |

**底栏**：平台 [`tabbar`](../../../components/platform/navigation/tabbar/spec.md)。

**运营位**：与 `fdl-banner` 一致时用平台 banner spec；否则可再增 `modules/`。
