# 🚀 Netlify Deployment Guide - Nego Challenge Frontend

Deploy your Nego Challenge frontend to Netlify in minutes!

## Prerequisites

- ✅ Backend deployed to Railway (https://web-production-4d5be.up.railway.app)
- ✅ GitHub account
- ✅ Code pushed to GitHub
- ✅ Netlify account (sign up at https://netlify.com)

## Quick Deploy (5 Minutes)

### Step 1: Push Code to GitHub

If not done already:

```bash
git add .
git commit -m "Ready for Netlify deployment"
git push origin main
```

### Step 2: Connect to Netlify

1. **Go to Netlify:** https://app.netlify.com
2. **Sign in** with GitHub
3. Click **"Add new site"** → **"Import an existing project"**
4. Choose **"Deploy with GitHub"**
5. Authorize Netlify to access your repositories
6. Select your **`nego-challenge`** repository

### Step 3: Configure Build Settings

Netlify should auto-detect your settings, but verify:

**Build settings:**
- **Base directory:** Leave empty (root)
- **Build command:** `npm run build`
- **Publish directory:** `dist`
- **Functions directory:** Leave empty

Click **"Show advanced"** to add environment variables.

### Step 4: Add Environment Variables (Optional)

**Note:** The backend URL is already configured in the code! You can skip this step.

If you want to override it, click **"Add environment variable"** and add:

**Variable:**
- **Key:** `VITE_API_URL`
- **Value:** `https://web-production-4d5be.up.railway.app`

This tells your frontend where to find your backend API.

### Step 5: Deploy!

1. Click **"Deploy [your-site-name]"**
2. Wait 2-3 minutes for build to complete
3. Netlify will give you a URL like: `https://random-name-123456.netlify.app`

### Step 6: Test Your Deployment

Visit your Netlify URL and test:
- ✅ Chat interface loads
- ✅ Can send messages to Bra Alex
- ✅ AI responds
- ✅ Waitlist signup works

---

## Post-Deployment

### Get Your Custom Domain (Optional)

1. In Netlify dashboard, go to **"Domain settings"**
2. Click **"Add custom domain"**
3. Follow the instructions to:
   - Buy a domain through Netlify, OR
   - Connect your existing domain

### Update Site Name

1. Go to **"Site settings"** → **"General"**
2. Under **"Site details"** → **"Site name"**
3. Click **"Change site name"**
4. Enter something like: `nego-challenge` 
5. Your URL becomes: `https://nego-challenge.netlify.app`

---

## Testing Checklist

After deployment, test these features:

- [ ] Homepage loads correctly
- [ ] Chat interface appears
- [ ] Can start a conversation
- [ ] Bra Alex responds with AI messages
- [ ] Can negotiate prices
- [ ] Deal can be closed
- [ ] Waitlist form works
- [ ] Images load properly
- [ ] No console errors (F12 → Console)
- [ ] Mobile responsive design works

---

## Troubleshooting

### Issue 1: "Failed to send message" Error

**Problem:** Frontend can't connect to backend

**Solution:**
1. Check environment variable in Netlify
2. Go to **Site settings** → **Environment variables**
3. Verify `VITE_API_URL` is set to your Railway URL
4. If you updated it, trigger a redeploy:
   - **Deploys** → **Trigger deploy** → **Deploy site**

### Issue 2: 404 Errors on Refresh

**Problem:** React Router pages show 404 when refreshed

**Solution:** Already fixed with `netlify.toml` redirect rules!
- The `netlify.toml` file handles SPA routing

### Issue 3: Build Fails

**Check these:**

1. **Node version:** Should be 18 or higher
   - Set in **Site settings** → **Environment variables**
   - Add: `NODE_VERSION` = `18`

2. **Build command:** Should be `npm run build`
   - Check in **Site settings** → **Build & deploy** → **Build settings**

3. **Dependencies:** Make sure `package.json` is correct
   - Check build logs for specific errors

### Issue 4: Images Not Loading

**Problem:** Images show as broken

**Solution:**
1. Check images are in `src/assets/` or `public/`
2. Use correct paths:
   - For `public/`: `/image.png`
   - For `src/assets/`: `import image from '@/assets/image.png'`

### Issue 5: API Calls Failing

**Check:**
1. Backend is running on Railway
2. `VITE_API_URL` is correct (check for typos!)
3. No trailing slash in URL
4. CORS is enabled on backend (already done!)

**Test backend directly:**
```bash
curl https://web-production-4d5be.up.railway.app/
```

Should return JSON with API info.

---

## Environment Variables Reference

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `VITE_API_URL` | ✅ Yes | Backend API URL from Railway | `https://web-production-4d5be.up.railway.app` |

**Note:** All Vite environment variables MUST start with `VITE_` to be exposed to your app!

---

## Continuous Deployment

**Automatic Updates:**
- Every time you push to `main` branch on GitHub
- Netlify automatically rebuilds and redeploys
- Takes 2-3 minutes
- No manual action needed! 🎉

**To disable auto-deploy:**
1. Go to **Site settings** → **Build & deploy**
2. Under **Build settings** → **Build hooks**
3. Turn off **"Auto publish"**

---

## Performance Optimization

### Enable HTTPS (Auto)
- ✅ Netlify provides free SSL certificates
- ✅ Automatically enabled
- ✅ Forces HTTPS redirect

### Enable Deploy Previews
- ✅ Auto-enabled for pull requests
- Test changes before merging to main

### Caching
- Already configured in `netlify.toml`
- Static assets cached for 1 year
- HTML files not cached (always fresh)

---

## Monitoring

### Check Build Logs
1. Go to **Deploys**
2. Click latest deployment
3. View **Deploy log**
4. Check for errors or warnings

### Check Function Logs
Not using serverless functions, but available if needed.

### Analytics
1. Enable in **Site settings** → **Analytics**
2. Track visitors, page views, etc.

---

## Costs

**Netlify Pricing:**
- ✅ **Free tier:**
  - 100 GB bandwidth/month
  - 300 build minutes/month
  - Unlimited sites
  - SSL included
  - Deploy previews included

**For your project:**
- Should stay within free tier
- No credit card needed for free plan

---

## URLs Summary

After deployment, you'll have:

| Service | URL |
|---------|-----|
| **Frontend** | `https://your-site.netlify.app` |
| **Backend** | `https://web-production-4d5be.up.railway.app` |
| **Admin** | `https://web-production-4d5be.up.railway.app/admin` |

---

## Next Steps

1. ✅ Deploy to Netlify
2. 📱 Test on mobile devices
3. 🎨 Customize domain (optional)
4. 📊 Share with users!
5. 🚀 Monitor performance

---

## Support

- **Netlify Docs:** https://docs.netlify.com
- **Netlify Support:** https://answers.netlify.com
- **Status:** https://www.netlifystatus.com

---

## Quick Reference

**Redeploy site:**
```
Deploys → Trigger deploy → Deploy site
```

**Update environment variables:**
```
Site settings → Environment variables → Edit variables
```

**View build logs:**
```
Deploys → Latest deployment → Deploy log
```

**Change site name:**
```
Site settings → General → Site details → Change site name
```

---

**Your Deployment Info:**

📝 **Netlify Site Name:** `_______________________`

🌐 **Netlify URL:** `https://_______________________.netlify.app`

🚀 **Railway Backend:** `https://web-production-4d5be.up.railway.app`

📅 **Deployed:** `_______________`

✅ **Status:** [ ] Deployed | [ ] Tested | [ ] Live

---

**Congratulations! Your Nego Challenge is now live! 🎉**


