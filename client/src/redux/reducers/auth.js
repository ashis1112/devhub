import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    DELETE_ACCOUNT
} from '../actions/types'

const INITIAL_STATE={
    token:localStorage.getItem('token'),
    isAuthenticated:false,
    loading:true,
    user:null
}

export default function auth(state=INITIAL_STATE,action){
    switch (action.type) {
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated:true,
                loading:false,
                user:action.payload 
            }
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token',action.payload.token)
            return{
                ...state,
                ...action.payload,   
                isAuthenticated:true,
                loading:false
            }
        case REGISTER_FAIL:
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT:
        case DELETE_ACCOUNT:
            localStorage.removeItem('token')
            return{
                ...state,
                token:null,
                isAuthenticated:false,
                loading:true,
                user:null
            }
    
        default:
            return state
    }
}