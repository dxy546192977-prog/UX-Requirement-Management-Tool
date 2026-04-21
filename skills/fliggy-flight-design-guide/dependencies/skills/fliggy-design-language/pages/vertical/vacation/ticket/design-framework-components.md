# 门票·玩乐频道页 — 设计框架与组件规范

与 [`page-frame.md`](page-frame.md) 配套：本文件为 **Skill 级** 约束（尺寸、Token、间距、骨架、交互、AI 生成强规则）。

---

## 一、页面定位

- **门票·玩乐频道列表页**：Banner、搜索、推荐、类目快筛、筛选项、POI 列表。  
- **画布**：**750 × 1624px**（@2x）；背景 **`#F2F3F5`**；**纵向上移滚动**。  
- **结构**：Banner + 叠层吸顶导航 → **搜索 → 推荐卡片 → 类目快筛 → 下拉筛选 → 快筛 → POI 卡**；除说明外模块间距遵循下文。

---

## 二、核心布局原则

1. **宽度** 750px 基准；**高度** 可超过 1624，整页纵向滚动。  
2. **Banner** 随滚动上移出视口。  
3. **顶部导航** 吸顶，**初始**透明叠在 Banner 上（浅/白字）；**滚动后**实底白、深字深图标。  
4. **类目快筛 / 下拉筛选 / 快筛 / POI** 为连续白底区，**彼此之间垂直间距为 0**。

---

## 三、结构拆解（自上而下）

1. Banner 区  
2. 顶部导航栏（吸顶）  
3. 搜索框  
4. 推荐卡片区  
5. 类目快筛  
6. 下拉筛选  
7. 快筛  
8. POI 卡片区  

---

## 四、全局 Design Tokens（CSS）

```css
:root {
  --color-darkgray: #0F131A;
  --color-midgray: #5C5F66;
  --color-lightgray: #919499;
  --color-indigo-1: #6666FF;
  --color-indigo-4: #EBEBFF;
  --color-warning-1: #FF3333;
  --color-pay-1: #FF5533;
  --color-yellow-1: #FFE033;
  --color-orange-1: #F59A23;
  --color-white: #FFFFFF;
  --color-bg: #F2F3F5;
  --color-line: #D2D4D9;
}
```

---

## 五、间距与圆角

### 页面边距（CSS 变量）

```css
:root {
  --spacing-page-horizontal: 18px;
  --spacing-search-to-nav: 50px;
  --spacing-module: 18px;
  --spacing-zero: 0px;
}
```

### 垂直关系（必须）

| 关系 | 间距 |
|------|------|
| 搜索左右 | 18px |
| 搜索距顶部导航栏（底边） | 50px |
| 搜索距推荐区 | 18px |
| 推荐距类目快筛 | 18px |
| 类目快筛 ↔ 下拉筛选 | **0** |
| 下拉筛选 ↔ 快筛 | **0** |
| 快筛 ↔ POI 卡 | **0** |

### 圆角（摘录）

- 搜索框：**36px**  
- Banner 内按钮：**24px** / **42px**  
- 推荐大容器：**12px**  
- 内容大区块顶圆角：**24px 24px 0 0**  
- POI 图：**12px**  
- 普通筛选标签：**6px**  
- 小徽标：**4px / 6px / 8px**  

---

## 六、页面骨架（YAML 摘要）

```yaml
page:
  name: 门票·玩乐频道页
  size: 750x1624
  background: "#F2F3F5"
  scroll: vertical
  safe_area_top: 88

banner:
  width: 750
  height: 359
  scroll_behavior: scroll_up

top_nav:
  sticky: true
  height: 176
  states:
    initial: { text/icon: light on transparent }
    scrolled: { background: "#FFFFFF", text: "#0F131A" }

search_bar:
  margin_lr: 18
  margin_top_from_top_nav: 50
  margin_bottom_to_recommend: 18
  height: 72
  border_radius: 36
  border: "2px solid #FFE033"

recommend_section:
  margin_lr: 18
  margin_bottom: 18
  width: 714

category_quick_filter:
  margin_tb: 0
  background: "#FFFFFF"
  border_radius: "24px 24px 0 0"

dropdown_filter:
  margin_tb: 0
  height: 60

quick_filter:
  margin_tb: 0
  chip_radius: 6

poi_card_list:
  margin_top: 0
  background: "#FFFFFF"
  card_image: "226x266"
```

---

## 七、推荐组件层级

```yaml
page_structure:
  - banner
  - sticky_top_nav
  - scroll_content:
      - search_bar
      - recommend_section
      - category_quick_filter
      - dropdown_filter
      - quick_filter
      - poi_card_list
```

---

## 八、交互（摘要）

- **滚动**：Banner 上移；导航吸顶；导航背景/字色/图标色随滚动切换。  
- **筛选**：类目 Tab；下拉展开；快筛默认/选中态区分。  
- **列表**：POI 卡可点击进入详情；可无限加载。

---

## 九、AI 生成强约束

### 必须

1. 基准 **750 × 1624**（内容可更高）。  
2. Banner **750 × 359**，顶置。  
3. 顶栏 **吸顶**，初始叠 Banner、滚动后白底。  
4. 搜索：左右 **18**、距导航 **50**、距推荐 **18**。  
5. 推荐距类目快筛 **18**。  
6. 类目 / 下拉 / 快筛 / POI 之间 **间距为 0**。  
7. 整页可纵向滚动。  
8. 页背景 **`#F2F3F5`**。  
9. 主内容承载以 **`#FFFFFF`** 为主。

### 禁止

1. 改基础宽高比逻辑。  
2. 顶栏非吸顶。  
3. 在上述四段之间 **加额外垂直间距**。  
4. 大面积 **`#6666FF`** 铺底。  
5. 随意插入无关大模块。

---

## 十、一句话指令（给 AI）

基于 **750 × 1624**：顶 **750×359 Banner**，叠 **吸顶且随滚动变色的导航**；其下依次为 **搜索（18 / 50 / 18）**、**推荐（距类目 18）**、**类目快筛、下拉筛选、快筛、POI 列表**，后四段 **间距均为 0**，整页纵滑。
