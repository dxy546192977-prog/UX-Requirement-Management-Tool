#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
全面解析 Figma 设计稿数据，提取所有模块的详细样式信息
"""

import json
from typing import Dict, List, Any, Optional


def load_json_file(file_path: str) -> Dict:
    """加载 JSON 文件"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            return json.load(f)
    except Exception as e:
        print(f"Error loading JSON file: {e}")
        return {}


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
        'type': 'TEXT',
        'id': node.get('id', ''),
        'name': node.get('name', ''),
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
        'type': node.get('type', 'FRAME'),
        'id': node.get('id', ''),
        'name': node.get('name', ''),
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


def extract_node_info(node: Dict, depth: int = 0, max_depth: int = 10) -> Dict[str, Any]:
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
        if 'children' in node and depth < max_depth:
            info['children'] = [extract_node_info(child, depth + 1, max_depth) for child in node['children']]
    elif node_type == 'IMAGE':
        info['type'] = 'IMAGE'
        info['imageRef'] = node.get('imageRef', '')
        info['width'] = node.get('width', 0)
        info['height'] = node.get('height', 0)
    
    return info


def find_node_by_name_recursive(node: Dict, name: str) -> Optional[Dict]:
    """递归根据名称查找节点"""
    if name.lower() in node.get('name', '').lower():
        return node
    
    if 'children' in node:
        for child in node['children']:
            result = find_node_by_name_recursive(child, name)
            if result:
                return result
    
    return None


def print_tree_structure(node: Dict, indent: int = 0):
    """打印树形结构"""
    prefix = "  " * indent
    node_name = node.get('name', 'Unnamed')
    node_type = node.get('type', 'UNKNOWN')
    node_id = node.get('id', '')
    width = node.get('width', 0)
    height = node.get('height', 0)
    
    print(f"{prefix}├─ {node_name} ({node_type}) [ID: {node_id}] [{width}x{height}]")
    
    if 'children' in node and indent < 5:  # 限制深度
        for child in node['children']:
            print_tree_structure(child, indent + 1)


def main():
    input_file = '/Users/dengxinyang/Desktop/Fliggy Design Flight/figma_node_data.json'
    output_file = '/Users/dengxinyang/Desktop/Fliggy Design Flight/figma_parsed_modules.json'
    
    # 加载数据
    print(f"正在加载: {input_file}")
    data = load_json_file(input_file)
    
    if not data:
        print("无法加载数据")
        return
    
    # 查找根节点
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
    print(f"\n根节点: {root_node.get('name')}")
    
    # 打印首页全状态的结构
    print("\n" + "="*80)
    print("首页全状态的结构树")
    print("="*80)
    print_tree_structure(root_node)
    
    # 查找各个模块
    print("\n" + "="*80)
    print("查找各个模块")
    print("="*80)
    
    modules_to_find = [
        ('top_bar_container', ['Top bar container', 'Top bar']),
        ('search_module', ['搜索模块', '搜索']),
        ('low_price_reminder', ['Low price reminder', '低价提醒']),
        ('save_money_module', ['省钱模块']),
        ('main_content', ['Main content', '航班卡片']),
        ('additional_module', ['Additional module', '附加模块']),
        ('flight_image', ['Flight image']),
        ('advertisement_image', ['Advertisement image', '广告']),
        ('footer_notice', ['Footer notice', 'Footer']),
        ('flight_bottom_bar', ['Flight bottom bar', 'bottom bar']),
    ]
    
    modules = {}
    
    for module_key, search_terms in modules_to_find:
        for term in search_terms:
            node = find_node_by_name_recursive(root_node, term)
            if node:
                modules[module_key] = node
                print(f"✓ 找到 {module_key}: {node.get('id')} - {node.get('name')}")
                break
        else:
            print(f"✗ 未找到 {module_key}")
    
    print(f"\n总共找到 {len(modules)} 个模块")
    
    # 提取样式信息
    print("\n正在提取样式信息...")
    modules_data = {}
    
    for module_name, module_node in modules.items():
        modules_data[module_name] = extract_node_info(module_node, max_depth=15)
    
    # 保存结果
    print("\n正在保存结果...")
    try:
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(modules_data, f, ensure_ascii=False, indent=2)
        print(f"✓ 成功保存到: {output_file}")
    except Exception as e:
        print(f"✗ 保存失败: {e}")
    
    # 打印摘要
    print("\n" + "="*80)
    print("模块样式信息摘要")
    print("="*80)
    
    for module_name, module_info in modules_data.items():
        print(f"\n### {module_name}")
        print(f"  节点ID: {module_info.get('id')}")
        print(f"  名称: {module_info.get('name')}")
        print(f"  类型: {module_info.get('type')}")
        print(f"  尺寸: {module_info.get('width')}x{module_info.get('height')}")
        
        if module_info.get('backgroundColor'):
            print(f"  背景色: {module_info.get('backgroundColor')}")
        
        if module_info.get('borderRadius'):
            print(f"  圆角: {module_info.get('borderRadius')}")
        
        if module_info.get('layout'):
            layout = module_info['layout']
            print(f"  布局: {layout.get('mode')}")
            print(f"    间距: {layout.get('gap')}")
            print(f"    Padding: 上{layout.get('padding', {}).get('top')}, 右{layout.get('padding', {}).get('right')}, 下{layout.get('padding', {}).get('bottom')}, 左{layout.get('padding', {}).get('left')}")
            print(f"    对齐: {layout.get('align')}")
        
        # 打印文本节点
        def print_texts(node, indent=4):
            if node.get('type') == 'TEXT':
                prefix = " " * indent
                content = node.get('content', '')
                if content:
                    print(f"{prefix}文本: {content[:60]}")
                    print(f"{prefix}  字号: {node.get('fontSize')}, 字重: {node.get('fontWeight')}, 颜色: {node.get('color')}")
            
            for child in node.get('children', []):
                print_texts(child, indent + 2)
        
        print_texts(module_info)


if __name__ == '__main__':
    main()
