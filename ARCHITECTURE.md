# 🏗️ System Architecture

## Overview

```
┌─────────────────────────────────────────────────────────────┐
│                      USER'S BROWSER                          │
│                  http://localhost:5173                       │
└────────────────────┬────────────────────────────────────────┘
                     │
                     │ HTTP/REST API
                     │
┌────────────────────▼────────────────────────────────────────┐
│                   REACT FRONTEND                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Index.tsx  │  │  ChatBot.tsx │  │WaitlistForm  │      │
│  │              │  │              │  │     .tsx     │      │
│  │ - Hero       │  │ - Chat UI    │  │ - Email Form │      │
│  │ - Watch Show │  │ - Messages   │  │ - Phone Form │      │
│  │ - CTA        │  │ - Input      │  │ - Submit     │      │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘      │
│         │                 │                  │               │
│         └─────────────────┼──────────────────┘               │
│                           │                                  │
│                    ┌──────▼────────┐                        │
│                    │  api.ts       │                        │
│                    │  Service      │                        │
│                    └──────┬────────┘                        │
└───────────────────────────┼─────────────────────────────────┘
                            │
                    API Calls (fetch)
                            │
┌───────────────────────────▼─────────────────────────────────┐
│              FASTAPI BACKEND (Python)                        │
│                http://localhost:8000                         │
│                                                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │                   main.py                           │    │
│  │  ┌─────────────────────────────────────────┐       │    │
│  │  │  POST /api/chat                         │       │    │
│  │  │  POST /api/waitlist                     │       │    │
│  │  │  GET  /api/sessions/{id}                │       │    │
│  │  │  GET  /api/sessions/stats               │       │    │
│  │  │  GET  /api/waitlist/count               │       │    │
│  │  └────────────┬────────────────────────────┘       │    │
│  └───────────────┼──────────────────────────────────── │    │
│                  │                                      │    │
│         ┌────────▼──────────┐                          │    │
│         │ negotiation_      │                          │    │
│         │   engine.py       │                          │    │
│         │                   │                          │    │
│         │ - Extract Price   │                          │    │
│         │ - Detect Quantity │                          │    │
│         │ - Strategy Logic  │                          │    │
│         │ - LLM Integration │                          │    │
│         └────────┬──────────┘                          │    │
│                  │                                      │    │
│         ┌────────▼──────────┐                          │    │
│         │   OpenAI API      │                          │    │
│         │   GPT-4o-mini     │                          │    │
│         │                   │                          │    │
│         │ - System Prompt   │                          │    │
│         │ - Conversation    │                          │    │
│         │ - AI Response     │                          │    │
│         └────────┬──────────┘                          │    │
│                  │                                      │    │
│         ┌────────▼──────────┐                          │    │
│         │   database.py     │                          │    │
│         │   models.py       │                          │    │
│         │                   │                          │    │
│         │ SQLAlchemy ORM    │                          │    │
│         └────────┬──────────┘                          │    │
└──────────────────┼─────────────────────────────────────┘    │
                   │                                           │
┌──────────────────▼──────────────────────────────────────────┐
│                SQLite Database                               │
│             nego_challenge.db                                │
│                                                              │
│  ┌──────────────────┐  ┌──────────────────┐  ┌───────────┐ │
│  │   waitlist       │  │  chat_sessions   │  │conversation│ │
│  │                  │  │                  │  │ _messages  │ │
│  │ - id             │  │ - id             │  │ - id       │ │
│  │ - contact_type   │  │ - session_id     │  │ - session_id│ │
│  │ - contact_value  │  │ - product_name   │  │ - role     │ │
│  │ - source         │  │ - starting_price │  │ - content  │ │
│  │ - created_at     │  │ - current_price  │  │ - timestamp│ │
│  │                  │  │ - final_price    │  │            │ │
│  │                  │  │ - deal_closed    │  │            │ │
│  │                  │  │ - created_at     │  │            │ │
│  │                  │  │ - ended_at       │  │            │ │
│  └──────────────────┘  └──────────────────┘  └───────────┘ │
└──────────────────────────────────────────────────────────────┘
```

## Data Flow

### 1️⃣ User Starts Negotiation

```
User clicks "Start Challenge"
    ↓
Frontend generates session_id
    ↓
ChatBot opens with initial message
    ↓
User types: "Can you do 300?"
    ↓
apiService.sendChatMessage(sessionId, message)
```

### 2️⃣ Backend Processing

