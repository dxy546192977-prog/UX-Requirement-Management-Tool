#!/usr/bin/env python3
"""
Validate UXdesign-buff review roots and hidden scratch.

This script loads validation rules from scripts/rules/report-rules.json
and i18n scaffold tokens from scripts/i18n/{lang}.json.
"""

from __future__ import annotations

import argparse
import json
import re
import sys
from dataclasses import dataclass, field
from html.parser import HTMLParser
from pathlib import Path
from typing import Any, Dict, Iterable, List, Optional, Set

# -----------------------------------------------------------------------------
# Constants
# -----------------------------------------------------------------------------

REPO_ROOT = Path(__file__).resolve().parents[1]
TEMPLATE_PATH = REPO_ROOT / "templates" / "report-shell.html"
RULES_PATH = REPO_ROOT / "scripts" / "rules" / "report-rules.json"
I18N_DIR = REPO_ROOT / "scripts" / "i18n"
HTML_LANG_RE = re.compile(r"<html[^>]*\blang=[\"']([^\"']+)[\"']", re.IGNORECASE)
CLASS_ATTR_RE = re.compile(r'class=["\']([^"\']+)["\']')

# Cache for loaded configurations
_rules_cache: Optional[Dict[str, Any]] = None
_i18n_cache: Dict[str, Dict[str, Any]] = {}


# -----------------------------------------------------------------------------
# Configuration Loading
# -----------------------------------------------------------------------------

def load_rules() -> Dict[str, Any]:
    """Load and cache validation rules from JSON file."""
    global _rules_cache
    if _rules_cache is not None:
        return _rules_cache
    
    with RULES_PATH.open("r", encoding="utf-8") as handle:
        _rules_cache = json.load(handle)
    return _rules_cache


def load_i18n(locale: str) -> Dict[str, Any]:
    """Load and cache i18n data for a given locale."""
    if locale in _i18n_cache:
        return _i18n_cache[locale]
    
    i18n_path = I18N_DIR / f"{locale}.json"
    if not i18n_path.exists():
        i18n_path = I18N_DIR / "en.json"
    
    with i18n_path.open("r", encoding="utf-8") as handle:
        data = json.load(handle)
    
    _i18n_cache[locale] = data
    return data


def get_scaffold_tokens(locale: str) -> List[str]:
    """Get forbidden scaffold tokens for a locale."""
    i18n = load_i18n(locale)
    return i18n.get("scaffold_tokens", [])


# -----------------------------------------------------------------------------
# HTML Parsing (MiniHTMLParser)
# -----------------------------------------------------------------------------

@dataclass
class Node:
    """Represents an HTML node with parent reference for tree traversal."""
    tag: str
    attrs: Dict[str, str]
    parent: Optional["Node"] = None
    children: List["Node"] = field(default_factory=list)
    texts: List[str] = field(default_factory=list)

    @property
    def classes(self) -> Set[str]:
        """Get set of CSS classes on this node."""
        value = self.attrs.get("class", "")
        return {item for item in value.split() if item}

    def append_child(self, node: "Node") -> None:
        """Add a child node."""
        self.children.append(node)


class MiniHTMLParser(HTMLParser):
    """Minimal HTML parser that builds a tree with parent references."""
    
    VOID_TAGS = {
        "area", "base", "br", "col", "embed", "hr", "img", "input",
        "link", "meta", "param", "source", "track", "wbr",
    }

    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.root = Node("document", {})
        self.stack: List[Node] = [self.root]

    def handle_starttag(self, tag: str, attrs: List[tuple[str, Optional[str]]]) -> None:
        normalized = {key: (value or "") for key, value in attrs}
        node = Node(tag.lower(), normalized, self.stack[-1])
        self.stack[-1].append_child(node)
        if tag.lower() not in self.VOID_TAGS:
            self.stack.append(node)

    def handle_startendtag(self, tag: str, attrs: List[tuple[str, Optional[str]]]) -> None:
        normalized = {key: (value or "") for key, value in attrs}
        node = Node(tag.lower(), normalized, self.stack[-1])
        self.stack[-1].append_child(node)

    def handle_endtag(self, tag: str) -> None:
        target = tag.lower()
        for index in range(len(self.stack) - 1, 0, -1):
            if self.stack[index].tag == target:
                del self.stack[index:]
                break

    def handle_data(self, data: str) -> None:
        if data:
            self.stack[-1].texts.append(data)


