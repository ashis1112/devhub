const User=require('../model/User')
const {validationResult } = require('express-validator');
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const config=require('config')

const authControllerGet=async(req,res)=>{
    try {   
        const user = await User.findById(req.user).select("-password")
        res.status(200).json({user:user})
    } catch (error) {
        res.status(500).send("server Error")
    }
}

const authControllerPost=async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ err: errors.array()[0].msg });
    }
    const {email,password}=req.body

    try {
        let isuser=await User.findOne({email:email})
        if(!isuser){
           return res.status(400).json({err:"Invalid Credentials"})
        }
        
        const isMatch=bcrypt.compare(password,isuser.password)
        if(!isMatch){
            return res.status(400).json({err:"Invalid Credentials"})
        }
        // making jwt
        const payload={
            user:isuser.id
        }
        jwt.sign(payload,config.get("secrettoken"),{expiresIn:"2h"},(err,token)=>{
            if(!err){
                res.status(200).json({token:token})
            }
            throw err
        })
    } catch (error) {
        console.log(error)
        return res.status(400).json({err:"Signup doesnot Succesfull"})
    }
}

module.exports={authControllerPost,authControllerGet}