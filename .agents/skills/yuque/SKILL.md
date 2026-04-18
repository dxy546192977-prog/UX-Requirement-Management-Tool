---
name: yuque
description: Provides Yuque (Skylark) document and knowledge-base operations via ali-mcpcli. Use when the user mentions 语雀 or Yuque, asks for Skylark or ali-mcpcli Yuque APIs, or provides URLs whose host is yuque.alibaba-inc.com, aliyuque.antfin.com, or yuque.antfin.com (domain check). Do not use for generic writing or knowledge-base tasks without a Yuque signal, or when the user targets other platforms (Notion, Confluence, Google Docs, etc.).
---

# Skylark/Yuque - 语雀文档

语雀/Yuque/Skylark 知识库文档操作工具

## 编辑约束（重要）

通过本 skill（`skylark_*` 工具）**更新语雀文档、目录或知识库内容**时，**除非用户明确要求删除、清空或大幅删减**，否则：

- **禁止删除**：文档正文中的既有段落、目录节点、知识库说明等用户可见内容
- **默认增量**：以追加、局部改写、纠错、补充为主；需要覆盖时先确认范围，避免误删
- **目录/结构变更**：`skylark_book_toc_update` 等涉及 `remove` 的操作，仅在用户明确授权时执行

## 目录层级定位（重要）

语雀里的“目录位置”指的是 **TOC 节点层级**，不是文档正文层级，也不是只看 `doc_id` 就能推断出来。

处理目录放置或移动时，必须遵循：

- **先找容器**：先读取 `skylark_book_toc`，确认目标父节点的 `node_uuid`
- **不要猜路径**：不要仅凭标题、`doc_id`、最近操作记录去猜父节点
- **DOC 也可能是容器**：只要某个 DOC 节点真实出现在 TOC 里，它就可以作为父节点挂子文档；不要因为类型是 `DOC` 就排除它
- **重名时看全路径**：同名目录/文档存在时，必须用完整路径、相邻兄弟节点或明确 `node_uuid` 区分
- **写后再确认**：目录变更后再次读取 TOC，确认最终路径正确
- **新建默认落顶层**：`skylark_doc_create` 和 `skylark_user_doc_create` 实测会先在 TOC 顶层生成 DOC 节点；如果用户要求放到某个目录下面，必须在创建后再执行一次 `skylark_book_toc_update`
- **优先信返回值**：`skylark_doc_create` 实测会返回 `node_uuid`；即使 `skylark_book_toc` 还没同步出新节点，也可以先用这个 `node_uuid` 做后续移动

找节点时优先直接读取 TOC：

```bash
ali-mcpcli call skylark skylark_book_toc '{"book_id": <book_id>}'
```

如果仍无法唯一定位父节点，就停止猜测并向用户确认“放到哪个现有节点下面”。

## 适用范围

本 skill 只封装了调用路径，不保证当前机器一定能实际访问 Skylark API。真实可用性取决于以下外部条件是否满足：

- `ali-mcpcli` 已安装且可执行
- 本机已安装 `node` 和 `npm`（`ali-mcpcli` 现在是 `node` 脚本版本）
- `utoo-proxy` 已安装且可连通内网 MCP
- 处于内网或已连接 VPN
- 本地 SSO/授权流程可用（常见依赖：4402 端口）
- 当前账号对目标知识库/文档有权限

如果这些条件里任一项未满足，Agent 必须明确说明“当前只能给出命令/排查指引，不能宣称已成功调用 API”。

## 调用与排查顺序（必须遵循）

默认先直接调用目标 `skylark_*` 工具；只有调用失败时，才进入诊断或安装缺失依赖流程。

推荐顺序：

1. 直接执行目标 `skylark_*` 调用
2. 若失败信息显示为环境或连接问题，先运行 `bash ./scripts/check-env.sh`
3. 若确认缺少 `ali-mcpcli` 或 `utoo-proxy`，再运行 `bash ./scripts/ensure-env.sh`
4. 安装完成后，重试原始调用

