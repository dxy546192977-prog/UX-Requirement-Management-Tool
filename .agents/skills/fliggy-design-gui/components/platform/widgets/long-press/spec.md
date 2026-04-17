# 上下文气泡菜单（长按 / 更多）

## 元信息

- **slug**：`long-press`  
- **分类**：平台通用 — 小组件（taxonomy **「长按」**；交互上为 **带箭头的 Popover 操作菜单**）  
- **依赖**：[`foundations/design-foundations.md`](../../../../foundations/design-foundations.md)  
- **最后同步**：2026-04-05  

---

## 概述

由 **长按**、**更多（⋯）** 等触发的 **浮动气泡菜单**：顶部 **三角箭头** 指向锚点；主体为 **半透明白 + 毛玻璃**，内为 **可配置** 的操作列表（图标 + 文案）。用于收纳复制、截图、分享、删除等次要操作。

供稿类名 `popover-menu` / `popover-menu__*` 已统一为 **`fdl-long-press`** 及下表元素名。

---

## 结构

```text
.fdl-long-press                              — 根（position: relative；整体 drop-shadow）
  ├── .fdl-long-press__arrow                 — 顶部三角（与主体同色）
  └── .fdl-long-press__body                  — 圆角面板（backdrop-filter）
        └── ul.fdl-long-press__list         — role="menu"
              └── li[role="none"]
                    └── button.fdl-long-press__item   — role="menuitem"
                          ├── .fdl-long-press__icon   — 左，36×36，svg 用 currentColor
                          └── .fdl-long-press__text   — 文案
```

**布局约定**

- 默认 **箭头水平居中**（`left: 50%` + `translateX(-50%)`）。锚点不在中时，可通过 **行内 style** 或后续修饰符覆盖 `left` / `transform`，需在实现层与触发区域对齐。  
- 列表项 **全宽可点**；项间 **1px 分割线**（`li:not(:last-child)` 内按钮加 `border-bottom`，避免仅用 `button:last-of-type` 失效）。

---

## 视觉规范（@2x px）

| 项目 | 值 |
|------|-----|
| 面板宽度 | **268**（固定，或按业务在 spec 允许范围内扩展） |
| 面板圆角 | `var(--radius-l)`（24） |
| 面板与箭头填充 | `color-mix(in srgb, var(--color-white) 96%, transparent)`（与供稿 0.96 白一致；箭头 `border-bottom-color` 须与主体相同） |
| 毛玻璃 | `backdrop-filter: blur(10px)`（加 `-webkit-` 前缀） |
| 整体阴影 | `filter: drop-shadow(0 4px 18px color-mix(in srgb, var(--color-darkgray) 15%, transparent))` |
| 行内边距 | **18** 垂直、**24** 水平；图标与文案 **gap: 18** |
| 图标区 | **36×36**，内放约 **30** 视口 SVG |
| 文案 | **30px**，行高 **1.4**，字重 **Medium (500)**，色 `var(--color-darkgray)` |
| 分割线 | `1px solid color-mix(in srgb, var(--color-darkgray) 6%, transparent)` |
| 悬停 / 焦点 / 按压高亮 | 背景 `color-mix(in srgb, var(--color-darkgray) 4%, transparent)`（与供稿 hover 接近） |

**箭头几何**

- 朝上指向锚点：`top: -12px`；三角 `border-left/right: 13px solid transparent`，`border-bottom: 12px solid <与主体同色>`。

---

## 无障碍（建议）

- 根容器可包在带 `aria-expanded` 的触发器外，或由页面脚本管理焦点落入第一项。  
- `ul`：`role="menu"` + `aria-label`（如「更多操作」）。  
- 每项：`role="menuitem"`，使用 **`button type="button"`** 便于键盘与读屏。  
- 支持 `:focus-visible` 与触摸 `:active` 高亮（与 hover 同级样式）。  

---

## 产出物

- **spec.md**：本文件。  
- **example.html**：[`example.html`](example.html)  

---

## 变更记录

| 日期 | 说明 |
|------|------|
| 2026-04-05 | 供稿落地；`popover-menu` → `fdl-long-press`；圆角/字色/半透明与阴影用 `color-mix` + token；列表改为 `button` menuitem；viewport 750。 |
