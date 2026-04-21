# 首页搜索框（Home Search）

## 元信息

- **slug**：`home-search`  
- **page_id**：`tabs.home`  
- **分类**：首页 Tab — 内容区模块（**702** 宽区内）  
- **依赖**：[`foundations/design-foundations.md`](../../../../../foundations/design-foundations.md)  
- **最后同步**：2026-04-05  

---

## 概述

**双层结构**：上层 **主搜索框**（**80** 高、**`3px solid var(--color-indigo-1)`** 描边、**`--radius-l`（24）** 圆角、左 **扫一扫**、中 **占位/输入文案**、右 **「搜索」实心钮**）；下层 **快捷标签** 横排（**48** 高胶囊、浅灰底、**24** 字 Regular **`--color-midgray`**），可横向滚动。

供稿 `search-container` / `search-box` → **`fdl-home-search`** / **`fdl-home-search__*`**。

---

## 视觉规范（@2x px）

| 项目 | 值 |
|------|-----|
| 容器 | 宽 **702**（对齐 page-frame 24 边距）；上内边距 **12**；**`gap: 18`**（框与标签行） |
| 搜索框 | **80** 高；内边距 **左 24 右 8**；内部 **`gap: 18`**；按钮 **104×63**、**`--radius-m`（18）** 与供稿一致可用 **18** |
| 搜索钮 | 底 **`--color-indigo-1`**，字 **`--color-white`**，**28** Medium |
| 占位文案 | **28** Medium **`--color-darkgray`** |
| 标签 | **`padding: 10px 18px`**；底 **`color-mix(in srgb, var(--color-darkgray) 6%, transparent)`**；圆角胶囊 **30px** |

---

## 结构与层次

```text
section.fdl-home-search
  ├── div.fdl-home-search__field（描边框体）
  │     ├── div.fdl-home-search__input-row
  │     │     ├── button.fdl-home-search__scan（扫一扫）
  │     │     └── div | input.fdl-home-search__query
  │     └── button.fdl-home-search__submit（搜索）
  └── div.fdl-home-search__tags（overflow-x: auto）
        └── button.fdl-home-search__tag × N
```

---

## 可访问性

- 扫一扫 / 搜索 / 标签：**`type="button"`** 或 **`aria-label`**。  
- **`:focus-visible`**：**`outline: 2px solid var(--color-indigo-1)`**。

---

## 产出物

- [`example.html`](example.html)  

---

## 变更记录

| 日期 | 说明 |
|------|------|
| 2026-04-05 | 初版。 |
