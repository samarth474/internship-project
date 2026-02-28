import connectToDB from '../../../utils/db';
import User from '../../../models/User';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  try {
    const {
      email,
      password,
      role,
      firstName,
      lastName,
      startupName,
      industry,
      stage,
      fundingStage
    } = req.body || {};

    if (!email || !password || !firstName || !lastName || !role) {
      return res.status(400).json({
        message: "Missing required fields: email, password, firstName, lastName, and role are required"
      });
    }

    // Validate role
    const validRoles = ['founder', 'investor', 'mentor', 'developer', 'advisor'];
    if (!validRoles.includes(role)) {
      return res.status(400).json({ message: "Invalid role specified" });
    }

    if (!process.env.MONGO_URI) {
      return res.status(503).json({
        message: "Server misconfiguration: MONGO_URI is not set. Add it to .env.local and restart the dev server."
      });
    }

    await connectToDB();

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(409).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const userData = {
      email,
      password: hashedPassword,
      role,
      profile: {
        firstName,
        lastName
      }
    };

    // Add startup information for founders
    if (role === 'founder') {
      userData.startup = {
        name: startupName || '',
        industry: industry || '',
        stage: stage || 'idea',
        fundingStage: fundingStage || 'pre-seed'
      };
    }

    const user = new User(userData);
    await user.save();

    return res.status(201).json({
      message: "User created successfully",
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        profile: user.profile
      }
    });
  } catch (err) {
    console.error('[signup]', err);
    const isDbError = err.name === 'MongoServerError' || err.message?.includes('Mongo');
    const message = isDbError
      ? "Database error. Check MONGO_URI in .env.local and that MongoDB Atlas allows your IP (or use 0.0.0.0/0 for testing)."
      : (err.message || "Something went wrong. Please try again.");
    return res.status(500).json({ message });
  }
}
