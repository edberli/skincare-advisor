// Glowy Skin & Co. - 完整功能版本
// 使用 Skin1004 真實產品數據

// ========== 數據 ==========
// PRODUCTS 從 products.js 載入

const SKIN_TIPS = [
    { icon: '💧', title: '早晚都要保濕', desc: '早上用輕薄保濕，晚上用滋潤面霜' },
    { icon: '☀️', title: '防曬不可少', desc: '即使室內都要用防曬，防止紫外線傷害' },
    { icon: '🌙', title: '晚上修護最重要', desc: '睡眠時肌膚修復能力最強，用精華加強' },
    { icon: '💆', title: '溫柔對待肌膚', desc: '不要用力搓揉，輕輕按壓吸收' }
];

// ========== 初始化 ==========
document.addEventListener('DOMContentLoaded', function() {
    console.log('✨ Glowy Skin & Co. 已載入！');
    initAllButtons();
    initPageLoadAnimation();
});

function initPageLoadAnimation() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    setTimeout(function() {
        document.body.style.opacity = '1';
    }, 100);
}

// ========== 按鈕綁定 ==========
function initAllButtons() {
    // 通知按鈕
    document.getElementById('notificationBtn')?.addEventListener('click', showNotificationPanel);
    
    // 測驗按鈕
    document.getElementById('quizBtn')?.addEventListener('click', openQuizPage);
    
    // 底部導航
    document.querySelectorAll('.nav-item').forEach(function(item) {
        item.addEventListener('click', handleNavClick);
    });
    
    // 分類卡片
    document.querySelectorAll('.category-card').forEach(function(card) {
        card.addEventListener('click', handleCategoryClick);
    });
    
    // 產品卡片
    document.querySelectorAll('.featured-card').forEach(function(card) {
        card.addEventListener('click', function() {
            var product = this.getAttribute('data-product');
            openProductPage(product);
        });
    });
}

// ========== 導航處理 ==========
function handleNavClick() {
    var tabName = this.getAttribute('data-tab');
    
    // 切換 active
    document.querySelectorAll('.nav-item').forEach(function(item) {
        item.classList.remove('active');
    });
    this.classList.add('active');
    
    // 處理不同頁面
    switch(tabName) {
        case 'home':
            // 首頁，不做什麼
            break;
        case 'quiz':
            openQuizPage();
            break;
        case 'products':
            showAllProducts();
            break;
        case 'profile':
            showProfilePage();
            break;
    }
}

// ========== 分類處理 ==========
function handleCategoryClick() {
    var category = this.getAttribute('data-category');
    
    switch(category) {
        case 'quiz':
            openQuizPage();
            break;
        case 'routine':
            openRoutinePage();
            break;
        case 'products':
            showAllProducts();
            break;
        case 'tips':
            showTipsPage();
            break;
        case 'about':
            showAboutPage();
            break;
        case 'contact':
            showContactPage();
            break;
    }
}

// ========== 測驗功能 ==========
let quizState = {
    step: 1,
    answers: {}
};

function openQuizPage() {
    document.getElementById('quiz-page').style.display = 'block';
    document.querySelector('.app-header').style.display = 'none';
    document.querySelector('.main-content').style.display = 'none';
    document.querySelector('.bottom-nav').style.display = 'none';
    
    quizState = { step: 1, answers: {} };
    renderQuizStep(1);
}

function closeQuizPage() {
    document.getElementById('quiz-page').style.display = 'none';
    document.querySelector('.app-header').style.display = 'block';
    document.querySelector('.main-content').style.display = 'block';
    document.querySelector('.bottom-nav').style.display = 'flex';
}

function renderQuizStep(step) {
    var content = document.getElementById('quiz-content');
    var progress = (step / 5) * 100;
    
    var html = '<div class="quiz-wrapper">';
    html += '<div class="quiz-progress"><div class="progress-bar"><div class="progress-fill" style="width: ' + progress + '%"></div></div></div>';
    
    switch(step) {
        case 1:
            html += renderStep1();
            break;
        case 2:
            html += renderStep2();
            break;
        case 3:
            html += renderStep3();
            break;
        case 4:
            html += renderStep4();
            break;
        case 5:
            html += renderStep5();
            break;
    }
    
    html += '</div>';
    content.innerHTML = html;
    
    // 綁定選項事件
    content.querySelectorAll('.quiz-option').forEach(function(option) {
        option.addEventListener('click', function() {
            selectOption(option);
        });
    });
    
    // 綁定下一步按鈕
    var nextBtn = content.querySelector('.quiz-next-btn');
    if (nextBtn) {
        nextBtn.addEventListener('click', nextStep);
    }
}

