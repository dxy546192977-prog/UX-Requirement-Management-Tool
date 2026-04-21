# 火车票列表 — 车次卡片（`train-list-train-card`）

## 元信息

- **模块 slug**：`train-list-train-card`  
- **所属页**：`vertical.train.list`  
- **示例**：[`example.html`](example.html)  
- **依赖**：[`page-frame.md`](../../page-frame.md)、[`listing-reference.md`](../../listing-reference.md)、[`components/platform/widgets/price/spec.md`](../../../../../../components/platform/widgets/price/spec.md)（语义参考）  
- **最后同步**：2026-04-06  

---

## 用途

单行车次：**出发/到达时刻（Fliggy Sans 102）**、历时、车次号、站点（可带 **始/终** 小标）、**座席四列**（`train-seat` slot）、右侧 **红色价格**（`train-price`）；可选 **`train-tag`** 营销条、**`small-label`**（复兴号/卧铺等）。

---

## 子组件（同文件注册）

| 标签 | 说明 |
|------|------|
| `train-tag` | `variant` positive / emphasis；`text` |
| `small-label` | 单字框线标 |
| `train-seat` | `level`、`status` available / unavailable / grab；可选 `count` |
| `train-price` | `price` 数字字符串 |

主元素 **`listing-train-card`**：属性含 `departure-time`、`arrival-time`、`departure-station`、`arrival-station`、`train-number`、`price`，以及 `show-start`、`show-end`、`show-tag1`、`show-fuxing-tag`、`show-berth-tag` 等布尔开关（见 `listing-page/demo.html`）。

---

## 规格摘要（卡片体）

| 项 | 值 |
|----|-----|
| 宽 | **375** |
| 时刻 | **21px** Fliggy Sans |
| 车站 | **12px/#0F131A**，最大宽约 **60** 省略 |
| 历时/车次 | **10px/#5C5F66** |
| 价格 | **¥ 12px + 21px** `#FF5533` |
| 座席行 | 左区 **240** 宽三槽 + 第四槽右对齐 |

---

## 变更记录

| 日期 | 说明 |
|------|------|
| 2026-04-06 | 初版。 |
