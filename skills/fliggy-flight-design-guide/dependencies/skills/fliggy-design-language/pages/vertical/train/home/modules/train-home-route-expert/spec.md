# 火车票首页 — 火车路线专家（`train-home-route-expert`）

## 元信息

- **模块 slug**：`train-home-route-expert`  
- **所属页**：`vertical.train.home`  
- **示例**：[`example.html`](example.html)  
- **依赖**：[`foundations/design-foundations.md`](../../../../../../foundations/design-foundations.md)  
- **最后同步**：2026-04-06  

---

## 用途

渐变外框路线推荐：**特价火车票 / 火车小时达** Tab（切图背景）、三筛选钮、路线卡（城市图、OD、玩/吃标签、价格条含 **Fliggy Sans 102** 价）、**查看更多内容**。

---

## 规格摘要

| 项 | 值 |
|----|-----|
| 外容器 | 宽 **702**，`linear-gradient(180deg, #FFF5EB, #FFFAF6)`，**2px #FFF** 边，圆角 **18** |
| Tab 区 | **654×80**；文案 **28/500/#000**；背景切图 **object-position: left**（见示例） |
| 内容白底 | 下圆角 **12**；筛选钮 **194×60**；选中 **#FFF2F0** + **#FF5533** |
| 价格条 | **494×78** 渐变底；**¥ 20px + 数字 36px** 橙红 |
| 展开 | **276×60**，**#F7F8FA**，**26/500/#6666FF**，圆角 **30** |

**视口**：整页一致 **`width=750, user-scalable=no`**；示例已带 **Fliggy Sans 102** CDN。

---

## 变更记录

| 日期 | 说明 |
|------|------|
| 2026-04-06 | 初版；viewport 与数字体对齐 FDL。 |
