# 心智类标签（利益点标签）

## 元信息

- **slug**：`tag-mental`  
- **分类**：平台通用 — **标签**（taxonomy **「心智类」**；利益点 / 卖点拼接条）  
- **依赖**：[`foundations/design-foundations.md`](../../../../foundations/design-foundations.md)（`Fliggy Fonts`、`--color-*`）  
- **最后同步**：2026-04-05  

---

## 概述

**主标签**（Fliggy Fonts 斜体）与可选 **描述区**（PingFang 正文）横向拼接，**28px** 高、**4px** 圆角；主区与描述区 **背景/字色** 通过 **组件局部 CSS 变量** 配置，默认对齐 FDL **黄底深字 + 灰底中灰字**。

供稿类名 `feature-tag` / `feature-tag__*` 已统一为 **`fdl-tag-mental`** / **`fdl-tag-mental__main`** / **`fdl-tag-mental__description`**。

---

## 结构

```text
span.fdl-tag-mental（或 div；inline-flex）
  ├── span.fdl-tag-mental__main      — 主利益点（Fliggy Fonts Italic）
  └── span.fdl-tag-mental__description（可选）
```

仅主标签时，`__main` **四角 4px** 圆角；带描述时 **`__main` 左圆角、`__description` 右圆角**（与供稿一致）。

---

## 可配置变量（组件根上定义）

| 变量 | 默认（建议绑定 token） | 说明 |
|------|-------------------------|------|
| `--main-bg-color` | `var(--color-brand-1)` | 主标签背景 |
| `--main-text-color` | `var(--color-darkgray)` | 主标签字色 |
| `--desc-bg-color` | `var(--color-bg)` | 描述区背景 |
| `--desc-text-color` | `var(--color-midgray)` | 描述区字色 |

业务主题（蓝/红/绿等）通过 **行内 style** 或 **额外 class** 覆盖上述四元即可；**非 foundations 色** 仅允许出现在 **主题覆盖层**（示例中「营销绿」为演示用）。

---

## 视觉规范（@2x px）

| 项目 | 值 |
|------|-----|
| 容器高度 | **28** |
| 主标签 | **22px**，Fliggy Fonts，`font-weight: 500`，`font-style: italic`，`line-height: 1`，水平 **padding 6** |
| 描述 | **20px**，PingFang Regular，`line-height: 1.4`，水平 **padding 6**，`white-space: nowrap` |
| 圆角 | **4**（小组件专用，**不**使用 `--radius-s` 6px，以免与供稿不一致） |
| 对齐 | `inline-flex` + `align-items: center` |

---

## 无障碍（建议）

- 装饰性重复时可对整段设 **`role="img"` + `aria-label`**，或由父级文案承担语义。  
- 若可点击，应改为 **`button`** 或 **`a`** 并补全焦点样式（本 spec 以静态标签为主）。  

---

## 产出物

- **spec.md**：本文件。  
- **example.html**：[`example.html`](example.html)  

---

## 变更记录

| 日期 | 说明 |
|------|------|
| 2026-04-05 | 供稿落地；`feature-tag` → `fdl-tag-mental`；默认四色 token 化；保留变量名与主题示例；viewport 750。 |
