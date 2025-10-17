# ⚡ Quick Start Checklist

Follow these steps to get your Nego Challenge running in **5 minutes**!

> **🆕 Latest Update:** Now uses professional English (no pidgin) and random minimum prices (350-400 GHS) per session! See `CHANGES_SUMMARY.md` for details.

## ✅ Prerequisites Checklist

- [ ] Python 3.8+ installed (`python --version`)
- [ ] Node.js 16+ installed (`node --version`)
- [ ] OpenAI API key (get one at https://platform.openai.com/api-keys)

## 🚀 Setup Steps

### 1. Backend Setup (2 minutes)

```bash
# Navigate to backend
cd backend

# Install Python packages
pip install -r requirements.txt
```

**If updating from previous version:**
```bash
# Option 1: Fresh start (recommended)
rm nego_challenge.db  # Linux/Mac
del nego_challenge.db  # Windows

# Option 2: Migrate existing data
python migrate_db.py
```

**Create `.env` file in `backend/` folder:**
```env
OPENAI_API_KEY=sk-your-actual-openai-key-here
DATABASE_URL=sqlite:///./nego_challenge.db
CORS_ORIGINS=http://localhost:5173,http://localhost:3000
```

- [ ] Dependencies installed
- [ ] `.env` file created with OpenAI key

### 2. Start Backend (30 seconds)

```bash
# In backend/ folder
python main.py
```

You should see:
```
✅ Database initialized successfully
INFO:     Uvicorn running on http://0.0.0.0:8000
```

Test it: Open http://localhost:8000 in browser → Should see API info

- [ ] Backend running
- [ ] Can access http://localhost:8000

### 3. Frontend Setup (1 minute)

Open a **NEW terminal** (keep backend running!)

```bash
# In project root (not backend folder!)
npm install
```

Check `.env` file exists in project root with:
```env
VITE_API_URL=http://localhost:8000
```

- [ ] Node packages installed
- [ ] `.env` file present

### 4. Start Frontend (30 seconds)

```bash
# In project root
npm run dev
```

You should see:
```
VITE ready in XXX ms
➜  Local:   http://localhost:5173/
```

- [ ] Frontend running
- [ ] Can access http://localhost:5173

### 5. Test Everything (1 minute)

**Open http://localhost:5173**

1. [ ] See the Apple Watch displayed on hero
2. [ ] Click "Start the Challenge!"
3. [ ] Chat opens with AI greeting
4. [ ] Type: "Can you do 300?"
5. [ ] AI responds with personality (takes 3-5 seconds)
6. [ ] Try: "I'll pay 380"
7. [ ] Deal closes, see success message!
8. [ ] Scroll down to waitlist section
9. [ ] Enter email or phone number
10. [ ] Submit → See success toast

## 🎉 You're Done!

If all checkboxes are ticked, you're running the full system!

## ❌ Troubleshooting

### Backend won't start

**Error: "No module named 'fastapi'"**
```bash
cd backend
pip install -r requirements.txt
```

**Error: "OpenAI API key not found"**
- Check `backend/.env` exists
- Verify key starts with `sk-`
- Restart backend

### Frontend can't connect

**Error: "Failed to fetch"**
1. Is backend running? Check terminal
2. Is it on port 8000? Visit http://localhost:8000
3. Check browser console (F12) for errors

**Still broken?**
```bash
# Stop both frontend and backend (Ctrl+C)
# Delete .env files and recreate them
# Restart backend first, then frontend
```

### AI responses are slow

This is **normal**! LLM takes 2-5 seconds to think.

Want faster? Edit `backend/negotiation_engine.py` line 102:
```python
model="gpt-3.5-turbo"  # Faster but less intelligent
```

### Port already in use

**Backend (8000 in use):**

Edit `backend/main.py` last line:
```python
uvicorn.run(app, host="0.0.0.0", port=8001)
```

Update `.env`:
```env
VITE_API_URL=http://localhost:8001
```

**Frontend (5173 in use):**
```bash
npm run dev -- --port 3000
```

## 📊 Verify It's Working

### Check Database
```bash
# In backend folder
ls -la nego_challenge.db  # Should exist after first API call
```

### Check API Documentation
Visit: http://localhost:8000/docs

Try the interactive API:
1. Click on `POST /api/chat`
2. Click "Try it out"
3. Enter test data:
```json
{
  "session_id": "test123",
  "user_message": "Hello!"
}
```
4. Click "Execute"
5. See AI response!

### Check Waitlist
```bash
# After submitting a test signup
curl http://localhost:8000/api/waitlist/count
```

Should return: `{"count": 1}`

## 🎯 Next Steps

Now that it's working:

1. **Customize the product** - Edit `backend/main.py` → `PRODUCT_CONFIG`
2. **Adjust AI personality** - Edit `backend/negotiation_engine.py` system prompt
3. **Change prices** - Modify starting/minimum prices
4. **Add features** - Extend the API endpoints
5. **Deploy** - See SETUP.md for deployment guides

## 📚 Documentation

- **README_API.md** - Complete system overview
- **BACKEND_FEATURES.md** - AI negotiation details
- **ARCHITECTURE.md** - System architecture
- **SETUP.md** - Detailed setup guide

## 🆘 Still Stuck?

1. Check all terminals for error messages
2. Verify Python and Node versions
3. Make sure OpenAI API key is valid
4. Try restarting everything
5. Check the documentation files above

---

**Total Time: ~5 minutes** ⏱️

Once working, you have:
✅ Real LLM-powered negotiation
✅ Database storing everything
✅ Beautiful UI showcasing your product
✅ Ready to customize and deploy!

Happy negotiating! 🎉

