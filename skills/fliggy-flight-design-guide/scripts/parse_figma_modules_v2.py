#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
解析 Figma 设计稿数据，提取各模块的详细样式信息
"""

import json
import sys
from typing import Dict, List, Any, Optional
from collections import defaultdict


def load_json_file(file_path: str) -> Dict:
    """加载 JSON 文件"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            return json.load(f)
    except Exception as e:
        print(f"Error loading JSON file: {e}")
        return {}


def find_node_by_id(data: Dict, node_id: str) -> Optional[Dict]:
    """根据节点 ID 查找节点"""
    if 'document' in data:
        return find_node_recursive(data['document'], node_id)
    return None


def find_node_recursive(node: Dict, node_id: str) -> Optional[Dict]:
    """递归查找节点"""
    if node.get('id') == node_id:
        return node
    
    if 'children' in node:
        for child in node['children']:
            result = find_node_recursive(child, node_id)
            if result:
                return result
    
    return None


def find_node_by_name(node: Dict, name: str) -> Optional[Dict]:
    """根据名称查找节点"""
    if node.get('name') == name:
        return node
    
    if 'children' in node:
        for child in node['children']:
            result = find_node_by_name(child, name)
            if result:
                return result
    
    return None


def extract_color(color: Dict) -> str:
    """提取颜色值"""
    if not color:
        return "transparent"
    
    if 'r' in color and 'g' in color and 'b' in color:
        r = int(color['r'] * 255)
        g = int(color['g'] * 255)
        b = int(color['b'] * 255)
        a = color.get('a', 1.0)
        if a < 1.0:
            return f"rgba({r}, {g}, {b}, {a:.2f})"
        return f"rgb({r}, {g}, {b})"
    
    return "transparent"


def extract_text_style(node: Dict) -> Dict[str, Any]:
    """提取文本样式"""
    style = {
        'content': node.get('characters', ''),
        'fontSize': node.get('fontSize', 0),
        'fontWeight': node.get('fontWeight', 400),
        'textAlign': node.get('textAlignHorizontal', 'LEFT'),
        'color': extract_color(node.get('fills', [{}])[0].get('color', {}) if node.get('fills') else {}),
        'lineHeight': node.get('lineHeight', {}).get('value', 0),
        'letterSpacing': node.get('letterSpacing', {}).get('value', 0),
    }
    return style


def extract_frame_style(node: Dict) -> Dict[str, Any]:
    """提取 Frame/Rectangle 样式"""
    style = {
        'width': node.get('width', 0),
        'height': node.get('height', 0),
        'backgroundColor': extract_color(node.get('fills', [{}])[0].get('color', {}) if node.get('fills') else {}),
        'borderRadius': node.get('cornerRadius', 0),
        'strokeColor': extract_color(node.get('strokes', [{}])[0].get('color', {}) if node.get('strokes') else {}),
        'strokeWidth': node.get('strokeWeight', 0),
        'opacity': node.get('opacity', 1.0),
        'imageRef': node.get('imageRef', ''),
    }
    
    # 提取布局信息
    layout_mode = node.get('layoutMode', 'NONE')
    if layout_mode != 'NONE':
        style['layout'] = {
            'mode': layout_mode,
            'direction': node.get('primaryAxisSizingMode', 'FIXED'),
            'gap': node.get('itemSpacing', 0),
            'padding': {
                'top': node.get('paddingTop', 0),
                'right': node.get('paddingRight', 0),
                'bottom': node.get('paddingBottom', 0),
                'left': node.get('paddingLeft', 0),
            },
            'align': node.get('primaryAxisAlignItems', 'MIN'),
            'justify': node.get('counterAxisAlignItems', 'MIN'),
        }
    
    return style


def extract_node_info(node: Dict, depth: int = 0) -> Dict[str, Any]:
    """提取节点信息"""
    node_type = node.get('type', 'UNKNOWN')
    node_name = node.get('name', 'Unnamed')
    node_id = node.get('id', '')
    
    info = {
        'id': node_id,
        'name': node_name,
        'type': node_type,
        'depth': depth,
    }
    
    if node_type == 'TEXT':
        info.update(extract_text_style(node))
    elif node_type in ['FRAME', 'RECTANGLE', 'COMPONENT', 'INSTANCE']:
        info.update(extract_frame_style(node))
        if 'children' in node:
            info['children'] = [extract_node_info(child, depth + 1) for child in node['children']]
    elif node_type == 'IMAGE':
        info['imageRef'] = node.get('imageRef', '')
        info['width'] = node.get('width', 0)
        info['height'] = node.get('height', 0)
    
    return info


