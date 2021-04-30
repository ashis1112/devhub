import React,{useEffect} from 'react'
import PropTypes from 'prop-types'
import {getPost} from '../../redux/actions/post'
import {connect} from 'react-redux'
import Spinner from '../layout/spinner'
import Postitem from './postitem'
import PostForm from './postform'

const Posts=({getPost,posts,loading})=>{
    useEffect(()=>{
        getPost()
    },[getPost])
    
    return(
        loading ? (<Spinner/>):(<>
            <h1 className='large text-primary'>Posts</h1>
            <p className='lead'>
                <i className='fas fa-user'></i> Welcome to the community
            </p>

            <PostForm />
            <div className='posts'>
                {
                    posts.map(post=>(
                        <Postitem key={post.id} post={post}/>
                    ))
                }
            </div>
        </>)
    )
}

Posts.propType={
    getPost:PropTypes.func.isRequired,
    posts:PropTypes.array.isRequired,
    loading:PropTypes.bool
}

const mapStateToProps=state=>({
    posts:state.post.posts,
    loading:state.post.loading
})

export default connect(mapStateToProps,{getPost})(Posts)
