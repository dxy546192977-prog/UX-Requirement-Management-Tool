#!/usr/bin/env python3
"""
Consolidate vertical car/flight/train/vacation scene dirs to home-style layout:
  example.html + spec.md only; remove modules/, manifest, page-frame, etc.
Car pages: inline <link href="modules/*.css"> into <style> before removing modules/.
"""
from __future__ import annotations

import os
import re
import shutil
import sys

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# (relative_dir, page_id, spec_title, one_line_summary)
PAGES_FROM_FULL: list[tuple[str, str, str, str]] = [
    ("pages/vertical/car/home", "vertical.car.home", "安心租首页", "头图、搜索大卡、营销区、列表、频道底栏（750）。"),
    ("pages/vertical/car/list", "vertical.car.list", "租车列表", "状态栏、导航、快筛、大筛选、新客条、侧导航+列表卡（视口 750×1624）。"),
    ("pages/vertical/car/ota", "vertical.car.ota", "租车 OTA 详情", "报价卡、取还车、车型摘要、推荐卡、VIP 条等整页串联。"),
    ("pages/vertical/flight/list", "vertical.flight.list", "机票列表", "列表头、日期条、快筛、航班卡、中转卡、促销条、底栏等。"),
    ("pages/vertical/flight/ota", "vertical.flight.ota", "机票 OTA", "固定顶栏 + 单滚动区：行程卡、百叶窗、营销条、舱位与报价、心智水印。"),
    ("pages/vertical/train/list", "vertical.train.list", "火车票列表", "列表头、日历条、渠道 Tab、车次卡、底栏。"),
    ("pages/vertical/train/ota", "vertical.train.ota", "火车票 OTA", "标题、行程、营销条、报价区、选座、水印等。"),
    ("pages/vertical/vacation/ticket", "vertical.vacation.ticket", "门票·玩乐频道", "频道顶区、分类、筛选、POI 卡、推荐等。"),
    ("pages/vertical/vacation/search", "vertical.vacation.search", "度假小搜 / 旅行列表", "搜索头、类目、快筛、下拉筛选、POI/跟团卡混排。"),
    ("pages/vertical/vacation/detail", "vertical.vacation.detail", "门票 / 玩乐商详", "头图、基础信息、POI、货架、富详情、底栏等。"),
    ("pages/vertical/vacation/order", "vertical.vacation.order", "度假订单详情", "黄头、吸顶导航、服务保障、基础信息、券、退改、POI、交易、出行信息、加购、底栏。"),
]

# 无 example-full.html：按 page-frame 顺序纵向拼接各 module 的 example.html（样式合并入单页）
PAGES_STITCH: list[tuple[str, str, str, str, list[str]]] = [
    (
        "pages/vertical/flight/home",
        "vertical.flight.home",
        "机票首页",
        "氛围、小搜、金刚、省钱卡、特价航线、活动条、行业底栏。",
        [
            "modules/flight-home-atmosphere/example.html",
            "modules/flight-home-mini-search/example.html",
            "modules/flight-home-kingkong/example.html",
            "modules/flight-home-savings/example.html",
            "modules/flight-home-special-fares/example.html",
            "modules/flight-home-activity-strip/example.html",
            "modules/flight-home-industry-tabbar/example.html",
        ],
    ),
    (
        "pages/vertical/train/home",
        "vertical.train.home",
        "火车票首页",
        "沉浸式标题、搜索、金刚、优惠、路线专家、微信助手、水印、底栏。",
        [
            "modules/train-home-title/example.html",
            "modules/train-home-search/example.html",
            "modules/train-home-kingkong/example.html",
            "modules/train-home-promo-zone/example.html",
            "modules/train-home-route-expert/example.html",
            "modules/train-home-wechat-assistant/example.html",
            "modules/train-home-watermark/example.html",
            "modules/train-home-bottom-bar/example.html",
        ],
    ),
]

STYLE_BLOCK = re.compile(r"<style[^>]*>(.*?)</style>", re.IGNORECASE | re.DOTALL)
BODY_INNER = re.compile(r"<body[^>]*>(.*?)</body>", re.IGNORECASE | re.DOTALL)

LINK_LINE = re.compile(r'^\s*<link rel="stylesheet" href="(modules/[^"]+)">\s*\n', re.MULTILINE)


def inline_module_css(page_dir: str, html: str) -> str:
    matches = LINK_LINE.findall(html)
    if not matches:
        return html
    chunks: list[str] = []
    for rel in matches:
        css_path = os.path.join(REPO, page_dir, rel)
        if not os.path.isfile(css_path):
            print(f"WARN missing css: {css_path}", file=sys.stderr)
            continue
        with open(css_path, encoding="utf-8") as cf:
            chunks.append(f"/* ---- inlined: {rel} ---- */\n{cf.read()}")
    combined = "\n\n".join(chunks)
    block = f"  <style>\n{combined}\n  </style>\n"
    html = LINK_LINE.sub("", html)
    html = html.replace("<head>\n", "<head>\n" + block, 1)
    return html


