import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { connectDB } from './lib/db.js';
import authRoutes from './routes/auth.routes.js';
import messageRoutes from './routes/message.routes.js';
import { io,app,server } from "./lib/socket.js";
import path from 'path';
//const app=express();
import cors from 'cors';
connectDB();
app.use(express.json({ limit: '5mb' })); 
app.use(express.urlencoded({ extended: true, limit: '5mb' }));
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5174",
    credentials: true,
}));
dotenv.config({ path: './.env' });
console.log("Loaded MONGO_URI:", process.env.MONGO_URI);

app.use("/api/auth",authRoutes)
app.use("/api/message",messageRoutes)
const PORT=process.env.PORT || 5000;
const __dirname = path.resolve();
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname,"../frontend/dist")));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
    });
}
app.get('/',(req,res)=>{
    res.send("homepage");
});
server.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})
