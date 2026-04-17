# 搜索页（`search.search`）— 页面结构

## 元信息

- **page_id**：`search.search`
- **参考实现**：[example.html](example.html)（单文件页面）
- **依赖**：[foundations/design-foundations.md](../../../foundations/design-foundations.md)
- **Skill 编排入口**：[SKILL.md](../../../SKILL.md)
- **最后同步**：2026-04-13

---

## 一、说明

本页为搜索入口页（Search Entry Page），用于承接用户搜索意图构建，包含：

- 顶部状态栏（黑色图标，透明背景）
- 顶部搜索框（返回、输入引导、搜索按钮）
- 发现与推荐（两行横向滑动卡片）
- 搜索历史（可删除、可扩展）

布局、视觉与交互规则以 [example.html](example.html) 为准。

---

## 二、变更记录

| 日期 | 说明 |
|------|------|
| 2026-04-13 | 新建 `pages/search/search`，落地搜索入口页框架与规范示例。 |
| 2026-04-13 | 搜索页目录统一为 `pages/search`；`page_id` 调整为 `search.search`。 |
