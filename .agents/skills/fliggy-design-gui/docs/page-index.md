# 页面索引（`page_id` → 入口）

本表登记 **页面入口**：以各场景目录 **`spec.md` + `example.html`** 为准（与 `tabs.home` 同形态）；历史 `manifest.md` / `page-frame.md` / `modules/` 已从 **机票 / 火车 / 租车 / 度假** 垂类页收束删除。  
完整目录树见 [`pages/README.md`](../pages/README.md)。

---

## 底栏 Tab（`tabs.*`）

| page_id | 用户可见别名 / 关键词 | 入口路径 | 备注 |
|--------|------------------------|----------|------|
| `tabs.home` | 首页、推荐 | [`pages/tabs/home/spec.md`](../pages/tabs/home/spec.md) | 整页 [`example.html`](../pages/tabs/home/example.html)；暂无 `manifest.md` |
| `tabs.member` | 会员 Tab | [`pages/tabs/member/spec.md`](../pages/tabs/member/spec.md) | 整页 [`example.html`](../pages/tabs/member/example.html)；无 `manifest.md` |
| `tabs.messages` | 消息 Tab | [`pages/tabs/messages/spec.md`](../pages/tabs/messages/spec.md) | 整页 [`example.html`](../pages/tabs/messages/example.html)；暂无 `manifest.md` |
| `tabs.trip` | 行程 Tab | [`pages/tabs/trip/spec.md`](../pages/tabs/trip/spec.md) | 整页 [`example.html`](../pages/tabs/trip/example.html)；猜你喜欢与首页 `fdl-feeds-dual` 同源；无 `manifest.md` |
| `tabs.mine` | 我的 Tab | [`pages/tabs/mine/spec.md`](../pages/tabs/mine/spec.md) | 整页 [`example.html`](../pages/tabs/mine/example.html)；无 `manifest.md` |

---

## 垂直行业（`vertical.*`）

### 机票 `vertical.flight.*`

| page_id | 关键词 | 入口路径 | 备注 |
|--------|--------|----------|------|
| `vertical.flight.home` | 机票首页 | [`pages/vertical/flight/home/spec.md`](../pages/vertical/flight/home/spec.md) | 整页 [`example.html`](../pages/vertical/flight/home/example.html)；无 `manifest.md` |
| `vertical.flight.list` | 机票列表 | [`pages/vertical/flight/list/spec.md`](../pages/vertical/flight/list/spec.md) | 整页 [`example.html`](../pages/vertical/flight/list/example.html)；无 `manifest.md` |
| `vertical.flight.ota` | 机票 OTA | [`pages/vertical/flight/ota/spec.md`](../pages/vertical/flight/ota/spec.md) | 整页 [`example.html`](../pages/vertical/flight/ota/example.html)；无 `manifest.md` |
| `vertical.flight.booking` | 机票下单 | [`pages/vertical/flight/booking/spec.md`](../pages/vertical/flight/booking/spec.md) | 整页 [`example.html`](../pages/vertical/flight/booking/example.html)；无 `manifest.md` |
| `vertical.flight.order` | 机票订单详情 | [`pages/vertical/flight/order/spec.md`](../pages/vertical/flight/order/spec.md) | 整页 [`example.html`](../pages/vertical/flight/order/example.html)；无 `manifest.md` |

### 火车票 `vertical.train.*`

| page_id | 关键词 | 入口路径 | 备注 |
|--------|--------|----------|------|
| `vertical.train.home` | 火车票首页 | [`pages/vertical/train/home/spec.md`](../pages/vertical/train/home/spec.md) | 整页 [`example.html`](../pages/vertical/train/home/example.html)；无 `manifest.md` |
| `vertical.train.list` | 火车票列表 | [`pages/vertical/train/list/spec.md`](../pages/vertical/train/list/spec.md) | 整页 [`example.html`](../pages/vertical/train/list/example.html)；无 `manifest.md` |
| `vertical.train.ota` | 火车票 OTA | [`pages/vertical/train/ota/spec.md`](../pages/vertical/train/ota/spec.md) | 整页 [`example.html`](../pages/vertical/train/ota/example.html)；无 `manifest.md` |
| `vertical.train.booking` | 火车票下单 | [`pages/vertical/train/booking/spec.md`](../pages/vertical/train/booking/spec.md) | 整页 [`example.html`](../pages/vertical/train/booking/example.html)；无 `manifest.md` |
| `vertical.train.order` | 火车票订单详情 | [`pages/vertical/train/order/spec.md`](../pages/vertical/train/order/spec.md) | 整页 [`example.html`](../pages/vertical/train/order/example.html)；无 `manifest.md` |

### 酒店 `vertical.hotel.*`

