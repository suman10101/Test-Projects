import User from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// User registration
export const register = async (req, res) => {
  const { email, password } = req.body;
    try {
      const existingUser = await User.findOne({ email })
        if (existingUser) return res.status(400).json({ message: "User already exist" })
      const hashedPassword = await bcrypt.hash(password, 12)
      const newUser = await User.create({...req.body,
        email,
        password: hashedPassword
      });
      res.status(201).json({newUser, message: 'User registered successfully' });
    } catch (error) {
        console.error('Error in user registration:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  // User login
  export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(401).json({ message: 'User not found.' });
      }
  
      const passwordMatch = await bcrypt.compare(password, user.password);
      console.log('Password Match:', passwordMatch);
  
      if (!passwordMatch) {
        return res.status(401).json({ message: 'Password does not match.' });
      }
  
      const token = jwt.sign({ userId: user._id }, 'secret-key', { expiresIn: '1h' });
      res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  // Fetch user profile
  export const getUserProfile = async (req, res) => {
    try {
      const profile = await User.find();
      res.json(profile);
    } catch (error) {
      res.status(500).json({ message: "Error fetching profile details." });
    }
  };

  // Update user profile
  export const updateProfile = async (req, res) => {
    const { userId } = req.params;
    const updatedProfile = req.body;
    try {
      const profile = await User.findOneAndUpdate( userId,
        updatedProfile);

      if (!profile) {
        return res.status(404).json({ error: 'Profile not found' });
      }

      res.json({ message: 'Profile updated successfully', profile });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
    }
  }
  
  