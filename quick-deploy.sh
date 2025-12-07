#!/bin/bash

# Quick Deployment Helper Script
# This script helps you deploy Chronos backend to Vultr

echo "╔════════════════════════════════════════════════════════════╗"
echo "║          CHRONOS DEPLOYMENT HELPER                        ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# Check if user provided Vultr IP
if [ -z "$1" ]; then
    echo "Usage: ./quick-deploy.sh YOUR_VULTR_IP"
    echo ""
    echo "Example: ./quick-deploy.sh 123.456.789.012"
    echo ""
    echo "Don't have a Vultr server yet?"
    echo "1. Go to: https://my.vultr.com/deploy/"
    echo "2. Create Ubuntu 24.04 server (\$6/month plan)"
    echo "3. Copy the IP address"
    echo "4. Run this script again with the IP"
    exit 1
fi

VULTR_IP=$1

echo "🎯 Target Server: $VULTR_IP"
echo ""
echo "This script will:"
echo "  1. Connect to your Vultr server"
echo "  2. Install Node.js, PM2, Nginx"
echo "  3. Deploy Chronos backend"
echo "  4. Configure firewall and reverse proxy"
echo ""
read -p "Continue? (y/n) " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Deployment cancelled."
    exit 1
fi

echo ""
echo "📝 You'll need:"
echo "  - Root password (sent to your email from Vultr)"
echo "  - Gemini API key (from https://aistudio.google.com/)"
echo "  - Raindrop API token (from https://app.raindrop.io/settings/integrations)"
echo ""
read -p "Press Enter when ready..."

echo ""
echo "🚀 Starting deployment..."
echo ""

# Create deployment script
cat > /tmp/chronos-deploy.sh << 'DEPLOY_SCRIPT'
#!/bin/bash

# Update system
echo "📦 Updating system..."
apt update && apt upgrade -y

# Install Node.js 20
echo "📦 Installing Node.js..."
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs git nginx

# Install PM2
echo "📦 Installing PM2..."
npm install -g pm2

# Create app directory
echo "📁 Creating app directory..."
mkdir -p /var/www/chronos
cd /var/www/chronos

# Clone repository
echo "📥 Cloning repository..."
git clone https://github.com/ABHIJATSARARI/chronos.git .

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd backend
npm install --production

# Configure firewall
echo "🔒 Configuring firewall..."
ufw allow 22/tcp
ufw allow 80/tcp
ufw allow 443/tcp
ufw allow 3001/tcp
ufw --force enable

echo ""
echo "✅ Base installation complete!"
echo ""
echo "Next steps:"
echo "1. Configure environment variables:"
echo "   cd /var/www/chronos/backend"
echo "   nano .env"
echo ""
echo "2. Add your API keys:"
echo "   GEMINI_API_KEY=your_key"
echo "   RAINDROP_API_KEY=your_key"
echo "   PORT=3001"
echo "   NODE_ENV=production"
echo ""
echo "3. Start the server:"
echo "   pm2 start ecosystem.config.js"
echo "   pm2 save"
echo "   pm2 startup"
echo ""
DEPLOY_SCRIPT

# Copy script to server and execute
echo "📤 Uploading deployment script..."
scp /tmp/chronos-deploy.sh root@$VULTR_IP:/tmp/

echo ""
echo "🔐 Connecting to server..."
echo ""

ssh root@$VULTR_IP "bash /tmp/chronos-deploy.sh"

if [ $? -eq 0 ]; then
    echo ""
    echo "╔════════════════════════════════════════════════════════════╗"
    echo "║                 DEPLOYMENT SUCCESSFUL! 🎉                 ║"
    echo "╚════════════════════════════════════════════════════════════╝"
    echo ""
    echo "📋 Next Steps:"
    echo ""
    echo "1. Configure your API keys:"
    echo "   ssh root@$VULTR_IP"
    echo "   cd /var/www/chronos/backend"
    echo "   nano .env"
    echo ""
    echo "2. Add these values:"
    echo "   GEMINI_API_KEY=your_gemini_key_here"
    echo "   RAINDROP_API_KEY=your_raindrop_token_here"
    echo "   PORT=3001"
    echo "   NODE_ENV=production"
    echo "   ALLOWED_ORIGINS=https://abhijatsarari.github.io"
    echo ""
    echo "3. Start the backend:"
    echo "   pm2 start ecosystem.config.js"
    echo "   pm2 save"
    echo "   pm2 startup"
    echo ""
    echo "4. Test the backend:"
    echo "   curl http://$VULTR_IP/api/health"
    echo ""
    echo "5. Update frontend:"
    echo "   Edit .env.local in your project:"
    echo "   VITE_BACKEND_URL=http://$VULTR_IP"
    echo ""
    echo "6. Deploy frontend to GitHub Pages:"
    echo "   Go to: https://github.com/ABHIJATSARARI/chronos/actions"
    echo "   Run 'Deploy Production to GitHub Pages' workflow"
    echo "   Input backend URL: http://$VULTR_IP"
    echo ""
    echo "📖 Full guide: DEPLOYMENT_GUIDE.md"
    echo ""
else
    echo ""
    echo "❌ Deployment failed. Check the errors above."
    echo "   Try running manually: ssh root@$VULTR_IP"
    echo ""
fi

# Cleanup
rm /tmp/chronos-deploy.sh