def find_module_nodes(root_node: Dict) -> Dict[str, Dict]:
    """查找各个模块的节点"""
    modules = {}
    
    # 查找首页全状态节点
    home_page = find_node_by_name(root_node, '首页全状态')
    if not home_page:
        print("未找到 '首页全状态' 节点")
        return modules
    
    print(f"找到首页全状态节点: {home_page.get('id')}, 尺寸: {home_page.get('width')}x{home_page.get('height')}")
    
    # 先打印所有一级子节点，帮助调试
    print("\n首页全状态的一级子节点:")
    for child in home_page.get('children', []):
        print(f"  - {child.get('name')} (ID: {child.get('id')}, 类型: {child.get('type')})")
    
    # 遍历子节点，查找各个模块
    for child in home_page.get('children', []):
        child_name = child.get('name', '')
        
        if 'Top bar container' in child_name or 'Top bar' in child_name:
            modules['top_bar_container'] = child
            print(f"\n✓ 找到 Top bar container: {child.get('id')}")
        elif 'Sidebar container' in child_name or 'Sidebar' in child_name:
            print(f"\n✓ 找到 Sidebar container: {child.get('id')}")
            # 递归查找 Sidebar 内部的模块
            modules.update(find_modules_in_sidebar(child))
        elif 'Footer notice' in child_name or 'Footer' in child_name:
            modules['footer_notice'] = child
            print(f"\n✓ 找到 Footer notice: {child.get('id')}")
        elif 'Flight bottom bar' in child_name or 'bottom bar' in child_name:
            modules['flight_bottom_bar'] = child
            print(f"\n✓ 找到 Flight bottom bar: {child.get('id')}")
    
    return modules


def find_modules_in_sidebar(sidebar_node: Dict) -> Dict[str, Dict]:
    """在 Sidebar 容器中查找模块"""
    modules = {}
    
    print(f"\n  Sidebar 子节点:")
    for child in sidebar_node.get('children', []):
        child_name = child.get('name', '')
        print(f"    - {child_name} (ID: {child.get('id')})")
        
        if '搜索模块' in child_name or '搜索' in child_name:
            modules['search_module'] = child
            print(f"    ✓ 找到 搜索模块: {child.get('id')}")
        elif 'Sidebar section' in child_name:
            print(f"    ✓ 找到 Sidebar section: {child.get('id')}")
            # 继续深入查找 Sidebar section
            modules.update(find_modules_in_sidebar_section(child))
        elif 'IMG_2738' in child_name:
            modules['img_2738'] = child
            print(f"    ✓ 找到 IMG_2738: {child.get('id')}")
    
    return modules


def find_modules_in_sidebar_section(section_node: Dict) -> Dict[str, Dict]:
    """在 Sidebar section 中查找模块"""
    modules = {}
    
    print(f"\n    Sidebar section 子节点:")
    for child in section_node.get('children', []):
        child_name = child.get('name', '')
        print(f"      - {child_name} (ID: {child.get('id')})")
        
        if 'Sidebar section child' in child_name:
            print(f"      ✓ 找到 Sidebar section child: {child.get('id')}")
            # 继续深入查找
            modules.update(find_modules_in_section_child(child))
        elif 'Flight image' in child_name:
            modules['flight_image'] = child
            print(f"      ✓ 找到 Flight image: {child.get('id')}")
        elif 'IMG_2734' in child_name:
            modules['img_2734'] = child
            print(f"      ✓ 找到 IMG_2734: {child.get('id')}")
        elif 'IMG_2735' in child_name:
            modules['img_2735'] = child
            print(f"      ✓ 找到 IMG_2735: {child.get('id')}")
        elif 'Advertisement image' in child_name or '广告' in child_name:
            modules['advertisement_image'] = child
            print(f"      ✓ 找到 Advertisement image: {child.get('id')}")
    
    return modules


