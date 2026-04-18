#!/usr/bin/env python3
"""
Render a UXdesign-buff HTML report from review-state and constrained report slots.

This script loads localization from scripts/i18n/{lang}.json and renders
the report using the HTML template in templates/report-shell.html.
"""

from __future__ import annotations

import argparse
import html
import json
import re
from pathlib import Path
from typing import Any, Dict, Iterable, List, Optional, Sequence

# -----------------------------------------------------------------------------
# Constants
# -----------------------------------------------------------------------------

REPO_ROOT = Path(__file__).resolve().parents[1]
DEFAULT_TEMPLATE_PATH = REPO_ROOT / "templates" / "report-shell.html"
I18N_DIR = REPO_ROOT / "scripts" / "i18n"
PLACEHOLDER_RE = re.compile(r"{{\s*([a-zA-Z0-9_]+)\s*}}")

# Cache for loaded i18n data
_i18n_cache: Dict[str, Dict[str, Any]] = {}


# -----------------------------------------------------------------------------
# I18n Loading
# -----------------------------------------------------------------------------

def load_i18n(locale: str) -> Dict[str, Any]:
    """Load and cache i18n data for a given locale."""
    if locale in _i18n_cache:
        return _i18n_cache[locale]
    
    i18n_path = I18N_DIR / f"{locale}.json"
    if not i18n_path.exists():
        i18n_path = I18N_DIR / "en.json"  # fallback to English
    
    with i18n_path.open("r", encoding="utf-8") as handle:
        data = json.load(handle)
    
    _i18n_cache[locale] = data
    return data


def pick_language(report_language: str) -> str:
    """Determine locale from report_language string."""
    return "zh" if report_language.lower().startswith("zh") else "en"


def labels_for(report_language: str) -> Dict[str, str]:
    """Get labels dictionary for the given report language."""
    locale = pick_language(report_language)
    return load_i18n(locale).get("labels", {})


def get_localized_table(kind: str, locale: str) -> Dict[str, str]:
    """Get a localized lookup table (severity, confidence, ingest_status)."""
    i18n = load_i18n(locale)
    return i18n.get(kind, {})


# -----------------------------------------------------------------------------
# Utility Functions
# -----------------------------------------------------------------------------

def load_json(path: Path) -> Dict[str, Any]:
    """Load JSON from a file path."""
    with path.open("r", encoding="utf-8") as handle:
        return json.load(handle)


def write_text(path: Path, content: str) -> None:
    """Write text content to a file, ensuring parent directories exist."""
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(content.rstrip() + "\n", encoding="utf-8")


def escape_text(value: Any) -> str:
    """HTML-escape a value for safe inclusion in templates."""
    if value is None:
        return ""
    if isinstance(value, dict):
        # Extract text field if present, otherwise convert to string
        if "text" in value:
            value = value["text"]
        else:
            value = str(value)
    if isinstance(value, list):
        value = "\n".join(str(item) for item in value)
    return html.escape(str(value), quote=True)


def sanitize_methodology_span(value: str) -> str:
    """Allow <span class="methodology-source"> tags while escaping other HTML."""
    import re
    # Temporarily replace methodology-source spans with placeholders
    span_pattern = r'<span\s+class="methodology-source">([^<]*)</span>'
    placeholders: List[str] = []
    
    def save_span(match: re.Match[str]) -> str:
        content = html.escape(match.group(1), quote=True)
        placeholder = f"__METHODOLOGY_SPAN_{len(placeholders)}__"
        placeholders.append(f'<span class="methodology-source">{content}</span>')
        return placeholder
    
    temp = re.sub(span_pattern, save_span, str(value))
    # Escape remaining HTML
    escaped = html.escape(temp, quote=True)
    # Restore methodology spans
    for i, span in enumerate(placeholders):
        escaped = escaped.replace(f"__METHODOLOGY_SPAN_{i}__", span)
    return escaped


