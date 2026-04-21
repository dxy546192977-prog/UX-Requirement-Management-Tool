# 火车票列表 — manifest（`vertical.train.list`）

## 元信息

- **page_id**：`vertical.train.list`  
- **最后同步**：2026-04-06  

---

## 允许的 spec 路径（闭包）

外加 [`page-frame.md`](page-frame.md)、[`listing-reference.md`](listing-reference.md)、**`foundations/design-foundations.md`**、（配图时）**`foundations/image-library.md`**。

### 基础与平台（按需）

```text
foundations/design-foundations.md
foundations/image-library.md
components/platform/widgets/price/spec.md
components/platform/navigation/navbar/spec.md
```

### 本页模块（`modules/`，顺序同 [`page-frame.md`](page-frame.md)）

```text
pages/vertical/train/list/modules/train-list-header/spec.md
pages/vertical/train/list/modules/train-list-calendar-bar/spec.md
pages/vertical/train/list/modules/train-list-channel-tab/spec.md
pages/vertical/train/list/modules/train-list-train-card/spec.md
pages/vertical/train/list/modules/train-list-footer-bar/spec.md
```

---

## 备注

- **Web Components**：标签名保持 `listing-*` / `train-*` 与 `listing-page/demo.html` 一致，便于与 `fetch_trains.py`、数据块标记同步。  
- **全页联调**：以 [`example-full.html`](example-full.html) 为准；单模块见各 `example.html`。  
- **外部脚本**：更新数据可在参考目录执行 `python3 fetch_trains.py …`，再按需拷回 `example-full.html` 中 `TRAIN_DATA` 区间。  

---

## 变更记录

| 日期 | 说明 |
|------|------|
| 2026-04-06 | 初版。 |
