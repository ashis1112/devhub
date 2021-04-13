const express=require('express')
const router=express.Router()
const auth=require('../../middelware/jwt')
const {authControllerPost,authControllerGet}=require('../../controller/authController')
const {check} = require('express-validator');


router.get('/',auth,authControllerGet)

router.post('/',[
    check('email','Please include a valid email').isEmail(),
    check('password','Password is required').exists()
],authControllerPost)

module.exports=router