# -----------------------------------------------------------------------------
# DOM Utilities
# -----------------------------------------------------------------------------

def parse_html(html: str) -> Node:
    """Parse HTML string into a Node tree."""
    parser = MiniHTMLParser()
    parser.feed(html)
    parser.close()
    return parser.root


def walk(node: Node) -> Iterable[Node]:
    """Yield all nodes in the tree (depth-first)."""
    yield node
    for child in node.children:
        yield from walk(child)


def find_by_id(node: Node, target_id: str) -> Optional[Node]:
    """Find a node by its id attribute."""
    for child in walk(node):
        if child.attrs.get("id") == target_id:
            return child
    return None


def find_first(node: Node, predicate) -> Optional[Node]:
    """Find the first node matching a predicate."""
    for child in walk(node):
        if predicate(child):
            return child
    return None


def find_all(node: Node, predicate) -> List[Node]:
    """Find all nodes matching a predicate."""
    return [child for child in walk(node) if predicate(child)]


def text_content(node: Node) -> str:
    """Get all text content from a node and its descendants."""
    parts = list(node.texts)
    for child in node.children:
        parts.append(text_content(child))
    return "".join(parts)


def normalize_text(value: str) -> str:
    """Normalize whitespace in text."""
    return " ".join(value.split())


def is_descendant(node: Optional[Node], ancestor: Optional[Node]) -> bool:
    """Check if node is a descendant of ancestor."""
    if not node or not ancestor:
        return False
    current = node
    while current is not None:
        if current is ancestor:
            return True
        current = current.parent
    return False


def nearest_ancestor_with_class(node: Optional[Node], class_name: str) -> Optional[Node]:
    """Find the nearest ancestor with a specific CSS class."""
    current = node
    while current is not None:
        if class_name in current.classes:
            return current
        current = current.parent
    return None


def direct_children_with_class(node: Node, class_name: str) -> List[Node]:
    """Get direct children with a specific CSS class."""
    return [child for child in node.children if class_name in child.classes]


# -----------------------------------------------------------------------------
# JSON Utilities
# -----------------------------------------------------------------------------

def load_json(path: Path) -> Dict:
    """Load JSON from a file path."""
    with path.open("r", encoding="utf-8") as handle:
        return json.load(handle)


def load_text(path: Path) -> str:
    """Load text content from a file path."""
    return path.read_text(encoding="utf-8")


def collect_keys(value) -> Iterable[str]:
    """Recursively collect all keys from a nested structure."""
    if isinstance(value, dict):
        for key, child in value.items():
            yield key
            yield from collect_keys(child)
    elif isinstance(value, list):
        for item in value:
            yield from collect_keys(item)


# -----------------------------------------------------------------------------
# Template Class Extraction
# -----------------------------------------------------------------------------

def template_dom_classes() -> Set[str]:
    """Get all CSS classes used in the template plus render fragment classes."""
    rules = load_rules()
    template_html = load_text(TEMPLATE_PATH)
    classes: Set[str] = set()
    for value in CLASS_ATTR_RE.findall(template_html):
        classes.update(item for item in value.split() if item)
    # Add render fragment classes from rules
    fragment_classes = rules.get("render_fragment_classes", [])
    return classes | set(fragment_classes)


# -----------------------------------------------------------------------------
# Validation Functions
# -----------------------------------------------------------------------------

