# 度假 · 门票商详页 · 设计框架与组件策略

本页为 **门票/玩乐类商品详情** 的框架说明，与 Fliggy Design Skill 双轨策略一致；尺寸均为 **@2x**。

## 双轨组件策略

- **模式 A（首选）**：选用本目录 `modules/` 下固定 HTML 组件，AI 识别场景后填充数据。
- **模式 B（补充）**：用原子组件按 **Design Tokens** 拼装，**不得**出现大面积脱离规范的视觉。

## 设备与强约束

- 画布 **`750 × 1624`**，可超长滚动。
- 顶栏 **吸顶盖住头图**；**滚动 ≥ 180px** 顶栏白底、图标/字 `#0F131A`。
- 头图 **750×750**，随滚动上移；底栏 **吸底固定**、始终可见。

## Tokens（摘要）

| Token | 值 | 用途 |
|-------|-----|------|
| `--color-bg` | `#F2F3F5` | 页面底 |
| `--color-white` | `#FFFFFF` | 卡片、顶栏滚后、底栏 |
| `--color-darkgray` | `#0F131A` | 主文案、滚后图标 |
| `--color-pay-1` | `#FF5533` | 价格主色 |
| `--color-orange-1` | `#FF6200` | 立即购买 |
| `--color-orange-2` | `#FFB300` | 加购 |
| `--color-orange-3` | `#FF7300` | 货架「订」 |
| `--color-yellow-1` | `#FFE033` | 指示器选中、保障标签等 |
| `--color-indigo-1` | `#6666FF` | **小面积**：评分、链接、标签描边（禁大面积底） |
| `--spacing-page` | `18px` | 左右主边距 |
| `--spacing-stack-lg` | `18px` | 模块间距 |
| 业务卡圆角 | `12px` | 基础信息、货架、POI、图文详情 |

## 模块与 slug

| 顺序 | 模块 | slug |
|------|------|------|
| fixed | 商详顶栏 | `vacation-detail-sticky-nav` |
| scroll | 头图 | `vacation-detail-hero-gallery` |
| scroll | 头图指示器 | `vacation-detail-hero-indicator` |
| scroll | 基础信息 | `vacation-detail-basic-info` |
| scroll | 货架 | `vacation-detail-shelf` |
| scroll | POI | `vacation-detail-poi-section` |
| scroll | 图文详情 | `vacation-detail-rich-detail` |
| fixed | 底栏 | `vacation-detail-bottom-bar` |

## AI 一句话指令（可复制）

生成 **750×1624** 门票商详：顶栏 **fixed 盖住头图**，滚动 **180px** 后白底且 icon `#0F131A`；头图 **750×750** 上移；主体顺序为 **指示器 → 基础信息 → 货架 → POI → 图文详情**；底栏 **fixed 吸底**；颜色/间距/圆角按上表与 `page-frame.md`。
