import React,{Fragment} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {logout} from '../../redux/actions/auth'
import PropTypes from 'prop-types'
const Navbar=({auth,logout})=>{
    const authLinks=(
        <ul>
                <li>
                    <Link to="/profiles">
                        Devlopers
                    </Link>
                </li>
                <li>
                    <Link to="/post">
                        Post
                    </Link>
                </li>
                <li>
                    <Link to="/create-profile">
                        <span className='hide-sm'>Create Profile</span>
                    </Link>
                </li>
                <li>
                    <Link to="/dashboard">
                        <i className='fas fa-user'/>{''}
                        <span className='hide-sm'>Dashboard</span>
                    </Link>
                </li>
                <li>
                   <a onClick={logout} href="#!">
                    <i className="fas fa-sign-out-alt"></i>{' '}
                    <span className='hide-sm'>Logout</span>
                   </a>
                </li>
        </ul>
    )
    const guestLinks=(
            <ul>
               <li>
                    <Link to="/profiles">
                        Devlopers
                    </Link>
                </li>
                <li><Link to="/register">Register</Link></li>
                <li><Link to="/login">Login</Link></li>

            </ul>
    )
    return(
        <nav className="navbar bg-dark">
            <h1>
                <Link to="/"><i className="fas fa-code"></i>DevloperHub</Link>
            </h1>
            {(<Fragment>{auth.isAuthenticated ? authLinks : guestLinks}</Fragment>)}
        </nav>
    )
}

Navbar.propTypes={
    auth:PropTypes.object,
    logout:PropTypes.func
}

const mapStateToProps=(state)=>({
    auth:state.register
})

export default connect(mapStateToProps,{logout})(Navbar)