function renderStep1() {
    return '<div class="quiz-step">' +
        '<div class="step-icon">🌸</div>' +
        '<h3>你的膚質是什麼？</h3>' +
        '<p class="step-desc">選擇最符合你肌膚狀況的選項</p>' +
        '<div class="quiz-options">' +
        '<button class="quiz-option" data-key="skinType" data-value="sensitive">🌸 敏感肌 - 容易泛紅、刺痛</button>' +
        '<button class="quiz-option" data-key="skinType" data-value="dry">💧 乾性肌 - 乾燥、脫皮</button>' +
        '<button class="quiz-option" data-key="skinType" data-value="oily">✨ 油性肌 - 出油、毛孔粗大</button>' +
        '<button class="quiz-option" data-key="skinType" data-value="combination">🌿 混合肌 - T 字出油、兩頰乾</button>' +
        '<button class="quiz-option" data-key="skinType" data-value="acne">🎀 痘痘肌 - 易爆痘、粉刺</button>' +
        '<button class="quiz-option" data-key="skinType" data-value="mature">🕐 熟齡肌 - 細紋、鬆弛</button>' +
        '</div>' +
        '<button class="quiz-next-btn">下一步 →</button>' +
        '</div>';
}

function renderStep2() {
    return '<div class="quiz-step">' +
        '<div class="step-icon">💧</div>' +
        '<h3>目前肌膚狀況</h3>' +
        '<p class="step-desc">可多選，選擇所有符合的選項</p>' +
        '<div class="quiz-options multi-select">' +
        '<button class="quiz-option" data-key="concerns" data-value="redness">🔴 泛紅</button>' +
        '<button class="quiz-option" data-key="concerns" data-value="dryness">🌵 乾燥</button>' +
        '<button class="quiz-option" data-key="concerns" data-value="acne">🟠 爆痘</button>' +
        '<button class="quiz-option" data-key="concerns" data-value="dullness">🌑 暗沉</button>' +
        '<button class="quiz-option" data-key="concerns" data-value="spots">🟤 斑點</button>' +
        '<button class="quiz-option" data-key="concerns" data-value="wrinkles">〰️ 細紋</button>' +
        '<button class="quiz-option" data-key="concerns" data-value="pores">⭕ 毛孔</button>' +
        '<button class="quiz-option" data-key="concerns" data-value="oiliness">💧 出油</button>' +
        '</div>' +
        '<button class="quiz-next-btn">下一步 →</button>' +
        '</div>';
}

function renderStep3() {
    return '<div class="quiz-step">' +
        '<div class="step-icon">✨</div>' +
        '<h3>你想改善什麼？</h3>' +
        '<p class="step-desc">選擇最主要的目標</p>' +
        '<div class="quiz-options">' +
        '<button class="quiz-option" data-key="goal" data-value="hydration">💧 保濕補水</button>' +
        '<button class="quiz-option" data-key="goal" data-value="repair">🌿 修復屏障</button>' +
        '<button class="quiz-option" data-key="goal" data-value="brightening">✨ 美白提亮</button>' +
        '<button class="quiz-option" data-key="goal" data-value="acne-care">🎀 去痘淡印</button>' +
        '<button class="quiz-option" data-key="goal" data-value="anti-aging">🕐 抗老緊</button>' +
        '<button class="quiz-option" data-key="goal" data-value="sun-protection">☀️ 防曬保護</button>' +
        '</div>' +
        '<button class="quiz-next-btn">下一步 →</button>' +
        '</div>';
}

