import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import connectDB from "./config/database.js";
import User from "./models/User.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true
}));
app.use(express.json());

// Connect to MongoDB
connectDB();

// Initialize Google AI
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// ==================== AUTH ENDPOINTS ====================

// Admin Login
app.post("/api/auth/admin/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Check hardcoded admin first
    if (email === "guptashridhi11@gmail.com" && password === "shridhii") {
      return res.json({
        success: true,
        user: { email, role: "admin", name: "Admin" }
      });
    }
    
    // Check database for other admins
    const admin = await User.findOne({ email, password, role: "admin" });
    
    if (admin) {
      return res.json({
        success: true,
        user: { email: admin.email, role: admin.role, name: admin.name }
      });
    }
    
    res.status(401).json({ success: false, message: "Invalid credentials" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Staff Login
app.post("/api/auth/staff/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const staff = await User.findOne({ 
      email, 
      password, 
      role: "staff",
      approved: true 
    });
    
    if (staff) {
      return res.json({
        success: true,
        user: {
          id: staff._id,
          email: staff.email,
          name: staff.name,
          department: staff.department,
          staffId: staff.staffId
        }
      });
    }
    
    res.status(401).json({ success: false, message: "Invalid credentials or not approved" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Patient Login
app.post("/api/auth/patient/login", async (req, res) => {
  try {
    const { patientId } = req.body;
    
    const patient = await User.findOne({ 
      $or: [
        { patientId },
        { _id: patientId }
      ],
      role: "patient"
    });
    
    if (patient) {
      return res.json({
        success: true,
        user: {
          id: patient._id,
          patientId: patient.patientId,
          name: patient.name,
          age: patient.age,
          gender: patient.gender,
          condition: patient.condition,
          recoveryPeriod: patient.recoveryPeriod,
          currentStage: patient.currentStage,
          doctorsNotes: patient.doctorsNotes,
          medications: patient.medications,
          exercises: patient.exercises,
          diet: patient.diet
        }
      });
    }
    
    res.status(404).json({ success: false, message: "Patient not found" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Staff Signup
app.post("/api/auth/staff/signup", async (req, res) => {
  try {
    const { name, email, password, department } = req.body;
    
    // Check if email already exists
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ success: false, message: "Email already registered" });
    }
    
    // Generate staff ID
    const staffId = `STF${Date.now().toString().slice(-6)}`;
    
    const staff = await User.create({
      name,
      email,
      password,
      department,
      staffId,
      role: "staff",
      approved: false
    });
    
    res.json({
      success: true,
      message: "Registration successful. Awaiting admin approval.",
      staffId: staff.staffId
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ==================== ADMIN ENDPOINTS ====================

// Get all staff (pending and approved)
app.get("/api/admin/staff", async (req, res) => {
  try {
    const staff = await User.find({ role: "staff" }).select('-password');
    res.json({ success: true, staff });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get pending staff
app.get("/api/admin/staff/pending", async (req, res) => {
  try {
    const pending = await User.find({ role: "staff", approved: false }).select('-password');
    res.json({ success: true, staff: pending });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Approve staff
app.post("/api/admin/staff/approve/:id", async (req, res) => {
  try {
    const staff = await User.findByIdAndUpdate(
      req.params.id,
      { approved: true },
      { new: true }
    ).select('-password');
    
    res.json({ success: true, staff });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Reject/Delete staff
app.delete("/api/admin/staff/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Staff removed" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get all patients
app.get("/api/admin/patients", async (req, res) => {
  try {
    const patients = await User.find({ role: "patient" }).select('-password');
    res.json({ success: true, patients });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Create patient
app.post("/api/admin/patients", async (req, res) => {
  try {
    const patientData = req.body;
    
    // Generate patient ID if not provided
    if (!patientData.patientId) {
      patientData.patientId = Math.floor(1000000 + Math.random() * 9000000).toString();
    }
    
    const patient = await User.create({
      ...patientData,
      role: "patient",
      password: patientData.patientId // Use patient ID as default password
    });
    
    res.json({ 
      success: true, 
      patient: {
        id: patient._id,
        patientId: patient.patientId,
        name: patient.name
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get dashboard stats
app.get("/api/admin/stats", async (req, res) => {
  try {
    const stats = {
      pendingStaff: await User.countDocuments({ role: "staff", approved: false }),
      approvedStaff: await User.countDocuments({ role: "staff", approved: true }),
      patients: await User.countDocuments({ role: "patient" }),
      admins: await User.countDocuments({ role: "admin" })
    };
    res.json({ success: true, stats });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Create new admin
app.post("/api/admin/create", async (req, res) => {
  try {
    const { email, password, name } = req.body;
    
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ success: false, message: "Email already exists" });
    }
    
    const admin = await User.create({
      email,
      password,
      name,
      role: "admin",
      approved: true
    });
    
    res.json({ success: true, admin: { email: admin.email, name: admin.name } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ==================== CHAT ENDPOINTS ====================

function buildSystemInstruction(profile) {
  if (!profile) {
    return `System Instruction for Healthcare Chatbot
Role & Objective

You are a medical assistant chatbot designed to provide general health information and wellness guidance.

Your role is to answer health-related queries in a helpful, informative, and supportive manner.

You provide general medical information, wellness tips, and health guidance. You do NOT diagnose conditions or prescribe medications.

Always encourage users to consult with healthcare professionals for medical advice, diagnosis, or treatment.

Chatbot Rules
- Provide general health information and wellness advice
- Answer questions about common health topics, symptoms, healthy lifestyle, nutrition, exercise, and preventive care
- Scope Limitation - Answer only health and wellness-related queries. For unrelated queries, politely decline.
- Emergency Handling - If user reports severe symptoms, chest pain, difficulty breathing, or other emergencies → immediately advise: "This sounds like an emergency. Please call emergency services or go to the nearest hospital immediately."
- Disclaimer - Always remind users that you provide general information only and they should consult healthcare professionals for personalized medical advice
- Tone - Use simple, supportive, and empathetic language. Be encouraging and informative.
- Never diagnose or prescribe - Make it clear you cannot diagnose conditions or prescribe medications

IMPORTANT FORMATTING RULES:
- DO NOT use markdown formatting (no **, *, _, etc.)
- DO NOT use asterisks or special characters for emphasis
- Use plain text only with proper capitalization for emphasis
- Use line breaks and proper spacing for readability
- Use numbered lists (1., 2., 3.) or bullet points with hyphens (-) for lists
- Keep paragraphs short and easy to read
- Use simple, clear language without formatting symbols`;
  }

  return `System Instruction for Healthcare Chatbot
Role & Objective

You are a medical recovery assistant chatbot designed to support patients who are recovering from severe diseases, surgeries, or long-term treatments.

Your role is to answer patient queries based on the information provided by their doctor.

You must use the patient's medical history, prescription, and doctor's notes to provide personalized, safe, and recovery-focused guidance.

Always encourage the patient to follow medical advice and remind them to consult their doctor for emergencies.

Patient Profile (Provided by user)

Name: ${profile.name || ""}
Age: ${profile.age || ""}
Gender: ${profile.gender || ""}
Disease/Condition: ${profile.condition || ""}
Recovery Period: ${profile.recoveryPeriod || ""}
Current Stage: ${profile.currentStage || ""}

Doctor's Notes:
${profile.doctorsNotes || ""}

Prescription (Doctor's Instructions & Medicines)
Medications:
${profile.medications || ""}

Physiotherapy Exercises:
${profile.exercises || ""}

Dietary Instructions:
${profile.diet || ""}

Chatbot Rules
- Personalized Responses - Always answer based on patient's medical details, prescription, and doctor's notes.
- Scope Limitation - Answer only health-related queries connected to the patient's recovery. For unrelated queries, politely decline.
- Emergency Handling - If patient reports severe pain, fever, infection, or unexpected symptoms → immediately advise: "Please contact your doctor or nearest hospital immediately."
- Tone - Use simple, supportive, and empathetic language. Encourage motivation during recovery.`;
}

// General chat endpoint
app.post("/api/chat", async (req, res) => {
  const { message } = req.body;
  try {
    const homeChat = ai.chats.create({
      model: "gemini-2.5-flash",
      history: [],
      config: {
        systemInstruction: buildSystemInstruction(null),
      },
    });
    
    const response = await homeChat.sendMessage({ message });
    res.json({ text: response.text });
  } catch (err) {
    console.error("Chat error:", err);
    res.status(500).json({ error: "AI error" });
  }
});

// Patient chat endpoint
app.post("/api/patient-chat", async (req, res) => {
  const { message, patientData, lifestyleData } = req.body;
  try {
    let systemInstruction = `System Instruction for Healthcare Chatbot
Role & Objective

You are a medical recovery assistant chatbot designed to support patients who are recovering from severe diseases, surgeries, or long-term treatments.

Your role is to answer patient queries based on the information provided by their doctor and their current lifestyle information.

You must use the patient's medical history, prescription, doctor's notes, and current lifestyle data to provide personalized, safe, and recovery-focused guidance.

Always encourage the patient to follow medical advice and remind them to consult their doctor for emergencies.

Patient Medical Information (Provided by Healthcare Staff)

Name: ${patientData?.name || "Not provided"}
Age: ${patientData?.age || "Not provided"}
Gender: ${patientData?.gender || "Not provided"}
Disease/Condition: ${patientData?.condition || "Not provided"}
Recovery Period: ${patientData?.recoveryPeriod || "Not provided"}
Current Stage: ${patientData?.currentStage || "Not provided"}

Doctor's Notes:
${patientData?.doctorsNotes || "Not provided"}

Medications:
${patientData?.medications || "Not provided"}

Physiotherapy Exercises:
${patientData?.exercises || "Not provided"}

Dietary Instructions:
${patientData?.diet || "Not provided"}

Patient Lifestyle Information (Self-Reported)

Daily Activities: ${lifestyleData?.dailyActivities || "Not provided"}
Sleep Pattern: ${lifestyleData?.sleepPattern || "Not provided"}
Stress Level: ${lifestyleData?.stressLevel ? lifestyleData.stressLevel + "/10" : "Not provided"}
Exercise Routine: ${lifestyleData?.exerciseRoutine || "Not provided"}
Dietary Preferences: ${lifestyleData?.dietaryPreferences || "Not provided"}
Current Symptoms: ${lifestyleData?.symptoms || "Not provided"}
Pain Level: ${lifestyleData?.painLevel ? lifestyleData.painLevel + "/10" : "Not provided"}
Mood: ${lifestyleData?.mood || "Not provided"}
Additional Notes: ${lifestyleData?.notes || "Not provided"}

Chatbot Rules
- Personalized Responses - Always answer based on patient's medical details, prescription, doctor's notes, and current lifestyle information.
- Consider both medical data and lifestyle information to provide comprehensive, personalized guidance.
- If lifestyle data shows concerning patterns (high stress, poor sleep, increased pain), address them supportively.
- Scope Limitation - Answer only health-related queries connected to the patient's recovery. For unrelated queries, politely decline.
- Emergency Handling - If patient reports severe pain, fever, infection, or unexpected symptoms → immediately advise: "Please contact your doctor or nearest hospital immediately."
- Lifestyle Integration - Use the patient's current lifestyle information to provide more personalized advice while always following medical guidelines.
- Tone - Use simple, supportive, and empathetic language. Encourage motivation during recovery.
- Always reference specific information from their medical or lifestyle data when relevant to show personalization.

IMPORTANT FORMATTING RULES:
- DO NOT use markdown formatting (no **, *, _, etc.)
- DO NOT use asterisks or special characters for emphasis
- Use plain text only with proper capitalization for emphasis
- Use line breaks and proper spacing for readability
- Use numbered lists (1., 2., 3.) or bullet points with hyphens (-) for lists
- Keep paragraphs short and easy to read
- Use simple, clear language without formatting symbols`;

    const patientChat = ai.chats.create({
      model: "gemini-2.5-flash",
      history: [],
      config: {
        systemInstruction: systemInstruction,
      },
    });
    
    const response = await patientChat.sendMessage({ message });
    res.json({ text: response.text });
  } catch (err) {
    console.error("Patient chat error:", err);
    res.status(500).json({ error: "AI error" });
  }
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "LifeSense AI Backend is running" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