如果重试后仍失败：

- 停止继续执行写操作
- 明确指出失败发生在哪一层（CLI / proxy / 网络 / 认证 / 权限 / 限流）
- 引导查看 **[reference.md](./reference.md)** 对应排查章节

## 能力验证与依赖

本 skill 的能力完整度取决于外部工具链与环境（**npm 全局包 + UtooProxy 二进制 + 内网/VPN + SSO 认证**）。如果你现在无法验证 API 调用，通常是以下任一项未满足。

### 一键准备环境（按需使用）

默认入口见 **[scripts/ensure-env.sh](./scripts/ensure-env.sh)**。它会完成：

- 检测 `ali-mcpcli`
- 检测 `utoo-proxy`
- 缺失时自动安装
- 验证 `skylark` server 可见
- 用 `skylark_user_info` 做最小读取检查

只有在确认缺依赖，或环境调用已经失败后，才执行：

```bash
bash ./scripts/ensure-env.sh
```

### 只读检查（排查时使用）

只读检查脚本见 **[scripts/check-env.sh](./scripts/check-env.sh)**。Agent 或用户可在本地执行：

```bash
bash ./scripts/check-env.sh
```

### 最小可用检查（能跑通就说明可以连上）

```bash
# 1) 确认 skylark server 可用
ali-mcpcli info skylark

# 2) 尝试读取当前用户（需要已认证）
ali-mcpcli call skylark skylark_user_info '{}'
```

判定方式：

- `info skylark` 失败：优先看 `ali-mcpcli`、`utoo-proxy`、VPN/内网
- `info skylark` 成功但 `skylark_user_info` 失败：优先看认证状态、4402 端口、账号权限
- 两者都成功：可以继续执行读操作；写操作前仍应先读取目标对象确认 ID 和现状

## 安装

依赖 **ali-mcpcli** 与 **UtooProxy**。其中 `ali-mcpcli` 现在是 `node` 脚本版本，所以机器上要先有 `node` 和 `npm`。安装命令、验证方式、故障排查与可选的「已安装则跳过」脚本见 **[reference.md](./reference.md)**。

默认做法：先直接调用工具；只有失败时才运行 `bash ./scripts/ensure-env.sh` 安装缺失依赖并做最小检查。

## 重要: 域名转换

工具统一使用 `yuque.antfin.com`:

```
yuque.alibaba-inc.com → yuque.antfin.com
aliyuque.antfin.com → yuque.antfin.com
```

## 命令

| 命令 | 说明 |
|------|------|
| `ali-mcpcli info skylark` | 查看所有可用工具 |
| `ali-mcpcli info skylark <tool>` | 查看工具 schema |
| `ali-mcpcli call skylark <tool> '{}'` | 调用工具 |

## 所有可用工具（共 23 个）

### 用户操作（4 个工具）

| 工具名 | 说明 | 参数 |
|--------|------|------|
| `skylark_user_info` | 获取当前登录用户信息 | 无参数 |
| `skylark_user_groups` | 列出用户所属的团队列表 | limit(可选), offset(可选), role(可选) |
| `skylark_user_book_list` | 获取用户知识库列表 | group_id(可选), limit(可选), offset(可选), query(可选), scene(可选), type(可选), user_type(可选) |
| `skylark_user_recent` | 获取用户最近的操作记录 | limit(可选), offset(可选), type(可选) |

### 知识库操作（5 个工具）

| 工具名 | 说明 | 参数 |
|--------|------|------|
| `skylark_book_create` | 创建新的知识库 | user_id, name, slug, description(可选), public(可选), type(可选) |
| `skylark_book_detail` | 获取指定知识库的详细信息 | book_id: 知识库 ID (number) |
| `skylark_book_toc` | 获取指定知识库的目录树结构 | book_id: 知识库 ID (number) |
| `skylark_book_toc_update` | 更新指定知识库的目录结构（单操作） | book_id, action, doc_id(可选), node_uuid(可选), target_uuid(可选), title(可选), type(可选), url(可选), open_window(可选), visible(可选) |
| `skylark_book_update` | 更新指定的语雀知识库（id 模式） | book_id, name(可选), description(可选), public(可选) |

