const express=require('express')
const router=express.Router()
const {check}=require('express-validator')
const {createProfile,deleteProfile,singleid,getProfile,myProfile}=require('../../controller/profileController')
const auth=require("../../middelware/jwt")
router.get('/',getProfile)
router.get('/me',auth,myProfile)
router.get('/user/:id',singleid)
router.post('/',[auth,
    [
        check('status','status is required').not().isEmpty(),
        check('skill','skill is required')
    ]],createProfile)
router.delete('/',deleteProfile)



module.exports=router
