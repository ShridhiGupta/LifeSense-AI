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

  try {
    // Get the MongoDB URI from environment variables
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error('MONGODB_URI environment variable is not set');
    }
    
    // Create a MongoClient instance
    const client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connecting to MongoDB...');
    await client.connect();
    console.log("✅ Connected to MongoDB Atlas successfully!");

    // Access a database
    const db = client.db("LifeSenseAI");
    console.log("✅ Connected to LifeSenseAI database");

    // List collections
    const collections = await db.listCollections().toArray();
    console.log("📋 Collections in database:", collections.map(c => c.name));

    // Try to access the Admin collection
    const adminCollection = db.collection("Admin");
    console.log("✅ Accessed Admin collection");

    // Fetch all documents
    const allAdmins = await adminCollection.find().toArray();
    console.log("📋 All Admin Data Count:", allAdmins.length);

    await client.close();
    console.log("🔒 MongoDB connection closed");

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: "MongoDB connection test successful",
        collections: collections.map(c => c.name),
        adminCount: allAdmins.length,
        timestamp: new Date().toISOString()
      }),
    };
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        error: error.message,
        timestamp: new Date().toISOString()
      }),
    };
  }
};