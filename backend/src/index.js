import express from 'express';
import authRoutes from './routes/auth.route.js';
import { connectDB } from './lib/db.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT;
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use("/api/auth", authRoutes);

app.get('/', (req, res) => {    
    res.send('Hello world');
});
connectDB();
app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`);
    
})