# 🚀 Full Production Deployment Guide

Complete guide to deploy Chronos with backend on Vultr Cloud Compute.

---

## 📋 Prerequisites

Before you start, make sure you have:
- ✅ Vultr account with credits
- ✅ Gemini API key from Google AI Studio
- ✅ Raindrop.io account with API access
- ✅ GitHub account (already set up)

---

## Part 1: Deploy Backend to Vultr 🖥️

### Step 1: Create Vultr Cloud Compute Instance

1. Go to: https://my.vultr.com/deploy/
2. Choose **Cloud Compute - Shared CPU**
3. Select server location (closest to you):
   - US: New York, Los Angeles, or Seattle
   - Europe: London, Paris, or Amsterdam
   - Asia: Singapore, Tokyo, or Mumbai
4. Select **Ubuntu 24.04 LTS x64**
5. Choose plan: **$6/month (1 CPU, 1GB RAM)** is sufficient
6. Add SSH key (optional but recommended)
7. Set server hostname: `chronos-backend`
8. Click **Deploy Now**
9. Wait 2-3 minutes for server to be ready
10. **Copy the IP address** (e.g., `123.456.789.012`)

### Step 2: Connect to Your Vultr Server

Open Terminal and SSH into your server:

```bash
ssh root@YOUR_SERVER_IP
# Replace YOUR_SERVER_IP with the IP from Step 1
# Enter password when prompted (sent to your email)
```

### Step 3: Install Node.js and Dependencies

Run these commands on your Vultr server:

```bash
# Update system
apt update && apt upgrade -y

# Install Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs

# Install PM2 (process manager)
npm install -g pm2

# Install git
apt install -y git

# Verify installations
node --version  # Should show v20.x.x
npm --version   # Should show 10.x.x
pm2 --version   # Should show 5.x.x
```

### Step 4: Deploy Backend Code

```bash
# Create app directory
mkdir -p /var/www/chronos
cd /var/www/chronos

# Clone your repository
git clone https://github.com/ABHIJATSARARI/chronos.git .

# Navigate to backend
cd backend

# Install dependencies
npm install --production

# Create logs directory
mkdir -p logs
```

### Step 5: Configure Environment Variables

```bash
# Create .env file
nano .env
```

Add this content (replace with your actual keys):

```env
# Gemini API Key from Google AI Studio
GEMINI_API_KEY=your_actual_gemini_api_key_here

# Raindrop API Key
RAINDROP_API_KEY=your_actual_raindrop_api_key_here

# Server Configuration
PORT=3001
NODE_ENV=production

# CORS Origins (will add GitHub Pages URL later)
ALLOWED_ORIGINS=https://abhijatsarari.github.io
```

**Save and exit:** Press `Ctrl+X`, then `Y`, then `Enter`

### Step 6: Start Backend with PM2

```bash
# Start the server
pm2 start ecosystem.config.js

# Save PM2 configuration
pm2 save

# Set PM2 to start on server reboot
pm2 startup

# Check status
pm2 status

# View logs
pm2 logs chronos-backend
```

You should see:
```
╔════════════════════════════════════════════════════════════╗
║           CHRONOS BACKEND - VULTR COMPUTE                 ║
╠════════════════════════════════════════════════════════════╣
║  Server running on: http://localhost:3001                 ║
║  Environment: production                                  ║
║  Raindrop MCP: Ready                                      ║
║  Gemini API: Connected                                    ║
╚════════════════════════════════════════════════════════════╝
```

### Step 7: Configure Firewall

```bash
# Allow SSH (port 22)
ufw allow 22/tcp

# Allow HTTP (port 80)
ufw allow 80/tcp

# Allow HTTPS (port 443)
ufw allow 443/tcp

# Allow backend port (3001)
ufw allow 3001/tcp

# Enable firewall
ufw --force enable

# Check status
ufw status
```

### Step 8: Install and Configure Nginx (Reverse Proxy)

```bash
# Install Nginx
apt install -y nginx

# Create Nginx configuration
nano /etc/nginx/sites-available/chronos
```

Paste this configuration:

```nginx
server {
    listen 80;
    server_name YOUR_SERVER_IP;

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

**Replace `YOUR_SERVER_IP` with your actual Vultr IP**

Save and exit (`Ctrl+X`, `Y`, `Enter`), then:

```bash
# Enable the site
ln -s /etc/nginx/sites-available/chronos /etc/nginx/sites-enabled/

# Remove default site
rm /etc/nginx/sites-enabled/default

# Test configuration
nginx -t

# Restart Nginx
systemctl restart nginx

