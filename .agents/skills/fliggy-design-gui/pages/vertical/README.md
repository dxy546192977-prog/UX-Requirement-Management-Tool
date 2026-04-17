# 垂直业务页面

子目录建议：`flight/`、`train/`、`hotel/`、`vacation/`、`car/`、`search/`。

每 **场景**（如首页、列表、OTA）单独子目录，内含 **`spec.md` + `example.html`**（与底栏 `tabs/home` 同形态；按需含 **`assets/`**）。**`page_id`** 登记在 [`docs/page-index.md`](../../docs/page-index.md)。

## 已建行业

| 行业 | 目录 | 说明 |
|------|------|------|
| 机票 | [`flight/`](flight/README.md) | `home` / `list` / `ota` 三场景 |
| 火车票 | [`train/`](train/README.md) | **`home`** / **`list`**（375 `listing-page`）/ **`ota`**（750）已落地 |
| 酒店 | [`hotel/`](hotel/README.md) | **`home`** / **`list`** / **`detail`** / **`booking`** / **`order`**（750）已落地 |
| 度假 | [`vacation/`](vacation/README.md) | **`ticket`** / **`search`**（小搜列表）/ **`detail`**（商详）/ **`order`**（订详），750 基准已落地 |
| 租车 | [`car/`](car/README.md) | **`home`** / **`list`** / **`ota`**：各 [`spec.md`](car/home/spec.md) + [`example.html`](car/home/example.html) |
