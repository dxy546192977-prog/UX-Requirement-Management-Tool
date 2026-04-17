# 页面层（`pages/`）

本目录为 **FDG 页面真相源**：底栏 Tab、行业垂直场景、模块切片与整页示例均在此维护。

## 顶层结构

| 路径 | 用途 |
|------|------|
| [`tabs/`](tabs/) | **App 底栏五大 Tab**（`home` / `member` / `messages` / `trip` / `mine`）。见 [`tabs/README.md`](tabs/README.md)。 |
| [`vertical/`](vertical/) | **行业垂直页**：机票 / 火车 / 酒店 / 度假 / 租车等，按场景分子目录；每场景以 **`spec.md` + `example.html`** 为真相源（与 `tabs/home` 同形态）。 |
| [`search/`](search/) | **全局搜索链路**：入口页、Sug 提链、搜索结果列表；各子场景 **`spec.md` + `example.html`**。 |
| [`car/`](car/) | **顶层租车说明占位**（与 `vertical/car/` 并存时：以 **`vertical/car/`** 为实际页面实现目录）。 |

## 单页目录约定（垂类 / Tab 场景页）

```text
pages/<area>/<...>/<scene>/
  spec.md             # 页面结构与维护说明
  example.html        # 整页 HTML/CSS 真相源
  assets/             # 可选：仅当本页使用本地切图时保留
```

## 索引

- **`page_id` → manifest / 规范入口**：[`docs/page-index.md`](../docs/page-index.md)  
- **底栏顺序**：[`docs/tab-pages-order.md`](../docs/tab-pages-order.md)  
- **组件库（平台）**：[`docs/component-index.md`](../docs/component-index.md)

## 来源说明

**机票 / 火车 / 租车 / 度假** 垂类各场景已收束为 **`spec.md` + `example.html`**（无 `modules/`）。**`tabs/member`**、**`tabs/trip`**、**`tabs/mine`** 等同理。后续以本仓库为唯一维护源。
