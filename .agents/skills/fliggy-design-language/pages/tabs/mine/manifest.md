# 我的 Tab — manifest（`tabs.mine`）

## 元信息

- **page_id**：`tabs.mine`  
- **最后同步**：2026-04-05  

---

## 允许的 spec 路径（闭包）

外加 [`page-frame.md`](page-frame.md)。

### 基础

```text
foundations/design-foundations.md
foundations/image-library.md
```

### 平台组件

```text
components/platform/navigation/tabbar/spec.md
components/platform/widgets/price/spec.md
components/platform/widgets/carousel-bar/spec.md
```

### 本 Tab 模块

```text
pages/tabs/mine/modules/mine-profile-header/spec.md
pages/tabs/mine/modules/mine-toolbar/spec.md
pages/tabs/mine/modules/mine-feeds/spec.md
```

---

## 备注

- **个人中心**无独立顶栏 Navbar 时，状态栏/安全区由 **原生壳** 或 **头部模块内边距** 承担；若产品改为统一 `fdl-navbar`，再在 manifest 中增补 **`navbar`**。  
- Feeds 价格数字：**Fliggy Sans 102**，色 **`var(--color-pay-1)`**（`#FF5533`）。  

---

## 变更记录

| 日期 | 说明 |
|------|------|
| 2026-04-05 | 初版。 |
