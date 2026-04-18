# 语雀 Skylark 工具与安装参考

本 skill 依赖 **ali-mcpcli**（调用 `skylark` MCP）与 **UtooProxy**（连接阿里内网 MCP）。
`ali-mcpcli` 现在是 `node` 脚本版本，所以机器上要先有 `node` 和 `npm`。

`bash ./scripts/ensure-env.sh`。该脚本会检测依赖、自动安装缺失项，并完成最小检查。只在调用已经失败、且确认需要安装缺失依赖或重建环境时使用。

`bash ./scripts/check-env.sh`。该脚本不安装、不改配置，只输出当前环境状态。

## 最小检查步骤

默认不要先跑脚本，先直接调用目标工具。只有失败后再进入下面的排查流程：

```bash
bash ./scripts/check-env.sh
```

判定建议：

- `check-env.sh` 显示缺依赖：再运行 `bash ./scripts/ensure-env.sh`
- `check-env.sh` 显示依赖齐全但工具仍失败：优先排查认证、权限、网络、限流
- `ensure-env.sh` 成功返回：依赖齐全，`skylark` 可见，`skylark_user_info` 已确认可用

## CLI 查询方式

`ali-mcpcli` 当前没有单独的 `help skylark` 子命令。查看可用 API 和参数时，直接使用 `info`：

```bash
ali-mcpcli info skylark
ali-mcpcli info skylark skylark_doc_create
ali-mcpcli info skylark skylark_book_toc_update
ali-mcpcli info skylark skylark_table_call
```

建议规则：

- 查全部工具：`ali-mcpcli info skylark`
- 查单个工具 schema：`ali-mcpcli info skylark <tool>`
- 文档与 CLI 输出不一致时：以当次 `info` 输出为准

## 2026-04-15 API 速查

当前 `ali-mcpcli info skylark` 显示 `23` 个工具。

- 已做真实 CLI 调用验证：用户、知识库、文档、TOC、搜索相关 22 个工具
- 已做 schema 核对：`skylark_table_call`

### 用户与定位

| 工具 | 用途 | 关键参数 / 备注 |
|------|------|-----------------|
| `skylark_user_info` | 获取当前登录用户信息 | 无参数 |
| `skylark_user_groups` | 获取团队列表 | `role` 可按管理员/成员过滤 |
| `skylark_user_book_list` | 获取知识库列表 | 除分页外，还支持 `query`、`type=Book/Thread`、`scene`、`user_type` |
| `skylark_user_recent` | 获取最近访问记录 | `type` 支持 `doc,book,group` 过滤 |
| `skylark_resolve_url` | 解析知识库或文档 URL | 输入统一用 `https://yuque.antfin.com/...` |

### 知识库与 TOC

| 工具 | 用途 | 关键参数 / 备注 |
|------|------|-----------------|
| `skylark_book_create` | 创建知识库 | 支持 `type=Book/Thread` |
| `skylark_book_detail` | 获取知识库详情 | `book_id` 必填 |
| `skylark_book_update` | 更新知识库 | 按 `book_id` 更新，优先使用这一组接口 |
| `skylark_book_toc` | 读取目录树 | 目录定位必须依赖它返回的 `node_uuid` |
| `skylark_book_toc_update` | 修改目录树 | `action` 必填；移动节点时用 `node_uuid` + `target_uuid` |

### 文档

| 工具 | 用途 | 关键参数 / 备注 |
|------|------|-----------------|
| `skylark_doc_create` | 在知识库下创建文档 | 支持 `enable_mood_comment`、`sub_type`；创建返回值实测含 `node_uuid` |
| `skylark_doc_detail` | 读取文档正文 | `doc_id` 必填 |
| `skylark_doc_list` | 列出知识库文档 | 适合做写后确认 |
| `skylark_doc_update` | 更新文档 | 支持 `enable_mood_comment`、`sub_type` |
| `skylark_doc_comments` | 读取评论列表 | 空数组是正常返回 |
| `skylark_doc_likes` | 读取点赞列表 | 空数组是正常返回 |
| `skylark_search` | 搜索有权限的文档 | 适合旧文档搜索，不适合刚写完的即时验证 |

### 表格

| 工具 | 用途 | 关键参数 / 备注 |
|------|------|-----------------|
| `skylark_table_call` | 统一数据表 API 入口 | `action` 必填；首次建议 `meta.describe`；`payload` 为动作参数 |

### 兼容旧接口

