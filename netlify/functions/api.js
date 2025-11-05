const { GoogleGenAI } = require("@google/genai");
const { connectToDatabase, patients, chatMessages } = require('./db');

exports.handler = async (event, context) => {
  // Connect to database
  try {
    await connectToDatabase();
  } catch (dbError) {
    console.error('Database connection error:', dbError);
    // Continue without database - use fallback responses
  }
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

      const isGeneralChat = patientId === 'general';
      let botResponse = '';

      if (isGeneralChat) {
        // General homepage chatbot responses
        const lowerMessage = message.toLowerCase();
        
        if (lowerMessage.includes('recovery') || lowerMessage.includes('exercise')) {
          botResponse = "🧘‍♀️ Recovery is a journey! Here are some tips:\n\n• Get adequate rest (7-8 hours daily)\n• Follow prescribed exercises regularly\n• Stay hydrated\n• Maintain a positive mindset\n\nFor personalized guidance, please login to your account.";
        } else if (lowerMessage.includes('diet') || lowerMessage.includes('food')) {
          botResponse = "🥗 A healthy diet is crucial for recovery! Consider:\n\n• Protein-rich foods (eggs, chicken, fish)\n• Calcium sources (milk, yogurt, leafy greens)\n• Vitamin C (citrus fruits, berries)\n• Whole grains\n\nFor a personalized meal plan, login to your patient dashboard.";
        } else if (lowerMessage.includes('medicine') || lowerMessage.includes('medication')) {
          botResponse = "💊 For accurate medicine information:\n\n1. Login to your account\n2. Check your prescribed medications\n3. View dosage and precautions\n4. See side effects and interactions\n\nWould you like me to guide you to the login page?";
        } else {
          botResponse = "👋 Hello! I'm LifeSense AI. I can help you with:\n\n• Recovery guidance\n• Dietary recommendations\n• Medicine information\n• Appointment scheduling\n• Emotional support\n\nFor personalized assistance, please login to your account.";
        }
      } else {
        // Patient-specific chatbot response - use patientData from request
        let patientData = requestBody.patientData;
        
        // If no patientData in request, try to get from MongoDB
        if (!patientData) {
          try {
            patientData = await patients().findOne({ patient_id: patientId });
            console.log('Patient data found in database:', patientData ? 'Yes' : 'No');
          } catch (error) {
            console.error('Error fetching patient data from database:', error.message);
          }
        } else {
          console.log('Using patient data from request');
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
            botResponse = `You're currently being treated for: ${patientData.condition}\n\nRecovery Stage: ${patientData.current_stage || 'In progress'}\nEstimated Recovery Period: ${patientData.recovery_period || 'As advised by doctor'}\n\n${patientData.doctors_notes ? 'Doctor\'s Notes: ' + patientData.doctors_notes : ''}`;
          } else {
            botResponse = "I don't have your medical condition information. Please check your profile or contact your healthcare provider.";
          }
        } else if (lowerMessage.includes('medicine') || lowerMessage.includes('medication') || lowerMessage.includes('prescription')) {
          if (patientData && patientData.medications) {
            let medResponse = '💊 Your Prescribed Medications:\n\n' + patientData.medications;
            if (patientData.prescription) {
              medResponse += '\n\nPrescription Details:\n' + patientData.prescription;
            }
            medResponse += '\n\n⚠️ Take medications as prescribed. Don\'t skip doses!';
            botResponse = medResponse;
          } else {
            botResponse = "I don't have your medication information. Please check your profile or contact your doctor.";
          }
        } else if (lowerMessage.includes('exercise') || lowerMessage.includes('physiotherapy') || lowerMessage.includes('workout')) {
          if (patientData && patientData.exercises) {
            botResponse = '💪 Your Exercise Plan:\n\n' + patientData.exercises + '\n\nImportant:\n• Start slowly and gradually increase intensity\n• Stop if you feel severe pain\n• Follow your physiotherapist\'s guidance\n• Track your progress daily';
          } else {
            botResponse = "I don't have your specific exercise plan. Please consult your physiotherapist or check your profile for personalized exercises.";
          }
        } else if (lowerMessage.includes('diet') || lowerMessage.includes('food') || lowerMessage.includes('eat') || lowerMessage.includes('meal')) {
          if (patientData && patientData.diet) {
            botResponse = '🥗 Your Personalized Diet Plan:\n\n' + patientData.diet + '\n\nGeneral Tips:\n• Stay hydrated (8-10 glasses of water)\n• Eat small, frequent meals\n• Avoid processed foods\n• Include protein in every meal';
          } else {
            botResponse = "I don't have your specific diet plan. For personalized nutrition advice, please consult your dietitian or check your profile.";
          }
        } else if (lowerMessage.includes('pain') || lowerMessage.includes('hurt')) {
          const meds = patientData?.medications || 'your prescribed pain medication';
          botResponse = 'I understand you\'re experiencing pain. Here\'s what you can do:\n\n• Take ' + meds + '\n• Apply ice packs for 15-20 minutes\n• Keep the affected area elevated\n• Avoid putting weight on it\n\n⚠️ If pain is severe or worsening, please contact your doctor immediately.';
        } else if (lowerMessage.includes('anxious') || lowerMessage.includes('worried') || lowerMessage.includes('stress')) {
          botResponse = "It's completely normal to feel anxious during recovery. 💙\n\nTry these techniques:\n• Deep breathing exercises (4-7-8 method)\n• Light meditation or mindfulness\n• Talk to loved ones\n• Focus on small daily achievements\n• Listen to calming music\n\nRemember: You're making progress every day! If anxiety persists, please speak with your healthcare provider.";
        } else if (lowerMessage.includes('sleep') || lowerMessage.includes('rest')) {
          botResponse = "Quality sleep is essential for healing! 😴\n\nSleep tips:\n• Aim for 7-8 hours nightly\n• Keep a consistent sleep schedule\n• Elevate the injured area if needed\n• Avoid screens 1 hour before bed\n• Create a comfortable environment\n\nIf pain is disrupting sleep, consult your doctor about adjusting medication timing.";
        } else {
          if (patientData && patientData.name) {
            botResponse = `Hi ${patientData.name}! 👋 I'm your wellness companion. How can I support you today?`;
          } else {
            botResponse = `I'm here to help with your recovery! I can assist you with:\n\n• Pain management tips\n• Exercise and physiotherapy guidance\n• Dietary recommendations\n• Medication reminders\n• Appointment scheduling\n• Emotional support\n\nWhat would you like to know about?`;
          }
        }
      }

      // Try to save messages to database if connected
      try {
        const userMessage = {
          patient_id: patientId,
          sender: 'user',
          message: message,
          timestamp: new Date()
        };
        await chatMessages().insertOne(userMessage);
        
        const botMessage = {
          patient_id: patientId,
          sender: 'bot',
          message: botResponse,
          timestamp: new Date()
        };
        await chatMessages().insertOne(botMessage);
      } catch (dbError) {
        console.log('Could not save to database, continuing with response:', dbError.message);
      }
      
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