def validate_required_sections(root: Node, report_path: Path, errors: List[str]) -> None:
    """Validate that all required section IDs are present."""
    rules = load_rules()
    required_ids = rules.get("sections", {}).get("required_ids", [])
    
    for section_id in required_ids:
        if not find_by_id(root, section_id):
            errors.append(f"{report_path}: missing required section id '{section_id}'")


def validate_template_classes(html: str, report_path: Path, errors: List[str]) -> None:
    """Validate that only allowed CSS classes are used."""
    allowed = template_dom_classes()
    used: Set[str] = set()
    for value in CLASS_ATTR_RE.findall(html):
        used.update(item for item in value.split() if item)
    unexpected = sorted(used - allowed)
    if unexpected:
        errors.append(f"{report_path}: uses template-external classes: {', '.join(unexpected)}")


def validate_html_markers(html: str, report_path: Path, errors: List[str]) -> None:
    """Validate required HTML markers are present."""
    rules = load_rules()
    markers = rules.get("html_structure", {}).get("required_markers", {})
    
    lowered = html.lower()
    if "<html" not in lowered or "</html>" not in lowered:
        errors.append(f"{report_path}: does not look like a complete HTML document")
    
    body_marker = markers.get("body_marker", 'data-UXdesign-buff-report="v1"')
    if body_marker not in html and body_marker.replace('"', "'") not in html:
        errors.append(f'{report_path}: missing body marker {body_marker}')
    
    template_markers = markers.get("template_markers", [])
    for marker in template_markers:
        if marker not in html:
            errors.append(f"{report_path}: missing UXdesign-buff HTML template marker '{marker}'")


def validate_executive_summary(root: Node, report_path: Path, errors: List[str]) -> None:
    """Validate executive summary structure."""
    rules = load_rules()
    es_rules = rules.get("html_structure", {}).get("executive_summary", {})
    
    overview = find_by_id(root, "review-overview")
    executive_summary = find_by_id(root, "executive-summary")
    
    if executive_summary:
        expected_tag = es_rules.get("tag", "aside")
        required_class = es_rules.get("required_class", "hero-panel")
        parent_id = es_rules.get("parent_id", "review-overview")
        
        if executive_summary.tag != expected_tag or required_class not in executive_summary.classes:
            errors.append(f"{report_path}: #executive-summary must render as {expected_tag}.{required_class}")
        
        parent = find_by_id(root, parent_id)
        if not is_descendant(executive_summary, parent):
            errors.append(f"{report_path}: #executive-summary must live inside #{parent_id}")


def validate_timeline(root: Node, report_path: Path, errors: List[str]) -> None:
    """Validate three-flow timeline structure."""
    rules = load_rules()
    timeline_rules = rules.get("timeline", {})
    
    parent_id = timeline_rules.get("parent_id", "three-flow-consistency")
    node_class = timeline_rules.get("node_class", "timeline-node")
    min_nodes = timeline_rules.get("min_nodes", 4)
    max_nodes = timeline_rules.get("max_nodes")
    block_labels = timeline_rules.get("block_labels", {})
    problem_labels = tuple(block_labels.get("problem", []))
    solution_labels = tuple(block_labels.get("solution", []))
    
    three_flow = find_by_id(root, parent_id)
    if not three_flow:
        return
    
    timeline_nodes = find_all(three_flow, lambda node: node_class in node.classes)
    count = len(timeline_nodes)
    if count < min_nodes:
        errors.append(f"{report_path}: #{parent_id} must contain at least {min_nodes} .{node_class} items")
    if max_nodes is not None and count > max_nodes:
        errors.append(f"{report_path}: #{parent_id} must contain at most {max_nodes} .{node_class} items")
    
    for index, node in enumerate(timeline_nodes, start=1):
        stage = find_first(node, lambda child: "timeline-stage" in child.classes)
        card = find_first(node, lambda child: "timeline-card" in child.classes)
        
        if not stage or not card:
            errors.append(f"{report_path}: timeline node {index} must contain both .timeline-stage and .timeline-card")
            continue
        
        if not find_first(stage, lambda child: "timeline-dot" in child.classes):
            errors.append(f"{report_path}: timeline node {index} is missing .timeline-dot")
        if not find_first(stage, lambda child: "timeline-stage-title" in child.classes):
            errors.append(f"{report_path}: timeline node {index} is missing .timeline-stage-title")
        if not find_first(card, lambda child: "timeline-summary" in child.classes):
            errors.append(f"{report_path}: timeline node {index} is missing .timeline-summary")
        
        blocks = find_all(card, lambda child: "timeline-block" in child.classes)
        if not blocks:
            errors.append(f"{report_path}: timeline node {index} must contain at least one .timeline-block")
        
        for block_index, block in enumerate(blocks, start=1):
            text = normalize_text(text_content(block))
            if problem_labels and not any(label in text for label in problem_labels):
                errors.append(f"{report_path}: timeline node {index} block {block_index} must contain a problem label")
            if solution_labels and not any(label in text for label in solution_labels):
                errors.append(f"{report_path}: timeline node {index} block {block_index} must contain a solution label")


