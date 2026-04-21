# 时间轴（进度栏）

## 元信息

- **slug**：`timeline`  
- **分类**：平台通用 — 小组件（taxonomy **「时间轴」**；纵向流程 / 订单与售后状态）  
- **依赖**：[`foundations/design-foundations.md`](../../../../foundations/design-foundations.md)  
- **最后同步**：2026-04-05  

---

## 概述

在 **白底圆角卡片** 内，以 **左侧节点 + 竖线**、**右侧标题与辅助说明** 展示多阶段流程：**已完成**（靛蓝实心 + 对勾）、**进行中**（靛蓝实心圆点）、**待处理**（灰描边空心圆）。连线在 **当前步之后** 可使用 **向下渐隐至白**，表达流程尚未结束。

供稿类名 `timeline-card` / `timeline` / `timeline-step` / `timeline-step__*` 已统一为 **`fdl-timeline`** 与 **`fdl-timeline__*`**（见下表）。

---

## 结构

```text
section.fdl-timeline（或外层由页面包卡片时仅保留内层）
  └── ol.fdl-timeline__steps
        └── li.fdl-timeline__step（进行中项可加 aria-current="step"）
              ├── .fdl-timeline__axis（aria-hidden="true"）
              │     ├── .fdl-timeline__node + --done | --current | --pending
              │     └── .fdl-timeline__line（可选 --fade；末步无连线）
              └── .fdl-timeline__content
                    ├── p.fdl-timeline__title（可选 --active）
                    └── p.fdl-timeline__meta（可选）
```

**节点修饰符**

- `fdl-timeline__node--done`：24px 圆，`color-mix` 靛蓝约 70% 透明度 + 白色对勾（`::after` 边框模拟）。  
- `fdl-timeline__node--current`：18px 实心圆，`var(--color-indigo-1)`。  
- `fdl-timeline__node--pending`：18px 圆，`border: 2px solid var(--color-auxiliary)`，底 `var(--color-white)`。  

**连线修饰符**

- 默认：`2px` 宽，`var(--color-indigo-4)`（供稿浅连线 `#e1e1ff` 与 token `#ebebff` 略差，**以 foundations 为准**）。  
- `fdl-timeline__line--fade`：自上而下的线性渐变，底部落入 `var(--color-white)`（与供稿 59.89% 断点一致可保留）。  

**最后一项**：隐藏其 **下垂连线**（`display: none`）；最后一项 **content** 无 `padding-bottom`。

---

## 视觉规范（@2x px）

| 项目 | 值 |
|------|-----|
| 卡片宽度 | **714**（`max-width: 100%` 适配窄屏） |
| 卡片圆角 | `var(--radius-m)`（12） |
| 卡片内边距 | **30 32 30 33**（上右下左，与供稿一致） |
| 单列网格 | `grid-template-columns: 30px 1fr`，列间距 **15** |
| 节点列宽 | **30**；节点容器 **30×30**，`margin-top: 6px` |
| 连线 | 宽 **2**，`margin-top: 6px`，`flex: 1`，`min-height: 48` |
| 内容区 | 非末步 `padding-bottom: 28` |
| 标题 | **28px**，行高 **1.4**；默认 `var(--color-lightgray)` + Regular；**当前步** `--active`：`var(--color-darkgray)` + Medium (500) |
| 辅助文案 | **24px**，`var(--color-lightgray)`，`margin-top: 12` |

---

## 无障碍（建议）

- 使用 **`ol` / `li`** 表达顺序；当前步骤所在 **`li`** 设 **`aria-current="step"`**。  
- `section`（或卡片根）设 **`aria-label`**（如「处理进度」）。  
- 左侧轨道 **`aria-hidden="true"`**（纯装饰 + 状态已由文案表达）。  

---

## 产出物

- **spec.md**：本文件。  
- **example.html**：[`example.html`](example.html)  

---

## 变更记录

| 日期 | 说明 |
|------|------|
| 2026-04-05 | 供稿落地；`timeline-*` → `fdl-timeline`；靛蓝/灰/白与圆角 token 化；`ol`+`aria-current`；viewport 750。 |
