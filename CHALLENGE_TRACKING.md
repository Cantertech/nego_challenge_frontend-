# 🎯 Challenge Tracking System

## Overview

The **7-Day Nego Challenge** has two separate tracking systems:

1. **Challenge Participation** - For everyone who plays
2. **Waitlist** - Only for sellers who want the AI product

---

## 🎮 Challenge Tracking (For Everyone)

### **How It Works:**

**1. User Plays Challenge:**
- Opens chat → Gets unique code (e.g., `NEGO ABC123`)
- Code generated when session starts
- Stored in `chat_sessions.referral_code`

**2. User Shares:**
- After completing challenge (deal or no deal)
- Gets their code: `NEGO ABC123`
- Shares link: `yoursite.com?ref=NEGOABC123`

**3. Friends Click Link:**
- URL has `?ref=NEGOABC123`
- They play challenge
- Their session stores `referred_by: NEGOABC123`

**4. Tracking:**
- Backend counts how many people used each code
- Leaderboard shows top referrers

---

## 📊 Database Structure

### **chat_sessions Table:**
```sql
- id (primary key)
- session_id (unique)
- referral_code (NEGOXXXXXX - their share code)
- referred_by (who referred them)
- discount_percentage (for leaderboard)
- deal_closed
- final_price
- minimum_price
...
```

### **waitlist Table** (Separate - Only Sellers):
```sql
- id
- contact_type (email/phone)
- contact_value
- referral_code (separate waitlist referrals)
- referred_by
...
```

---

## 🏆 Leaderboards

### **1. Top Negotiators**
Winner = Best discount percentage

```
GET /api/leaderboard
```

Returns:
```json
{
  "top_negotiators": [
    {
      "session_id": "abc12345",
      "final_price": 355,
      "discount_percentage": 21.1,
      "share_code": "NEGOABC123"
    },
    ...
  ]
}
```

### **2. Top Referrers**
Winner = Most friends who played

```json
{
  "top_referrers": [
    {
      "share_code": "NEGOABC123",
      "referral_count": 7,
      "session_id": "xyz98765"
    },
    ...
  ]
}
```

---

## 📱 User Flow

### **Player 1 (Not a Seller):**

1. Plays challenge
2. Gets code: `NEGOABC123`
3. After deal: Shows congratulations screen
4. Asks: "Are you a seller?"
5. Clicks: "No, Just Playing"
6. Sees: "Share with 3 friends to qualify for prizes!"
7. Shares link with code
8. **Does NOT join waitlist** (not a seller)

### **Player 2 (Is a Seller):**

1. Plays challenge
2. Gets code: `NEGODEF456`
3. After deal: Shows congratulations screen
4. Asks: "Are you a seller?"
5. Clicks: "Yes, I'm a Seller"
6. Auto-scrolls to video section
7. Watches demo
8. **Joins waitlist** (gets separate waitlist referral code)
9. Can also share challenge code to friends

---

## 🎯 Prize Qualification

**To Win:**

**Category 1: Best Negotiator**
- Get the best discount percentage
- Must close a deal
- Automatically tracked

**Category 2: Most Referrals**
- Share challenge with friends
- They click your link and play
- Need 3+ referrals to qualify
- Tracked via referral codes

---

## 🔍 Tracking in Admin

**Admin Dashboard** (`/admin`):

**Conversations Tab:**
- See all sessions
- Shows referral code for each
- Shows if they were referred
- Click to see full conversation

**Leaderboard:**
```
GET /api/leaderboard
```
- Top 10 negotiators
- Top 10 referrers
- Real-time rankings

---

## 💾 Migration

Run this to add referral tracking:

```bash
cd backend
python migrate_referrals.py
```

Adds:
- `referral_code` to chat_sessions
- `referred_by` to chat_sessions  
- `discount_percentage` to chat_sessions
- Referral columns to waitlist (separate tracking)

---

## 📈 Analytics Queries

### **Count Total Participants:**
```python
total_players = db.query(ChatSession).count()
```

### **Count Deals Closed:**
```python
successful_negotiations = db.query(ChatSession).filter(
    ChatSession.deal_closed == True
).count()
```

### **Top 10 Discounts:**
```python
best_deals = db.query(ChatSession).filter(
    ChatSession.discount_percentage.isnot(None)
).order_by(ChatSession.discount_percentage.desc()).limit(10)
```

### **Who Referred Most People:**
```python
for session in all_sessions:
    referral_count = db.query(ChatSession).filter(
        ChatSession.referred_by == session.referral_code
    ).count()
```

---

## 🎊 Winner Announcement (Oct 24)

**Steps:**

1. **Call leaderboard API:**
   ```
   GET /api/leaderboard
   ```

2. **Identify winners:**
   - **1st Prize (100 GHS + 3 months):**
     - Best negotiator (highest discount %)
   
   - **2nd Prize (50 GHS + 1 month):**
     - Most referrals (minimum 3)

3. **Announce on:**
   - Platform homepage
   - All social media
   - Email/phone contacts

4. **Contact winners:**
   - Get session details from admin
   - They provided name/phone during negotiation
   - Reach out directly

---

## ✅ Summary

**Challenge Tracking:**
- ✅ Every player gets unique code (NEGOXXXXXX)
- ✅ URL referrals tracked (`?ref=NEGOXXXXXX`)
- ✅ Leaderboard for best negotiators
- ✅ Leaderboard for most referrals
- ✅ Share buttons in UI

**Waitlist Tracking (Sellers Only):**
- ✅ Separate from challenge
- ✅ Email/phone collection
- ✅ Optional waitlist referrals
- ✅ Only for those who want the AI product

**No signup required to play challenge!** Everyone can participate and share! 🚀









