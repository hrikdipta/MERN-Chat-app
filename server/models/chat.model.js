import mongoose from "mongoose";
const chatSchema = new mongoose.Schema({
    chatName:{
        type:String, 
    },
    isGroup:{
        type:Boolean,
        default:false
    },
    members:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],
    messages:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Message"
    }],
    lastMessage:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Message"
    },

    
},{timestamps:true});


const Chat = mongoose.model("Chat", chatSchema);
export default Chat;