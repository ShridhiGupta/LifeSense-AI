const { GoogleGenAI } = require("@google/genai");
const { db, patients, chatMessages, client } = require('./db');

exports.handler = async (event, context) => {
  // Enable CORS for all requests
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Content-Type': 'application/json',
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: 'CORS preflight successful' }),
    };
  }

  // Parse the request body
  let requestBody;
  try {
    if (event.body) {
      requestBody = JSON.parse(event.body);
    }
  } catch (e) {
    requestBody = {};
  }

  try {
    // For all requests to this function, handle based on the action parameter
    const { action, patientId, message, patientData } = requestBody;
    const queryParams = event.queryStringParameters || {};
    const queryAction = queryParams.action;

    console.log('Request:', { action, queryAction, patientId, message });

    // Handle patient profile saving (when action is 'saveProfile' or no action but has patientData)
    if (action === 'saveProfile' || (patientData && !action)) {
      const data = patientData || requestBody;
      
      // Save profile to MongoDB
      const result = await patients().findOneAndUpdate(
        { patient_id: data.patientId },
        { $set: {
            patient_id: data.patientId,
            name: data.name,
            age: data.age,
            gender: data.gender,
            condition: data.condition,
            recovery_period: data.recoveryPeriod,
            current_stage: data.currentStage,
            doctors_notes: data.doctorsNotes,
            medications: data.medications,
            prescription: data.prescription,
            exercises: data.exercises,
            diet: data.diet,
            updated_at: new Date()
          }
        },
        { upsert: true, returnDocument: 'after' }
      );
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ 
          success: true,
          message: 'Profile saved successfully', 
          profile: result
        }),
      };
    }
    
    // Handle chat messages (when action is 'chat' or has message)
    if (action === 'chat' || message) {
      // Check if Google API key is available
      if (!process.env.GOOGLE_API_KEY && !'AIzaSyCzMGZRs6SvSN0msMQCWyLMb4xaiTdPh_0') {
        return {
          statusCode: 500,
          headers,
          body: JSON.stringify({ 
            success: false,
            error: 'Google API key not configured' 
          }),
        };
      }
      
      if (!patientId) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ 
            success: false,
            error: 'Patient ID is required' 
          }),
        };
      }

      // Save user message to database
      const userMessage = {
        patient_id: patientId,
        sender: 'user',
        message: message,
        timestamp: new Date()
      };
      await chatMessages().insertOne(userMessage);
      
      // Simple response without AI for now to test
      const botResponse = `I've received your message: "${message}". This is a test response from the healthcare assistant.`;
      
      // Save bot response to database
      const botMessage = {
        patient_id: patientId,
        sender: 'bot',
        message: botResponse,
        timestamp: new Date()
      };
      await chatMessages().insertOne(botMessage);
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ 
          success: true,
          response: botResponse,
          messageId: Date.now()
        }),
      };
    }
    
    // Get patient data (when action is 'getPatient' or queryAction is 'getPatient')
    if (action === 'getPatient' || queryAction === 'getPatient') {
      const id = patientId || queryParams.patientId;
      
      if (!id) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ 
            success: false,
            error: 'Patient ID is required' 
          }),
        };
      }

      const patient = await patients().findOne({ patient_id: id });
      
      if (!patient) {
        return {
          statusCode: 404,
          headers,
          body: JSON.stringify({ 
            success: false,
            error: 'Patient not found' 
          }),
        };
      }
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ 
          success: true,
          patient: patient 
        }),
      };
    }
    
    // Simple test endpoint
    if (action === 'test' || queryAction === 'test') {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ 
          success: true,
          message: 'API is working correctly',
          timestamp: new Date().toISOString()
        }),
      };
    }
    
    // Default response
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        success: true,
        message: 'LifeSense AI API is running. Use action parameter to specify operation.',
        availableActions: ['saveProfile', 'chat', 'getPatient', 'test']
      }),
    };
    
  } catch (error) {
    console.error('API Error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        success: false,
        error: 'Internal server error',
        message: error.message 
      }),
    };
  }
};