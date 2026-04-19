# scripts — 自动化脚本说明

## Figma / 设计稿解析

| 脚本 | 用途 |
|------|------|
| `parse_figma_modules.py` | 从 Figma 导出或相关输入解析模块（初版） |
| `parse_figma_modules_v2.py` | 模块解析 v2 |
| `parse_figma_comprehensive.py` | 综合解析 |

运行示例（在项目根或本 Skill 根下，按脚本内路径要求调整工作目录）：

```bash
python scripts/parse_figma_modules_v2.py
```

> 注意：脚本可能依赖本地路径或导出文件格式，执行前请阅读各文件头部注释。

## 设计稿静态校验

`validate_design_html.py`：对单文件 HTML 做基础规则检查（viewport、内联 style、var 使用等）。

```bash
python scripts/validate_design_html.py path/to/output.html
```
