import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    
    // Initialize default admin if not exists
    await initializeDefaultAdmin();
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

// Initialize default admin account
async function initializeDefaultAdmin() {
  try {
    const User = mongoose.model('User');
    const adminEmail = 'guptashridhi11@gmail.com';
    
    const existingAdmin = await User.findOne({ email: adminEmail });
    
    if (!existingAdmin) {
      await User.create({
        email: adminEmail,
        password: 'shridhii', // In production, hash this password
        role: 'admin',
        name: 'Admin',
        approved: true
      });
      console.log('✅ Default admin account created');
    }
  } catch (error) {
    console.error('Error initializing admin:', error.message);
  }
}

export default connectDB;
