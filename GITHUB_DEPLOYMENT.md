# 🚀 GitHub Deployment Guide

## Prerequisites
- GitHub account
- Git installed locally
- Chronos project ready

---

## 📋 Step-by-Step Deployment

### 1️⃣ Create GitHub Repository

```bash
# Navigate to your project
cd /Users/abhijat/Downloads/chronos

# Initialize git (if not already)
git init

# Create .gitignore (already exists)
# Ensure .env.local and .env files are in .gitignore
```

### 2️⃣ Push to GitHub

```bash
# Add all files
git add .

# Commit
git commit -m "Initial commit: Chronos - The Multiverse Engine"

# Create repo on GitHub.com (name it 'chronos')
# Then link and push:
git remote add origin https://github.com/YOUR_USERNAME/chronos.git
git branch -M main
git push -u origin main
```

### 3️⃣ Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages** (left sidebar)
3. Under **Source**, select:
   - **Source**: GitHub Actions (not branch)
4. Click **Save**

### 4️⃣ Configure Repository Settings

The workflow will automatically deploy on every push to `main` branch.

**No additional configuration needed!** The workflow in `.github/workflows/deploy.yml` handles everything.

---

## 🔐 Security Features

### What's Protected
- ✅ `.env.local` is gitignored (never committed)
- ✅ `.env` files excluded from repository
- ✅ GitHub Pages deployment uses dummy API key
- ✅ Warning banner shows on live demo
- ✅ Security notice page at `/SECURITY_NOTICE.html`

### Live Demo Limitations
The GitHub Pages deployment:
- Shows full UI and animations
- Displays warning banner about API keys
- Simulation button works but returns mock data
- All visual features function normally
- Users directed to fork repo for full access

---

## 🌐 Access Your Live Demo

After deployment (takes 2-3 minutes):
- **Live URL**: `https://YOUR_USERNAME.github.io/chronos/`
- **Security Notice**: `https://YOUR_USERNAME.github.io/chronos/SECURITY_NOTICE.html`

---

## 📝 Update README Links

Replace placeholders in `README.md`:

```markdown
# Find and replace:
YOUR_USERNAME → your-actual-github-username
YOUR_GITHUB_USERNAME → your-actual-github-username

# Example:
[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-Visit_Now-blue?style=for-the-badge)](https://abhijat.github.io/chronos)
```

---

## 🔄 Workflow Details

The GitHub Actions workflow:

1. **Triggers**: On push to `main` or manual dispatch
2. **Builds**: Runs `npm run build` with demo environment
3. **Injects**: Security warning banner in HTML
4. **Creates**: `/SECURITY_NOTICE.html` page
5. **Deploys**: To GitHub Pages automatically

---

## 🐛 Troubleshooting

### Build Fails
```bash
# Check workflow logs
# Go to: GitHub → Actions → Latest workflow run

# Common issues:
- Missing dependencies → Check package.json
- Vite config errors → Check vite.config.ts
- Build errors → Run locally: npm run build
```

### Pages Not Loading
```bash
# 1. Ensure GitHub Pages is enabled
# 2. Wait 2-3 minutes after first push
# 3. Check Actions tab for deployment status
# 4. Visit https://YOUR_USERNAME.github.io/chronos/
```

### 404 Errors on Refresh
```bash
# GitHub Pages with SPA requires base path
# Already configured in vite.config.ts:
base: process.env.GITHUB_ACTIONS ? '/chronos/' : '/'
```

---

## 📊 Monitoring

### Check Deployment Status
1. Go to **Actions** tab in your repository
2. View latest workflow run
3. Green checkmark = successful deployment
4. Red X = build/deployment failed (check logs)

### View Live Site
- Click **Deployments** in repository sidebar
- See deployment history and live URL

---

## 🔧 Local Testing of Production Build

Test your production build locally before pushing:

```bash
# Build
npm run build

# Preview
npm run preview

# Visit http://localhost:4173
```

---

## ✅ Deployment Checklist

Before pushing to GitHub:

- [ ] `.env.local` is in `.gitignore`
- [ ] Updated README.md with your username
- [ ] Tested build locally (`npm run build`)
- [ ] Committed all files
- [ ] Created GitHub repository
- [ ] Enabled GitHub Pages (Actions source)
- [ ] Pushed to main branch
- [ ] Waited 2-3 minutes for deployment
- [ ] Visited live URL to verify
- [ ] Checked security warning banner appears

---

## 🎉 Success!

Your Chronos app is now live! Share your link:

```
🌐 Live Demo: https://YOUR_USERNAME.github.io/chronos/
📦 Repository: https://github.com/YOUR_USERNAME/chronos
```

---

## 🔄 Updating Your Live Site

Simply push to main branch:

```bash
git add .
git commit -m "Update: [describe changes]"
git push origin main

# GitHub Actions automatically rebuilds and redeploys
# Takes 2-3 minutes
```

---

## 🆘 Need Help?

- Check GitHub Actions logs for errors
- Review workflow file: `.github/workflows/deploy.yml`
- Ensure all dependencies are in `package.json`
- Test build locally first

---

**Happy Deploying! 🚀**