| 工具 | 用途 | 建议 |
|------|------|------|
| `skylark_user_book_update` | 按 `namespace` 更新知识库 | 兼容旧调用，优先改用 `skylark_book_update` |
| `skylark_user_doc_create` | 按 `namespace` 创建文档 | 兼容旧调用，优先改用 `skylark_doc_create` |
| `skylark_user_doc_detail` | 按 `namespace + slug` 读取文档 | 兼容旧调用，优先改用 `skylark_doc_detail` |
| `skylark_user_doc_list` | 按 `namespace` 列文档 | 兼容旧调用，优先改用 `skylark_doc_list` |
| `skylark_user_doc_update` | 按 `namespace + slug` 更新文档 | 兼容旧调用，优先改用 `skylark_doc_update` |

## 关键参数补充

| 工具 | 关键参数 | 说明 |
|------|----------|------|
| `skylark_user_book_list` | `query` | 知识库名称模糊搜索 |
| `skylark_user_book_list` | `type` | `Book` 为普通知识库，`Thread` 为话题库 |
| `skylark_user_book_list` | `scene` | 仅 `type=Thread` 时有效，支持 `normal`、`cycle_thread`、`punch_in_thread` |
| `skylark_book_create` | `type` | 不传默认普通知识库；传 `Thread` 创建话题库 |
| `skylark_doc_create` / `skylark_doc_update` | `enable_mood_comment` | 仅 Thread 文档支持 |
| `skylark_doc_create` / `skylark_doc_update` | `sub_type` | 仅 Thread 文档支持；可选 `default`、`daily`、`weekly`、`vote`、`punchIn`、`meeting` |
| `skylark_book_toc_update` | `node_uuid` | 被操作的节点；移动、编辑、删除时必填 |
| `skylark_book_toc_update` | `target_uuid` | 目标或参照节点；根级通常为 `null` |
| `skylark_table_call` | `action` | 首次建议 `meta.describe`，再按返回能力选择动作 |
| `skylark_table_call` | `doc_id` / `sheet_id` | 除 `meta.describe`、`table.list`、`table.create` 外，大多动作都需要 |
| `skylark_table_call` | `payload` | 各动作参数统一放在对象里，如 `fields`、`data`、`record_id`、`value` |

## 新参数示例

以下命令中的 `<book_id>`、`<doc_id>`、`<group_id>`、`<sheet_id>`、`<book_namespace>` 都是占位符，执行前先替换成实际值。

常见占位符含义与获取方式：

| 占位符 | 含义 | 先用什么拿 |
|--------|------|------------|
| `<group_id>` | 团队 ID | `skylark_user_groups` |
| `<book_id>` | 知识库 ID | `skylark_resolve_url`、`skylark_user_book_list` |
| `<thread_book_id>` | 话题库的知识库 ID | `skylark_user_book_list`，并过滤 `type=Thread` |
| `<doc_id>` | 文档 ID | `skylark_resolve_url`、`skylark_doc_list` |
| `<table_doc_id>` | 承载数据表的文档 ID | `skylark_resolve_url`、`skylark_doc_list` |
| `<book_namespace>` | 知识库 namespace | 知识库 URL，或先 `skylark_resolve_url` 再回读知识库信息 |
| `<sheet_id>` | 数据表 sheet ID | `skylark_table_call` 的 `meta.describe`、`table.list`、`table.get` |

规则：

- 不要把 `<book_id>` 这类占位符原样传给 CLI
- 用户提供 URL 时，先调用 `skylark_resolve_url`
- 用户未提供 URL 时，先用列表接口拿真实 ID

```bash
# 按名称模糊搜索知识库
ali-mcpcli call skylark skylark_user_book_list '{"query":"个人知识库"}'

# 查询指定团队下的知识库
ali-mcpcli call skylark skylark_user_book_list '{"group_id": <group_id>}'

# 仅列出话题库
ali-mcpcli call skylark skylark_user_book_list '{"type":"Thread"}'

# 创建 Thread 文档并指定子类型
ali-mcpcli call skylark skylark_doc_create '{"book_id": <thread_book_id>, "title": "日报", "body": "# 日报", "sub_type": "daily", "enable_mood_comment": true}'

# 在指定知识库中搜索
ali-mcpcli call skylark skylark_search '{"q":"关键词", "scope":"<book_namespace>"}'

# 查看当前数据表能力说明
ali-mcpcli call skylark skylark_table_call '{"action":"meta.describe"}'

# 列出文档下的数据表
ali-mcpcli call skylark skylark_table_call '{"action":"table.list", "doc_id": <table_doc_id>}'

# 读取指定 sheet 的数据表信息
ali-mcpcli call skylark skylark_table_call '{"action":"table.get", "doc_id": <table_doc_id>, "sheet_id":"<sheet_id>"}'
```

## 最近实测结论

基于真实 CLI 调用验证的行为：

