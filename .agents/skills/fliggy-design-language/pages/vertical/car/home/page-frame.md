# 安心租首页框架（`vertical.car.home`）

## 元信息

- **page_id**：`vertical.car.home`  
- **设计基准**：**750px 宽（@2x）**；`viewport` **`width=750, user-scalable=no`**  
- **整页高度（示意）**：**2763px**（列表区可随内容增高，`min-height` 以设计稿为准）  
- **依赖**：[`foundations/design-foundations.md`](../../../foundations/design-foundations.md)  
- **框架细则**：[`design-framework-components.md`](design-framework-components.md)  
- **最后同步**：2026-04-05  

---

## 布局结构（五层固定顺序）

```text
顶部氛围（750×267，最底层）
  ↓ 主内容流 702px，margin-top: -41px 与头图压接
搜索模块（702×865，大白卡，2-1～2-8）
  ↓ gap 18px
营销模块（702×235，领券）
  ↓ gap 18px
列表模块（702，白底圆角容器：标题 + 城市 Tab + 视频组 + 车辆卡）
  ↓
底部导航（750×150，absolute 贴底，独立于白底列表）
```

### 关键尺寸

| 区域 | 宽 | 高（示意） |
|------|-----|------------|
| 画布 | 750px | min-height 2763px（可随列表增高） |
| 主内容流 | 702px | — |
| 页面背景 | — | `var(--az-page-bg)` `#F2F3F5` |

---

## 根节点类名（整页拼装）

- **`.az-page`**：相对定位、750 宽、灰底、底栏预留 `padding-bottom` 或与 absolute 底栏配合  
- **`.az-hero-slot`**：`z-index: 1`，内放 **`.az-hero`** + 头图切片  
- **`.az-main-stack`**：`z-index: 2`，`width: 702px`，`margin: -41px auto 0`，`flex-direction: column`，`gap: 18px`  
- **`.az-bottom-slot`**：`position: absolute; bottom: 0; left: 0; width: 750px; z-index: 3`  

---

## 产出

- [`manifest.md`](manifest.md)  
- 各模块 `modules/<slug>/spec.md` + `example.html`  
- [`example-full.html`](example-full.html) 整页串联  

---

## 变更记录

| 日期 | 说明 |
|------|------|
| 2026-04-05 | 初版，对齐安心租首页供稿骨架。 |
