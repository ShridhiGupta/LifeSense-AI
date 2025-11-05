import { MongoClient } from 'mongodb';

// MongoDB connection URI from environment variables
import dotenv from 'dotenv';
dotenv.config();

const uri = process.env.MONGODB_URI;

if (!uri) {
  console.error('❌ MONGODB_URI environment variable is not set');
  console.log('Please create a .env file with your MongoDB connection string');
  process.exit(1);
}

console.log('Using MongoDB URI from environment variables');

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

    // Try to access the Admin collection
    const adminCollection = db.collection("Admin");
    console.log("✅ Accessed Admin collection");

    // Insert a sample document
    const result = await adminCollection.insertOne({ 
      name: "Shridhi", 
      role: "Admin", 
      email: "shridhi@example.com",
      createdAt: new Date()
    });
    console.log("✅ Sample data inserted with ID:", result.insertedId);

    // Fetch all documents
    const allAdmins = await adminCollection.find().toArray();
    console.log("📋 All Admin Data Count:", allAdmins.length);

    console.log("✅ Database connection test completed successfully!");
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error.message);
  } finally {
    await client.close(); // Close connection
    console.log("🔒 MongoDB connection closed");
  }
}

run();