| page_id | 关键词 | 入口路径 | 备注 |
|--------|--------|----------|------|
| `vertical.hotel.home` | 酒店首页 | [`pages/vertical/hotel/home/spec.md`](../pages/vertical/hotel/home/spec.md) | 整页 [`example.html`](../pages/vertical/hotel/home/example.html)；无 `manifest.md` |
| `vertical.hotel.list` | 酒店列表 | [`pages/vertical/hotel/list/spec.md`](../pages/vertical/hotel/list/spec.md) | 整页 [`example.html`](../pages/vertical/hotel/list/example.html)；无 `manifest.md` |
| `vertical.hotel.detail` | 酒店详情 | [`pages/vertical/hotel/detail/spec.md`](../pages/vertical/hotel/detail/spec.md) | 单文件 [`example.html`](../pages/vertical/hotel/detail/example.html)；无 `manifest.md` |
| `vertical.hotel.booking` | 酒店下单 | [`pages/vertical/hotel/booking/spec.md`](../pages/vertical/hotel/booking/spec.md) | 整页 [`example.html`](../pages/vertical/hotel/booking/example.html) + 本地切图 [`assets/`](../pages/vertical/hotel/booking/assets/) |
| `vertical.hotel.order` | 酒店订单详情 | [`pages/vertical/hotel/order/spec.md`](../pages/vertical/hotel/order/spec.md) | 整页 [`example.html`](../pages/vertical/hotel/order/example.html) + 本地切图 [`assets/`](../pages/vertical/hotel/order/assets/) |

### 度假 `vertical.vacation.*`

| page_id | 关键词 | 入口路径 | 备注 |
|--------|--------|----------|------|
| `vertical.vacation.ticket` | 门票·玩乐频道 | [`pages/vertical/vacation/ticket/spec.md`](../pages/vertical/vacation/ticket/spec.md) | 整页 [`example.html`](../pages/vertical/vacation/ticket/example.html)；无 `manifest.md` |
| `vertical.vacation.search` | 小搜、旅行列表聚合 | [`pages/vertical/vacation/search/spec.md`](../pages/vertical/vacation/search/spec.md) | 整页 [`example.html`](../pages/vertical/vacation/search/example.html)；无 `manifest.md` |
| `vertical.vacation.detail` | 门票/玩乐商详 | [`pages/vertical/vacation/detail/spec.md`](../pages/vertical/vacation/detail/spec.md) | 整页 [`example.html`](../pages/vertical/vacation/detail/example.html)；无 `manifest.md` |
| `vertical.vacation.order` | 度假订单详情 | [`pages/vertical/vacation/order/spec.md`](../pages/vertical/vacation/order/spec.md) | 整页 [`example.html`](../pages/vertical/vacation/order/example.html)；无 `manifest.md` |
| `vertical.vacation.booking` | 门票/玩乐下单 | [`pages/vertical/vacation/booking/spec.md`](../pages/vertical/vacation/booking/spec.md) | 整页 [`example.html`](../pages/vertical/vacation/booking/example.html)；无 `manifest.md` |
| `vertical.vacation.line_detail` | 线路商品详情 | [`pages/vertical/vacation/line-detail/spec.md`](../pages/vertical/vacation/line-detail/spec.md) | 整页 [`example.html`](../pages/vertical/vacation/line-detail/example.html)；无 `manifest.md` |

### 租车 `vertical.car.*`

| page_id | 关键词 | 入口路径 | 备注 |
|--------|--------|----------|------|
| `vertical.car.home` | 安心租首页 | [`pages/vertical/car/home/spec.md`](../pages/vertical/car/home/spec.md) | 整页 [`example.html`](../pages/vertical/car/home/example.html)；无 `manifest.md` |
| `vertical.car.list` | 租车列表 | [`pages/vertical/car/list/spec.md`](../pages/vertical/car/list/spec.md) | 整页 [`example.html`](../pages/vertical/car/list/example.html)；无 `manifest.md` |
| `vertical.car.ota` | 租车 OTA 详情 | [`pages/vertical/car/ota/spec.md`](../pages/vertical/car/ota/spec.md) | 整页 [`example.html`](../pages/vertical/car/ota/example.html)；无 `manifest.md` |
| `vertical.car.booking` | 租车下单 | [`pages/vertical/car/booking/spec.md`](../pages/vertical/car/booking/spec.md) | 整页 [`example.html`](../pages/vertical/car/booking/example.html)；无 `manifest.md` |
| `vertical.car.order` | 租车订单详情 | [`pages/vertical/car/order/spec.md`](../pages/vertical/car/order/spec.md) | 整页 [`example.html`](../pages/vertical/car/order/example.html)；无 `manifest.md` |

---

## 搜索（`search.*`）

| page_id | 关键词 | 入口路径 | 备注 |
|--------|--------|----------|------|
| `search.search` | 搜索入口、主搜 | [`pages/search/search/spec.md`](../pages/search/search/spec.md) | 整页 [`example.html`](../pages/search/search/example.html)；无 `manifest.md` |
| `search.search_sug` | 搜索 Sug、联想提链 | [`pages/search/search-sug/spec.md`](../pages/search/search-sug/spec.md) | 整页 [`example.html`](../pages/search/search-sug/example.html)；无 `manifest.md` |
| `search.search_result` | 搜索结果、提链列表 | [`pages/search/search-result/spec.md`](../pages/search/search-result/spec.md) | 整页 [`example.html`](../pages/search/search-result/example.html)；无 `manifest.md` |

---

## 维护约定

- 新增场景页：在本表增一行；**`search.*`、`vertical.hotel.*`、`vertical.flight.*`、`vertical.train.*`、`vertical.car.*`、`vertical.vacation.*`** 均以各场景 **`spec.md` + `example.html`** 为准（无 `manifest.md` / `modules/`）。  
- `tabs.home` 若后续补 `manifest.md`，将本表「入口」改为 manifest 并保留 `spec.md` 为结构说明即可。
