# 🎯 Nego Challenge - Complete System

## 📦 What I Built For You

### Backend (FastAPI + LLM)
A complete FastAPI backend with intelligent AI negotiation powered by OpenAI's GPT-4o-mini.

**Files Created:**
```
backend/
├── main.py                    # Main API server with all endpoints
├── models.py                  # Database models (SQLAlchemy)
├── database.py                # Database configuration
├── negotiation_engine.py      # Smart LLM negotiation logic
├── requirements.txt           # Python dependencies
├── .env.example              # Environment configuration template
├── .gitignore                # Git ignore rules
├── run.sh                    # Linux/Mac startup script
└── run.bat                   # Windows startup script
```

**Features:**
✅ Real-time LLM negotiation with personality
✅ Strategic pricing (won't go below minimum)
✅ Volume discount detection
✅ Conversation storage in SQLite
✅ Waitlist management (email + phone)
✅ Analytics & statistics
✅ CORS enabled for frontend
✅ Full API documentation at `/docs`

### Frontend Integration
Updated your React app to connect to the backend.

**Files Updated:**
```
src/
├── services/api.ts           # API service layer (NEW)
├── components/
│   ├── ChatBot.tsx           # Now uses real LLM API
│   └── WaitlistForm.tsx      # Now saves to database
├── pages/Index.tsx           # Enhanced with watch image & messaging
└── assets/apple_watch.png    # Product image
```

**New Features:**
✅ Apple Watch product showcase on hero
✅ Real-time AI negotiation in chat
✅ Loading states & error handling
✅ Deal closing detection
✅ Strategic messaging after deal closes
✅ Email/Phone waitlist signup tabs

## 🚀 Quick Start

### Step 1: Setup Backend

```bash
# Navigate to backend folder
cd backend

# Install Python dependencies
pip install -r requirements.txt

# Create your .env file
copy .env.example .env  # Windows
# OR
cp .env.example .env    # Mac/Linux
```

**Edit `backend/.env` and add your OpenAI API key:**
```env
OPENAI_API_KEY=sk-your-actual-key-here
DATABASE_URL=sqlite:///./nego_challenge.db
CORS_ORIGINS=http://localhost:5173,http://localhost:3000
```

### Step 2: Run Backend

```bash
# Windows
run.bat

# Mac/Linux
chmod +x run.sh
./run.sh

# Or manually
python main.py
```

Backend starts at: **http://localhost:8000**
API docs at: **http://localhost:8000/docs**

### Step 3: Run Frontend

In a **new terminal** (keep backend running):

```bash
# In project root
npm install
npm run dev
```

Frontend starts at: **http://localhost:5173**

## 🎮 Test It Out!

1. Open http://localhost:5173
2. Click "Start the Challenge!"
3. Try negotiating: "Can you do 300?"
4. Watch the AI respond with personality!
5. Try different tactics:
   - "Too expensive!"
   - "I'll buy 2 at 350 each"
   - "Final offer: 380"
6. Join the waitlist when done

## 🤖 How The AI Works

### Negotiation Strategies

**1. Won't Drop Price Easily**
```
You: "200 GHS"
AI: "Ah! 200? You wan kill my business! I buy am for 380 already!"
```

**2. Highlights Features**
```
You: "Too expensive"
AI: "Expensive ke? This na original Apple Watch with full warranty o!"
```

**3. Volume Discounts**
```
You: "I want 3 watches"
AI: "3 pieces? Okay, for bulk I fit reduce small. Make I do 400 each."
```

**4. Progressive Flexibility**
- Messages 1-2: Very firm on price
- Messages 3-5: Starts showing flexibility
- Messages 6+: More willing to close deal

**5. Never Goes Below Minimum**
- Minimum: 380 GHS
- Will reject anything lower
- Protects profit margin

### Smart Price Detection

The AI automatically finds prices in your messages:
- "Can you do 300?" → Detects 300 GHS
- "How about GHS 350?" → Detects 350 GHS
- "I'll pay three hundred fifty" → Works too!

## 📊 API Endpoints

Visit **http://localhost:8000/docs** for interactive testing!

### Chat Endpoint
```http
POST /api/chat
Content-Type: application/json

{
  "session_id": "unique-session-id",
  "user_message": "Can you do 350?"
}
```

Response:
```json
{
  "ai_message": "Hmmm, 350? You sabi negotiate...",
  "deal_closed": false,
  "final_price": null,
  "discount_percentage": null
}
```

### Waitlist Endpoint
```http
POST /api/waitlist
Content-Type: application/json

{
  "contact_type": "email",
  "contact_value": "seller@example.com",
  "source": "website"
}
```

### Analytics
```http
GET /api/sessions/stats
GET /api/waitlist/count
```

## 🎨 Customization

### Change Product Details

Edit `backend/main.py`:

```python
PRODUCT_CONFIG = {
    "name": "Your Product Name",
    "starting_price": 500,      # Starting price
    "minimum_price": 400,       # Won't go below this
    "cost_price": 350,          # AI knows this
    "features": [
        "Feature 1",
        "Feature 2",
        ...
    ]
}
```

### Adjust AI Personality

Edit `backend/negotiation_engine.py` (line 59-90) to change:
- Tone and language style
- Negotiation aggression
- When to accept offers
- Sales tactics used

### Change LLM Model

In `backend/negotiation_engine.py` (line 102):

```python
# Faster & cheaper
model="gpt-3.5-turbo"  

# Current (best balance)
model="gpt-4o-mini"

# Best quality (more expensive)
model="gpt-4o"
```

## 💰 Costs

**Estimated per conversation (10 messages):**
- GPT-4o-mini: ~$0.01
- GPT-3.5-turbo: ~$0.002
- GPT-4o: ~$0.10

For testing/demo, GPT-4o-mini is perfect! 👌

## 📁 Database

SQLite database created automatically: `backend/nego_challenge.db`

**View your data:**
```bash
# Install SQLite browser or use command line
sqlite3 backend/nego_challenge.db

# View tables
.tables

# See waitlist
SELECT * FROM waitlist;

# See conversations
SELECT * FROM conversation_messages;
```

## 🔧 Troubleshooting

### "Module not found" error
```bash
cd backend
pip install -r requirements.txt
```

### "OpenAI API key not found"
- Check `backend/.env` file exists
- Verify OPENAI_API_KEY is set
- Restart backend after adding key

### Frontend can't connect
- Ensure backend is running (http://localhost:8000)
- Check `.env` in project root has `VITE_API_URL=http://localhost:8000`
- Restart frontend with `npm run dev`

### Port already in use
```bash
# Change backend port in backend/main.py (last line):
uvicorn.run(app, host="0.0.0.0", port=8001)  # Changed to 8001

# Update frontend .env:
VITE_API_URL=http://localhost:8001
```

## 🎯 Next Steps

1. **Get OpenAI API Key**: https://platform.openai.com/api-keys
2. **Test Locally**: Follow Quick Start above
3. **Customize**: Change product, prices, personality
4. **Deploy Backend**: Use Railway, Render, or Heroku
5. **Deploy Frontend**: Use Vercel or Netlify

## 📚 Documentation

- **SETUP.md** - Detailed setup instructions
- **BACKEND_FEATURES.md** - Deep dive into AI features
- **backend/README.md** - Backend-specific docs
- **http://localhost:8000/docs** - Live API documentation

---

## 🎊 You Now Have:

✅ **Smart AI negotiation** that won't get ripped off
✅ **Real-time chat** with personality and strategy
✅ **Database storage** for all conversations and waitlist
✅ **Beautiful UI** showcasing the Apple Watch challenge
✅ **Analytics** to track performance
✅ **Production-ready code** with error handling
✅ **Full documentation** to customize everything

**The challenge effectively demonstrates your product's value to potential sellers!** 🚀

Need help? Check the docs or test the API at `/docs`!




