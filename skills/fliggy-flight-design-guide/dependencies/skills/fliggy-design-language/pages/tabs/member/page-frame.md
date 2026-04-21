# 会员 Tab 页面框架（`tabs.member`）

## 元信息

- **page_id**：`tabs.member`  
- **依赖**：[`foundations/design-foundations.md`](../../../foundations/design-foundations.md)；顶栏 [`components/platform/navigation/navbar/spec.md`](../../../components/platform/navigation/navbar/spec.md)；底栏 [`components/platform/navigation/tabbar/spec.md`](../../../components/platform/navigation/tabbar/spec.md)  
- **最后同步**：2026-04-05  

---

## 布局模式

| 区域 | 说明 |
|------|------|
| **顶栏** | 平台 **`fdl-navbar`**：左返回/入口文案「会员」「里程」等、中标题、右品牌/状态区（与供稿对齐；细节见 navbar spec）。 |
| **主滚动区** | 背景 **`var(--color-bg)`**；内容 **水平 24px**（模块卡 **690** 宽居中，与供稿一致）；块间垂直间距 **18～30px**。 |
| **底栏** | **`fdl-tabbar`**，**当前高亮 = 会员**（可用角标/红点示意，见 tabbar spec）。 |

---

## 滚动区内模块顺序（自上而下）

1. **会员等级概览卡** — `modules/member-level-card/`（头像/等级标/进度/里程·购物金/等级主视觉/权益宫格/任务横滑等；供稿统称「等级卡片」）  
2. **直通品牌权益（一通百）** — `modules/member-brand-benefits/`  
3. **航司会员挑战横幅** — `modules/member-airline-challenge-banner/`  
4. **列表区（主 Tab + 二级 Tab + 筛选 + 酒店卡片）** — `modules/member-hotel-feeds/`  

**供稿扩展位**（本批次未单独拆模块）：框架中的 **里程差额提示条**、**保级三宫格（住酒店/订机票/去旅游）**、卡片内 **「升级规则」** 等，可在下一版增 `member-milestone-*` 或并入 `member-level-card` spec。

---

## 圆角与卡片

- 大主卡：**24px** → **`var(--radius-l)`**  
- 内层小卡/按钮：**12px / 胶囊** → **`--radius-m`** 或与供稿一致的 **42px** 任务按钮（示例内说明）

---

## 产出物索引

| 类型 | 路径 |
|------|------|
| 闭包 | [`manifest.md`](manifest.md) |
| 模块 | `modules/member-level-card/`、`member-brand-benefits/`、`member-airline-challenge-banner/`、`member-hotel-feeds/` |

---

## 变更记录

| 日期 | 说明 |
|------|------|
| 2026-04-05 | 初版。 |
