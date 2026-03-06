#!/usr/bin/env python3
"""整合所有 Excel 產品數據到 skincare app"""

import subprocess
import sys
import json
from pathlib import Path

# 使用 uv 安裝 openpyxl
subprocess.run(['uv', 'pip', 'install', 'openpyxl', '-q'])

import openpyxl
from openpyxl.utils import get_column_letter

def read_excel_products(file_path):
    """讀取 Excel 文件中的產品數據"""
    products = []
    try:
        wb = openpyxl.load_workbook(file_path, data_only=True)
        ws = wb.active
        
        # 讀取第一行作為標題
        headers = []
        for cell in ws[1]:
            headers.append(str(cell.value) if cell.value else '')
        
        # 讀取數據行
        for row_idx, row in enumerate(ws.iter_rows(min_row=2), start=2):
            product = {}
            for col_idx, cell in enumerate(row):
                if col_idx < len(headers):
                    header = headers[col_idx].lower() if headers[col_idx] else ''
                    value = cell.value if cell.value else ''
                    
                    # 智能匹配字段
                    if any(k in header for k in ['產品', '品名', '名稱', 'name', 'title', 'product']):
                        product['name'] = str(value)
                    elif any(k in header for k in ['英文', 'en', 'english', 'ename']):
                        product['nameEn'] = str(value)
                    elif any(k in header for k in ['價格', '價錢', 'price', 'cost', '售價']):
                        try:
                            product['price'] = float(str(value).replace(',', '').replace('$', ''))
                        except:
                            product['price'] = 0
                    elif any(k in header for k in ['描述', '說明', 'desc', 'description', '介紹']):
                        product['desc'] = str(value)[:300]
                    elif any(k in header for k in ['品牌', 'brand', 'vendor']):
                        product['brand'] = str(value)
                    elif any(k in header for k in ['類型', 'type', 'category', '分類']):
                        product['type'] = str(value)
                    elif any(k in header for k in ['容量', 'size', 'volume', 'ml', 'g']):
                        product['capacity'] = str(value)
                    elif any(k in header for k in ['sku', '編碼', 'code', '貨號']):
                        product['sku'] = str(value)
                    elif any(k in header for k in ['圖片', 'image', 'photo', 'url']):
                        product['image'] = str(value)
            
            if product.get('name'):
                products.append(product)
        
        wb.close()
        print(f"✅ {Path(file_path).name}: 讀取 {len(products)} 個產品")
    except Exception as e:
        print(f"❌ {Path(file_path).name}: 錯誤 - {e}")
    
    return products

def generate_product_id(name, brand=''):
    """生成產品 ID"""
    import re
    # 移除特殊字符
    text = re.sub(r'[^\w\s\u4e00-\u9fff]', '', str(name))
    # 轉換為拼音或英文
    text = text.lower().replace(' ', '-')[:30]
    if brand:
        brand_id = re.sub(r'[^\w]', '', str(brand)).lower()[:10]
        return f"{brand_id}-{text}"
    return text

def get_icon_from_type(product_type):
    """根據產品類型返回 emoji"""
    if not product_type:
        return '📦'
    type_lower = str(product_type).lower()
    if '精華' in type_lower or 'serum' in type_lower or 'ampoule' in type_lower:
        return '✨'
    elif '面霜' in type_lower or 'cream' in type_lower:
        return '🧴'
    elif '防曬' in type_lower or 'sun' in type_lower:
        return '☀️'
    elif '潔面' in type_lower or 'cleanser' in type_lower or '洗面' in type_lower:
        return '🧼'
    elif '面膜' in type_lower or 'mask' in type_lower:
        return '🎭'
    elif '化妝水' in type_lower or 'toner' in type_lower or '爽膚水' in type_lower:
        return '💧'
    elif '唇膏' in type_lower or 'lip' in type_lower:
        return '💄'
    elif '眼影' in type_lower or 'eye' in type_lower:
        return '👁️'
    elif '腮紅' in type_lower or 'blush' in type_lower:
        return '🌸'
    else:
        return '📦'

def main():
    output_path = Path('/Users/winstonli/.openclaw/workspace/skincare-app/js/products.js')
    
    # 所有 Excel 文件路徑
    excel_files = [
        '/Users/winstonli/Library/Mobile Documents/com~apple~CloudDocs/Downloads/dasique.xlsx',
        '/Users/winstonli/Library/Containers/com.tencent.xinWeChat/Data/Documents/xwechat_files/wxid_w9uebpt489vp22_8db4/msg/file/2025-12/Lilybyred Product Info _20251209_to winston.xlsx',
        '/Users/winstonli/Library/Containers/com.tencent.xinWeChat/Data/Documents/xwechat_files/wxid_w9uebpt489vp22_8db4/msg/file/2025-12/White Conc (Product Introduction) 2025.xlsx',
    ]
    
    # 添加 Skin1004 CSV 產品
    csv_products_path = Path('/Users/winstonli/.openclaw/workspace/skincare-app/js/products.js')
    
    all_products = {}
    
    print("📊 開始整合產品數據...\n")
    
    # 讀取所有 Excel
    for excel_file in excel_files:
        if Path(excel_file).exists():
            products = read_excel_products(excel_file)
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
                    'desc': prod.get('desc', ''),
                    'brand': brand,
                    'type': prod.get('type', ''),
                    'capacity': prod.get('capacity', ''),
                    'sku': prod.get('sku', ''),
                    'image': prod.get('image', ''),
                    'icon': get_icon_from_type(prod.get('type', '')),
                    'skinTypes': ['all'],
                    'benefits': []
                }
    
    print(f"\n✅ 總共整合 {len(all_products)} 個產品")
    
    # 生成 JavaScript 文件
    js_content = '// 完整產品數據庫 - 整合所有 Excel 文件\n'
    js_content += '// 自動生成於 2026-03-06\n'
    js_content += f'// 產品總數：{len(all_products)}\n\n'
    js_content += 'const PRODUCTS = ' + json.dumps(all_products, ensure_ascii=False, indent=4) + ';\n'
    
    output_path.parent.mkdir(parents=True, exist_ok=True)
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(js_content)
    
    print(f"\n📁 已保存至：{output_path}")
    
    # 顯示產品統計
    print("\n📦 產品統計:")
    brands = {}
    for pid, prod in all_products.items():
        brand = prod.get('brand', 'Unknown')
        brands[brand] = brands.get(brand, 0) + 1
    
    for brand, count in sorted(brands.items(), key=lambda x: -x[1]):
        print(f"  {brand}: {count} 個產品")

if __name__ == '__main__':
    main()
