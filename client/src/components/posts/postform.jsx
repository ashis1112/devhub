import React,{useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {createPost} from '../../redux/actions/post'

const PostForm=({createPost})=>{
    const [textdata,setText]=useState({
        text:""
    })

    const change=(e)=>{
        setText({...textdata,[e.target.name]:e.target.value})
    }
    const {text}=textdata
    const submit=(e)=>{
        e.preventDefault()
        createPost({text})
        setText({text:""})
    }

    return(
        <>
        <div class="post-form">
            <div class="bg-primary p">
            <h3>Say Something...</h3>
            </div>
            <form class="form my-1" onSubmit={e=>submit(e)}>
            <textarea
                name="text"
                cols="30"
                rows="5"
                placeholder="Create a post"
                value={textdata.text}
                onChange={(e)=>change(e)}
                required
            ></textarea>

            <input type="submit" class="btn btn-dark my-1" value="Submit" />
            </form>
        </div>
        </>
    )
}

PostForm.propTypes={
    createPost:PropTypes.func.isRequired
}

export default connect(null,{createPost})(PostForm)