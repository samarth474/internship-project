import connectToDB from '../../../utils/db';
import User from '../../../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  if (!JWT_SECRET) {
    return res.status(503).json({
      message: "Server misconfiguration: JWT_SECRET is not set. Add JWT_SECRET to .env.local and restart the dev server."
    });
  }

  const { email, password } = req.body;

  await connectToDB();

  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: "Invalid email or password" });

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) return res.status(401).json({ message: "Invalid email or password" });

  const token = jwt.sign({ 
    userId: user._id, 
    email: user.email,
    role: user.role 
  }, JWT_SECRET, { expiresIn: '1d' });

  return res.status(200).json({ 
    token, 
    email: user.email,
    role: user.role,
    profile: user.profile,
    startup: user.startup
  });
}
