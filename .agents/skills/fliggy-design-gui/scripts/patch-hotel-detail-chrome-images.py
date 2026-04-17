#!/usr/bin/env python3
"""Patch hotel detail single-file: filter gap fix, fixed chrome + scroll scrim, replace large base64 images."""

from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
TARGET = ROOT / "pages/vertical/hotel/detail/example.html"

HOTEL_URLS = [
    "https://fli.alicdn.com/upload/creative-platform/e_nRwpYv7h4bd1d0434df0165a.png?x-oss-process=image/format,webp",
    "https://fli.alicdn.com/upload/creative-platform/q0iqT3dZE64bd1d0434df0165a.png?x-oss-process=image/format,webp",
    "https://fli.alicdn.com/upload/creative-platform/R0itfcnbBP4bd1d0434df0165a.jpeg?x-oss-process=image/format,webp",
    "https://fli.alicdn.com/upload/creative-platform/n3LG9PqTzb4bd1d0434df0165a.png?x-oss-process=image/format,webp",
    "https://fli.alicdn.com/upload/creative-platform/W7XmkEHZjV4bd1d0434df0165a.png?x-oss-process=image/format,webp",
    "https://fli.alicdn.com/upload/creative-platform/mm-8Z5nl9K4bd1d0434df0165a.png?x-oss-process=image/format,webp",
    "https://fli.alicdn.com/upload/creative-platform/B2ZxDV1qje4bd1d0434df0165a.png?x-oss-process=image/format,webp",
    "https://fli.alicdn.com/upload/creative-platform/rRCRrs04kp4bd1d0434df0165a.png?x-oss-process=image/format,webp",
    "https://fli.alicdn.com/upload/creative-platform/osrQc_lDCq4bd1d0434df0165a.png?x-oss-process=image/format,webp",
    "https://fli.alicdn.com/upload/creative-platform/EGXn2Ow8nx4bd1d0434df0165a.png?x-oss-process=image/format,webp",
    "https://fli.alicdn.com/upload/creative-platform/vyd6b5_zpF4bd1d0434df0165a.png?x-oss-process=image/format,webp",
    "https://fli.alicdn.com/upload/creative-platform/ACebQlEiXH4bd1d0434df0165a.png?x-oss-process=image/format,webp",
    "https://fli.alicdn.com/upload/creative-platform/XHga7qiQpt4bd1d0434df0165a.png?x-oss-process=image/format,webp",
    "https://fli.alicdn.com/upload/creative-platform/X_bjfa_hMw4bd1d0434df0165a.png?x-oss-process=image/format,webp",
    "https://fli.alicdn.com/upload/creative-platform/yJlUvM7AtU4bd1d0434df0165a.png?x-oss-process=image/format,webp",
    "https://fli.alicdn.com/upload/creative-platform/8fQ1g3BTP_4bd1d0434df0165a.png?x-oss-process=image/format,webp",
    "https://fli.alicdn.com/upload/creative-platform/htaAkvdiE94bd1d0434df0165a.png?x-oss-process=image/format,webp",
]

