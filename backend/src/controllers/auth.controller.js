import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";


export const signup = async (req, res)=>{
    const { fullName, email, password } = req.body;
    try{
        if(!fullName|| !email || !password){
            return res.status(400).json({msg: "All fields required"});
        }
        if(password.length < 6){
            return res.status(400).json({msg: "Password must be atleast 6 char"});
        }
        const user = await User.findOne({ email });
        if(user) return res.status(400).json({msg: "Email already exists"});
        const salt = await bcrypt.genSalt(10);
        const handedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullName,
            email,
            password: hashedPassword,
        });
        if(newUser){
            generateToken(newUser._id, res);
            await newUser.save();
            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic,
            });
        }else{
            res.status(400).json({msg: "Invalid Server Error"});
        }
    }catch(err){
        console.log("Error in signup controller");
        res.status(500).json({msg: "Internal server Error"});
    }
}