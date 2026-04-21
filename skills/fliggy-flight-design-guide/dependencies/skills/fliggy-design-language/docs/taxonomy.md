# Fliggy Design Language — 分类目录树

> 与桌面稿「Fliggy Design Skill 分类目录树」同步；仓库内以此文件为 **taxonomy 真相源**。后续增删改只改本文件。

## 平台通用组件

### 小组件

- **气泡**
- **小红点**
- **Switch**
- **单选、复选按钮**
- **数字选择器**
- **筛选标签**
- **轮播条**
- **长按**
- **时间轴**
- **价格**

### 按钮

- **常用按钮**
- **浮动按钮**
- **模块 收起/展开**

### 标签

- **心智类**
- **服务类**
- **大促类**
- **优惠类**

### 导航类

- **导航栏**
- **底部栏 Tabbar**
  - 一级导航、二级导航、预订类底部 bar
- **选项卡 Tab**
  - 样式一、样式二、样式三

### 反馈类

- **对话框**
- **浮层**
- **小黄条**
- **轻提示 Toast**
- **空页面异常反馈**

### 选择类

- **时间选择**
- **目的地选择**
- **优惠券**

### 展示类

- **banner**

---

## 五大 Tab 页面

> **底栏五 Tab**：首页、会员、消息、行程、我的（与 [`tab-pages-order.md`](tab-pages-order.md) 一致）。  
> **目的地**不在底栏：属 **首页顶部 Tab** 切换内容，模块归 **`tabs.home`** 下 `pages/tabs/home/modules/`，不单独 `page_id`。

### 首页

- **首页 titlebar**
- **首页搜索框模块**
- **金刚区**
- **多功能频道**
- **feeds 模块**
- **底部 bar**（底栏容器；当前 Tab 高亮为「首页」）
- **顶部 Tab：目的地**（切换后展示下列模块，非独立底栏页；**顶栏/搜索与推荐态共用** `home-titlebar` / `home-search`）
  - **目的地头部**（与推荐共用 Global Header，无单独模块文件）
  - **金刚区** → `modules/home-destination-kingkong/`
  - **榜单** → `modules/home-destination-ranking/`
  - **当地体验** → `modules/home-destination-local-experience/`
  - **推荐**（猜你喜欢，双列同 `home-feeds`）→ `modules/home-destination-recommendation/` + `modules/home-feeds/`

### 会员（`tabs.member`，`pages/tabs/member/`）

- **等级概览卡** → `modules/member-level-card/`
- **直通品牌权益（一通百）** → `modules/member-brand-benefits/`
- **航司会员挑战横幅** → `modules/member-airline-challenge-banner/`
- **酒店 Feeds**（主 Tab / 二级 Tab / 筛选 / 列表）→ `modules/member-hotel-feeds/`

### 消息

### 行程

- **机票卡片**
- **火车票卡片**
- **酒店卡片**
- **景点门票卡片**

### 我的（`tabs.mine`，`pages/tabs/mine/`）

- **头部**（用户信息与会员卡）→ `modules/mine-profile-header/`
- **工具栏**（三行入口）→ `modules/mine-toolbar/`
- **Feeds 信息流**（双列 + 轮播）→ `modules/mine-feeds/`

---

## 垂直业务线

### 机票

> 页面与路径：`pages/vertical/flight/`；`page_id` 见 [page-index.md](page-index.md)。

#### 首页（`vertical.flight.home`）

- **首屏氛围** → `flight/home/modules/flight-home-atmosphere/`
- **小搜模块** → `flight/home/modules/flight-home-mini-search/`
- **小金刚** → `flight/home/modules/flight-home-kingkong/`
- **省钱模块** → `flight/home/modules/flight-home-savings/`
- **特价机票** → `flight/home/modules/flight-home-special-fares/`
- **活动长图** → `flight/home/modules/flight-home-activity-strip/`
- **行业底栏**（机票内快捷栏，非主 Tabbar）→ `flight/home/modules/flight-home-industry-tabbar/`

