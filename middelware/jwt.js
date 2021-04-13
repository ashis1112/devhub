const jwt=require('jsonwebtoken')
const config=require('config')

module.exports=function(req,res,next){
    // getting token from header
    const recivetoken=req.header('x-auth-token')
    // checking token is recived or not
    if(!recivetoken){
        return res.status(401).json({msg:"No token, authorization denied"})
    }
    // validating token
    try {
        const decoded=jwt.verify(recivetoken,config.get("secrettoken"))
        req.user=decoded.user
        next()
    } catch (error) {
        console.log('from jwt.js',error)
        res.status(401).json({err:"token is not valid"})
    }
    


}