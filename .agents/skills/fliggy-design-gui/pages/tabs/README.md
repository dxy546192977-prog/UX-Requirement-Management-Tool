# 五大 Tab 页面（底栏）

**落地顺序**：[docs/tab-pages-order.md](../../docs/tab-pages-order.md)（**首页 → 会员 → 消息 → 行程 → 我的**）。

**底栏 5 目录**：`home/`、`member/`、`messages/`、`trip/`、`mine/`。  
**注意**：**目的地**不是底栏 Tab，只在 **首页顶 Tab** 切换；模块写在 **`home/modules/`** 下（如 `home/modules/destination-header/`），见 `tab-pages-order`。

## 每个 Tab 目录内建议结构

```text
pages/tabs/<tab>/
  spec.md                # 可选：整页结构、滚动、边距（如 home、member）
  page-frame.md          # 可选：与 manifest 配套的框架说明（垂类 / mine 等）
  manifest.md            # 可选：闭包路径列表
  modules/
    <module-slug>/
      spec.md
      example.html
  example.html           # 整页预览（多数 Tab 具备）
```

- **平台通用能力**仍以 `components/platform/.../spec.md` 为准；页面 `modules/` 描述 **该 Tab 上的拼装与业务切片**（**例外**：**`member/`**、**`mine/`**、**`trip/`** 等为 **`spec.md` + `example.html`** 整页，无 `modules/`、无 `manifest.md`）。  
- 有 **`manifest.md`** 的 Tab 须同时引用平台/业务组件 spec 与本 Tab 下 **`modules/*/spec.md`**。

登记与别名：[docs/page-index.md](../../docs/page-index.md)。
