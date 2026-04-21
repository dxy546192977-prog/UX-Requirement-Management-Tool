# skill上传更新说明

## 1. 这次迭代的核心结论

- skill 对外统一名称为 `fliggy design system`
- `SKILL.md` 里的发布标识统一为 `fliggy-design-system`
- 作者信息必须显式写在 `SKILL.md` frontmatter 中，否则平台可能展示为发布账号或平台账号
- Ali Skills 列表和详情页最终读取的是远端仓库主干分支内容，不是本地文件，也不是临时分支
- 详情页不是只看 `SKILL.md`，还会明显受 `README.md` 内容影响；README 过空时，点进去就像“空页面”
- 受保护分支不能直接 push 时，必须走分支 + Code Review + 合并

## 2. 当前这套 skill 的正确元信息

`SKILL.md` 头部至少保持下面这些字段：

```yaml
---
name: "fliggy-design-system"
description: "设计飞猪移动端 UI 页面与前端原型；当用户需要飞猪风格的频道、列表、详情、下单、AI 页面、AI IM 对话或交易型移动端界面时触发。"
version: 1.0.1
author:
  empId: "250554"
  nickname: "景桐"
disable-model-invocation: false
---
```

关键点：

- `name` 必须是英文且稳定，建议始终用 `fliggy-design-system`
- `author.empId` 和 `author.nickname` 必须写，作者展示优先读这里
- `version` 要跟随每次有效发布递增
- `README.md` 不能空，至少要写清楚 Overview、Quick Start、Usage、Included Files

## 2.1 外部图片资源的新增规则

- 当前 skill 已补充“真实图片优先”逻辑
- 需要图片时，优先输出与业务场景相关的真实图片，不用空白占位图
- 酒店页面优先酒店外观、客房、泳池、大堂
- 门票页面优先景点、乐园、演出现场
- 机票页面优先机场、机舱、目的地
- 如果运行环境可联网且用户提供了平台 key，优先通过 Pexels、Unsplash 等图库检索真实图片
- 搜索词要优先使用实体词 + 业务词，例如迪士尼门票页优先 `Disneyland castle fireworks ticket`
- API key 只能作为运行时配置使用，不能写入 `SKILL.md`、示例代码、仓库文件或提交记录

## 2.2 依赖与按钮规则的新增要求

- 文档中必须明确写出本 skill 依赖 `aone-kit` CLI
- 安装命令固定为 `npm install -g @ali/aone-kit --registry=https://registry.anpm.alibaba-inc.com`
- 检查命令固定为 `which aone-kit`
- 普通主按钮默认黄底黑字
- `预订`、`立即抢`、`支付` 三类强交易按钮优先红底白字

## 3. 平台一：Aone Skill 平台上传/更新方法

这个平台对应的是通过 `aone-kit skill publish` 发布的链路。

### 标准准备

1. 进入 skill 根目录
2. 确保目录里有合法的 `SKILL.md`
3. 确保没有业务无关的 `package.json`
4. 先做一次 dry run

命令：

```bash
cd /path/to/fliggy-design-system
aone-kit skill publish --dry-run
```

如果 dry run 没问题，再正式发布：

```bash
aone-kit skill publish
```

如果需要显式指定 dist-tag：

```bash
aone-kit skill publish --tag latest
```

### 登录问题处理

如果默认 HOME 目录权限有问题，出现类似：

```bash
Failed to exchange token: EPERM: operation not permitted
```

可以临时切 HOME 到当前工作目录再登录：

```bash
HOME=/Users/jingtong.lc/Documents/Code_Test/Figma aone-kit login
```

### 这次踩过的坑

- `aone-kit` 自身在不传 `--tag` 时默认会用 `latest`
- 但流水线里如果拼出了 `aone-kit skill publish --tag`，说明不是 `aone-kit` 默认值失效，而是外层流水线脚本把空变量拼进去了
- 也就是说，报错根因是“流水线变量为空”，不是 skill 内容本身有问题

## 4. 平台二：Ali Skills 列表收录/安装方法

这个平台对应的是通过 `npx ali-skills add ...` 被公共账号拉取、安装、索引、上报的链路。

### 仓库必须满足的条件

1. 仓库主干分支存在有效 `SKILL.md`
2. 仓库主干分支最好同时有完整 `README.md`
3. 仓库对外可访问
4. 如果不是完全公开链路，至少要给公共账号 `fliggy-edith` 授权

### 最关键结论

只要别人或你自己成功执行过一次：

```bash
npx ali-skills add aone-open-skill/fliggy-design-system --skill fliggy-design-system
```

平台就会自动收录并上报这个 skill。

### 常用命令

列出仓库里可发现的 skill：

```bash
npx ali-skills add aone-open-skill/fliggy-design-system --list
```

安装指定 skill：

```bash
npx ali-skills add aone-open-skill/fliggy-design-system --skill fliggy-design-system
```

安装到指定 agent：

```bash
npx ali-skills add aone-open-skill/fliggy-design-system --skill fliggy-design-system -a claude-code
```

全量安装：

```bash
npx ali-skills add aone-open-skill/fliggy-design-system --all
```

