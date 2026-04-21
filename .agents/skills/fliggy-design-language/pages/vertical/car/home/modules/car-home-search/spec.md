# 模块：安心租首页 · 搜索大卡（`car-home-search`）

## 用途

频道核心转化区：**单一大白卡**，内含固定子区块 **2-1～2-8**。

## 结构顺序（禁止打乱）

1. **2-1** `.az-search-switch` — 左侧未选（机票+特价机票 / 火车 / 汽车），右侧选中「租车/接送」+ 黄渐变条  
2. **2-2** `.az-rent-tab-wrap` — 四 Tab：租车 / 接送机 / 接送火车 / 打车；激活黑字 + 下划条；气泡加类 `has-bubble`  
3. **2-3** `.az-scene-tabs` — 国内(含港澳台) / 国际，黄胶囊激活  
4. **2-4** `.az-search-notice` — 营销条切图 642×72  
5. **2-5** `.az-location-block` — 取车城市、异地还车开关、城市与地点行  
6. **2-6** `.az-time-block` — 取还时间 + 间隔  
7. **2-7** `.az-filter-row` — 固定两项：送车上门、小伤免赔  
8. **2-8** `.az-search-cta-wrap` — 黄主按钮 + 角标 + 利益点横排  

## 文件

- 样式：[`az-search-module.css`](az-search-module.css)  
- 预览：[`example.html`](example.html)  

## 尺寸

外层 `.az-search-module`：**702×865**（`min-height` 可随内容微调，以设计为准）。

## Token

依赖 `--az-*`（见 [`../../design-framework-components.md`](../../design-framework-components.md)）；黄色用于激活与主 CTA。

## 关联

整页：[`../../example-full.html`](../../example-full.html)  
