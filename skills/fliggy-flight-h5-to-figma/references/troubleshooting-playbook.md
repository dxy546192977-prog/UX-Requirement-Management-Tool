# Vibma 改稿故障排查手册

## A. 无法连接 relay

症状：

- `join_channel` 失败
- `Could not reach relay at port 3055`

处理：

1. 启动：`npx @ufira/vibma-tunnel`
2. 检查 3055 端口可用
3. 重新 `join_channel("vibma")`
4. `ping` 验证

## B. 连接正常但搜不到节点

症状：

- `search_nodes` 结果为空
- 节点在画布可见但接口未返回

处理：

1. 用父节点 `get_node_info` 确认作用域
2. 放宽搜索条件（仅 `types=["TEXT"]`）
3. 分块按子 frame 搜索

## C. set_text_content 批量失败

症状：

- 整批报错，无法定位单点

处理：

1. 把批次切小（建议 20-40 条）
2. 二分定位失败节点
3. 单节点重试
4. 记录失败节点并继续其它节点，避免整单阻塞

## D. 截图验证失败

症状：

- `get_screenshot` 报错或无图

处理：

1. 改用 `export_node_as_image`
2. 或切到更上层节点截图，人工确认目标区域
