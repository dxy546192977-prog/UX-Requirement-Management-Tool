# 酒店订单详情（`vertical.hotel.order`）— 页面结构

## 元信息

- **page_id**：`vertical.hotel.order`（与 [docs/page-index.md](../../../docs/page-index.md) 一致时引用）  
- **参考实现**：[example.html](example.html)（**唯一** HTML/CSS 真相源；无 `modules/`、`manifest.md`）  
- **本地切图**：目录下 **[`assets/`](assets/)**；页面内以相对路径 `assets/…` 引用，**勿删**该文件夹。  
- **依赖**：[foundations/design-foundations.md](../../../foundations/design-foundations.md)；配图见 [foundations/image-library.md](../../../foundations/image-library.md)  
- **Skill 编排入口**：[SKILL.md](../../../../SKILL.md)  
- **最后同步**：2026-04-12  

---

## 一、视口与画布

- **viewport**：`width=750, user-scalable=no, viewport-fit=cover`  
- **黄头氛围**：`.yellow-header-bg` 等顶层背景与 **固定顶栏** `.nav-header` 层级见 [example.html](example.html)。  
- **底部留白**：`body` `padding-bottom` 为底部操作区与安全区让位，与示例一致。  

---

## 二、固定框架（摘要）

含 **黄头背景**、**固定导航**、**底部固定操作条**；尺寸与滚动行为以 [example.html](example.html) 为准（原 `design-framework-components.md` 已收束到单页）。  

---

## 三、主内容纵向顺序（自上而下）

| 顺序 | 区块 | 说明 |
|:----:|------|------|
| 1 | 状态头 | 订单状态主标题区 |
| 2 | 价格 + 政策提示 | 整页中为 **同一通栏视觉**；历史曾拆 `price` / `policy-hint` 两模块预览 |
| 3 | 酒店卡片 | 酒店摘要 |
| 4 | 房型与日期 | 含 **入住人** 等信息的组合块（独立「入住人」切片曾用于单块预览） |
| 5 | 会员权益 | 二官 / 权益条 |
| 6 | 订单信息 | 订单号、规则等 |
| 7 | FAQ 标签 | 快捷问题入口 |
| 8 | 交叉推荐 | 交叉售卖卡片 |
| 9 | 底部操作 | fixed — 主/次按钮 |

> 以 [example.html](example.html) 实际 DOM 为准。  

---

## 四、平台组件（按需对照）

价格展示：`components/platform/widgets/price/spec.md`。  

---

## 五、维护约定

- 修改固定头/底时同步检查 **首屏内容 `padding-top` / `margin`**，避免遮挡黄头下主卡片。  
- 切图统一放 **`assets/`**，路径 **`assets/文件名`**。  

---

## 六、变更记录

| 日期 | 说明 |
|------|------|
| 2026-04-12 | 对齐 `tabs.*` 范式：仅保留 `spec.md` + `example.html` + `assets/`；原 `manifest.md`、`page-frame.md`、`modules/`、`design-framework-components.md` 职责由本文件 + 单页承担。 |
