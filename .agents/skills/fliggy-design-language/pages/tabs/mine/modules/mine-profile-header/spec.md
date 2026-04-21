# 个人中心头部（`mine-profile-header`）

## 元信息

- **模块 slug**：`mine-profile-header`  
- **示例**：[`example.html`](example.html)  
- **依赖**：[`foundations/design-foundations.md`](../../../../../foundations/design-foundations.md)  
- **最后同步**：2026-04-05  

---

## 用途

「我的」页 **首屏头部**：**头像 + 会员标签**、**昵称 + 进度条 + 去升级**、右上 **客服 / 设置**；**紫色会员大卡**（标题「飞猪会员中心」、**已省金额**、品牌直通浮层、权益四宫格 + 更多）；其下 **省钱卡**（文案 + 「去使用」主按钮）。

---

## DOM 根与主块

- 根：**`.fdl-mine-profile-header`**（宽 **750px**，`min-height` 覆盖头部+卡片区，背景 **径向渐变** 与 `page-frame` 一致）  
- **`.fdl-mine-profile-header__user`**：用户信息行（`top: 88px` 类绝对布局或与根 `padding-top` 等效）  
- **`.fdl-mine-profile-header__actions`**：客服、设置  
- **`.fdl-mine-profile-header__member-card`**：714×230，上圆角 **18px**，紫渐变 + 顶部高光径向  
- **`.fdl-mine-profile-header__save-card`**：714×78，白渐变底  

---

## Token 要点

| 用途 | 值 |
|------|-----|
| 页渐变终点 | `#E4E4FD` |
| 会员标签渐变 | `#7878F5` → `#41499F` |
| 进度填充 | `#6666FF`（`--color-indigo-1`） |
| 会员卡渐变 | `106deg, #5B5BBA 67.92%, #4D4D9D 100%` + 顶光径向（见示例） |
| 主文 | `#0F131A`（`--color-darkgray`） |
| 省钱按钮 | `#6666FF` 底，白字 |

**字体**：昵称 **36px / 500**；「飞猪会员中心」**Fliggy Fonts** 斜体 **33px / 500**（须 `@font-face`）；进度数字 **22px**，可用 **PingFang** 或 **Fliggy Sans 102** 与产品对齐。

---

## 无障碍

- 头像 `alt`；客服/设置/去升级/去使用为 **可聚焦控件**；权益区若整卡可点需 **`aria-label`**。  

---

## 变更记录

| 日期 | 说明 |
|------|------|
| 2026-04-05 | 初版，对齐供稿 `my-profile-header-v2` 结构。 |
