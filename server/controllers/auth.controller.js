import { errorHandler } from "../utils/error.js";
import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
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
        return res.status(201).json(rest);
    }catch(err){
        next(err);
    }
}