import connectToDB from '../../utils/db';

export default async function handler(req, res) {
  try {
    await connectToDB();
    res.status(200).json({ message: 'MongoDB connection successful!' });
  } catch (error) {
    res.status(500).json({ message: 'MongoDB connection failed', error: error.message });
  }
}
