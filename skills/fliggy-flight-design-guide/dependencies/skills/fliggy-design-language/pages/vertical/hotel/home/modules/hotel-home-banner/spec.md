# 酒店首页 — 营销 Banner（`hotel-home-banner`）

## 用途

首屏 **750×332** 营销图；叠 **状态栏**（时间 9:42、信号/Wi‑Fi/电池）与 **导航栏**（返回 + 相机 + 更多）；圆形按钮 **毛玻璃** `backdrop-filter: blur(10px)`。

## 设计基准

- 宽 **750px**，高 **332px**；`viewport` **`width=750, user-scalable=no`**  
- 时间：`.status-bar__time` — **SF Pro Text**（`@font-face` → `local('San Francisco')` 降级），**600** / **30px**  

## 产出

- [`example.html`](example.html)  

## 变更记录

| 日期 | 说明 |
|------|------|
| 2026-04-06 | 初版。 |
