const { db, patients, chatMessages, isConnected } = require('./db');

exports.handler = async (event, context) => {
  // Enable CORS
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

  try {
    // Test database connection
    const isDbConnected = isConnected();
    
    // Test collections
    let patientCount = 0;
    let chatCount = 0;
    
    if (isDbConnected) {
      try {
        patientCount = await patients().countDocuments({});
        chatCount = await chatMessages().countDocuments({});
      } catch (collectionError) {
        console.error('Collection test error:', collectionError);
      }
    }
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        status: 'success',
        database: {
          connected: isDbConnected,
          patientRecords: patientCount,
          chatMessages: chatCount
        },
        timestamp: new Date().toISOString(),
        environment: {
          hasGoogleApiKey: !!process.env.GOOGLE_API_KEY,
          nodeEnv: process.env.NODE_ENV
        }
      }),
    };
  } catch (error) {
    console.error('Test connection error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        status: 'error',
        message: error.message,
        stack: error.stack,
        timestamp: new Date().toISOString()
      }),
    };
  }
};