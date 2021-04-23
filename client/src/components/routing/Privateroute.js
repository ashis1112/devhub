import React from 'react'
import {Route,Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

const Privateroute=({isAuthenticate,Component,...rest})=>{
    return(
        <Route {...rest} render={props=>
            !isAuthenticate?(<Redirect to='/login'/>):(<Component {...props} />)
        } />
    )
}

Privateroute.propTypes={
    isAuthenticate:PropTypes.bool.isRequired

}

const mapStateTOProps=(state)=>({
    isAuthenticate:state.register.isAuthenticated
})

export default connect(mapStateTOProps)(Privateroute)