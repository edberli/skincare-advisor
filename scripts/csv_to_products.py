#!/usr/bin/env python3
"""將 Skin1004 CSV 產品數據轉換為 JavaScript 數據庫"""

import csv
import json
import re
from pathlib import Path

def clean_price(price_str):
    """清理價格字符串"""
    try:
        return float(str(price_str).replace(',', ''))
    except:
        return 0

def extract_description(html):
    """從 HTML 提取純文本描述"""
    if not html:
        return ""
    # 移除 HTML 標籤
    text = re.sub(r'<[^>]+>', '', html)
    # 清理空白
    text = ' '.join(text.split())[:200]
    return text

def get_skin_types(tags):
    """從標籤提取適合膚質"""
    skin_types = []
    if not tags:
        return ['all']
    
    tags_lower = tags.lower()
    if '敏感' in tags_lower:
        skin_types.append('sensitive')
    if '乾' in tags_lower or '乾燥' in tags_lower:
        skin_types.append('dry')
    if '油' in tags_lower:
        skin_types.append('oily')
    if '混合' in tags_lower:
        skin_types.append('combination')
    if '痘痘' in tags_lower or '暗瘡' in tags_lower:
        skin_types.append('acne')
    
    return skin_types if skin_types else ['all']

def get_benefits(tags):
    """從標籤提取功效"""
    benefits = []
    if not tags:
        return []
    
    tags_lower = tags.lower()
    if '保濕' in tags_lower or '水潤' in tags_lower:
        benefits.append('hydration')
    if '舒緩' in tags_lower or '鎮靜' in tags_lower:
        benefits.append('soothing')
    if '修護' in tags_lower or '修復' in tags_lower:
        benefits.append('repair')
    if '防曬' in tags_lower:
        benefits.append('sun-protection')
    if '美白' in tags_lower or '亮白' in tags_lower:
        benefits.append('brightening')
    if '抗老' in tags_lower or '抗皺' in tags_lower:
        benefits.append('anti-aging')
    if '控油' in tags_lower:
        benefits.append('oil-control')
    
    return benefits

def main():
    csv_path = Path('/Users/winstonli/.openclaw/workspace/scripts/shopify_skin1004_products_chinese_final.csv')
    output_path = Path('/Users/winstonli/.openclaw/workspace/skincare-app/js/products.js')
    
    products = {}
    
    with open(csv_path, 'r', encoding='utf-8-sig') as f:
        reader = csv.DictReader(f)
        for i, row in enumerate(reader):
            if i >= 20:  # 限制 20 個產品
                break
            
            handle = row.get('Handle', '')
            title = row.get('Title', '')
            
            # 清理標題（移除前綴）
            clean_title = re.sub(r'^\[.*?\]\s*', '', title)
            clean_title = re.sub(r'^Skin1004\s*', '', clean_title).strip()
            
            # 提取價格
            price = clean_price(row.get('Variant Price', 0))
            
            # 提取描述
            description = extract_description(row.get('Body (HTML)', ''))
            
            # 提取類型
            product_type = row.get('Type', '')
            
            # 提取標籤
            tags = row.get('Tags', '')
            
            # 提取圖片
            image = row.get('Image Src', '')
            
            # 創建產品 ID
            product_id = handle.replace('skin1004-', '').replace('-centella', '-cica')
            
            products[product_id] = {
                'id': product_id,
                'name': clean_title,
                'nameEn': title,
                'price': price,
                'desc': description,
                'type': product_type,
                'tags': tags,
                'image': image,
                'skinTypes': get_skin_types(tags),
                'benefits': get_benefits(tags),
                'vendor': row.get('Vendor', 'Skin1004'),
                'sku': row.get('Variant SKU', ''),
                'capacity': row.get('Option1 Value', '')
            }
    
    # 生成 JavaScript 文件
    js_content = '// Skin1004 產品數據庫 - 來自 Shopify CSV\n'
    js_content += '// 自動生成於 2026-03-06\n\n'
    js_content += 'const PRODUCTS = ' + json.dumps(products, ensure_ascii=False, indent=4) + ';\n'
    
    output_path.parent.mkdir(parents=True, exist_ok=True)
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(js_content)
    
    print(f'✅ 已生成 {len(products)} 個產品')
    print(f'📁 文件位置：{output_path}')
    print(f'\n產品列表:')
    for pid, prod in products.items():
        print(f'  - {prod["name"]} (${prod["price"]})')

if __name__ == '__main__':
    main()