#### 列表（`vertical.flight.list`）

- **导航栏** → `flight/list/modules/flight-list-header/`
- **日历** → `flight/list/modules/flight-list-date-bar/`
- **营销条** → `flight/list/modules/flight-list-promo-bar/`
- **快筛栏** → `flight/list/modules/flight-list-sort-tabs/`
- **直飞卡片**（多变体）→ `flight/list/modules/flight-list-flight-card/`
- **省钱推荐**（可选）→ `flight/list/modules/flight-list-savings-strip/`
- **中转分割** → `flight/list/modules/flight-list-transfer-divider/`
- **中转快筛栏** → `flight/list/modules/flight-list-transfer-filter/`
- **中转卡片**（多变体）→ `flight/list/modules/flight-list-transfer-card/`
- **心智模块** → `flight/list/modules/flight-list-mind-module/`
- **底 bar** → `flight/list/modules/flight-list-footer-bar/`

#### OTA（`vertical.flight.ota`）

- **导航栏** → `flight/ota/modules/flight-ota-header/`
- **行程卡** → `flight/ota/modules/flight-ota-itinerary/`
- **提示百叶窗** → `flight/ota/modules/flight-ota-shutter-strip/`
- **营销小黄条** → `flight/ota/modules/flight-ota-promo-bar/`
- **otatab（舱位三列切换）** → `flight/ota/modules/flight-ota-cabin-section/`
- **商品卡 + 更多报价** → `flight/ota/modules/flight-ota-price-section/`
- **心智模块（安心票）** → `flight/ota/modules/flight-ota-watermark/`

### 火车票

> 页面与路径：`pages/vertical/train/`；`page_id` 见 [page-index.md](page-index.md)。

#### 首页（`vertical.train.home`）

- **首页 title（沉浸式导航）** → `train/home/modules/train-home-title/`
- **搜索模块** → `train/home/modules/train-home-search/`
- **金刚区** → `train/home/modules/train-home-kingkong/`
- **优惠专区** → `train/home/modules/train-home-promo-zone/`
- **火车路线专家** → `train/home/modules/train-home-route-expert/`
- **添加微信助手** → `train/home/modules/train-home-wechat-assistant/`
- **火车票水印** → `train/home/modules/train-home-watermark/`
- **火车票底 bar**（频道内快捷栏，非主 Tabbar）→ `train/home/modules/train-home-bottom-bar/`

#### 列表（`vertical.train.list`）

> 与机票列表 **750 @2x** 不同；规范源 **`listing-page`**（375×812），见 `train/list/listing-reference.md`。

- **顶栏（状态栏 + titlebar）** → `train/list/modules/train-list-header/`
- **日历条** → `train/list/modules/train-list-calendar-bar/`
- **频道 Tab** → `train/list/modules/train-list-channel-tab/`
- **车次卡片**（含座席/价格子组件）→ `train/list/modules/train-list-train-card/`
- **底栏排序 + Home Indicator** → `train/list/modules/train-list-footer-bar/`

#### OTA（`vertical.train.ota`）

- **title（日期导航）** → `train/ota/modules/train-ota-title/`
- **行程卡** → `train/ota/modules/train-ota-itinerary/`
- **营销条** → `train/ota/modules/train-ota-promo-bar/`
- **座席区** → `train/ota/modules/train-ota-seat-section/`
- **报价区** → `train/ota/modules/train-ota-quote-section/`
- **飞猪水印** → `train/ota/modules/train-ota-watermark/`

### 酒店

> 页面与路径：`pages/vertical/hotel/`；`page_id` 见 [page-index.md](page-index.md)。

#### 首页（`vertical.hotel.home`）

