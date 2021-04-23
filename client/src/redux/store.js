import {createStore,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import Rootreducer from './rootreducer'

let middelware=[thunk]

const store=createStore(Rootreducer,applyMiddleware(...middelware))

export default store