def sanitize_list_html(value: str) -> str:
    """Allow <ul>, <li>, and methodology-source spans while escaping other HTML."""
    import re
    # Save allowed HTML tags with placeholders
    placeholders: List[str] = []
    
    def save_tag(tag_name: str, match: re.Match[str]) -> str:
        placeholder = f"__TAG_{len(placeholders)}__"
        placeholders.append(match.group(0))
        return placeholder
    
    temp = str(value)
    # Save allowed tags
    allowed_patterns = [
        (r'<ul>', lambda m: save_tag('ul', m)),
        (r'</ul>', lambda m: save_tag('/ul', m)),
        (r'<li>', lambda m: save_tag('li', m)),
        (r'</li>', lambda m: save_tag('/li', m)),
        (r'<strong>', lambda m: save_tag('strong', m)),
        (r'</strong>', lambda m: save_tag('/strong', m)),
        (r'<span\s+class="methodology-source">([^<]*)</span>', 
         lambda m: save_tag('span', m)),
    ]
    
    for pattern, replacer in allowed_patterns:
        temp = re.sub(pattern, replacer, temp)
    
    # Escape remaining HTML
    escaped = html.escape(temp, quote=True)
    
    # Restore saved tags
    for i, tag in enumerate(placeholders):
        escaped = escaped.replace(f"__TAG_{i}__", tag)
    return escaped


def compact_text(value: Any, fallback: str) -> str:
    """Return stripped text or fallback if empty/None."""
    if value is None:
        return fallback
    if isinstance(value, dict):
        # Extract text field if present, otherwise convert to string
        if "text" in value:
            value = value["text"]
        else:
            value = str(value)
    if isinstance(value, list):
        value = "\n".join(str(item) for item in value)
    text = str(value).strip()
    return text if text else fallback


def first_non_empty(values: Iterable[Any], fallback: str) -> str:
    """Return the first non-empty value from an iterable, or fallback."""
    for value in values:
        # Handle dict type by extracting text field
        if isinstance(value, dict) and "text" in value:
            value = value["text"]
        text = compact_text(value, "").strip()
        if text:
            return text
    return fallback


def localize_value(kind: str, value: Any, report_language: str) -> str:
    """Localize a value (severity, confidence, ingest_status) based on report language."""
    normalized = str(value or "").strip().lower() or "unknown"
    locale = pick_language(report_language)
    labels = labels_for(report_language)
    table = get_localized_table(kind, locale)
    return table.get(normalized, compact_text(value, labels.get("unknown", "unknown")))


def slot_list(values: Any) -> List[str]:
    """Convert a value to a list of non-empty strings."""
    if isinstance(values, list):
        result: List[str] = []
        for item in values:
            if isinstance(item, dict):
                title = item.get("title") or item.get("question") or item.get("action") or item.get("text")
                context = item.get("context", "")
                if title and context:
                    result.append(f"{title}——{context}")
                elif title:
                    result.append(str(title).strip())
            elif str(item).strip():
                result.append(str(item).strip())
        return result
    return []


# -----------------------------------------------------------------------------
# Data Normalization
# -----------------------------------------------------------------------------