- **营销 Banner** → `hotel/home/modules/hotel-home-banner/`
- **酒店搜索** → `hotel/home/modules/hotel-home-search/`
- **当季热门灵感** → `hotel/home/modules/hotel-home-inspiration/`
- **促销三卡**（品牌闪促 / 特价酒店 / 爆款直播；`example.html` 与 `example-layout-b.html`）→ `hotel/home/modules/hotel-home-promo-row/`
- **猜你喜欢 · 酒店卡** → `hotel/home/modules/hotel-home-hotel-card/`
- **频道底栏**（非 App 五大 Tab）→ `hotel/home/modules/hotel-home-tabbar/`

#### 列表页（`vertical.hotel.list`）

- **顶栏与吸顶筛**（黄框搜索、地图/列表切换隐藏「推荐排序」）→ `hotel/list/modules/hotel-list-top-chrome/`
- **AI 本地人认证**（攻略/地图顶栏、推荐卡、底白双行筛；与常规顶栏二选一编排）→ `hotel/list/modules/hotel-list-ai-locals/`
- **权益条** → `hotel/list/modules/hotel-list-benefit-bar/`
- **酒店行卡**（列表左图右文）→ `hotel/list/modules/hotel-list-row-card/`
- **地图场景**（悬浮罗盘、距 POI 条、底部白卡）→ `hotel/list/modules/hotel-list-map-scene/`

#### 详情页（`vertical.hotel.detail`）

- **01 媒体容器** → `hotel/detail/modules/hotel-detail-media/`
- **02 信息区** → `hotel/detail/modules/hotel-detail-info/`
- **03 二官会员卡** → `hotel/detail/modules/hotel-detail-member-card/`
- **04 筛选**（常规/吸顶）→ `hotel/detail/modules/hotel-detail-filter/`
- **05 置顶 Rate** → `hotel/detail/modules/hotel-detail-sticky-rate/`
- **05 Rate 卡片** → `hotel/detail/modules/hotel-detail-rate-cards/`
- **06 店铺** → `hotel/detail/modules/hotel-detail-store/`
- **07 评价** → `hotel/detail/modules/hotel-detail-reviews/`
- **08 酒店亮点** → `hotel/detail/modules/hotel-detail-highlights/`
- **09 酒店设施** → `hotel/detail/modules/hotel-detail-facilities/`
- **10 酒店周边** → `hotel/detail/modules/hotel-detail-surroundings/`
- **11 说明** → `hotel/detail/modules/hotel-detail-policy/`
- **12 推荐酒店（含房型）** → `hotel/detail/modules/hotel-detail-recommend-rooms/`
- **13 推荐酒店** → `hotel/detail/modules/hotel-detail-recommend-list/`
- **整页编排**（iframe + 吸顶 + 间距）→ `hotel/detail/example-full.html`

#### 下单页（`vertical.hotel.booking`）

- **固定框架**（渐变顶 / 导航 / 内容区 / 底栏）→ [design-framework-components.md](../pages/vertical/hotel/booking/design-framework-components.md) + [`example-full.html`](../pages/vertical/hotel/booking/example-full.html)  
- **酒店预订信息卡** → `hotel/booking/modules/hotel-booking-info-card/`  
- **重要提醒** → `hotel/booking/modules/hotel-booking-notice-card/`  
- **预订提示 + 入住信息** → `hotel/booking/modules/hotel-booking-checkin-card/`  
- **挑战任务** → `hotel/booking/modules/hotel-booking-challenge-task-card/`  
- **F4 本单可享** → `hotel/booking/modules/hotel-booking-savings-card/`  
- **支付方式** → `hotel/booking/modules/hotel-booking-payment-selector/`  
- **发票报销** → `hotel/booking/modules/hotel-booking-invoice-card/`  
- **出行保障** → `hotel/booking/modules/hotel-booking-protection-card/`  
- **协议信息** → `hotel/booking/modules/hotel-booking-agreement-section/`  
- **底部支付栏** → `hotel/booking/modules/hotel-booking-bottom-pay-bar/`  
- **切图资源** → `hotel/booking/assets/`  