function renderStep4() {
    return '<div class="quiz-step">' +
        '<div class="step-icon">️</div>' +
        '<h3>品牌偏好</h3>' +
        '<p class="step-desc">你喜歡哪種品牌？</p>' +
        '<div class="quiz-options">' +
        '<button class="quiz-option" data-key="brand" data-value="japan">🇯 日本品牌 - 溫和細緻</button>' +
        '<button class="quiz-option" data-key="brand" data-value="korea">🇰🇷 韓國品牌 - 創新高性價比</button>' +
        '<button class="quiz-option" data-key="brand" data-value="all">🌏 全部 - 不限制，只看效果</button>' +
        '</div>' +
        '<button class="quiz-next-btn">下一步 →</button>' +
        '</div>';
}

function renderStep5() {
    return '<div class="quiz-step">' +
        '<div class="step-icon">💕</div>' +
        '<h3>預算範圍</h3>' +
        '<p class="step-desc">你每月的護膚品預算？</p>' +
        '<div class="quiz-options">' +
        '<button class="quiz-option" data-key="budget" data-value="low">💰 $500 以下</button>' +
        '<button class="quiz-option" data-key="budget" data-value="medium">💰💰 $500-1500</button>' +
        '<button class="quiz-option" data-key="budget" data-value="high">💰💰 $1500 以上</button>' +
        '</div>' +
        '<button class="quiz-next-btn" onclick="showQuizResult()">查看結果 ✨</button>' +
        '</div>';
}

function selectOption(option) {
    var key = option.getAttribute('data-key');
    var value = option.getAttribute('data-value');
    var parent = option.parentElement;
    
    if (parent.classList.contains('multi-select')) {
        // 多選
        option.classList.toggle('selected');
        if (!quizState.answers[key]) {
            quizState.answers[key] = [];
        }
        if (option.classList.contains('selected')) {
            if (!quizState.answers[key].includes(value)) {
                quizState.answers[key].push(value);
            }
        } else {
            quizState.answers[key] = quizState.answers[key].filter(function(v) {
                return v !== value;
            });
        }
    } else {
        // 單選
        parent.querySelectorAll('.quiz-option').forEach(function(opt) {
            opt.classList.remove('selected');
        });
        option.classList.add('selected');
        quizState.answers[key] = value;
    }
}

function nextStep() {
    if (quizState.step < 5) {
        quizState.step++;
        renderQuizStep(quizState.step);
    }
}

function showQuizResult() {
    var content = document.getElementById('quiz-content');
    var skinType = quizState.answers.skinType || 'combination';
    var goal = quizState.answers.goal || 'hydration';
    
    // 根據答案推薦產品
    var recommendations = getRecommendations(skinType, goal);
    
    var html = '<div class="quiz-result">';
    html += '<div class="result-header">';
    html += '<div class="result-icon">💕</div>';
    html += '<h3>你的肌膚分析報告</h3>';
    html += '</div>';
    
    html += '<div class="result-summary">';
    html += '<p><strong>膚質：</strong>' + getSkinTypeName(skinType) + '</p>';
    html += '<p><strong>主要目標：</strong>' + getGoalName(goal) + '</p>';
    html += '</div>';
    
    html += '<h4 class="result-title">為你推薦的產品</h4>';
    html += '<div class="result-products">';
    
    recommendations.forEach(function(prodId) {
        var prod = PRODUCTS[prodId];
        html += '<div class="result-product-card" onclick="openProductPage(\'' + prodId + '\')">';
        html += '<div class="result-prod-icon">' + prod.icon + '</div>';
        html += '<div class="result-prod-info">';
        html += '<strong>' + prod.name + '</strong>';
        html += '<p>' + prod.desc + '</p>';
        html += '<div class="result-prod-price">$' + prod.price + '</div>';
        html += '</div>';
        html += '</div>';
    });
    
    html += '</div>';
    html += '<button class="quiz-restart-btn" onclick="restartQuiz()">重新測驗 ↻</button>';
    html += '<button class="quiz-close-btn" onclick="closeQuizPage()">完成 ✓</button>';
    html += '</div>';
    
    content.innerHTML = html;
}

