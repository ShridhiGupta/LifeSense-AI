# How to Fix the Chatbot - Step by Step Instructions

## The Problem
The chatbot on the "Start Chat" page is showing the same fallback message instead of AI-powered responses.

## Solution - Follow These Steps Exactly

### Step 1: Make Sure Server is Running

1. **Open a NEW terminal/command prompt** (don't close it during testing)

2. **Navigate to project folder:**
   ```bash
   cd "c:\Users\HP\Downloads\LifeSense AI\LifeSense-AI(Project)"
   ```

3. **Start the server:**
   ```bash
   node server.js
   ```

4. **IMPORTANT: Keep this terminal open!** You should see:
   ```
   ✅ Connected to MongoDB - LifeSenseAI database
   ✅ LifeSense AI Server running at http://localhost:3001
   ```

### Step 2: Test the API (Optional but Recommended)

1. **Open ANOTHER terminal** (keep the server running in the first one)

2. **Navigate to project folder:**
   ```bash
   cd "c:\Users\HP\Downloads\LifeSense AI\LifeSense-AI(Project)"
   ```

3. **Run the test script:**
   ```bash
   node test-api.js
   ```

4. **You should see:**
   - ✅ SUCCESS!
   - A response from the AI

5. **If you see an error:**
   - Make sure the server is running in the other terminal
   - Check if port 3001 is available

### Step 3: Test in Browser

1. **Make sure the React app is running:**
   ```bash
   npm start
   ```

2. **Open browser:** http://localhost:3000

3. **Click "Start Chat" button**

4. **Type a message:** "I'm feeling anxious"

5. **Watch the server terminal** - you should see:
   ```
   📝 Processing general chat message: I'm feeling anxious
   🤖 Initializing Google AI model...
   📤 Sending message to Google AI...
   ✅ AI Response generated for general chat
   📨 Response preview: [AI response]...
   ```

### Step 4: Check Browser Console

1. **Press F12** to open Developer Tools

2. **Go to Console tab**

3. **Send a message in the chatbot**

4. **Look for:**
   - ✅ No errors = Good!
   - ❌ "Failed to fetch" = Server not running
   - ❌ "CORS error" = CORS issue (see troubleshooting)
   - ❌ "404 Not Found" = Wrong API endpoint

## Common Issues and Quick Fixes

### Issue 1: "Failed to fetch" or "Network error"

**Cause:** Server is not running

**Fix:**
1. Open a terminal
2. Run: `node server.js`
3. Keep it running
4. Refresh browser

### Issue 2: Still Getting Fallback Messages

**Cause:** Google AI API might be failing

**Check server console for:**
```
❌ Error calling Google AI: [error message]
```

**Possible fixes:**

**A) API Key Issue:**
Open `server.js` and check line 56:
```javascript
const ai = new GoogleGenAI({
  apiKey: 'AIzaSyCzMGZRs6SvSN0msMQCWyLMb4xaiTdPh_0'  // Make sure this is valid
});
```

**B) Install missing package:**
```bash
npm install @google/genai
```

**C) Restart server:**
- Press Ctrl+C in server terminal
- Run: `node server.js` again

### Issue 3: Server Crashes or Errors

**Error: "Cannot find module '@google/genai'"**

**Fix:**
```bash
npm install @google/genai
node server.js
```

**Error: "Port 3001 is already in use"**

**Fix:**
```bash
# Windows:
netstat -ano | findstr :3001
taskkill /PID [PID_NUMBER] /F

# Then restart:
node server.js
```

### Issue 4: React App Not Running

**Fix:**
```bash
npm start
```

If it fails:
```bash
npm install
npm start
```

## Verification Checklist

Before testing, make sure:

- [ ] Server is running (`node server.js`)
- [ ] You see "✅ LifeSense AI Server running at http://localhost:3001"
- [ ] React app is running (`npm start`)
- [ ] Browser is open at http://localhost:3000
- [ ] No errors in server console
- [ ] No errors in browser console (F12)

## Testing the Chatbot

Once everything is running, test with these messages:

1. **"Hello"** - Should get a friendly AI greeting
2. **"I'm feeling anxious"** - Should get anxiety management advice
3. **"What are the symptoms of diabetes?"** - Should get medical information
4. **"I have severe chest pain"** - Should get emergency advice

## Expected Behavior

### ✅ CORRECT (AI Working):
```
You: "I'm feeling anxious"

AI: "It's completely normal to feel anxious at times. Here are some 
evidence-based techniques that may help:

• Deep breathing exercises: Try the 4-7-8 method (breathe in for 4 
  seconds, hold for 7, exhale for 8)
• Mindfulness meditation: Even 5-10 minutes daily can help
• Physical activity: Regular exercise reduces anxiety
• Talk to someone: Share your feelings with trusted friends or family
• Limit caffeine and alcohol: These can worsen anxiety

If anxiety is persistent or severe, please consult a mental health 
professional. Would you like more specific coping strategies?"
```

### ❌ WRONG (Fallback Message):
```
You: "I'm feeling anxious"

AI: "👋 Hello! I'm LifeSense AI. I can help you with:

• Recovery guidance
• Dietary recommendations
• Medicine information
..."
```

## Still Not Working?

If you've followed all steps and it's still not working:

1. **Check server console** - Copy the error messages

2. **Check browser console** (F12) - Copy any errors

3. **Run the test script:**
   ```bash
   node test-api.js
   ```
   Copy the output

4. **Verify Google AI package:**
   ```bash
   npm list @google/genai
   ```

5. **Try restarting everything:**
   ```bash
   # Stop server (Ctrl+C)
   # Stop React app (Ctrl+C)
   
   # Reinstall packages
   npm install
   
   # Start server
   node server.js
   
   # In another terminal, start React app
   npm start
   ```

## Quick Debug Commands

```bash
# Check if server is running
curl http://localhost:3001/api/health

# Test chat API
node test-api.js

# Check installed packages
npm list @google/genai

# Restart everything
# Terminal 1:
node server.js

# Terminal 2:
npm start
```

## Success Indicators

You'll know it's working when:

1. ✅ Server console shows AI processing logs
2. ✅ Browser shows different responses for different questions
3. ✅ Responses are comprehensive and contextual
4. ✅ No errors in browser or server console
5. ✅ Test script (test-api.js) returns AI responses

---

**Need more help?** Check `TROUBLESHOOTING_CHATBOT.md` for detailed debugging steps.