#### 订单详情（`vertical.hotel.order`）

- **固定框架** → [design-framework-components.md](../pages/vertical/hotel/order/design-framework-components.md) + [`example-full.html`](../pages/vertical/hotel/order/example-full.html)  
- **订单状态头部** → `hotel/order/modules/hotel-order-status-header/`  
- **价格信息** → `hotel/order/modules/hotel-order-price/`  
- **政策提示** → `hotel/order/modules/hotel-order-policy-hint/`  
- **酒店信息卡** → `hotel/order/modules/hotel-order-hotel-card/`  
- **房型日期信息** → `hotel/order/modules/hotel-order-room-date/`  
- **入住人信息** → `hotel/order/modules/hotel-order-guest-info/`  
- **会员权益** → `hotel/order/modules/hotel-order-member-benefits/`  
- **订单信息** → `hotel/order/modules/hotel-order-info/`  
- **常见问题标签** → `hotel/order/modules/hotel-order-faq-tags/`  
- **交叉销售** → `hotel/order/modules/hotel-order-cross-sell/`  
- **底部操作栏** → `hotel/order/modules/hotel-order-bottom-actions/`  
- **切图** → `hotel/order/assets/`  

### 度假

#### 门票频道（`vertical.vacation.ticket`）

- **固定框架** → [design-framework-components.md](../pages/vertical/vacation/ticket/design-framework-components.md) + [`example-full.html`](../pages/vertical/vacation/ticket/example-full.html)  
- **Banner** → `vacation/ticket/modules/ticket-channel-banner/`  
- **沉浸式吸顶导航** → `vacation/ticket/modules/ticket-channel-sticky-nav/`  
- **搜索框** → `vacation/ticket/modules/ticket-channel-search/`  
- **推荐卡片区** → `vacation/ticket/modules/ticket-channel-recommend/`  
- **类目快筛** → `vacation/ticket/modules/ticket-channel-category/`  
- **下拉筛选** → `vacation/ticket/modules/ticket-channel-dropdown-filter/`  
- **快筛** → `vacation/ticket/modules/ticket-channel-quick-filter/`  
- **POI 卡** → `vacation/ticket/modules/ticket-channel-poi-card/`  

#### 订单详情 / 订详（`vertical.vacation.order`）

- **固定框架** → [design-framework-components.md](../pages/vertical/vacation/order/design-framework-components.md) + [`example-full.html`](../pages/vertical/vacation/order/example-full.html)  
- **黄头订单状态** → `vacation/order/modules/vacation-order-yellow-header/`  
- **顶部状态栏** → `vacation/order/modules/vacation-order-sticky-nav/`  
- **服务保障** → `vacation/order/modules/vacation-order-service-guarantee/`  
- **基础信息** → `vacation/order/modules/vacation-order-basic-info/`  
- **凭证区** → `vacation/order/modules/vacation-order-voucher/`  
- **退改政策** → `vacation/order/modules/vacation-order-refund-policy/`  
- **POI 卡信息** → `vacation/order/modules/vacation-order-poi-info/`  
- **订单卡** → `vacation/order/modules/vacation-order-transaction-card/`  
- **出行信息** → `vacation/order/modules/vacation-order-travel-info/`  
- **二销模块** → `vacation/order/modules/vacation-order-upsell/`  
- **底部 bar** → `vacation/order/modules/vacation-order-bottom-bar/`  

#### 商品详情 / 门票商详（`vertical.vacation.detail`）

