import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import authRoute from './routes/auth.route.js'
import userRoute from './routes/user.route.js'
import chatRoute from './routes/chat.route.js'
import messageRoute from './routes/message.route.js'
import http from 'http';
import {Server} from 'socket.io';
import path from 'path';
const app = express();
const server = http.createServer(app);
dotenv.config();
const __dirname = path.resolve();
const io = new Server(server ,{
    cors: {
        origin : function(origin,callback){
            if(!origin || process.env.ALLOWED_ORIGIN.split(',').indexOf(origin) !== -1){
                callback(null,true);
            }else{
                callback(new Error('Not allowed by CORS'));
            }
        },
        methods: ['GET','POST']
    }
})

io.on('connection',(socket)=>{
    console.log('a user connected');
    socket.on('setup',(userData)=>{
        socket.join(userData._id);
        console.log('user joined',userData._id)
    })
    socket.on('message',(message,chat,sender)=>{
        chat.members.forEach((member)=>{
            if(member._id.toString() !== sender._id.toString()){
                io.to(member._id).emit('message',message);
            }
        })
    })
    socket.on('disconnect',()=>{
        console.log('user disconnected');
    })
})

//middlewares
app.use(express.json());
app.use(cookieParser());
//connect to database
mongoose.connect(process.env.MongoDB_URI).then(() => {
    console.log('MongoDB connected');
});



//routes
app.use('/api/auth', authRoute);
app.use('/api/user',userRoute)
app.use('/api/chat',chatRoute)
app.use('/api/message',messageRoute);

app.use(express.static(path.join(__dirname,'/client/dist')));

app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'client','dist','index.html'));
})



//error handler
app.use((err,req,res,next)=>{
    const statusCode=err.statusCode || 500;
    const message=err.message || "Internal Server Error";
    return res.status(statusCode).json({
        statusCode,
        message
    })
})


//listen to server
const PORT = process.env.PORT||3000 ;
server.listen(PORT, () => {
  console.log('Server is running on ', PORT);
});