def normalize_issue_slots(raw: Any, state_issues: Any = None) -> Dict[str, Dict[str, Any]]:
    """Normalize issue slots into a dict keyed by stable_id."""
    if isinstance(raw, dict):
        if all(isinstance(value, dict) for value in raw.values()):
            return {str(key): value for key, value in raw.items()}
        if "stable_id" in raw:
            return {str(raw["stable_id"]): raw}
    if isinstance(raw, list):
        normalized: Dict[str, Dict[str, Any]] = {}
        # 优先按 stable_id 匹配
        for item in raw:
            if isinstance(item, dict) and item.get("stable_id"):
                normalized[str(item["stable_id"])] = item
        if normalized:
            return normalized
        # 回退：按 display_number 匹配到 state issues 的 stable_id
        if state_issues and isinstance(state_issues, list):
            dn_to_sid = {str(si.get("display_number")): str(si.get("stable_id"))
                         for si in state_issues if isinstance(si, dict) and si.get("stable_id") and si.get("display_number")}
            for item in raw:
                if isinstance(item, dict) and item.get("display_number"):
                    sid = dn_to_sid.get(str(item["display_number"]))
                    if sid:
                        normalized[sid] = item
            if normalized:
                return normalized
        # 最终回退：按数组顺序匹配
        if state_issues and isinstance(state_issues, list):
            for idx, item in enumerate(raw):
                if isinstance(item, dict) and idx < len(state_issues):
                    sid = str(state_issues[idx].get("stable_id", f"idx_{idx}"))
                    normalized[sid] = item
            return normalized
    return {}


def issue_lookup(state: Dict[str, Any]) -> Dict[str, Dict[str, Any]]:
    """Create a lookup dict of issues by stable_id."""
    return {str(issue.get("stable_id")): issue 
            for issue in state.get("issues", []) if issue.get("stable_id")}


def normalize_priority_titles(entries: Any) -> List[str]:
    """Extract titles from priority entries (open_questions, next_actions)."""
    if not isinstance(entries, list):
        return []
    titles: List[str] = []
    for entry in entries:
        if isinstance(entry, dict):
            value = entry.get("title") or entry.get("question") or entry.get("action")
            if value:
                titles.append(str(value).strip())
        elif entry:
            titles.append(str(entry).strip())
    return [item for item in titles if item]


def summarize_history_ids(ids: Sequence[str], fallback: str) -> str:
    """Join history IDs with Chinese comma, or return fallback."""
    values = [str(item).strip() for item in ids if str(item).strip()]
    return "、".join(values) if values else fallback


# -----------------------------------------------------------------------------
# HTML Rendering Helpers
# -----------------------------------------------------------------------------

def panel_body_html(body: Any, fallback: str) -> str:
    """Render panel body content as HTML paragraphs."""
    paragraphs: List[str] = []
    if isinstance(body, dict):
        if isinstance(body.get("paragraphs"), list):
            paragraphs = [str(item).strip() for item in body["paragraphs"] if str(item).strip()]
        elif body.get("body") is not None:
            paragraphs = [seg.strip() for seg in str(body["body"]).split("\n\n") if seg.strip()]
    elif isinstance(body, list):
        paragraphs = [str(item).strip() for item in body if str(item).strip()]
    elif body is not None:
        paragraphs = [seg.strip() for seg in str(body).split("\n\n") if seg.strip()]

    if not paragraphs:
        paragraphs = [fallback]
    return "".join(f"<p>{escape_text(p)}</p>" for p in paragraphs)


def render_panel(panel: Any, title: str, fallback: str) -> str:
    """Render a panel with heading and body."""
    if isinstance(panel, dict):
        heading = compact_text(panel.get("title"), title)
        body_source = panel
    else:
        heading = title
        body_source = panel
    return f"<h3>{escape_text(heading)}</h3>{panel_body_html(body_source, fallback)}"


def render_list_items(items: Sequence[str], fallback: str) -> str:
    """Render a list of items as HTML <li> elements."""
    values = [compact_text(item, "").strip() for item in items if compact_text(item, "").strip()]
    if not values:
        values = [fallback]
    return "".join(f"<li>{escape_text(item)}</li>" for item in values)


# -----------------------------------------------------------------------------
# Component Builders
# -----------------------------------------------------------------------------

