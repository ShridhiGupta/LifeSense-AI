const { MongoClient } = require('mongodb');

// MongoDB connection URI - must be set in environment variables
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('MONGODB_URI environment variable is not set');
}

let cachedClient = null;
let cachedDb = null;

async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const client = new MongoClient(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  await client.connect();
  const db = client.db("LifeSenseAI");

  cachedClient = client;
  cachedDb = db;

  return { client, db };
}

// Export collection accessors
const patients = () => {
  if (!cachedDb) {
    throw new Error('Database not connected. Call connectToDatabase() first.');
  }
  return cachedDb.collection('Patients');
};

const chatMessages = () => {
  if (!cachedDb) {
    throw new Error('Database not connected. Call connectToDatabase() first.');
  }
  return cachedDb.collection('ChatMessages');
};

module.exports = {
  connectToDatabase,
  patients,
  chatMessages,
  get db() { return cachedDb; },
  get client() { return cachedClient; }
};
