# 轮播条（分页指示器）

## 元信息

- **slug**：`carousel-bar`  
- **分类**：平台通用 — 小组件（taxonomy **「轮播条」**；分页状态指示，非可滑动轨道本体）  
- **依赖**：[`foundations/design-foundations.md`](../../../../foundations/design-foundations.md)  
- **最后同步**：2026-04-05  

---

## 概述

用于表达 **轮播 / 横滑卡片 / Banner** 等的 **当前页位置与总页数**：横向短条或圆点，激活项 **品牌黄** 高亮，未激活 **弱化半透明**。页数 **≤3** 时 **全部为等长短条**；**>3** 时 **当前页一条高亮短条**，其余为 **小点**，避免拥挤。

供稿类名 `carousel-indicator` / `carousel-indicator__item--*` / `is-active` 已统一为 **`fdl-carousel-bar`**、**`fdl-carousel-bar__segment--bar|--dot`**、**`fdl-carousel-bar__segment--active`**。

---

## 结构

```text
.fdl-carousel-bar                           — 横向 flex 容器（建议 role="group" + aria-label）
  └── span.fdl-carousel-bar__segment        — 单段（bar 或 dot）
        + .fdl-carousel-bar__segment--bar   — 短条（2～3 页时每一页一条）
        + .fdl-carousel-bar__segment--dot   — 小点（>3 页时非当前页）
        + .fdl-carousel-bar__segment--active — 当前页（唯一）
```

**修饰符（容器）**

- `fdl-carousel-bar--on-light`：叠在 **浅色底**（如白卡片）上时使用；未激活色改为 **深灰半透明**，避免白条在浅底不可见。默认（不加此类）按 **深底** 适配（与供稿一致：半透明白条）。

---

## 视觉规范（@2x px）

| 项目 | 值 |
|------|-----|
| 行高 | **6**（段高度） |
| 短条 | **24 × 6**，`flex: none` |
| 圆点 | **6 × 6**，`flex: none` |
| 段间距 | **6**（`gap`） |
| 圆角 | **3px 0 3px 0**（对角圆角，与供稿一致） |

| 状态 | 默认（深底） | `fdl-carousel-bar--on-light` |
|------|----------------|------------------------------|
| 激活 | `background: var(--color-brand-1)` | 同左 |
| 未激活 | `color-mix(in srgb, var(--color-white) 80%, transparent)` | `color-mix(in srgb, var(--color-darkgray) 22%, transparent)`（可按验收微调比例） |

**版式逻辑**

- **2 页**：2 条 `--bar`，一条 `--active`。  
- **3 页**：3 条 `--bar`，一条 `--active`。  
- **>3 页**：1 条 `--bar` + `--active`（表示当前），其余为 `--dot`；点个数 = 总页数 − 1（与供稿一致：当前条 + 后续点表示剩余页）。若产品需「总点数 = 总页数」，由业务在数据层映射为全点或省略号策略，**本组件只规范视觉形态**。

---

## 无障碍（建议）

- 容器：`role="group"`（或 `navigation`）+ 简洁 `aria-label`（如「轮播，3 页，当前第 1 页」）；页码变化时更新文案或配合 `aria-live="polite"`。  
- 各 `span` 为纯装饰时设 `aria-hidden="true"`，避免读屏重复朗读。  

---

## 产出物

- **spec.md**：本文件。  
- **example.html**：[`example.html`](example.html)  

---

## 变更记录

| 日期 | 说明 |
|------|------|
| 2026-04-05 | 供稿落地；`carousel-indicator` → `fdl-carousel-bar`；激活色 token 化；未激活用 `color-mix` + 白/深灰；增补浅底修饰符。 |
