# Chronos Demo - Standalone Version

This is a **demo-only** version of Chronos that works without backend dependencies. It uses mock AI responses for demonstration purposes.

## 🎯 Purpose

This demo version is designed specifically for GitHub Pages deployment to showcase the UI/UX without requiring:
- Backend server
- Gemini API keys
- Raindrop MCP server

## ⚠️ Limitations

- **Mock AI Responses**: Uses pre-generated timeline data
- **No Real AI**: Gemini API is not called
- **Simulated Saves**: Raindrop integration is mocked
- **Demo Data Only**: All responses are hardcoded examples

## 🚀 For Full Functionality

Visit the main project with real AI integration:
- **Repository**: https://github.com/ABHIJATSARARI/chronos
- **Setup Guide**: See main README for API key setup

## 🛠️ Local Development

```bash
cd demo
npm install
npm run dev
```

## 📦 Build for Production

```bash
npm run build
```

The `dist/` folder can be deployed to any static hosting service.

## 🌐 Live Demo

This demo is automatically deployed via GitHub Actions to: https://abhijatsarari.github.io/chronos/

---

**Note**: This is a showcase version. For the full AI-powered experience with real Gemini integration, please visit the main project repository.
