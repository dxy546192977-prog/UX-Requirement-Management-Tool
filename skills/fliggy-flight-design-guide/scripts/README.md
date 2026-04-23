# scripts

本目录放可自动化步骤，所有脚本都可在 Skill 根目录直接执行。

| 脚本 | 用途 |
|------|------|
| `doctor.sh` | 校验 Skill 包结构是否完整 |
| `package.sh` | 打包可分发 zip |
| `validate_design_html.py` | 校验单文件 HTML 是否满足核心规范 |

## 使用方式

```bash
bash scripts/doctor.sh
bash scripts/package.sh
python3 scripts/validate_design_html.py path/to/output.html
```
