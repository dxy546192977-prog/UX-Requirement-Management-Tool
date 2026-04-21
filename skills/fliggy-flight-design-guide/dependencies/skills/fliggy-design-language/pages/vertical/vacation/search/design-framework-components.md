# 度假 · 旅行列表聚合页 · 设计框架与组件策略

旅行 **列表混排页**（度假小搜）：固定筛选体系 + **唯一**可滚动混合列表。

## 双轨策略

- **模式 A**：使用 `modules/` 固定 HTML，AI 填数据。
- **模式 B**：原子拼装须严格使用下方 Tokens；**禁止** `#6666FF` 大面积底。

## Tokens（摘要）

| Token | 值 | 用途 |
|-------|-----|------|
| `--color-bg` | `#F2F3F5` | 页基 |
| `--color-white` | `#FFFFFF` | 卡片、筛选条 |
| `--color-darkgray` | `#0F131A` | 主文案 |
| `--color-midgray` | `#5C5F66` | 次级 |
| `--color-lightgray` | `#919499` | 弱化 |
| `--color-indigo-1` | `#6666FF` | 评分、链接、小面积 |
| `--color-pay-1` | `#FF5533` | 价格、快筛选中字 |
| `--color-yellow-1` | `#FFE033` | 搜索框描边 |
| `--color-chip-bg` | `#F7F8FA` | 快筛默认底 |
| `--color-chip-selected` | `#FFF2F0` | 快筛选中底 |
| `--color-card-tag-bg` | `#FEF5EC` | 榜单等标签底 |
| `--spacing-page` | `18px` | 页左右、快筛左内边距 |

## 圆角

- `36px`：搜索框
- `24px`：类目承载圆角
- `12px`：卡片、图
- `6px`：快筛 chip

## 模块 slug

| 顺序 | 模块 | slug |
|------|------|------|
| fixed | 状态栏 + 顶搜 | `vacation-search-header` |
| fixed | 类目导航 | `vacation-search-category-nav` |
| fixed | 下拉筛选 | `vacation-search-dropdown-filter` |
| fixed | 快筛 | `vacation-search-quick-filter` |
| scroll | 跟团游卡 | `vacation-search-group-tour-card` |
| scroll | POI 卡 | `vacation-search-poi-card` |

## AI 一句话指令

生成 **750×1624** 旅行列表页：**搜索框、类目、下拉筛、快筛** 四层 **固定吸顶**；**仅** 跟团游与 POI **混合列表区** `fixed + top:438 + bottom:0` 内滚动并裁切；卡片白底无缝排列；色与间距按 Fliggy Tokens。
