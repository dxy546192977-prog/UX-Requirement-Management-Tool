# 搜索 Sug 页（`search.search_sug`）— 页面结构

## 元信息

- **page_id**：`search.search_sug`
- **参考实现**：[example.html](example.html)（单文件页面）
- **依赖**：[foundations/design-foundations.md](../../../foundations/design-foundations.md)
- **Skill 编排入口**：[SKILL.md](../../../SKILL.md)
- **最后同步**：2026-04-13

---

## 一、说明

本页为搜索提链页（Search Suggestion），目标是帮助用户快速明确搜索意图并进入目标列表或商品页。

页面模块结构：

1. 搜索输入区（返回 / 输入 / 搜索）
2. 结构化提链区（POI + 类型）
3. 商品直达区（名称 / 评分区域 / 价格）
4. 搜索补全区（去重联想词）

视觉与交互约束：

- 命中关键词高亮（品牌橙）
- 价格红色强调，辅助信息灰色
- 输入实时刷新、点击直接跳转、支持返回继续编辑

以 [example.html](example.html) 为最终实现基准。

---

## 二、变更记录

| 日期 | 说明 |
|------|------|
| 2026-04-13 | 新建 `pages/search/search-sug` 基础文件（占位版）。 |
| 2026-04-13 | 搜索 Sug 目录统一为 `pages/search`；`page_id` 调整为 `search.search_sug`。 |
| 2026-04-13 | 根据框架与 UI 稿替换为正式搜索 Sug 页（搜索框 + Suggest 列表）。 |
