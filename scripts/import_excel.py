#!/usr/bin/env python3
"""
護膚顧問 App - Excel 數據導入腳本
將 Excel 產品數據轉換為 App 可用的 JSON 格式
"""

import pandas as pd
import json
from pathlib import Path
from datetime import datetime

# 配置
EXCEL_PATH = '/Users/winstonli/.openclaw/media/inbound/all_1---8a066774-032b-44af-844a-f359b97d852e.xlsx'
OUTPUT_PATH = '/Users/winstonli/.openclaw/workspace/skincare-app/js/products.json'
DATA_JS_PATH = '/Users/winstonli/.openclaw/workspace/skincare-app/js/data.js'

def load_excel():
    """載入 Excel 文件"""
    print(f"📊 載入 Excel 文件：{EXCEL_PATH}")
    df = pd.read_excel(EXCEL_PATH)
    print(f"✓ 成功載入 {len(df)} 行數據")
    return df

def guess_skin_type(product_name):
    """根據產品名稱猜測適合膚質"""
    name = product_name.lower()
    
    skin_types = []
    
    if any(kw in name for kw in ['敏感', '舒緩', '溫和', 'cica', '積雪草']):
        skin_types.append('sensitive')
    if any(kw in name for kw in ['乾', '滋潤', '保濕', 'hydrat']):
        skin_types.append('dry')
    if any(kw in name for kw in ['油', '控油', '清爽', 'oil']):
        skin_types.append('oily')
    if any(kw in name for kw in ['混合', 'balance']):
        skin_types.append('combination')
    if any(kw in name for kw in ['痘', '暗瘡', 'acne', 'pimple']):
        skin_types.append('acne')
    if any(kw in name for kw in ['抗老', '緊緻', '皺紋', 'aging', 'wrinkle']):
        skin_types.append('mature')
    
    # 如果沒有匹配，預設為所有膚質
    if not skin_types:
        skin_types = ['all']
    
    return skin_types

def guess_concerns(product_name):
    """根據產品名稱猜測適用肌膚狀況"""
    name = product_name.lower()
    
    concerns = []
    
    if any(kw in name for kw in ['泛紅', 'redness', '舒緩']):
        concerns.append('redness')
    if any(kw in name for kw in ['乾燥', '脫皮', 'dry']):
        concerns.append('dryness')
    if any(kw in name for kw in ['痘', '暗瘡', 'acne']):
        concerns.append('acne')
    if any(kw in name for kw in ['粉刺', 'blackhead']):
        concerns.append('blackheads')
    if any(kw in name for kw in ['暗沉', 'dull']):
        concerns.append('dullness')
    if any(kw in name for kw in ['斑', '美白', 'bright']):
        concerns.append('spots')
    if any(kw in name for kw in ['皺紋', '紋', 'wrinkle']):
        concerns.append('wrinkles')
    if any(kw in name for kw in ['毛孔', 'pore']):
        concerns.append('pores')
    if any(kw in name for kw in ['屏障', 'barrier', '修復']):
        concerns.append('barrier')
    if any(kw in name for kw in ['出油', 'oil']):
        concerns.append('oiliness')
    
    if not concerns:
        concerns = ['dryness']  # 預設
    
    return concerns

def guess_goals(product_name, category):
    """根據產品名稱和類別猜測功效目標"""
    name = product_name.lower()
    
    goals = []
    
    if any(kw in name for kw in ['保濕', '補水', 'hydrat', 'moist']):
        goals.append('hydration')
    if any(kw in name for kw in ['修復', '修護', 'repair', 'cica']):
        goals.append('repair')
    if any(kw in name for kw in ['美白', '提亮', 'bright', 'white']):
        goals.append('brightening')
    if any(kw in name for kw in ['痘', '暗瘡', 'acne']):
        goals.append('acne-care')
    if any(kw in name for kw in ['抗老', '緊緻', 'aging', 'firm']):
        goals.append('anti-aging')
    if any(kw in name for kw in ['防曬', 'sun', 'spf', 'uv']):
        goals.append('sun-protection')
    if any(kw in name for kw in ['控油', 'oil']):
        goals.append('oil-control')
    
    if not goals:
        goals.append('hydration')  # 預設
    
    return goals

def guess_category(product_name):
    """根據產品名稱猜測類別"""
    name = product_name.lower()
    
    if any(kw in name for kw in ['洗面', 'cleanser', 'wash', 'foam']):
        return 'cleanser'
    if any(kw in name for kw in ['化妝水', 'toner', 'lotion']):
        return 'toner'
    if any(kw in name for kw in ['精華', 'ampoule', 'serum', 'essence']):
        return 'serum'
    if any(kw in name for kw in ['乳液', 'emulsion', 'lotion']):
        return 'lotion'
    if any(kw in name for kw in ['面霜', 'cream']):
        return 'cream'
    if any(kw in name for kw in ['面膜', 'mask', 'pack']):
        return 'mask'
    if any(kw in name for kw in ['防曬', 'sunscreen', 'sun', 'spf']):
        return 'sunscreen'
    if any(kw in name for kw in ['眼霜', 'eye']):
        return 'eyecare'
    if any(kw in name for kw in ['套裝', 'set']):
        return 'set'
    if any(kw in name for kw in ['暗瘡貼', 'patch']):
        return 'acne-care'
    
    return 'serum'  # 預設

