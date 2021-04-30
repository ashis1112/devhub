import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import Moment from 'react-moment'
import {connect} from 'react-redux'
import {getLike,removeLike,deletePost} from '../../redux/actions/post'

const Postitem=({auth,post:{_id,text,name,avatar,user,likes,comments,date},removeLike,getLike,deletePost,showAction})=>{
    console.log('likes',likes)
    return(
        <div class="post bg-white p-1 my-1">
          <div>
            <Link to={`/profiles/${user}`}>
              <img
                class="round-img"
                src={avatar}
                alt=""
              />
              <h4>{name}</h4>
            </Link>
          </div>
          <div>
            <p class="my-1">
              {text}
            </p>
             <p class="post-date">
                <Moment  format='YYYY/MM/DD'>{date}</Moment>
            </p>
            {
              showAction && <>
              <button onClick={()=>getLike(_id)} type="button" class="btn btn-light">
              <i class="fas fa-thumbs-up"></i>
              <span class='comment-count'>{likes.length}</span>
            </button>
            <button onClick={()=>{removeLike(_id)}} type="button" class="btn btn-light">
              <i class="fas fa-thumbs-down"></i>
            </button>
            <a href={`/post/${_id}`} class="btn btn-primary">
              Discussion {comments.length > 0 && (<span class='comment-count'>{comments.length}</span>)}
            </a>
            { auth.user && user === auth.user.user._id && (
                <button      
                type="button"
                class="btn btn-danger"
                onClick={()=>deletePost(_id)}
                >
                <i class="fas fa-times"></i>
                </button>
            )}
              </>
            }
            
            
          </div>
        </div>
    )
}
Postitem.defaultProps={
  showAction:true
}

Postitem.propTypes={
    auth:PropTypes.object,
    post:PropTypes.object,
    getLike:PropTypes.func.isRequired,
    removeLike:PropTypes.func.isRequired,
    deletePost:PropTypes.func.isRequired
}

const mapStateToProps=(state)=>({
    auth:state.register
})

export default connect(mapStateToProps,{getLike,removeLike,deletePost})(Postitem)