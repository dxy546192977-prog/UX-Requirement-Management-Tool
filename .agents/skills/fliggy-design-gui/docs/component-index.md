# 平台组件索引

一行 = 组件 slug、spec 路径、触发条件。随落地勾选；与 [platform-components-order.md](platform-components-order.md) 同步。

| 组件 slug | spec 路径 | 触发条件（何时读取） |
|-----------|-----------|---------------------|
| info-tag | `components/platform/widgets/info-tag/spec.md` | taxonomy「气泡」：卡片/按钮上三圆一尖信息标（热销、新品等） |
| badge-dot | `components/platform/widgets/badge-dot/spec.md` | 未读红点、数字角标 |
| switch | `components/platform/widgets/switch/spec.md` | 开关设置项 |
| radio-checkbox | `components/platform/widgets/radio-checkbox/spec.md` | 单选 / 多选 |
| number-picker | `components/platform/widgets/number-picker/spec.md` | 数量步进器 |
| filter-tag | `components/platform/widgets/filter-tag/spec.md` | taxonomy「筛选标签」：尺码/颜色/筛选项，单选框线黄底、复选角标黄底 |
| carousel-bar | `components/platform/widgets/carousel-bar/spec.md` | taxonomy「轮播条」：Banner/卡片流底部分页条或点，≤3 全条、>3 条+点 |
| long-press | `components/platform/widgets/long-press/spec.md` | taxonomy「长按」：带箭头 Popover 菜单，图标+文案行，长按/更多触发 |
| timeline | `components/platform/widgets/timeline/spec.md` | taxonomy「时间轴」：售后/订单阶段卡片，靛蓝节点+靛浅连线+当前步标题加粗 |
| price | `components/platform/widgets/price/spec.md` | taxonomy「价格」：整数放大+pay 色，原价删除线、会员价/销量组合 |
| feeds-dual-column | `components/platform/widgets/feeds-dual-column/spec.md` | taxonomy「双列推荐」：`fdl-feeds-dual` 690 双列、Banner+卡片、头图标签/位置条/价格区 |
| button | `components/platform/buttons/button/spec.md` | taxonomy「常用按钮」：胶囊 fdl-button，主/次/危险/浅/白/描边 × 四档高 |
| fab | `components/platform/buttons/fab/spec.md` | taxonomy「浮动按钮」：固定角 86 圆、图标或图标+短文案 |
| collapse | `components/platform/buttons/collapse/spec.md` | taxonomy「收起/展开」：fdl-collapse 胶囊+旋转 chevron，查看全部/展开/收起 |
| tag-mental | `components/platform/tags/tag-mental/spec.md` | taxonomy「心智类」：fdl-tag-mental 主标+描述拼接，CSS 变量换色 |
| tag-service | `components/platform/tags/tag-service/spec.md` | taxonomy「服务类」：fdl-tag-service 边框标签，主+描述+虚线，非 widgets/info-tag |
| tag-promo | `components/platform/tags/tag-promo/spec.md` | taxonomy「大促类」：fdl-tag-promo 52×28，promo-1/2 底+白字或官方双11 SVG |
| tag-discount | `components/platform/tags/tag-discount/spec.md` | taxonomy「优惠类」：fdl-tag-discount 券形，pay-1 边框与浅底+白描述区 |
| navbar | `components/platform/navigation/navbar/spec.md` | taxonomy「导航栏」：fdl-navbar 88 高，light/transparent±/brand，状态栏图可选 |
| tabbar | `components/platform/navigation/tabbar/spec.md` | taxonomy「Tabbar」一级 `fdl-tabbar`；二级 `spec-secondary`/`fdl-bottom-bar`；预订条 `spec-booking`/`fdl-booking-bar` |
| tabs-style-1 | `components/platform/navigation/tabs-style-1/spec.md` | taxonomy「选项卡」样式一：`fdl-tabs-style-1` 顶部分类、均分/横滑、指示条与营销角标 |
| tabs-style-2 | `components/platform/navigation/tabs-style-2/spec.md` | taxonomy「选项卡」样式二：`fdl-tabs-style-2` 托起渐变、主/副文案、均分 2～4 / 横滑 &gt;4 |
| tabs-style-3 | `components/platform/navigation/tabs-style-3/spec.md` | taxonomy「选项卡」样式三：`fdl-tabs-style-3` 胶囊横滑、`--sm` 半透+靛选 / `--lg` 白+黄选 |
| dialog | `components/platform/feedback/dialog/spec.md` | taxonomy「对话框」：`fdl-dialog` 遮罩与圆角卡、主次胶囊钮、可选 meta 与 image-library 配图 |
| sheet | `components/platform/feedback/sheet/spec.md` | taxonomy「浮层」：`fdl-sheet` 底出半屏、min/max vh、独立滚动区与 env 安全区 |
| notice-bar | `components/platform/feedback/notice-bar/spec.md` | taxonomy「小黄条」：`fdl-notice-bar` 暖白渐变、pay 标题、右侧箭头/关闭/无交互 |
| toast | `components/platform/feedback/toast/spec.md` | taxonomy「Toast」：`fdl-toast` 居中、darkgray 80% 混透底、status/live 短时提示 |
| empty-state | `components/platform/feedback/empty-state/spec.md` | taxonomy「空页面异常」：`fdl-empty-state` 插图+标题+描述+主次钮，数据驱动 |
| time-picker | `components/platform/selection/time-picker/spec.md` | taxonomy「时间选择」：`fdl-time-picker` 日历半屏、星期/月吸顶、区间 brand-4/1 |
| destination-picker | `components/platform/selection/destination-picker/spec.md` | taxonomy「目的地选择」：`fdl-destination-picker` 搜索+Tab 吸顶、分组城市、右侧索引 |
| coupon-selector | `components/platform/selection/coupon-selector/spec.md` | taxonomy「优惠券」：`fdl-coupon-selector` 横向券卡、狗牙撕口+虚线、领券/去使用/结算勾选/失效 |
| banner | `components/platform/display/banner/spec.md` | taxonomy「banner」：`fdl-banner` 702×148 圆角横卡、底图+左深右透蒙版、白字 Fliggy Fonts 标题+黄副标题与圆箭、左下分页条（与轮播配合） |

## 路径前缀

- `components/platform/widgets/` — 小组件  
- `components/platform/buttons/`  
- `components/platform/tags/`  
- `components/platform/navigation/`  
- `components/platform/feedback/`  
- `components/platform/selection/`  
- `components/platform/display/`  

当前仓库仅维护 `components/platform/` 平台组件。
