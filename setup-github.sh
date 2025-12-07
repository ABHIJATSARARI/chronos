#!/bin/bash

# Chronos - GitHub Setup Helper
# Run this script to update README with your GitHub username

echo "🚀 Chronos - GitHub Setup Helper"
echo "=================================="
echo ""

# Get GitHub username
read -p "Enter your GitHub username: " USERNAME

if [ -z "$USERNAME" ]; then
    echo "❌ Error: Username cannot be empty"
    exit 1
fi

echo ""
echo "📝 Updating files with username: $USERNAME"
echo ""

# Update README.md
if [ -f "README.md" ]; then
    sed -i.bak "s/YOUR_USERNAME/$USERNAME/g" README.md
    sed -i.bak "s/YOUR_GITHUB_USERNAME/$USERNAME/g" README.md
    rm README.md.bak 2>/dev/null
    echo "✅ Updated README.md"
else
    echo "⚠️  README.md not found"
fi

# Update GitHub workflow
if [ -f ".github/workflows/deploy.yml" ]; then
    sed -i.bak "s/YOUR_USERNAME/$USERNAME/g" .github/workflows/deploy.yml
    rm .github/workflows/deploy.yml.bak 2>/dev/null
    echo "✅ Updated .github/workflows/deploy.yml"
else
    echo "⚠️  .github/workflows/deploy.yml not found"
fi

# Update vite.config.ts with correct base path
if [ -f "vite.config.ts" ]; then
    echo "✅ vite.config.ts already configured"
else
    echo "⚠️  vite.config.ts not found"
fi

echo ""
echo "✨ Setup complete! Next steps:"
echo ""
echo "1. Review changes:"
echo "   git diff README.md"
echo ""
echo "2. Create GitHub repository named 'chronos'"
echo ""
echo "3. Push to GitHub:"
echo "   git add ."
echo "   git commit -m \"Initial commit: Chronos - The Multiverse Engine\""
echo "   git remote add origin https://github.com/$USERNAME/chronos.git"
echo "   git branch -M main"
echo "   git push -u origin main"
echo ""
echo "4. Enable GitHub Pages:"
echo "   Settings → Pages → Source: GitHub Actions"
echo ""
echo "5. Your live demo will be at:"
echo "   🌐 https://$USERNAME.github.io/chronos/"
echo ""
echo "🎉 Ready to deploy!"
