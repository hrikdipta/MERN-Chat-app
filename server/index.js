import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
const app = express();
dotenv.config();

app.get('/', (req, res) => {
    res.send('Hello World!');   
});

//connect to database
mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log('MongoDB connected');
});


const PORT = process.env.PORT||3000 ;
app.listen(PORT, () => {
  console.log('Server is running on ', PORT);
});