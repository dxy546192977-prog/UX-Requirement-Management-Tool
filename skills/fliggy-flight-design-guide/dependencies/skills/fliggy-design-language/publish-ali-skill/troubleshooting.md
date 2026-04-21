# 常见问题排查

## YAML Frontmatter 相关

### "No valid skills found. Skills require a SKILL.md with name and description."

**原因**：SKILL.md 的 YAML frontmatter 解析失败。

**排查步骤**：

1. 确认 `---` 在文件第一行（前面没有空行、BOM 字符）
2. 确认 `description` 的值用**双引号**包裹
3. 确认 `name` 和 `description` 都存在

**错误示例**：
```yaml
---
name: my-skill
description: 这是一个skill（支持多种功能）：包括A、B和C。
---
```

**正确示例**：
```yaml
---
name: my-skill
description: "这是一个skill（支持多种功能）：包括A、B和C。"
---
```

中文描述中的括号 `（）`、冒号 `：`、引号 `「」` 等字符在 YAML 中是特殊字符，不加引号会导致解析失败。

### name 格式不合法

**规则**：
- 只允许：小写字母 `a-z`、数字 `0-9`、连字符 `-`
- 最大 64 字符
- 不允许：大写字母、下划线、中文、空格

**错误**：`name: My_Skill` / `name: 我的skill`
**正确**：`name: my-skill`

---

## SSH 认证相关

### "Permission denied (publickey)"

**原因**：本机 SSH 密钥未添加到 code.alibaba-inc.com。

**解决**：
```bash
# 1. 生成密钥（如果没有）
ssh-keygen -t ed25519 -C "域账号@alibaba-inc.com"

# 2. 复制公钥
cat ~/.ssh/id_ed25519.pub | pbcopy   # macOS
cat ~/.ssh/id_ed25519.pub            # 手动复制

# 3. 添加到 GitLab
# 打开 https://code.alibaba-inc.com/-/profile/keys
# 粘贴公钥，保存

# 4. 验证
ssh -T git@code.alibaba-inc.com
```

### SSH 密钥存在但连接失败

检查 `~/.ssh/config` 是否有针对 code.alibaba-inc.com 的配置冲突，或密钥文件名不是默认名称。如果密钥不是默认路径，添加配置：

```
Host code.alibaba-inc.com
  IdentityFile ~/.ssh/id_ed25519
  IdentitiesOnly yes
```

---

## Git Push 相关

### "remote rejected - email is not valid"

**原因**：code.alibaba-inc.com 要求 commit 的 author email 是合法的公司邮箱。

**解决**：
```bash
# 设置正确的邮箱
git config user.email "域账号@alibaba-inc.com"

# 修改最后一次 commit 的 author
git commit --amend --reset-author --no-edit

# 重新推送
git push origin master
```

### "failed to push some refs"

**可能原因**：
1. 远端仓库不是空的（有 README 等），导致历史不一致
   → `git pull --rebase origin master` 然后再 push
2. 分支名不对（本地 master，远端 main）
   → `git push -u origin master:main`

---

## 安装相关

### 安装后 skill 没生效

**排查步骤**：
1. 确认安装位置：`npx ali-skills ls -g`
2. 确认 agent 的 skills 目录中是否有对应文件（检查 symlink 是否正确）
3. 重启 agent（如 Claude Code、Cursor）
4. 确认 SKILL.md 中的 `description` 包含正确的触发词

### 其他人无法安装

**检查仓库权限**：
- 仓库应设为 internal 或 public
- 或者将 `fliggy-edith` 账号添加为仓库成员（至少 Reporter 权限）

### 安装命令格式

```bash
# 内网 GitLab（code.alibaba-inc.com）— 使用 group/project 简写
npx ali-skills add <group>/<project> -s <skill-name> -g -y

# GitHub — 需要加 --github 或用完整 URL
npx ali-skills add <owner>/<repo> --github -s <skill-name> -g -y

# 完整 URL
npx ali-skills add https://code.alibaba-inc.com/<group>/<project> -g -y

# 安装仓库中所有 skill
npx ali-skills add <group>/<project> --all
```