def validate_resolution_tracks(root: Node, report_path: Path, errors: List[str]) -> None:
    """Validate resolution tracks structure."""
    rules = load_rules()
    res_rules = rules.get("html_structure", {}).get("resolution_tracks", {})
    
    grid_class = res_rules.get("grid_class", "three-col")
    panel_class = res_rules.get("panel_class", "panel")
    required_panel_count = res_rules.get("required_panel_count", 3)
    
    resolution_tracks = find_by_id(root, "resolution-tracks")
    if not resolution_tracks:
        return
    
    summary_grid = find_first(resolution_tracks, lambda node: grid_class in node.classes)
    if not summary_grid:
        errors.append(f"{report_path}: #resolution-tracks must contain .{grid_class}")
    else:
        panel_count = len(direct_children_with_class(summary_grid, panel_class))
        if panel_count != required_panel_count:
            errors.append(f"{report_path}: #resolution-tracks .{grid_class} must contain exactly {required_panel_count} .{panel_class} children")


def validate_actions_grid(root: Node, report_path: Path, errors: List[str]) -> None:
    """Validate actions grid structure."""
    rules = load_rules()
    actions_rules = rules.get("html_structure", {}).get("actions_grid", {})
    
    container_class = actions_rules.get("container_class", "actions-grid")
    children_ids = actions_rules.get("children_ids", ["open-questions", "next-actions"])
    
    if len(children_ids) < 2:
        return
    
    first_section = find_by_id(root, children_ids[0])
    second_section = find_by_id(root, children_ids[1])
    
    if first_section and second_section:
        first_grid = nearest_ancestor_with_class(first_section, container_class)
        second_grid = nearest_ancestor_with_class(second_section, container_class)
        if not first_grid or not second_grid or first_grid is not second_grid:
            errors.append(
                f"{report_path}: #{children_ids[0]} and #{children_ids[1]} must be sibling panels inside the same .{container_class}"
            )


def validate_issue_list_nesting(root: Node, report_path: Path, errors: List[str]) -> None:
    """Validate issue list is nested inside full-review."""
    rules = load_rules()
    issue_rules = rules.get("html_structure", {}).get("issue_list", {})
    parent_id = issue_rules.get("parent_id", "full-review")
    
    full_review = find_by_id(root, parent_id)
    issue_list = find_by_id(root, "issue-list")
    
    if issue_list and not is_descendant(issue_list, full_review):
        errors.append(f"{report_path}: #issue-list must be nested inside #{parent_id}")