### 文档操作（7 个工具）

| 工具名 | 说明 | 参数 |
|--------|------|------|
| `skylark_doc_create` | 在指定知识库下创建文档（book_id 模式） | book_id, body, title(可选), format(可选), public(可选), enable_mood_comment(可选), sub_type(可选) |
| `skylark_doc_detail` | 获取指定文档的正文内容（doc_id 模式） | doc_id: 文档 ID (number) |
| `skylark_doc_list` | 获取指定知识库下的文档列表（book_id 模式） | book_id, limit(可选), offset(可选) |
| `skylark_doc_update` | 更新指定语雀文档（doc_id 模式） | doc_id, body(可选), title(可选), format(可选), public(可选), enable_mood_comment(可选), sub_type(可选) |
| `skylark_doc_comments` | 获取指定文档的评论列表 | doc_id, limit(可选), lastId(可选) |
| `skylark_doc_likes` | 获取指定文档的点赞列表 | doc_id, limit(可选), offset(可选) |
| `skylark_resolve_url` | 解析语雀 URL，返回类型和 ID | url: 语雀 URL |

### 搜索操作（1 个工具）

| 工具名 | 说明 | 参数 |
|--------|------|------|
| `skylark_search` | 根据关键词搜索用户有权限的语雀文档 | q, pageNo(可选), pageSize(可选), scope(可选) |

### 表格操作（1 个工具）

| 工具名 | 说明 | 参数 |
|--------|------|------|
| `skylark_table_call` | 数据表统一调用入口 | action, doc_id(可选), sheet_id(可选), payload(可选) |

### 已废弃工具（5 个，不推荐使用）

| 工具名 | 说明 | 替代工具 |
|--------|------|----------|
| `skylark_user_book_update` | 更新知识库（namespace 模式） | `skylark_book_update` |
| `skylark_user_doc_create` | 创建文档（namespace 模式） | `skylark_doc_create` |
| `skylark_user_doc_detail` | 获取文档详情（namespace+slug 模式） | `skylark_doc_detail` |
| `skylark_user_doc_list` | 获取文档列表（namespace 模式） | `skylark_doc_list` |
| `skylark_user_doc_update` | 更新文档（namespace+slug 模式） | `skylark_doc_update` |

## 详细参数说明

### 公开性 (public)
- `0` - 私密/成员可见
- `1` - 公开/所有人可见
- `2` - 企业内公开/空间成员可见

### 文档格式 (format)
- `markdown` - Markdown 格式（默认）
- `lake` - 语雀 Lake 格式

### 目录节点类型 (type)
- `DOC` - 文档
- `TITLE` - 分组标题
- `LINK` - 外部链接

### 目录操作类型 (action)
- `prependChild` - 使节点成为某节点的首个子节点
- `appendChild` - 使节点成为某节点的最后一个子节点
- `moveAfter` - 使节点成为某节点的下一个同级节点
- `moveBefore` - 使节点成为某节点的上一个同级节点
- `insert` - 创建节点
- `insertAfter` - 末尾创建节点
- `insertSibling` - 创建同级节点
- `remove` - 删除节点
- `removeWithChildren` - 删除节点及其子节点
- `edit` - 编辑节点（重命名、更新链接等）

### 是否新窗口打开 (open_window)
- `0` - 当前窗口
- `1` - 新窗口

### 是否可见 (visible)
- `0` - 隐藏
- `1` - 可见

### 团队角色 (role)
- `0` - 管理员
- `1` - 成员

### 用户类型 (user_type)
- `User` - 个人知识库
- `Group` - 我加入的所有团队知识库

### 资源类型过滤 (type)
- `doc` - 文档
- `book` - 知识库
- `group` - 团队
- 多类型逗号分隔，如：`doc,book`

