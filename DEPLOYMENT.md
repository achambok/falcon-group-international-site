# Deployment Guide

## Vercel Deployment (Recommended)

### Step 1: Push to GitHub
```bash
git add .
git commit -m "Add Groq AI integration and deployment configs"
git push origin main
```

### Step 2: Deploy to Vercel
1. Go to https://vercel.com
2. Click "New Project"
3. Select "Import Git Repository"
4. Choose your falcon-group-international-site repo
5. Click "Import"

### Step 3: Configure Environment
1. Under "Environment Variables" section:
   - Key: `VITE_GROQ_API_KEY`
   - Value: Your Groq API key (from https://console.groq.com)
   - Click "Add"

2. Click "Deploy"

Vercel will automatically deploy. You'll get a URL like:
`https://falcon-group-international-site.vercel.app`

### Step 4: Automatic Deployments
- Every push to `main` branch automatically deploys
- Check Deployment History in Vercel dashboard

---

## Netlify Deployment

### Step 1: Connect GitHub
1. Go to https://netlify.com
2. Click "Add new site"
3. Choose "Connect to Git"
4. Select "GitHub"
5. Authorize and choose your repository

### Step 2: Build Settings
Netlify should auto-detect:
- Build command: `npm run build`
- Publish directory: `dist`

If not, manually set them.

### Step 3: Add Environment Variables
1. Site settings → Build & deploy → Environment
2. Add new variable:
   - Key: `VITE_GROQ_API_KEY`
   - Value: Your Groq API key

3. Click "Save"

### Step 4: Deploy
1. Go back to "Deploys" tab
2. Click "Trigger deploy" → "Deploy site"

Your site will be live at a netlify.app URL.

---

## Get Your Groq API Key (Free)

1. Visit: https://console.groq.com
2. Click "Sign in with Google" (or create account)
3. Verify email
4. Go to API Keys section
5. Click "Create API Key"
6. Copy the key (starts with `gsk_`)
7. Add to your deployment platform

### Free Tier Limits:
- 30 requests per minute
- Full access to all models
- No credit card required
- Great for development and testing

---

## Custom Domain (Optional)

### Vercel:
1. Settings → Domains
2. Click "Add Domain"
3. Enter your domain
4. Follow DNS instructions

### Netlify:
1. Site settings → Domain management
2. Click "Add domain"
3. Configure DNS records

---

## Monitoring & Logs

### Vercel:
- View logs: Deployments → Click deployment → Logs
- Errors shown in real-time
- Performance metrics in Analytics

### Netlify:
- View logs: Deploys → Click deploy → Logs
- Function logs in real-time
- Analytics available

---

## Troubleshooting

### Build fails: "VITE_GROQ_API_KEY not found"
- Check you added the environment variable
- Make sure key value is not empty
- Redeploy after adding variable

### "Groq API Error"
- Verify API key is valid: https://console.groq.com
- Check key hasn't been rotated
- Ensure you have requests remaining this minute

### Port issues locally
```bash
# Kill process on port 3000
kill -9 $(lsof -ti:3000)

# Or use different port
npm run dev -- --port 3001
```

---

## Performance Tips

1. **Caching:** Vercel/Netlify handle static asset caching
2. **API Calls:** Groq responses are cached in browser
3. **Build Size:** Currently ~45KB gzipped (excellent)
4. **CDN:** Both services use global CDN

---

## Rollback

### Vercel:
- Deployments tab → Click previous version → "Redeploy"

### Netlify:
- Deploys tab → Click previous version → "Publish deploy"

---

## Support

- Vercel: https://vercel.com/support
- Netlify: https://www.netlify.com/support/
- Groq: https://console.groq.com/docs
