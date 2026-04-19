# HTML 到 Figma 交付标准（V1）

## 目标

把“生成了 HTML”升级为“可立即导入 Figma 并继续设计协作”的标准交付。

V1 不直接写 Figma 原生节点，统一采用 HTML to Figma 导入路径。

## 交付包结构

每个需求必须交付一个 `figma_handoff` 包，包含以下内容：

### 1. 工件清单

- `html_files`：可导入的 HTML 文件列表
- `preview_screenshots`：每个页面至少一张全页截图
- `review_summary`：审查结论与阻断项状态
- `import_guide`：导入操作说明

### 2. 最小字段约束

```json
{
  "figma_handoff": {
    "status": "ready",
    "delivery_mode": "html-to-figma",
    "html_files": [
      {
        "page_id": "vertical.flight.home",
        "path": "outputs/flight/home-v1.html"
      }
    ],
    "preview_screenshots": [
      {
        "page_id": "vertical.flight.home",
        "path": "outputs/flight/home-v1.png"
      }
    ],
    "review_summary": {
      "result": "PASS",
      "key_issues": 0,
      "medium_issues": 1
    },
    "import_guide": {
      "plugin_options": [
        "HTML to Figma Importer",
        "html.to.design"
      ],
      "steps": [
        "在 Figma 安装并打开插件",
        "复制 HTML 文件完整内容",
        "粘贴并执行 Convert",
        "导入后在 Figma 精调"
      ]
    }
  }
}
```

## 状态机

`draft -> reviewed -> ready -> imported -> refined`

- `draft`：只生成了 HTML，未审查
- `reviewed`：审查完成，但仍有 Key 问题
- `ready`：可导入 Figma（Key=0）
- `imported`：已导入 Figma
- `refined`：设计师在 Figma 完成精调

## 审查同步规则

交付包中的 `review_summary` 必须与设计审查结论一致：

- 如果 `key_issues > 0`，`status` 不能是 `ready`
- 如果结论为 `FAIL`，必须阻断导入建议
- 如果结论为 `PASS_WITH_NOTES`，需列出 remaining notes

## 导入说明模板

```markdown
## Figma 导入交付

- 交付模式：HTML to Figma
- 页面：{page_id}
- HTML 文件：{path}
- 预览截图：{path}
- 审查结果：{PASS | PASS_WITH_NOTES | FAIL}

### 导入步骤
1. 在 Figma 中安装并打开 HTML to Figma 插件
2. 复制 HTML 文件完整代码
3. 在插件中粘贴并执行转换
4. 检查图层结构后进入精调
```
