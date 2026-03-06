// ============================================
// 護膚顧問 App - 產品數據
// ============================================

// 產品數據庫（從 Excel 導入的模擬數據）
const productsDB = [
    {
        id: 1,
        productNo1: 25215,
        productNo2: '8809695679766',
        nameC: '韓國 VT 微針精華 300 針 2ml*6 條裝',
        nameE: 'VT Cica Ampoule',
        brand: 'VT',
        brandOrigin: 'korea',
        category: 'serum',
        price: 69.0,
        cost: 34.87,
        stock: 0,
        unit: '盒',
        skinTypes: ['sensitive', 'dry', 'acne'],
        concerns: ['redness', 'dryness', 'acne', 'barrier'],
        goals: ['hydration', 'repair', 'acne-care'],
        tags: ['hot', 'sensitive'],
        description: '溫和修復精華，含積雪草成分，舒緩泛紅',
        rating: 4.9,
        reviewCount: 328
    },
    {
        id: 2,
        productNo1: 26126,
        productNo2: '8809835062236',
        nameC: '韓國 Tocobo 保護水潤純素保濕舒緩防曬霜 SPF50+ PA++++ 50ml',
        nameE: 'Tocobo Cotton Soft Sunscreen',
        brand: 'Tocobo',
        brandOrigin: 'korea',
        category: 'sunscreen',
        price: 168.0,
        cost: 107.0,
        stock: 0,
        unit: '支',
        skinTypes: ['sensitive', 'dry', 'oily', 'combination'],
        concerns: ['dryness', 'redness'],
        goals: ['sun-protection', 'hydration'],
        tags: ['award', 'sensitive'],
        description: 'SPF50+ 高防曬，清爽不黏膩，敏感肌適用',
        rating: 4.8,
        reviewCount: 256
    },
    {
        id: 3,
        productNo1: 23209,
        productNo2: '8809784601968',
        nameC: '韓國 Torriden 桃瑞丹積雪草洗面乳 150ml',
        nameE: 'Torriden Cica Cleanser',
        brand: 'Torriden',
        brandOrigin: 'korea',
        category: 'cleanser',
        price: 105.0,
        cost: 59.49,
        stock: 0,
        unit: '支',
        skinTypes: ['sensitive', 'dry', 'combination'],
        concerns: ['redness', 'dryness', 'barrier'],
        goals: ['hydration', 'repair'],
        tags: ['sensitive'],
        description: '積雪草配方，溫和清潔不緊繃',
        rating: 4.7,
        reviewCount: 189
    },
    {
        id: 4,
        productNo1: 25239,
        productNo2: '8803463011284',
        nameC: '韓國 VT 微針凝膠面膜 5 片混合裝',
        nameE: 'VT Cica Mask',
        brand: 'VT',
        brandOrigin: 'korea',
        category: 'mask',
        price: 165.0,
        cost: 79.38,
        stock: 0,
        unit: '盒',
        skinTypes: ['sensitive', 'dry', 'acne'],
        concerns: ['redness', 'dryness', 'acne'],
        goals: ['hydration', 'repair', 'acne-care'],
        tags: ['hot'],
        description: '微針技術，深層修復，舒緩敏感',
        rating: 4.8,
        reviewCount: 412
    },
    {
        id: 5,
        productNo1: 26522,
        productNo2: '8803463011819',
        nameC: '韓國 VT 微針 100 針 PDRN 精華乳 30ml+1.5ml 3 片裝',
        nameE: 'VT PDRN Essence',
        brand: 'VT',
        brandOrigin: 'korea',
        category: 'serum',
        price: 239.0,
        cost: 126.26,
        stock: 0,
        unit: '盒',
        skinTypes: ['mature', 'dry', 'sensitive'],
        concerns: ['wrinkles', 'dryness', 'dullness'],
        goals: ['anti-aging', 'hydration', 'brightening'],
        tags: ['award'],
        description: 'PDRN 修復成分，抗老緊緻',
        rating: 4.9,
        reviewCount: 178
    },
    {
        id: 6,
        productNo1: 25810,
        productNo2: '8801051037487',
        nameC: '韓國 Ugly lovely 土豆柑橘面膜 10 片裝',
        nameE: 'Ugly Lovely Mask',
        brand: 'Ugly lovely',
        brandOrigin: 'korea',
        category: 'mask',
        price: 128.0,
        cost: 62.0,
        stock: 0,
        unit: '盒',
        skinTypes: ['all'],
        concerns: ['dullness', 'dryness'],
        goals: ['brightening', 'hydration'],
        tags: ['hot'],
        description: '維 C 美白，提亮膚色',
        rating: 4.6,
        reviewCount: 234
    },
    {
        id: 7,
        productNo1: 18785,
        productNo2: '8809647390015',
        nameC: '韓國 SOME BY MI 30 天奇跡淡化斑防水暗瘡貼 18 片',
        nameE: 'SOME BY MI Acne Patch',
        brand: 'SOME BY MI',
        brandOrigin: 'korea',
        category: 'acne-care',
        price: 29.0,
        cost: 17.03,
        stock: 0,
        unit: '盒',
        skinTypes: ['acne', 'oily', 'combination'],
        concerns: ['acne', 'blackheads'],
        goals: ['acne-care'],
        tags: ['hot', 'award'],
        description: '30 天奇跡系列，快速平復痘痘',
        rating: 4.8,
        reviewCount: 567
    },
    {
        id: 8,
        productNo1: 25249,
        productNo2: '8803463011260',
        nameC: '韓國 VT 微針 100 針 50ml+300 針 50ml+ 乳霜 50ml 套裝',
        nameE: 'VT Cica Set',
        brand: 'VT',
        brandOrigin: 'korea',
        category: 'set',
        price: 440.0,
        cost: 220.22,
        stock: 0,
        unit: '套',
        skinTypes: ['sensitive', 'dry', 'acne'],
        concerns: ['redness', 'dryness', 'acne', 'barrier'],
        goals: ['hydration', 'repair', 'acne-care'],
        tags: ['hot', 'value'],
        description: '完整護膚套裝，性價比高',
        rating: 4.9,
        reviewCount: 145
    }
];

