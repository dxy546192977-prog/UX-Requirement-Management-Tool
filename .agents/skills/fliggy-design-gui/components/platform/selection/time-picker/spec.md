# 时间选择（日历 Bottom Sheet）

## 元信息

- **slug**：`time-picker`  
- **分类**：平台通用 — **选择**（taxonomy **「时间选择」**；落地为 **日历日期/范围** 半屏浮层）  
- **依赖**：[`foundations/design-foundations.md`](../../../../foundations/design-foundations.md)；浮层框架对齐 [`feedback/sheet/spec.md`](../../feedback/sheet/spec.md)  
- **最后同步**：2026-04-05  

---

## 概述

**底出半屏日历**：遮罩 **`color-mix(in srgb, var(--color-darkgray) 70%, transparent)`**（与 **Sheet** 一致），面板 **高 85vh**、**顶 `var(--radius-l)`**、**`translateY` 入场**。结构：**顶栏**（标题 + 关闭）→ **星期行**（**`sticky; top: 0`**）→ **吸顶月份条**（**`sticky; top: 星期行高`**，文案随滚动切换）→ **多月网格**。日格 **120** 高 **`--radius-m`**，支持 **副文案 / 价格 / 角标**；**范围选择**：区间内 **`--color-brand-4`**，起止 **`--color-brand-1`** + 半宽 **`::before/::after`** 铺 **`brand-4`** 与区间衔接。

供稿 `panel-overlay` / `calendar-panel__*` / `calendar__*` → **`fdl-time-picker`** / **`fdl-time-picker__*`**；显隐 **`fdl-time-picker--visible`**。

---

## 使用场景

- 酒店入离、交通往返、活动预约、日程起止、报表筛日期。  
- **不宜**：仅需选「时间点」不含日期（另组件）；与 **Sheet** 内嵌非日历表单时拆清职责。

---

## 视觉规范（@2x px）

| 项目 | 值 |
|------|-----|
| 顶栏 | 高 **88**，**`border-bottom: 1px solid var(--color-bg)`**；标题 **36** Medium **`--color-darkgray`**；关闭 **48×48** 右 **24** |
| 星期行 | 高 **60**，**7 列 grid**，**`padding: 0 24`**，底 **`box-shadow`** 用 **`color-mix(darkgray 2%, transparent)`**；字 **26** **`--color-midgray`**；**`--weekend`** 用 **`--color-pay-1`** |
| 吸顶月份条 | **`top`** = 星期行高（**60**）；**`padding: 18px 0`**，**Fliggy Sans 102** **36** Regular，**`z-index: 9`**，浅阴影 token 化 |
| 月块 | **`padding: 0 24`**；月标题 **36** Fliggy Sans、**`padding: 40px 0 20px`** |
| 日网格 | **7 列**，**`gap: 6px 12px`** |
| 日格 | **120** 高，**`gap: 2`** 内堆叠；数字 **36** Fliggy Sans；**`--color-lightgray`** 辅文 **20**；价格 **20** **`--color-pay-1`**；角标 **18**、**`--color-brand-1`** 底、**`--color-darkgray`** 字、**`--radius-s`** |
| 禁用格 | **`opacity: 0.4`** **`pointer-events: none`** |
| 区间中 | 底 **`var(--color-brand-4)`** |
| 起/止 | 底 **`var(--color-brand-1)`**；**`::after`/`::before`** 宽 **50%** 高 **100%** 底 **`var(--color-brand-4)`** 做圆角视觉衔接 |
| 单日选中（无结束日） | 整格 **`var(--color-brand-1)`**（**`--selected`** 且非区间） |

---

## 结构与层次

```text
div.fdl-time-picker [+ --visible]
  └── div.fdl-time-picker__panel（role="dialog" aria-modal="true"）
        ├── header.fdl-time-picker__header
        │     ├── h2.fdl-time-picker__title
        │     └── button.fdl-time-picker__close
        └── div.fdl-time-picker__body
              ├── div.fdl-time-picker__weekdays
              │     └── div.fdl-time-picker__weekday [+ --weekend] ×7
              ├── div.fdl-time-picker__month-bar（吸顶当前月文案）
              ├── div.fdl-time-picker__months
              │     └── div.fdl-time-picker__month × N
              │           ├── div.fdl-time-picker__month-heading
              │           └── div.fdl-time-picker__grid
              │                 └── div.fdl-time-picker__cell [+ 状态修饰符]
              │                       ├── span.fdl-time-picker__cell-num
              │                       ├── span.fdl-time-picker__cell-label（可选）
              │                       ├── span.fdl-time-picker__cell-price（可选）
              │                       └── span.fdl-time-picker__tag（可选）
```

---

## 交互与逻辑（实现要点）

- **日期解析**：`YYYY-MM-DD` 须按 **本地日历** 解析（如 **`new Date(y, m-1, d)`**），避免 **`Date` 字符串时区偏移**。  
- **多月生成**：从当月起 **+0…+11 月** 用 **`Date(year, month + n, 1)`** 归一，**禁止** `getMonth() + i` 不处理跨年。  
- **吸顶月份文案**：滚动时取各 **`.fdl-time-picker__month`** 相对 **`__body`** 视位，**`monthRect.top <= bodyRect.top + weekdaysH + monthBarH`** 的 **最后一个** 为当前显示月（与供稿思路一致，**H 建议取 DOM 实测**）。  
- **选择**：第一次点设为 **start**，第二次 **≥ start** 为 **end**；再点重置；**早于 start** 可重定为 **start**（与供稿一致）。  
- **关闭**：点遮罩、关闭钮、**Escape**；**`aria-hidden`** 同步。

---

## 可访问性

- **`role="dialog"`**、**`aria-labelledby`** 指向标题；关闭钮 **`aria-label="关闭"`**。  
- 日格若可聚焦可增加 **`role="button"`** **`tabindex="0"`** 与 **Enter/Space**（生产建议）。  
- **`focus-visible`** 轮廓 **`--color-indigo-1`**。

---

## 产出物

- **spec.md**：本文件。  
- **example.html**：[`example.html`](example.html)  

---

## 变更记录

| 日期 | 说明 |
|------|------|
| 2026-04-05 | 初版：`calendar-panel*` → `fdl-time-picker*`；色/圆角 token；多月生成与日期解析修正；吸顶 H 可实测。 |
