# 会员 Tab — manifest（`tabs.member`）

## 元信息

- **page_id**：`tabs.member`  
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
components/platform/navigation/navbar/spec.md
components/platform/navigation/tabbar/spec.md
components/platform/widgets/price/spec.md
components/platform/display/banner/spec.md
```

### 本 Tab 模块

```text
pages/tabs/member/modules/member-level-card/spec.md
pages/tabs/member/modules/member-brand-benefits/spec.md
pages/tabs/member/modules/member-airline-challenge-banner/spec.md
pages/tabs/member/modules/member-hotel-feeds/spec.md
```

---

## 备注

- **底栏**：`fdl-tabbar` **会员项 `aria-current="page"`**，首页非当前。  
- **酒店列表价**：数字 **Fliggy Sans 102**（与 `price` spec 一致）。

---

## 变更记录

| 日期 | 说明 |
|------|------|
| 2026-04-05 | 初版：四模块 + navbar/tabbar/price/banner。 |
