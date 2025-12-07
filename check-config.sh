#!/bin/bash

echo "🔍 Checking Configuration..."
echo ""

echo "📁 Frontend .env.local:"
echo "VITE_GEMINI_API_KEY=$(grep VITE_GEMINI_API_KEY main_app/.env.local | cut -d'=' -f2)"
echo "VITE_USE_BACKEND=$(grep VITE_USE_BACKEND main_app/.env.local | cut -d'=' -f2)"
echo "VITE_BACKEND_URL=$(grep VITE_BACKEND_URL main_app/.env.local | cut -d'=' -f2)"
echo ""

echo "📁 Backend .env:"
BACKEND_KEY=$(grep "^GEMINI_API_KEY=" main_app/backend/.env | cut -d'=' -f2)
if [ -z "$BACKEND_KEY" ]; then
    echo "❌ GEMINI_API_KEY is EMPTY in backend!"
else
    echo "✅ GEMINI_API_KEY is SET in backend (${BACKEND_KEY:0:10}...)"
fi
echo "PORT=$(grep PORT main_app/backend/.env | cut -d'=' -f2)"
echo ""

echo "🌐 Testing Backend Connection..."
if curl -s http://localhost:5001/api/health > /dev/null 2>&1; then
    echo "✅ Backend is running on port 5001"
else
    echo "❌ Backend is NOT running on port 5001"
fi
echo ""

echo "📝 Configuration Summary:"
if [ -z "$BACKEND_KEY" ]; then
    echo "❌ Backend API key is missing - AI won't work!"
else
    echo "✅ Backend has API key - Ready to generate timelines"
fi

FRONTEND_KEY=$(grep VITE_GEMINI_API_KEY main_app/.env.local | cut -d'=' -f2)
if [ -z "$FRONTEND_KEY" ]; then
    echo "✅ Frontend has no API key - Will use backend (correct)"
else
    echo "⚠️  Frontend has API key - Might bypass backend!"
fi
