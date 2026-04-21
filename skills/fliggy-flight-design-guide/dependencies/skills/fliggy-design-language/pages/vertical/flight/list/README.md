# 机票列表（`vertical.flight.list`）

- **框架**：[page-frame.md](page-frame.md)  
- **闭包**：[manifest.md](manifest.md)  
- **整页串联预览**（可选）：[`example-full.html`](example-full.html) — 自供稿包 `fliggy-design-flight-listing-skill/example.html` 同步，与 `listing.png` / `listing css.txt` 一致。  

## 模块（自上而下）

| slug | 说明 |
|------|------|
| `flight-list-header` | 导航栏（状态栏占位 + OD + 右侧图标组，176px 吸顶） |
| `flight-list-date-bar` | 日历（横向日期条 + 低价） |
| `flight-list-promo-bar` | 营销条（日历下、快筛上） |
| `flight-list-sort-tabs` | 快筛栏（横向滚动筛选项） |
| `flight-list-flight-card` | 直飞航班卡片（多变体 `example*.html`） |
| `flight-list-savings-strip` | 省钱推荐（可选，横滑卡片） |
| `flight-list-transfer-divider` | 分割（「以下为其他中转航班」） |
| `flight-list-transfer-filter` | 中转快筛栏（独立骨架，内层 min-width≈854） |
| `flight-list-transfer-card` | 中转航班卡片（6 变体 `example*.html`） |
| `flight-list-mind-module` | 心智模块（安心票文案 + Logo） |
| `flight-list-footer-bar` | 底 bar（排序：时间 / 低价 / 惠后价，160px 吸底） |

供稿来源：`fliggy-design-flight-listing-skill/框架组件.md` 与 `输出组件/`。
