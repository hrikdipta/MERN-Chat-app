import { errorHandler } from "../utils/error.js";
import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
export const signup=async(req,res,next)=>{
    try{
        const {name,email,password}=req.body;
        if(!name || !email || !password){
            return next(errorHandler(400,"All fields are required")) 
        }
        const user=await User.findOne({email});
        if(user){
            return next(errorHandler(400,"User already exists"))
        }
        const hashedPassword=await bcryptjs.hash(password,10);
        const newUser=await User.create({name,email,password:hashedPassword});
        const {password:pass,...rest}=newUser._doc;
        const token=jwt.sign({id:newUser._id,email:newUser.email},process.env.JWT_SECRET);
        return res.cookie('token',token).status(201).json(rest);
    }catch(err){
        next(err);
    }
}

export const checkEmail=async(req,res,next)=>{
    try{
        const {email}=req.body;
        if(!email){
            return next(errorHandler(400,"Email is required"))
        }
        const user=await User.findOne({email});
        if(!user){
            return next(errorHandler(400,"User doesn't exists"))
        }
        return res.status(200).json({message:"User is available"})
    }   catch(err){
        next(err);
    }
}

export const login =async(req,res,next)=>{
    try{
        const {email,password}=req.body;
        if(!email || !password){
            return next(errorHandler(400,"All fields are required"))
        }
        const user=await User.findOne({email});
        if(!user){
            return next(errorHandler(400,"User doesn't exists"))
        }
        const isMatch=await bcryptjs.compare(password,user.password);
        if(!isMatch){
            return next(errorHandler(400,"Invalid credentials"))
        }
        const token=jwt.sign({id:user._id,email:user.email},process.env.JWT_SECRET);
        const {password:pass,...rest}=user._doc;
        return res.cookie('token',token).status(200).json(rest);
    }catch(err){
        next(err);
    }
}

export const logout=(req,res,next)=>{
    try{
        res.clearCookie('token');
        return res.status(200).json({message:"Logged out successfully"})
    }catch(err){
        next(err);
    }
}