def validate_overview_h1(root: Node, state: Dict, report_path: Path, errors: List[str]) -> None:
    """Validate that overview h1 matches project name."""
    project_name = state.get("meta", {}).get("project_name")
    
    if not project_name:
        errors.append(f"{report_path}: meta.project_name is required for slot validation")
        return
    
    overview = find_by_id(root, "review-overview")
    if not overview:
        return
    
    h1 = find_first(overview, lambda node: node.tag == "h1")
    if not h1:
        errors.append(f"{report_path}: #review-overview must contain an h1")
    elif normalize_text(text_content(h1)) != normalize_text(str(project_name)):
        errors.append(f"{report_path}: #review-overview h1 must equal meta.project_name '{project_name}'")


def validate_language_consistency(html: str, state: Dict, report_path: Path, errors: List[str]) -> None:
    """Validate HTML lang attribute and scaffold token consistency."""
    lang_match = HTML_LANG_RE.search(html)
    if not lang_match:
        errors.append(f"{report_path}: missing <html lang=\"...\"> attribute")
        return
    
    report_language = state.get("meta", {}).get("report_language", "")
    if report_language and lang_match.group(1) != report_language:
        errors.append(
            f"{report_path}: html lang '{lang_match.group(1)}' does not match meta.report_language '{report_language}'"
        )
    
    # Check for forbidden English scaffold tokens in Chinese reports
    if report_language.startswith("zh"):
        scaffold_tokens = get_scaffold_tokens("zh")
        for token in sorted(scaffold_tokens):
            if token in html:
                errors.append(
                    f"{report_path}: report_language is '{report_language}' but contains English scaffold token '{token}'"
                )


def validate_stable_id_exposure(html: str, state: Dict, report_path: Path, errors: List[str]) -> None:
    """Validate that stable_ids are not exposed in the HTML."""
    issues = state.get("issues", [])
    present_stable_ids = [
        issue.get("stable_id") 
        for issue in issues 
        if issue.get("stable_id") and issue.get("stable_id") in html
    ]
    if present_stable_ids:
        errors.append(
            f"{report_path}: human report must not expose stable_id values: {', '.join(sorted(present_stable_ids))}"
        )


def validate_display_numbers(html: str, state: Dict, report_path: Path, errors: List[str]) -> None:
    """Validate that all display numbers are present in the HTML."""
    for issue in state.get("issues", []):
        display_number = issue.get("display_number")
        if display_number and display_number not in html:
            errors.append(f"{report_path}: missing issue display number '{display_number}' in human report")


def validate_report_structure(report_path: Path, state: Dict, html: str, root: Node, errors: List[str]) -> None:
    """Validate the complete report structure."""
    validate_overview_h1(root, state, report_path, errors)
    validate_executive_summary(root, report_path, errors)
    validate_issue_list_nesting(root, report_path, errors)
    validate_timeline(root, report_path, errors)
    validate_resolution_tracks(root, report_path, errors)
    validate_actions_grid(root, report_path, errors)


def validate_report_html(report_path: Path, state: Dict, errors: List[str], warnings: List[str]) -> None:
    """Validate a report HTML file."""
    if not report_path.exists():
        errors.append(f"{report_path.parent}: missing report.html")
        return

    html = load_text(report_path)
    
    validate_html_markers(html, report_path, errors)
    
    dom_root = parse_html(html)
    validate_required_sections(dom_root, report_path, errors)
    validate_template_classes(html, report_path, errors)
    validate_report_structure(report_path, state, html, dom_root, errors)
    validate_stable_id_exposure(html, state, report_path, errors)
    validate_display_numbers(html, state, report_path, errors)
    validate_language_consistency(html, state, report_path, errors)


