---
name: fliggy-flight-h5-to-figma
description: Use this skill to connect Vibma reliably and execute Figma MCP copy updates with relay checks, node-level text rewriting, screenshot verification, and delivery reporting. Trigger when users mention Vibma connection, Figma MCP copy changes, node-id links, or copy-only flow consistency updates.
---
# Fliggy Flight H5 to Figma

面向 Figma 文案改稿的标准执行 Skill，聚焦三件事：

1. 稳定连接 Vibma 通道（3055 / vibma）
2. 只改文本（可选），不动 UI 结构
3. 按节点级别交付可追溯结果

## 适用场景

- 用户给出 Figma 链接（含 `node-id`）并要求改内容
- 用户要求“仅改文案，不改 UI”
- 用户要求多页串联、上下文逻辑一致、方案重排
- 出现 Vibma 连接问题，需要先打通 relay

## 执行步骤

按以下顺序执行，不跳步：

1. **连接检查**
   - 先调用 `join_channel(channel="vibma")` 和 `ping`
   - 如果报 `Could not reach relay at port 3055`，先启动 relay（见 `scripts/start-vibma-relay.sh`），再重试
2. **范围识别**
   - 从 URL 提取 `node-id`
   - 用 `get_node_info` 看一级结构，用 `search_nodes(scopeNodeId, types=["TEXT"])` 抓文本节点
3. **内容策略**
   - 先写一版“内容结构”再改文案（例如：最低价优先、方案一/二/三排序）
   - 严格区分：信息结构调整 vs 视觉布局调整（禁止后者）
4. **批量改写**
   - 用 `set_text_content(items=[{nodeId,text}])` 批量写回
   - 大批量任务分批次提交，单批建议 20-40 条，失败便于回滚定位
5. **结果验证**
   - 优先 `get_screenshot(nodeId)`；若失败，用 `export_node_as_image`
   - 对照检查：文案是否承接前后逻辑、是否出现截断或错误语义
6. **交付汇报**
   - 明确声明“仅改文本，未改 UI”
   - 输出关键改动节点清单（nodeId + 新文案摘要）
   - 给出下一步可选优化

## 输出标准

- 必须包含：
  - 连接状态（relay、channel、ping）
  - 改动范围（页面/模块/节点）
  - 节点级改动摘要
  - 验证方式（截图或导出图）
- 口径要求：
  - 与用户 query 一致
  - 与 heroFeature 一致（如“全网最低价优先”）
  - 前后页面逻辑连续
- 约束要求：
  - 用户要求仅文本时，禁止修改任何非文本属性

## 收口汇总（Summary Trigger）

完成节点级改稿并输出交付汇报后，追加触发：

- `skills/fliggy-flight-summary/SKILL.md`

并提供本阶段 summary 信息：

- 任务名 / 需求名（含 requirement_id）
- run 级状态（pass / failed / running）
- phase 级模型、token、耗时
- 关键改动节点计数（用于看板补充说明）

## 参考资料

- 连接与执行标准：`references/vibma-connection-standard.md`
- 内容结构与改写标准：`references/content-structure-standard.md`
- 故障排查：`references/troubleshooting-playbook.md`
- 可复用模板：`assets/`
