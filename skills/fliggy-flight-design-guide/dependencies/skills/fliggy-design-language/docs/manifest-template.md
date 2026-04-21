# 页面 manifest 模板（`manifest.md`）

复制到 `pages/tabs/<tab>/manifest.md` 后删去说明行、按页填写。

---

## 元信息

- **page_id**：`tabs.home`（与本 Tab 目录名一致）  
- **最后同步**：YYYY-MM-DD  

---

## 允许的 spec 路径（闭包）

仅列相对仓库根的 **`spec.md`**。生成该页时只应读取下列文件，外加 **`foundations/design-foundations.md`**、（若配图）**`foundations/image-library.md`**、本 Tab **`page-frame.md`**。

**平台 / 业务组件：**

```text
foundations/design-foundations.md
components/platform/navigation/navbar/spec.md
components/platform/navigation/tabbar/spec.md
# …按需一行一个
```

**本 Tab 页面模块（`modules/` 下各子目录）：**

```text
pages/tabs/home/modules/example-module/spec.md
# …每模块一条，与 modules/<slug>/ 一致
```

---

## 备注

- 业务复合块若已有全局 spec：`components/business/<domain>/.../spec.md`，也在此列出。  
- 尚未拆模块时：可暂只列平台组件，并在备注标明「待补 `modules/xxx`」。

---

## 变更记录

| 日期 | 说明 |
|------|------|
| YYYY-MM-DD | 初版 |
