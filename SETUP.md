# 🚀 Nego Challenge - Setup Guide

Complete setup instructions for the Nego Challenge application with FastAPI backend and React frontend.

## 📋 Prerequisites

- **Python 3.8+** (for backend)
- **Node.js 16+** (for frontend)
- **OpenAI API Key** (for LLM negotiation)

## 🎯 Quick Start

### 1. Backend Setup

```bash
cd backend

# Windows
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt

# Linux/Mac
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### 2. Configure Environment

```bash
# In backend folder
cp .env.example .env
```

Edit `.env` and add your OpenAI API key:
```env
OPENAI_API_KEY=sk-your-key-here
```

### 3. Run Backend

```bash
# Windows
run.bat

# Linux/Mac
chmod +x run.sh
./run.sh

# Or manually
python main.py
```

Backend will start at: `http://localhost:8000`
API docs available at: `http://localhost:8000/docs`

### 4. Frontend Setup

In a **new terminal**:

```bash
# In project root
npm install

# Create frontend .env
cp .env.example .env
```

Verify `.env` contains:
```env
VITE_API_URL=http://localhost:8000
```

### 5. Run Frontend

```bash
npm run dev
```

Frontend will start at: `http://localhost:5173`

## 🎮 Using the Application

1. **Open** `http://localhost:5173` in your browser
2. **Click** "Start the Challenge!" to negotiate with the AI
3. **Try negotiating** - the AI uses real LLM to respond strategically
4. **Join the waitlist** by scrolling down and entering email/phone

## 🧪 Testing the API

Visit `http://localhost:8000/docs` for interactive API documentation (Swagger UI)

**Test endpoints:**
- `GET /api/waitlist/count` - Get total signups
- `GET /api/sessions/stats` - Get negotiation statistics
- `POST /api/chat` - Send a negotiation message
- `POST /api/waitlist` - Add someone to waitlist

## 🎯 Negotiation Strategies

The AI uses these tactics:

✅ **Volume Discounts** - "Buy 2, I give you discount"
✅ **Feature Highlighting** - Talks about quality when price is questioned
✅ **Progressive Pricing** - Won't drop price too easily
✅ **Minimum Price Protection** - Never goes below 380 GHS
✅ **Personality** - Uses Pidgin English like a Makola Market seller

## 📊 Database

SQLite database is created automatically: `backend/nego_challenge.db`

**Tables:**
- `waitlist` - Email/phone signups
- `chat_sessions` - Negotiation sessions
- `conversation_messages` - All chat messages

## 🔧 Troubleshooting

### Backend won't start
- Check Python version: `python --version` (needs 3.8+)
- Verify OpenAI API key in `.env`
- Check if port 8000 is available

### Frontend can't connect to backend
- Ensure backend is running on port 8000
- Check `.env` file has correct `VITE_API_URL`
- Look for CORS errors in browser console

### LLM responses are slow
- Normal! GPT-4o-mini takes 2-5 seconds
- For faster responses, switch to `gpt-3.5-turbo` in `backend/negotiation_engine.py` line 102

### Database errors
- Delete `backend/nego_challenge.db` and restart backend
- Tables will be recreated automatically

## 💰 OpenAI API Costs

Estimated costs per conversation:
- **GPT-4o-mini**: ~$0.01 per full negotiation (~10 messages)
- **GPT-3.5-turbo**: ~$0.002 per full negotiation

For testing, GPT-4o-mini is recommended (better quality, still cheap)

## 📱 Production Deployment

### Backend (Railway/Render/Heroku)
1. Use PostgreSQL instead of SQLite
2. Set environment variables in platform
3. Update CORS origins to your frontend URL

### Frontend (Vercel/Netlify)
1. Build: `npm run build`
2. Set `VITE_API_URL` to your backend URL
3. Deploy `dist` folder

## 🎨 Customization

### Change Product/Pricing
Edit `backend/main.py`:
```python
PRODUCT_CONFIG = {
    "name": "Your Product",
    "starting_price": 500,
    "minimum_price": 400,
    "cost_price": 350,
    "features": [...]
}
```

### Adjust AI Personality
Edit system prompt in `backend/negotiation_engine.py` line 59-90

## 📞 Support

For issues, check:
- Backend logs in terminal
- Browser console (F12)
- API docs at `/docs` endpoint

---

Built with ❤️ using FastAPI, React, and OpenAI