### 搜索范围 (scope)
- 不填 - 搜索当前用户/团队
- 填知识库 namespace - 搜索该知识库下的文档

### 知识库路径 (slug)
- 长度 1-190 字符
- 格式：字母、数字、下划线、中划线、点号、加号
- 正则：`/^[\w\-\.\+]{2,64}$/`

## 常用示例

以下命令中的 `<book_id>`、`<doc_id>`、`<group_id>`、`<node_uuid>`、`<target_uuid>`、`<namespace>` 都是占位符，执行前先替换成实际值。

常见占位符含义与获取方式：

| 占位符 | 含义 | 先用什么拿 |
|--------|------|------------|
| `<group_id>` | 团队 ID | `skylark_user_groups` |
| `<user_or_group_id>` | 创建知识库时的用户或团队 ID | 个人场景用 `skylark_user_info`，团队场景用 `skylark_user_groups` |
| `<book_id>` | 知识库 ID | `skylark_resolve_url`、`skylark_user_book_list` |
| `<thread_book_id>` | 话题库的知识库 ID | `skylark_user_book_list`，并过滤 `type=Thread` |
| `<doc_id>` | 文档 ID | `skylark_resolve_url`、`skylark_doc_list` |
| `<table_doc_id>` | 承载数据表的文档 ID | `skylark_resolve_url`、`skylark_doc_list` |
| `<node_uuid>` | 当前 TOC 节点 ID | `skylark_book_toc`；新建文档时也可直接用 `skylark_doc_create` 返回值 |
| `<target_uuid>` | 目标父节点或参照节点的 TOC 节点 ID | `skylark_book_toc` |
| `<book_namespace>` | 知识库 namespace | 知识库 URL，或先 `skylark_resolve_url` 再回读知识库信息 |
| `<namespace>` | URL 中的空间或知识库 namespace | 直接从语雀 URL 读取 |
| `<book_slug>` | 知识库 slug | 用户提供，或从知识库 URL 读取 |
| `<doc_slug>` | 文档 slug | 用户提供，或从文档 URL 读取 |
| `<sheet_id>` | 数据表 sheet ID | `skylark_table_call` 的 `meta.describe`、`table.list`、`table.get` |
| `<comment_last_id>` | 评论分页游标 | 上一次 `skylark_doc_comments` 返回结果里的最后一条评论 ID |

规则：

- agent 不应把 `<book_id>` 这类字符串原样传给 CLI
- 如果用户给了 URL，先调用 `skylark_resolve_url`
- 如果用户没给 URL，先调用列表或详情接口拿真实值，再进入写操作示例

### 用户信息

```bash
# 获取当前用户信息
ali-mcpcli call skylark skylark_user_info '{}'

# 获取我的团队列表
ali-mcpcli call skylark skylark_user_groups '{}'

# 获取管理员角色的团队
ali-mcpcli call skylark skylark_user_groups '{"role": 0}'

# 获取我的知识库列表
ali-mcpcli call skylark skylark_user_book_list '{}'

# 获取指定团队的知识库
ali-mcpcli call skylark skylark_user_book_list '{"group_id": <group_id>}'

# 获取个人知识库
ali-mcpcli call skylark skylark_user_book_list '{"user_type": "User"}'

# 获取最近的操作记录
ali-mcpcli call skylark skylark_user_recent '{}'

# 获取最近的文档操作记录
ali-mcpcli call skylark skylark_user_recent '{"type": "doc"}'
```

### 知识库操作