```
POST /api/chat receives message
    ↓
Check/create ChatSession in database
    ↓
Store user message in conversation_messages
    ↓
Get conversation history from DB
    ↓
Pass to NegotiationEngine.negotiate()
```

### 3️⃣ LLM Negotiation

```
NegotiationEngine analyzes message
    ↓
Extract price offer: 300 GHS
    ↓
Check conversation stage: message #1 (early)
    ↓
Build system prompt with:
  - Product details (450 GHS, minimum 380 GHS)
  - Current negotiation state
  - Strategic instructions
  - Personality guidelines
    ↓
Send to OpenAI GPT-4o-mini
    ↓
Receive AI response with personality
    ↓
Determine if deal should close
  - 300 < 380 minimum → No deal
  - Counter with strategic price
    ↓
Update session.current_price
    ↓
Store AI message in database
```

### 4️⃣ Response to User

```
Return ChatResponse:
  - ai_message: "Ah! 300 GHS? You wan kill me..."
  - deal_closed: false
  - final_price: null
    ↓
Frontend displays AI message
    ↓
User sees response in chat
```

### 5️⃣ Deal Closes (Eventually)

```
User offers: 390 GHS (after 6 messages)
    ↓
NegotiationEngine:
  - 390 >= 380 minimum ✅
  - Message count = 6 (late stage) ✅
  - should_accept_price() returns true
    ↓
AI responds: "Okay you win! 390 GHS, deal!"
    ↓
Update database:
  - session.deal_closed = true
  - session.final_price = 390
  - session.ended_at = now
    ↓
Frontend shows:
  - AI acceptance message
  - System message with discount %
  - CTA to join waitlist
```

### 6️⃣ Waitlist Signup

```
User scrolls down
    ↓
Sees relatable pain points:
  - "Is this available?" × 200
  - Can't reply fast enough
    ↓
Chooses email or phone tab
    ↓
Enters contact info
    ↓
Submit → apiService.addToWaitlist()
    ↓
POST /api/waitlist
    ↓
Store in waitlist table
    ↓
Success toast shown
```

## Key Components

### Frontend (React + TypeScript)

**Services:**
- `api.ts` - API client wrapper

**Components:**
- `Index.tsx` - Landing page with hero & watch
- `ChatBot.tsx` - Chat interface with real-time LLM
- `WaitlistForm.tsx` - Email/phone signup

**State Management:**
- React hooks (useState, useEffect)
- Session management
- Real-time updates

### Backend (FastAPI + Python)

**Core Files:**
- `main.py` - API routes & config
- `negotiation_engine.py` - AI negotiation logic
- `models.py` - Database schema
- `database.py` - DB connection

**Features:**
- RESTful API design
- SQLAlchemy ORM
- CORS middleware
- Error handling
- Async operations

### Database (SQLite)

**Tables:**
1. `waitlist` - Contact signups
2. `chat_sessions` - Negotiation sessions
3. `conversation_messages` - All messages

**Relationships:**
- 1 ChatSession → Many ConversationMessages

### External Services

**OpenAI API:**
- Model: GPT-4o-mini
- Used for: AI responses
- Cost: ~$0.01 per conversation

## Security & Best Practices

✅ **Environment Variables** - API keys in .env
✅ **Input Validation** - Pydantic models
✅ **Error Handling** - Try/catch with fallbacks
✅ **CORS Configuration** - Secure origins
✅ **Database Transactions** - Commit/rollback
✅ **Type Safety** - TypeScript + Python typing
✅ **Separation of Concerns** - Clean architecture

## Performance Considerations

**Frontend:**
- Lazy loading components
- Optimistic UI updates
- Error boundaries

**Backend:**
- Async/await for I/O operations
- Database connection pooling
- Indexed database queries

**LLM:**
- Response time: 2-5 seconds (normal)
- Context window management
- Temperature tuning (0.8 for personality)

## Scalability

**Current Setup:**
- SQLite: Good for < 100k users
- Single server: Good for testing

**Production Upgrades:**
- PostgreSQL for database
- Redis for caching
- Rate limiting
- Load balancing
- CDN for frontend
- Separate AI service

## Deployment Architecture

```
Frontend (Vercel/Netlify)
    ↓
Backend (Railway/Render)
    ↓
PostgreSQL (managed DB)
    ↓
OpenAI API (external)
```

---

**This architecture provides:**
- 🚀 Fast response times
- 💪 Robust error handling  
- 📊 Complete data tracking
- 🎯 Strategic AI negotiation
- 🔒 Secure & scalable design







