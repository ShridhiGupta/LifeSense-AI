import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Your connection URI from Atlas - must be set in .env file
const uri = process.env.MONGODB_URI;

if (!uri) {
  console.error('❌ MONGODB_URI environment variable is not set');
  process.exit(1);
}

// Create a MongoClient instance
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect(); // Connect to the cluster
    console.log("✅ Connected to MongoDB Atlas successfully!");

    // Access a database (you can name it as you want)
    const db = client.db("LifeSenseAI");

    // Access a collection (for example 'Admin')
    const collection = db.collection("Admin");

    // Example: Insert a sample document
    await collection.insertOne({ name: "Shridhi", role: "Admin", email: "shridhi@example.com" });
    console.log("✅ Sample data inserted!");

    // Fetch all documents
    const allAdmins = await collection.find().toArray();
    console.log("📋 All Admin Data:", allAdmins);
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error);
  } finally {
    await client.close(); // Close connection
  }
}

run();