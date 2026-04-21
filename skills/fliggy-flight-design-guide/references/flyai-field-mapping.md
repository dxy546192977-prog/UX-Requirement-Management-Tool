# flyai 数据字段 → 界面映射

生成机票相关卡片或列表时，若使用 `flyai search-flight` 等 CLI 输出 JSON，建议按下表取值。

| flyai 字段 | 界面用途 |
|------------|----------|
| `adultPrice` | 展示价格（如 ¥400.0） |
| `marketingTransportName` | 航司名称 |
| `marketingTransportNo` | 航班号 |
| `depCityName` / `arrCityName` | 出发/到达城市 |
| `depStationName` / `arrStationName` | 机场全称 |
| `depStationShortName` / `arrStationShortName` | 机场简称 |
| `depTerm` / `arrTerm` | 航站楼 |
| `depDateTime` / `arrDateTime` | 出发/到达时间 |
| `duration` | 飞行时长 |
| `seatClassName` | 舱位名称 |
| `journeyType` | 直达/中转 |
| `jumpUrl` | 预订/下单链接（存在则应展示入口） |

具体 CLI 用法与更多字段以本机已安装的 `flyai` Skill 为准。
