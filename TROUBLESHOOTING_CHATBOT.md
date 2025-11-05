# Troubleshooting Guide - Healthcare Chatbot Not Responding

## Issue Description
The chatbot on the "Start Chat" page is not answering general questions and keeps showing the default fallback message instead of AI-powered responses.

## Step-by-Step Troubleshooting

### Step 1: Check if Server is Running

1. **Open a terminal/command prompt**
2. **Navigate to the project directory:**
   ```bash
   cd "c:\Users\HP\Downloads\LifeSense AI\LifeSense-AI(Project)"
   ```

3. **Start the server:**
   ```bash
   node server.js
   ```

4. **You should see:**
   ```
   ✅ Connected to MongoDB - LifeSenseAI database
   ✅ LifeSense AI Server running at http://localhost:3001
   📡 API endpoints:
      - GET  /api/health
      - POST /api/chat
      ...
   ```

### Step 2: Test the API Directly

1. **Open a new terminal**
2. **Test the health endpoint:**
   ```bash
   curl http://localhost:3001/api/health
   ```
   Should return: `{"status":"Server is running"}`

3. **Test the chat endpoint:**
   ```bash
   curl -X POST http://localhost:3001/api/chat -H "Content-Type: application/json" -d "{\"patientId\":\"general\",\"message\":\"Hello\"}"
   ```

### Step 3: Check Browser Console

1. **Open the Start Chat page** (http://localhost:3000/get-started or click "Start Chat" button)
2. **Open Browser Developer Tools** (F12 or Right-click → Inspect)
3. **Go to Console tab**
4. **Send a message in the chatbot**
5. **Look for errors:**
   - Network errors (Failed to fetch, CORS errors)
   - API errors (HTTP 400, 500, etc.)
   - JavaScript errors

### Step 4: Check Server Console Logs

When you send a message, you should see these logs in the server console:

```
📝 Processing general chat message: [your message]
🤖 Initializing Google AI model...
📤 Sending message to Google AI...
✅ AI Response generated for general chat
📨 Response preview: [first 100 characters]...
📤 Sending response to client. Response length: [number]
Response type: General Chat (AI)
```

### Common Issues and Solutions

#### Issue 1: Server Not Running
**Symptoms:** 
- Browser shows "Failed to fetch" or "Network error"
- Can't access http://localhost:3001/api/health

**Solution:**
```bash
# Make sure you're in the project directory
cd "c:\Users\HP\Downloads\LifeSense AI\LifeSense-AI(Project)"

# Start the server
node server.js
```

#### Issue 2: Google AI API Error
**Symptoms:**
- Server logs show: "❌ Error calling Google AI"
- Response is the fallback message

**Possible Causes:**
1. **Invalid API Key** - Check if the API key in server.js is correct
2. **API Quota Exceeded** - Google AI free tier has limits
3. **Network Issues** - Can't reach Google AI servers

**Solution:**
Check the full error in server console. If it's an API key issue:
```javascript
// In server.js, line 55-57
const ai = new GoogleGenAI({
  apiKey: 'YOUR_VALID_API_KEY_HERE'  // Make sure this is correct
});
```

#### Issue 3: CORS Error
**Symptoms:**
- Browser console shows CORS policy error
- "Access-Control-Allow-Origin" error

**Solution:**
The server already has CORS enabled, but if you still see this error:
```javascript
// In server.js, add after line 52:
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
```

#### Issue 4: Wrong API Endpoint
**Symptoms:**
- Server receives requests but for wrong endpoint
- 404 Not Found errors

**Solution:**
Make sure GetStarted.js is calling the correct endpoint:
```javascript
// In GetStarted.js, line 16
const res = await fetch("http://localhost:3001/api/chat", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ patientId: "general", message: text }),
});
```

### Step 5: Test with Simple Message

1. **Restart the server** (Ctrl+C, then `node server.js`)
2. **Refresh the browser page**
3. **Send a simple message:** "Hello"
4. **Watch both consoles:**
   - Browser console (F12)
   - Server console (terminal)

### Step 6: Verify Google AI Package

Make sure the Google AI package is installed:

```bash
npm list @google/genai
```

If not installed:
```bash
npm install @google/genai
```

### Step 7: Check Package.json

Ensure your package.json has the correct dependencies:

```json
{
  "dependencies": {
    "@google/genai": "^0.21.0",
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "mongodb": "^6.3.0",
    "dotenv": "^16.3.1"
  }
}
```

If missing, run:
```bash
npm install
```

## Quick Fix Checklist

- [ ] Server is running on port 3001
- [ ] Can access http://localhost:3001/api/health
- [ ] Browser console shows no errors
- [ ] Server console shows AI processing logs
- [ ] Google AI API key is valid
- [ ] All npm packages are installed
- [ ] No CORS errors in browser

## Testing the Fix

Once everything is set up:

1. **Start the server:**
   ```bash
   node server.js
   ```

2. **Open the chat page:**
   - Go to http://localhost:3000
   - Click "Start Chat" button

3. **Test with these messages:**
   - "What are the symptoms of diabetes?"
   - "I'm feeling anxious"
   - "How can I improve my sleep?"

4. **Expected behavior:**
   - AI should respond with comprehensive, personalized healthcare information
   - Responses should be different from the hardcoded fallback messages
   - Server console should show AI processing logs

## Still Not Working?

If the issue persists after following all steps:

1. **Check the full error message** in server console
2. **Share the error logs** from both browser and server console
3. **Verify your Google AI API key** is active and has quota remaining
4. **Try a different API key** if available

## Alternative: Test with Fallback Responses

If Google AI is not working, you can temporarily test with fallback responses by modifying server.js:

```javascript
if (isGeneralChat) {
  // Temporary fallback for testing
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('anxious') || lowerMessage.includes('anxiety')) {
    botResponse = "It's completely normal to feel anxious. Here are some techniques that may help:\n\n• Deep breathing exercises (4-7-8 method)\n• Light meditation or mindfulness\n• Talk to loved ones\n• Focus on small daily achievements\n\nIf anxiety persists, please speak with a healthcare provider.";
  } else if (lowerMessage.includes('sleep')) {
    botResponse = "Here are evidence-based tips for better sleep:\n\n• Maintain a consistent sleep schedule\n• Create a dark and cool sleeping environment\n• Avoid caffeine 6+ hours before bed\n• Exercise regularly\n• Limit screen time before bed\n• Try relaxation techniques like meditation";
  } else {
    botResponse = "Hello! I'm your healthcare assistant. I can help with health questions, wellness advice, and medical information. What would you like to know?";
  }
}
```

This will at least make the chatbot functional while you debug the Google AI integration.
