# 首页多功能频道（Home Multi-channel）

## 元信息

- **slug**：`home-multi-channel`  
- **page_id**：`tabs.home`  
- **分类**：首页 Tab — 内容区 **1+1+1+2** 栅格  
- **依赖**：[`foundations/design-foundations.md`](../../../../../foundations/design-foundations.md)  
- **最后同步**：2026-04-05  

---

## 概述

**横向四列**（**`gap: 11`**），等分 **`flex: 1 1 0`**，总宽 **702**：**① 特价机票**（列表卡片 + 渐变底）、**② 天天特惠**（图文 + 底渐变蒙层）、**③ 飞猪榜单**（图文 + 金绿渐变蒙层 + 渐变字标题）、**④ 上下叠两张**（演出赛事 / 爆款直播）。单列卡高 **265**；子卡各约 **126.5** 高；小圆角 **`--radius-m`（12）**；内部次级白卡片圆角 **10**（机票行）。

渐变主色未进全局 token 时，在 **`example.html` 的 `:root`** 注册 **`--fdl-home-ch-*`**（见示例）。

供稿 `channel-container` / `channel-card-*` → **`fdl-home-channels`** / **`fdl-home-channels__*`**。

---

## 视觉规范（@2x px）

| 项目 | 值 |
|------|-----|
| 容器 | **702** 宽 **265** 高；列 **`gap: 11`** |
| 标题区 | **24** Medium **`--color-darkgray`**；角标 **`--color-indigo-1`** 12% 混白底 |
| 机票行 | **20** 城市名；**`--color-pay-1`** 折扣；行底白渐变条 **10** 圆角 |
| 蒙层字 | 酒店/榜单标题 **22** Medium 白；榜单徽章字可用渐变（`-webkit-background-clip: text`） |

---

## 结构与层次

```text
section.fdl-home-channels
  ├── article.fdl-home-channels__col.fdl-home-channels__col--flights
  ├── article.fdl-home-channels__col.fdl-home-channels__col--hotel
  ├── article.fdl-home-channels__col.fdl-home-channels__col--rank
  └── div.fdl-home-channels__col.fdl-home-channels__col--stack
        ├── article.fdl-home-channels__sub（演出）
        └── article.fdl-home-channels__sub（直播）
```

---

## 产出物

- [`example.html`](example.html)  

---

## 变更记录

| 日期 | 说明 |
|------|------|
| 2026-04-05 | 初版。 |
