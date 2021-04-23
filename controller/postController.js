const Post=require('../model/Post')
const User=require('../model/User')
const {validationResult}=require('express-validator')
const createPost=async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    try {
        const user=await User.findOne({_id:req.user}).select('-password')
        const newPost=new Post({
            text:req.body.text,
            name:user.name,
            avatar:user.avatar,
            user:req.user
        })
        const post=await newPost.save()
        return res.status(200).json(post)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('server error')
    }
}

const getPost=async(req,res)=>{
    try {
        const posts=await Post.find()

        res.send(posts)
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error")
    }
}

const singlePost=async(req,res)=>{
    try {
        const singlePost=await Post.findById(req.params.id)
        if(!singlePost){
            res.status(404).json({msg:"Post not Found"})
        }
        res.json(singlePost)
    } catch (err) {
        console.error(err.message);
        if(err.kind === 'ObjectId'){
            return res.status(404).json({msg:"Post not Found"})
        }
        res.status(500).send("Server Error")
        
    }
}

const deletePost=async(req,res)=>{
    try{
        const delPost=await Post.findByIdAndDelete(req.params.id)
        if(!delPost){
            res.status(404).json({msg:'Post not found'})
        }
        res.status(301).json({msg:'Post Deleted'})
    }catch(err){
        console.error(err.message)
        console.error(err.message);
        if(err.kind === 'ObjectId'){
            return res.status(404).json({msg:"Post not Found"})
        }
        res.status(500).send('server Error')

    }
}

const likePost=async(req,res)=>{
    try {   
        const post=await Post.findById(req.params.id)
        const user=await User.findOne({_id:req.user}).select('-password') 
        // check if the post has already been liked
        if(post.likes.filter(like=>like.user.toString() === req.user).length > 0){
            return res.status(400).json({msg:"Post already liked"})
        }
        post.likes.unshift({user:req.user,name:user.name})
        await post.save()
        res.json(post.likes)
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error")
    }
}

const unlikePost=async(req,res)=>{
    try {   
        const post=await Post.findById(req.params.id)
        // check if the post has already been liked
        if(post.likes.filter(like=>like.user.toString() === req.user).length == 0){
            return res.status(400).json({msg:"Post is already unliked"})
        }
        const removeIndex=post.likes.map(like=>like.user.toString()).indexOf(req.user)
        post.likes.splice(removeIndex,1)
        await post.save()
        res.status(200).json({msg:"Post unliked"})
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error")
    }
}

const addComment=async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    try {
        const post=await Post.findOne({_id:req.params.id})
        const user=await User.findOne({_id:req.user}).select('-password')
        post.comments.unshift({
            text:req.body.comment,
            name:user.name,
            avatar:user.avatar,
            user:req.user
        })
        await post.save()
        res.status(200).json({msg:"Comment Added"})
    } catch (err) { 
        console.error(err.message);
        if(err.kind === 'ObjectId'){
            return res.status(404).json({msg:"Post not Found"})
        }
        res.status(500).send('server Error')
    }
}


const removeComment=async(req,res)=>{
    try {
        const post=await Post.findOne({_id:req.params.id})
        const removeIndex=post.comments.map(data=>data.id.toString() == req.params.comment_id).indexOf(req.params.comment_id)
        post.comments.splice(removeIndex,1)
        await post.save()
        res.status(200).json({msg:"Comment Remove "})
    } catch (err) { 
        console.error(err.message);
        if(err.kind === 'ObjectId'){
            return res.status(404).json({msg:"Post not Found"})
        }
        res.status(500).send('server Error')
    }
}

module.exports={createPost,getPost,singlePost,deletePost,likePost,unlikePost,addComment,removeComment}