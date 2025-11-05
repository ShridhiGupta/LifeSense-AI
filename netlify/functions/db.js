const { MongoClient } = require('mongodb');

// MongoDB connection URI - use environment variable in production
const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://guptashridhi11_db_user:06fkqEIi5ejpN6TE@lifesensecluster.vq6odzf.mongodb.net/?appName=LifeSenseCluster";

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