def build_top_priority_chips(state: Dict[str, Any], slots: Dict[str, Any], 
                              labels: Dict[str, str]) -> List[str]:
    """Build the top 3 priority chips for the overview."""
    slot_values = slot_list(slots.get("overview", {}).get("top_priority_chips"))
    if slot_values:
        values = slot_values
    else:
        lookup = issue_lookup(state)
        values = []
        for stable_id in state.get("priorities", {}).get("top_issue_ids", []):
            issue = lookup.get(str(stable_id))
            if issue and issue.get("title"):
                values.append(str(issue["title"]).strip())
        if not values and state.get("issues"):
            values = [str(issue.get("title", "")).strip() 
                     for issue in state["issues"][:3] if issue.get("title")]
    
    none_label = labels.get("none", "暂无。")
    while len(values) < 3:
        values.append(none_label)
    return values[:3]


def render_issue_cards(state: Dict[str, Any], slots: Dict[str, Any], 
                       labels: Dict[str, str], report_language: str) -> str:
    """Render all issue cards as HTML."""
    slot_map = normalize_issue_slots(slots.get("issues"), state.get("issues", []))
    cards: List[str] = []
    
    # Get categories mapping table
    locale = pick_language(report_language)
    categories_table = get_localized_table("categories", locale)
    
    for issue in state.get("issues", []):
        stable_id = str(issue.get("stable_id", ""))
        slot = slot_map.get(stable_id, {})
        
        display_number = compact_text(issue.get("display_number"), labels.get("unknown", "unknown"))
        title = compact_text(issue.get("title"), labels.get("unknown", "unknown"))
        
        # Map category to localized display value
        category_raw = compact_text(issue.get("category"), "")
        category = categories_table.get(category_raw, 
                                        categories_table.get(category_raw.lower(), 
                                                           category_raw if category_raw else labels.get("unknown", "unknown")))
        
        severity = localize_value("severity", issue.get("severity"), report_language)
        confidence = localize_value("confidence", issue.get("confidence"), report_language)
        
        diagnosis_raw = first_non_empty([
            slot.get("diagnosis_paragraph"), 
            slot.get("problem_paragraph"), 
            issue.get("problem_summary")
        ], labels.get("none", "暂无。"))
        # Allow <span class="methodology-source"> in diagnosis, escape other HTML
        diagnosis = sanitize_methodology_span(diagnosis_raw)
        
        direction_raw = first_non_empty([
            slot.get("recommended_direction_paragraph"), 
            slot.get("recommendation_paragraph"),
            slot.get("solution_paragraph"), 
            issue.get("recommendation_summary")
        ], labels.get("none", "暂无。"))
        # Allow <ul>/<li> and methodology-source spans in direction
        direction = sanitize_list_html(direction_raw)
        
        prompts = issue.get("discussion_prompts")
        need_to_confirm = first_non_empty([
            slot.get("need_to_confirm"),
            prompts[0] if prompts else None
        ], labels.get("none", "暂无。"))
        
        cards.append("\n".join([
            '<article class="issue-card">',
            "  <header>",
            f"    <h3>{escape_text(display_number)} · {escape_text(title)}</h3>",
            f'    <div class="issue-meta">{escape_text(category)} · {escape_text(severity)} · {escape_text(confidence)}</div>',
            "  </header>",
            '  <div class="split-list">',
            '    <div class="panel">',
            f"      <h3>{escape_text(labels.get('diagnosis_label', '诊断'))}</h3>",
            f"      <p>{diagnosis}</p>",  # diagnosis is already sanitized
            "    </div>",
            '    <div class="panel">',
            f"      <h3>{escape_text(labels.get('recommended_direction_label', '修改建议'))}</h3>",
            f"      <p>{direction}</p>",  # direction is already sanitized
            "    </div>",
            '    <div class="panel">',
            f"      <h3>{escape_text(labels.get('need_to_confirm_label', '需确认'))}</h3>",
            f"      <p>{escape_text(need_to_confirm)}</p>",
            "    </div>",
            "  </div>",
            "</article>",
        ]))
    
    return "\n".join(cards)