- **固定框架** → [design-framework-components.md](../pages/vertical/vacation/detail/design-framework-components.md) + [`example-full.html`](../pages/vertical/vacation/detail/example-full.html)  
- **吸顶顶栏**（滚过 180px 白底）→ `vacation/detail/modules/vacation-detail-sticky-nav/`  
- **头图画廊** → `vacation/detail/modules/vacation-detail-hero-gallery/`  
- **头图指示器** → `vacation/detail/modules/vacation-detail-hero-indicator/`  
- **基础信息卡** → `vacation/detail/modules/vacation-detail-basic-info/`  
- **商详货架** → `vacation/detail/modules/vacation-detail-shelf/`  
- **POI 信息区** → `vacation/detail/modules/vacation-detail-poi-section/`  
- **图文详情** → `vacation/detail/modules/vacation-detail-rich-detail/`  
- **底部 bar** → `vacation/detail/modules/vacation-detail-bottom-bar/`  

#### 度假小搜 / 旅行列表聚合（`vertical.vacation.search`）

- **固定框架** → [design-framework-components.md](../pages/vertical/vacation/search/design-framework-components.md) + [`example-full.html`](../pages/vertical/vacation/search/example-full.html)  
- **状态栏 + 顶搜** → `vacation/search/modules/vacation-search-header/`  
- **类目导航** → `vacation/search/modules/vacation-search-category-nav/`  
- **下拉筛选** → `vacation/search/modules/vacation-search-dropdown-filter/`  
- **快筛** → `vacation/search/modules/vacation-search-quick-filter/`  
- **跟团游卡** → `vacation/search/modules/vacation-search-group-tour-card/`  
- **POI 卡** → `vacation/search/modules/vacation-search-poi-card/`  

### 租车

#### ota

页面：`pages/vertical/car/ota/` · `page_id`: **`vertical.car.ota`** · 整页 [`example-full.html`](../pages/vertical/car/ota/example-full.html)

| 模块 | 路径 |
|------|------|
| 头图 | `car/ota/modules/car-ota-hero/` |
| 车辆信息 | `car/ota/modules/car-ota-vehicle-summary/` |
| 88VIP 小黄条 | `car/ota/modules/car-ota-vip-strip/` |
| 租车取还信息 | `car/ota/modules/car-ota-pickup-return/` |
| 报价卡片（多变体） | `car/ota/modules/car-ota-quote-card/`（`quote-card-styles.css`） |
| 展开收起 | `car/ota/modules/car-ota-expand-row/` |
| 分组标题 | `car/ota/modules/car-ota-section-title/` |
| 推荐车型卡 | `car/ota/modules/car-ota-recommend-card/`（`recommend-card-styles.css`） |

#### list

页面：`pages/vertical/car/list/` · `page_id`: **`vertical.car.list`** · 整页 [`example-full.html`](../pages/vertical/car/list/example-full.html)

| 模块 | 路径 |
|------|------|
| 上状态栏 | `car/list/modules/car-list-status-bar/` |
| 二级导航 | `car/list/modules/car-list-nav/` |
| 快筛栏 | `car/list/modules/car-list-quick-filter/` |
| 大筛选 | `car/list/modules/car-list-big-filter/` |
| 新客专享黄条 | `car/list/modules/car-list-promo-bar/`（`promo-bar-list.css`） |
| 侧导航 | `car/list/modules/car-list-side-nav/` |
| 车型卡片 | `car/list/modules/car-list-car-card/`（`list-car-card-styles.css`） |

#### home（`vertical.car.home`）

页面：`pages/vertical/car/home/` · `page_id`: **`vertical.car.home`** · 整页 [`example-full.html`](../pages/vertical/car/home/example-full.html)

| 模块 | 路径 |
|------|------|
| 顶部氛围 | `car/home/modules/car-home-hero/` |
| 搜索大卡（2-1～2-8） | `car/home/modules/car-home-search/` |
| 营销领券 | `car/home/modules/car-home-marketing/` |
| 列表（标题+城市 Tab+视频组+车辆卡） | `car/home/modules/car-home-list/` |
| 频道底栏 | `car/home/modules/car-home-tabbar/` |

### 搜索

#### 默认页

- **发现&推荐**

#### sug 页

- **联想 QUERY**

#### 结果页

- **类目 TAB**
- **筛选**
