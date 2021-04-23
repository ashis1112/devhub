import {GET_PROFILE,PROFILE_ERROR,PROFILE_CLEAR} from '../actions/types'

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
        default:
            return state
    }
}

export default Profile