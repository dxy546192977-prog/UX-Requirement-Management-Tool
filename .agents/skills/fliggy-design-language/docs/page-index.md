# 页面索引（page_id → manifest）

编排 Skill 与启动问答依赖本表。**随 `pages/` 落地逐行补全**。

落地顺序见 **[tab-pages-order.md](tab-pages-order.md)**；manifest 写法见 **[manifest-template.md](manifest-template.md)**。  
**Tab 目录约定**（`page-frame` + `modules/*/spec.md` + `example.html`）见 [tab-pages-order.md](tab-pages-order.md) 与 [pages/tabs/README.md](../pages/tabs/README.md)。

| page_id | 用户可见别名 / 关键词 | manifest 路径 | 备注 |
|--------|------------------------|---------------|------|
| `tabs.home` | 首页 Tab、首页、home | `pages/tabs/home/manifest.md` | 已落地：推荐 + 目的地双框架；模块含 titlebar/search、首页金刚/频道/feeds、目的地金刚/榜单/当地体验/推荐；底栏 tabbar |
| `tabs.member` | 会员 Tab、会员 | `pages/tabs/member/manifest.md` | 已落地：等级卡、品牌权益、航司挑战横幅、酒店 Feeds；顶栏 navbar / 底栏 tabbar |
| `tabs.messages` | 消息 Tab、消息、通知 | `pages/tabs/messages/manifest.md` | 待落地；子模块随供稿补 |
| `tabs.trip` | 行程 Tab、行程 | `pages/tabs/trip/manifest.md` | 待落地 |
| `tabs.mine` | 我的 Tab、我的、个人中心 | `pages/tabs/mine/manifest.md` | 已落地：头部、工具栏、Feeds；底栏 tabbar |
| `vertical.flight.home` | 机票首页、机票频道 | `pages/vertical/flight/home/manifest.md` | 已落地：氛围/小搜/金刚/省钱/特价/活动长图/行业底栏；`example.html` 按供稿可预览 |
| `vertical.flight.list` | 机票列表、航班列表 | `pages/vertical/flight/list/manifest.md` | 已对齐供稿：导航/日历/营销/快筛/直飞卡(多变体)/省钱/分割/中转快筛/中转卡(6变体)/心智/底bar |
| `vertical.flight.ota` | 机票 OTA、舱位报价 | `pages/vertical/flight/ota/manifest.md` | 已对齐供稿：导航/行程卡/百叶窗/小黄条/otatab/商品卡(4变体)+更多报价/心智；`example-full.html` |
| `vertical.train.home` | 火车票首页、火车票频道 | `pages/vertical/train/home/manifest.md` | 已落地：title/搜索/金刚/优惠专区/路线专家/微信助手/水印/频道底 bar；`viewport` 750；底 bar 非主 Tabbar |
| `vertical.train.list` | 火车票列表、车次列表 | `pages/vertical/train/list/manifest.md` | 对齐 `listing-page`：375 基准 Web Components；[`example-full.html`](../pages/vertical/train/list/example-full.html) 整页；`fetch_trains.py` 见参考目录 |
| `vertical.train.ota` | 火车票 OTA、火车订票详情 | `pages/vertical/train/ota/manifest.md` | 已落地：title(日期)/行程卡/营销条/座席区/报价区(三方案)/水印；750 viewport；[`example-full.html`](../pages/vertical/train/ota/example-full.html) |
| `vertical.hotel.home` | 酒店首页、酒店频道 | `pages/vertical/hotel/home/manifest.md` | 已落地：Banner/搜索/灵感/促销三卡(双布局)/猜你喜欢卡/频道底栏；750 viewport；[`example-full.html`](../pages/vertical/hotel/home/example-full.html) |
| `vertical.hotel.list` | 酒店列表、酒店搜索结果 | `pages/vertical/hotel/list/manifest.md` | 已落地：顶栏+黄框搜索+地图/列表切换与主筛联动、权益条、行卡、AI 本地人认证变体、地图场景卡；750；[`example-full.html`](../pages/vertical/hotel/list/example-full.html)；AI 整页见 `modules/hotel-list-ai-locals/example.html` |
| `vertical.hotel.detail` | 酒店详情、酒店 PDP | `pages/vertical/hotel/detail/manifest.md` | 已落地：01–13 单列流 + 04 筛选吸顶；iframe 编排 [`example-full.html`](../pages/vertical/hotel/detail/example-full.html)；模块各 `modules/*/example.html` + `embed-autosize.js` |
| `vertical.hotel.booking` | 酒店下单、填单页、提交订单 | `pages/vertical/hotel/booking/manifest.md` | 已落地：渐变顶+固定导航+底支付栏（见 `design-framework-components.md`）；整页 [`example-full.html`](../pages/vertical/hotel/booking/example-full.html)；10 切片模块 + [`assets/`](../pages/vertical/hotel/booking/assets/) |
| `vertical.hotel.order` | 酒店订单详情、订单详情页 | `pages/vertical/hotel/order/manifest.md` | 已落地：黄头+176 顶栏+通栏卡片+交叉销售+底操作栏（见 `design-framework-components.md`）；[`example-full.html`](../pages/vertical/hotel/order/example-full.html)；11 模块 + [`assets/`](../pages/vertical/hotel/order/assets/) |
| `vertical.vacation.ticket` | 门票频道、门票玩乐频道、玩乐列表 | `pages/vertical/vacation/ticket/manifest.md` | 已落地：750×359 Banner + fixed 沉浸式顶栏 + 搜索/推荐/类目/下拉/快筛/POI；[`example-full.html`](../pages/vertical/vacation/ticket/example-full.html)；8 模块；配图可外链 |
| `vertical.vacation.order` | 度假订单详情、门票已出票订详 | `pages/vertical/vacation/order/manifest.md` | 已落地：黄头+fixed 顶栏+白链(服务/基础/凭证)+18 灰缝+退改/POI/订单/出行/二销+吸底栏；[`example-full.html`](../pages/vertical/vacation/order/example-full.html)；11 模块 |
| `vertical.vacation.detail` | 门票商详、玩乐商品详情、PDP | `pages/vertical/vacation/detail/manifest.md` | 已落地：750×1624 框架；吸顶顶栏滚过 180px 变白；头图 750×750+指示器+基础信息/货架/POI/图文详情；吸底转化栏；[`example-full.html`](../pages/vertical/vacation/detail/example-full.html)；8 模块 |
| `vertical.vacation.search` | 度假小搜、旅行列表、跟团混排 | `pages/vertical/vacation/search/manifest.md` | 已落地：顶搜+类目+下拉筛+快筛固定；列表 `fixed top:438` 内滚动；跟团游卡+POI 卡；[`example-full.html`](../pages/vertical/vacation/search/example-full.html)；6 模块 |
| `vertical.car.home` | 租车首页、安心租首页、租车频道首页 | `pages/vertical/car/home/manifest.md` | 已落地：750；头图压接+搜索大卡(2-1～2-8)+营销领券+白底列表(城市 Tab/视频组/车辆卡)+频道底栏；[`example-full.html`](../pages/vertical/car/home/example-full.html)；5 模块 |
| `vertical.car.ota` | 租车 OTA、租车车型报价详情 | `pages/vertical/car/ota/manifest.md` | 已落地：750×4505；头图/摘要（车信息+88VIP+取还）/报价 11 项固定栈+Home Indicator；[`example-full.html`](../pages/vertical/car/ota/example-full.html)；8 模块 + 报价/推荐共享 CSS |
| `vertical.car.list` | 租车列表、车型列表 | `pages/vertical/car/list/manifest.md` | 已落地：视口 750×1624、画布 2111；状态栏+导航+快筛(无联订)+大筛选+新客专享+侧导航 8 项+右列 5 卡；[`example-full.html`](../pages/vertical/car/list/example-full.html)；7 模块 |

## 命名约定

- **底栏五大 Tab**：`tabs.{home,member,messages,trip,mine}`。  
- **目的地**：不单独 `page_id`；作为 **`tabs.home`** 下 **`modules/`** 模块（首页 **顶 Tab** 切换）。若将来需独立深链页面再另增 `page_id` 并改本表。  
- **垂直业务页**（行业场景页）：`vertical.<行业>.<场景>`，例如 **`vertical.flight.home` / `vertical.flight.list` / `vertical.flight.ota`**；页面下 **`modules/<slug>/`** 为切片组件。更细粒度模块 **不单独占 `page_id`**，由对应场景的 **`manifest.md`** 闭包列出。  
- （历史表述）若文档中出现 `vertical.*.*.*` 多级，以 **`page-index` 本表为准** 收敛到「页级 `page_id` + manifest 内模块路径」。

每条 `manifest.md` 列出本页允许读取的全部 **`spec.md` 路径**（平台 / 业务组件 + 本 Tab 的 `modules/.../spec.md`），相对仓库根。
