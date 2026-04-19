# HTML 输出与 Token 格式标准（摘要）

> 完整组件索引、图片 ID 库、逐条组件说明以物料库为准：  
> `../playbooks/flight-funnel/0 Fliggy Design Skill/SKILL.md`  
> 本文件汇总**已确认的硬性格式要求**，供 Agent 快速校验。

## 1. 文件与平台

- **输出格式**：单文件 HTML + 内联 CSS（`<style>`），禁止依赖外部样式表。
- **目标**：移动端 App WebView / H5；设计基准 **750 × 1624px（@2x）**。
- **视口（强制）**：

```html
<meta name="viewport" content="width=750, user-scalable=no">
```

## 2. 布局与间距

- 页面水平边距：**30px**。
- 间距体系：**6 的倍数**（6 / 12 / 18 / 24 / 30 / 36 / 42 / 48px）。
- 模块垂直间距由**模块自身 margin** 控制，不用全局间距 token。
- AI 回复区：**不输出**头像与名称标识。

## 3. Design Tokens（强制）

- **颜色与圆角**：一律通过 `var(--token-name)` 引用。
- **禁止**：在组件样式中随意硬编码 hex 或圆角 px（唯一例外：`:root` 中的 token 定义）。
- **生成物必须**在 `<style>` 内包含完整 `:root`（颜色 + 圆角），保证 `var()` 可解析。
- **品牌色** `var(--color-indigo-1)`：仅用于按钮文字、链接；禁止大面积铺底、禁止作卡片底色。

标准 token 名与取值以 `0 Fliggy Design Skill/SKILL.md` 第二节为准；批量换肤时同步 `框架组件.md` 内 `:root`。

## 4. Markdown 文本与卡片

- Markdown 说明性文本：铺在页面背景 `#F7F8FA` 上，**禁止**用白底卡片包一层。
- 白底卡片：仅用于固定组件（交通卡、商品卡、下单卡、订单卡等）。

## 5. 读取策略（强制）

1. 只以 `0 Fliggy Design Skill/SKILL.md` 为**唯一入口**。
2. 需求分析 → 选定组件 → **仅读取**对应组件 `README.md`。
3. `example.html`：**仅在** README 不足以确定结构、或复杂嵌套、或首次使用某组件时读取。
4. **禁止**一次性读取全部组件目录。

## 6. 图片填充（默认）

- 使用 **Unsplash** 真实图，禁止纯色大块占位。
- URL 模板：`https://images.unsplash.com/photo-{ID}?w={w}&h={h}&fit=crop`（可按组件规范追加 `&q=80`）。
- 按语境选 ID；同页多图不重复；`background-image` + `cover` + `center`，保留浅灰 `#E0E0E0` 作加载底。
- 若业务要求改用飞猪线上素材：**在交付说明中显式写出取舍**。

## 7. 类名与其它纪律（与机票 Agent 协议对齐）

- 类名前缀建议：`fdl-*`（与历史 FDG 一致）。
- **流式布局**：主内容纵向 flex；禁止滥用 `position:absolute` 做纵向排版。
- **禁止灰块占位**：须可交互或可读的实装 DOM。
- **输出量**：交通推荐最多 3 方案等（见入口 SKILL 第五节）。

## 8. Phase 3 快速检查项（摘录）

- 视口 meta 是否为 `width=750, user-scalable=no`。
- 是否单文件 + 内联样式。
- 新增样式是否主要走 `var(--*)`。
- 图片是否符合 Unsplash/业务约定。