// 護膚小貼士數據庫
const skincareTipsDB = {
    sensitive: [
        '敏感肌建議水溫不要過熱，溫水最佳',
        '選擇無香精、無酒精配方的產品',
        '新產品使用前建議先做耳後測試',
        '避免過度清潔，每天 2 次足夠',
        '防曬很重要，選擇物理防曬更溫和'
    ],
    dry: [
        '乾燥時可多層保濕疊加',
        '洗臉後 3 分鐘內塗抹保養品鎖水',
        '室內使用加濕器保持濕度',
        '避免長時間待在空調環境',
        '每週使用 2-3 次保濕面膜'
    ],
    oily: [
        '油性肌也要保濕，選擇清爽型產品',
        '避免過度清潔，會刺激更多出油',
        '定期清潔化妝工具和枕頭套',
        '飲食清淡，減少油炸食物',
        '使用含煙鹼醯胺成分幫助控油'
    ],
    combination: [
        'T 字和兩頰分開護理',
        'T 字用清爽型，兩頰用滋潤型',
        '選擇平衡型化妝水',
        '避免使用過於油膩的產品',
        '定期去角質，但不要太頻繁'
    ],
    acne: [
        '不要用手擠痘痘，會留疤',
        '選擇含水楊酸或茶樹油的產品',
        '保持枕頭套清潔，每週更換',
        '飲食注意，減少糖分攝取',
        '痘痘貼可以幫助吸收分泌物'
    ],
    mature: [
        '抗老要趁早，25 歲後開始預防',
        '使用含視黃醇、胜肽的產品',
        '防曬是抗老最重要的一步',
        '頸部和眼部也要保養',
        '保持充足睡眠和運動'
    ]
};

