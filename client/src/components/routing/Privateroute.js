import React from 'react'
import {Route,Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

const Privateroute=({isAuthenticate,component,path,...rest})=>{
    // return(
    //     <Route {...rest} render={props=>
    //         !isAuthenticate?(<Redirect to='/login'/>):(<Component {...props} />)
    //     } />
       
    // )
    if(isAuthenticate){
        return(<Route path={path} component={component} />)
    }else{
        return(
            <Redirect to='/login'/>
        )
    }
}

Privateroute.propTypes={
    isAuthenticate:PropTypes.bool.isRequired

}
const mapStateTOProps=(state)=>({
    isAuthenticate:state.register.isAuthenticated
})

export default connect(mapStateTOProps)(Privateroute)