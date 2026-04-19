# Flight 路由规则（V1）

## 路由目标

把 `prd-recognition` 的结构化执行单稳定映射到首期可执行页面范围，避免“看起来自动化、实际靠猜”的隐式流程。

## 首期支持矩阵

| route_key | page_id | 基线物料 | 状态 | 执行策略 |
|---|---|---|---|---|
| home | `vertical.flight.home` | `机票四连跳/pages/vertical/flight/home/example-full.html` | supported | 正常执行 |
| booking | `vertical.flight.booking` | `机票四连跳/pages/vertical/flight/booking/example-full.html` | supported | 正常执行 |
| list | `vertical.flight.list` | 无稳定闭包 | partial | 降级 |
| ota | `vertical.flight.ota` | 无稳定闭包 | partial | 降级 |
| unknown | 未识别 | 无 | unsupported | 人工确认 |

## 路由输入字段

必须来自结构化执行单：

- `page_id`
- `page_name`
- `module_name`
- `change_type`
- `baseline_artifact`

## 路由算法（顺序匹配）

1. 若 `page_id` 命中 `vertical.flight.home` -> `route_key=home`
2. 若 `page_id` 命中 `vertical.flight.booking` -> `route_key=booking`
3. 若 `page_id` 命中 `vertical.flight.list` 或 `vertical.flight.ota` -> `partial` 降级
4. 其他情况 -> `unknown`，进入人工确认

## 降级策略

### list / ota（partial）

默认执行“最小可行设计动作”：

1. 优先判断是否可挂靠到 `home` 或 `booking` 的现有模块槽位
2. 若可挂靠，则按 `Type A（插入模块）` 产出
3. 若不可挂靠，返回“待人工确认项”：
   - 推荐挂靠页面
   - 推荐模块位置
   - 关键假设

### unknown（unsupported）

禁止直接生成“伪完整页”，必须返回：

- `status: need-human-confirmation`
- `reason: page_not_covered_in_v1`
- `suggested_fallback: home | booking | postpone`

## 路由输出字段

每个模块路由后必须补齐：

- `route_key`
- `route_status`（`supported` / `partial` / `unsupported`）
- `execution_mode`（`normal` / `fallback-insert` / `human-confirmation`）
- `resolved_baseline_artifact`
- `fallback_reason`（可空）

## 示例

```json
{
  "module_name": "低价日历",
  "page_id": "vertical.flight.list",
  "route_key": "list",
  "route_status": "partial",
  "execution_mode": "fallback-insert",
  "resolved_baseline_artifact": "pages/vertical/flight/home/example-full.html",
  "fallback_reason": "list page baseline missing in v1, mapped to nearest slot in home"
}
```