def render_timeline_block(block: Dict[str, Any], labels: Dict[str, str]) -> str:
    """Render a single timeline block."""
    heading = compact_text(block.get("heading"), labels.get("none", "暂无。"))
    problem = compact_text(block.get("problem"), labels.get("none", "暂无。"))
    
    # Special handling for "三流正常" blocks
    if heading == "三流正常":
        return "\n".join([
            '    <div class="timeline-block flow-pass">',
            f"      <h3>{escape_text(heading)}</h3>",
            f'      <p>{escape_text(problem)}</p>',
            "    </div>",
        ])
    
    # Normal block rendering
    solution = compact_text(block.get("solution"), labels.get("none", "暂无。"))
    problem_label = labels.get("problem_label", "问题：")
    solution_label = labels.get("solution_label", "解法：")
    
    # Optional methodology source annotation
    methodology_source = compact_text(block.get("methodology_source"), "").strip()
    methodology_html = ""
    if methodology_source:
        methodology_html = f'\n      <span class="methodology-source">{escape_text(methodology_source)}</span>'
    
    return "\n".join([
        '    <div class="timeline-block">',
        f"      <h3>{escape_text(heading)}</h3>",
        f'      <p><span class="inline-label">{escape_text(problem_label)}</span> {escape_text(problem)}</p>',
        f'      <p><span class="inline-label">{escape_text(solution_label)}</span> {escape_text(solution)}{methodology_html}</p>',
        "    </div>",
    ])


def render_timeline_nodes(slots: Dict[str, Any], labels: Dict[str, str]) -> str:
    """Render all timeline nodes as HTML."""
    three_flow = slots.get("three_flow", {})
    nodes = three_flow.get("nodes", [])
    rendered_nodes: List[str] = []
    
    for index, node in enumerate(nodes, start=1):
        stage_number = compact_text(node.get("stage_number"), f"{index:02d}")
        stage_title = compact_text(node.get("stage_title"), labels.get("unknown", "unknown"))
        stage_summary = compact_text(node.get("stage_summary"), "")
        timeline_summary = compact_text(node.get("timeline_summary"), labels.get("none", "暂无。"))
        
        blocks = node.get("blocks") or []
        rendered_blocks = [render_timeline_block(block, labels) for block in blocks]
        
        if not rendered_blocks:
            # Create a placeholder block
            rendered_blocks = [render_timeline_block({}, labels)]
        
        summary_html = (
            f'              <div class="timeline-stage-summary">{escape_text(stage_summary)}</div>'
            if stage_summary else ""
        )
        
        rendered_nodes.append("\n".join([
            '<article class="timeline-node">',
            '  <div class="timeline-stage">',
            f'    <div class="timeline-dot">{escape_text(stage_number)}</div>',
            '    <div class="timeline-stage-text">',
            f'      <div class="timeline-stage-title">{escape_text(stage_title)}</div>',
            summary_html,
            "    </div>",
            "  </div>",
            '  <div class="timeline-card">',
            f'    <p class="timeline-summary">{escape_text(timeline_summary)}</p>',
            *rendered_blocks,
            "  </div>",
            "</article>",
        ]))
    
    return "\n".join(rendered_nodes)


def build_footer_note(state: Dict[str, Any]) -> str:
    """Build the footer note with run information."""
    meta = state.get("meta", {})
    intake = state.get("intake", {})
    slug = compact_text(meta.get("review_slug"), "unknown")
    run_id = compact_text(meta.get("run_id"), "unknown")
    
    note = f"产物路径：UXdesign-buff-reviews/{slug}/report.html · run_id: {run_id}"
    
    requested = compact_text(meta.get("requested_input_node"), "").strip()
    reviewed = compact_text(meta.get("reviewed_node"), "").strip()
    
    if requested and reviewed and requested != reviewed:
        note += f" · 输入节点: {requested} · 实际评审节点: {reviewed}"
    elif intake.get("figma_intake_node"):
        note += f" · 评审节点: {compact_text(intake.get('figma_intake_node'), 'unknown')}"
    
    return note


