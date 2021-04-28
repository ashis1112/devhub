import axios from 'axios'
import {setAlert} from './alertaction'
import {
    GET_PROFILE,
    PROFILE_ERROR,
    UPDATE_PROFILE,
    PROFILE_CLEAR,
    DELETE_ACCOUNT,
    GET_PROFILES,
    GET_REPO
} from './types'


// Get current users profile
export const getCurrentProfile=()=> async dispatch =>{

    try {
        const res=await axios.get('http://localhost:5000/api/profile/me')
        dispatch({
            type:GET_PROFILE,
            payload:res.data
        })
    } catch (err) {
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}
        })
    }
}

// get all profile
export const getAllProfile=()=> async dispatch =>{
    try {
        dispatch({type:PROFILE_CLEAR})
        const res=await axios.get("http://localhost:5000/api/profile")
        dispatch({
            type:GET_PROFILES,
            payload:res.data
        })
    } catch (err) {
        console.log(err)
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}
        })
    }
}

// get profile by id
export const getProfileById=(id)=> async dispatch =>{
    try {
        dispatch({type:PROFILE_CLEAR})
        const res=await axios.get(`http://localhost:5000/api/profile/user/${id}`)
        dispatch({
            type:GET_PROFILES,
            payload:res.data
        })
    } catch (err) {
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}
        })
    }
}

// Get Github Repos
export const getGithubRepos=(username)=> async dispatch =>{
    try {
        const res=await axios.get(`http://localhost:5000/api/profile/github/${username}`)
        dispatch({
            type:GET_REPO,
            payload:res.data
        })
    } catch (err) {
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}
        })
    }
}
// Create or update profile
export const createProfile=(formData,history,edit=false)=>async dispatch=>{
    try {
        const config={
            header:{
                'Content-Type':'application/json'
            }
        }
        console.log(formData)
        const res=await axios.post('http://localhost:5000/api/profile',formData,config)
        dispatch({
            type:GET_PROFILE,
            payload:res.data
        })
        dispatch(setAlert(edit?'Profil Update':'Profile Created','success'))
        if(!edit){
            history.push('/dashboard')
        }
    } catch (error ){
        error.response.data.errors.map(data=>{
        dispatch(setAlert(data.msg,'danger'))
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:data.msg,status:data.status}
        })
        })
        
    }
}

// add experience
export const addExperiance=(formData,history)=>async dispatch=>{
    try {
        const config={
            header:{
                'Content-Type':'application/json'
            }
        }
        console.log(formData)
        const res=await axios.put('http://localhost:5000/api/profile/experience',formData,config)
        dispatch({
            type:UPDATE_PROFILE,
            payload:res.data
        })
        dispatch(setAlert('Experience Added','success'))
       
        history.push('/dashboard')
        
    } catch (error ){
        error.response.data.errors.map(data=>{
        dispatch(setAlert(data.msg,'danger'))
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:data.msg,status:data.status}
        })
        })
        
    }
}

// add education
export const addEducation=(formData,history)=>async dispatch =>{
    try {
        const config={
            header:{
                'Content-Type':'application/json'
            }
        }
        console.log(formData)
        const res=await axios.put('http://localhost:5000/api/profile/education',formData,config)
        dispatch({
            type:UPDATE_PROFILE,
            payload:res.data
        })
        dispatch(setAlert('Education Added','success'))
        history.push('/dashboard')
        
    } catch (error ){
        console.log(error)
        error.response.data.errors.map(data=>{
        dispatch(setAlert(data.msg,'danger'))
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:data.msg,status:data.status}
        })
        })
        
    }
}

// delete experience
export const deleteExperience=id=>async dispatch=>{
    try {
        const res=await axios.delete(`http://localhost:5000/api/profile/experience/${id}`)
        dispatch({
            type:GET_PROFILE,
            payload:res.data
        })
    } catch (error) {
        console.log(error)
        // error.response.data.errors.map(data=>{
        // dispatch(setAlert(data.msg,'danger'))
        dispatch({
            type:PROFILE_ERROR,
            // payload:{msg:data.msg,status:data.status}
        })
        // })
    }
}
export const deleteEducation=id=>async dispatch=>{
    try {
        const res=await axios.delete(`http://localhost:5000/api/profile/education/${id}`)
        dispatch({
            type:GET_PROFILE,
            payload:res.data
        })
    } catch (error) {
        console.log(error)
        // error.response.data.errors.map(data=>{
        // dispatch(setAlert(data.msg,'danger'))
        dispatch({
            type:PROFILE_ERROR,
            // payload:{msg:data.msg,status:data.status}
        })
        // })
    }
}

// Profile and Account delete

export const accountDelete=()=>async dispatch=>{
    if(window.confirm('Are you sure? This can NOT be undone!')){
        try {
            await axios.delete('http://localhost:5000/api/profile')
            dispatch({
                type:PROFILE_CLEAR,
            })
            dispatch({
                type:DELETE_ACCOUNT
            })
            dispatch(setAlert('Your Account Permanently deleted'))
        } catch (error) {
            dispatch({
                type:PROFILE_ERROR,
                payload:{msg:error.response.statusText,status:error.response.status}
            })
            
        }
    }
}