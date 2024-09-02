import User from "../models/userModel.js"
import bcryptjs from 'bcryptjs'
import { errorHandler } from "../utils/error.js"
import jwt from 'jsonwebtoken'

export const signUp = async ( req , res , next ) => {
    const { username , email , password } = req.body
    const hashPassword = bcryptjs.hashSync(password , 10)
    const newUser = new User({ username , email , password : hashPassword })
    try {
        await newUser.save()
        res.status(201).json({ message : "User created succesfully."}) 
    } catch (error) {
        next(error)
    }
}

export const signIn = async ( req , res , next ) => {
    const { email , password } = req.body
    try {
        const validUser = await User.findOne({ email })
        if ( !validUser ) return next(errorHandler(404 , 'User not found'))
        const validPassword = bcryptjs.compareSync(password , validUser.password)
        if(!validPassword) return next(errorHandler(401, 'Wrong credentials'))
        const token = jwt.sign({ id : validUser._id } , process.env.JWT_SECRET)
        const { password : hashPassword , ...rest } = validUser._doc
        const expiryDate = new Date(Date.now() + 3600000 ) //hour
        res.cookie('access_token' , token , { httpOnly : true , expires : expiryDate }).status(200).json(rest)
    } catch (error) {
        next(error)
    }
}

export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: hashPassword, ...rest } = user._doc;
      const expiryDate = new Date(Date.now() + 3600000);
      res.cookie("access_token", token, {
        httpOnly: true,
        expires: expiryDate,
      }).status(200).json(rest)
    } else {
      const generatePassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashPassword = bcryptjs.hashSync(generatePassword, 10);
      const newUser = new User({
        username: req.body.name.split(" ").join("").toLowerCase(),
        email: req.body.email,
        password: hashPassword,
        profilePicture: req.body.photo ,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: hashedPassword2, ...rest } = newUser._doc;
      const expiryDate = new Date(Date.now() + 360000);
      res
        .cookie("access_token", token, { httpOnly: true, expires: expiryDate })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};

export const signOut = async ( req , res ) => {
  res.clearCookie('access_token').status(200).json('Signout success!')
}