function getRecommendations(skinType, goal) {
    var recs = [];
    
    // 根據膚質推薦 Skin1004 產品
    if (skinType === 'sensitive') {
        recs.push('cica-ampoule', 'cica-soothing', 'cica-toner');
    } else if (skinType === 'dry') {
        recs.push('cica-soothing', 'cica-ampoule', 'cica-mask');
    } else if (skinType === 'oily') {
        recs.push('cica-sunscreen', 'cica-cleanser', 'cica-toner');
    } else if (skinType === 'acne') {
        recs.push('cica-mask', 'cica-soothing', 'cica-cleanser');
    } else if (skinType === 'mature') {
        recs.push('cica-ampoule', 'cica-soothing', 'cica-mask');
    } else {
        // combination 或 all
        recs.push('cica-ampoule', 'cica-sunscreen', 'cica-toner');
    }
    
    // 根據目標調整
    if (goal === 'sun-protection') {
        recs.unshift('cica-sunscreen');
    } else if (goal === 'soothing' || goal === 'repair') {
        recs.unshift('cica-ampoule');
    } else if (goal === 'hydration') {
        recs.unshift('cica-toner');
    }
    
    // 去重
    return [...new Set(recs)].slice(0, 3);
}

function getSkinTypeName(type) {
    var names = {
        'sensitive': '敏感肌',
        'dry': '乾性肌',
        'oily': '油性肌',
        'combination': '混合肌',
        'acne': '痘痘肌',
        'mature': '熟齡肌'
    };
    return names[type] || type;
}

function getGoalName(goal) {
    var names = {
        'hydration': '保濕補水',
        'repair': '修復屏障',
        'brightening': '美白提亮',
        'acne-care': '去痘淡印',
        'anti-aging': '抗老緊緻',
        'sun-protection': '防曬保護'
    };
    return names[goal] || goal;
}

function restartQuiz() {
    quizState = { step: 1, answers: {} };
    renderQuizStep(1);
}

// ========== 產品功能 ==========
function openProductPage(productId) {
    var product = PRODUCTS[productId];
    if (!product) return;
    
    document.getElementById('product-page').style.display = 'block';
    document.querySelector('.app-header').style.display = 'none';
    document.querySelector('.main-content').style.display = 'none';
    document.querySelector('.bottom-nav').style.display = 'none';
    
    var html = '<div class="product-detail">';
    html += '<div class="product-detail-icon">' + product.icon + '</div>';
    html += '<h2 class="product-detail-name">' + product.name + '</h2>';
    html += '<p class="product-detail-name-en">' + product.nameEn + '</p>';
    html += '<div class="product-detail-price">$' + product.price + '</div>';
    html += '<p class="product-detail-desc">' + product.desc + '</p>';
    
    html += '<div class="product-detail-section">';
    html += '<h4>適合膚質</h4>';
    html += '<div class="product-tags">';
    product.skinTypes.forEach(function(type) {
        html += '<span class="tag">' + getSkinTypeName(type) + '</span>';
    });
    html += '</div></div>';
    
    html += '<div class="product-detail-section">';
    html += '<h4>主要功效</h4>';
    html += '<div class="product-tags">';
    product.benefits.forEach(function(benefit) {
        html += '<span class="tag">' + benefit + '</span>';
    });
    html += '</div></div>';
    
    html += '<button class="add-to-cart-btn">加入購物車 🛒</button>';
    html += '<button class="buy-now-btn">立即購買 ✨</button>';
    html += '</div>';
    
    document.getElementById('product-content').innerHTML = html;
}

function closeProductPage() {
    document.getElementById('product-page').style.display = 'none';
    document.querySelector('.app-header').style.display = 'block';
    document.querySelector('.main-content').style.display = 'block';
    document.querySelector('.bottom-nav').style.display = 'flex';
}

function showAllProducts() {
    openProductPage('honey'); // 暫時顯示第一個產品
}

