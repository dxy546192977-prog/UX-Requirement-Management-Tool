# 平台通用组件 — 落地顺序（以 taxonomy 为准）

接入时 **严格按序号** 进行：你每次发 **描述 md + 详细 html**，我会：

- 以本表 **slug / 路径** 为准统一命名（可改你文件里的标题与类名前缀）；  
- 将能对应上的 **色值、圆角** 改为 `var(--*)`；  
- 将描述 md **整理为** `spec.md` 规范结构（见 [spec-template.md](spec-template.md)）。

| 序号 | 分类 | taxonomy 名称 | slug | 目标路径 |
|-----|------|---------------|------|----------|
| 1 | 小组件 | 气泡（落地：**信息标签**） | `info-tag` | `components/platform/widgets/info-tag/` |
| 2 | 小组件 | 小红点 | `badge-dot` | `components/platform/widgets/badge-dot/` |
| 3 | 小组件 | Switch | `switch` | `components/platform/widgets/switch/` |
| 4 | 小组件 | 单选、复选按钮 | `radio-checkbox` | `components/platform/widgets/radio-checkbox/` |
| 5 | 小组件 | 数字选择器 | `number-picker` | `components/platform/widgets/number-picker/` |
| 6 | 小组件 | 筛选标签 | `filter-tag` | `components/platform/widgets/filter-tag/` |
| 7 | 小组件 | 轮播条 | `carousel-bar` | `components/platform/widgets/carousel-bar/` |
| 8 | 小组件 | 长按 | `long-press` | `components/platform/widgets/long-press/` |
| 9 | 小组件 | 时间轴 | `timeline` | `components/platform/widgets/timeline/` |
| 10 | 小组件 | 价格 | `price` | `components/platform/widgets/price/` |
| 11 | 按钮 | 常用按钮 | `button` | `components/platform/buttons/button/` |
| 12 | 按钮 | 浮动按钮 | `fab` | `components/platform/buttons/fab/` |
| 13 | 按钮 | 模块 收起/展开 | `collapse` | `components/platform/buttons/collapse/` |
| 14 | 标签 | 心智类 | `tag-mental` | `components/platform/tags/tag-mental/` |
| 15 | 标签 | 服务类 | `tag-service` | `components/platform/tags/tag-service/` |
| 16 | 标签 | 大促类 | `tag-promo` | `components/platform/tags/tag-promo/` |
| 17 | 标签 | 优惠类 | `tag-discount` | `components/platform/tags/tag-discount/` |
| 18 | 导航类 | 导航栏 | `navbar` | `components/platform/navigation/navbar/` |
| 19 | 导航类 | 底部栏 Tabbar | `tabbar` | `components/platform/navigation/tabbar/` |
| 20 | 导航类 | 选项卡 Tab（样式一） | `tabs-style-1` | `components/platform/navigation/tabs-style-1/` |
| 21 | 导航类 | 选项卡 Tab（样式二） | `tabs-style-2` | `components/platform/navigation/tabs-style-2/` |
| 22 | 导航类 | 选项卡 Tab（样式三） | `tabs-style-3` | `components/platform/navigation/tabs-style-3/` |
| 23 | 反馈类 | 对话框 | `dialog` | `components/platform/feedback/dialog/` |
| 24 | 反馈类 | 浮层 | `sheet` | `components/platform/feedback/sheet/` |
| 25 | 反馈类 | 小黄条 | `notice-bar` | `components/platform/feedback/notice-bar/` |
| 26 | 反馈类 | 轻提示 Toast | `toast` | `components/platform/feedback/toast/` |
| 27 | 反馈类 | 空页面异常反馈 | `empty-state` | `components/platform/feedback/empty-state/` |
| 28 | 选择类 | 时间选择 | `time-picker` | `components/platform/selection/time-picker/` |
| 29 | 选择类 | 目的地选择 | `destination-picker` | `components/platform/selection/destination-picker/` |
| 30 | 选择类 | 优惠券 | `coupon-selector` | `components/platform/selection/coupon-selector/` |
| 31 | 展示类 | banner | `banner` | `components/platform/display/banner/` |

**说明**

- Tabbar 下「一级/二级/预订类」若拆成多份文档，可在同一 `tabbar/` 内用 `spec-variants.md` 或子 slug（如 `tabbar-booking`）扩展，再接洽调整本表。  
- 若你方 html 里 **语义明显不是** 上表 slug（例如「轮播条」实为指示点），落地时我会按实际结构建议改名并同步改本表一行。

