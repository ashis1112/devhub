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
import Editprofile from './components/profile-form/editprofile'
import Privateroute from './components/routing/Privateroute'
import AddExperience from './components/profile-form/addexperience'
import AddEducation from './components/profile-form/addeducation'
import Profiles from './components/profiles/profiles'
import Profile from './components/profile/profile'

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
          <Route path='/register' component={Register}/>
          <Route exact path='/profiles' component={Profiles}/>
          <Route path='/profiles/:id' component={Profile} />
          <Privateroute  path='/dashboard' component={Dashboard}/>
          <Privateroute  path='/create-profile' component={Createprofile}/>
          <Privateroute path='/edit-profile' component={Editprofile} />
          <Privateroute path='/add-experience' component={AddExperience} />
          <Privateroute path='/add-education' component={AddEducation} />
        </Switch>
      </section>
    </>
  );
}

export default App;
