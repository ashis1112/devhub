const express=require('express')
const router=express.Router()
const {signup}=require('../../controller/userController')
const {check} = require('express-validator');
// register user
router.post('/',[
    check('name','Name is required').not().isEmpty(),
    check('email','Please include a valid email').isEmail(),
    check('password','Please enter a password with 6 character long').isLength({min:6})
],signup)


module.exports=router