def validate_state_schema(state_path: Path, state: Dict, errors: List[str], warnings: List[str]) -> None:
    """Validate review-state.json schema."""
    rules = load_rules()
    schema_rules = rules.get("state_schema", {})
    
    # Check required top-level keys
    required_keys = set(schema_rules.get("required_top_level_keys", []))
    missing_top_level = required_keys - set(state.keys())
    if missing_top_level:
        errors.append(f"{state_path}: missing top-level keys: {', '.join(sorted(missing_top_level))}")
    
    # Check schema version
    expected_version = schema_rules.get("schema_version", "v1")
    if state.get("schema_version") != expected_version:
        errors.append(f"{state_path}: schema_version must be '{expected_version}'")
    
    # Check required meta fields
    meta = state.get("meta", {})
    required_meta = schema_rules.get("required_meta_fields", [])
    for field in required_meta:
        if not meta.get(field):
            errors.append(f"{state_path}: meta.{field} is required")
    
    # Check required issue fields
    required_issue_fields = schema_rules.get("required_issue_fields", [])
    for index, issue in enumerate(state.get("issues", [])):
        for field in required_issue_fields:
            if not issue.get(field):
                errors.append(f"{state_path}: issues[{index}] missing {field}")
    
    # Check forbidden keys
    forbidden_keys = set(schema_rules.get("forbidden_keys", []))
    forbidden_found = sorted(forbidden_keys.intersection(set(collect_keys(state))))
    if forbidden_found:
        errors.append(
            f"{state_path}: contains forbidden human-facing prose keys: {', '.join(forbidden_found)}"
        )
    
    # Check priorities consistency
    priorities = state.get("priorities", {})
    issues = state.get("issues", [])
    highest_id = priorities.get("highest_priority_issue_id")
    if highest_id and highest_id not in {issue.get("stable_id") for issue in issues}:
        warnings.append(f"{state_path}: priorities.highest_priority_issue_id does not match any issue stable_id")


def validate_review_root(review_root: Path, errors: List[str], warnings: List[str]) -> None:
    """Validate a complete review root directory."""
    report_path = review_root / "report.html"
    state_path = review_root / "review-state.json"

    if not state_path.exists():
        errors.append(f"{review_root}: missing review-state.json")
        return

    try:
        state = load_json(state_path)
    except Exception as exc:
        errors.append(f"{state_path}: invalid JSON ({exc})")
        return

    # Validate review slug matches folder name
    meta = state.get("meta", {})
    if meta.get("review_slug") != review_root.name:
        errors.append(
            f"{state_path}: meta.review_slug='{meta.get('review_slug')}' does not match folder '{review_root.name}'"
        )

    validate_state_schema(state_path, state, errors, warnings)
    validate_report_html(report_path, state, errors, warnings)


def validate_hidden_scratch(hidden_root: Path, errors: List[str]) -> None:
    """Validate hidden scratch directory contains no Markdown files."""
    if not hidden_root.exists():
        return

    for path in hidden_root.rglob("*"):
        if not path.is_file():
            continue
        if path.suffix.lower() == ".md":
            errors.append(f"{path}: hidden scratch may not contain Markdown review artifacts")


# -----------------------------------------------------------------------------
# Main Entry Point
# -----------------------------------------------------------------------------

def main() -> int:
    """Main entry point for the validation script."""
    parser = argparse.ArgumentParser(description="Validate UXdesign-buff review roots and hidden scratch.")
    parser.add_argument(
        "root",
        nargs="?",
        default=".",
        help="Project root containing UXdesign-buff-reviews/ and optional .UXdesign-buff/",
    )
    args = parser.parse_args()

    project_root = Path(args.root).resolve()
    review_root = project_root / "UXdesign-buff-reviews"
    hidden_root = project_root / ".UXdesign-buff"

    errors: List[str] = []
    warnings: List[str] = []

    if not review_root.exists():
        errors.append(f"{review_root}: missing UXdesign-buff-reviews directory")
    else:
        for child in sorted(review_root.iterdir()):
            if child.name.startswith(".") or not child.is_dir():
                continue
            validate_review_root(child, errors, warnings)

    validate_hidden_scratch(hidden_root, errors)

    if errors:
        print("Validation failed:")
        for error in errors:
            print(f"- {error}")
        if warnings:
            print("\nWarnings:")
            for warning in warnings:
                print(f"- {warning}")
        return 1

    print("Validation passed.")
    if warnings:
        print("\nWarnings:")
        for warning in warnings:
            print(f"- {warning}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
