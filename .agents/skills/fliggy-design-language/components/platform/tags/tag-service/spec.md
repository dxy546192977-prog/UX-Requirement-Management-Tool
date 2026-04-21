# 服务类标签（信息标签）

## 元信息

- **slug**：`tag-service`  
- **分类**：平台通用 — **标签**（taxonomy **「服务类」**）  
- **依赖**：[`foundations/design-foundations.md`](../../../../foundations/design-foundations.md)  
- **最后同步**：2026-04-05  

---

## 概述

**非交互** 的轻量标签：**独立** 时为带边框小圆角文案；**带描述** 时主区与描述区拼接，主区可有 **浅底**，中间 **虚线竖分割**。颜色由组件 **CSS 变量**（`--border-color` / `--text-color` / `--bg-color`）驱动，预设 **中性 / 强调(靛) / 正向(青) / 保障(棕)** 四主题。

> **与 `widgets/info-tag` 的区分**  
> 平台另有 **`info-tag`**（小组件，taxonomy「气泡」改版）。本组件 slug 为 **`tag-service`**，类名 **`fdl-tag-service`**；供稿 `info-tag` **不得** 与小组件混用同名。

供稿 `info-tag` / `info-tag__*` / `info-tag--*` → **`fdl-tag-service`** 系。

---

## 结构

```text
span.fdl-tag-service（或 div）
  — 独立：根上直接为文案节点，或包一层 span.fdl-tag-service__label（若需）
  — 带描述：根加 .fdl-tag-service--with-description
      ├── span.fdl-tag-service__main
      └── span.fdl-tag-service__description
```

**修饰符**

- **主题**：`fdl-tag-service--neutral`（默认）、`--primary`、`--positive`、`--guarantee`  
- **结构**：`fdl-tag-service--with-description`（与主题类 **可叠加**）

---

## 视觉规范（@2x px）

| 项目 | 值 |
|------|-----|
| 高度 | **28** |
| 字号 | **20**，Regular，`line-height: 1.4`，`white-space: nowrap` |
| 圆角 | **4**（小组件级，与 `tag-mental` 一致策略） |
| 内边距 | 独立根：**0 6**；拼接时 **`__main` / `__description` 各 0 6** |
| 独立态 | `border: 1px solid var(--border-color)`，`background: var(--bg-color)`（默认透明） |
| 拼接态根 | 自身 **无边框、透明底、padding 0**，由子块画边 |
| `__main` | 左圆角 **4 0 0 4**，**无右边框**（与描述区合一） |
| `__description` | 底 **`var(--color-white)`**，右圆角 **0 4 4 0**，**`border-left: 1px dashed`** 分割线（色用 **`var(--color-indigo-4)`** 近似供稿 `#EAEAF6`） |
| 拼接 + primary | `__main` 底 **`color-mix(in srgb, var(--color-indigo-1) 8%, transparent)`**（同供稿 8% 靛思路） |

**主题 token 化（默认变量）**

| 主题 | `--text-color` | `--border-color`（字色约 50% 透明） | `--bg-color`（独立） |
|------|----------------|--------------------------------------|----------------------|
| neutral | `var(--color-midgray)` | `color-mix(in srgb, var(--color-midgray) 50%, transparent)` | transparent |
| primary | `var(--color-indigo-1)` | `color-mix(in srgb, var(--color-indigo-1) 50%, transparent)` | transparent |
| positive | `var(--color-green-0)` | `color-mix(in srgb, var(--color-green-0) 50%, transparent)` | transparent |
| guarantee | `var(--color-safeguard-5)` | `color-mix(in srgb, var(--color-safeguard-5) 50%, transparent)` | transparent |

**拼接态补充**：`positive` / `guarantee` 的 `__main` 浅底分别为 **`color-mix(..., green-0 8%, transparent)`**、**`color-mix(..., safeguard-5 8%, transparent)`**，与 primary 规则对齐。  
**保障字色**：供稿 **#805540** 较 **`--color-safeguard-5`** 更浅；落地以 **token** 为准，若视觉需更浅可在业务层覆盖 `--text-color`。

---

## 无障碍（建议）

- 静态信息：`span` 即可；整段语义可由父级标题承担。  
- 若可复制或跳转，应改为 **`button`/`a`** 并补 **`focus-visible`**。  

---

## 产出物

- **spec.md**：本文件。  
- **example.html**：[`example.html`](example.html)  

---

## 变更记录

| 日期 | 说明 |
|------|------|
| 2026-04-05 | 供稿落地；`info-tag` → `fdl-tag-service`；色与边框 color-mix token 化；与 `widgets/info-tag` 区分说明；viewport 750。 |
