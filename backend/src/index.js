import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { connectDB } from './lib/db.js';
import authRoutes from './routes/auth.routes.js';
import messageRoutes from './routes/message.routes.js';
const app=express();
connectDB();
app.use(express.json())
app.use(cookieParser())
dotenv.config({ path: './.env' });
console.log("Loaded MONGO_URI:", process.env.MONGO_URI);

app.use("/api/auth",authRoutes)
app.use("/api/message",messageRoutes)
const PORT=process.env.PORT || 3000;
app.get('/',(req,res)=>{
    res.send("homepage");
});
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})