// 需要避開的誤區
const skincareWarningsDB = {
    sensitive: [
        '頻繁去角質會加重敏感',
        '酒精成分會導致更乾燥',
        '不要同時使用太多活性成分',
        '避免使用磨砂類產品',
        '不要頻繁更換護膚品'
    ],
    dry: [
        '不要用熱水洗臉，會帶走油脂',
        '避免含酒精的化妝水',
        '不要忽略身體保濕',
        '避免長時間泡熱水澡',
        '不要使用清潔力過強的洗面乳'
    ],
    oily: [
        '不要過度清潔，會越洗越油',
        '避免使用過於油膩的產品',
        '不要完全不保濕',
        '避免用手觸摸臉部',
        '不要擠痘痘'
    ],
    acne: [
        '不要用手擠痘痘',
        '避免使用油性彩妝',
        '不要過度使用祛痘產品',
        '避免高糖高油飲食',
        '不要忽略防曬'
    ]
};

// 護膚流程建議
const routineSuggestions = {
    sensitive: {
        morning: '溫和洗面 → 舒緩化妝水 → 修復精華 → 防曬',
        evening: '溫和洗面 → 舒緩化妝水 → 修復精華 → 保濕面霜'
    },
    dry: {
        morning: '溫和洗面 → 保濕化妝水 → 保濕精華 → 防曬',
        evening: '卸妝 → 溫和洗面 → 保濕化妝水 → 精華 → 滋潤面霜'
    },
    oily: {
        morning: '控油洗面 → 清爽化妝水 → 控油精華 → 防曬',
        evening: '卸妝 → 控油洗面 → 收斂化妝水 → 清爽乳液'
    },
    acne: {
        morning: '溫和洗面 → 抗痘化妝水 → 祛痘精華 → 清爽防曬',
        evening: '卸妝 → 溫和洗面 → 抗痘精華 → 痘痘護理 → 清爽保濕'
    }
};

// 護膚小知識（分析頁面顯示）
const skincareFacts = [
    '敏感肌建議避免酒精、香精成分',
    '洗臉水溫過高會破壞皮膚屏障',
    '防曬是抗老最重要的一步',
    '保濕做得好，肌膚問題少一半',
    '新產品使用建議先做局部測試',
    '睡眠不足會影響肌膚修復',
    '飲食清淡對肌膚健康很重要',
    '壓力會導致肌膚問題惡化'
];

// 膚質翻譯
const skinTypeLabels = {
    sensitive: '敏感肌',
    dry: '乾性肌',
    oily: '油性肌',
    combination: '混合肌',
    acne: '痘痘肌',
    mature: '熟齡肌',
    normal: '一般肌',
    damaged: '受損肌'
};

// 肌膚狀況翻譯
const concernLabels = {
    redness: '泛紅',
    stinging: '刺痛',
    dryness: '乾燥脫皮',
    acne: '爆痘',
    blackheads: '粉刺',
    dullness: '暗沉',
    spots: '斑點',
    wrinkles: '細紋',
    pores: '毛孔粗大',
    barrier: '屏障受損',
    oiliness: '出油'
};

// 功效目標翻譯
const goalLabels = {
    hydration: '保濕補水',
    repair: '修復屏障',
    brightening: '美白提亮',
    'acne-care': '去痘淡印',
    'anti-aging': '抗老緊緻',
    'sun-protection': '防曬保護',
    'oil-control': '控油',
    'pore-care': '收毛孔'
};

// 品牌來源翻譯
const brandOriginLabels = {
    japan: '日本',
    korea: '韓國',
    all: '全部'
};

// 產品類別翻譯
const categoryLabels = {
    cleanser: '洗面',
    toner: '化妝水',
    serum: '精華',
    lotion: '乳液',
    cream: '面霜',
    mask: '面膜',
    sunscreen: '防曬',
    eyecare: '眼霜',
    'acne-care': '痘痘護理',
    set: '套裝'
};

// 導出數據
window.productsDB = productsDB;
window.skincareTipsDB = skincareTipsDB;
window.skincareWarningsDB = skincareWarningsDB;
window.routineSuggestions = routineSuggestions;
window.skincareFacts = skincareFacts;
window.skinTypeLabels = skinTypeLabels;
window.concernLabels = concernLabels;
window.goalLabels = goalLabels;
window.brandOriginLabels = brandOriginLabels;
window.categoryLabels = categoryLabels;
