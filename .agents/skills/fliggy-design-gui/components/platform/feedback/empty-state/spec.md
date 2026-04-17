# 空页面异常反馈（Empty / Status）

## 元信息

- **slug**：`empty-state`  
- **分类**：平台通用 — **反馈**（taxonomy **「空页面异常反馈」**）  
- **依赖**：[`foundations/design-foundations.md`](../../../../foundations/design-foundations.md)；**状态插图**为 **阿里 CDN** 官方空状态素材（示例 URL 固定 **476×372**）  
- **最后同步**：2026-04-05  

---

## 概述

**页面主区占位**：垂直居中块，**插图 → 标题 → 描述 → 0～2 个按钮**。插图 **476×372** **`object-fit: contain`**；标题 **30px** Medium **`--color-darkgray`**；描述 **24px** Regular **`--color-midgray`**（可省略）。按钮 **高 60** **`min-width: 180`** **`padding: 0 40`** 胶囊；**主**：**`--color-brand-1`** 底 + **`--color-darkgray`** 字；**次**：**`--color-white`** 底 + **`2px solid var(--color-auxiliary)`** + **`--color-midgray`** 字。整体 **`gap: 24`**，文案区 **`gap: 12`**，**`__actions`** 额外 **`margin-top: 12`**（与供稿一致）。

供稿 `status-feedback` / `status-feedback__*` → **`fdl-empty-state`** / **`fdl-empty-state__*`**。

---

## 使用场景

- 异常：繁忙、无网、加载失败、页面失效。  
- 空数据：无结果、列表空、收藏空。  
- 流程结果：支付/提交成功。  
- 权限：未登录、无权限。  

---

## 视觉规范（@2x px）

| 项目 | 值 |
|------|-----|
| 根 | **`display: flex`** **`flex-direction: column`** **`align-items: center`** **`text-align: center`** **`padding: 60px 20`** **`gap: 24`** |
| 插图 | **476×372** |
| 标题 | **30** **500** **1.4** |
| 描述 | **24** **400** **1.4** |
| 按钮行 | **`display: flex`** **`gap: 18`** **`margin-top: 12`** |
| 按钮 | **60** 高，**28** **500**，**`border-radius: 9999px`** |

---

## 结构与层次

```text
section | div.fdl-empty-state（role="region" aria-labelledby 可选）
  ├── img.fdl-empty-state__image
  ├── div.fdl-empty-state__content
  │     ├── h2.fdl-empty-state__title#…
  │     └── p.fdl-empty-state__description（可选）
  └── div.fdl-empty-state__actions（可选）
        └── button.fdl-empty-state__btn [+ --primary | --secondary] ×0～2
```

**数据驱动**：由配置对象渲染插图 URL、标题、描述、按钮数组；无按钮时不输出 **`__actions`**。

---

## 可访问性

- 插图 **`alt`** 应概括状态（可用标题文案或更具体说明）。  
- 按钮 **`type="button"`**（非提交）；**`focus-visible`** 轮廓 **`--color-indigo-1`**。  
- 整块可包 **`aria-labelledby`** 指向标题 id。

---

## 产出物

- **spec.md**：本文件。  
- **example.html**：[`example.html`](example.html)  

---

## 变更记录

| 日期 | 说明 |
|------|------|
| 2026-04-05 | 初版：`status-feedback*` → `fdl-empty-state*`；色与边框 token 化；五态数据驱动示例（gw.alicdn 插图）。 |
