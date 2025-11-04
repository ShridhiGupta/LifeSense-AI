const { MongoClient } = require('mongodb');

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

  // Test MongoDB connection
  let dbStatus = 'unknown';
  let dbMessage = '';
  
  try {
    const uri = "mongodb+srv://guptashridhi11_db_user:06fkqEIi5ejpN6TE@lifesensecluster.vq6odzf.mongodb.net/?appName=LifeSenseCluster";
    const client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    await client.connect();
    const db = client.db('LifeSenseAI');
    await db.listCollections().toArray();
    dbStatus = 'connected';
    dbMessage = 'Database connection successful';
    await client.close();
  } catch (error) {
    dbStatus = 'disconnected';
    dbMessage = error.message;
  }

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({ 
      status: 'ok', 
      message: 'LifeSense AI API is running',
      database: {
        status: dbStatus,
        message: dbMessage
      },
      timestamp: new Date().toISOString()
    }),
  };
};