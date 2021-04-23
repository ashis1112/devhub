const express=require('express')
const router=express.Router()
const auth=require('../../middelware/jwt')
const {check}=require('express-validator')
const {createPost,getPost,singlePost,deletePost,unlikePost,likePost,addComment,removeComment}=require('../../controller/postController')


router.post('/',[
    auth,
    check('text','Text is required')
        .not()
        .isEmpty()
],createPost)

router.get('/',auth,getPost)

router.get('/:id',auth,singlePost)
router.put('/like/:id',auth,likePost)
router.put('/unlike/:id',auth,unlikePost)
router.put('/comment/:id',[auth,
    check('comment','Comment is required')
    .not()
    .isEmpty()
],addComment)
router.put('/comment/:id/:comment_id',auth,removeComment)
router.delete('/:id',auth,deletePost)


module.exports=router