# -----------------------------------------------------------------------------
# Context Building
# -----------------------------------------------------------------------------

def build_context(state: Dict[str, Any], slots: Dict[str, Any]) -> Dict[str, str]:
    """Build the complete template context from state and slots."""
    meta = state.get("meta", {})
    intake = state.get("intake", {})
    history = state.get("history", {})
    priorities = state.get("priorities", {})
    
    report_language = compact_text(meta.get("report_language"), "zh-CN")
    labels = labels_for(report_language)
    
    # Build top priority chips once
    top_priority_chips = build_top_priority_chips(state, slots, labels)
    
    # Get highest priority issue
    issues_by_id = issue_lookup(state)
    highest_priority_id = compact_text(priorities.get("highest_priority_issue_id"), "")
    highest_issue = issues_by_id.get(highest_priority_id) if highest_priority_id else None
    if not highest_issue and state.get("issues"):
        highest_issue = state["issues"][0]
    
    # Get highest priority slot
    highest_slot_map = slots.get("highest_priority_issue", {})
    if isinstance(highest_slot_map, dict) and highest_issue:
        sid = highest_issue.get("stable_id")
        highest_slot = highest_slot_map.get(str(sid), highest_slot_map) if sid else highest_slot_map
    else:
        highest_slot = {}
    
    overview_slots = slots.get("overview", {})
    background_slots = slots.get("background_and_evidence", {})
    resolution_slots = slots.get("resolution_tracks", {})
    
    # Build context dictionary
    context = {
        # Report header
        "report_mode_label": (
            labels.get("report_mode_self", "自查模式 · 设计评审报告")
            if compact_text(meta.get("report_mode"), "self-check") == "self-check"
            else labels.get("report_mode_agent", "机器交接模式 · 设计评审报告")
        ),
        "project_name": compact_text(meta.get("project_name"), labels.get("unknown", "unknown")),
        "overall_diagnosis": compact_text(overview_slots.get("overall_diagnosis"), labels.get("none", "暂无。")),
        
        # Chip labels
        "review_slug_chip_label": labels.get("review_slug_chip_label", "评审标识"),
        "review_date_chip_label": labels.get("review_date_chip_label", "日期"),
        "report_language_chip_label": labels.get("report_language_chip_label", "语言"),
        "ingest_status_chip_label": labels.get("ingest_status_chip_label", "读取状态"),
        
        # Chip values
        "review_slug": compact_text(meta.get("review_slug"), labels.get("unknown", "unknown")),
        "review_date": compact_text(meta.get("review_date"), labels.get("unknown", "unknown")),
        "report_language": report_language,
        "ingest_status": localize_value("ingest_status", intake.get("ingest_status"), report_language),
        
        # Executive summary labels
        "reviewer_label": labels.get("reviewer_label", "评审器"),
        "figma_file_label": labels.get("figma_file_label", "Figma 文件"),
        "figma_node_label": labels.get("figma_node_label", "评审节点"),
        "reviewer": compact_text(meta.get("reviewer"), labels.get("unknown", "unknown")),
        "figma_file_key": compact_text(intake.get("figma_file_key"), labels.get("unknown", "unknown")),
        "figma_intake_node": compact_text(
            meta.get("reviewed_node") or intake.get("figma_intake_node"), 
            labels.get("unknown", "unknown")
        ),
        
        # Verdict
        "verdict_label": labels.get("verdict_label", "当前评估"),
        "current_verdict": compact_text(overview_slots.get("current_verdict"), labels.get("none", "暂无。")),
        
        # Top priorities
        "top_priority_1": top_priority_chips[0],
        "top_priority_2": top_priority_chips[1],
        "top_priority_3": top_priority_chips[2],
        
        # Changes section
        "changes_title": labels.get("changes_title", "本次更新"),
        "new_issues_label": labels.get("new_issues_label", "新增问题"),
        "resolved_issues_label": labels.get("resolved_issues_label", "已解决问题"),
        "changed_issues_label": labels.get("changed_issues_label", "本次变化"),
        "new_issues": compact_text(
            slots.get("changes", {}).get("new_issues"),
            summarize_history_ids(history.get("new_issue_ids", []), labels.get("no_prior_review", ""))
        ),
        "resolved_issues": compact_text(
            slots.get("changes", {}).get("resolved_issues"),
            summarize_history_ids(history.get("resolved_issue_ids", []), labels.get("no_changes", ""))
        ),
        "changed_issues": compact_text(
            slots.get("changes", {}).get("changed_issues"),
            summarize_history_ids(history.get("changed_issue_ids", []), labels.get("no_changes", ""))
        ),
        
        # Highest priority section
        "highest_priority_section_title": labels.get("highest_priority_section_title", "最高优先级问题"),
        "issue_label": labels.get("issue_label", "核心问题"),
        "highest_priority_display_number": compact_text(
            highest_issue.get("display_number") if highest_issue else None,
            labels.get("unknown", "unknown")
        ),
        "highest_priority_issue_title": compact_text(
            highest_issue.get("title") if highest_issue else None, 
            labels.get("unknown", "unknown")
        ),
        # Map highest priority category to localized display value
        "highest_priority_category": (
            lambda raw: get_localized_table("categories", pick_language(report_language)).get(
                raw, get_localized_table("categories", pick_language(report_language)).get(
                    raw.lower(), raw if raw else labels.get("unknown", "unknown")
                )
            )
        )(compact_text(highest_issue.get("category") if highest_issue else None, "")),
        "highest_priority_severity": localize_value(
            "severity", 
            highest_issue.get("severity") if highest_issue else None, 
            report_language
        ),
        "highest_priority_confidence": localize_value(
            "confidence", 
            highest_issue.get("confidence") if highest_issue else None, 
            report_language
        ),
        
        # Diagnosis labels
        "diagnosis_label": labels.get("diagnosis_label", "诊断"),
        "why_first_label": labels.get("why_first_label", "为何优先"),
        "recommended_direction_label": labels.get("recommended_direction_label", "修改建议"),
        "need_to_confirm_label": labels.get("need_to_confirm_label", "需确认"),
        
        # Highest priority content
        "highest_priority_diagnosis_paragraph": first_non_empty([
            highest_slot.get("diagnosis_paragraph"), 
            highest_issue.get("problem_summary") if highest_issue else None
        ], labels.get("none", "暂无。")),
        "highest_priority_why_first_paragraph": compact_text(
            highest_slot.get("why_first_paragraph"), 
            labels.get("none", "暂无。")
        ),
        "highest_priority_recommended_direction_paragraph": first_non_empty([
            highest_slot.get("recommended_direction_paragraph"), 
            highest_issue.get("recommendation_summary") if highest_issue else None
        ], labels.get("none", "暂无。")),
        "highest_priority_need_to_confirm": first_non_empty([
            highest_slot.get("need_to_confirm"),
            (highest_issue.get("discussion_prompts", [None])[0] 
             if highest_issue and highest_issue.get("discussion_prompts") else None)
        ], labels.get("none", "暂无。")),
        
        # Background section
        "background_title": labels.get("background_title", "评审依据与边界"),
        "background_and_evidence_html": render_panel(
            background_slots.get("review_basis"),
            labels.get("background_basis_title", "评审依据"),
            labels.get("none", "暂无。")
        ),
        "review_boundaries_html": render_panel(
            background_slots.get("review_boundaries"),
            labels.get("background_boundaries_title", "评审边界"),
            labels.get("none", "暂无。")
        ),
        
        # Full review section
        "full_review_title": labels.get("full_review_title", "完整评审"),
        "issue_cards_html": render_issue_cards(state, slots, labels, report_language),
        
        # Three-flow section
        "three_flow_title": labels.get("three_flow_title", "三流一致性"),
        "timeline_nodes_html": render_timeline_nodes(slots, labels),
        "three_flow_synthesis_label": labels.get("three_flow_synthesis_label", "整体判断"),
        "three_flow_synthesis_paragraph": compact_text(
            slots.get("three_flow", {}).get("synthesis_paragraph"),
            labels.get("none", "暂无。")
        ),
        
        # Resolution tracks section
        "resolution_tracks_title": labels.get("resolution_tracks_title", "结构摘要"),
        "issue_distribution_label": labels.get("issue_distribution_label", "问题分布"),
        "issue_distribution_paragraph": compact_text(
            resolution_slots.get("issue_distribution_paragraph"),
            labels.get("none", "暂无。")
        ),
        "resolution_paths_label": labels.get("resolution_paths_label", "分三批推进"),
        "resolution_paths_paragraph": compact_text(
            resolution_slots.get("resolution_paths_paragraph"),
            labels.get("none", "暂无。")
        ),
        "key_risk_label": labels.get("key_risk_label", "关键风险"),
        "key_risk_paragraph": compact_text(
            resolution_slots.get("key_risk_paragraph"),
            labels.get("none", "暂无。")
        ),
        
        # Actions section
        "actions_title": labels.get("actions_title", "待确认与下一步"),
        "open_questions_title": labels.get("open_questions_title", "待确认"),
        "next_actions_title": labels.get("next_actions_title", "下一步"),
        "open_questions_items_html": render_list_items(
            slot_list(slots.get("open_questions")) or normalize_priority_titles(priorities.get("open_questions")),
            labels.get("none", "暂无。")
        ),
        "next_actions_items_html": render_list_items(
            slot_list(slots.get("next_actions")) or normalize_priority_titles(priorities.get("next_actions")),
            labels.get("none", "暂无。")
        ),
        
        # Footer
        "footer_note": compact_text(slots.get("footer_note"), build_footer_note(state)),
    }
    
    return context


