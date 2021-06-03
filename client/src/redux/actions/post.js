import axios from 'axios'
import { body } from 'express-validator'
import {setAlert} from './alertaction'
import {GET_POSTS,GET_POST,POST_ERROR,
    UPDATE_LIKES,DELETE_POST,CREATE_POSTS,
    ADD_COMMENT,REMOVE_COMMENT
} from './types'


// Get Post
export const getPost=()=>async dispatch=>{
    try {
        const res=await axios.get('http://localhost:5000/api/posts')
        dispatch({
            type:GET_POSTS,
            payload:res.data
        })
    } catch (err) {   
        dispatch({
            type:POST_ERROR,
            payload:err
        })
    }
}
// Get Single-Post
export const getsinglePost=(id)=>async dispatch=>{
    try {
        const res=await axios.get(`http://localhost:5000/api/posts/${id}`)
        dispatch({
            type:GET_POST,
            payload:res.data
        })
    } catch (err) {   
        dispatch({
            type:POST_ERROR,
            payload:err
        })
    }
}
// Get like
export const getLike=(id)=>async dispatch=>{
    try {
        const res=await axios.put(`http://localhost:5000/api/posts/like/${id}`)
        const likes=res.data
        dispatch({
            type:UPDATE_LIKES,
            payload:{id,likes:{likes}}
        })
    } catch (err) {   
        dispatch({
            type:POST_ERROR,
            payload:err
        })
    }
}
// Remove  Like
export const removeLike=(id)=>async dispatch=>{
    try {
        const res=await axios.put(`http://localhost:5000/api/posts/unlike/${id}`)
        const likes=res.data
        dispatch({
            type:UPDATE_LIKES,
            payload:{id,likes:{likes}}
        })
    } catch (err) {   
        dispatch({
            type:POST_ERROR,
            payload:err
        })
    }
}

// Delete Post
export const deletePost=(id)=>async dispatch=>{
    try {
        await axios.delete(`http://localhost:5000/api/posts/${id}`)
        dispatch({
            type:DELETE_POST,
            payload:id
        })
        dispatch(setAlert('Post Remove','success'))
    } catch (err) {   
        dispatch({
            type:POST_ERROR,
            payload:err
        })
    }
}

// Create Post
export const createPost=({text})=>async dispatch=>{
    try {
        const config={
            headers:{
                'Content-Type':'application/json',
            }
        }
        const body={text}
        const res=await axios.post(`http://localhost:5000/api/posts`,body,config)
        console.log(res)

        dispatch(setAlert("Post created","success"))
        dispatch({
            type:CREATE_POSTS,
            payload:res.data
        })
    } catch (err) {   
        dispatch({
            type:POST_ERROR,
            payload:err
        })
    }
}

export const addComment=(postid,{comment})=>async dispatch=>{
    try {
        const config={
            headers:{
                'Content-Type':'application/json',
            }
        }
        const body={comment}
        const res=await axios.post(`http://localhost:5000/api/posts/comment/${postid}`,body,config)
        dispatch(setAlert("Comment Added","success"))
        dispatch({
            type:ADD_COMMENT,
            payload:res.data
        })
       
    } catch (err) {   
        dispatch({
            type:POST_ERROR,
            payload:err
        })
    }
}

export const deleteComment=(postid,commentid)=>async dispatch=>{
    try {
        
        const res=await axios.delete(`http://localhost:5000/api/posts/comment/${postid}/${commentid}`)
        console.log(res)
        dispatch(setAlert("Comment Deleted","success"))
        dispatch({
            type:REMOVE_COMMENT,
            payload:commentid
        })
    } catch (err) {   
        dispatch({
            type:POST_ERROR,
            payload:err
        })
    }
}