搜索平台收录情况：

```bash
npx ali-skills find fliggy-design-system
```

### 这次踩过的坑

- 仓库没授权给 `fliggy-edith` 时，`add` 会直接 clone 失败
- 即使本地已经改好了作者和 README，只要远端主干没更新，列表里仍会显示旧作者，详情页仍会显示旧内容
- 不是“发过一次就永久正确”，而是“主干内容 + 平台索引状态”共同决定最终展示

## 5. 为什么这次作者显示成了“Aone开放平台”

根因不是昵称写错，而是平台读到的不是最新主干内容。

需要同时满足：

1. `SKILL.md` frontmatter 里有 `author.empId` 和 `author.nickname`
2. 这份文件已经进入远端主干分支
3. 至少有一次成功的 `ali-skills add` / 平台索引动作重新读取了这个仓库

如果只改了本地、只改了分支、或者 Code Review 没合并，平台仍可能继续显示旧作者。

## 6. 为什么详情页会是空的

高概率是以下原因之一：

- 主干分支还停留在早期极简版 `SKILL.md`
- 仓库主干没有同步完整 `README.md`
- 平台收录时抓到的是旧提交

实践上，想让详情页稳定正常：

- `SKILL.md` 要完整
- `README.md` 要完整
- 两者都必须在主干

## 7. 受保护分支下的正确更新流程

这次仓库主干受保护，不能直接推送，所以正确流程是：

```bash
git clone https://code.alibaba-inc.com/aone-open-skill/fliggy-design-system.git
cd fliggy-design-system
git checkout -b feat/skill-meta
```

同步本地 skill 内容后：

```bash
git add .
git commit -m "feat: enrich skill metadata and docs"
git push origin feat/skill-meta
```

然后：

1. 发起 Code Review / Merge Request
2. 等流水线通过
3. 合并到 `main`
4. 再重新执行一次 `ali-skills add` 或 `ali-skills find` 验证平台收录

## 8. 这次 CI 报错的真实判断方法

报错内容：

```bash
aone-kit skill publish --tag
```

以及：

```bash
Tag name must not be a valid SemVer range
```

这里最重要的判断不是看 Git 仓库的 Tags 页面，而是看流水线最终执行的命令。

### 正确判断

- 如果最终执行命令里是 `aone-kit skill publish`
  - 说明会自动走默认 `latest`
- 如果最终执行命令里是 `aone-kit skill publish --tag latest`
  - 说明显式传了有效 tag
- 如果最终执行命令里是 `aone-kit skill publish --tag`
  - 说明流水线变量展开后为空，这才是本次失败根因

### 本次结论

- 问题不在 `SKILL.md`
- 问题不在仓库 Git Tags 页面
- 问题在 Aone 流水线或其变量配置，把空 tag 拼进了命令

## 9. 下次遇到同类问题的最短处理方式

先做这 6 步：

1. 检查 `SKILL.md` 的 `name / version / author`
2. 检查 `README.md` 是否完整
3. 确认修改是否已经进入远端 `main`
4. 确认仓库是否已授权给 `fliggy-edith`
5. 执行 `npx ali-skills add aone-open-skill/fliggy-design-system --list`
6. 再执行 `npx ali-skills find fliggy-design-system`

如果列表/详情还是旧的，再看是否存在以下问题：

- Code Review 未合并
- 合并后平台索引还没刷新
- 流水线变量把空 `tag` 传给了 `aone-kit skill publish`

## 10. 下次发布前的检查清单

### 内容检查

- `SKILL.md` 英文名正确
- `description` 清楚
- `version` 已更新
- `author.empId = 250554`
- `author.nickname = 景桐`
- `README.md` 不是空壳

### 仓库检查

- 改动已经 push 到远端
- 如果主干受保护，已经发起 Code Review
- 确认最终会合入 `main`

### 平台检查

- Aone 平台 dry run 通过
- `ali-skills add ... --list` 能列出 `fliggy-design-system`
- `ali-skills find fliggy-design-system` 能搜到
- 列表作者显示为“景桐”
- 详情页内容不再是旧空内容

## 11. 推荐的固定操作顺序

以后统一按这个顺序做：

```bash
# 1) 本地改 skill
# 2) 校验
cd /path/to/fliggy-design-system
aone-kit skill publish --dry-run

# 3) 提交到远端分支
git checkout -b feat/update-skill
git add .
git commit -m "feat: update fliggy design system"
git push origin feat/update-skill

# 4) 合并到 main
# 5) 用 ali-skills 触发收录/验证
npx ali-skills add aone-open-skill/fliggy-design-system --list
npx ali-skills add aone-open-skill/fliggy-design-system --skill fliggy-design-system
npx ali-skills find fliggy-design-system
```

## 12. 一句话记忆版

要让 skill 真正“显示正确”，不是只改本地文件，而是要同时做到：

- `SKILL.md` 作者信息正确
- `README.md` 详情内容完整
- 修改已经进入远端主干
- 仓库能被 `fliggy-edith` 拉取
- `ali-skills add` 成功触发平台重新收录
