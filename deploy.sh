#!/bin/bash
# 護膚顧問 App - GitHub 部署腳本

set -e

REPO_URL="https://github.com/edberli/skincare-advisor.git"
APP_DIR="$HOME/.openclaw/workspace/skincare-app"
TEMP_DIR="/tmp/skincare-app-deploy"

echo " 開始部署護膚顧問 App 到 GitHub Pages..."
echo

# 檢查 gh CLI 是否已安裝
if ! command -v gh &> /dev/null; then
    echo "❌ 未找到 GitHub CLI (gh)"
    echo "請先執行：brew install gh"
    exit 1
fi

# 檢查是否已認證
if ! gh auth status &> /dev/null; then
    echo "❌ GitHub 未認證"
    echo "請先執行：gh auth login"
    exit 1
fi

# 清理臨時目錄
rm -rf "$TEMP_DIR"
mkdir -p "$TEMP_DIR"

# 複製應用文件
echo "📦 複製應用文件..."
cp -r "$APP_DIR"/* "$TEMP_DIR/"

# 創建 .nojekyll 文件（告訴 GitHub 不要使用 Jekyll）
touch "$TEMP_DIR/.nojekyll"

# 進入臨時目錄
cd "$TEMP_DIR"

# 初始化 Git（如果還未初始化）
if [ ! -d ".git" ]; then
    echo "📝 初始化 Git 倉庫..."
    git init
    git checkout -b gh-pages
fi

# 配置 Git
git config user.name "JARVIS (OpenClaw)"
git config user.email "jarvis@openclaw.local"

# 添加所有文件
echo "💾 提交更改..."
git add -A
git commit -m "🎨 更新護膚顧問 App - $(date '+%Y-%m-%d %H:%M')" || {
    echo "⚠️  沒有更改需要提交"
}

# 檢查遠程倉庫
if ! git remote get-url origin &> /dev/null 2>&1; then
    echo "🔗 添加遠程倉庫..."
    git remote add origin "$REPO_URL"
fi

# 推送至 GitHub
echo "📤 推送至 GitHub..."
git push -f origin gh-pages

# 獲取倉庫名稱
REPO_NAME=$(basename "$REPO_URL" .git)
GITHUB_USER=$(gh api user | jq -r '.login')

echo
echo "✅ 部署完成！"
echo
echo "🌐 訪問網址："
echo "   https://${GITHUB_USER}.github.io/${REPO_NAME}/"
echo
echo "📱 或掃描 QR Code（如支援）"
echo
echo "💡 提示：首次部署可能需要 1-2 分鐘生效"
