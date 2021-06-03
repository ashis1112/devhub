import React,{useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getCurrentProfile} from '../../redux/actions/profile'
import {accountDelete} from '../../redux/actions/profile'
import Spinner from '../layout/spinner'
import {Link} from 'react-router-dom'
import DashboardAction from './dashboardaction'
import Experience from './experience'
import Education from './education'

const Dashboard=({getCurrentProfile,auth,profiles,accountDelete})=>{
    useEffect(()=>{
        getCurrentProfile()
    },[getCurrentProfile])

    return( profiles.profile == null && profiles.loading ? <Spinner /> : <>
    <h1 className='large text-primary'>Dashboard</h1>
    <p className="lead">
        <i className="fas fa-user"></i>Welcome {auth.user && auth.user.user.name}
    </p>
    {
        profiles.profile.length > 0 ? (<> 
        <DashboardAction/>  
        <Experience experience={profiles.profile[0].experience}/>
        <Education  education={profiles.profile[0].education}/>

        <div className='my-2'>
            <button className='btn btn-danger' onClick={()=>accountDelete()}>
                <i className="fas fa-user"/>   Delete My Account
            </button>
        </div>
        </>):(<>
            <p>You have not yet profile,add some info</p>
            <Link to='/create-profile' className='btn btn-primary my-1'> Create Profile</Link>
        </>)
    }
    </>
    )
}

Dashboard.propTypes={
    getCurrentProfile:PropTypes.func.isRequired,
    auth:PropTypes.object.isRequired,
    profiles:PropTypes.object.isRequired,
    accountDelete:PropTypes.func.isRequired
}

const mapStateToProps=state=>({
    auth:state.register,
    profiles:state.profile
    
})

export default connect(mapStateToProps,{getCurrentProfile,accountDelete})(Dashboard)