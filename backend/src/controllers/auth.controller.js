import { generatewebtoken } from '../lib/utils.js';
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import cloudinary from '../lib/cloudinary.js'; 

export const login = async (req, res) => {
    const {email,password}=req.body;
  try{
    if(!email || !password){
        return res.status(400).json({message:"Invalid credentials"})
    }
    const authuser=await User.findOne({email});
    if(!authuser){
        return res.status(400).json({message:"Invalid credentials"})
    }
    const matchedpassword= await bcrypt.compare(password,authuser.password);
    if(!matchedpassword){
        return res.status(400).json({message:"Credentials don't match"})
    }
    generatewebtoken(authuser._id,res)
    res.status(200).json({
        _id:authuser._id,
        email:authuser.email,
        fullName: authuser.fullName,
        password:authuser.password,
        profilepic:authuser.profilepic
    });
  }
  catch(error){
    console.log('Login error:', error.message);
    res.status(500).json({message:"Internal server error"})
  }
};  

export const signup = async (req,res) => {
  const { email, fullName, password } = req.body;

  try {
    if (!email || !fullName || !password) {
      return res.status(400).json({ message: 'Please fill all the fields' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'E-mail already exists!' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      password: hashedPassword,
      email,
    });

    await newUser.save();

    generatewebtoken(newUser._id,res); // Check if this sets cookies or returns a token

    res.status(201).json({
      _id: newUser._id,
      fullName: newUser.fullName,
      email: newUser.email,
      profilepic: newUser.profilepic,
    });
  } catch (error) {
    console.error('Signup error:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const logout = (req,res) => {
  try{
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
    });
    res.status(200).json({ message: 'Logged out successfully' });
  }
  catch (error) {
    console.error('Logout error:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateimage =async (req,res)=>{
    try {
    const { profilepic } = req.body;
    const userId = req.user._id;

    if (!profilepic) {
      return res.status(400).json({ message: "Profile pic is required" });
    }

    const uploadResponse = await cloudinary.uploader.upload(profilepic);
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilepic: uploadResponse.secure_url },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    console.log("error in update profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const checkAuth = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("fullName email profilepic createdAt");
    res.status(200).json(user);
  } catch (error) {
    console.log("Error in checkAuth controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
