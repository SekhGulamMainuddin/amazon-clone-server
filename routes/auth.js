const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middlewares/auth");

const authRouter = express.Router();

authRouter.post("/api/signup", async (req, res)=>{
    try{
        const {name,email,password}= req.body;
        const existingUser= await User.findOne({email});
        if(existingUser){
            return res.status(400).json({msg: "User with same email already exists"});
        }

        const hashPassword = await bcrypt.hash(password, 8);

        let user= new User({
            name,
            email,
            password: hashPassword
        });

        user= await user.save();
        return res.json(user);
    }
    catch (e){
        res.status(500).json({error: e.message});
    }
});

authRouter.post("/api/signin", async (req, res) => {
    try{
        const {email, password} = req.body;
        
        const user= await User.findOne({email});
        if(!user){
            return res.json({msg: "User is not registered with this email"});
        }

        const isMatched= await bcrypt.compare(password, user.password);
        if(!isMatched){
            return res.json({msg: "Wrong Password"});
        }

        const token = jwt.sign({id: user._id}, process.env.SECRET_KEY);
        res.json({token, ...user._doc});

    } catch(e){
        res.status(500).json({error: e.message});
    }
});

authRouter.post("/api/tokenIsValid", async (req, res)=>{
    try{
        const token= req.header("x-auth-token");
        if(!token) return res.json(false);

        const verified= jwt.verify(token, process.env.SECRET_KEY);
        if(!verified) return res.json(false);

        const isUser= await User.findById(verified.id);
        if(!isUser) return res.json(false);

        return res.json(true);
    }
    catch(e){
        res.status(500).json({error: e.message});
    }
});

authRouter.get("/api/userData", auth, async (req, res)=>{
    const user= await User.findById(req.user);
    res.json({...user._doc, token: req.token});
});

module.exports= authRouter;