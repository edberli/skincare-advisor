#!/usr/bin/env python3
"""整合所有 Excel 產品數據 - 完整版"""

import subprocess
import json
import re
from pathlib import Path
import sys

# 使用 uv 確保有 openpyxl
subprocess.run(['uv', 'pip', 'install', 'openpyxl', '--system', '-q'])

import openpyxl

def read_excel_file(file_path):
    """讀取 Excel 文件"""
    products = []
    
    try:
        wb = openpyxl.load_workbook(file_path, data_only=True)
        ws = wb.active
        
        headers = []
        for cell in ws[1]:
            headers.append(str(cell.value).lower() if cell.value else '')
        
        for row_idx, row in enumerate(ws.iter_rows(min_row=2), start=2):
            product = {}
            for col_idx, cell in enumerate(row):
                if col_idx < len(headers):
                    header = headers[col_idx]
                    value = cell.value if cell.value else ''
                    map_field(product, header, value)
            if product.get('name'):
                products.append(product)
        wb.close()
        
        print(f"✅ {Path(file_path).name}: {len(products)} 個產品")
    except Exception as e:
        print(f"❌ {Path(file_path).name}: {e}")
    
    return products

def map_field(product, header, value):
    """智能映射字段"""
    if not value:
        return
    
    header_lower = str(header).lower() if header else ''
    
    # 產品名稱
    if any(k in header_lower for k in ['產品', '品名', '名稱', 'name', 'title', 'product', 'description', '描述']):
        if isinstance(value, str) and value.strip():
            product['name'] = value.strip()
    
    # 英文名稱
    elif any(k in header_lower for k in ['英文', 'en', 'english', 'ename', 'name_en']):
        product['nameEn'] = str(value)
    
    # 價格
    elif any(k in header_lower for k in ['價格', '價錢', 'price', 'cost', '售價', 'hk$']):
        try:
            price_str = str(value).replace(',', '').replace('$', '').replace('HKD', '')
            product['price'] = float(price_str)
        except:
            pass
    
    # 品牌
    elif any(k in header_lower for k in ['品牌', 'brand', 'vendor', '牌子']):
        product['brand'] = str(value)
    
    # 類型
    elif any(k in header_lower for k in ['類型', 'type', 'category', '分類', '種類']):
        product['type'] = str(value)
    
    # 容量
    elif any(k in header_lower for k in ['容量', 'size', 'volume', 'ml', 'g', '克', '毫升']):
        product['capacity'] = str(value)
    
    # SKU/編碼
    elif any(k in header_lower for k in ['sku', '編碼', 'code', '貨號', 'barc']):
        product['sku'] = str(value)
    
    # 圖片
    elif any(k in header_lower for k in ['圖片', 'image', 'photo', 'url', '圖']):
        if str(value).startswith('http'):
            product['image'] = str(value)

def generate_product_id(name, brand=''):
    """生成唯一產品 ID"""
    text = re.sub(r'[^\w\s\u4e00-\u9fff]', '', str(name))
    text = text.lower().replace(' ', '-')[:30]
    if brand:
        brand_id = re.sub(r'[^\w]', '', str(brand)).lower()[:10]
        return f"{brand_id}-{text}"
    return text

def get_icon(type_str):
    """根據類型返回 emoji"""
    if not type_str:
        return '📦'
    t = str(type_str).lower()
    if any(k in t for k in ['精華', 'serum', 'ampoule', 'essence']): return '✨'
    elif any(k in t for k in ['面霜', 'cream', '保濕']): return '🧴'
    elif any(k in t for k in ['防曬', 'sun', 'spf']): return '☀️'
    elif any(k in t for k in ['潔面', 'cleanser', '洗面', 'foam']): return '🧼'
    elif any(k in t for k in ['面膜', 'mask', 'pack']): return '🎭'
    elif any(k in t for k in ['化妝水', 'toner', '爽膚水', ' lotion']): return '💧'
    elif any(k in t for k in ['唇膏', 'lip', 'balm']): return '💄'
    elif any(k in t for k in ['眼影', 'eye', 'shadow']): return '👁️'
    elif any(k in t for k in ['腮紅', 'blush', 'cheek']): return '🌸'
    elif any(k in t for k in ['粉底', 'foundation', 'base']): return '🎨'
    else: return '📦'

def main():
    output_path = Path('/Users/winstonli/.openclaw/workspace/skincare-app/js/products.js')
    
    # 所有產品文件
    excel_files = [
        # Lilybyred
        '/Users/winstonli/Library/Containers/com.tencent.xinWeChat/Data/Documents/xwechat_files/wxid_w9uebpt489vp22_8db4/msg/file/2025-12/Lilybyred Product Info _20251209_to winston.xlsx',
        '/Users/winstonli/Library/Containers/com.tencent.xinWeChat/Data/Documents/xwechat_files/wxid_w9uebpt489vp22_8db4/msg/file/2025-12/lilybread.xlsx',
        
        # White Conc
        '/Users/winstonli/Library/Containers/com.tencent.xinWeChat/Data/Documents/xwechat_files/wxid_w9uebpt489vp22_8db4/msg/file/2025-12/White Conc (Product Introduction) 2025.xlsx',
        
        # Dasique (xls 格式)
        '/Users/winstonli/Library/Mobile Documents/com~apple~CloudDocs/Downloads/dasique.xlsx',
        
        # 價格表
        '/Users/winstonli/Library/Containers/com.tencent.xinWeChat/Data/Documents/xwechat_files/wxid_w9uebpt489vp22_8db4/msg/file/2025-12/價格表.xlsx',
    ]
    
    all_products = {}
    
    print("📊 開始整合所有產品數據...\n")
    
    for excel_file in excel_files:
        if Path(excel_file).exists():
            products = read_excel_file(excel_file)
            for prod in products:
                brand = prod.get('brand', 'unknown')
                prod_id = generate_product_id(prod.get('name', ''), brand)
                
                # 確保 ID 唯一
                base_id = prod_id
                counter = 1
                while prod_id in all_products:
                    prod_id = f"{base_id}-{counter}"
                    counter += 1
                
                all_products[prod_id] = {
                    'id': prod_id,
                    'name': prod.get('name', ''),
                    'nameEn': prod.get('nameEn', ''),
                    'price': prod.get('price', 0),
                    'desc': prod.get('desc', '')[:300],
                    'brand': brand,
                    'type': prod.get('type', ''),
                    'capacity': prod.get('capacity', ''),
                    'sku': prod.get('sku', ''),
                    'image': prod.get('image', ''),
                    'icon': get_icon(prod.get('type', '')),
                    'skinTypes': ['all'],
                    'benefits': []
                }
    
    print(f"\n✅ 總共整合 {len(all_products)} 個產品")
    
    # 生成 JavaScript
    js_content = '// 完整產品數據庫 - 整合所有 Excel 文件\n'
    js_content += f'// 自動生成於 2026-03-06\n'
    js_content += f'// 產品總數：{len(all_products)}\n\n'
    js_content += 'const PRODUCTS = ' + json.dumps(all_products, ensure_ascii=False, indent=2) + ';\n'
    
    output_path.parent.mkdir(parents=True, exist_ok=True)
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(js_content)
    
    print(f"\n📁 已保存至：{output_path}")
    
    # 品牌統計
    print("\n📦 品牌統計:")
    brands = {}
    for prod in all_products.values():
        brand = prod.get('brand', 'Unknown')
        brands[brand] = brands.get(brand, 0) + 1
    
    for brand, count in sorted(brands.items(), key=lambda x: -x[1]):
        print(f"  {brand}: {count} 個")

if __name__ == '__main__':
    main()
