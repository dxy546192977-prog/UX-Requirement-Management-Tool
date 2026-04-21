# 航司会员挑战横幅（`member-airline-challenge-banner`）

## 元信息

- **模块 slug**：`member-airline-challenge-banner`  
- **示例**：[`example.html`](example.html)  
- **依赖**：[`foundations/design-foundations.md`](../../../../../foundations/design-foundations.md)、[`components/platform/display/banner/spec.md`](../../../../../components/platform/display/banner/spec.md)（模式参考）  
- **最后同步**：2026-04-05  

---

## 用途

品牌区与列表区之间的 **运营横条**：**区块标题**（如「航司会员挑战」）+ **利益点文案**（如报名领券）+ **右侧/背景装饰图**（飞机、海报位）。可与平台 **banner** 共用圆角/阴影约定。

---

## DOM 与类名

- 根：**`.fdl-member-airline-banner`**  
- 文案区：**`.fdl-member-airline-banner__text`**  
- 标题：**`.fdl-member-airline-banner__title`**  
- 副文案：**`.fdl-member-airline-banner__desc`**  
- 图：**`.fdl-member-airline-banner__media`**（`img` 或背景图）

---

## Token

- 背景：渐变或 **`var(--color-surface)`** + 浅蓝/浅橙 tint（示例用浅渐变）  
- 标题：**`var(--color-text-primary)`**  
- 副文案：**`var(--color-text-secondary)`**  

---

## 变更记录

| 日期 | 说明 |
|------|------|
| 2026-04-05 | 初版（供稿无独立 HTML，示例为占位实现）。 |
