import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    required: true, 
    enum: ['founder', 'investor', 'mentor', 'developer', 'advisor'],
    default: 'founder'
  },
  profile: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    avatar: { type: String, default: '' },
    bio: { type: String, default: '' },
    location: { type: String, default: '' },
    website: { type: String, default: '' },
    linkedin: { type: String, default: '' },
    twitter: { type: String, default: '' }
  },
  startup: {
    name: { type: String, default: '' },
    industry: { type: String, default: '' },
    stage: { 
      type: String, 
      enum: ['idea', 'mvp', 'early-traction', 'growth', 'scaling', 'exit'],
      default: 'idea'
    },
    fundingStage: {
      type: String,
      enum: ['pre-seed', 'seed', 'series-a', 'series-b', 'series-c', 'exit'],
      default: 'pre-seed'
    },
    teamSize: { type: Number, default: 1 },
    revenue: { type: Number, default: 0 },
    fundingRaised: { type: Number, default: 0 }
  },
  preferences: {
    notifications: { type: Boolean, default: true },
    emailUpdates: { type: Boolean, default: true },
    aiAssistance: { type: Boolean, default: true }
  },
  isVerified: { type: Boolean, default: false },
  lastActive: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.models.User || mongoose.model('User', UserSchema);
