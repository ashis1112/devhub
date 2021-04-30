import {combineReducers} from 'redux'
import  alert from './reducers/alert'
import auth from './reducers/auth'
import Profile from './reducers/profile'
import Post from './reducers/post'

const Rootreducer=combineReducers({
    alert:alert,
    register:auth,
    profile:Profile,
    post:Post
})


export default Rootreducer