import express from 'express';
import cors from 'cors';
import { GoogleGenAI } from '@google/genai';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 3001;

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI;
let db = null;
let mongoClient = null;

// Collection references
let patientsCollection = null;
let adminCollection = null;
let staffCollection = null;
let chatMessagesCollection = null;

// Connect to MongoDB
async function connectToDatabase() {
  try {
    mongoClient = new MongoClient(MONGODB_URI);
    await mongoClient.connect();
    db = mongoClient.db("LifeSenseAI");
    
    // Initialize all collections
    patientsCollection = db.collection("Patients");
    adminCollection = db.collection("Admin");
    staffCollection = db.collection("Staff");
    chatMessagesCollection = db.collection("ChatMessages");
    
    console.log("✅ Connected to MongoDB - LifeSenseAI database");
    
    // List all available collections
    const collections = await db.listCollections().toArray();
    console.log("📋 Available collections:", collections.map(c => c.name).join(', '));
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    console.log("⚠️ Running without database - using fallback responses");
  }
}

// Initialize database connection
connectToDatabase();

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Google AI
const ai = new GoogleGenAI({
  apiKey: 'AIzaSyCzMGZRs6SvSN0msMQCWyLMb4xaiTdPh_0'
});

// Simple API Routes (minimal setup)
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

// Comprehensive Healthcare System Instruction
const HEALTHCARE_SYSTEM_INSTRUCTION = `Role & Objective

You are a comprehensive medical assistant chatbot designed to provide healthcare information and support to all users. Your role is to deliver accurate, evidence-based medical information to help people understand health conditions, treatment options, and wellness practices.

Core Responsibilities:
- Answer general medical and health-related questions
- Provide information about diseases, symptoms, and treatments
- Suggest healthy lifestyle practices and preventive care measures
- Explain medications and their uses
- Offer guidance on when to seek professional medical help
- Support patients recovering from surgeries or illnesses
- Provide wellness and nutrition advice

Important Guidelines:

1. Accuracy & Evidence-Based Information
- Provide responses based on medical research and professional guidelines
- Always cite reliable sources when applicable
- Be honest about the limitations of medical knowledge

2. Personalization
- Adapt responses based on user's age, gender, medical history, and specific conditions when provided
- Ask clarifying questions to understand the user's situation better
- Provide tailored advice based on individual health profiles

3. Safety & Emergency Handling
- CRITICAL: If a user reports severe symptoms (chest pain, difficulty breathing, severe bleeding, loss of consciousness, severe allergic reactions, etc.) → immediately advise: "Please seek emergency medical care immediately by calling emergency services or visiting the nearest hospital."
- For potentially serious but non-emergency symptoms, recommend consulting a healthcare professional
- Never delay emergency advice

4. Scope & Limitations
- Provide health information and guidance, NOT formal medical diagnosis
- Make clear that you are NOT a substitute for professional medical consultation
- Encourage users to consult licensed healthcare professionals for diagnosis and treatment planning
- Respect when a query is outside medical scope and politely redirect

5. Tone & Communication
- Use simple, clear, non-technical language (unless user demonstrates medical knowledge)
- Be empathetic, supportive, and non-judgmental
- Show genuine concern for user's wellbeing
- Avoid being alarmist while maintaining appropriate caution
- Encourage healthy lifestyle choices and preventive care

6. Privacy & Confidentiality
- Treat all user information with confidentiality
- Never store or misuse personal health information
- Explain data privacy policies when asked`;

