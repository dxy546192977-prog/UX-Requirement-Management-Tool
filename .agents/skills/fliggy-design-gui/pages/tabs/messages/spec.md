# 消息 Tab（`tabs.messages`）— 页面结构与滚动

## 元信息

- **page_id**：`tabs.messages`（与 [docs/page-index.md](../../../docs/page-index.md) 一致时引用）  
- **参考实现**：[example.html](example.html)（**唯一** HTML/CSS 真相源；无 `modules/`、`manifest.md`）  
- **依赖**：[foundations/design-foundations.md](../../../foundations/design-foundations.md)；配图见 [foundations/image-library.md](../../../foundations/image-library.md)  
- **编排入口**：[SKILL.md](../../../SKILL.md)（意图分流、读取闭包）  
- **最后同步**：2026-04-12  

### 读取闭包（生成/改页时允许打开的规范）

除上表 **依赖** 与 **编排入口** 外，按需查阅：

```text
components/platform/navigation/tabbar/spec.md
```

顶栏为 **消息一级导航**（`fdl-msgs-nav` + `messages-page__head`），内联于 [example.html](example.html)。

---

## 一、滚动方式

### 整页随文档滚动

**`body` 随文档滚动**：`main.messages-page__main` 内消息列表 **随文档流** 纵向延伸。

### 固定在视口、不随滚动离开

| 区域 | 类名 / 说明 |
|------|-------------|
| 状态栏图 | **`.messages-page__status-bar`**：与 **tabs.home / tabs.member** 同款 **750×88** 前景图 **`.status-bar`**，`position: fixed; top: 0; z-index: 100`，白底 |
| 一级导航栏 | **`header.messages-page__head`**：**`top: 88px`**，`z-index: 99`；内含 **`fdl-msgs-nav`**（**`padding: 0 24px`**，与 **tabs.member** 顶栏一致）。左侧：**`fdl-msgs-nav__mile`**（群聊广场，**36px / 500 / #0f131a**，对齐会员「里程」）+ **`fdl-msgs-nav__title-block`**（**`fdl-msgs-nav__h1`** 消息 **48px / 500** + **`fdl-msgs-nav__underline`** **54×6 / #0f131a / 圆角 3**）；右侧 **设置 / 清除** 不变 |

### 固定在底部

- **一级 Tabbar**：`fdl-tabbar` + **安全区**（与 [example.html](example.html) 中 token、`env(safe-area-inset-bottom)` 一致）；当前示例 **消息** 为选中态。

---

## 二、主内容区（随页面滚动）

- **顶部占位**：`main.messages-page__main` 使用 **`padding-top: var(--msgs-content-offset-top)`**（当前 **176px** = 状态栏 **88** + 顶栏 **88**）。  
- **消息列表**：**`fdl-msgs-list`** → 若干 **`a.fdl-msgs-item`**（整行可点）；单条结构见下节。

### 模块顺序（自上而下）

| 顺序 | 模块 | 类名 / 说明 |
|:----:|------|-------------|
| 1 | 消息会话列表 | `fdl-msgs-list` — 群聊 / 折叠聚合 / 行程服务 / 订阅 / 互动 / 商家等 **统一列表项骨架**（头像 + 未读 + 标题行 + 摘要） |

---

## 三、单条消息项（`fdl-msgs-item`）

| 区域 | 类名 | 说明 |
|------|------|------|
| 左 | `fdl-msgs-item__avatar-wrap` / `__avatar` | 行高 **148px**（较基础行 **+24px**）；**`__avatar-wrap`** 竖向 **`padding: 24px 12px`** 以垂直居中 **100×100** 头像。圆角头像；**`__badge`** 数字未读；**`__badge--dot`** 仅红点；**`is-hidden`** 隐藏角标 |
| 中 | `fdl-msgs-item__body` | **`__row-top`**：`__title-group`（`__title` + 可选 **`__tag`**）+ **`__time`**；次行 **`__preview`** 摘要 |
| 右 | — | 时间与标题同排右对齐（时间在 **`__row-top`** 内） |

---

## 四、间距与版心

| 类型 | 规则 |
|------|------|
| 列表左右边距 | **`--space-page-gutter: 4px`**（在原先 16px 基础上左右各减 12px） |
| 列表内容最大宽 | **`--msgs-content-max-w: 742px`**（750 − 4×2） |
| 顶栏左右 padding | **24px**（与 **tabs.member** `member-page__nav-bar` 一致；列表区用 **`--space-page-gutter` 4px**） |

---

## 五、与底栏文案说明

示例底栏与 **tabs.home / tabs.member** 一致为 **首页 · 会员 · 消息 · 行程 · 我的**。若产品文案为「飞猪 / 社区」等，仅在业务稿中替换标签，**不改变** Tabbar DOM 结构与图标资源约定时，可只改 `fdl-tabbar__label` 文案。
