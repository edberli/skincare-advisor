# 護膚顧問 App

門市客戶導向護膚品推薦應用程式

## 📋 功能特點

- **肌膚測驗**：5 步驟個人化測驗，找出最適合的護膚品
- **AI 推薦**：根據膚質、狀況、目標智能匹配產品
- **護膚建議**：提供護膚小貼士、誤區提醒、早晚流程建議
- **產品搜尋**：快速搜尋產品名稱、編號或品牌
- **護膚流程**：可視化早晚護膚步驟，建立個人流程

## 🎨 設計風格

- 精美柔和配色（米白底 + 粉膚色 + 水藍 + 玫瑰金）
- 手繪風格插畫元素（櫻花、水滴、葉子、星光）
- 卡片式設計，圓角柔和陰影
- 高質感美妝品牌 App 風格

## 📁 項目結構

```
skincare-app/
├── index.html          # 主頁面（10 個 Screen）
├── css/
│   └── style.css       # 樣式文件（~900 行）
├── js/
│   ├── data.js         # 產品數據庫
│   └── app.js          # 應用邏輯
├── assets/             # 圖片資源（可選）
└── docs/
    └── README.md       # 本文檔
```

## 🚀 快速啟動

### 方法 1：直接開啟
```bash
open ~/.openclaw/workspace/skincare-app/index.html
```

### 方法 2：使用本地伺服器
```bash
cd ~/.openclaw/workspace/skincare-app
python3 -m http.server 8080
# 然後在瀏覽器開啟 http://localhost:8080
```

### 方法 3：使用 npx http-server
```bash
npx http-server ~/.openclaw/workspace/skincare-app -p 8080
```

## 📱 頁面流程

1. **首頁** → 三個入口（肌膚測驗 / 搜尋產品 / 護膚流程）
2. **肌膚測驗** → 5 步驟：
   - 步驟 1/5：膚質選擇（7 種）
   - 步驟 2/5：肌膚狀況（11 種）
   - 步驟 3/5：功效目標（6 種）
   - 步驟 4/5：品牌偏好（日本/韓國/全部）+ 產品類別
   - 步驟 5/5：AI 分析中（2.5 秒動畫）
3. **肌膚建議頁** → 護膚小貼士 + 誤區 + 流程建議
4. **推薦結果頁** → 3-5 個匹配產品卡片
5. **產品搜尋頁** → 搜尋框 + 熱門標籤 + 結果列表
6. **護膚流程頁** → 早晚步驟可視化

## 💾 產品數據

目前包含 8 個模擬產品（韓國品牌為主）：

| 產品 | 類別 | 售價 |
|------|------|------|
| VT 微針精華 | 精華 | HK$ 69 |
| Tocobo 防曬霜 | 防曬 | HK$ 168 |
| Torriden 洗面乳 | 洗面 | HK$ 105 |
| VT 微針面膜 | 面膜 | HK$ 165 |
| VT PDRN 精華乳 | 精華 | HK$ 239 |
| Ugly lovely 面膜 | 面膜 | HK$ 128 |
| SOME BY MI 暗瘡貼 | 痘痘護理 | HK$ 29 |
| VT 微針套裝 | 套裝 | HK$ 440 |

### 導入 Excel 數據

要將實際 Excel 數據導入，請執行：

```bash
python3 scripts/import_excel.py
```

## 🔧 自定義配置

### 修改配色
編輯 `css/style.css` 中的 `:root` 變量：

```css
:root {
    --primary-color: #D4A5A5;      /* 主色 */
    --accent-blue: #B8D4E3;        /* 水藍 */
    --accent-pink: #FFB6C1;        /* 粉紅 */
    /* ... */
}
```

### 添加新產品
編輯 `js/data.js`，在 `productsDB` 陣列中添加：

```javascript
{
    id: 9,
    nameC: '產品中文名稱',
    nameE: 'Product English Name',
    brand: '品牌名',
    brandOrigin: 'korea',  // japan / korea
    category: 'serum',     // cleanser / toner / serum / etc.
    price: 199.0,
    skinTypes: ['sensitive', 'dry'],
    concerns: ['redness', 'dryness'],
    goals: ['hydration', 'repair'],
    tags: ['hot', 'sensitive'],
    description: '產品簡介',
    rating: 4.8,
    reviewCount: 200
}
```

## 📊 推薦算法

產品評分系統：

| 匹配項目 | 權重 |
|---------|------|
| 膚質匹配 | +30 |
| 肌膚狀況（每項） | +15 |
| 功效目標（每項） | +20 |
| 品牌偏好匹配 | +10 |
| 產品類別匹配 | +5 |
| 熱賣標籤 | +5 |
| 得獎標籤 | +5 |
| 敏感肌友好（敏感肌） | +10 |

## 🎯 待開發功能

- [ ] AI 顧問對話功能
- [ ] 產品詳情頁面
- [ ] 購物車/收藏功能
- [ ] 用戶帳號系統
- [ ] 購買記錄追蹤
- [ ] 產品比較功能
- [ ] 多語言支援（EN/TC/SC）
- [ ] 深色模式

## 📝 更新日誌

### v1.0.0 (2026-03-05)
- ✅ 完成 10 個核心頁面
- ✅ 肌膚測驗流程（5 步驟）
- ✅ AI 推薦算法
- ✅ 護膚建議生成
- ✅ 產品搜尋功能
- ✅ 護膚流程可視化
- ✅ 手繪風格 UI 設計
- ✅ 響應式佈局

## 📄 授權

內部項目，僅供門市使用。

---

**開發者**：JARVIS (OpenClaw)
**最後更新**：2026-03-05
