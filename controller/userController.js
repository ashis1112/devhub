const User=require('../model/User')
const {validationResult } = require('express-validator');
const gravatar=require("gravatar")
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const config=require('config')

const signup=async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ err: errors.array()[0].msg });
    }
    const {name,email,password}=req.body

    try {
        let isuser=await User.findOne({email:email})
        if(isuser){
           return res.status(400).json({err:"User already exist"})
        }
        const avatar=gravatar.url(email, {s: '200', r: 'pg', d: 'mm'}, false)
        const salt=await bcrypt.genSalt(10)
        const haspass=await bcrypt.hash(password,salt)
        let user=new User({
            name:name,
            email:email,
            password:haspass,
            avatar:avatar
        })
        await user.save()
        // making jwt
        const payload={
            user:user.id
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

module.exports={signup}