# 协议信息区组件

展示预订相关协议、须知信息的区域，包含信用授权须知、入离时间、订房必读等。

**AI 可配置项**: 增删协议项 / 修改协议内容 / 配置链接

## 规范参数（@2x）

### 容器 `.agreement-section`

| 属性 | 值 |
|------|------|
| 内边距 | 24px 0 |
| 文本对齐 | left |

### 协议项 `.agreement-item`

| 属性 | 值 |
|------|------|
| 布局 | `flex; align-items: flex-start; gap: 12px` |
| 下间距 | 18px |

### 协议图标 `.agreement-icon`

| 属性 | 值 |
|------|------|
| 尺寸 | 32px x 32px |
| 颜色 | var(--color-indigo-1) |
| 上间距 | 4px |

### 协议文本 `.agreement-text`

| 属性 | 值 |
|------|------|
| 字号 | 24px |
| 颜色 | var(--color-midgray) |
| 行高 | 1.6 |
| 文本对齐 | left |

### 协议标题

使用 `<strong>` 标签包裹

### 协议链接 `.agreement-link`

颜色: var(--color-indigo-1); 文本装饰: underline

### 使用的图标资源

| 图标 | 文件路径 |
|------|------|
| 信用授权须知 | assets/信用授权须知.png |
| 入离时间 | assets/入离时间.png |
| 订房必读 | assets/订房必读.png |

完整 HTML 结构详见 [example.html](example.html)。
