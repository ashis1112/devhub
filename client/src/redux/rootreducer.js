import {combineReducers} from 'redux'
import  alert from './reducers/alert'
import auth from './reducers/auth'
import Profile from './reducers/profile'
const Rootreducer=combineReducers({
    alert:alert,
    register:auth,
    profile:Profile
})


export default Rootreducer