# -----------------------------------------------------------------------------
# Template Rendering
# -----------------------------------------------------------------------------

def render_template(template: str, context: Dict[str, str]) -> str:
    """Render the template by substituting placeholders with context values."""
    def replacer(match: re.Match[str]) -> str:
        key = match.group(1)
        if key not in context:
            raise KeyError(f"missing render context for placeholder '{key}'")
        return context[key]

    rendered = PLACEHOLDER_RE.sub(replacer, template)
    leftovers = sorted(set(PLACEHOLDER_RE.findall(rendered)))
    if leftovers:
        raise KeyError(f"unresolved placeholders remain: {', '.join(leftovers)}")
    return rendered


# -----------------------------------------------------------------------------
# Main Entry Point
# -----------------------------------------------------------------------------

def main() -> int:
    """Main entry point for the render script."""
    parser = argparse.ArgumentParser(
        description="Render a UXdesign-buff HTML report from review-state and constrained report slots."
    )
    parser.add_argument("state", help="Path to UXdesign-buff review-state.json")
    parser.add_argument(
        "--slots",
        required=True,
        help="Path to constrained report-slots.json stored in hidden scratch or another technical location",
    )
    parser.add_argument("--output", help="Output report.html path; defaults to the sibling of review-state.json")
    parser.add_argument("--template", default=str(DEFAULT_TEMPLATE_PATH), help="Template path to use")
    args = parser.parse_args()

    state_path = Path(args.state).resolve()
    slots_path = Path(args.slots).resolve()
    output_path = Path(args.output).resolve() if args.output else state_path.with_name("report.html")
    template_path = Path(args.template).resolve()

    state = load_json(state_path)
    slots = load_json(slots_path)
    template = template_path.read_text(encoding="utf-8")

    context = build_context(state, slots)
    rendered = render_template(template, context)
    write_text(output_path, rendered)
    print(f"Rendered {output_path}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
