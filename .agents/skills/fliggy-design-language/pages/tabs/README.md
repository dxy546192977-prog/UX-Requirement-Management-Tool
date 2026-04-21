# 五大 Tab 页面（底栏）

**落地顺序**：[docs/tab-pages-order.md](../../docs/tab-pages-order.md)（**首页 → 会员 → 消息 → 行程 → 我的**）。

**底栏 5 目录**：`home/`、`member/`、`messages/`、`trip/`、`mine/`。  
**注意**：**目的地**不是底栏 Tab，只在 **首页顶 Tab** 切换；模块写在 **`home/modules/`** 下（如 `home/modules/destination-header/`），见 `tab-pages-order`。

## 每个 Tab 目录内建议结构

```text
pages/tabs/<tab>/
  page-frame.md          # 唯一：整页框架（布局、滚动、顶/底栏关系）
  manifest.md            # 闭包：列出本页要读的所有 spec.md
  modules/
    <module-slug>/
      spec.md            # 该模块规范
      example.html       # 该模块可单独打开的示例
  example.html           # 可选：整页串联预览
```

- **平台通用能力**仍以 `components/platform/.../spec.md` 为准；页面 `modules/` 描述 **该 Tab 上的拼装与业务切片**。  
- `manifest.md` 须同时引用平台/业务组件 spec 与本 Tab 下 **`modules/*/spec.md`**。

登记与别名：[docs/page-index.md](../../docs/page-index.md)。
