# LifeSense AI - GitHub Setup Guide

## Project Setup

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/LifeSense-AI.git
cd LifeSense-AI
```

### 2. Install Dependencies
```bash
npm install
cd netlify/functions
npm install
cd ../..
```

### 3. Environment Variables Setup
Create a `.env` file in the root directory using `.env.example` as a template:
```bash
cp .env.example .env
```

Then update the `.env` file with your actual credentials:
- MongoDB Atlas URI
- Admin credentials
- Google AI API keys (Gemini and Groq)
- Server configuration

### 4. Run the Application

**Development Mode (Frontend + Backend):**
```bash
npm run dev
```

**Frontend Only:**
```bash
npm start
```

**Backend Server Only:**
```bash
npm run server
```

### 5. Build for Production
```bash
npm run build
```

## Important Security Notes

⚠️ **NEVER commit the following files to GitHub:**
- `.env` - Contains sensitive credentials
- `credentials.json` - Google Sheets API credentials
- `token.json` - OAuth tokens
- `node_modules/` - Generated dependencies

These files are already listed in `.gitignore` and will be automatically ignored.

## Deployment

### Netlify Deployment
1. Connect your GitHub repository to Netlify
2. Set environment variables in Netlify dashboard (Settings > Build & Deploy > Environment)
3. Deploy using the configured build command: `npm run build`

### Local Deployment
Run the Express server:
```bash
node server.js
```
Server will start on port 5000.

## Project Structure
- `src/` - React frontend components
- `netlify/functions/` - Serverless API functions
- `public/` - Static assets
- `server.js` - Express backend server
- `.env.example` - Environment variables template

## Support
For issues or questions, please refer to the project documentation or create an issue in the GitHub repository.
