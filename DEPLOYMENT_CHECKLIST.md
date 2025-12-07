# ✅ Production Deployment Checklist

Use this checklist to deploy Chronos to production with full backend.

---

## 🎯 Pre-Deployment

- [ ] Vultr account created with credits
- [ ] Gemini API key obtained from https://aistudio.google.com/
- [ ] Raindrop.io account with API token from https://app.raindrop.io/settings/integrations
- [ ] GitHub repository pushed with latest code

---

## 🖥️ Backend Deployment (Vultr)

### Create Vultr Server
- [ ] Go to https://my.vultr.com/deploy/
- [ ] Choose "Cloud Compute - Shared CPU"
- [ ] Select Ubuntu 24.04 LTS
- [ ] Choose $6/month plan (1GB RAM)
- [ ] Set hostname: `chronos-backend`
- [ ] Deploy and copy IP address: `________________`

### Deploy Backend Code
- [ ] Run: `./quick-deploy.sh YOUR_VULTR_IP`
- [ ] Or follow manual steps in `DEPLOYMENT_GUIDE.md`

### Configure Backend
- [ ] SSH to server: `ssh root@YOUR_VULTR_IP`
- [ ] Edit .env file: `cd /var/www/chronos/backend && nano .env`
- [ ] Add Gemini API key
- [ ] Add Raindrop API token
- [ ] Set NODE_ENV=production
- [ ] Save file (Ctrl+X, Y, Enter)

### Start Backend
- [ ] Start PM2: `pm2 start ecosystem.config.js`
- [ ] Save PM2 config: `pm2 save`
- [ ] Enable startup: `pm2 startup` (run the command it outputs)
- [ ] Check status: `pm2 status`
- [ ] View logs: `pm2 logs chronos-backend`

### Test Backend
- [ ] Health check: `curl http://YOUR_VULTR_IP/api/health`
- [ ] Should return: `{"status":"ok",...}`

---

## 🌐 Frontend Deployment (GitHub Pages)

### Update Local Configuration
- [ ] Edit `.env.local` in project root
- [ ] Set: `VITE_BACKEND_URL=http://YOUR_VULTR_IP`
- [ ] Commit changes: `git add .env.local && git commit -m "Add production backend URL"`

### Deploy via GitHub Actions
- [ ] Push changes: `git push origin main`
- [ ] Go to: https://github.com/ABHIJATSARARI/chronos/actions
- [ ] Click "Deploy Production to GitHub Pages"
- [ ] Click "Run workflow"
- [ ] Input backend URL: `http://YOUR_VULTR_IP`
- [ ] Click "Run workflow" button
- [ ] Wait 2-3 minutes for deployment

### Verify Deployment
- [ ] Visit: https://abhijatsarari.github.io/chronos/
- [ ] Should see production banner at top
- [ ] Test full flow: Enter decision → Generate → View timelines
- [ ] Test Raindrop save: Click "Save to Raindrop"
- [ ] Check Raindrop.io for saved bookmark

---

## 🔧 Post-Deployment Configuration

### Update Backend CORS
- [ ] SSH to server
- [ ] Edit: `nano /var/www/chronos/backend/server.js`
- [ ] Verify CORS includes: `https://abhijatsarari.github.io`
- [ ] Restart: `pm2 restart chronos-backend`

### Setup Nginx (Optional but Recommended)
- [ ] Install: `apt install nginx`
- [ ] Configure reverse proxy (see DEPLOYMENT_GUIDE.md)
- [ ] Test: `nginx -t`
- [ ] Restart: `systemctl restart nginx`

### Monitor Backend
- [ ] View logs: `pm2 logs chronos-backend`
- [ ] Check resources: `pm2 monit`
- [ ] Test API: `curl http://YOUR_VULTR_IP/api/health`

---

## 🎭 Demo vs Production

You now have TWO versions deployed:

### Demo Version (Mock Data)
- **URL**: https://abhijatsarari.github.io/chronos/ (default)
- **Uses**: Mock AI responses
- **Backend**: None required
- **Purpose**: Quick showcase

### Production Version (Real AI)
- **URL**: https://abhijatsarari.github.io/chronos/ (after production deploy)
- **Uses**: Real Gemini AI + Raindrop MCP
- **Backend**: Vultr server at `YOUR_VULTR_IP`
- **Purpose**: Full functionality

To switch between them, just run different GitHub Actions workflows.

---

## 📊 Monitoring & Maintenance

### Daily Checks
- [ ] Backend health: `curl http://YOUR_VULTR_IP/api/health`
- [ ] PM2 status: `ssh root@YOUR_VULTR_IP "pm2 status"`
- [ ] Frontend accessible: https://abhijatsarari.github.io/chronos/

### Weekly Checks
- [ ] View error logs: `pm2 logs chronos-backend --err`
- [ ] Check disk space: `df -h`
- [ ] Update system: `apt update && apt upgrade -y`

### Monthly Tasks
- [ ] Review Gemini API usage and costs
- [ ] Check Vultr billing
- [ ] Update dependencies: `npm update`
- [ ] Backup configuration files

---

## 🆘 Troubleshooting

### Backend Not Responding
```bash
ssh root@YOUR_VULTR_IP
pm2 logs chronos-backend --lines 50
pm2 restart chronos-backend
```

### Frontend Can't Connect
- Check firewall: `ufw status`
- Check CORS settings in backend
- Verify backend URL in GitHub Actions workflow

### Gemini API Errors
- Check API key in backend .env
- Verify quota at https://aistudio.google.com/

### Raindrop Not Saving
- Check API token in backend .env
- Test manually: Visit Raindrop.io settings

---

## 🎉 Success Indicators

You're fully deployed when:
- ✅ `curl http://YOUR_VULTR_IP/api/health` returns OK
- ✅ Frontend loads at https://abhijatsarari.github.io/chronos/
- ✅ Can generate timelines with real AI
- ✅ Can save to Raindrop successfully
- ✅ PM2 shows backend running without errors
- ✅ GitHub Actions workflow succeeds

---

## 📞 Support

- **Vultr Docs**: https://www.vultr.com/docs/
- **Gemini API**: https://ai.google.dev/docs
- **Raindrop API**: https://developer.raindrop.io/
- **PM2 Guide**: https://pm2.keymetrics.io/docs/

---

**Server IP**: `________________` (write it down!)  
**Deployed on**: `________________` (date)  
**Backend URL**: `http://________________`  
**Frontend URL**: https://abhijatsarari.github.io/chronos/

---

## 🚀 Ready to Deploy?

1. **Start here**: Create Vultr server
2. **Then**: Run `./quick-deploy.sh YOUR_VULTR_IP`
3. **Or**: Follow `DEPLOYMENT_GUIDE.md` step-by-step
4. **Finally**: Use this checklist to verify everything works

**Good luck! 🎯**
