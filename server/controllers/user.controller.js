import { errorHandler } from "../utils/error.js"
import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
export const updateUser=async (req,res,next)=>{
    try {
        const userId=req.params.userid;
        const userIdfromToken=req.user.id;
        if(userId!==userIdfromToken){
            return next(errorHandler(401,"Unauthorized Access"));
        }
        const {name,password,profilePicture}=req.body;
        let hashedPassword;
        if(password){
            hashedPassword=bcryptjs.hashSync(password,10);
        }
        const user=await User.findByIdAndUpdate(userId,{
            name,
            password:hashedPassword,
            profilePicture
        },{new:true});
        const {password:pass,...rest}=user._doc;
        return res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
}