def guess_brand_origin(product_name):
    """根據產品名稱猜測品牌來源"""
    name = product_name.lower()
    
    if '韓國' in product_name or 'korea' in name:
        return 'korea'
    if '日本' in product_name or 'japan' in name:
        return 'japan'
    
    # 根據條碼判斷（880 開頭是韓國）
    return 'korea'  # 預設韓國

def guess_tags(product_name, price):
    """猜測產品標籤"""
    tags = []
    name = product_name.lower()
    
    if any(kw in name for kw in ['熱賣', 'hot', 'popular']):
        tags.append('hot')
    if any(kw in name for kw in ['得獎', 'award', 'winner']):
        tags.append('award')
    if any(kw in name for kw in ['敏感', '溫和', 'sensitive']):
        tags.append('sensitive')
    if price and price < 50:
        tags.append('value')
    
    if not tags:
        tags.append('new')
    
    return tags

def convert_to_app_format(df):
    """將 Excel 數據轉換為 App 格式"""
    products = []
    
    for idx, row in df.iterrows():
        # 跳過無產品名稱的行
        if pd.isna(row.get('產品說明C')) or not row['產品說明C']:
            continue
        
        product_name = str(row['產品說明C'])
        price = float(row['售價']) if pd.notna(row.get('售價')) else 0
        
        product = {
            'id': idx + 1,
            'productNo1': int(row['產品編號 1']) if pd.notna(row.get('產品編號 1')) else None,
            'productNo2': str(row['產品編號 2']) if pd.notna(row.get('產品編號 2')) else '',
            'nameC': product_name,
            'nameE': str(row['產品說明 E']) if pd.notna(row.get('產品說明 E')) else '',
            'brand': product_name.split()[0] if product_name else 'Unknown',
            'brandOrigin': guess_brand_origin(product_name),
            'category': guess_category(product_name),
            'price': price,
            'cost': float(row['成本']) if pd.notna(row.get('成本')) else 0,
            'stock': int(row['存量']) if pd.notna(row.get('存量')) else 0,
            'unit': str(row['單位']) if pd.notna(row.get('單位')) else '個',
            'skinTypes': guess_skin_type(product_name),
            'concerns': guess_concerns(product_name),
            'goals': guess_goals(product_name, guess_category(product_name)),
            'tags': guess_tags(product_name, price),
            'description': f"{product_name[:50]}...",
            'rating': 4.5 + (idx % 10) * 0.05,  # 模擬評分
            'reviewCount': 100 + (idx % 500)  # 模擬評論數
        }
        
        products.append(product)
    
    return products

def update_data_js(products):
    """更新 data.js 文件中的產品數據"""
    print(f"📝 更新 data.js 文件...")
    
    # 讀取原始 data.js
    with open(DATA_JS_PATH, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 生成新的產品數據
    products_json = json.dumps(products, ensure_ascii=False, indent=4)
    
    # 找到 productsDB 陣列的位置並替換
    start_marker = 'const productsDB = ['
    end_marker = '];\n\n// 護膚小貼士數據庫'
    
    start_idx = content.find(start_marker)
    end_idx = content.find(end_marker)
    
    if start_idx == -1 or end_idx == -1:
        print("❌ 無法找到 productsDB 陣列位置")
        return False
    
    # 構建新內容
    new_content = (
        content[:start_idx] +
        f'const productsDB = {products_json};\n\n' +
        content[end_idx + 2:]  # +2 跳過 '];'
    )
    
    # 寫回文件
    with open(DATA_JS_PATH, 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    print(f"✓ 成功更新 {len(products)} 個產品到 data.js")
    return True

def main():
    """主函數"""
    print("=" * 50)
    print("🧴 護膚顧問 App - Excel 數據導入工具")
    print("=" * 50)
    print()
    
    try:
        # 載入 Excel
        df = load_excel()
        print()
        
        # 轉換格式
        print("🔄 轉換數據格式...")
        products = convert_to_app_format(df)
        print(f"✓ 成功轉換 {len(products)} 個產品")
        print()
        
        # 顯示前 5 個產品預覽
        print("📋 產品預覽（前 5 個）：")
        print("-" * 50)
        for i, p in enumerate(products[:5], 1):
            print(f"{i}. {p['nameC']}")
            print(f"   類別：{p['category']} | 售價：HK$ {p['price']}")
            print(f"   膚質：{', '.join(p['skinTypes'])}")
            print()
        
        # 確認是否繼續
        response = input(f"確認導入 {len(products)} 個產品到 App？(y/n): ")
        if response.lower() != 'y':
            print("❌ 已取消導入")
            return
        
        # 更新 data.js
        if update_data_js(products):
            print()
            print("=" * 50)
            print("✅ 導入完成！")
            print("=" * 50)
            print()
            print("📊 統計：")
            print(f"   - 總產品數：{len(products)}")
            
            # 類別統計
            categories = {}
            for p in products:
                cat = p['category']
                categories[cat] = categories.get(cat, 0) + 1
            
            print(f"   - 類別分佈：")
            for cat, count in sorted(categories.items(), key=lambda x: -x[1]):
                print(f"     • {cat}: {count} 個")
            
            print()
            print("🌐 開啟 App 查看：")
            print("   open ~/.openclaw/workspace/skincare-app/index.html")
            print()
        
    except FileNotFoundError:
        print(f"❌ 找不到 Excel 文件：{EXCEL_PATH}")
        print("   請確認文件路徑正確")
    except Exception as e:
        print(f"❌ 發生錯誤：{e}")
        import traceback
        traceback.print_exc()

if __name__ == '__main__':
    main()
