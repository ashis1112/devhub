const Profile=require('../model/Profile')
const User=require('../model/User')
const { validationResult } = require('express-validator');

const createProfile=async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
        company,website,location,bio,status,githubusername,
        skill,youtube,facebook,twitter,instagram,linkedin
    }=req.body

    // Build profile object
    const profileFields={}
    profileFields.user=req.user

    if(company) profileFields.company=company
    if(website) profileFields.website=website
    if(location) profileFields.location=location
    if(status) profileFields.status=status
    if(bio) profileFields.bio=bio
    if(githubusername) profileFields.githubusername=githubusername
    if(skill){
        profileFields.skill=skill.split(',').map(skill=>skill.trim())
    }

    // Build social profile
    profileFields.social={}
    if(youtube) profileFields.social.youtube=youtube
    if(twitter) profileFields.social.twitter=twitter
    if(facebook) profileFields.social.facebook=facebook
    if(linkedin) profileFields.social.linkedin=linkedin
    if(instagram) profileFields.social.instagram=instagram

    try {
        let profile=await Profile.findOne({user:req.user})
        if(profile){
            // update
            profile=await Profile.findOneAndUpdate(
                {user:req.user},
                {$set:profileFields},
                {new:true}
            )
            return res.json(profile)

        }
        // Create
        profile=new Profile(profileFields)
        await profile.save()
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error")
    }

    res.send('create post')
}



const getProfile=async(req,res)=>{
    try{
        const profile=await Profile.find().populate('users',['name','avatar'])
        res.status(302).send(profile)
    }catch(err){
        console.error(err.message)
        res.status(500).send("Server Error")
    }

}

const myProfile=async(req,res)=>{
    const myprofile=await Profile.findById(req.user).populate('user',['name','avatar'])
    try {
        if(myprofile){
             res.status(302).json({msg:myprofile})
        }
        res.status(404).json({msg:"Profile does't found"})

    } catch (error) {
        console.log(error)
        res.status(500).send("Server Error")
    }
}

const singleid=async(req,res)=>{
    const id=req.params.id
    try{
        const profile=await Profile.findOne({user:id}).populate('users',['name','avatar'])
        if(!profile) return req.status(400).json({msg:"There is no profile for this user"})
        res.status(302).send(profile)
    }catch(err){
        console.error(err.message)
        if(err.kind == 'ObjectId'){
            return res.status(400).json({msg:"There is no profile for this user"})
        }
        res.status(500).send("Server Error")
    }
}


const deleteProfile=async(req,res)=>{
    try{
        await Profile.findOneAndDelete({user:req.user})
        await User.findOneAndRemove({_id:req.user})
        res.json({msg:"User Deleted"})
    }catch(err){
        console.error(err.message)
        res.status(500).send("Server Error")
    }

}


module.exports={createProfile,getProfile,singleid,myProfile,deleteProfile}