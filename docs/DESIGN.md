# DESIGN.md — UX Requirement Management Tool
> 设计系统主文档 · Design System Master Reference
> 版本 v1.0 · 2026-04-16

## 文档边界

本文件仅维护设计系统与交互规范（视觉、组件、动效、可访问性）。
项目运行方式、开发流程与配置说明统一维护在 `README.md`。

---

## 一、产品定位与设计哲学

### 产品类型
**Productivity Tool（生产力工具）** — 面向 UX 设计师、产品经理、研发团队的需求看板管理系统。

### 核心用户
- 主要：UX 设计师 / 产品经理（日常高频使用，追求效率与信息密度）
- 次要：研发工程师（查看需求状态，低频只读）

### 设计哲学：Micro-interactions First
> "每一次交互都应该有回应，每一个状态都应该被感知。"

本工具采用 **Micro-interactions 微交互设计风格**：
- 所有可点击元素必须有 **50–150ms** 的即时视觉反馈
- 状态变化（拖拽、提交、删除）必须有动画过渡，让用户感知系统在响应
- 信息密度优先，但不以牺牲可读性为代价

---

## 二、色彩系统（Color System）

### 当前主题：Dark Mode（深色主题）

当前实现采用深色主题，以下为完整 Token 定义：

```css
:root {
  /* === 背景层级 === */
  --bg-primary:    #0f1117;   /* 页面底层背景 */
  --bg-secondary:  #1a1d27;   /* Header / 次级容器 */
  --bg-card:       #222533;   /* 卡片背景 */
  --bg-hover:      #2a2e3f;   /* 悬停态背景 */
  --bg-column:     #181b24;   /* Kanban 列背景 */

  /* === 文字层级 === */
  --text-primary:   #e8eaed;  /* 主要文字，对比度 ≥ 7:1 */
  --text-secondary: #9aa0a6;  /* 次要文字，对比度 ≥ 4.5:1 */
  --text-muted:     #6b7280;  /* 辅助文字，仅用于非关键信息 */

  /* === 边框 === */
  --border:         #2e3347;  /* 通用边框 */

  /* === 强调色（语义化） === */
  --accent-blue:    #4f8cff;  /* 主操作 / 激活态 / 链接 */
  --accent-green:   #34d399;  /* 成功 / 上线 / 完成 */
  --accent-orange:  #f59e0b;  /* 警告 / 待评审 */
  --accent-red:     #ef4444;  /* 危险 / 删除 / P0 */
  --accent-purple:  #a78bfa;  /* 设计中 / 待设计 */
  --accent-cyan:    #22d3ee;  /* 设计中（进行态） */
  --accent-pink:    #f472b6;  /* 开发中 */

  /* === 阴影 === */
  --shadow:         0 4px 24px rgba(0, 0, 0, 0.3);

  /* === 圆角 === */
  --radius:         12px;     /* 卡片、面板 */
  --radius-sm:      8px;      /* 按钮、标签、小组件 */
}
```

### 状态色语义映射（Kanban 列）

| 状态 | 颜色 Token | Hex | 含义 |
|------|-----------|-----|------|
| 待评审 | `--accent-orange` | `#f59e0b` | 需要决策，引起注意 |
| 待设计 | `--accent-purple` | `#a78bfa` | 设计队列中 |
| 设计中 | `--accent-cyan` | `#22d3ee` | 进行中，活跃态 |
| 设计完成 | `--accent-green` | `#34d399` | 阶段完成 |
| 待开发 | `--accent-blue` | `#4f8cff` | 主操作色，开发就绪 |
| 开发中 | `--accent-pink` | `#f472b6` | 进行中，区分设计阶段 |
| 已上线 | `--accent-green` | `#34d399` | 最终完成态 |

### 优先级色语义映射

| 优先级 | 背景色 | 文字色 | 使用场景 |
|--------|--------|--------|---------|
| P0 | `rgba(239,68,68,0.15)` | `#ef4444` | 紧急阻塞，必须立即处理 |
| P1 | `rgba(245,158,11,0.15)` | `#f59e0b` | 高优先级，本迭代必须完成 |
| P2 | `rgba(79,140,255,0.15)` | `#4f8cff` | 正常优先级 |
| P3 | `rgba(107,114,128,0.15)` | `#6b7280` | 低优先级，可延期 |

### 未来扩展：Light Mode Token（预留）

