# 直通品牌权益（一通百）（`member-brand-benefits`）

## 元信息

- **模块 slug**：`member-brand-benefits`  
- **示例**：[`example.html`](example.html)  
- **依赖**：[`foundations/design-foundations.md`](../../../../../foundations/design-foundations.md)  
- **最后同步**：2026-04-05  

---

## 用途

展示 **多品牌会员直通**（横排 **3 张** 渐变卡：Logo 毛玻璃区 + 权益标题 + **「开通」** 胶囊按钮）；标题行 **左主标题 + 右「查看全部」**。

**文案**：供稿框架可为「直通40+品牌会员…」；示例为「专享品牌权益」—— **以产品配置为准**，spec 不锁死文案。

---

## DOM 与类名

- 外包层（可选）：**`.fdl-member-brand-benefits__wrap`**（白底 16 圆角 + 内边距，用于与灰底页面对比）  
- 根：**`.fdl-member-brand-benefits`**（宽约 **714px**）  
- 头：**`.fdl-member-brand-benefits__header`**、**`__title`**、**`__view-all`**  
- 列表：**`.fdl-member-brand-benefits__list`**  
- 单卡：**`.fdl-member-brand-benefits__card`** + 修饰符 **`--accor` / `--hilton` / `--hyatt`**（或数据驱动类名）

---

## 单卡尺寸

- **230 × 162**，圆角 **12**，内边距上下 **18**；Logo 区约 **89×48**，`backdrop-filter: blur(7px)`，`rgba(255,255,255,0.1)` 底。

---

## Token

- 标题：**`var(--color-text-primary)`**，30px / 500  
- 查看全部：**`var(--color-text-secondary)`**，hover **`#5C5F66`**（或 `--color-text-tertiary` 加深）  
- 卡内字：**白色**；按钮边框 **`rgba(255,255,255,0.5)`**，hover 半透明白底  

---

## 变更记录

| 日期 | 说明 |
|------|------|
| 2026-04-05 | 初版。 |
