# 常用按钮

## 元信息

- **slug**：`button`  
- **分类**：平台通用 — **按钮**（taxonomy **「常用按钮」**）  
- **依赖**：[`foundations/design-foundations.md`](../../../../foundations/design-foundations.md)  
- **最后同步**：2026-04-05  

---

## 概述

**胶囊形**（全圆角药丸）基础按钮：**尺寸**（大 / 中 / 小 / 特小）× **样式**（主黄、次蓝、危险橙红、浅灰、白底、描边）二维组合。实心样式悬停 **`brightness(0.95)`**；**描边** 悬停铺 **`--color-label`** 底并取消亮度滤镜。**禁用**：**`opacity: 0.5`**、`cursor: not-allowed`、无悬停滤镜。

供稿类名 `btn` / `btn--*` 已统一为 **`fdl-button`** / **`fdl-button--*`**。

---

## 结构

```text
button.fdl-button（或 a.fdl-button，链接态需保留键盘焦点样式）
  + 尺寸：--large | --medium | --small | --extra-small
  + 样式：--primary | --secondary | --danger | --light | --white | --outline
```

- 必须 **同时** 选 **一个尺寸** + **一个样式**（示例矩阵如此；业务可封装预设）。  
- 使用 `<button type="button">`；表单提交用 `type="submit"` 时在 spec 允许范围内继承同款视觉。  
- **圆角**：供稿写死 `42px`（对应大号半高）；**全尺寸** 统一为 **`border-radius: 9999px`** 以保证任意高度下均为标准胶囊（与 foundations「专用圆角在组件内写死」一致）。

---

## 尺寸（@2x px）

| 修饰符 | 高度 | 字号 |
|--------|------|------|
| `fdl-button--large` | 84 | 30 |
| `fdl-button--medium` | 72 | 30 |
| `fdl-button--small` | 60 | 28 |
| `fdl-button--extra-small` | 48 | 24 |

**共用**：`padding: 0 30px`；`line-height: 1.4`；`font-weight: 500`；`border: 2px solid transparent`（为描边与布局对齐预留；outline 态改 `border-color`）。

---

## 样式（颜色 token）

| 修饰符 | 背景 | 文字 | 边框 |
|--------|------|------|------|
| `--primary` | `var(--color-brand-1)` | `var(--color-darkgray)` | transparent |
| `--secondary` | `var(--color-indigo-1)` | `var(--color-white)` | transparent |
| `--danger` | `var(--color-pay-1)` | `var(--color-white)` | transparent |
| `--light` | `var(--color-label)` | `var(--color-midgray)` | transparent |
| `--white` | `var(--color-white)` | `var(--color-midgray)` | transparent |
| `--outline` | transparent | `var(--color-midgray)` | `var(--color-auxiliary)` |

---

## 交互与无障碍

- **悬停**：非 outline 使用 `filter: brightness(0.95)`；**outline** 使用 `background: var(--color-label)` 且 **`filter: none`**。  
- **禁用**：`:disabled` → `opacity: 0.5`、`cursor: not-allowed`、`filter: none`；**勿**再响应 `:hover` 变暗（依赖 `filter: none` + 无亮度变化）。  
- **焦点**：建议 `:focus-visible { outline: 2px solid var(--color-indigo-1); outline-offset: 2px; }`（示例已含）。  
- **过渡**：`transition: filter 0.2s ease-in-out, background-color 0.2s ease-in-out, opacity 0.2s ease-in-out, border-color 0.2s ease-in-out`（可按需收窄属性）。  

---

## 产出物

- **spec.md**：本文件。  
- **example.html**：[`example.html`](example.html)  

---

## 变更记录

| 日期 | 说明 |
|------|------|
| 2026-04-05 | 供稿落地；`btn` → `fdl-button`；色与灰阶 token 化；胶囊 `9999px`；viewport 750；禁用/描边悬停与 focus-visible。 |
