# Chronos - Demo Version

<div align="center">

![Chronos Logo](./logo.png)

**⚡ The Multiverse Engine ⚡**

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-Visit_Now-blue?style=for-the-badge)](https://abhijatsarari.github.io/chronos)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-black?style=for-the-badge&logo=github)](https://github.com/ABHIJATSARARI/chronos)

</div>

---

## 🎭 About This Demo

This is a **standalone demo version** of Chronos that runs entirely in the browser using mock AI responses. It's designed for:
- Quick showcase on GitHub Pages
- Testing UI/UX without backend setup
- Hackathon demonstrations
- Portfolio presentations

## 🚀 Features

✨ **Full UI Experience**: Complete interface with animations and themes  
🎨 **Dual Themes**: Cyberpunk and Minimalist modes  
📊 **Interactive Timeline**: 3 divergent paths (Safe, Risk, Chaos)  
💾 **Mock Responses**: Pre-generated realistic timeline data  
🎬 **Splash Screen**: Professional video introduction  
🎯 **Interactive Tour**: Step-by-step guide for new users

## ⚠️ Limitations

- 🤖 **Mock AI**: Uses hardcoded responses, not real Gemini API
- 💾 **Simulated Saves**: Raindrop integration is mocked
- 🔑 **No Keys Required**: Works without any API setup

## 🛠️ Run Locally

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`

## 📦 Project Structure

```
chronos/
├── README.md           # This file (demo version)
├── App.tsx             # Demo app with mock API
├── services/
│   └── mockAPI.ts      # Mock AI responses
├── components/         # UI components
└── main_app/          # 👈 FULL VERSION with real AI
    ├── README.md       # Setup guide for real backend
    ├── App.tsx         # Real Gemini integration
    ├── services/
    │   ├── gemini.ts   # Real AI service
    │   ├── api.ts      # Backend API client
    │   └── raindrop.ts # Real MCP integration
    └── backend/        # Node.js server
```

## 🌟 Want Full AI Features?

For the **complete version** with real Gemini AI integration:

**📁 Go to `/main_app` folder**

Features in full version:
- ✅ Real Google Gemini 2.5 Flash API
- ✅ Backend server with API proxying
- ✅ True Raindrop.io MCP integration
- ✅ Custom timeline generation based on your input
- ✅ Vultr cloud deployment ready

**Setup instructions**: See [`main_app/README.md`](./main_app/README.md)

## 🌐 Live Demo

**GitHub Pages**: https://abhijatsarari.github.io/chronos/

Auto-deploys from this root folder via GitHub Actions.

## 🎯 Quick Links

| Resource | Link |
|----------|------|
| 🎭 Live Demo | https://abhijatsarari.github.io/chronos/ |
| 💻 Full App Setup | [main_app/README.md](./main_app/README.md) |
| 📹 Demo Video | https://youtu.be/nDYOoXwPEFc |
| 📄 Documentation | [HACKATHON_SUBMISSION.md](./HACKATHON_SUBMISSION.md) |

## 🔧 Technology Stack

**Frontend**: React 19, TypeScript, Vite, TailwindCSS  
**AI (Full Version)**: Google Gemini 2.5 Flash API  
**MCP (Full Version)**: Raindrop.io integration  
**Backend (Full Version)**: Node.js, Express, Vultr hosting  
**Deployment**: GitHub Pages (demo), GitHub Actions CI/CD

## 📝 Development

This demo version is perfect for:
- Portfolio showcases
- Quick demos without setup
- UI/UX testing
- GitHub Pages deployment

For development with real AI, use the `main_app` folder.

## 🏆 About Chronos

Chronos is an AI-powered decision intelligence platform that visualizes how your choices create diverging life paths. It combines:
- Multiverse simulation theory
- AI-powered future projection
- Interactive data visualization
- Episodic memory storage

Built for hackathons, optimized for impact.

---

<div align="center">

**Made with ⚡ by [@ABHIJATSARARI](https://github.com/ABHIJATSARARI)**

*For the full AI experience, visit `/main_app`*

</div>
