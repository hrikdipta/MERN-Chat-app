import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    text:{
        type:String,
        default:""
    },
    imageUrl:{
        type:String,
        default:""
    },
    videoUrl:{
        type:String,
        default:""
    },
    isSeen:{
        type:Boolean,
        default:false
    },
},{timestamps:true});


const conversationSchema = new mongoose.Schema({
    sender:{
        type: mongoose.Schema.ObjectId,
        required:true,
        ref: 'User'
    },
    receiver:{
        type: mongoose.Schema.ObjectId,
        required:true,
        ref: 'User'
    },
    messages: [
        {
            type: mongoose.Schema.ObjectId,
        }
    ]
},{timestamps:true});

const Message = mongoose.model("Message", messageSchema);
const Conversation = mongoose.model("Conversation", conversationSchema);
export {Message, Conversation};