# 🚀 Quick Start - GitHub Desktop Deployment

## 5-Minute Deploy Guide

### Step 1: Update Username (30 seconds)
```bash
cd /Users/abhijat/Downloads/chronos
./setup-github.sh
# Enter your GitHub username
```

### Step 2: GitHub Desktop (2 minutes)
1. Open GitHub Desktop
2. **Add Local Repository** → Select `chronos` folder
3. **Commit** with message: `Initial commit: Chronos`
4. **Publish repository** (make it PUBLIC)

### Step 3: Enable Pages (1 minute)
1. **Repository** → **View on GitHub**
2. **Settings** → **Pages**
3. Source: **GitHub Actions**
4. Save

### Step 4: Wait & Visit (2 minutes)
1. **Actions** tab → Watch deployment
2. Visit: `https://YOUR_USERNAME.github.io/chronos/`
3. Done! 🎉

---

## Important Files

### ✅ Ready to Push:
- `README.md` - Rich documentation
- `.github/workflows/deploy.yml` - Auto-deployment
- `vite.config.ts` - Configured for GitHub Pages
- `.gitignore` - Protects secrets

### ❌ Never Push:
- `.env.local` - Your API keys
- `backend/.env` - Backend secrets
- `node_modules/` - Dependencies
- `dist/` - Build output

---

## Your Live URLs

```
🌐 Demo: https://YOUR_USERNAME.github.io/chronos/
📦 Repo: https://github.com/YOUR_USERNAME/chronos
🔒 Notice: https://YOUR_USERNAME.github.io/chronos/SECURITY_NOTICE.html
```

---

## Security Notice on Live Site

The deployed site shows:
```
🔒 DEMO MODE - API keys removed for security.
Fork repo and add your key for full functionality.
```

This is intentional! Users need to fork and add their own keys.

---

## Update Later

1. Make changes in code
2. GitHub Desktop → Review changes
3. Commit with description
4. Push origin
5. Auto-deploys in 2-3 minutes

---

## Need Help?

📖 **Full Guides:**
- `GITHUB_DESKTOP_GUIDE.md` - Detailed steps
- `PRE_PUSH_CHECKLIST.md` - Verification checklist
- `GITHUB_DEPLOYMENT.md` - Technical details

🐛 **Troubleshooting:**
- Actions tab shows build errors
- Clear browser cache: `Cmd+Shift+R`
- Wait 2-3 minutes after first deploy

---

**Ready? Open GitHub Desktop and go! 🚀**
