# 火车票首页（`vertical.train.home`）— 页面结构

## 元信息

- **page_id**：`vertical.train.home`（与 [docs/page-index.md](../../../../docs/page-index.md) 一致时引用）
- **参考实现**：[example.html](example.html)（**唯一** HTML/CSS 真相源；无 `modules/`、`manifest.md`）
- **依赖**：[foundations/design-foundations.md](../../../../foundations/design-foundations.md)；配图见 [foundations/image-library.md](../../../../foundations/image-library.md)
- **Skill 编排入口**：[SKILL.md](../../../../SKILL.md)
- **最后同步**：2026-04-13

---

## 一、说明

当前 `train.home` 为火车票首页长页，采用单文件拼接形态，包含以下模块（自上而下）：

1. 顶部氛围区（状态栏 + 导航栏 + 顶部 banner）
2. 小搜模块（与氛围区重叠，负边距上提）
3. 金刚区
4. 优惠专区
5. 火车路线专家
6. 添加微信助手
7. 火车票水印
8. 底部固定 Tab Bar（吸底，不随页面滚动）

关键布局约束：

- 除小搜与氛围区重叠关系外，后续模块纵向间距统一为 `18px`
- 底部 Tab 使用固定定位（`position: fixed`），并通过页面底部 spacer 预留高度，避免遮挡内容
- “火车路线专家”内筛选行在上、查看更多按钮在下，查看更多按钮水平居中
- 视觉与交互行为以 `example.html` 的最终样式为准

整页布局与视觉表现以 **[example.html](example.html)** 内结构与样式为准。

---

## 二、变更记录

| 日期 | 说明 |
|------|------|
| 2026-04-13 | 删除旧版整页内容，重建为仅含状态栏/导航栏/顶部氛围 banner 的精简版。 |
| 2026-04-13 | 新增小搜、金刚区、优惠专区、路线专家、微信助手、水印与底部固定 Tab，形成完整火车票首页长页。 |