- `skylark_doc_create` / `skylark_user_doc_create`：新文档会先出现在 TOC 顶层
- `skylark_doc_create`：返回值实测包含 `node_uuid`，可直接用于后续目录移动
- `skylark_book_toc_update`：在 `node_uuid` 和 `target_uuid` 明确时，`appendChild` 可以把文档正确挂到 `TITLE` 或 `DOC` 容器下
- `DOC` 节点：只要真实出现在 TOC 树里，就可能是可挂子节点的目录容器
- `skylark_user_doc_update`：按 `namespace + slug` 原地更新，`id` 与 `slug` 保持不变
- `skylark_resolve_url`：可正确解析 `https://yuque.antfin.com/<namespace>` 和文档 URL
- `skylark_search`：对刚创建/刚更新的文档返回空结果，不能作为即时确认依据

因此目录相关操作推荐顺序是：

1. 创建文档
2. 记录创建返回值中的 `node_uuid`
3. 读取 `skylark_book_toc`
4. 找到目标容器节点的 `target_uuid`
5. 调用 `skylark_book_toc_update`
6. 再次读取 `skylark_book_toc` 做最后确认

如果需要手动拆开排查，再执行：

```bash
bash ./scripts/check-env.sh
ali-mcpcli info skylark
ali-mcpcli call skylark skylark_user_info '{}'
```

## ali-mcpcli

先确认：

```bash
node --version
npm --version
```

```bash
npm install -g @ali/mcpcli --registry=https://registry.anpm.alibaba-inc.com
```

验证：`command -v ali-mcpcli` 或 `ali-mcpcli --version`

## UtooProxy

UtooProxy 是连接阿里内网 MCP 服务器的网络代理工具。

### 安装

```bash
curl -L -o- https://registry.antgroup-inc.cn/@alipay/utoo-proxy/latest/files/setup.sh | bash && xattr -c ~/.utoo-proxy/utoo-proxy 2>/dev/null || true
```

### 安装位置

| 位置 | 说明 |
|------|------|
| `~/.utoo-proxy/utoo-proxy` | 二进制文件 |
| `/usr/local/bin/utoo-proxy` | 软链接 |

### 验证安装

```bash
# 检查二进制文件
ls -la ~/.utoo-proxy/utoo-proxy

# 检查版本
~/.utoo-proxy/utoo-proxy --version
```

### 系统支持

| 系统 | 架构 |
|------|------|
| macOS | x86_64 / aarch64 (M1/M2) |
| Linux | x86_64 |
| Windows | x86_64 |

### 认证机制

1. **自动认证**: 从本地 SSO 服务 (端口 4402) 获取 token
2. **浏览器弹窗**: 本地服务无响应时触发 OAuth 授权
3. **Token 存储**: 系统 keyring + `~/.config/ali-mcpcli/`

**依赖**: `AliLangCl` 需运行并监听端口 4402

### 故障排查

建议先按“本地工具 -> 网络/proxy -> 认证 -> 权限”顺序排查，不要在写操作上盲目重试。

#### 快速判断表

| 现象 | 常见原因 | 先做什么 |
|------|----------|----------|
| `command not found: ali-mcpcli` | CLI 未安装 | 安装 `@ali/mcpcli`，再跑 `ali-mcpcli --version` |
| `missing: utoo-proxy` | Proxy 未安装或不在 PATH | 安装/修复 `utoo-proxy`，确认二进制存在 |
| `warn: port 4402 not listening` | 本地 SSO 服务未运行 | 先尝试浏览器授权；若仍失败，检查 `AliLangCl` |
| `ali-mcpcli info skylark` 失败 | 内网/VPN、proxy、server 不可达 | 检查 VPN、`utoo-proxy` 日志、重试 `info skylark` |
| `skylark_user_info` 失败 | 登录失效、未授权、权限不足 | 区分 401/403/超时，再按下文处理 |
| 请求超时 | 网络波动、proxy 异常 | 最多重试一次，仍失败就停止并报告 |

#### 状态 offline 但不弹窗授权

```bash
# 重装并清理隔离标记
curl -L -o- https://registry.antgroup-inc.cn/@alipay/utoo-proxy/latest/files/setup.sh | bash && xattr -c ~/.utoo-proxy/utoo-proxy 2>/dev/null || true

# 检查 AliLangCl 进程
lsof -i :4402

# 查看日志
cat ~/.utoo-proxy/utoo-proxy_$(date +%Y-%m-%d).log
```

如果 `ali-mcpcli info skylark` 依然失败，通常不是语雀权限问题，而是 MCP 连通性还没恢复。

#### macOS "Operation not permitted"

**原因**: `com.alibaba.security.edr.quarantine` 隔离标记

**解决**:
```bash
xattr -d com.alibaba.security.edr.quarantine ~/.utoo-proxy/utoo-proxy
# 或移除所有扩展属性
xattr -c ~/.utoo-proxy/utoo-proxy
```

#### 连接失败