```css
/* 当需要支持浅色主题时，覆盖以下变量 */
[data-theme="light"] {
  --bg-primary:    #F8FAFC;
  --bg-secondary:  #FFFFFF;
  --bg-card:       #FFFFFF;
  --bg-column:     #F1F5F9;
  --text-primary:  #0F172A;
  --text-secondary:#475569;
  --text-muted:    #94A3B8;
  --border:        #E2E8F0;
  --accent-blue:   #2563EB;
}
```

---

## 三、字体系统（Typography）

### 字体栈

```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC',
             'Hiragino Sans GB', 'Inter', sans-serif;
```

> 当前使用系统字体栈，优先保证跨平台一致性与加载性能。
> 如需引入 Inter 字体（推荐用于专业工具类产品）：

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
```

### 字号层级（Type Scale）

| 层级 | 字号 | 字重 | 用途 |
|------|------|------|------|
| Display | 24px | 700 | 页面主标题（H1） |
| Heading | 18px | 600 | 区块标题 |
| Subheading | 14px | 600 | 列标题、Tab 标签 |
| Body | 13px | 400/500 | 卡片正文、需求名称 |
| Caption | 12px | 500 | 列计数、辅助信息 |
| Micro | 11px | 400/600 | 标签、ID、Owner |
| Nano | 10px | 600 | 优先级徽章、部件标签 |

### 字体规则

- **行高**：正文 `line-height: 1.6`，标题 `line-height: 1.3`
- **字间距**：标题类使用 `letter-spacing: -0.5px`，大写辅助文字使用 `letter-spacing: 0.5px`
- **截断**：卡片标题最多显示 2 行，超出用 `-webkit-line-clamp: 2` 截断
- **等宽字体**：需求 ID 使用 `'SF Mono', 'Fira Code', monospace`

---

## 四、间距系统（Spacing System）

遵循 **8dp 基础网格**，所有间距为 4 的倍数：

```
4px   — 微间距（图标与文字间距、徽章内边距）
6px   — 小间距（卡片内元素间距）
8px   — 基础间距（卡片内边距、列内边距）
10px  — 列间距（Kanban 列 gap）
12px  — 中间距（列 Header 内边距）
14px  — 列 Header 水平内边距
16px  — 标准内边距（Tab Bar、主内容区）
20px  — 大间距（Tab 按钮内边距）
24px  — 区块间距（Header 元素间距）
40px  — 页面水平内边距（主内容区 padding）
```

---

## 五、圆角系统（Border Radius）

| Token | 值 | 用途 |
|-------|-----|------|
| `--radius` | `12px` | 卡片、Kanban 列、面板、Modal |
| `--radius-sm` | `8px` | 按钮、输入框、标签、小组件 |
| `4px` | 硬编码 | 优先级徽章、极小标签 |
| `50%` | 硬编码 | 圆形状态点（column-dot） |

---

## 六、组件规范（Component Spec）

### 6.1 需求卡片（Req Card）

```
┌─────────────────────────────┐
│ REQ-001                [×]  │  ← ID（Mono）+ 删除按钮（hover 显示）
│ 需求名称，最多两行显示...    │  ← 13px / 500 / line-clamp 2
│ [P1] 👤 Owner  [部件标签]   │  ← Meta 行
└─────────────────────────────┘
```

**状态规则：**
- 默认态：`border: 1px solid var(--border)`
- 悬停态：`border-color: var(--accent-blue)` + `box-shadow: 0 2px 10px rgba(0,0,0,0.2)`
- 拖拽态：`opacity: 0.4` + `transform: rotate(2deg)`
- 删除模式：`border-color: var(--accent-red)`，删除按钮显示

**交互规则：**
- 过渡时间：`transition: all 0.2s`（200ms，符合 micro-interaction 规范）
- 拖拽光标：`cursor: grab`，拖拽中：`cursor: grabbing`
- 删除按钮：仅在 `.show-delete` 状态下显示，避免误操作

### 6.2 Kanban 列（Column）

- 最小高度：`300px`，内容区 `flex: 1` 自动撑高
- 拖拽悬停态：`border-color: var(--accent-blue)` + 淡蓝背景 `rgba(79,140,255,0.04)`
- 空列提示：居中文字，`opacity: 0.5`，字号 12px
- 列内容区支持独立滚动：`overflow-y: auto`

### 6.3 Tab 导航（Tab Bar）

- 默认态：透明背景，`color: var(--text-muted)`
- 悬停态：`color: var(--text-secondary)` + 极淡背景 `rgba(255,255,255,0.03)`
- 激活态：`color: var(--accent-blue)` + 底部 2px 蓝色边框 + 淡蓝背景
- 计数徽章：激活时变为实心蓝色背景白字，非激活时为透明蓝色背景

### 6.4 主操作按钮（Primary Button）

```css
.btn-primary {
  background: var(--accent-blue);       /* #4f8cff */
  color: #fff;
  padding: 9px 18px;
  border-radius: var(--radius-sm);      /* 8px */
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s;
}
.btn-primary:hover {
  background: #3a7aef;
  box-shadow: 0 2px 12px rgba(79, 140, 255, 0.3);
}
```

### 6.5 Header 统计数字（Stat Item）

- 数值：`24px / 700 / var(--accent-blue)`
- 标签：`11px / uppercase / letter-spacing: 0.5px / var(--text-muted)`

---

## 七、动效规范（Motion & Animation）

### 核心原则
> 动效是信息，不是装饰。每一个动画都应该传达状态变化的意义。

| 场景 | 时长 | 缓动 | 说明 |
|------|------|------|------|
| 悬停反馈 | 150–200ms | `ease` | 颜色、边框、阴影变化 |
| 卡片拖拽 | 即时 | — | 拖拽中立即应用旋转和透明度 |
| 列拖拽高亮 | 200ms | `ease` | 边框色和背景色渐变 |
| 按钮点击 | 200ms | `ease` | 颜色加深 + 阴影出现 |
| 删除按钮显示 | 200ms | `ease` | `display: flex` 切换 |
| Modal 出现 | 250ms | `ease-out` | 从中心缩放淡入 |
| 通知 Toast | 300ms | `ease-out` | 从底部滑入 |

### 禁止事项
- 禁止超过 500ms 的过渡动画（会让工具感觉迟钝）
- 禁止无意义的循环动画（如持续旋转的 loading 用于非加载场景）
- 必须支持 `prefers-reduced-motion`：

```css
@media (prefers-reduced-motion: reduce) {
  * { transition-duration: 0.01ms !important; animation-duration: 0.01ms !important; }
}
```

---

## 八、布局规范（Layout）

### 页面结构

```
┌─────────────────────────────────────────────────────┐
│  Header（sticky, z-index: 100）                      │
│  max-width: 1800px, padding: 20px 40px              │
├─────────────────────────────────────────────────────┤
│  Tab Bar                                             │
│  max-width: 1800px, padding: 16px 40px 0            │
├─────────────────────────────────────────────────────┤
│  Main Content                                        │
│  max-width: 1800px, padding: 16px 40px 40px         │
│  ┌──┬──┬──┬──┬──┬──┬──┐                            │
│  │  │  │  │  │  │  │  │  ← 7列 Kanban Grid         │
│  │  │  │  │  │  │  │  │     grid-template-columns:  │
│  └──┴──┴──┴──┴──┴──┴──┘     repeat(7, 1fr)         │
└─────────────────────────────────────────────────────┘
```

### 响应式断点

| 断点 | 宽度 | Kanban 列数 | 说明 |
|------|------|------------|------|
| Desktop XL | ≥ 1440px | 7 列 | 标准工作台视图 |
| Desktop | 1024–1439px | 5–7 列 | 可横向滚动 |
| Tablet | 768–1023px | 3–4 列 | 横向滚动 |
| Mobile | < 768px | 1–2 列 | 竖向堆叠或横向滚动 |

> 当前实现：`overflow-x: auto` 允许横向滚动，优先保证桌面端体验完整性。

---

## 九、图标规范（Icon System）

### 规则
- **禁止使用 Emoji 作为功能图标**（跨平台渲染不一致，无法主题化）
- 推荐使用 **Lucide Icons** 或 **Heroicons**（SVG，支持 CSS 变量着色）
- 图标尺寸：`16px`（行内）/ `20px`（按钮）/ `24px`（导航）
- 图标颜色继承父元素 `color`，通过 `currentColor` 实现主题适配
- 所有图标必须有 `aria-label` 或配套文字说明

### 当前使用的图标（Unicode 临时方案）
> 以下为当前实现中使用的 Unicode 字符，建议后续替换为 SVG 图标：

| 用途 | 当前字符 | 建议替换 |
|------|---------|---------|
| 新增需求 | `+` | `<PlusIcon>` |
| 删除卡片 | `×` | `<XIcon>` |
| Owner 标识 | `👤` | `<UserIcon>` |

---

## 十、可访问性规范（Accessibility）

### 对比度要求（WCAG AA）
- 主要文字（`--text-primary`）对背景（`--bg-primary`）：**≥ 7:1** ✓
- 次要文字（`--text-secondary`）对背景：**≥ 4.5:1** ✓
- 辅助文字（`--text-muted`）：仅用于非关键信息，允许 ≥ 3:1

### 键盘导航
- 所有可交互元素必须可通过 `Tab` 键聚焦
- 焦点态必须有可见的 `outline` 样式（不得使用 `outline: none` 而不提供替代方案）
- 拖拽操作必须提供键盘替代方案（如方向键移动卡片）

### 语义化 HTML
- Kanban 列使用 `role="list"` + 卡片使用 `role="listitem"`
- 按钮使用 `<button>` 而非 `<div>` 模拟
- 状态变化通过 `aria-live` 区域通知屏幕阅读器

---

## 十一、数据可视化规范（Data Viz）

### Header 统计区
- 数字使用强调色（`--accent-blue`），字号 24px/700，视觉权重最高
- 标签使用全大写 + 字间距，与数字形成层次对比
- 统计项之间保持 `gap: 20px`，不使用分隔线

### 状态点（Column Dot）
- 尺寸：`8×8px`，`border-radius: 50%`
- 颜色与列状态语义严格对应（见第二节状态色映射）
- 禁止使用文字替代状态点（颜色 + 文字双重编码，提升可读性）

---

## 十二、写作规范（Content & Copy）

### 界面文案原则
- **简洁**：按钮文案不超过 4 个字（中文）/ 2 个单词（英文）
- **动词优先**：操作按钮以动词开头（提交需求、删除、确认）
- **状态描述**：空状态提示使用友好语气，避免技术性错误信息

### 需求 ID 格式
- 格式：`REQ-{timestamp}` 或 `REQ-{序号}`
- 字体：等宽字体（Mono），颜色：`--text-muted`
- 位置：卡片左上角，字号 10px

### 优先级标签文案
| 标签 | 含义 |
|------|------|
| P0 | 紧急阻塞 |
| P1 | 高优先级 |
| P2 | 正常 |
| P3 | 低优先级 |

---

## 十三、交付前检查清单（Pre-Delivery Checklist）

### 视觉质量
- [ ] 所有强调色使用 CSS 变量，无硬编码 hex 值（除设计系统定义处）
- [ ] 卡片、列、按钮圆角统一使用 `--radius` / `--radius-sm`
- [ ] 字号、字重严格遵循字体层级表
- [ ] 状态色与语义映射表一致

### 交互体验
- [ ] 所有可点击元素有 `cursor: pointer`
- [ ] 悬停态过渡时间在 150–200ms 范围内
- [ ] 拖拽操作有视觉反馈（旋转 + 透明度）
- [ ] 删除操作有二次确认或可撤销机制

### 可访问性
- [ ] 主要文字对比度 ≥ 4.5:1
- [ ] 所有图标有 `aria-label`
- [ ] 支持 `prefers-reduced-motion`
- [ ] 键盘可访问所有核心功能

### 响应式
- [ ] 1440px 宽度下 7 列完整显示
- [ ] 小屏幕下横向滚动正常
- [ ] Header 在 sticky 状态下不遮挡内容

---

## 十四、设计决策记录（Design Decision Log）

| 日期 | 决策 | 原因 |
|------|------|------|
| 2026-04-16 | 采用深色主题作为默认主题 | 目标用户（设计师/PM）长时间使用，深色主题减少视觉疲劳 |
| 2026-04-16 | Kanban 7 列固定布局 | 需求流转有 7 个明确阶段，固定列数保证流程可视化完整性 |
| 2026-04-16 | 卡片拖拽采用 HTML5 Drag API | 无需额外依赖，轻量实现，满足当前需求 |
| 2026-04-16 | max-width: 1800px | 适配 27 寸显示器，避免超宽屏内容过于分散 |
| 2026-04-16 | 状态色采用高饱和度强调色 | 深色背景下需要足够的色彩对比度来区分 7 种状态 |

---

*本文档应随产品迭代持续更新，确保视觉与交互规范和当前实现保持一致。*
