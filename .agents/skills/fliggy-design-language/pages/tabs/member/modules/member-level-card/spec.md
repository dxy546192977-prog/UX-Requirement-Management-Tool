# 会员等级概览卡（`member-level-card`）

## 元信息

- **模块 slug**：`member-level-card`  
- **示例**：[`example.html`](example.html)  
- **依赖**：[`foundations/design-foundations.md`](../../../../../foundations/design-foundations.md)  
- **最后同步**：2026-04-05  

---

## 用途

会员 Tab 首屏 **大主卡**：头像 + 等级徽章 + 进度条 + 到期日；**里程 / 购物金** 可点；右侧 **等级主视觉**；**权益宫格**（可用/锁定 +「更多」）；底部 **任务卡横向滚动**（渐变右侧遮罩 +「去完成」）。

---

## DOM 与类名（根）

- 根：**`.fdl-member-level-card`**（宽 **690px** 居中，白底，**24px** 圆角，阴影）  
- 上区：**`.fdl-member-level-card__top`**  
- 下区任务：**`.fdl-member-level-card__tasks`**（`position: relative`）+ 右侧遮罩 **`.fdl-member-level-card__tasks-fade`**

---

## 视觉与 Token

| 元素 | Token / 值 |
|------|------------|
| 页面背景 | `var(--color-bg)` |
| 主卡面 | `var(--color-surface)` |
| 主文 | `var(--color-text-primary)` |
| 次文 / 进度数值 | `var(--color-text-secondary)` |
| 进度条轨道 | `rgba(15,19,26,0.1)` 或 `--color-border-subtle` |
| 进度填充 / 锁定灰 | `#9195A5` 或次文色 |
| 任务卡底 | `#FFF5EB`（或 `--color-warm-bg` 若 foundations 有） |
| 主按钮渐变 | `#F0C990` → `#FFE2B8`（与供稿一致；可标注为品牌渐变） |
| 数字（里程、金额、进度比） | **Fliggy Sans 102** |

---

## 状态

- **权益锁定**：图标区 **圆形灰底 + 锁**（`#EEEFF1` 底、`#919499` 锁身）  
- **任务卡**：条件文案 **次色 22px**；按钮 **胶囊 42px 圆角**

---

## 无障碍

- 头像 `alt` 有意义；权益/任务可点区域为 **`<button>` 或带 `role="button"` + `tabindex="0"`**（示例简化为 `button` / `a`）  
- 任务横滑容器 **`overflow-x: auto`**，键盘用户可考虑焦点可见样式  

---

## 变更记录

| 日期 | 说明 |
|------|------|
| 2026-04-05 | 初版，对齐供稿等级卡片 HTML。 |
