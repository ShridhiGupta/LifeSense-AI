const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const { GoogleGenAI } = require('@google/genai');

const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const pool = new Pool({
  connectionString: 'your_local_postgres_connection_string',
  ssl: false
});

// Initialize Google AI
const ai = new GoogleGenAI({
  apiKey: 'AIzaSyCzMGZRs6SvSN0msMQCWyLMb4xaiTdPh_0'
});

// Initialize database tables
async function initDB() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS patients (
        id SERIAL PRIMARY KEY,
        patient_id VARCHAR(50) UNIQUE NOT NULL,
        name VARCHAR(100) NOT NULL,
        age VARCHAR(20),
        gender VARCHAR(20),
        condition TEXT,
        recovery_period TEXT,
        current_stage TEXT,
        doctors_notes TEXT,
        medications TEXT,
        prescription TEXT,
        exercises TEXT,
        diet TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS chat_messages (
        id SERIAL PRIMARY KEY,
        patient_id VARCHAR(50) NOT NULL,
        sender VARCHAR(20) NOT NULL,
        message TEXT NOT NULL,
        timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (patient_id) REFERENCES patients(patient_id) ON DELETE CASCADE
      );
    `);

    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
}

// Initialize database
initDB();

// API Routes
app.post('/api/profile', async (req, res) => {
  try {
    const patientProfile = req.body;
    const result = await pool.query(
      `INSERT INTO patients (
        patient_id, name, age, gender, condition, recovery_period, 
        current_stage, doctors_notes, medications, prescription, exercises, diet
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      ON CONFLICT (patient_id) 
      DO UPDATE SET 
        name = EXCLUDED.name,
        age = EXCLUDED.age,
        gender = EXCLUDED.gender,
        condition = EXCLUDED.condition,
        recovery_period = EXCLUDED.recovery_period,
        current_stage = EXCLUDED.current_stage,
        doctors_notes = EXCLUDED.doctors_notes,
        medications = EXCLUDED.medications,
        prescription = EXCLUDED.prescription,
        exercises = EXCLUDED.exercises,
        diet = EXCLUDED.diet
      RETURNING *`,
      [
        patientProfile.patientId,
        patientProfile.name,
        patientProfile.age,
        patientProfile.gender,
        patientProfile.condition,
        patientProfile.recoveryPeriod,
        patientProfile.currentStage,
        patientProfile.doctorsNotes,
        patientProfile.medications,
        patientProfile.prescription,
        patientProfile.exercises,
        patientProfile.diet
      ]
    );
    
    res.json({ 
      message: 'Profile saved successfully', 
      profile: result.rows[0] 
    });
  } catch (error) {
    console.error('Error saving profile:', error);
    res.status(500).json({ error: 'Failed to save profile' });
  }
});

app.post('/api/chat', async (req, res) => {
  try {
    const { message, patientId } = req.body;
    
    if (!patientId) {
      return res.status(400).json({ error: 'Patient ID is required' });
    }

    // Save user message to database
    await pool.query(
      'INSERT INTO chat_messages (patient_id, sender, message) VALUES ($1, $2, $3)',
      [patientId, 'user', message]
    );
    
    // Get chat history for context
    const chatHistory = await pool.query(
      'SELECT * FROM chat_messages WHERE patient_id = $1 ORDER BY timestamp DESC LIMIT 10',
      [patientId]
    );

    // Process with Google's AI
    const model = ai.chats.create({
      model: "gemini-2.5-flash",
      systemInstruction: "You are a helpful healthcare assistant.",
    });
    
    const response = await model.sendMessage(message);
    const botResponse = response.text();
    
    // Save bot response to database
    await pool.query(
      'INSERT INTO chat_messages (patient_id, sender, message) VALUES ($1, $2, $3)',
      [patientId, 'bot', botResponse]
    );
    
    res.json({ 
      response: botResponse,
      messageId: Date.now()
    });
  } catch (error) {
    console.error('Error in chat:', error);
    res.status(500).json({ error: 'Failed to process message' });
  }
});

app.get('/api/patient', async (req, res) => {
  try {
    const { patientId } = req.query;
    
    if (!patientId) {
      return res.status(400).json({ error: 'Patient ID is required' });
    }

    const result = await pool.query(
      'SELECT * FROM patients WHERE patient_id = $1',
      [patientId]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Patient not found' });
    }
    
    res.json({ patient: result.rows[0] });
  } catch (error) {
    console.error('Error fetching patient:', error);
    res.status(500).json({ error: 'Failed to fetch patient data' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
