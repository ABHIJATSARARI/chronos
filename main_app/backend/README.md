# Chronos Backend API

Backend server for the Chronos Multiverse Engine, deployed on **Vultr Cloud Compute**.

## Features
- ✅ Gemini 2.5 Flash API integration for timeline generation
- ✅ Raindrop MCP Server integration for SmartMemory persistence
- ✅ Express.js REST API
- ✅ CORS enabled for frontend communication
- ✅ PM2 process management ready

## Setup

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Configure Environment
```bash
cp .env.example .env
```

Edit `.env` with your API keys:
```env
GEMINI_API_KEY=your_gemini_api_key
RAINDROP_API_KEY=your_raindrop_api_key
PORT=3001
```

### 3. Run Development Server
```bash
npm run dev
```

### 4. Deploy to Vultr

#### SSH into Vultr Instance
```bash
ssh root@your-vultr-ip
```

#### Install Node.js
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs
npm install -g pm2
```

#### Clone & Setup
```bash
git clone <your-repo>
cd chronos/backend
npm install
cp .env.example .env
nano .env  # Add your API keys
```

#### Start with PM2
```bash
npm run pm2:start
pm2 save
pm2 startup
```

#### View Logs
```bash
pm2 logs chronos-api
```

## API Endpoints

### Health Check
```
GET /api/health
```
Response:
```json
{
  "status": "healthy",
  "service": "chronos-backend",
  "platform": "vultr-compute"
}
```

### Generate Timeline
```
POST /api/simulation/generate
Content-Type: application/json

{
  "age": 25,
  "occupation": "Software Engineer",
  "regret": "Not learning piano",
  "decision": "Quit my job to become a musician"
}
```

### Save Timeline
```
POST /api/simulation/save
Content-Type: application/json

{
  "userId": "user-123",
  "simulationData": { ... }
}
```

## Architecture

```
Frontend (Vite) → Backend API (Vultr) → Gemini API
                                      → Raindrop MCP Server
```

## Tech Stack
- Node.js + Express
- Gemini 2.5 Flash API
- Raindrop MCP Server
- PM2 Process Manager
- Vultr Cloud Compute
