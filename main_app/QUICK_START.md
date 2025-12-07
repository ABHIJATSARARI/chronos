# Quick Start Guide - Main App

## 🚀 Start the Full App (3 Simple Steps)

### Step 1: Start Backend Server
```bash
cd main_app/backend
node server.js
```

✅ You should see: `Backend server running on port 5001`

### Step 2: Start Frontend (New Terminal)
```bash
cd main_app
npm run dev
```

✅ You should see: `Local: http://localhost:3001/`

### Step 3: Open Browser
Visit: `http://localhost:3001`

---

## ✅ Verification Checklist

- [ ] Backend running on port 5001
- [ ] Frontend running on port 3001
- [ ] Title "CHRONOS" is visible (gradient text)
- [ ] No demo banner at top
- [ ] Can enter decision and generate timelines

## 🐛 Troubleshooting

**Port already in use:**
```bash
# Kill process on port 5001
lsof -ti:5001 | xargs kill -9

# Kill process on port 3001
lsof -ti:3001 | xargs kill -9
```

**Backend not connecting:**
- Check `.env.local` has `VITE_BACKEND_URL=http://localhost:5001`
- Verify backend server is running
- Check backend console for errors

**Title not visible:**
- Refresh page (Cmd+R)
- Clear browser cache
- Check console for CSS errors

---

## 📝 Port Summary

| Service | Port | URL |
|---------|------|-----|
| Frontend | 3001 | http://localhost:3001 |
| Backend | 5001 | http://localhost:5001 |
| Demo | 3000 | http://localhost:3000 |