# Enable Nginx on boot
systemctl enable nginx
```

### Step 9: Test Backend API

From your local machine, test if backend is working:

```bash
curl http://YOUR_SERVER_IP/api/health
```

Should return:
```json
{
  "status": "ok",
  "timestamp": "2025-12-07T...",
  "services": {
    "gemini": "connected",
    "raindrop": "ready"
  }
}
```

---

## Part 2: Update Frontend to Use Production Backend 🌐

### Step 1: Update Backend URL in Frontend

On your local machine, edit `.env.local`:

```bash
cd /Users/abhijat/Downloads/chronos
nano .env.local
```

Update to:

```env
VITE_GEMINI_API_KEY=dummy_key_not_used_in_production
VITE_BACKEND_URL=http://YOUR_SERVER_IP
```

**Replace `YOUR_SERVER_IP` with your Vultr server IP**

### Step 2: Update CORS in Backend

SSH back to your Vultr server:

```bash
ssh root@YOUR_SERVER_IP
cd /var/www/chronos/backend
nano server.js
```

Find the CORS section and update it:

```javascript
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:3000',
    'https://abhijatsarari.github.io'  // Add your GitHub Pages URL
  ],
  credentials: true
}));
```

Save and restart:

```bash
pm2 restart chronos-backend
```

### Step 3: Update Frontend Service to Use Backend

On your local machine:

```bash
cd /Users/abhijat/Downloads/chronos
```

The `services/api.ts` should already be configured to use backend. Verify:

```typescript
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001';
```

---

## Part 3: Deploy Frontend to GitHub Pages 📄

### Step 1: Update GitHub Actions Workflow

Edit `.github/workflows/deploy.yml` to use production backend:

```yaml
- name: Create production environment file
  run: |
    echo "VITE_BACKEND_URL=http://YOUR_SERVER_IP" > .env.local
    echo "VITE_USE_BACKEND=true" >> .env.local
```

**Replace `YOUR_SERVER_IP` with your Vultr server IP**

### Step 2: Commit and Push

```bash
git add .
git commit -m "Configure production backend for deployment"
git push origin main
```

### Step 3: Wait for Deployment

1. Go to: https://github.com/ABHIJATSARARI/chronos/actions
2. Wait for "Deploy to GitHub Pages" workflow to complete (2-3 minutes)
3. Check: https://abhijatsarari.github.io/chronos/

---

## Part 4: Setup Raindrop MCP Integration 💧

### Step 1: Get Raindrop API Token

1. Go to: https://app.raindrop.io/settings/integrations
2. Click **"Create new app"**
3. Name: `Chronos MCP`
4. Click **"Create"**
5. Copy the **Test token**

### Step 2: Update Backend .env

SSH to Vultr server:

```bash
ssh root@YOUR_SERVER_IP
cd /var/www/chronos/backend
nano .env
```

Update:

```env
RAINDROP_API_KEY=your_actual_raindrop_test_token
```

Save and restart:

```bash
pm2 restart chronos-backend
```

---

## 🎉 Verification Checklist

Test everything works:

### ✅ Backend Health Check
```bash
curl http://YOUR_SERVER_IP/api/health
```

### ✅ Frontend Access
Visit: https://abhijatsarari.github.io/chronos/

### ✅ Full Flow Test
1. Open your deployed app
2. Enter a decision
3. Click "Generate Timeline"
4. Should see 3 timelines generated by real Gemini AI
5. Click "Save to Raindrop"
6. Check your Raindrop.io account for saved bookmark

---

## 📊 Monitoring & Maintenance

### View Backend Logs
```bash
ssh root@YOUR_SERVER_IP
pm2 logs chronos-backend
```

### Restart Backend
```bash
pm2 restart chronos-backend
```

### Update Backend Code
```bash
cd /var/www/chronos
git pull origin main
cd backend
npm install
pm2 restart chronos-backend
```

### Check Server Resources
```bash
pm2 monit
```

---

## 🔒 Security Best Practices

### 1. Change Root Password
```bash
passwd
```

### 2. Create Non-Root User
```bash
adduser chronos
usermod -aG sudo chronos
```

### 3. Setup SSL (Optional but Recommended)

If you have a domain:

```bash
# Install Certbot
apt install -y certbot python3-certbot-nginx

# Get SSL certificate
certbot --nginx -d yourdomain.com
```

---

## 💰 Cost Breakdown

- **Vultr Cloud Compute**: $6/month (1GB RAM)
- **GitHub Pages**: Free
- **Gemini API**: Pay-as-you-go (~$0.002/request)
- **Raindrop.io**: Free tier (up to 1000 bookmarks)

**Total Monthly Cost: ~$6-10**

---

## 🆘 Troubleshooting

### Backend Not Starting
```bash
pm2 logs chronos-backend --lines 50
```

### Frontend Can't Connect to Backend
- Check firewall: `ufw status`
- Check Nginx: `systemctl status nginx`
- Verify CORS settings in `server.js`

### Gemini API Errors
- Verify API key in `.env`
- Check quota: https://aistudio.google.com/

### Raindrop Not Saving
- Verify API token: https://app.raindrop.io/settings/integrations
- Check MCP server logs

---

## 📞 Support Resources

- **Vultr Docs**: https://www.vultr.com/docs/
- **Gemini API**: https://ai.google.dev/docs
- **Raindrop API**: https://developer.raindrop.io/
- **PM2 Docs**: https://pm2.keymetrics.io/docs/

---

## 🎯 Quick Commands Reference

```bash
# SSH to server
ssh root@YOUR_SERVER_IP

# View logs
pm2 logs chronos-backend

# Restart backend
pm2 restart chronos-backend

# Update code
cd /var/www/chronos && git pull && cd backend && npm install && pm2 restart chronos-backend

# Check status
pm2 status

# Server resources
htop

# Disk usage
df -h
```

---

**🚀 You're ready to deploy! Follow the steps in order and you'll have a fully functional production deployment.**

**Need help? Check the troubleshooting section or review the logs.**
