# ⚡ Netlify Deployment - Quick Start

## 🚀 Deploy in 5 Minutes

### Step 1: Go to Netlify
1. Visit: https://app.netlify.com
2. Sign in with GitHub
3. Click **"Add new site"** → **"Import an existing project"**

### Step 2: Select Your Repo
1. Click **"Deploy with GitHub"**
2. Authorize Netlify
3. Select **`nego-challenge`** repository

### Step 3: Configure Build
Netlify auto-detects, but verify:
- **Build command:** `npm run build`
- **Publish directory:** `dist`
- **Base directory:** (leave empty)

### Step 4: Add Environment Variable
Click **"Show advanced"** → **"New variable"**
- **Key:** `VITE_API_URL`
- **Value:** `https://web-production-4d5be.up.railway.app`

### Step 5: Deploy!
1. Click **"Deploy [site-name]"**
2. Wait 2-3 minutes
3. Get your URL: `https://random-name.netlify.app`

## ✅ Test Your Site

Visit your Netlify URL and check:
- [ ] Homepage loads
- [ ] Chat works
- [ ] Bra Alex responds
- [ ] Waitlist signup works

## 🎨 Customize Site Name (Optional)

1. **Site settings** → **General** → **Site details**
2. Click **"Change site name"**
3. Enter: `nego-challenge`
4. New URL: `https://nego-challenge.netlify.app`

## 🔧 If Something Breaks

### Can't connect to backend?
**Fix:** Check environment variable
1. **Site settings** → **Environment variables**
2. Verify `VITE_API_URL` = `https://web-production-4d5be.up.railway.app`
3. **Deploys** → **Trigger deploy** → **Deploy site**

### Build failed?
**Check:**
1. **Deploys** → Latest → **Deploy log**
2. Look for errors
3. Common fix: Set `NODE_VERSION` = `18` in environment variables

### API calls fail?
**Test backend:**
```bash
curl https://web-production-4d5be.up.railway.app/
```
Should return JSON. If not, check Railway is running.

## 💡 Pro Tips

- Every git push auto-deploys
- Check **Deploy log** for errors
- Free SSL/HTTPS included
- Deploy previews for PRs

## 📚 Need More Help?

See: `NETLIFY_DEPLOYMENT.md` for full guide

---

**That's it! Your app is live! 🎉**

**Your URLs:**
- Frontend: `https://________.netlify.app`
- Backend: `https://web-production-4d5be.up.railway.app`
- Admin: `https://web-production-4d5be.up.railway.app/admin`


