# 出行信息模块

出行信息模块用于展示乘机人、证件、票号、联系手机、邮箱以及行程发送入口。整体以统一白底列表承接，可包含编辑和复制动作。

**AI 可配置项**：修改 section 标题 / 配置 1~N 位乘机人 / 配置是否可修改姓名证件 / 配置票号复制 / 配置手机号与邮箱提示文案 / 配置发送行程入口文案

## 模块结构

### 1. 模块标题栏 `.travel-info-header`

| 属性 | 值 |
|------|------|
| 宽度 | 750px |
| 高度 | 82px |
| 背景色 | var(--color-white) |
| 内边距 | 24px |
| 标题字号 | 28px / 500 |

### 2. 信息行 `.info-row`

统一的左右两列结构，左列是标签，右列是内容区。

| 属性 | 值 |
|------|------|
| 内边距 | `24px` |
| 背景色 | var(--color-white) |
| 标签宽度 | 72px / 96px / 144px 按内容选择 |
| 标签样式 | 24px / 400 / var(--color-midgray) |
| 内容区 | `flex: 1; display: flex; flex-direction: column; gap: 18px;` |

### 3. 乘机人块 `.traveler-stack`

适用于姓名、证件、票号一组组合信息。

#### 可选动作

- `.edit-link`：蓝色修改入口
- `.copy-link`：蓝色复制入口

### 4. 联系方式块

手机号、邮箱遵循同样的左右两列布局。邮箱下方可带灰色说明文案。

### 5. 行程发送入口 `.send-itinerary-row`

| 属性 | 值 |
|------|------|
| 高度 | 86px |
| 布局 | `flex; justify-content: space-between; align-items: center` |
| 左侧 | icon + 标题 |
| 右侧 | 蓝色文字链 “去发送” |

完整 HTML 结构详见 [example.html](example.html)。