1. 确保在内网环境或已连接 VPN
2. 检查日志: `~/.utoo-proxy/utoo-proxy_*.log`
3. 确认 `AliLangCl` 运行正常
4. 再次执行 `ali-mcpcli info skylark`

#### 认证失败 / 未登录

常见现象：

- `401`
- `unauthorized`
- `login required`
- `skylark_user_info` 调用时提示需要认证

建议处理：

1. 优先重新执行 `ali-mcpcli call skylark skylark_user_info '{}'`
2. 如果会触发浏览器授权，完成授权后重试
3. 如果不弹窗，检查 `lsof -i :4402`
4. 仍失败时，查看 `~/.utoo-proxy/utoo-proxy_*.log`

原则：认证未恢复前，不继续任何写操作。

#### 权限不足

常见现象：

- `403`
- `forbidden`
- 只能看到部分知识库/文档
- 能读不能写

建议处理：

1. 先用 `skylark_resolve_url` + `skylark_doc_detail` / `skylark_book_detail` 确认目标对象存在
2. 让用户确认自己是否在对应团队/知识库内
3. 不要假设可以越权，不要反复重试写操作

#### 目录层级放错 / 容器找错

常见现象：

- 文档被放到顶层，而不是预期目录下
- Agent 说“正确目录应该在某个节点下”，但又找不到对应 TOC 节点
- 根据 `doc_id` 或标题猜父节点，结果放错层级

建议处理：

1. 先接受“新建文档默认落顶层”这一点，不要假设创建时就会自动进入目标目录
2. 调用 `skylark_book_toc`，直接从当前 TOC 树读取 `node_uuid`
3. 找到目标容器节点后，再用 `skylark_book_toc_update` 的 `appendChild` / `prependChild`
4. 如果目标容器节点不存在、重名或不唯一，停止猜测并向用户确认完整路径
5. 移动后再次调用 `skylark_book_toc` 验证

#### 搜索查不到刚创建的文档

常见现象：

- `skylark_search` 返回空数组
- `doc_list`、`book_toc`、`user_recent` 已经能看到新文档

建议处理：

1. 先不要把空搜索结果当成“文档不存在”
2. 优先使用 `skylark_doc_list`、`skylark_book_toc`、`skylark_user_recent` 验证
3. 把 `skylark_search` 当成会晚一点生效的搜索能力，不要拿它做写后立刻确认

#### 网络超时 / 请求卡住

常见现象：

- `timeout`
- `ETIMEDOUT`
- `socket hang up`
- `ECONNRESET`

建议处理：

1. 确认 VPN / 内网稳定
2. 查看 `~/.utoo-proxy/utoo-proxy_*.log`
3. 最多重试一次最小验证命令

```bash
ali-mcpcli info skylark
ali-mcpcli call skylark skylark_user_info '{}'
```

仍失败时，直接报告环境阻塞，不要声称 API 已验证成功。

### 手动下载

```bash
# macOS aarch64 (M1/M2)
curl -L -o ~/.utoo-proxy/utoo-proxy \
  https://registry.antgroup-inc.cn/@alipay/utoo-proxy/latest/files/dist/macos-aarch64/utoo-proxy
chmod +x ~/.utoo-proxy/utoo-proxy
xattr -c ~/.utoo-proxy/utoo-proxy 2>/dev/null || true
```

## 自动安装缺的依赖（默认）

仅在确认缺依赖或环境已损坏时执行脚本：

```bash
bash ./scripts/ensure-env.sh
```

如果需要手动一步一步安装缺的依赖，再执行下面这段；已安装则自动跳过，避免重复安装：

```bash
# ali-mcpcli
if ! command -v ali-mcpcli >/dev/null 2>&1; then
  npm install -g @ali/mcpcli --registry=https://registry.anpm.alibaba-inc.com
fi

# UtooProxy：PATH（如 /usr/local/bin/utoo-proxy）或默认目录
UTOO_BIN=""
if command -v utoo-proxy >/dev/null 2>&1; then
  UTOO_BIN="$(command -v utoo-proxy)"
elif [ -x "${HOME}/.utoo-proxy/utoo-proxy" ]; then
  UTOO_BIN="${HOME}/.utoo-proxy/utoo-proxy"
fi
if [ -z "$UTOO_BIN" ]; then
  curl -L -o- https://registry.antgroup-inc.cn/@alipay/utoo-proxy/latest/files/setup.sh | bash && xattr -c ~/.utoo-proxy/utoo-proxy 2>/dev/null || true
fi
```

## 使用约束

- 默认先直接调用目标工具
- `bash ./scripts/check-env.sh` 仅用于只读排查
- `bash ./scripts/ensure-env.sh` 仅在失败后用于安装缺失依赖和最小检查
- 未通过最小检查前，只输出命令和排查建议，不宣称已成功访问 Skylark
- 对写请求，先读后写，写后再读回确认