def find_modules_in_section_child(child_node: Dict) -> Dict[str, Dict]:
    """在 Sidebar section child 中查找模块"""
    modules = {}
    
    print(f"\n      Sidebar section child 子节点:")
    for item in child_node.get('children', []):
        item_name = item.get('name', '')
        print(f"        - {item_name} (ID: {item.get('id')})")
        
        if 'Low price reminder' in item_name or '低价提醒' in item_name:
            modules['low_price_reminder'] = item
            print(f"        ✓ 找到 Low price reminder: {item.get('id')}")
        elif '省钱模块' in item_name:
            modules['save_money_module'] = item
            print(f"        ✓ 找到 省钱模块: {item.get('id')}")
        elif 'Main content' in item_name or '航班卡片' in item_name:
            modules['main_content'] = item
            print(f"        ✓ 找到 Main content: {item.get('id')}")
        elif 'Additional module' in item_name or '附加模块' in item_name:
            modules['additional_module'] = item
            print(f"        ✓ 找到 Additional module: {item.get('id')}")
        elif 'IMG_2736' in item_name:
            modules['img_2736'] = item
            print(f"        ✓ 找到 IMG_2736: {item.get('id')}")
    
    return modules


def extract_module_styles(modules: Dict[str, Dict]) -> Dict[str, Dict]:
    """提取所有模块的样式信息"""
    result = {}
    
    for module_name, module_node in modules.items():
        if module_node:
            result[module_name] = extract_node_info(module_node)
    
    return result


def save_to_json(data: Dict, output_path: str):
    """保存到 JSON 文件"""
    try:
        with open(output_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        print(f"✓ 成功保存到: {output_path}")
    except Exception as e:
        print(f"✗ 保存失败: {e}")


def print_summary(modules_data: Dict):
    """打印摘要信息"""
    print("\n" + "="*80)
    print("模块样式信息摘要")
    print("="*80)
    
    for module_name, module_info in modules_data.items():
        print(f"\n### {module_name}")
        print(f"  节点ID: {module_info.get('id')}")
        print(f"  类型: {module_info.get('type')}")
        print(f"  尺寸: {module_info.get('width')}x{module_info.get('height')}")
        
        if module_info.get('backgroundColor'):
            print(f"  背景色: {module_info.get('backgroundColor')}")
        
        if module_info.get('layout'):
            layout = module_info['layout']
            print(f"  布局: {layout.get('mode')}")
            print(f"    间距: {layout.get('gap')}")
            print(f"    对齐: {layout.get('align')}")
        
        # 打印文本节点
        def print_texts(node, indent=4):
            if node.get('type') == 'TEXT':
                prefix = " " * indent
                content = node.get('content', '')
                if content:
                    print(f"{prefix}文本: {content[:50]}")
                    print(f"{prefix}  字号: {node.get('fontSize')}, 颜色: {node.get('color')}")
            
            for child in node.get('children', []):
                print_texts(child, indent + 2)
        
        print_texts(module_info)


def main():
    input_file = '/Users/dengxinyang/Desktop/Fliggy Design Flight/figma_node_data.json'
    output_file = '/Users/dengxinyang/Desktop/Fliggy Design Flight/figma_parsed_modules.json'
    
    # 加载数据
    print(f"正在加载: {input_file}")
    data = load_json_file(input_file)
    
    if not data:
        print("无法加载数据")
        return
    
    # 查找根节点（Figma API 格式：nodes['80:2412']['document']）
    if 'nodes' not in data:
        print("JSON 数据格式错误：缺少 nodes 节点")
        return
    
    nodes = data['nodes']
    if '80:2412' not in nodes:
        print("JSON 数据格式错误：缺少节点 80:2412")
        return
    
    node_data = nodes['80:2412']
    if 'document' not in node_data:
        print("JSON 数据格式错误：缺少 document 节点")
        return
    
    root_node = node_data['document']
    print(f"根节点: {root_node.get('name')}")
    
    # 查找各个模块
    print("\n正在查找各个模块...")
    modules = find_module_nodes(root_node)
    
    print(f"\n找到 {len(modules)} 个模块")
    
    # 提取样式信息
    print("\n正在提取样式信息...")
    modules_data = extract_module_styles(modules)
    
    # 保存结果
    print("\n正在保存结果...")
    save_to_json(modules_data, output_file)
    
    # 打印摘要
    print_summary(modules_data)


if __name__ == '__main__':
    main()
