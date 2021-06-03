import axios from 'axios'
import {setAlert} from './alertaction'
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    PROFILE_CLEAR

} from './types'
import setAuthtoken from '../../utils/setAuthtoken'

// Load User
export const loadUser=()=>async dispatch=>{
    const token=localStorage.getItem('token')
    if(token){
        setAuthtoken(token)
    }
    try {
        const res=await axios.get('http://localhost:5000/api/auth')
        dispatch({
            type:USER_LOADED,
            payload:res.data
        })
    } catch (err) {
        dispatch({
            type:AUTH_ERROR
        })
    }

}

// Register User
export const register=({name,email,password})=> async dispatch=>{
    const config={
        headers:{
            'Content-Type':'application/json'
        }
    }
    const body={name,email,password}

    try {
        const res=await axios.post('http://localhost:5000/api/user',body,config)
        dispatch({
            type:REGISTER_SUCCESS, 
            payload:res.data 
        })
        dispatch(loadUser())

    } catch (err) { 
        const errors=err.response.data.err
        if(errors){
            dispatch(setAlert(errors,'danger'))
        }

        dispatch({
            type:REGISTER_FAIL,
            
        })
    }
}

// Login User

export const login=({email,password})=> async dispatch=>{
    const config={
        headers:{
            'Content-Type':'application/json'
        }
    }
    const body={email,password}

    try {
        const res=await axios.post('http://localhost:5000/api/auth',body,config)
        console.log('response',res)
        dispatch({
            type:LOGIN_SUCCESS, 
            payload:res.data 
        })
        dispatch(loadUser())
    } catch (err) { 
        const errors1=err.response.data.err
        if(errors1){
            dispatch(setAlert(errors1,'danger'))
        }

        dispatch({
            type:LOGIN_FAIL,
            
        })
    }
}

export const logout=()=>dispatch=>{
    dispatch({type:LOGOUT},{type:PROFILE_CLEAR})
}