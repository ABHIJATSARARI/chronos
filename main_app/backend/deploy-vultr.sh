#!/bin/bash

# Chronos Backend Deployment Script for Vultr
# Run this script on your Vultr Cloud Compute instance

echo "╔════════════════════════════════════════════════════════════╗"
echo "║       CHRONOS BACKEND DEPLOYMENT - VULTR COMPUTE           ║"
echo "╚════════════════════════════════════════════════════════════╝"

# Update system
echo "📦 Updating system packages..."
apt-get update
apt-get upgrade -y

# Install Node.js 20.x
echo "📦 Installing Node.js..."
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs

# Install PM2 globally
echo "📦 Installing PM2 process manager..."
npm install -g pm2

# Create app directory
echo "📁 Setting up application directory..."
mkdir -p /var/www/chronos
cd /var/www/chronos

# Clone repository (update with your repo URL)
echo "📥 Cloning repository..."
# git clone YOUR_REPO_URL .
# OR upload files manually

# Install dependencies
echo "📦 Installing dependencies..."
cd backend
npm install --production

# Create logs directory
mkdir -p logs

# Setup environment variables
echo "🔧 Configuring environment..."
if [ ! -f .env ]; then
    cp .env.example .env
    echo "⚠️  IMPORTANT: Edit .env file with your API keys!"
    echo "   nano .env"
fi

# Start with PM2
echo "🚀 Starting application with PM2..."
pm2 start ecosystem.config.js

# Save PM2 process list
pm2 save

# Setup PM2 startup script
pm2 startup systemd -u root --hp /root

# Configure firewall
echo "🔒 Configuring firewall..."
ufw allow 22/tcp
ufw allow 3001/tcp
ufw --force enable

# Install and configure Nginx (optional reverse proxy)
echo "📦 Installing Nginx..."
apt-get install -y nginx

# Create Nginx config
cat > /etc/nginx/sites-available/chronos << 'EOF'
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
EOF

# Enable Nginx config
ln -sf /etc/nginx/sites-available/chronos /etc/nginx/sites-enabled/
nginx -t && systemctl restart nginx

echo ""
echo "✅ Deployment Complete!"
echo ""
echo "Next steps:"
echo "1. Edit .env file: nano /var/www/chronos/backend/.env"
echo "2. Add your GEMINI_API_KEY and RAINDROP_API_KEY"
echo "3. Restart the service: pm2 restart chronos-api"
echo ""
echo "Useful commands:"
echo "  pm2 logs chronos-api    - View logs"
echo "  pm2 status              - Check status"
echo "  pm2 restart chronos-api - Restart app"
echo "  pm2 stop chronos-api    - Stop app"
echo ""
echo "Your backend is running on: http://YOUR_SERVER_IP:3001"
