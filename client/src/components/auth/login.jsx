import React,{useState} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {login} from '../../redux/actions/auth'
import { Redirect } from 'react-router-dom'

const Login=({login,isAuthenticate})=>{
  
  const [formData,setFormData]=useState({
   
    email:'',
    password:'',
    
  })
  const {email,password}=formData

  const change=(e)=>{
    setFormData({
      ...formData,
      [e.target.name]:e.target.value
    })
  }
  const submit=(e)=>{
    e.preventDefault()
    login({email,password})
    console.log(formData)
  }
  if(isAuthenticate){
    return <Redirect to='/dashboard' />
  }

    return(
        <>
         
      <h1 className="large text-primary">Login In</h1>
      <p className="lead"><i className="fas fa-user"></i> Log in into Your Account</p>
      <form className="form" onSubmit={submit}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            required
            value={email}
            onChange={change}

          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={change}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Don't have an account? <Link to="/register">Sign Up</Link>
      </p>
        </>
    )
}
Login.propTypes={
  login:PropTypes.func.isRequired,
  isAuthenticate:PropTypes.bool
}

const mapStateToProps=(state)=>({
  isAuthenticate:state.register.isAuthenticated
})

export default connect(mapStateToProps,{login})(Login)