// ========== 護膚流程 ==========
function openRoutinePage() {
    document.getElementById('routine-page').style.display = 'block';
    document.querySelector('.app-header').style.display = 'none';
    document.querySelector('.main-content').style.display = 'none';
    document.querySelector('.bottom-nav').style.display = 'none';
    
    var html = '<div class="routine-page">';
    html += '<div class="routine-section">';
    html += '<h3>🌅 早上流程</h3>';
    html += '<div class="routine-steps">';
    html += '<div class="routine-step"><span class="step-num">1</span><div><strong>潔面</strong><p>用溫和潔面乳清潔肌膚</p></div></div>';
    html += '<div class="routine-step"><span class="step-num">2</span><div><strong>化妝水</strong><p>補充水分，平衡肌膚 pH 值</p></div></div>';
    html += '<div class="routine-step"><span class="step-num">3</span><div><strong>精華</strong><p>針對性修護，深入滋養</p></div></div>';
    html += '<div class="routine-step"><span class="step-num">4</span><div><strong>面霜</strong><p>鎖住水分，保持滋潤</p></div></div>';
    html += '<div class="routine-step"><span class="step-num">5</span><div><strong>防曬</strong><p>保護肌膚免受紫外線傷害</p></div></div>';
    html += '</div></div>';
    
    html += '<div class="routine-section">';
    html += '<h3>🌙 晚上流程</h3>';
    html += '<div class="routine-steps">';
    html += '<div class="routine-step"><span class="step-num">1</span><div><strong>卸妝</strong><p>徹底清除化妝和防曬</p></div></div>';
    html += '<div class="routine-step"><span class="step-num">2</span><div><strong>潔面</strong><p>溫和清潔，去除污垢</p></div></div>';
    html += '<div class="routine-step"><span class="step-num">3</span><div><strong>化妝水</strong><p>補充水分，準備吸收</p></div></div>';
    html += '<div class="routine-step"><span class="step-num">4</span><div><strong>精華</strong><p>夜間修護，加強滋養</p></div></div>';
    html += '<div class="routine-step"><span class="step-num">5</span><div><strong>面霜</strong><p>鎖住營養，深度保濕</p></div></div>';
    html += '</div></div>';
    
    html += '<div class="routine-tips">';
    html += '<h4>💡 護膚小貼士</h4>';
    SKIN_TIPS.forEach(function(tip) {
        html += '<div class="tip-card"><span class="tip-icon">' + tip.icon + '</span><div><strong>' + tip.title + '</strong><p>' + tip.desc + '</p></div></div>';
    });
    html += '</div>';
    
    html += '<button class="routine-close-btn" onclick="closeRoutinePage()">完成 ✓</button>';
    html += '</div>';
    
    document.getElementById('routine-content').innerHTML = html;
}

function closeRoutinePage() {
    document.getElementById('routine-page').style.display = 'none';
    document.querySelector('.app-header').style.display = 'block';
    document.querySelector('.main-content').style.display = 'block';
    document.querySelector('.bottom-nav').style.display = 'flex';
}

// ========== 其他頁面 ==========
function showTipsPage() {
    alert('💡 護膚貼士\n\n' + SKIN_TIPS.map(function(t) {
        return t.icon + ' ' + t.title + '\n' + t.desc;
    }).join('\n\n'));
}

function showAboutPage() {
    alert('ℹ️ 關於 Glowy Skin & Co.\n\n我們致力於為你提供最適合的護膚建議，讓每個人都能找到屬於自己的完美護膚 routine！💕');
}

function showContactPage() {
    alert('💬 聯絡我們\n\nEmail: hello@glowyskin.com\nInstagram: @glowyskin_co\n\n歡迎隨時查詢！');
}

function showProfilePage() {
    alert('👤 我的\n\n個人資料及訂單記錄\n\n即將推出會員系統！');
}

// ========== 通知 ==========
function showNotificationPanel() {
    var panel = document.createElement('div');
    panel.className = 'notification-panel';
    panel.innerHTML = '<div class="panel-overlay" onclick="this.parentElement.remove()"></div>' +
        '<div class="panel-content"><div class="panel-header"><h3>🔔 通知中心</h3><button class="panel-close" onclick="this.closest(\'.notification-panel\').remove()">✕</button></div>' +
        '<div class="panel-body">' +
        '<div class="notification-item"><span class="notif-icon">💕</span><div class="notif-text"><strong>歡迎使用 Glowy Skin!</strong><p>開始肌膚測驗，找到最適合你的護膚品</p></div></div>' +
        '<div class="notification-item"><span class="notif-icon">✨</span><div class="notif-text"><strong>新產品上架</strong><p>綠茶化妝水現已發售</p></div></div>' +
        '</div></div></div>';
    document.body.appendChild(panel);
}

// ========== 防止雙擊縮放 ==========
var lastTouchEnd = 0;
document.addEventListener('touchend', function(e) {
    var now = Date.now();
    if (now - lastTouchEnd <= 300) e.preventDefault();
    lastTouchEnd = now;
}, false);
