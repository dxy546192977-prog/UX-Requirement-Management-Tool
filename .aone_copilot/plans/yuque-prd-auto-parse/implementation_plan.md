### yuque-prd-auto-parse ###
修复两个问题：1) 添加 localStorage 数据持久化，确保所有操作自动保存不丢失；2) 语雀 PRD 解析需要用户配置 API Token 才能工作。

# 数据持久化 + 语雀解析修复

## 需求背景
当前存在两个问题：
1. **数据不持久化**：所有需求数据存储在 JS 变量中，刷新页面后所有操作（新增、拖拽、编辑、删除）全部丢失
2. **语雀解析不生效**：代理服务器已就绪，但 `config.json` 中的 API Token 未配置

## User Review Required

> [!IMPORTANT]
> **语雀 API Token**：你需要在 `config.json` 中配置真实的语雀 API Token，否则 PRD 链接解析功能无法工作。获取方式：https://yuque.antfin.com/lark/openapi/dh8zp4

## Proposed Changes

### 前端页面（修改）

#### [MODIFY] [index.html](file:///Users/dengxinyang/Desktop/AI·Project/Requirements Management/index.html)

**1. 新增 `saveData()` 函数**
- 将 `requirementsData.requirements` 序列化后存入 `localStorage`
- key 为 `req_mgmt_data`

**2. 新增 `loadData()` 函数**
- 页面加载时从 `localStorage` 读取已保存的数据
- 如果有保存数据，用它覆盖默认的 `requirementsData.requirements`
- 如果没有（首次使用），使用代码中的默认数据

**3. 在所有数据变更操作后调用 `saveData()`**
- `handleSubmitReq()` - 新增需求后
- `handleDrop()` - 拖拽改变状态后
- `handleEditReq()` - 编辑需求后
- `deleteRequirement()` - 删除需求后
- `promptDesignUrl()` - 添加设计稿链接后

**4. 页面初始化时调用 `loadData()`**
- 在 `renderStats()` 之前调用

## Verification Plan

### Automated Tests
- 新增一个需求，刷新页面，验证需求仍然存在
- 拖拽需求到其他列，刷新页面，验证状态保持
- 编辑需求信息，刷新页面，验证修改保持

### Manual Verification
- 清除浏览器 localStorage 后，验证默认数据正常加载
- 验证语雀 PRD 解析（需先配置 Token）


updateAtTime: 2026/4/14 19:11:59

planId: fc4fa1f0-44df-4af8-8bac-55609db64eaa