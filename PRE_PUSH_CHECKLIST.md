# ✅ Chronos - Pre-Push Checklist

## Before Using GitHub Desktop

### 🔐 Security Check
- [ ] `.env.local` exists and contains your API key (for local use)
- [ ] `.env.local` is listed in `.gitignore` (verify it's there)
- [ ] `backend/.env` is listed in `.gitignore`
- [ ] No API keys in any committed files
- [ ] Run: `cat .gitignore | grep .env` (should show .env files)

### 📝 Update Placeholders
- [ ] Replace `YOUR_USERNAME` in `README.md` with your GitHub username
- [ ] Replace `YOUR_GITHUB_USERNAME` in `README.md`
- [ ] Update contact section in `README.md` with your name/email
- [ ] Update `.github/workflows/deploy.yml` with your username

### 🧪 Test Locally
- [ ] Run: `npm install` (dependencies installed)
- [ ] Run: `npm run dev` (app works on localhost:3000)
- [ ] Test simulation with your API key
- [ ] Check both Cyberpunk and Minimalist themes
- [ ] Verify tour shows on first load
- [ ] Test timeline visualization interactions
- [ ] Run: `npm run build` (builds without errors)
- [ ] Run: `npm run preview` (production build works)

### 📦 Files Ready
- [ ] `README.md` - Updated and complete
- [ ] `.gitignore` - Contains .env* and node_modules
- [ ] `package.json` - All dependencies listed
- [ ] `.github/workflows/deploy.yml` - Deployment workflow exists
- [ ] `vite.config.ts` - Configured with base path
- [ ] `logo.png` and `logo.mp4` - Exist in root
- [ ] All component files present
- [ ] `DEMO_SCRIPT.md` - Demo guide ready

### 🎨 Visual Assets
- [ ] `logo.png` - 200x200 or similar
- [ ] `logo.mp4` - Video for splash screen
- [ ] Screenshots ready (optional - can add later)
- [ ] Banner image (optional)

---

## GitHub Desktop Steps

### 1. Initial Setup
- [ ] GitHub Desktop installed
- [ ] Signed into GitHub account
- [ ] Added chronos folder as repository
- [ ] All files showing in Changes panel

### 2. First Commit
- [ ] Reviewed all changed files
- [ ] Confirmed no .env files present
- [ ] Written descriptive commit message
- [ ] Committed to main branch

### 3. Publish
- [ ] Clicked "Publish repository"
- [ ] Set name to "chronos"
- [ ] Added description
- [ ] **UNCHECKED** "Keep this code private"
- [ ] Successfully published

### 4. Enable GitHub Pages
- [ ] Opened repo on GitHub.com
- [ ] Went to Settings → Pages
- [ ] Selected Source: "GitHub Actions"
- [ ] Saved settings

### 5. Verify Deployment
- [ ] Checked Actions tab
- [ ] Workflow running (or completed)
- [ ] No errors in workflow logs
- [ ] Green checkmark appears
- [ ] Visited live URL: `https://YOUR_USERNAME.github.io/chronos/`

---

## Post-Deployment Verification

### 🌐 Live Site Checks
- [ ] Site loads without errors
- [ ] Security warning banner appears
- [ ] Splash screen shows (logo.mp4)
- [ ] Tour starts after splash
- [ ] All pages/components render
- [ ] Both themes work
- [ ] Buttons and interactions respond
- [ ] `/SECURITY_NOTICE.html` page exists

### 📱 Browser Testing
- [ ] Chrome/Edge - Works
- [ ] Firefox - Works
- [ ] Safari - Works
- [ ] Mobile responsive - Works

### 🔗 Links Working
- [ ] README badges point to correct URLs
- [ ] Live demo link works
- [ ] Repository link works
- [ ] All internal links functional

---

## Common Issues & Fixes

### Issue: .env file committed by mistake
**Fix:**
```bash
# In terminal:
cd /Users/abhijat/Downloads/chronos
git rm --cached .env.local
git rm --cached backend/.env
git commit -m "Remove sensitive files"
# Then push in GitHub Desktop
```

### Issue: Site shows 404
**Solution:**
- Wait 2-3 minutes after first deployment
- Check Actions tab for successful completion
- Verify URL is `https://USERNAME.github.io/chronos/` (with trailing slash)
- Clear browser cache

### Issue: No security banner
**Solution:**
- This is normal for local builds
- Only appears on GitHub Pages deployment
- Check browser console for the warning
- Try visiting `/SECURITY_NOTICE.html` directly

### Issue: Build fails in Actions
**Solution:**
- Check Actions tab for error logs
- Common causes:
  - Missing dependencies in package.json
  - TypeScript errors
  - Vite config issues
- Fix locally, commit, push again

---

## 📋 Final Pre-Push Verification

Run these commands to verify everything:

```bash
# Navigate to project
cd /Users/abhijat/Downloads/chronos

# Check gitignore is protecting secrets
cat .gitignore | grep -E "(\.env|node_modules)"

# Verify no env files staged
git status | grep -i "\.env"
# (should show nothing)

# Test build
npm run build

# Check if dist folder created
ls -la dist/

# Test production preview
npm run preview
# Visit http://localhost:4173 and test
```

---

## 🎯 Success Criteria

Your deployment is successful when:

✅ Repository visible at `https://github.com/YOUR_USERNAME/chronos`  
✅ Actions workflow completed with green checkmark  
✅ Live site accessible at `https://YOUR_USERNAME.github.io/chronos/`  
✅ Security banner shows on live site  
✅ App loads and displays correctly  
✅ No .env files in repository  
✅ README shows correct username/links  

---

## 🚀 Ready to Deploy?

If all boxes are checked above:

1. **Open GitHub Desktop**
2. **Follow GITHUB_DESKTOP_GUIDE.md**
3. **Push to GitHub**
4. **Enable Pages**
5. **Share your link!**

---

## 📊 Post-Deployment Sharing

Once live, share your work:

### On GitHub
```markdown
# Add to your profile README:
### 🌟 Featured Project: Chronos
⚡ AI-powered multiverse timeline simulator  
🔗 [Live Demo](https://YOUR_USERNAME.github.io/chronos/)
```

### Social Media
```
Just launched Chronos - The Multiverse Engine! 

🌌 AI-powered timeline simulator
🤖 Gemini 2.5 Flash
💾 Raindrop MCP Server
⚡ Built for Raindrop x Vultr Hackathon

Try it: https://YOUR_USERNAME.github.io/chronos/

#AI #Hackathon #WebDev
```

### On LinkedIn
```
Excited to share my latest project: Chronos - The Multiverse Engine

A probabilistic multiverse simulator that uses AI to visualize divergent life paths based on key decisions.

Tech Stack:
• React 19 + TypeScript + Vite
• Gemini 2.5 Flash API
• Raindrop MCP Server
• Vultr Cloud Compute
• Tailwind CSS

Features:
✨ Three timeline paths (Safe, Risk, Chaos)
✨ AI-generated diary entries
✨ Interactive visualization
✨ Dual theme system
✨ Smart memory persistence

Live Demo: https://YOUR_USERNAME.github.io/chronos/
GitHub: https://github.com/YOUR_USERNAME/chronos

#WebDevelopment #AI #OpenSource #React #TypeScript
```

---

## 🎉 You're All Set!

Everything is ready for GitHub Desktop deployment. Open the app and follow the steps in **GITHUB_DESKTOP_GUIDE.md**!

**Good luck! 🚀**
