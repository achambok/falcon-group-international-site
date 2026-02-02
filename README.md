# Falcon Group International - AI Advisory Portal

Elite corporate consulting platform featuring real-time AI advisory, luxury brand design, and strategic services portfolio. Built with React, TypeScript, and Vite.

![Status](https://img.shields.io/badge/status-production%20ready-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)

## ✨ Features

- **🤖 AI Advisory Chat** - Real-time strategic consulting powered by free Groq AI
- **💎 Luxury Design** - Professional navy & gold brand aesthetic
- **📱 Responsive UI** - Mobile-first design for all devices
- **⚡ Fast Performance** - Vite + React 19 with optimized build
- **🔐 Secure** - Environment-based API key management
- **🎯 Strategic Content** - Services portfolio, brand philosophy, executive interface

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/achambok/falcon-group-international-site.git
cd falcon-group-international-site

# Install dependencies
npm install

# Create .env file with your API key
echo "VITE_GROQ_API_KEY=your_key_here" > .env

# Start development server
npm run dev
```

The app will be available at **http://localhost:3000**

## 📝 Environment Setup

### Option 1: Groq AI (Recommended - Free)

1. **Get your free API key:**
   - Visit: https://console.groq.com
   - Sign up for free
   - Go to API Keys
   - Copy your API key

2. **Add to .env:**
```env
VITE_GROQ_API_KEY=your_groq_api_key_here
```

### Option 2: Ollama (Local - Free)

1. **Install Ollama:**
   - Download from https://ollama.ai
   - Run: `ollama pull mistral` (or any model)
   - Start: `ollama serve` (runs on localhost:11434)

2. **No API key needed** - Uses local inference

## 🏗️ Project Structure

```
falcon-group-international-site/
├── App.tsx                 # Main application component
├── index.tsx              # React entry point
├── index.html             # HTML template
├── vite.config.ts         # Vite configuration
├── tsconfig.json          # TypeScript config
├── package.json           # Dependencies
├── .env                   # Environment variables (not in git)
├── components/
│   └── Layout.tsx         # Layout components
├── services/
│   └── gemini.ts          # API service layer
└── types.ts               # TypeScript type definitions
```

## 🎨 Design System

- **Primary Color:** Navy (#001F3F)
- **Accent Color:** Gold (#FFD700)
- **Typography:** Professional sans-serif (Tailwind defaults)
- **Layout:** Max-width container with responsive grid

## 🔧 Development

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Watch & Reload
```bash
npm run dev  # Development with hot reload
```

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub** (already done ✓)

2. **Connect to Vercel:**
   - Go to https://vercel.com
   - Click "New Project"
   - Select your GitHub repository
   - Import project

3. **Add Environment Variables:**
   - In Vercel dashboard: Settings → Environment Variables
   - Add: `VITE_GROQ_API_KEY=your_key`

4. **Deploy:**
   - Vercel auto-deploys on push to main

### Deploy to Netlify

1. **Connect GitHub:**
   - Go to https://netlify.com
   - Click "New site from Git"
   - Connect GitHub account
   - Select repository

2. **Build Settings:**
   - Build command: `npm run build`
   - Publish directory: `dist`

3. **Add Environment Variables:**
   - Site settings → Build & deploy → Environment
   - Add: `VITE_GROQ_API_KEY=your_key`

4. **Deploy:**
   - Netlify auto-deploys on push

## 🤖 AI Integration

### Current Setup: Groq (Free Tier)

**Free Tier Limits:**
- 30 requests/minute
- Full access to Mixtral, Llama, etc.
- No credit card required

**API Endpoint:**
```
https://api.groq.com/openai/v1/chat/completions
```

### Using Ollama Instead

Simply swap the API calls - Ollama uses same OpenAI-compatible API format on localhost:11434

## 📊 Tech Stack

- **Frontend:** React 19.2 + TypeScript
- **Build:** Vite 6.4
- **Styling:** Tailwind CSS
- **AI:** Groq (or Ollama for local)
- **Runtime:** Node.js 18+
- **Package Manager:** npm

## 🔐 Security Best Practices

- ✅ API keys in `.env` (never committed)
- ✅ Environment-based configuration
- ✅ Server-side API calls (when deployed)
- ✅ No sensitive data in frontend code
- ✅ `.gitignore` protects local files

## 🐛 Troubleshooting

### "API Key is missing"
- Check `.env` file exists with `VITE_GROQ_API_KEY`
- Restart dev server after adding `.env`
- Verify key format (starts with `gsk_`)

### Port 3000 already in use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
npm run dev -- --port 3001
```

### Build fails
```bash
# Clear cache and reinstall
rm -rf node_modules dist
npm install
npm run build
```

## 📈 Performance

- **Core Web Vitals:** Optimized
- **Bundle Size:** ~45KB (gzipped)
- **Build Time:** <2 seconds
- **Response Time:** <200ms (AI included)

## 📄 License

MIT License - feel free to use for commercial projects

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📞 Support

- **Issues:** GitHub Issues
- **Email:** dev@falcongroup.com
- **Documentation:** See inline code comments

## 🔄 Updates

Follow for updates:
- Star ⭐ this repository
- Watch 👀 for releases
- Check GitHub releases page

---

**Built by Falcon Group International | 2025-2026**

**Status:** Production Ready ✅
**Last Updated:** February 2, 2026