**序号 1 已落地**：`info-tag`。  
**序号 2 已落地**：`badge-dot`（通知徽标）。  
**序号 3 已落地**：`switch`。  
**序号 4 已落地**：`radio-checkbox`（圆形复选框）。  
**序号 5 已落地**：`number-picker`（数字加减器）。  
**序号 6 已落地**：`filter-tag`（选项标签 / 筛选 chips，单选·复选·禁用）。  
**序号 7 已落地**：`carousel-bar`（轮播分页指示：条/点、深底与浅底变体）。  
**序号 8 已落地**：`long-press`（上下文气泡菜单：箭头 + 毛玻璃列表，可配置项）。  
**序号 9 已落地**：`timeline`（纵向流程时间轴：完成/当前/待处理节点与渐隐连线）。  
**序号 10 已落地**：`price`（价格展示：大中小三档、底对齐、原价/销量/标签组合）。  
**序号 11 已落地**：`button`（常用按钮：四档尺寸 × 六种样式 + 禁用）。  
**序号 12 已落地**：`fab`（浮动按钮：圆白底 drop-shadow，仅图标 / 带字 / 禁用）。  
**序号 13 已落地**：`collapse`（胶囊箭头链接：右/下/上 + 禁用，浅灰底靛蓝字）。  
**序号 14 已落地**：`tag-mental`（利益点标签：Fliggy Fonts 主标 + 可选描述，四色变量可主题）。  
**序号 15 已落地**：`tag-service`（服务类信息标签：四主题 + 可选主标/描述拼接与虚线分割）。  
**序号 16 已落地**：`tag-promo`（大促角标：双11 红底白标 / 预售紫底白字）。  
**序号 17 已落地**：`tag-discount`（优惠券形标签：pay 色 + 独立/组合虚线撕边）。  
**序号 18 已落地**：`navbar`（顶栏：左返回/中标题/右 0～3 图标，白/透明深浅/品牌字）。  
**序号 19 已落地**：`tabbar`（一级 `fdl-tabbar` + 二级 `fdl-bottom-bar`：`spec-secondary` / `example-secondary`；**预订操作栏** `fdl-booking-bar`：`spec-booking` / `example-booking`）。  
**序号 20 已落地**：`tabs-style-1`（分类导航栏 `fdl-tabs-style-1`：2～5 均分、&gt;5 横滑、选中指示条 + 可选 promo 角标）。  
**序号 21 已落地**：`tabs-style-2`（托起式 `fdl-tabs-style-2`：2～4 均分、&gt;4 横滑、brand-1 渐变托起 + 主/副标题 + 可选 pay 角标）。  
**序号 22 已落地**：`tabs-style-3`（胶囊 `fdl-tabs-style-3`：`--sm` 半透叠图 / `--lg` 白底黄选、横向滚动）。  
**序号 23 已落地**：`dialog`（模态 `fdl-dialog`：遮罩 + 600 白卡、头身脚、双钮/单钮、可选 meta 与配图）。  
**序号 24 已落地**：`sheet`（底出半屏 `fdl-sheet`：20～85vh、头固定/身滚动/脚+安全区、translateY 动效）。  
**序号 25 已落地**：`notice-bar`（小黄条 `fdl-notice-bar`：notice-tint 渐变、品牌块+标题+省略、箭头/关闭/纯展示）。  
**序号 26 已落地**：`toast`（轻提示 `fdl-toast`：居中深透底白字、180～360 宽、3s 示例）。  
**序号 27 已落地**：`empty-state`（空态 `fdl-empty-state`：476×插图、标题描述、0～2 胶囊钮、五态示例）。  
**序号 28 已落地**：`time-picker`（日历 `fdl-time-picker`：85vh 底出、双吸顶、范围高亮、多月滚动）。  
**序号 29 已落地**：`destination-picker`（目的地 `fdl-destination-picker`：90vh、搜索+Tab 真吸顶、分组网格、索引容器内滚动）。  
**序号 30 已落地**：`coupon-selector`（券卡片 `fdl-coupon-selector`：撕口虚线、面额/信息/操作三区，去领取/去使用/勾选/失效）。  
**序号 31 已落地**：`banner`（营销横卡 `fdl-banner`：底图+左蓝渐变蒙版、Fliggy Fonts 主标题、副标题+黄箭、左下横条分页）。  
**当前**：本表所列平台通用组件已全部落地；新增 taxonomy 条目时再扩展本表序号。
