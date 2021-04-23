import React,{useState} from 'react'
import {setAlert} from '../../redux/actions/alertaction'
import {register} from '../../redux/actions/auth'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {Redirect} from 'react-router-dom'

const Register=({setAlert,register,isAuthenticate})=>{
    const [formData,setFormData]=useState({
      name:'',
      email:'',
      password:'',
      password2:''
    })
    const {name,email,password,password2}=formData

    const change=(e)=>{
      setFormData({
        ...formData,
        [e.target.name]:e.target.value
      })
    }
    const submit=(e)=>{
      e.preventDefault()
      if(password !== password2){
        setAlert('Password not match','danger')
      }
      register({name,email,password})
    }
    if(isAuthenticate){
      return <Redirect to='/dashboard' />
    }
    return(
        <>
        <h1 class="large text-primary">Sign Up</h1>
      <p class="lead"><i class="fas fa-user"></i> Create Your Account</p>
      <form class="form" onSubmit={submit}>
        <div class="form-group">
          <input type="text" placeholder="Name" name="name" value={name} onChange={(e)=>change(e)}  />
        </div>
        <div class="form-group">
          <input type="email" placeholder="Email Address" name="email" value={email} onChange={(e)=>change(e)} />
          <small class="form-text"
            >This site uses Gravatar so if you want a profile image, use a
            Gravatar email</small
          >
        </div>
        <div class="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
           
            value={password}
            onChange={(e)=>change(e)}
          />
        </div>
        <div class="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
           
            value={password2}
            onChange={(e)=>change(e)}
          />
        </div>
        <input type="submit" class="btn btn-primary" value="Register" />
      </form>
      <p class="my-1">
        Already have an account? <a href="login.html">Sign In</a>
      </p>
        </>
    )
}

Register.propTypes={
  setAlert:PropTypes.func.isRequired,
  register:PropTypes.func.isRequired,
  isAuthenticate:PropTypes.bool
}

const mapStateToProps=(state)=>({
  isAuthenticate:state.register.isAuthenticated
})
export default connect(mapStateToProps,{setAlert,register})(Register)