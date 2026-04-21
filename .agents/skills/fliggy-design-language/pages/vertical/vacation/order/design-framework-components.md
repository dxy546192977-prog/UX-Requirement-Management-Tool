# 度假订单详情页 — 设计框架与组件规范

与 [`page-frame.md`](page-frame.md) 配套：双轨策略（固定组件优先 + Token 内自由组合）、滚动规则与模块 YAML。

---

## 一、双轨与文本排版

- **模式 A**：选用本页 `modules/` 固定 HTML 组件并填数据。  
- **模式 B**：用原子组件组合时 **必须** 使用下文 Token，禁止规范外色值/间距/圆角。  
- **Markdown 说明文**：可铺在 **`#F2F3F5`** 上；**不要**把普通说明塞进无定义的白底大卡。白底仅用于凭证、商品/订单卡、POI、出行、二销、底栏等业务块。

---

## 二、设备与滚动

- 基准 **750 × 1624**（长页可更高）。  
- **顶部状态栏 fixed**，叠在 **黄头** 上；黄头 **随内容上移**，**不吸顶**。  
- **底 bar fixed 吸底**，不随滚动消失。  
- 顶栏滚动：背景透明→白；icon 终态 **`#0F131A`**；标题 opacity **`0→1`**。

---

## 三、Design Tokens（摘录）

```css
:root {
  --color-darkgray: #0f131a;
  --color-midgray: #5c5f66;
  --color-lightgray: #919499;
  --color-indigo-1: #6666ff;
  --color-indigo-4: #ebebff;
  --color-warning-1: #ff3333;
  --color-pay-1: #ff5533;
  --color-yellow-1: #ffe033;
  --color-yellow-2: #fffceb;
  --color-card-gray: #f7f8fa;
  --color-line: #f2f3f5;
  --color-line-deep: #d2d4d9;
  --color-white: #ffffff;
  --color-bg: #f2f3f5;
}
```

**禁区**：`#6666ff` 仅小面积（链接、复制、电话等），不得大块铺底。

---

## 四、间距

```css
:root {
  --spacing-page: 24px;
  --spacing-stack-lg: 18px;  /* 凭证区以下模块之间 */
  --spacing-stack-md: 0px;   /* 黄头→服务保障→基础信息→凭证区 */
  --spacing-stack-sm: 12px;
  --spacing-inline: 6px;
}
```

---

## 五、圆角（摘录）

- **24px**：黄头与白正文衔接、大块顶过渡  
- **12px**：凭证卡、商品图、二维码外框  
- **6px**：小标签、小图、二销小卡  
- **大胶囊**：~100px  

---

## 六、模块顺序（强约束）

```yaml
page_structure:
  - top_status_bar    # fixed
  - yellow_order_header
  - service_guarantee
  - basic_info_section
  - voucher_section
  - refund_policy
  - poi_info_card
  - order_card
  - travel_info
  - upsell_module
  - bottom_bar        # fixed
```

---

## 七、模块间距总表

| 区间 | 间距 |
|------|------|
| 黄头 ↔ 服务保障 ↔ 基础信息 ↔ 凭证区 | **0** |
| 凭证区 ↔ 退改 ↔ POI ↔ 订单卡 ↔ 出行 ↔ 二销 | **18px**（露 `#F2F3F5`） |
| 二销 ↔ 底 bar（内容区底部） | 用 **padding-bottom** 避让 fixed 底栏 |

---

## 八、AI 强约束（摘要）

1. 750 基准；顶栏 **fixed** 叠黄头；黄头 **可滚走**。  
2. 顶栏滚动态 **白底 + #0F131A icon + 标题显现**。  
3. 底栏 **fixed**，不跟滚动消失。  
4. 模块顺序与 **0 / 18** 间距规则不可改。  
5. 页背景 **`#F2F3F5`**。  

---

## 九、一句话指令

生成 **750×1624** 度假**已出票订单详情**：**fixed 顶栏**叠 **黄头**（黄头随滚上移）；正文顺序为 **服务保障→基础信息→凭证**（**间距 0**），再 **退改→POI→订单卡→出行→二销**（各 **18px** 灰缝）；**底栏 fixed**；顶栏滚动态 **白底、icon #0F131A、标题 0→1**。
