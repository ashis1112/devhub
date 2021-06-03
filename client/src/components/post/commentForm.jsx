import React,{useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {addComment} from '../../redux/actions/post'

const Commentform=({addComment,postid})=>{
    const [text,setComment]=useState({
        comment:""
    })

    const change=(e)=>{
        setComment({...text,[e.target.name]:e.target.value})
    }
    const {comment}=text
    return(
        <>
        <div class="post-form">
            <div class="bg-primary p">
            <h3>Say Something...</h3>
            </div>
            <form class="form my-1" onSubmit={e=>{
                e.preventDefault()
                addComment(postid,{comment})
                setComment({comment:""})
            }}>
            <textarea
                name="comment"
                cols="30"
                rows="5"
                placeholder="Create a post"
                value={text.comment}
                onChange={(e)=>change(e)}
                required
            ></textarea>
            <button class="btn btn-dark my-1">Submit</button>
            </form>
        </div>
        </>
    )
}

Commentform.propTypes={
    addComment:PropTypes.func.isRequired
}

export default connect(null,{addComment})(Commentform)