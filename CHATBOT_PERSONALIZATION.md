# 🤖 Patient-Specific Chatbot - Personalization Guide

## Overview

The patient-specific chatbot now **fetches and uses patient data** from MongoDB to provide personalized responses based on:

1. **Medical Information** (entered by staff)
   - Patient name, age, gender
   - Medical condition/diagnosis
   - Recovery period and current stage
   - Doctor's notes
   - Prescribed medications
   - Prescription details

2. **Lifestyle Information** (added by patient)
   - Exercise/physiotherapy plan
   - Diet recommendations
   - Personal health goals

## How It Works

### Data Flow

```
┌─────────────────────────────────────────────────────┐
│  Staff Creates Patient Profile in Admin Dashboard   │
│  • Name, Age, Condition                             │
│  • Medications, Prescriptions                       │
│  • Exercise Plan, Diet Plan                         │
│  • Doctor's Notes                                   │
└─────────────────────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────┐
│           Data Saved to MongoDB                      │
│           Collection: "Patients"                     │
└─────────────────────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────┐
│  Patient Logs In → Opens Chat                       │
└─────────────────────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────┐
│  Chatbot Fetches Patient Data from MongoDB          │
│  Using patient_id                                   │
└─────────────────────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────┐
│  Chatbot Generates Personalized Response            │
│  Based on Patient's Medical Profile                 │
└─────────────────────────────────────────────────────┘
```

## Personalized Responses

### 1. **Name & Identity**
**Patient asks:** "What's my name?" or "Who am I?"

**Chatbot responds:**
```
Your name is Anaya. You're 28 years old and currently recovering from 
Fractured Right Femur. How can I help you today?
```

### 2. **Medical Condition**
**Patient asks:** "What's my condition?" or "What's my diagnosis?"

**Chatbot responds:**
```
You're currently being treated for: **Fractured Right Femur**

Recovery Stage: Week 4 - Partial weight bearing
Estimated Recovery Period: 8-12 weeks

**Doctor's Notes:** Patient is responding well to treatment. 
Continue physiotherapy and maintain calcium-rich diet.
```

### 3. **Medications**
**Patient asks:** "What medicines should I take?" or "My prescription?"

**Chatbot responds:**
```
💊 **Your Prescribed Medications:**

1. Ibuprofen 400mg - Twice daily after meals
2. Calcium + Vitamin D3 - Once daily
3. Paracetamol 500mg - As needed for pain

**Prescription Details:**
Dr. Sarah Johnson - Orthopedic Surgeon
Valid until: Dec 15, 2025

⚠️ Take medications as prescribed. Don't skip doses!
```

### 4. **Exercise Plan**
**Patient asks:** "What exercises should I do?"

**Chatbot responds:**
```
💪 **Your Exercise Plan:**

Week 4 Exercises:
1. Ankle pumps - 10 reps, 3 times daily
2. Quad sets - Hold 5 seconds, 10 reps
3. Straight leg raises - 10 reps, 2 times daily
4. Gentle knee bends - 5 reps, twice daily

**Important:**
• Start slowly and gradually increase intensity
• Stop if you feel severe pain
• Follow your physiotherapist's guidance
• Track your progress daily
```

### 5. **Diet Plan**
**Patient asks:** "What should I eat?"

**Chatbot responds:**
```
🥗 **Your Personalized Diet Plan:**

**Breakfast:**
• Milk with oats and almonds
• Boiled eggs
• Fresh orange juice

**Lunch:**
• Grilled chicken/fish
• Brown rice
• Spinach and broccoli
• Yogurt

**Dinner:**
• Lentil soup
• Whole wheat roti
• Mixed vegetables
• Paneer/tofu

**General Tips:**
• Stay hydrated (8-10 glasses of water)
• Eat small, frequent meals
• Avoid processed foods
• Include protein in every meal
```

### 6. **Pain Management**
**Patient asks:** "I'm in pain"

**Chatbot responds:**
```
I understand you're experiencing pain. Here's what you can do:

• Take Ibuprofen 400mg - Twice daily after meals
• Apply ice packs for 15-20 minutes
• Keep the affected area elevated
• Avoid putting weight on it

⚠️ If pain is severe or worsening, please contact your doctor immediately.
```

## Database Schema

### Patient Collection Structure

```javascript
{
  patient_id: "P001",
  name: "Anaya Sharma",
  age: 28,
  gender: "Female",
  condition: "Fractured Right Femur",
  recovery_period: "8-12 weeks",
  current_stage: "Week 4 - Partial weight bearing",
  doctors_notes: "Patient is responding well to treatment...",
  medications: "1. Ibuprofen 400mg - Twice daily\n2. Calcium + Vitamin D3...",
  prescription: "Dr. Sarah Johnson - Orthopedic Surgeon\nValid until: Dec 15, 2025",
  exercises: "Week 4 Exercises:\n1. Ankle pumps - 10 reps...",
  diet: "Breakfast: Milk with oats...",
  created_at: ISODate("2025-11-01T00:00:00Z"),
  updated_at: ISODate("2025-11-04T00:00:00Z")
}
```

## Fallback Mechanism

If MongoDB is not available or patient data is not found:

1. **Try MongoDB first** - Fetch from database
2. **Fallback to localStorage** - Use data sent from frontend
3. **Generic responses** - If no data available, provide general health advice

## Testing the Personalized Chatbot

### Step 1: Create a Patient Profile (Staff Dashboard)
1. Login as staff
2. Go to "Add New Patient"
3. Fill in all details:
   - Name, Age, Gender
   - Medical Condition
   - Medications & Prescriptions
   - Exercise Plan
   - Diet Plan
   - Doctor's Notes

### Step 2: Login as Patient
1. Use the patient ID created by staff
2. Navigate to the chat page

### Step 3: Test Personalized Responses
Try these queries:
- "What's my name?"
- "What's my condition?"
- "What medicines should I take?"
- "What exercises should I do?"
- "What should I eat?"
- "I'm in pain"

## API Endpoint

**POST** `/api/chat`

**Request:**
```json
{
  "patientId": "P001",
  "message": "What's my name?",
  "patientData": {  // Optional fallback if DB unavailable
    "name": "Anaya",
    "age": 28,
    "condition": "Fractured Right Femur"
  }
}
```

**Response:**
```json
{
  "success": true,
  "response": "Your name is Anaya. You're 28 years old...",
  "messageId": 1730745600000
}
```

## Environment Variables

Make sure these are set:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/
GOOGLE_API_KEY=your_google_api_key_here
```

## Benefits

✅ **Personalized Care** - Responses tailored to each patient's condition
✅ **Accurate Information** - Uses actual medical data from staff
✅ **Better Compliance** - Patients get their specific medication/exercise plans
✅ **Reduced Confusion** - No generic advice, only what applies to them
✅ **Improved Recovery** - Patients follow their personalized treatment plan

## Future Enhancements

- 🤖 **AI-Powered Responses** - Use Google Gemini AI for more intelligent conversations
- 📊 **Progress Tracking** - Monitor patient's recovery milestones
- 🔔 **Smart Reminders** - Medication and exercise reminders
- 📈 **Analytics** - Track patient engagement and recovery progress
- 🗣️ **Voice Chat** - Voice-based interaction for better accessibility

---

**Status:** ✅ Fully Implemented and Working!
**Last Updated:** Nov 4, 2025
