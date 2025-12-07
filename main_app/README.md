# Chronos - Main Application (Full Version)

This is the **full production version** of Chronos with real AI integration.

## 🚀 Features

- **Real Gemini AI Integration**: Uses Google Gemini 2.5 Flash API
- **Backend Server**: Node.js/Express on Vultr for API proxying
- **Raindrop MCP**: Real Model Context Protocol integration
- **Full Functionality**: All features with live AI responses

## 🛠️ Setup

### 1. Install Dependencies
```bash
cd main_app
npm install
```

### 2. Configure Environment
Create `.env.local`:
```env
VITE_GEMINI_API_KEY=your_key_here
VITE_USE_BACKEND=true
```

### 3. Start Backend
```bash
cd backend
npm install
node server.js
```

Backend runs on `http://localhost:5000`

### 4. Start Frontend
```bash
npm run dev
```

Frontend runs on `http://localhost:3001`

## 🔧 Port Configuration

- **Frontend**: `3001`
- **Backend**: `5000`
- **Demo** (at root): `3000`

## 🌐 vs Demo Version

| Feature | Main App | Demo (root) |
|---------|----------|-------------|
| AI | ✅ Real | ❌ Mock |
| Backend | ✅ Required | ❌ No |
| API Keys | ✅ Required | ❌ No |

See `../README.md` for demo version at project root.
