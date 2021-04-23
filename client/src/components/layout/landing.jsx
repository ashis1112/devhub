import React from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
const Landing=({isAuthenticated})=>{
    if(isAuthenticated){
        return <Redirect to='/dashboard'/>
    }
    return(
        <section className="landing">
            <div className="dark-overlay">
                <div className="landing-inner">
                    <h1 className="x-large">DevloperHub</h1>
                    <p className="lead">
                        Create a devloper profile/portfolio, share posts and get help from other devlopers
                    </p>
                    <div className="buttons">
                        <a href="/register" className="btn btn-primary">Sign Up</a>
                        <a href="/login" className="btn btn-light">Login</a>
                    </div>
                </div>
            </div>
        </section>
    )
}

Landing.propTypes={
    isAuthenticated:PropTypes.bool
}

const mapStateToProps=(state)=>({
    isAuthenticated:state.register.isAuthenticated
})

export default connect(mapStateToProps)(Landing)