// Chat API endpoint - handles both general and patient-specific chats
app.post('/api/chat', async (req, res) => {
  const { patientId, message, action } = req.body;
  
  if (!message) {
    return res.status(400).json({ 
      success: false, 
      error: 'Message is required' 
    });
  }
  
  if (!patientId) {
    return res.status(400).json({ 
      success: false, 
      error: 'Patient ID is required' 
    });
  }
  
  const isGeneralChat = patientId === 'general';
  
  let botResponse = '';
  
  if (isGeneralChat) {
    // General healthcare chatbot - Use Google AI with comprehensive system instruction
    console.log('📝 Processing general chat message:', message);
    try {
      console.log('🤖 Initializing Google AI model...');
      const model = ai.getGenerativeModel({ 
        model: 'gemini-1.5-flash',
        systemInstruction: HEALTHCARE_SYSTEM_INSTRUCTION
      });
      
      console.log('📤 Sending message to Google AI...');
      const result = await model.generateContent(message);
      const response = await result.response;
      botResponse = response.text();
      
      console.log('✅ AI Response generated for general chat');
      console.log('📨 Response preview:', botResponse.substring(0, 100) + '...');
    } catch (error) {
      console.error('❌ Error calling Google AI:', error.message);
      console.error('Full error:', error);
      // Fallback to rule-based responses if AI fails
      console.log('⚠️ Using fallback rule-based responses');
      const lowerMessage = message.toLowerCase();
      
      // Emotional support keywords
      if (lowerMessage.includes('anxious') || lowerMessage.includes('anxiety') || lowerMessage.includes('worried') || 
          lowerMessage.includes('stress') || lowerMessage.includes('nervous') || lowerMessage.includes('scared') ||
          lowerMessage.includes('fear') || lowerMessage.includes('panic')) {
        botResponse = "💙 I understand you're feeling anxious. It's completely normal to have these feelings.\n\nHere are some techniques that can help:\n\n• **Deep Breathing**: Try the 4-7-8 method (inhale for 4, hold for 7, exhale for 8)\n• **Grounding Exercise**: Name 5 things you see, 4 you can touch, 3 you hear, 2 you smell, 1 you taste\n• **Physical Activity**: Even a short walk can help reduce anxiety\n• **Talk to Someone**: Reach out to a friend, family member, or counselor\n• **Mindfulness**: Focus on the present moment\n\n⚠️ If anxiety is severe or persistent, please speak with a mental health professional. For immediate crisis support, contact a crisis helpline.\n\nWould you like to talk more about what's making you feel anxious?";
      } else if (lowerMessage.includes('sad') || lowerMessage.includes('depressed') || lowerMessage.includes('depression') ||
                 lowerMessage.includes('down') || lowerMessage.includes('low') || lowerMessage.includes('unhappy')) {
        botResponse = "💙 I'm sorry you're feeling this way. Your feelings are valid and it's important to acknowledge them.\n\nHere are some suggestions:\n\n• **Reach Out**: Talk to someone you trust - friend, family, or therapist\n• **Self-Care**: Do something kind for yourself today\n• **Physical Activity**: Exercise can boost mood naturally\n• **Routine**: Try to maintain a regular sleep and eating schedule\n• **Small Goals**: Set achievable daily goals to build momentum\n\n⚠️ If you're experiencing persistent sadness or thoughts of self-harm, please contact a mental health professional immediately.\n\n**Crisis Resources:**\n• National Suicide Prevention Lifeline: Available 24/7\n• Crisis Text Line: Text for support\n\nYou don't have to go through this alone. Would you like to talk more?";
      } else if (lowerMessage.includes('pain') || lowerMessage.includes('hurt') || lowerMessage.includes('ache') ||
                 lowerMessage.includes('sore')) {
        botResponse = "🩺 I understand you're experiencing pain. Here's what you can do:\n\n**Immediate Relief:**\n• Apply ice packs for 15-20 minutes (for acute pain/swelling)\n• Use heat therapy (for muscle aches)\n• Rest the affected area\n• Elevate if possible\n• Take over-the-counter pain relief as directed\n\n**When to Seek Medical Help:**\n⚠️ Contact a doctor if:\n• Pain is severe or worsening\n• Pain persists for more than a few days\n• You have fever, swelling, or redness\n• You experience numbness or tingling\n• Pain follows an injury\n\n🚨 **Emergency**: If you have chest pain, difficulty breathing, or severe abdominal pain, call emergency services immediately.\n\nCan you tell me more about the type and location of your pain?";
      } else if (lowerMessage.includes('recovery') || lowerMessage.includes('exercise') || lowerMessage.includes('healing')) {
        botResponse = "🧘‍♀️ Recovery is a journey! Here are some tips:\n\n• Get adequate rest (7-8 hours daily)\n• Follow prescribed exercises regularly\n• Stay hydrated - drink 8-10 glasses of water\n• Maintain a positive mindset\n• Track your progress\n• Don't rush - healing takes time\n\nFor personalized guidance, please login to your account.";
      } else if (lowerMessage.includes('diet') || lowerMessage.includes('food') || lowerMessage.includes('nutrition') ||
                 lowerMessage.includes('eat')) {
        botResponse = "🥗 A healthy diet is crucial for recovery and wellness! Consider:\n\n**Protein-rich foods:**\n• Eggs, chicken, fish, lentils, beans\n\n**Calcium sources:**\n• Milk, yogurt, cheese, leafy greens\n\n**Vitamins:**\n• Vitamin C: Citrus fruits, berries, bell peppers\n• Vitamin D: Fatty fish, fortified foods, sunlight\n\n**Whole grains:**\n• Brown rice, oats, quinoa, whole wheat\n\n**Hydration:**\n• Drink 8-10 glasses of water daily\n\n**Avoid:**\n• Processed foods, excessive sugar, alcohol\n\nFor a personalized meal plan, login to your patient dashboard.";
      } else if (lowerMessage.includes('medicine') || lowerMessage.includes('medication') || lowerMessage.includes('drug') ||
                 lowerMessage.includes('prescription')) {
        botResponse = "💊 For accurate medicine information:\n\n1. Login to your account to view prescribed medications\n2. Check dosage schedules and instructions\n3. Review potential side effects\n4. See drug interactions\n\n**General Medication Tips:**\n• Take medications at the same time daily\n• Don't skip doses\n• Complete the full course (especially antibiotics)\n• Store medications properly\n• Report side effects to your doctor\n\n⚠️ Never take someone else's medication or share yours.\n\nWould you like me to guide you to the login page?";
      } else if (lowerMessage.includes('sleep') || lowerMessage.includes('insomnia') || lowerMessage.includes('tired') ||
                 lowerMessage.includes('fatigue')) {
        botResponse = "😴 Quality sleep is essential for health and recovery!\n\n**Sleep Hygiene Tips:**\n• Aim for 7-8 hours nightly\n• Keep a consistent sleep schedule\n• Create a dark, cool, quiet environment\n• Avoid screens 1 hour before bed\n• Limit caffeine after 2 PM\n• Avoid heavy meals before bedtime\n• Try relaxation techniques (meditation, deep breathing)\n\n**If Sleep Problems Persist:**\n• Keep a sleep diary\n• Consult your doctor\n• Consider cognitive behavioral therapy for insomnia\n\n⚠️ Chronic sleep issues can affect physical and mental health. Don't hesitate to seek professional help.\n\nAre you having trouble falling asleep or staying asleep?";
      } else if (lowerMessage.includes('appointment') || lowerMessage.includes('doctor') || lowerMessage.includes('schedule')) {
        botResponse = "📅 **Managing Your Healthcare Appointments:**\n\n**To schedule or view appointments:**\n1. Login to your patient account\n2. Navigate to the appointments section\n3. View upcoming appointments or schedule new ones\n\n**Before Your Appointment:**\n• List your symptoms and questions\n• Bring current medications list\n• Note any changes in your health\n• Bring insurance information\n\n**Telehealth Options:**\nMany appointments can now be done virtually for your convenience.\n\nWould you like me to guide you to the login page?";
      } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey') ||
                 lowerMessage.includes('greet')) {
        botResponse = "👋 Hello! I'm LifeSense AI, your comprehensive medical assistant.\n\nI can help you with:\n• General medical and health-related questions\n• Information about diseases, symptoms, and treatments\n• Healthy lifestyle practices and preventive care\n• Medication information and uses\n• Guidance on when to seek professional medical help\n• Recovery support for surgeries or illnesses\n• Wellness and nutrition advice\n• Emotional support and mental health resources\n\n⚠️ Important: I provide health information and guidance, but I am NOT a substitute for professional medical consultation. For emergencies, please call emergency services immediately.\n\nHow can I assist you today?";
      } else {
        botResponse = "👋 Hello! I'm LifeSense AI, your comprehensive medical assistant.\n\nI can help you with:\n• Recovery guidance and exercises\n• Dietary recommendations and nutrition\n• Medicine information and reminders\n• Appointment scheduling\n• Emotional support and mental health\n• Pain management tips\n• Sleep and wellness advice\n• General health questions\n\nFor personalized assistance based on your medical history, please login to your account.\n\nWhat would you like to know about?";
      }
    }
  } else {
    // Patient-specific chatbot response - fetch patient data first
    let patientData = null;
    
    // Try to get patient data from MongoDB
    if (patientsCollection) {
      try {
        patientData = await patientsCollection.findOne({ patient_id: patientId });
        console.log('Patient data found:', patientData ? 'Yes' : 'No');
      } catch (error) {
        console.error('Error fetching patient data:', error.message);
      }
    }
    
    // If no database, try localStorage data (sent from frontend)
    if (!patientData && req.body.patientData) {
      patientData = req.body.patientData;
    }
    
    const lowerMessage = message.toLowerCase();
    
    // Personalized responses using patient data
    if (lowerMessage.includes('name') || lowerMessage.includes('who am i')) {
      if (patientData && patientData.name) {
        botResponse = `Your name is ${patientData.name}. You're ${patientData.age} years old and currently recovering from ${patientData.condition || 'your condition'}. How can I help you today?`;
      } else {
        botResponse = "I don't have access to your profile information right now. Please make sure you're logged in correctly.";
      }
    } else if (lowerMessage.includes('condition') || lowerMessage.includes('diagnosis')) {
      if (patientData && patientData.condition) {
        botResponse = `You're currently being treated for: **${patientData.condition}**\n\nRecovery Stage: ${patientData.current_stage || 'In progress'}\nEstimated Recovery Period: ${patientData.recovery_period || 'As advised by doctor'}\n\n${patientData.doctors_notes ? '**Doctor\'s Notes:** ' + patientData.doctors_notes : ''}`;
      } else {
        botResponse = "I don't have your medical condition information. Please check your profile or contact your healthcare provider.";
      }
    } else if (lowerMessage.includes('medicine') || lowerMessage.includes('medication') || lowerMessage.includes('prescription')) {
      if (patientData && patientData.medications) {
        botResponse = `💊 **Your Prescribed Medications:**\n\n${patientData.medications}\n\n${patientData.prescription ? '**Prescription Details:**\n' + patientData.prescription : ''}\n\n⚠️ Take medications as prescribed. Don't skip doses!`;
      } else {
        botResponse = "I don't have your medication information. Please check your profile or contact your doctor.";
      }
    } else if (lowerMessage.includes('exercise') || lowerMessage.includes('physiotherapy') || lowerMessage.includes('workout')) {
      if (patientData && patientData.exercises) {
        botResponse = `💪 **Your Exercise Plan:**\n\n${patientData.exercises}\n\n**Important:**\n• Start slowly and gradually increase intensity\n• Stop if you feel severe pain\n• Follow your physiotherapist's guidance\n• Track your progress daily`;
      } else {
        botResponse = "I don't have your specific exercise plan. Please consult your physiotherapist or check your profile for personalized exercises.";
      }
    } else if (lowerMessage.includes('diet') || lowerMessage.includes('food') || lowerMessage.includes('eat') || lowerMessage.includes('meal')) {
      if (patientData && patientData.diet) {
        botResponse = `🥗 **Your Personalized Diet Plan:**\n\n${patientData.diet}\n\n**General Tips:**\n• Stay hydrated (8-10 glasses of water)\n• Eat small, frequent meals\n• Avoid processed foods\n• Include protein in every meal`;
      } else {
        botResponse = "I don't have your specific diet plan. For personalized nutrition advice, please consult your dietitian or check your profile.";
      }
    } else if (lowerMessage.includes('pain') || lowerMessage.includes('hurt')) {
      const meds = patientData?.medications || 'your prescribed pain medication';
      botResponse = `I understand you're experiencing pain. Here's what you can do:\n\n• Take ${meds}\n• Apply ice packs for 15-20 minutes\n• Keep the affected area elevated\n• Avoid putting weight on it\n\n⚠️ If pain is severe or worsening, please contact your doctor immediately.`;
    } else if (lowerMessage.includes('exercise') || lowerMessage.includes('physiotherapy')) {
      botResponse = "Great that you're thinking about exercises! 💪\n\nBased on typical recovery protocols:\n• Start with gentle range-of-motion exercises\n• Follow your physiotherapist's instructions\n• Don't push through severe pain\n• Gradually increase intensity\n\nFor your specific exercise plan, check your profile or consult your physiotherapist.";
    } else if (lowerMessage.includes('diet') || lowerMessage.includes('food') || lowerMessage.includes('eat')) {
      botResponse = "Nutrition is key to recovery! 🥗\n\n**Recommended foods:**\n• Protein: Chicken, fish, eggs, lentils\n• Calcium: Dairy, leafy greens, almonds\n• Vitamin D: Fatty fish, fortified foods\n• Vitamin C: Citrus fruits, berries\n\n**Avoid:**\n• Excessive sugar and processed foods\n• Alcohol\n• Smoking\n\nStay hydrated with 8-10 glasses of water daily!";
    } else if (lowerMessage.includes('medicine') || lowerMessage.includes('medication')) {
      botResponse = "For your medication information:\n\n1. Check your profile for prescribed medications\n2. Take medicines at the scheduled times\n3. Don't skip doses\n4. Report any side effects to your doctor\n\n💊 Need a reminder? I can help you set up medication alerts!";
    } else if (lowerMessage.includes('appointment') || lowerMessage.includes('doctor')) {
      botResponse = "To manage your appointments:\n\n1. Check your profile for upcoming appointments\n2. Contact your doctor if you need to reschedule\n3. Prepare questions before your visit\n\nWould you like me to help you schedule a follow-up?";
    } else if (lowerMessage.includes('anxious') || lowerMessage.includes('worried') || lowerMessage.includes('stress')) {
      botResponse = "It's completely normal to feel anxious during recovery. 💙\n\n**Try these techniques:**\n• Deep breathing exercises (4-7-8 method)\n• Light meditation or mindfulness\n• Talk to loved ones\n• Focus on small daily achievements\n• Listen to calming music\n\nRemember: You're making progress every day! If anxiety persists, please speak with your healthcare provider.";
    } else if (lowerMessage.includes('sleep') || lowerMessage.includes('rest')) {
      botResponse = "Quality sleep is essential for healing! 😴\n\n**Sleep tips:**\n• Aim for 7-8 hours nightly\n• Keep a consistent sleep schedule\n• Elevate the injured area if needed\n• Avoid screens 1 hour before bed\n• Create a comfortable environment\n\nIf pain is disrupting sleep, consult your doctor about adjusting medication timing.";
    } else {
      if (patientData && patientData.name) {
        botResponse = `Hello ${patientData.name}! 👋 I'm here to help with your recovery from ${patientData.condition || 'your condition'}.\n\nI can assist you with:\n• Your medications and prescriptions\n• Your exercise plan\n• Your diet recommendations\n• Pain management\n• Recovery progress\n• Emotional support\n\nWhat would you like to know about?`;
      } else {
        botResponse = `I'm here to help with your recovery! I can assist you with:\n\n• Pain management tips\n• Exercise and physiotherapy guidance\n• Dietary recommendations\n• Medication reminders\n• Appointment scheduling\n• Emotional support\n\nWhat would you like to know about?`;
      }
    }
  }
  
  // Save chat messages to database if connected
  if (chatMessagesCollection) {
    try {
      // Save user message
      await chatMessagesCollection.insertOne({
        patient_id: patientId,
        sender: 'user',
        message: message,
        timestamp: new Date()
      });
      
      // Save bot response
      await chatMessagesCollection.insertOne({
        patient_id: patientId,
        sender: 'bot',
        message: botResponse,
        timestamp: new Date()
      });
      
      console.log('💬 Chat messages saved to database');
    } catch (error) {
      console.error('Error saving chat messages:', error.message);
    }
  }
  
  console.log('📤 Sending response to client. Response length:', botResponse.length);
  console.log('Response type:', isGeneralChat ? 'General Chat (AI)' : 'Patient-Specific');
  
  res.json({
    success: true,
    response: botResponse,
    messageId: Date.now()
  });
});

