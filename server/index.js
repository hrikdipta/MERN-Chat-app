import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoute from './routes/auth.route.js'
const app = express();
dotenv.config();

//middlewares
app.use(express.json());

//connect to database
mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log('MongoDB connected');
});


//routes
app.use('/api/auth', authRoute);

app.use((err,req,res,next)=>{
    const statusCode=err.statusCode || 500;
    const message=err.message || "Internal Server Error";
    return res.status(statusCode).json({
        statusCode,
        message
    })
})

const PORT = process.env.PORT||3000 ;
app.listen(PORT, () => {
  console.log('Server is running on ', PORT);
});