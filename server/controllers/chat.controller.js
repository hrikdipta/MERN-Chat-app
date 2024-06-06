import Chat from '../models/chat.model.js';
import User from '../models/user.model.js';
import {errorHandler} from '../utils/error.js'

export const createChat =async(req,res,next)=>{
    const {userId}=req.body; // to whom chat to be created 
    if(!userId) {
        return res.status(400).json({error:"User Id is required"});
    }
    try {
        const isChatExist = await Chat.find({
            isGroup:false,
            $and:[
                {"members":userId},
                {"members":req.user.id}
            ]
        }).populate("members","-password").populate("lastMessage");
        if(isChatExist.length>0){
            return res.status(200).json(isChatExist[0]);
        }else{
            const user = await User.findById(userId);
            const newChat =await Chat.create({
                chatName:user.name,
                members:[userId,req.user.id]
            })
            const chat =await Chat.findById(newChat._id).populate("members","-password").populate("lastMessage");
            return res.status(200).json(chat);
        }
    } catch (error) {
        next(error);
    }
}

export const getChats= async(req,res,next)=>{
    try {
        const chats = await Chat.find({
            members:req.user.id
        }).populate("members","-password").populate("lastMessage").sort({updatedAt:-1});
        return res.status(200).json(chats);
    } catch (error) {
        next(error);
    }
}

export const createGroupChat =async(req,res,next)=>{
    const {members,chatName}=req.body;
    if(!members || !chatName){
        return res.status(400).json({error:"Members and chatName is required"});
    }
   
    if(members.length<2){
        return res.status(400).json({error:"Atleast 2 users are required to form a group"});
    }
    members.push(req.user.id);
    console.log(members)
    try {
        const groupChat=await Chat.create({
            chatName:chatName,
            members:members,
            isGroup:true,
        })
        const fullGroupChat= await Chat.findById(groupChat._id).populate("members","-password")
        return res.status(201).json(fullGroupChat);
    } catch (error) {
        next(error);
    }
}

export const addUserToGroup= async(req,res,next)=>{
    const {userId,chatId}= req.body;
    if(!userId || !chatId|| userId.length===0){
        return res.status(400).json({error:"userId is required"})
    }
    try {
        const chat = await Chat.findById(chatId);
        if(!chat){
            return res.status(400).json({error:"No chat is found"});
        }
        chat.members.push(...userId);
        const newChat = await Chat.findByIdAndUpdate(chatId,chat,{new:true}).populate("members","-password")
        return res.status(200).json(newChat)
    } catch (error) {
        next(error)
    }
}

export const renameGroup = async(req,res,next)=>{
    const {chatId,chatName}=req.body;
    try {
        const updatedChat= await Chat.findByIdAndUpdate(chatId,{chatName},{new:true}).populate("members","-password")
        if(!updatedChat){
            return res.status(400).json({error:"No chat found"});
        }
        return res.status(201).json(updatedChat);
    } catch (error) {
        next(error);
    }
}

export const removeUserFromGroup =async (req,res,next)=>{
    const {chatId, userId} =req.body;
    if(!chatId || !userId){
        return res.status(400).json({error:"chatId or UserId is required"});
    }
    try {
        const chat=await Chat.findById(chatId);
        if(!chat){
            return res.status(400).json({error:"Chat is not found"});
        }
        chat.members=chat.members.filter((member)=>member.toString()!==userId)
        console.log(chat.members)
        const newChat= await Chat.findByIdAndUpdate(chatId,chat,{new:true}).populate("members","-password");
        return res.status(200).json(newChat);
    } catch (error) {
        next(error);
    }
}