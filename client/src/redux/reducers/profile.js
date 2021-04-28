import {GET_PROFILE,PROFILE_ERROR,PROFILE_CLEAR,UPDATE_PROFILE,GET_PROFILES,GET_REPO} from '../actions/types'

const INITIAL_STATE={
    profile:null,
    repos:[],
    loading:true,
    error:{}
}

const Profile=(state=INITIAL_STATE,action)=>{
    const {type,payload}=action
    switch (type) {
        case GET_PROFILE:
        case GET_PROFILES:
        case UPDATE_PROFILE:
            return{
                ...state,
                profile:payload,
                loading:false
            }
        case PROFILE_ERROR:
            return{
                ...state,
                error:payload,
                loading:false
            }
        case PROFILE_CLEAR:
            return {
                ...state,
                profile:null,
                repos:[],
                loading:false
            }
        case GET_REPO:
            return{
                ...state,
                repos:payload,
                loading:false
            }
        default:
            return state
    }
}

export default Profile