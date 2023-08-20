import User from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// User registration
export const register = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  if (!email || !password || !firstName || !lastName) {
    return res.status(400).json({ message: 'All required fields must be provided' });
  }
    try {
      const existingUser = await User.findOne({ email })
        if (existingUser) return res.status(400).json({ message: "User already exist" })
      const hashedPassword = await bcrypt.hash(password, 12)
      const newUser = await User.create({...req.body,
        email,
        password: hashedPassword
      });
      return res.status(201).json({newUser, message: 'User registered successfully' });
    } catch (error) {
      return res.status(500).json({ error: error.message });
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
      return res.status(200).json({ token });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };

  // Fetch user profile
  export const getUserProfile = async (req, res) => {
    try {
      const profile = await User.find();
      return res.status(200).json(profile);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };

  // Fetch user profile By Id
  export const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
      const profile = await User.findById(id);
      if(profile){
        return res.status(200).json(profile);
      }
      return res.status(404).json({ message: "user not found." });
    } catch (error) {
      return res.status(500).json({ error: error.message });
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

      return res.json({ message: 'Profile updated successfully', profile });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
  
  