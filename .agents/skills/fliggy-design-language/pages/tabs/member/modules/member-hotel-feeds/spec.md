# 会员 Tab 酒店 Feeds（`member-hotel-feeds`）

## 元信息

- **模块 slug**：`member-hotel-feeds`  
- **示例**：[`example.html`](example.html)  
- **依赖**：[`foundations/design-foundations.md`](../../../../../foundations/design-foundations.md)、[`components/platform/widgets/price/spec.md`](../../../../../components/platform/widgets/price/spec.md)  
- **最后同步**：2026-04-05  

---

## 用途

**主 Tab**（如 会员价 / 里程倍花 / 里程加钱购 — 示例用四格占位）+ **二级 Tab 胶囊** + **筛选栏**（左筛选、右入住离店日期）+ **酒店列表卡**（左图角标 + 右信息 + 价 + 优惠行）。列表项 **结构重复**，数据驱动。

---

## 容器

- 根：**`.fdl-member-hotel-feeds`**，宽 **750**（与 `viewport` 一致），顶圆角 **24**，白底。  
- 主 Tab：**`.fdl-member-hotel-feeds__main-tabs`**  
- 二级 Tab：**`.fdl-member-hotel-feeds__sub-tabs`**  
- 筛选：**`.fdl-member-hotel-feeds__filter`**  
- 列表：**`.fdl-member-hotel-feeds__list`**  
- 单卡：**`.fdl-member-hotel-feeds__card`**

---

## Token 要点

- 主 Tab 激活：渐变 **`#FEEBD8` → `#FFFFFF`**（与供稿）  
- 二级 Tab 激活：**`#FEF5EC`**；未激活：**`#F7F8FA`** + 字色 **`#5C5F66`**  
- 评分紫：**`#6666FF`**；价格红：**`var(--color-price)`**（`#FF5533`）  
- **价格数字**：**Fliggy Sans 102**（禁止 Alibaba Sans 作为展示数字主字体）

---

## 文案

主 Tab 示例「国内备份」为 **笔误占位**，产品应改为 **「国内酒店」** 等；spec 以 **配置文案** 为准。

---

## 变更记录

| 日期 | 说明 |
|------|------|
| 2026-04-05 | 初版。 |