// Get patient data by ID
app.get('/api/patient/:patientId', async (req, res) => {
  const { patientId } = req.params;
  
  if (!patientsCollection) {
    return res.status(503).json({ 
      success: false, 
      error: 'Database not connected' 
    });
  }
  
  try {
    const patient = await patientsCollection.findOne({ patient_id: patientId });
    
    if (!patient) {
      return res.status(404).json({ 
        success: false, 
        error: 'Patient not found' 
      });
    }
    
    res.json({ 
      success: true, 
      patient: patient 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Get all patients (for staff/admin)
app.get('/api/patients', async (req, res) => {
  if (!patientsCollection) {
    return res.status(503).json({ 
      success: false, 
      error: 'Database not connected' 
    });
  }
  
  try {
    const patients = await patientsCollection.find().toArray();
    res.json({ 
      success: true, 
      count: patients.length,
      patients: patients 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Get chat history for a patient
app.get('/api/chat-history/:patientId', async (req, res) => {
  const { patientId } = req.params;
  
  if (!chatMessagesCollection) {
    return res.status(503).json({ 
      success: false, 
      error: 'Database not connected' 
    });
  }
  
  try {
    const messages = await chatMessagesCollection
      .find({ patient_id: patientId })
      .sort({ timestamp: 1 })
      .toArray();
    
    res.json({ 
      success: true, 
      count: messages.length,
      messages: messages 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Get all collections info
app.get('/api/collections', async (req, res) => {
  if (!db) {
    return res.status(503).json({ 
      success: false, 
      error: 'Database not connected' 
    });
  }
  
  try {
    const collections = await db.listCollections().toArray();
    const collectionInfo = [];
    
    for (const col of collections) {
      const count = await db.collection(col.name).countDocuments();
      collectionInfo.push({
        name: col.name,
        documentCount: count
      });
    }
    
    res.json({ 
      success: true, 
      database: 'LifeSenseAI',
      collections: collectionInfo 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Start server
app.listen(port, () => {
  console.log(`✅ LifeSense AI Server running at http://localhost:${port}`);
  console.log(`📡 API endpoints:`);
  console.log(`   - GET  /api/health`);
  console.log(`   - POST /api/chat`);
  console.log(`   - GET  /api/patient/:patientId`);
  console.log(`   - GET  /api/patients`);
  console.log(`   - GET  /api/chat-history/:patientId`);
  console.log(`   - GET  /api/collections`);
});