```bash
# 创建知识库
ali-mcpcli call skylark skylark_book_create '{"user_id": <user_or_group_id>, "name": "我的知识库", "slug": "<book_slug>", "description": "知识库简介", "public": "0"}'

# 获取知识库详情
ali-mcpcli call skylark skylark_book_detail '{"book_id": <book_id>}'

# 获取知识库目录树
ali-mcpcli call skylark skylark_book_toc '{"book_id": <book_id>}'

# 更新知识库信息
ali-mcpcli call skylark skylark_book_update '{"book_id": <book_id>, "name": "新名称", "description": "新描述", "public": "1"}'

# 更新目录 - 创建文档节点
ali-mcpcli call skylark skylark_book_toc_update '{"book_id": <book_id>, "action": "insert", "type": "DOC", "title": "新文档", "doc_id": <doc_id>}'

# 更新目录 - 创建分组标题
ali-mcpcli call skylark skylark_book_toc_update '{"book_id": <book_id>, "action": "insert", "type": "TITLE", "title": "分组名"}'

# 更新目录 - 创建外部链接
ali-mcpcli call skylark skylark_book_toc_update '{"book_id": <book_id>, "action": "insert", "type": "LINK", "title": "链接名", "url": "https://example.com", "open_window": "1"}'

# 更新目录 - 移动节点
ali-mcpcli call skylark skylark_book_toc_update '{"book_id": <book_id>, "action": "appendChild", "node_uuid": "<node_uuid>", "target_uuid": "<target_uuid>"}'

# 更新目录 - 删除节点
ali-mcpcli call skylark skylark_book_toc_update '{"book_id": <book_id>, "action": "remove", "node_uuid": "<node_uuid>"}'
```

### 文档操作

```bash
# 创建文档
ali-mcpcli call skylark skylark_doc_create '{"book_id": <book_id>, "body": "# 标题\n\n文档内容", "title": "文档标题", "format": "markdown"}'

# 创建私密文档
ali-mcpcli call skylark skylark_doc_create '{"book_id": <book_id>, "body": "内容", "title": "私密文档", "public": "0"}'

# 创建 Thread 文档并指定子类型
ali-mcpcli call skylark skylark_doc_create '{"book_id": <thread_book_id>, "body": "# 日报\n\n今天的内容", "title": "日报", "sub_type": "daily", "enable_mood_comment": true}'

# 获取文档详情
ali-mcpcli call skylark skylark_doc_detail '{"doc_id": <doc_id>}'

# 获取知识库下的文档列表
ali-mcpcli call skylark skylark_doc_list '{"book_id": <book_id>}'

# 分页获取文档列表
ali-mcpcli call skylark skylark_doc_list '{"book_id": <book_id>, "limit": 50, "offset": 0}'

# 更新文档内容
ali-mcpcli call skylark skylark_doc_update '{"doc_id": <doc_id>, "body": "# 新内容\n\n更新后的内容"}'

# 更新文档标题
ali-mcpcli call skylark skylark_doc_update '{"doc_id": <doc_id>, "title": "新标题"}'

# 更新文档公开性
ali-mcpcli call skylark skylark_doc_update '{"doc_id": <doc_id>, "public": "1"}'

# 获取文档评论
ali-mcpcli call skylark skylark_doc_comments '{"doc_id": <doc_id>}'

# 分页获取评论
ali-mcpcli call skylark skylark_doc_comments '{"doc_id": <doc_id>, "limit": 20, "lastId": <comment_last_id>}'

# 获取文档点赞列表
ali-mcpcli call skylark skylark_doc_likes '{"doc_id": <doc_id>}'
```

### 搜索操作

```bash
# 搜索文档
ali-mcpcli call skylark skylark_search '{"q": "关键词"}'

# 分页搜索
ali-mcpcli call skylark skylark_search '{"q": "关键词", "pageNo": 1, "pageSize": 20}'

# 在指定知识库中搜索
ali-mcpcli call skylark skylark_search '{"q": "关键词", "scope": "<book_namespace>"}'
```

### 数据表操作

```bash
# 查看当前数据表能力
ali-mcpcli call skylark skylark_table_call '{"action": "meta.describe"}'

# 列出文档下的数据表
ali-mcpcli call skylark skylark_table_call '{"action": "table.list", "doc_id": <table_doc_id>}'

# 读取指定 sheet 的元信息
ali-mcpcli call skylark skylark_table_call '{"action": "table.get", "doc_id": <table_doc_id>, "sheet_id": "<sheet_id>"}'
```

