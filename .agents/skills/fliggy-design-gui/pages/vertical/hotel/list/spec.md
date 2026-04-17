# 酒店列表（`vertical.hotel.list`）— 页面结构

## 元信息

- **page_id**：`vertical.hotel.list`（与 [docs/page-index.md](../../../docs/page-index.md) 一致时引用）  
- **参考实现**：[example.html](example.html)（**唯一** HTML/CSS 真相源；无 `modules/`、`manifest.md`）  
- **依赖**：[foundations/design-foundations.md](../../../foundations/design-foundations.md)；配图见 [foundations/image-library.md](../../../foundations/image-library.md)；顶栏可对照 `components/platform/navigation/navbar/spec.md`  
- **Skill 编排入口**：[SKILL.md](../../../../SKILL.md)  
- **最后同步**：2026-04-12  

---

## 一、视口与画布

- **viewport**：`width=750, user-scalable=no`  
- **根容器**：`.hotel-list-full` — 750 宽居中、纵向 `flex`，与 [example.html](example.html) 一致。  
- **本示例**：**常规顶栏**列表串联；**无** 全局主 Tab 底栏。  

---

## 二、主内容纵向顺序

样式文件中以注释分段，顺序如下：

| 顺序 | 区块 | 说明 |
|:----:|------|------|
| 1 | `hotel-list-top-chrome` | 状态栏 + 导航栏（示例中 `.list-fixed-chrome` **吸顶**）+ 筛选两行（`.skill-component` 内随页滚动） |
| 2 | `hotel-list-benefit-bar` | 权益条 / 营销条 |
| 3 | `hotel-list-row-card` | 列表行卡片（可重复、触底加载逻辑以示例脚本为准） |

**说明**：历史 `manifest` 中曾单独列出 **AI 列表变体** 与 **地图全屏场景**；二者未合并进本默认整页。若产品需要，应在独立分支或新 `example-*.html` 中维护，避免与本常规列表双套主筛叠加。  

---

## 三、维护约定

- 列表扩展字段时保持 **750 坐标系** 与行卡左右边距一致。  
- 与 AI 顶栏变体二选一拼接时，勿重复两套主筛选。  

---

## 四、变更记录

| 日期 | 说明 |
|------|------|
| 2026-04-12 | 对齐 `tabs.*` 范式：仅保留 `spec.md` + `example.html`；原 `manifest.md`、`page-frame.md`、`modules/` 已并入单页。 |
