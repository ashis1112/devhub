import './App.css';
import Navbar from './components/layout/navbar'
import Landing from './components/layout/landing'
import Login from './components/auth/login'
import Register from './components/auth/register'
import Alert from './components/layout/alert'
import {Route,Switch} from 'react-router-dom'
import store from './redux/store'
import {loadUser} from './redux/actions/auth'
import React,{useEffect} from 'react'
import setAuthtoken from './utils/setAuthtoken'
import Dashboard from './components/dashboard/dashboard'
import Createprofile from './components/profile-form/createprofile'
import Privateroute from './components/routing/Privateroute'

if(localStorage.token){
  setAuthtoken(localStorage.token)
}

const  App=()=>{
  useEffect(()=>{
    store.dispatch(loadUser())
  },[])
  
  return (
    <>
      <Navbar/>
      <Route exact path='/' component={Landing} />
      <section className='container'>
        <Alert />
        <Switch>
          <Route path='/login' component={Login}/>
          <Route  path='/register' component={Register}/>
          <Privateroute  path='/dashboard' component={Dashboard}/>
          <Privateroute  path='/create-profile' component={Createprofile}/>

        </Switch>
      </section>
    </>
  );
}

export default App;
