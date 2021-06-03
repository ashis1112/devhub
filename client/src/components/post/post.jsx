import React,{useEffect} from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Spinner from '../layout/spinner'
import {getsinglePost} from '../../redux/actions/post'
import Postitem from '../posts/postitem'
import Commentform from './commentForm'
import Comment from './comment'

const Post=({getsinglePost,posts:{loading,post},match})=>{
    useEffect(()=>{
        getsinglePost(match.params.id)
    },[getsinglePost])
    console.log(post)
    return loading || post === null ? (<Spinner />) :(<>
        <Link to='/post' className='btn'>Back</Link>
        <Postitem post={post} showAction={false} />
        <Commentform  postid={post._id}/>
        <div class="comments">
            {
                post && post.comments.map(comment=>(
                <Comment key={comment._id} comment={comment} postid={post._id} match={match.params.id} />
               )) 
            }
        </div>
    </>)
}

Post.propType={
    getsinglePost:PropTypes.func.isRequired,
    posts:PropTypes.object.isRequired
}
const mapStateToProps=state=>({
    posts:state.post
})

export default connect(mapStateToProps,{getsinglePost})(Post)