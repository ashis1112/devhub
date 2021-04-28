const express=require('express')
const router=express.Router()
const {check}=require('express-validator')
const {getGithubrepo,createProfile,deleteProfile,updateExperience,updateEducation,deleteExperience,deleteEducation,singleid,getProfile,myProfile}=require('../../controller/profileController')
const auth=require("../../middelware/jwt")

router.get('/github/:username',getGithubrepo)
router.get('/',getProfile)
router.get('/me',auth,myProfile)
router.get('/user/:id',singleid)
router.post('/',[auth,
    [
        check('status','status is required').not().isEmpty(),
        check('skill','skill is required')
    ]],createProfile)
router.put('/experience',[
    auth,
    [
        check('title','Title is required')
        .not()
        .isEmpty(),
        check('company','Company is required')
        .not()
        .isEmpty(),
        check('from','From date is required')
        .not()
        .isEmpty()
    ]
],updateExperience)
router.put('/education',[
    auth,
    [
        check('school','School is required')
        .not()
        .isEmpty(),
        check('degree','Degree is required')
        .not()
        .isEmpty(),
        check('fieldofstudy','Field of study is required')
        .not()
        .isEmpty(),
        check('from','From date is required')
        .not()
        .isEmpty()
    ]
],updateEducation)
router.delete('/experience/:exp_id',[auth],deleteExperience)
router.delete('/experience/:edu_id',[auth],deleteEducation)
router.delete('/',deleteProfile)



module.exports=router
