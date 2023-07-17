const express=require("express")

const bcrypt=require("bcrypt")

const jwt=require('jsonwebtoken')
const User=require('../models/userModel')
const router=express.Router();

//register post

router.post('/register',async(req,res)=>{
    try {
        const{name,email,gender,password}=req.body

        const hashedPassword=await bcrypt.hash(password,10)

        const user=new User({
           name,
           email,
           gender,
           password:hashedPassword
        })

        await user.save()

        res.status(201).json({message: "User registered successfully"})
        
    } catch (error) {
        console.log('user registraton error',error);
        res.status(500).json({message:'internal server error'})
    }
})

//login

router.post('login',async(req,res)=>{
    try {
        const{email,password}=req.body

        const user=await User.findOne({email});
        if(!user){
            return res.status(404).json({message:"User not found"})
        }

        const validatePassword=await bcrypt.compare(password,user.password);
        if(!validatePassword){
            return res.status(401).json({message:"Invalid credentials"})
        }
        
        const token=jwt.sign({userId:user._id},
            process.env.JWT_SECRET,{
                expiresIn: '1h'
            })

            res.status(200).json({token})
    } catch (error) {
        console.error('user login error:',error)
        res.status(500).json({message:"internal server error"})
    }
})
module.exports=router