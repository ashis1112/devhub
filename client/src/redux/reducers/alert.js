import {SET_ALERT,REMOVE_ALERT} from '../actions/types'

const initial_state=[]

const alert=(state=initial_state,action)=>{
    switch (action.type) {
        case SET_ALERT:
           return [...state,action.payload]
        case REMOVE_ALERT:
            return state.filter(alert=>alert.id !== action.payload)
        default:
            return state 
    }
}

export default alert
