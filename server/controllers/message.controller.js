import { errorHandler } from "../utils/error.js";
import Message from "../models/message.model.js";
import Chat from '../models/chat.model.js'
export const getMessages =async (req,res,next)=>{
    const chatId =req.params.chatId;
    if(!chatId){
        return next(errorHandler(400,"ChatId is required"));
    }
    try {
        const messages = await Message.find({chatId}).sort({createdAt:1}).populate('sender','-password').populate('chatId');
        if(!messages){
            return errorHandler(404,"Messages not found");
        }
        return res.status(200).json(messages);
    } catch (error) {
        next(error);
    }
}

export const createMessage =async (req,res,next)=>{
    const {chatId,content}=req.body;
    const sender = req.user.id;
    if(!chatId || !content){
        return next(errorHandler(400,"ChatId and content are required"));
    }
    try {
        let message = await Message.create({
            chatId,
            sender,
            text: content && content.text,
            media: content && content.media,
        });
        await Chat.findByIdAndUpdate(chatId,{
            lastMessage : message._id,
            messages: message._id
        },{new:true});
        message= await Message.findById(message._id).populate("sender", '-password').populate('chatId');
        
        return res.status(201).json(message);
    } catch (error) {
        next(error);
    }
}