### URL 解析

```bash
# 解析语雀 URL
ali-mcpcli call skylark skylark_resolve_url '{"url": "https://yuque.antfin.com/<namespace>/<book_slug>/<doc_slug>"}'

# 返回示例：{"type": "doc", "id": <doc_id>} 或 {"type": "book", "id": <book_id>}
```

## 工作流程

1. `ali-mcpcli info skylark <tool>` - 查看目标工具 schema
2. `ali-mcpcli call skylark <tool> '{}'` - 执行实际调用
3. 只有失败时才运行 `bash ./scripts/check-env.sh` 或 `bash ./scripts/ensure-env.sh`

对写操作，额外遵循：

- 先解析 URL 或读取详情，拿到稳定的 `book_id` / `doc_id`
- 先读取现状，再做增量修改
- 涉及目录层级时，先用 `skylark_book_toc` 定位父节点 `node_uuid`
- 新建文档后，优先使用创建返回的 `node_uuid`；父节点则仍以 TOC 中已确认的 `target_uuid` 为准
- 只有在父节点 `node_uuid` / `target_uuid` 已确认时，才执行 `skylark_book_toc_update`
- 修改后尽量再次读取目标对象，确认结果

## 失败时怎么处理

遇到失败不要盲目重试，先归类：

- `command not found`：缺少本地工具，先补安装
- `skylark not reachable` / `offline`：优先检查 `utoo-proxy`、内网/VPN、日志
- 4402 未监听：本地 SSO 流程可能没起来，可尝试浏览器授权；若仍失败，停止并说明环境受阻
- 认证失败（401/未登录）：提示重新认证，不继续写操作
- 权限不足（403）：提示用户确认文档/知识库权限，不假设可越权
- `429` / `Too Many Requests` 且 `retryable=true`：视为上游限流，间隔后有限重试，不立刻跑安装脚本
- 新建文档后目录位置不对：先接受“新建默认落顶层”这个事实，再通过 `skylark_book_toc_update` 显式移动
- 新建文档后 TOC 里暂时看不到新节点：优先使用创建返回的 `node_uuid`，并把 `book_toc` 视为可能有短暂同步延迟
- 新建/更新后 `skylark_search` 查不到：优先视为搜索索引延迟，不要据此判断文档不存在
- 目录放错 / 找不到目标节点：先重新读取 TOC；若目标父节点不存在或不唯一，停止猜测并向用户确认
- 网络超时：最多重试一次；仍失败则报告为环境问题

详细排查方法和命令见 **[reference.md](./reference.md)**。

## 注意事项

1. 需内网环境或 VPN
2. 首次使用可能自动弹窗授权；若未弹窗且调用失败，优先检查 4402 端口和本地 SSO 服务
3. 域名统一写成 `yuque.antfin.com`；若输入是 `yuque.alibaba-inc.com` 或 `aliyuque.antfin.com`，先转换
4. 文档正文使用 Markdown 格式
5. 知识库 slug 需符合格式要求（字母、数字、下划线、中划线、点号、加号）
6. book_id 和 doc_id 都是数字类型
7. 推荐使用 book_id/doc_id 模式的工具，不推荐使用 namespace/slug 模式
8. 目录操作支持多种动作类型，可灵活组织知识库结构
9. 如果环境未通过“最小可用检查”，只能输出命令与排查建议，不能声称已读写成功
10. 目录位置必须以 TOC 的 `node_uuid` 为准，不能靠标题或 `doc_id` 直接猜父节点
11. `skylark_search` 不适合做刚创建文档的即时验证，优先使用 `skylark_doc_list`、`skylark_book_toc` 或 `skylark_user_recent`
12. `DOC` 节点可以作为目录容器；是否可挂子节点，以 TOC 实际结构为准，不以类型名猜测
