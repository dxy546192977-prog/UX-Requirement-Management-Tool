# 浮动按钮（FAB）

## 元信息

- **slug**：`fab`  
- **分类**：平台通用 — **按钮**（taxonomy **「浮动按钮」**）  
- **依赖**：[`foundations/design-foundations.md`](../../../../foundations/design-foundations.md)  
- **最后同步**：2026-04-05  

---

## 概述

**圆形白底**、**drop-shadow** 贴合轮廓的悬浮主操作；常 **固定于视口一角**（多为右下），滚动不随内容离开。**仅图标**（48×48 图标区）与 **图标 + 短文案**（`--with-text`，42×42 图标 + 18px 字）两变体。悬停 **上移 4px** 且 **阴影加深**；**`:active`** 略回弹；**禁用** 半透 + 弱阴影 + 无交互。

供稿类名 `fab` / `fab__*` / `fab--with-text` 已统一为 **`fdl-fab`** / **`fdl-fab__*`** / **`fdl-fab--with-text`**。

---

## 结构

```text
button.fdl-fab（或 a.fdl-fab；建议 type="button"）
  ├── span.fdl-fab__icon（内嵌可替换 SVG，stroke 推荐 currentColor）
  └── span.fdl-fab__text（仅 --with-text 时出现）
```

**定位**：组件 **本体** 可为 `position: fixed; right: …; bottom: …`，或由外层固定容器包裹（多 FAB 纵向排列时）。示例采用 **固定外层 + 多个按钮**。

---

## 视觉规范（@2x px）

| 项目 | 仅图标 | 带文字 `fdl-fab--with-text` |
|------|--------|-------------------------------|
| 外径 | **86×86** 圆 | 同左 |
| 背景 | `var(--color-white)` | 同左 |
| 内边距 | 0 | 垂直 **9**，`flex-direction: column`，`gap: 2` |
| 图标区 | **48×48** | **42×42** |
| 文案 | — | **18px**，行高 **1.4**，色 `var(--color-darkgray)`（供稿纯黑已统一为 FDL 主字色） |

**阴影（token 化）**

- 默认：`filter: drop-shadow(0 6px 20px color-mix(in srgb, var(--color-darkgray) 10%, transparent))`  
- 悬停：`translateY(-4px)` + `drop-shadow(0 10px 25px color-mix(..., 15%, transparent))`  
- 按下：`translateY(-1px)`（可与悬停叠加以防无 hover 环境，由实现取舍）  
- 禁用：`opacity: 0.6`，`filter: drop-shadow(0 6px 20px color-mix(..., 5%, transparent))`，`cursor: not-allowed`，`pointer-events: none`  

**过渡**：`transform`、`filter` 约 **0.2s ease-out**。

---

## 无障碍（建议）

- **仅图标**：`aria-label` 必填（如「返回顶部」）。  
- **带文字**：可见文案足够时可不重复 `aria-label`。  
- **`:focus-visible`**：加 `outline`（示例使用 `var(--color-indigo-1)`）。  
- 禁用使用原生 **`disabled`**（`button`）或 **`aria-disabled="true"`**（`a` 时需配合脚本禁止默认行为）。  

---

## 产出物

- **spec.md**：本文件。  
- **example.html**：[`example.html`](example.html)  

---

## 变更记录

| 日期 | 说明 |
|------|------|
| 2026-04-05 | 供稿落地；`fab` → `fdl-fab`；白底/字色/阴影 color-mix；SVG currentColor；viewport 750；仅图标 aria-label。 |
