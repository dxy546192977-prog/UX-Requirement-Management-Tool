# 我的 Tab 页面框架（`tabs.mine`）

## 元信息

- **page_id**：`tabs.mine`  
- **依赖**：[`foundations/design-foundations.md`](../../../foundations/design-foundations.md)；底栏 [`components/platform/navigation/tabbar/spec.md`](../../../components/platform/navigation/tabbar/spec.md)  
- **最后同步**：2026-04-05  

---

## 布局模式

| 区域 | 说明 |
|------|------|
| **页背景** | 宽 **750px**；**径向渐变** `radial-gradient(248.04% 400.81% at 100% 0%, #FFFFFF 0%, #E4E4FD 50.35%)` 铺首屏至头部与工具栏衔接区；**Feeds 区**主体底 **`#F2F3F5`**（与工具栏下半渐变一致）。 |
| **主滚动区** | **整页纵向滚动**；底部预留 **吸底 TabBar 高度 + 安全区**（约 **166px+**，见 tabbar spec），避免内容被遮挡。 |
| **底栏** | **`fdl-tabbar`**，**当前高亮 = 我的**（激活字色 **`#6666FF`**，与供稿一致）。 |

---

## 滚动区内模块顺序（自上而下）

1. **个人中心头部** — `modules/mine-profile-header/`（用户信息 + 紫色会员卡 + 省钱卡；左右 **18px**）  
2. **工具栏** — `modules/mine-toolbar/`（三行 × 5 入口 + 第三行轮播指示器）  
3. **Feeds 信息流** — `modules/mine-feeds/`（顶 **60px** 白→浅灰过渡 + **双列** 瀑布；左列顶 **轮播大卡**）  

**不单独建底栏模块**：实现引用平台 **tabbar**。

---

## 层级（z-index 摘要）

- **吸底 TabBar**：最高（如 **1000**），`position: fixed` 居中 **750** 宽条。  
- **头部**：会员浮层（如品牌直通条）、省钱卡等按局部 **2～10** 叠放。  
- **工具栏第三行**：指示器 **5**（供稿）。  

---

## 产出物索引

| 类型 | 路径 |
|------|------|
| 闭包 | [`manifest.md`](manifest.md) |
| 模块 | `mine-profile-header`、`mine-toolbar`、`mine-feeds` |

---

## 变更记录

| 日期 | 说明 |
|------|------|
| 2026-04-05 | 初版。 |
