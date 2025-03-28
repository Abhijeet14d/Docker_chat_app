import express from 'express';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.route.js';
import msgRoutes from './routes/message.route.js';
import { connectDB } from './lib/db.js';
import dotenv from 'dotenv';
dotenv.config();

import path from 'path';
import { app, server } from './lib/socket.js';

const app = express();
const PORT = process.env.PORT;
const __dirname = path.resolve();
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/msg",msgRoutes);

app.get('/', (req, res) => {    
    res.send('Hello world');
});
connectDB();
app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`);
    
})