# 页面 manifest 模板（`manifest.md`）

复制到目标页面目录后删去说明行、按页填写。

---

## 元信息

- **page_id**：`<your.page.id>`  
- **最后同步**：YYYY-MM-DD  

---

## 允许的 spec 路径（闭包）

仅列相对仓库根的 **`spec.md`**。生成该页时只应读取下列文件，外加 **`foundations/design-foundations.md`**、（若配图）**`foundations/image-library.md`**。

**平台组件：**

```text
foundations/design-foundations.md
components/platform/navigation/navbar/spec.md
components/platform/navigation/tabbar/spec.md
# …按需一行一个
```

**页面私有模块（如存在）：**

```text
pages/<your-page>/modules/example-module/spec.md
# …每模块一条，与 modules/<slug>/ 一致
```

---

## 变更记录

| 日期 | 说明 |
|------|------|
| YYYY-MM-DD | 初版 |