STATUS_BAR_HTML = """<div class="status-bar">
                    <div class="status-bar__time">9:41</div>
                    <div class="status-bar__icons">
                        <div class="icon-signal">
                            <svg width="40" height="28" viewBox="0 0 40 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M24 8H26C27.1046 8 28 8.89543 28 10V22C28 23.1046 27.1046 24 26 24H24C22.8954 24 22 23.1046 22 22V10C22 8.89543 22.8954 8 24 8Z" fill="white"/>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M15 12H17C18.1046 12 19 12.8954 19 14V22C19 23.1046 18.1046 24 17 24H15C13.8954 24 13 23.1046 13 22V14C13 12.8954 13.8954 12 15 12Z" fill="white"/>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M6 15H8C9.10457 15 10 15.8954 10 17V22C10 23.1046 9.10457 24 8 24H6C4.89543 24 4 23.1046 4 22V17C4 15.8954 4.89543 15 6 15Z" fill="white"/>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M33 4H35C36.1046 4 37 4.89543 37 6V22C37 23.1046 36.1046 24 35 24H33C31.8954 24 31 23.1046 31 22V6C31 4.89543 31.8954 4 33 4Z" fill="white"/>
                            </svg>
                        </div>
                        <div class="icon-wifi">
                            <svg width="32" height="28" viewBox="0 0 32 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16.2654 17.8792C17.5444 17.8792 18.7872 18.2152 19.8822 18.8561L20.3259 19.1157C20.6623 19.3126 20.7214 19.7733 20.4456 20.0483L16.6575 23.826C16.4248 24.058 16.0475 24.058 15.8148 23.826L12.051 20.0726C11.7765 19.7988 11.8337 19.3404 12.1672 19.1421L12.6059 18.8813C13.711 18.2242 14.9695 17.8792 16.2654 17.8792Z" fill="white"/>
                            <path d="M16.2653 10.9397C19.447 10.9397 22.5018 11.9952 24.9904 13.9498L25.3421 14.2261C25.6225 14.4463 25.6471 14.8613 25.3948 15.113L23.1332 17.3682C22.924 17.5768 22.5931 17.6008 22.3559 17.4245L22.0802 17.2196C20.3994 15.9705 18.3727 15.3004 16.2653 15.3004C14.145 15.3004 12.1065 15.9788 10.4201 17.2423L10.1441 17.4491C9.90692 17.6268 9.57473 17.6034 9.36493 17.3942L7.10421 15.1397C6.85236 14.8886 6.87627 14.4746 7.15537 14.254L7.50508 13.9775C9.99957 12.0055 13.0683 10.9397 16.2653 10.9397Z" fill="white"/>
                            <path d="M16.2654 4C21.3148 4 26.1435 5.78114 29.9655 9.04589L30.2918 9.32455C30.5554 9.54976 30.571 9.95115 30.3255 10.1959L28.0713 12.4439C27.8529 12.6617 27.5038 12.6769 27.2671 12.479L26.988 12.2457C23.9788 9.72943 20.2071 8.36071 16.2654 8.36071C12.3103 8.36071 8.52654 9.73886 5.51282 12.2708L5.2336 12.5054C4.99699 12.7042 4.64717 12.6893 4.4284 12.4711L2.17451 10.2235C1.92939 9.97907 1.94447 9.57836 2.20729 9.35293L2.53228 9.07417C6.35905 5.79178 11.2011 4 16.2654 4Z" fill="white"/>
                            </svg>
                        </div>
                        <div class="icon-battery">
                            <svg width="50" height="28" viewBox="0 0 50 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M48 10C49.1046 10 50 10.8954 50 12V16C50 17.1046 49.1046 18 48 18V10Z" fill="white"/>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M6 2H40C43.3137 2 46 4.68629 46 8V20C46 23.3137 43.3137 26 40 26H6C2.68629 26 0 23.3137 0 20V8C0 4.68629 2.68629 2 6 2ZM6 4C3.79086 4 2 5.79086 2 8V20C2 22.2091 3.79086 24 6 24H40C42.2091 24 44 22.2091 44 20V8C44 5.79086 42.2091 4 40 4H6Z" fill="white"/>
                            <rect x="4" y="6" width="38" height="16" rx="2" fill="white"/>
                            </svg>
                        </div>
                    </div>
                </div>"""

CHROME_CSS = """
/* 固定顶栏：透明状态栏 + 导航；滚动白底渐显（对齐酒店首页 Tab） */
.hotel-detail-chrome {
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: min(100vw, var(--page-max-width, 750px));
  max-width: 100%;
  z-index: 200;
  box-sizing: border-box;
  pointer-events: none;
}
.hotel-detail-chrome__scrim {
  position: absolute;
  inset: 0;
  background: #ffffff;
  opacity: 0;
  pointer-events: none;
  transition: opacity 120ms ease-out;
}
.hotel-detail-chrome__inner {
  position: relative;
  z-index: 1;
  pointer-events: auto;
}
.hotel-detail-chrome.is-scrolled .status-bar {
  color: #0f131a;
}
.hotel-detail-chrome.is-scrolled .status-bar svg path,
.hotel-detail-chrome.is-scrolled .status-bar svg rect {
  fill: #0f131a;
}
.hotel-detail-chrome.is-scrolled .nav-bar .icon-button {
  background: rgba(15, 19, 26, 0.08);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}
.hotel-detail-chrome.is-scrolled .nav-bar .icon-button img {
  filter: brightness(0) saturate(100%);
  opacity: 0.92;
}
.hotel-detail-chrome .status-bar {
  box-sizing: border-box;
  width: 100%;
  height: 88px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 32px 28px 0 66px;
  color: #ffffff;
}
.hotel-detail-chrome .status-bar__time {
  font-family: "SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif;
  font-weight: 600;
  font-size: 30px;
}
.hotel-detail-chrome .status-bar__icons {
  display: flex;
  align-items: center;
  gap: 8px;
}
/* 顶栏内：与首图媒体区解耦，避免沿用 .hds-media 内的 absolute 叠层逻辑 */
.hotel-detail-chrome .top-content {
  position: relative !important;
  inset: auto !important;
  width: 100%;
}
"""

SCROLL_SCRIPT = """
<script>
(function () {
  var chrome = document.getElementById("hotelDetailChrome");
  var scrim = document.getElementById("hotelDetailChromeScrim");
  if (!chrome || !scrim) return;
  var fadeEnd = 160;
  function onScroll() {
    var y = window.scrollY || document.documentElement.scrollTop || 0;
    var p = Math.min(1, y / fadeEnd);
    scrim.style.opacity = String(p);
    chrome.classList.toggle("is-scrolled", p > 0.12);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
})();
</script>
"""


