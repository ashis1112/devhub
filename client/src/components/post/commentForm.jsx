import React,{useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {addComment} from '../../redux/actions/post'

const Commentform=({addComment,postid})=>{
    const [text,setComment]=useState('')

    return(
        <>
        <div class="post-form">
            <div class="bg-primary p">
            <h3>Say Something...</h3>
            </div>
            <form class="form my-1" onSubmit={e=>{
                e.preventDefault()
                addComment(postid,{text})
                setComment('')
            }}>
            <textarea
                name="text"
                cols="30"
                rows="5"
                placeholder="Create a post"
                value={text}
                onChange={(e)=>setComment(e.target.value)}
                required
            ></textarea>

            <input type="submit" class="btn btn-dark my-1" value="Submit" />
            </form>
        </div>
        </>
    )
}

Commentform.propTypes={
    addComment:PropTypes.func.isRequired
}

export default connect(null,{addComment})(Commentform)