# 搜索结果页（`search.search_result`）— 页面结构

## 元信息

- **page_id**：`search.search_result`
- **参考实现**：[example.html](example.html)（单文件页面）
- **依赖**：[foundations/design-foundations.md](../../../foundations/design-foundations.md)
- **Skill 编排入口**：[SKILL.md](../../../SKILL.md)
- **最后同步**：2026-04-13

---

## 一、说明

本页为提链型结果页（搜索导航 + 分类 Tab + 商品列表），用于将攻略类 Query 转化为可浏览、可下钻、可交易的结果流。

页面按 [example.html](example.html) 的 DOM 结构组织：

1. **顶部搜索区**（`.zs-search`，`position: sticky; top: 0`）：状态栏（时间、网络/电量示意）+ 搜索条（返回、搜索框含关键词、右侧「我的收藏」）。
2. **分类导航区**（`.tabs-frame`）：一级横滑 Tab（综合、景点、酒店、旅游、交通、店铺）+ 二级 pill Tab；与列表一并随页面纵向滚动（仅搜索条区域吸顶）。
3. **商品结果区**（`.result-list`）：多卡片列表；头图通过 CSS `background-image` 引用 **飞猪素材库** `fli.alicdn.com` 真实配图（示例中 12 张轮换样式类）；卡片含标题、评分/短评、副标题、标签、销量与价格、优惠条等。

**已移除**（与当前实现不一致时勿再写回）：AI 总结块、底部筛选/动作条。

设计原则：

- Query 在搜索框内展示，可继续探索（交互以产品为准）。
- 分类前置，列表为主承接；价格与优惠样式遵循页面内 token。

以 [example.html](example.html) 为最终实现基准。

---

## 二、变更记录

| 日期 | 说明 |
|------|------|
| 2026-04-13 | 新建 `pages/search/search-result` 基础文件（占位版）。 |
| 2026-04-13 | 落地提链结果页：吸顶搜索区、双层分类 Tab、商品卡列表；后移除 AI 总结区与筛选动作条。 |
| 2026-04-13 | 列表配图改为 `fli.alicdn.com` 素材库 URL；扩充卡片数量。 |
| 2026-04-13 | 搜索结果目录统一为 `pages/search`；`page_id` 调整为 `search.search_result`；spec 与 example 对齐。 |
