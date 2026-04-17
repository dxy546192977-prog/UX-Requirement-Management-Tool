# 酒店下单（`vertical.hotel.booking`）— 页面结构

## 元信息

- **page_id**：`vertical.hotel.booking`（与 [docs/page-index.md](../../../docs/page-index.md) 一致时引用）  
- **参考实现**：[example.html](example.html)（**唯一** HTML/CSS 真相源；无 `modules/`、`manifest.md`）  
- **本地切图**：目录下 **[`assets/`](assets/)**；页面内以相对路径 `assets/…` 引用，**勿删**该文件夹。  
- **依赖**：[foundations/design-foundations.md](../../../foundations/design-foundations.md)；配图见 [foundations/image-library.md](../../../foundations/image-library.md)  
- **Skill 编排入口**：[SKILL.md](../../../../SKILL.md)  
- **最后同步**：2026-04-12  

---

## 一、视口与画布

- **viewport**：`width=750, user-scalable=no`  
- **单列**：`body` 最大宽 **750px** 居中；背景与底部支付条留白与 [example.html](example.html) 中 token 一致。  

---

## 二、固定框架（摘要）

整页含 **顶部黄渐变氛围**、**固定顶栏**、**底部固定支付条**；具体尺寸、层级与滚动后顶栏背景切换以 [example.html](example.html) 为准（原 `design-framework-components.md` 叙述已收束到本页实现）。  

---

## 三、主内容纵向顺序（自上而下）

与 [example.html](example.html) 内 HTML 注释与 DOM 一致：

| 顺序 | 区块 | 说明 |
|:----:|------|------|
| 1 | 预订信息卡 | `booking-info-card` |
| 2 | 重要提醒 | `notice-card` |
| 3 | 预订提示条 | `booking-tip`（`assets/like.png` 等） |
| 4 | 入住信息 | `checkin-card` — 间数、入住人、联系方式等 |
| 5 | 会员权益 | 整宽图卡（`assets/membership.png`） |
| 6 | 挑战任务 | 「住五送一」等任务行 |
| 7 | F4 本单可享 | `savings-card` — 优惠、里程、权益、离店返赠等行 |
| 8 | 支付方式 | 信用住 / 在线付 / 分期 |
| 9 | 发票报销 | 标签与说明 |
| 10 | 无痕预订 | 开关行 |
| 11 | 出行保障 | 保险项与折叠提示 |
| 12 | 协议信息 | `agreement-section` — 信用授权、入离时间等 |
| 13 | 底部支付条 | fixed — 实付与主按钮 |

> 若与稿有出入，以 [example.html](example.html) 实际 DOM 为准。  

---

## 四、平台组件（按需对照）

生成或校对价格展示时，可对照：`components/platform/widgets/price/spec.md`。  

---

## 五、维护约定

- 新增模块须在 [example.html](example.html) 内联完成样式与结构；**禁止**用灰色占位块替代已落地的卡片树。  
- 引用切图时放入 **`assets/`**，路径保持 **`assets/文件名`**，避免改为绝对磁盘路径。  

---

## 六、变更记录

| 日期 | 说明 |
|------|------|
| 2026-04-12 | 对齐 `tabs.*` 范式：仅保留 `spec.md` + `example.html` + `assets/`；原 `manifest.md`、`page-frame.md`、`modules/`、`design-framework-components.md` 职责由本文件 + 单页 HTML 承担。 |
