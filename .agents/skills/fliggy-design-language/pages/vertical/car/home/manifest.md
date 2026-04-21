# 安心租首页 — manifest（`vertical.car.home`）

## 元信息

- **page_id**：`vertical.car.home`  
- **最后同步**：2026-04-05  

---

## 允许的 spec 路径（闭包）

外加 [`page-frame.md`](page-frame.md)、[`design-framework-components.md`](design-framework-components.md)、**`foundations/design-foundations.md`**、（配图时）**`foundations/image-library.md`**。

### 基础与平台（按需）

```text
foundations/design-foundations.md
foundations/image-library.md
```

### 本页模块（`modules/`，顺序同 [`page-frame.md`](page-frame.md)）

```text
pages/vertical/car/home/modules/car-home-hero/spec.md
pages/vertical/car/home/modules/car-home-search/spec.md
pages/vertical/car/home/modules/car-home-marketing/spec.md
pages/vertical/car/home/modules/car-home-list/spec.md
pages/vertical/car/home/modules/car-home-tabbar/spec.md
```

---

## 备注

- **Design Token** 以 `--az-*` 为主（见 `design-framework-components.md` 与整页 `example-full.html`）。  
- **底栏** 为频道内 750×150 导航示意，**非** App 全局 `tabs.*` 五大 Tab。  
- 整页串联预览：[`example-full.html`](example-full.html)（`viewport`：`width=750`）。  

---

## 变更记录

| 日期 | 说明 |
|------|------|
| 2026-04-05 | 初版：头图 / 搜索大卡 / 营销 / 列表 / 底栏。 |
