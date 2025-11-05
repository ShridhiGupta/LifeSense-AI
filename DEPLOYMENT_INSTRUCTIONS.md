# LifeSense AI - Deployment Instructions

## 🚀 Quick Start

### Local Development

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start the Development Server**
   ```bash
   npm run dev
   ```
   This will start both the React app (port 3000) and the backend server (port 3001).

3. **Or run separately:**
   ```bash
   # Terminal 1 - React App
   npm start

   # Terminal 2 - Backend Server
   npm run server
   ```

### Testing Chatbots Locally

- **Homepage Chatbot**: Visit `http://localhost:3000` and click the chatbot icon in the bottom-right corner
- **Patient-Specific Chatbot**: Login as a patient and navigate to the chat page

---

## 📦 GitHub Deployment

### Files to Commit

Make sure these files are **NOT** in `.gitignore` and are committed to GitHub:

✅ **Required Files:**
- `server.js` - Backend server for local development
- `local-server.js` - Alternative local server
- `netlify.toml` - Netlify configuration
- `netlify/functions/` - All serverless functions
- `public/` - Public assets and redirects
- `src/` - All React source code
- `package.json` - Dependencies

❌ **Files to Exclude (already in .gitignore):**
- `.env` - Environment variables (use Netlify environment variables instead)
- `node_modules/` - Dependencies
- `build/` - Build output
- `credentials.json` - Google credentials

### Pushing to GitHub

```bash
# Add all files
git add .

# Commit changes
git commit -m "Fix: Add server.js and chatbot functionality"

# Push to GitHub
git push origin main
```

---

## 🌐 Netlify Deployment

### Step 1: Connect to Netlify

1. Go to [Netlify](https://app.netlify.com/)
2. Click "Add new site" → "Import an existing project"
3. Choose GitHub and select your `LifeSense-AI` repository
4. Netlify will auto-detect the configuration from `netlify.toml`

### Step 2: Configure Build Settings

Netlify should automatically use these settings from `netlify.toml`:

- **Build command:** `npm run build`
- **Publish directory:** `build`
- **Functions directory:** `netlify/functions`

### Step 3: Set Environment Variables

In Netlify Dashboard → Site settings → Environment variables, add:

```
GOOGLE_API_KEY=your_google_api_key_here
MONGODB_URI=your_mongodb_connection_string_here
```

### Step 4: Deploy

Click "Deploy site" and wait for the build to complete.

---

## 🤖 Chatbot Functionality

### Three Chatbots in the Application:

1. **Homepage Chatbot (General)**
   - Location: Bottom-right corner on homepage
   - Purpose: General health information for visitors
   - No login required
   - Provides: Recovery tips, diet advice, medicine info

2. **Patient-Specific Chatbot**
   - Location: Patient dashboard after login
   - Purpose: Personalized health guidance
   - Requires: Patient login
   - Access to: Patient medical records, prescriptions, exercises

3. **Embedded Chatbot on Homepage**
   - Same as #1, integrated into the homepage layout

### API Endpoints

**Local Development:**
- `http://localhost:3001/api/health` - Health check
- `http://localhost:3001/api/chat` - Chat endpoint
- `http://localhost:3001/api/patient/:id` - Get patient data

**Production (Netlify):**
- `/.netlify/functions/api` - All API requests route here

---

## 🔧 Troubleshooting

### Issue: Chatbots Not Working

**Check:**
1. Server is running (`npm run server` or `npm run dev`)
2. No CORS errors in browser console
3. API endpoint is correct (localhost:3001 for local, /.netlify/functions/api for production)

### Issue: Server.js Deleted on GitHub

**Solution:**
- The file is now created and tracked in Git
- Make sure `.gitignore` doesn't exclude it (we've already fixed this)
- Commit and push: `git add server.js && git commit -m "Add server.js" && git push`

### Issue: Build Fails on Netlify

**Check:**
1. All dependencies are in `package.json`
2. `netlify.toml` is in the root directory
3. Environment variables are set in Netlify dashboard
4. `netlify/functions/db.js` exists

### Issue: Database Connection Fails

**Fallback:**
- Chatbots will still work with hardcoded responses
- Check MongoDB connection string in Netlify environment variables
- Verify MongoDB Atlas allows connections from anywhere (0.0.0.0/0)

---

## 📝 Package.json Scripts

```json
{
  "start": "react-scripts start",          // Start React app only
  "build": "react-scripts build",          // Build for production
  "server": "node local-server.js",        // Start backend server
  "dev": "concurrently \"npm run start\" \"npm run server\""  // Start both
}
```

---

## 🔐 Security Notes

1. **Never commit `.env` file** - It's already in `.gitignore`
2. **Use Netlify environment variables** for production secrets
3. **MongoDB credentials** should be in environment variables only
4. **API keys** should never be hardcoded (except for development)

---

## 📞 Support

If you encounter issues:
1. Check browser console for errors
2. Check Netlify function logs
3. Verify all environment variables are set
4. Test locally first before deploying

---

## ✅ Deployment Checklist

Before deploying to production:

- [ ] All files committed to GitHub
- [ ] `server.js` exists and is tracked
- [ ] `netlify.toml` is configured
- [ ] Environment variables set in Netlify
- [ ] MongoDB connection string is correct
- [ ] Google API key is valid
- [ ] Test chatbots locally
- [ ] Build succeeds locally (`npm run build`)
- [ ] No sensitive data in code

---

**Last Updated:** 2025
**Version:** 1.0.0
