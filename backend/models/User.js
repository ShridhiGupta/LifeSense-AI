import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['admin', 'staff', 'patient'],
    required: true
  },
  name: {
    type: String,
    required: true
  },
  // Staff specific fields
  department: {
    type: String,
    required: function() { return this.role === 'staff'; }
  },
  staffId: {
    type: String,
    unique: true,
    sparse: true
  },
  approved: {
    type: Boolean,
    default: false
  },
  // Patient specific fields
  patientId: {
    type: String,
    unique: true,
    sparse: true
  },
  age: Number,
  gender: String,
  condition: String,
  recoveryPeriod: String,
  currentStage: String,
  doctorsNotes: String,
  medications: String,
  exercises: String,
  diet: String,
  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update timestamp on save
userSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.model('User', userSchema);
