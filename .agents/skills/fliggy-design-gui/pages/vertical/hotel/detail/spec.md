# 酒店详情（`vertical.hotel.detail`）— 页面结构

## 元信息

- **page_id**：`vertical.hotel.detail`（与 [docs/page-index.md](../../../docs/page-index.md) 一致时引用）  
- **整页实现**：[example.html](example.html)（**单文件** HTML+CSS+脚本；**唯一**预览入口）  
- **依赖**：[foundations/design-foundations.md](../../../foundations/design-foundations.md)；配图见 [foundations/image-library.md](../../../foundations/image-library.md)  
- **Skill 编排入口**：[SKILL.md](../../../../SKILL.md)  
- **最后同步**：2026-04-12  

---

## 一、视口与滚动

- **viewport**：`width=750, user-scalable=no, viewport-fit=cover`  
- **单列**：最大宽 **750px** 居中；**无** 固定全局顶导航、**无** 主 Tab 底栏。  
- **越界滚动**：整页 `overscroll-behavior` + 触摸拦截逻辑见 [example.html](example.html) 底部脚本。  

---

## 二、内容结构（产品语义）

1. **主内容流**：媒体 → 信息 → 会员 → 筛选（常规态）→ 置顶 Rate → Rate 卡片 → 店铺 → 评价 → 亮点 → 设施 → 周边 → 政策说明 → 推荐房型 → 推荐列表。  
2. **筛选常规态**：正文内 **`.hds-filter-flow`**，位于会员卡之后、置顶 Rate 之前。  
3. **筛选吸顶态**：**`.sticky-filter-layer`（fixed）** 内 **`.hds-filter-sticky`**；与主文档滚动协同，逻辑见页内脚本。  

各区块根类名为 **`.hds-*`**（如 `hds-info`、`hds-media`），与模块内 `.viewport` / `.canvas` 等组合使用。

---

## 三、块间距（设计稿 px，随 `--page-scale`）

| 关系 | 间距 |
|------|------|
| 媒体 ↔ 信息 | **-24**（叠压） |
| 筛选 ↔ 置顶 Rate | **-6** |
| 推荐房型 ↔ 推荐列表 | **0** |
| 其余相邻区块 | **18** |

---

## 四、文件体积说明

`example.html` 体积较大（量级 **数 MB**）时，通常因为供稿/导出时在 **CSS `background-image` 或 `<img src>`** 中内嵌了大量 **`data:image/...;base64,...`** 栅格图（本页曾统计约 **60 段**、合计 **约 2.5MB+** 的 Base64 文本，占文件绝大部分）。**字体**已改为外链 `Fliggy Sans 102`（CDN），不再内嵌整颗 TTF。  

若要显著瘦身：将大图改为 **`https://gw.alicdn.com/...` 等 URL 引用**，避免 Base64 落盘。

---

## 五、本地预览

直接打开 [example.html](example.html) 即可，无需本地服务或 iframe。

---

## 六、变更记录

| 日期 | 说明 |
|------|------|
| 2026-04-12 | **移除** `modules/` 与合并脚本；整页仅以 `example.html` 维护；内嵌字体改为 CDN。 |
