# 选择器组件

对话流中的选择操作组件（可配置固定组件），采用 2 列网格布局展示可选项，底部带确认按钮。**无白色卡片包裹**，直接渲染在页面背景（var(--color-label)）上。

**AI 可配置项**: 修改选项文案 / 增删选项（网格自动调整行数） / 设置默认选中 `.is-active` / 修改确认按钮文案

## 规范参数（@2x）

### 组件容器 `.selector-component`

| 属性 | 值 |
|------|------|
| 宽度 | 690px |
| 背景 | **无**（透明，渲染在 var(--color-label) 页面背景上） |
| 上内边距 | 24px |
| 布局 | `flex-direction: column` |
| 内部间距 | **24px**（网格与确认按钮之间） |

### 选项网格 `.selector-grid`

布局: `display: grid`; 列定义: `repeat(2, 1fr)`; 网格间距: **18px**

### 单个选项 `.selector-option`

| 属性 | 值 |
|------|------|
| 高度 | **84px** |
| 内边距 | 12px |
| 背景色 | **var(--color-white)** |
| 边框 | `1px solid rgba(15, 19, 26, 0.12)` |
| 圆角 | **var(--radius-l)** |
| 字号 | 28px |
| 字重 | 500 |
| 颜色 | **#000000** |
| 对齐 | `justify-content: center; align-items: center` |
| 过渡 | `transition: background-color 0.2s ease, border-color 0.2s ease` |

### 选中状态 `.selector-option.is-active`

背景色: **var(--color-indigo-4)**; 边框和文字颜色不变（仅背景色区分选中态）

### 确认按钮 `.confirm-button`

| 属性 | 值 |
|------|------|
| 宽度 | 100% |
| 高度 | **80px** |
| 背景色 | **var(--color-indigo-4)** |
| 圆角 | **var(--radius-l)** |
| 字号 | 26px |
| 字重 | 500 |
| 颜色 | **var(--color-indigo-1)** |
| 边框 | none |
| hover | `background-color: #dcdbff` |

完整 HTML 结构详见 [example.html](example.html)。
