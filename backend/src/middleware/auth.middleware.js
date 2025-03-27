import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export const protectRoute = async (req,res,next)=>{
    try {
        next();
    } catch (error) {
        console.log('Error in middleware');
        res.status(500).json({msg: "Internal server error"});
    }
};