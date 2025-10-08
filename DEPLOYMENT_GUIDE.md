# 🚀 LifeSense AI - Complete Deployment Guide

## Overview
This guide will help you deploy your LifeSense AI chatbot with a MongoDB database backend, ensuring data persists across all browsers and devices.

---

## 📋 Prerequisites

1. **MongoDB Atlas Account** (Free tier available)
   - Sign up at: https://www.mongodb.com/cloud/atlas/register

2. **Render Account** (For backend deployment - Free tier available)
   - Sign up at: https://render.com/

3. **Netlify Account** (For frontend deployment - Free tier available)
   - Sign up at: https://www.netlify.com/

---

## Part 1: Setup MongoDB Database

### Step 1: Create MongoDB Cluster

1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Click **"Build a Database"**
3. Choose **FREE** tier (M0 Sandbox)
4. Select a cloud provider and region (choose closest to you)
5. Click **"Create Cluster"**

### Step 2: Create Database User

1. Go to **Database Access** (left sidebar)
2. Click **"Add New Database User"**
3. Choose **"Password"** authentication
4. Set username: `lifesense_admin`
5. Set a strong password (save it!)
6. Set role: **"Read and write to any database"**
7. Click **"Add User"**

### Step 3: Get Connection String

1. Go to **Database** (left sidebar)
2. Click **"Connect"** on your cluster
3. Choose **"Connect your application"**
4. Copy the connection string (looks like):
   ```
   mongodb+srv://lifesense_admin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
5. Replace `<password>` with your actual password
6. Save this connection string - you'll need it!

### Step 4: Allow Network Access

1. Go to **Network Access** (left sidebar)
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"** (for development)
4. Click **"Confirm"**

---

## Part 2: Deploy Backend to Render

### Step 1: Prepare Backend Files

1. Navigate to your backend folder:
   ```bash
   cd "C:\Users\HP\Downloads\LifeSense AI\chatbot-ui\backend"
   ```

2. Create a `.env` file:
   ```bash
   MONGODB_URI=your_mongodb_connection_string_here
   GEMINI_API_KEY=AIzaSyAXnFRXMGK4Z7w3HrtUSqsTgiG8W6GoeQs
   PORT=5000
   NODE_ENV=production
   FRONTEND_URL=*
   ```

3. Initialize git repository (if not already):
   ```bash
   git init
   git add .
   git commit -m "Initial backend setup"
   ```

4. Push to GitHub:
   - Create a new repository on GitHub
   - Follow GitHub's instructions to push your code

### Step 2: Deploy on Render

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Configure:
   - **Name**: `lifesense-backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: `Free`

5. Add Environment Variables:
   - Click **"Advanced"**
   - Add these variables:
     ```
     MONGODB_URI = your_mongodb_connection_string
     GEMINI_API_KEY = AIzaSyAXnFRXMGK4Z7w3HrtUSqsTgiG8W6GoeQs
     NODE_ENV = production
     FRONTEND_URL = *
     ```

6. Click **"Create Web Service"**
7. Wait for deployment (5-10 minutes)
8. **Copy your backend URL** (e.g., `https://lifesense-backend.onrender.com`)

---

## Part 3: Deploy Frontend to Netlify

### Step 1: Update Frontend Configuration

1. Open `.env.production` file in your project root
2. Update the backend URL:
   ```
   REACT_APP_API_URL=https://your-backend-url.onrender.com
   ```
   (Replace with your actual Render backend URL)

### Step 2: Build Frontend

1. Navigate to project root:
   ```bash
   cd "C:\Users\HP\Downloads\LifeSense AI\chatbot-ui"
   ```

2. Install dependencies (if not done):
   ```bash
   npm install
   ```

3. Build for production:
   ```bash
   npm run build
   ```

### Step 3: Deploy to Netlify

**Option A: Drag & Drop (Easiest)**

1. Go to [Netlify Drop](https://app.netlify.com/drop)
2. Drag the `build` folder to the upload area
3. Wait for deployment
4. Your site is live!

**Option B: Connect Git Repository**

1. Push your code to GitHub (if not already)
2. Go to [Netlify](https://app.netlify.com/)
3. Click **"Add new site"** → **"Import an existing project"**
4. Connect your GitHub repository
5. Configure:
   - **Build command**: `npm run build`
   - **Publish directory**: `build`
   - **Environment variables**:
     ```
     REACT_APP_API_URL = https://your-backend-url.onrender.com
     ```
6. Click **"Deploy site"**

---

## Part 4: Configure Netlify Redirects

After deployment, if you get "Page not found" errors:

1. Go to your Netlify site dashboard
2. Click **"Site configuration"** → **"Redirects and rewrites"**
3. Add this rule:
   - **From**: `/*`
   - **To**: `/index.html`
   - **Status**: `200` (Rewrite)

Or the `_redirects` file in `public` folder should handle this automatically.

---

## 🎉 Testing Your Deployment

### 1. Test Backend
Visit: `https://your-backend-url.onrender.com/api/health`

Should return:
```json
{
  "status": "ok",
  "message": "LifeSense AI Backend is running"
}
```

### 2. Test Frontend
1. Visit your Netlify URL
2. Try logging in as admin:
   - **Email**: `guptashridhi11@gmail.com`
   - **Password**: `shridhii`

### 3. Test Data Persistence
1. Login as admin in Chrome
2. Create a patient or approve staff
3. Open the same site in Edge/Firefox
4. Login as admin
5. **You should see the same data!** ✅

---

## 🔒 Admin Credentials

**Default Admin Account** (Always available):
- **Email**: `guptashridhi11@gmail.com`
- **Password**: `shridhii`
- **ID**: 1

This admin account is hardcoded and will work immediately after deployment.

---

## 📝 Important Notes

1. **Free Tier Limitations**:
   - Render free tier: Backend sleeps after 15 min of inactivity (takes 30s to wake up)
   - MongoDB free tier: 512MB storage
   - Netlify free tier: 100GB bandwidth/month

2. **Data Persistence**:
   - All data is now stored in MongoDB
   - Works across all browsers and devices
   - Admin can create patients and approve staff from any browser

3. **Security**:
   - In production, implement proper password hashing (bcrypt)
   - Use JWT tokens for authentication
   - Add rate limiting to prevent abuse

---

## 🐛 Troubleshooting

### Backend not responding
- Check Render logs for errors
- Verify MongoDB connection string is correct
- Ensure environment variables are set

### Frontend can't connect to backend
- Verify `REACT_APP_API_URL` is set correctly
- Check browser console for CORS errors
- Ensure backend is running (visit health endpoint)

### "Page not found" on refresh
- Add `_redirects` file to `public` folder
- Or configure redirects in Netlify dashboard

---

## 📞 Support

If you encounter issues:
1. Check Render logs: Dashboard → Your Service → Logs
2. Check Netlify logs: Site Dashboard → Deploys → Deploy log
3. Check browser console for errors (F12)

---

## ✅ Deployment Checklist

- [ ] MongoDB cluster created
- [ ] Database user created
- [ ] Connection string obtained
- [ ] Backend deployed to Render
- [ ] Environment variables set on Render
- [ ] Backend health check passes
- [ ] Frontend `.env.production` updated
- [ ] Frontend built successfully
- [ ] Frontend deployed to Netlify
- [ ] Netlify redirects configured
- [ ] Admin login works
- [ ] Data persists across browsers

---

**Congratulations! Your LifeSense AI chatbot is now live! 🎉**
