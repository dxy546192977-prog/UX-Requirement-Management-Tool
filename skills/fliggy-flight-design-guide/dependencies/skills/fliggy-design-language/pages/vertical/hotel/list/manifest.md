# 酒店列表 — manifest（`vertical.hotel.list`）

## 元信息

- **page_id**：`vertical.hotel.list`  
- **最后同步**：2026-04-06  

---

## 允许的 spec 路径（闭包）

外加 [`page-frame.md`](page-frame.md)、**`foundations/design-foundations.md`**、（配图时）**`foundations/image-library.md`**。

### 基础（按需）

```text
foundations/design-foundations.md
foundations/image-library.md
components/platform/navigation/navbar/spec.md
components/platform/widgets/price/spec.md
```

### 本页模块（顺序见 [`page-frame.md`](page-frame.md)）

```text
pages/vertical/hotel/list/modules/hotel-list-top-chrome/spec.md
pages/vertical/hotel/list/modules/hotel-list-ai-locals/spec.md
pages/vertical/hotel/list/modules/hotel-list-benefit-bar/spec.md
pages/vertical/hotel/list/modules/hotel-list-row-card/spec.md
pages/vertical/hotel/list/modules/hotel-list-map-scene/spec.md
```

---

## 备注

- **无** 频道/主 Tab 底栏；列表触底加载。  
- **AI 变体** 与 **常规顶栏** 勿重复叠两套主筛：编排时二选一或按产品稿拼接。  
- **地图场景** 独立全屏预览，不与 `example-full.html` 默认合并。  

---

## 变更记录

| 日期 | 说明 |
|------|------|
| 2026-04-06 | 初版。 |
