import Admin from '../models/adminModel.js'
import jwt from 'jsonwebtoken'
import bcryptjs from 'bcryptjs'
import { errorHandler } from '../utils/error.js'
import User from '../models/userModel.js'

export const adminLogin = async ( req , res , next ) => {
    const { name , password } = req.body
    try {
        const admin = await Admin.findOne({ name })
        if ( !admin ) return next(errorHandler(404 , "Admin not found."))
        if ( password !== admin.password ) return next(errorHandler(403, "Wrong Credentials."))
        const token = jwt.sign({id : admin._id } , process.env.JWT_SECRET)
        const { password : _, rest } = admin._doc
        const expiryDate = new Date(Date.now() + 3600000 ) //hour
        res
        .cookie('access_token' , token , { httpOnly : true , expires : expiryDate })
        .status(200)
        .json(rest)
    } catch (error) {
        next(error)  
    }
}

export const adminHome = async ( req , res ) => {
    try {
        const users = await User.find().sort({_id:-1})
        res.status(200).json(users)
    } catch (error) {
        console.log(error);
        
    }
}

export const addUser = async ( req , res , next ) => {
    try {
        const { username , email , password } = req.body
        const userExists = await User.findOne({ username })
        const emailExists = await User.findOne({ email })

        if ( userExists ) return res.json({ success : false , message : "Username already exists"})
        if ( emailExists ) return res.json({ success : false , message : "email already exists"})

        const hashedPassword = bcryptjs.hashSync(password , 10)
        const newUser = new User({ username , email , password : hashedPassword })
        await newUser.save()
        res.status(201).json("User added successfully")
    } catch (error) {
        next(error)
    }
}

export const editUser = async ( req , res ) => {
    try {
        const id = req.params.id
        const user = await User.findOne({ _id : id})
        res.status(201).json(user)
    } catch (error) {
        console.log(error);
        
    }
}

export const userEdit = async ( req , res ) => {
    const { username , email } = req.body
    const { id } = req.params
    try {
        const editedUser = await User.findByIdAndUpdate(
            { _id : id } ,
            {
                $set : {
                    username : username ,
                    email : email
                }
            }
        )
        res.json({success : true})
    } catch (error) {
        console.log(error)        
    }
}

export const deleteUser = async ( req , res ) => {
    try {
        const { id } = req.params
        await User.deleteOne({ _id : id })
        res.status(200).json("User Deleted")
    } catch (error) {
        console.log(error);
        
    }
}

export const adminLogout = async ( req , res ) => {
    res.clearCookie('access_token').status(200).json('Signout Success!')
}

