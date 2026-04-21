---
name: publish-ali-skill
description: "帮助用户将 Agent Skill 发布到 ali-skills 平台（ali-skills.alibaba-inc.com）。当用户提到发布skill、上传skill、把skill传到平台、发布到ali-skills、分享skill给别人用等需求时使用此skill。覆盖从创建仓库到最终安装验证的完整流程。"
---

# 发布 Skill 到 Ali-Skills 平台

## 概述

引导用户将写好的 Skill 发布到 https://ali-skills.alibaba-inc.com/ 平台，让其他同事可以通过 `npx ali-skills add` 安装使用。

## 工作流程

### Step 1: 确认前置条件

先检查用户是否已准备好以下内容：

1. **Skill 文件**：确认用户已有包含 `SKILL.md` 的 skill 目录
2. **GitLab 仓库**：确认用户是否已在 code.alibaba-inc.com 创建仓库

使用 AskUserQuestion 一次性了解：

- skill 文件的位置（路径）
- 是否已创建 code.alibaba-inc.com 仓库（如已创建，获取仓库地址）
- 仓库中是否只放这一个 skill，还是多个 skill 共用一个仓库

### Step 2: 校验 SKILL.md 格式

读取用户的 SKILL.md，检查以下必须项：

**YAML Frontmatter 格式**：
```yaml
---
name: skill-name
description: "skill 的描述内容"
---
```

**校验规则（逐条检查）**：

1. `name` 必须存在，全小写，只允许字母、数字、连字符，不超过 64 字符
2. `description` 必须存在且非空，不超过 1024 字符
3. `description` 的值**必须用双引号包裹** — 这是最常见的问题，中文描述中的括号、引号、冒号等特殊字符会导致 YAML 解析失败
4. frontmatter 的 `---` 必须在文件最开头，前面不能有空行或空格

**可选字段**：
```yaml
author:
  empId: "工号"
  nickname: "花名"
metadata:
  internal: true  # 设为true则不公开展示，仅知道地址的人可安装
```

如果发现问题，直接帮用户修复。

### Step 3: 准备 Git 仓库

#### 3a. 用户还没有仓库

指导用户去 https://code.alibaba-inc.com 创建新仓库，建议：
- 仓库名：`skills`（通用）或具体 skill 名
- 可见性：建议选择 internal 或 public

#### 3b. 用户已有仓库

让用户提供完整的仓库地址（如 `https://code.alibaba-inc.com/xxx/skills`），从中提取 `<group>/<project>` 部分，后续安装命令需要用到。不要假设或使用默认的仓库地址。

#### 3c. 仓库目录结构

**单 skill 仓库**：
```
repo/
├── SKILL.md
├── reference.md (可选)
└── scripts/ (可选)
```

**多 skill 仓库（推荐）**：
```
repo/
├── README.md
├── skill-a/
│   ├── SKILL.md
│   └── ...
└── skill-b/
    ├── SKILL.md
    └── ...
```

CLI 会自动递归搜索所有 `SKILL.md` 文件。搜索路径优先级：`skills/` → `.claude/skills/` → `.cursor/skills/` → 根目录 → 递归全目录。

### Step 4: SSH 认证配置

在推送前检查 SSH 连接：

```bash
ssh -T git@code.alibaba-inc.com
```

**如果失败（Permission denied）**，执行以下流程：

1. 检查是否已有 SSH 密钥：
```bash
ls ~/.ssh/id_ed25519.pub 2>/dev/null || ls ~/.ssh/id_rsa.pub 2>/dev/null
```

2. 如果没有密钥，生成一个：
```bash
ssh-keygen -t ed25519 -C "用户的邮箱" -f ~/.ssh/id_ed25519 -N ""
```

3. 输出公钥内容：
```bash
cat ~/.ssh/id_ed25519.pub
```

4. 指导用户将公钥添加到 GitLab：
   - 打开 https://code.alibaba-inc.com/-/profile/keys
   - 点击「添加SSH密钥」
   - 粘贴公钥内容，保存

5. 用户确认添加后，再次验证连接。

### Step 5: 推送到远端仓库

```bash
cd <仓库目录>

# 配置 Git 用户信息（code.alibaba-inc.com 要求有效的公司邮箱）
git config user.name "用户花名"
git config user.email "域账号@alibaba-inc.com"

# 添加远端（如果还没有）
git remote add origin git@code.alibaba-inc.com:<group>/<project>.git

# 提交并推送
git add -A
git commit -m "feat: add <skill-name> skill"
git push -u origin master
```

**常见推送失败原因**：
- `remote rejected`：email 不是合法的公司邮箱 → 用 `git config user.email` 设置正确邮箱，然后 `git commit --amend --reset-author`
- `Permission denied (publickey)` → 回到 Step 4 配置 SSH
- 分支名不一致 → 尝试 `git push -u origin main`

### Step 6: 安装验证

推送成功后，执行安装命令来验证并自动注册到平台：

```bash
npx ali-skills add <group>/<project> -s <skill-name> -g -y
```

参数说明：
- `<group>/<project>`：用户的 GitLab 仓库路径，从用户提供的仓库地址中提取，会自动解析为 code.alibaba-inc.com
- `-s <skill-name>`：指定安装的 skill 名称，对应 SKILL.md 中的 name 字段
- `-g`：全局安装（安装到 `~/<agent>/skills/`）
- `-y`：跳过交互确认

**验证成功的标志**：
- 输出 `Found 1 skill`（skill 被正确识别）
- 输出 `Installation complete`（安装成功）
- 安装数据同步到平台（`Syncing installation data...`）

如果看到 `No valid skills found`，说明 SKILL.md 格式有问题，回到 Step 2 检查。

### Step 7: 确认上线

安装成功后：
1. 用户的 skill 已自动注册到 https://ali-skills.alibaba-inc.com/ 平台
2. 其他同事可通过以下命令安装：
```bash
npx ali-skills add <group>/<project> -s <skill-name> -g -y
```
3. 在平台搜索页面也可以找到该 skill

告知用户最终的安装命令，方便分享给同事。

## 其他常用 CLI 命令

```bash
# 列出已安装的 skill
npx ali-skills ls -g

# 搜索平台上的 skill
npx ali-skills find <关键词>

# 更新已安装的 skill
npx ali-skills update

# 移除 skill
npx ali-skills rm <skill-name> -g

# 初始化一个新 skill 模板
npx ali-skills init <skill-name>

# 列出仓库中可用的 skill（不安装）
npx ali-skills add <group>/<project> -l
```

## 注意事项

1. **仓库可访问性**：确保仓库为 internal 或 public，或者已授权 `fliggy-edith` 账号读取权限，否则其他人无法安装
2. **默认分支**：CLI 只拉取默认分支（通常是 master 或 main），确保 skill 文件在默认分支上
3. **name 唯一性**：平台上 skill name 应该唯一，建议用 `<领域>-<功能>` 的命名方式
4. **更新 skill**：修改内容后只需 push 到仓库，用户执行 `npx ali-skills update` 即可获取最新版
