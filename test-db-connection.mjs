import { MongoClient } from 'mongodb';
import { readFileSync } from 'fs';
import { resolve } from 'path';

// Read .env file manually
try {
  const envPath = resolve(process.cwd(), '.env');
  const envContent = readFileSync(envPath, 'utf8');
  
  // Parse the environment variables
  const envVars = {};
  envContent.split('\n').forEach(line => {
    if (line.trim() && !line.startsWith('#')) {
      const [key, value] = line.split('=');
      if (key && value) {
        envVars[key.trim()] = value.trim();
      }
    }
  });
  
  console.log('MongoDB URI from .env file:', envVars.MONGODB_URI);

  // Your connection URI from Atlas
  const uri = envVars.MONGODB_URI;

  if (!uri) {
    console.error('❌ MONGODB_URI is not defined in .env file');
    process.exit(1);
  }

  // Create a MongoClient instance
  const client = new MongoClient(uri);

  async function run() {
    try {
      console.log('Connecting to MongoDB...');
      await client.connect(); // Connect to the cluster
      console.log("✅ Connected to MongoDB Atlas successfully!");

      // Access a database
      const db = client.db("LifeSenseAI");
      console.log("✅ Connected to LifeSenseAI database");

      // List collections
      const collections = await db.listCollections().toArray();
      console.log("📋 Collections in database:", collections.map(c => c.name));
      
      console.log("✅ Database connection test completed successfully!");
    } catch (error) {
      console.error("❌ Error connecting to MongoDB:", error.message);
    } finally {
      await client.close(); // Close connection
      console.log("🔒 MongoDB connection closed");
    }
  }

  run();
} catch (error) {
  console.error('❌ Error reading .env file:', error.message);
}