def write_spec(page_dir: str, page_id: str, title: str, summary: str) -> None:
    spec_path = os.path.join(REPO, page_dir, "spec.md")
    body = f"""# {title}（`{page_id}`）— 页面结构

## 元信息

- **page_id**：`{page_id}`（与 [docs/page-index.md](../../../../docs/page-index.md) 一致时引用）
- **参考实现**：[example.html](example.html)（**唯一** HTML/CSS 真相源；无 `modules/`、`manifest.md`）
- **依赖**：[foundations/design-foundations.md](../../../../foundations/design-foundations.md)；配图见 [foundations/image-library.md](../../../../foundations/image-library.md)
- **Skill 编排入口**：[SKILL.md](../../../../SKILL.md)
- **最后同步**：2026-04-12

---

## 一、说明

{summary}

整页布局、固定层与滚动行为以 **[example.html](example.html)** 内结构与样式为准。历史 **`page-frame.md` / `manifest.md` / `modules/`** 已收束到本单文件。

---

## 二、变更记录

| 日期 | 说明 |
|------|------|
| 2026-04-12 | 收束为 `example.html` + `spec.md`（与 `tabs.home` 同形态）。 |
"""
    with open(spec_path, "w", encoding="utf-8") as f:
        f.write(body)


def stitch_modules_to_html(page_dir: str, doc_title: str, module_rels: list[str]) -> str:
    style_chunks: list[str] = []
    body_chunks: list[str] = []
    for rel in module_rels:
        fp = os.path.join(REPO, page_dir, rel)
        with open(fp, encoding="utf-8") as f:
            raw = f.read()
        for block in STYLE_BLOCK.findall(raw):
            style_chunks.append(block.strip())
        bm = BODY_INNER.search(raw)
        inner = bm.group(1).strip() if bm else ""
        slug = rel.split("/")[1] if "/" in rel else rel
        body_chunks.append(
            f'  <section class="fdg-module-stitch" data-module="{slug}">\n{inner}\n  </section>'
        )
    merged_css = "\n\n".join(style_chunks)
    shell = """
    body.fdg-stitch-page { margin: 0; padding: 0; max-width: 750px; margin-left: auto; margin-right: auto; }
    .fdg-module-stitch { display: block; }
    """
    sections = "\n\n".join(body_chunks)
    return f"""<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=750, user-scalable=no" />
  <title>{doc_title} — 整页</title>
  <style>
{shell}
{merged_css}
  </style>
</head>
<body class="fdg-stitch-page">
{sections}
</body>
</html>
"""


def cleanup_scene_dir(abs_dir: str) -> None:
    modules = os.path.join(abs_dir, "modules")
    if os.path.isdir(modules):
        shutil.rmtree(modules)
    for name in (
        "manifest.md",
        "page-frame.md",
        "design-framework-components.md",
        "README.md",
        "listing-reference.md",
        "example-full.html",
    ):
        p = os.path.join(abs_dir, name)
        if os.path.isfile(p):
            os.remove(p)


def main() -> None:
    for page_dir, page_id, title, summary in PAGES_FROM_FULL:
        abs_dir = os.path.join(REPO, page_dir)
        full = os.path.join(abs_dir, "example-full.html")
        out = os.path.join(abs_dir, "example.html")
        if not os.path.isdir(abs_dir):
            print(f"SKIP missing dir {abs_dir}", file=sys.stderr)
            continue
        if not os.path.isfile(full):
            print(f"SKIP no example-full.html {full}", file=sys.stderr)
            continue
        with open(full, encoding="utf-8") as f:
            html = f.read()
        if page_dir.startswith("pages/vertical/car/"):
            html = inline_module_css(page_dir, html)
        with open(out, "w", encoding="utf-8") as f:
            f.write(html)
        write_spec(page_dir, page_id, title, summary)
        cleanup_scene_dir(abs_dir)
        print("OK", page_dir)

    for page_dir, page_id, title, summary, modules in PAGES_STITCH:
        abs_dir = os.path.join(REPO, page_dir)
        out = os.path.join(abs_dir, "example.html")
        if not os.path.isdir(abs_dir):
            print(f"SKIP missing dir {abs_dir}", file=sys.stderr)
            continue
        missing = [m for m in modules if not os.path.isfile(os.path.join(REPO, page_dir, m))]
        if missing:
            print(f"SKIP stitch missing files {page_dir}: {missing}", file=sys.stderr)
            continue
        html = stitch_modules_to_html(page_dir, title, modules)
        with open(out, "w", encoding="utf-8") as f:
            f.write(html)
        write_spec(page_dir, page_id, title, summary + " 本页由历史 `modules/*/example.html` 纵向拼接生成，样式已合并入单文件。")
        cleanup_scene_dir(abs_dir)
        print("OK stitch", page_dir)


if __name__ == "__main__":
    main()