def main() -> None:
    text = TARGET.read_text(encoding="utf-8")

    # --- Filter: fix blank gap (wrong nested selector + viewport height) ---
    text = text.replace(
        """.hds-filter-flow {

        --design-width: 750;
        --design-height: 482;
""",
        """.hds-filter-flow {

        --design-width: 750;
        --design-height: 222;
""",
        1,
    )
    text = text.replace(
        """.hds-filter-sticky {

        --design-width: 750;
        --design-height: 482;
""",
        """.hds-filter-sticky {

        --design-width: 750;
        --design-height: 210;
""",
        1,
    )
    old_flow_rules = """.hds-filter-flow .hds-filter-flow .panel-sticky {

        display: none;
      
}

.hds-filter-flow .hds-filter-flow .panel-regular {

        display: none;
      
}

.hds-filter-flow .hds-filter-flow .panel-sticky {

        top: 0;
      
}
"""
    new_flow_rules = """.hds-filter-flow .panel-sticky {

        display: none !important;
      
}
"""
    if old_flow_rules not in text:
        raise SystemExit("Expected .hds-filter-flow nested rules block not found")
    text = text.replace(old_flow_rules, new_flow_rules, 1)

    old_sticky_rule = """.hds-filter-sticky .hds-filter-sticky .panel-sticky {

        top: 0;
      
}
"""
    new_sticky_rules = """.hds-filter-sticky .panel-sticky {

        top: 0;
      
}

.hds-filter-sticky .panel-regular {

        display: none !important;
      
}
"""
    if old_sticky_rule not in text:
        raise SystemExit("Expected .hds-filter-sticky nested rule not found")
    text = text.replace(old_sticky_rule, new_sticky_rules, 1)

    # --- Chrome CSS + dual selectors for nav chrome moved out of .hds-media ---
    marker = ".sticky-filter-layer.is-visible {\n  opacity: 1;\n  visibility: visible;\n  pointer-events: auto;\n}\n"
    if marker not in text:
        raise SystemExit("sticky-filter marker not found")
    if "/* 固定顶栏：透明状态栏" not in text:
        text = text.replace(marker, marker + CHROME_CSS + "\n", 1)

    pairs = [
        (".hds-media .top-content {", ".hds-media .top-content,\n.hotel-detail-chrome .top-content {"),
        (".hds-media .status-bar {", ".hds-media .status-bar,\n.hotel-detail-chrome .status-bar {"),
        (".hds-media .nav-bar {", ".hds-media .nav-bar,\n.hotel-detail-chrome .nav-bar {"),
        (".hds-media .nav-actions {", ".hds-media .nav-actions,\n.hotel-detail-chrome .nav-actions {"),
        (".hds-media .icon-button {", ".hds-media .icon-button,\n.hotel-detail-chrome .icon-button {"),
        (".hds-media .icon-button img {", ".hds-media .icon-button img,\n.hotel-detail-chrome .icon-button img {"),
    ]
    for old, new in pairs:
        if old not in text:
            raise SystemExit(f"Missing selector block: {old}")
        text = text.replace(old, new, 1)

    # --- Move top-content into fixed chrome; inject status bar ---
    m = re.search(
        r'(<div class="top-content">)(.*?)(</div>\s*<div class="tabs-wrapper">)',
        text,
        re.DOTALL,
    )
    if m:
        inner = m.group(2)
        inner = re.sub(
            r'<div class="status-bar"[^>]*>\s*</div>',
            STATUS_BAR_HTML,
            inner,
            count=1,
        )
        chrome_block = (
            '    <div class="hotel-detail-chrome" id="hotelDetailChrome">\n'
            '      <div class="hotel-detail-chrome__scrim" id="hotelDetailChromeScrim" aria-hidden="true"></div>\n'
            '      <div class="hotel-detail-chrome__inner">\n'
            f'        <div class="top-content">{inner}</div>\n'
            "      </div>\n"
            "    </div>\n\n"
        )
        body_needle = "<body>\n"
        if body_needle not in text:
            raise SystemExit("body tag not found")
        if 'id="hotelDetailChrome"' not in text:
            text = text.replace(body_needle, body_needle + chrome_block, 1)
        text = text.replace(m.group(0), '<div class="tabs-wrapper">', 1)
    elif 'id="hotelDetailChrome"' not in text:
        raise SystemExit("top-content block not found and chrome missing")

    # --- Replace large base64 images with hotel library URLs (cycle, avoid repeat where possible) ---
    idx = [0]

    def next_url() -> str:
        u = HOTEL_URLS[idx[0] % len(HOTEL_URLS)]
        idx[0] += 1
        return u

    def repl_src(m: re.Match[str]) -> str:
        full = m.group(0)
        if len(full) < 9000:
            return full
        return f'src="{next_url()}"'

    text = re.sub(r'src="data:image/(?:png|jpeg|jpg)[^"]+"', repl_src, text)

    # background-image: url("data:image...
    def repl_url(m: re.Match[str]) -> str:
        full = m.group(0)
        if len(full) < 9000:
            return full
        return f'background-image: url("{next_url()}")'

    text = re.sub(
        r'background-image:\s*url\("data:image/[^"]+"\)',
        repl_url,
        text,
    )

    # --- Scroll script before </body> ---
    if "hotelDetailChrome" in text and "fadeEnd = 160" not in text:
        text = text.replace("</body>", SCROLL_SCRIPT + "\n  </body>", 1)

    TARGET.write_text(text, encoding="utf-8")
    print("OK:", TARGET)
    print("Image replacements used index:", idx[0])


if __name__ == "__main__":
    main()
