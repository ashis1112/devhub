import React,{useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Spinner from '../layout/spinner'
import {getProfileById} from '../../redux/actions/profile'
import { Link } from 'react-router-dom'
import Profiletop from './profiletop'
import Profileabout from './profileabout'
import Profileedu from './profileeducation'
import Profileexp from './profileexperience'
import ProfileGithubuser from './profilegithubuser'

const Profile=({match,getProfileById,profile,auth})=>{
    useEffect(()=>{
        getProfileById(match.params.id)
    },[match.params.id,getProfileById])
    
    return(
       <>
        {profile === null?(<Spinner/>):(
            <>
                <Link to='/profiles' className='btn btn-light'>
                    Back To Profiles
                </Link>
                {/* { auth.user._id === profile.user._id &&(<Link to='/edit-profile' className='btn btn-dark'>
                    Edit Profile
                </Link>)} */}
                
            </>
        )}
        <div className='profile-grid my-1'>
            {profile && <Profiletop profile={profile}/> }
            {profile && <Profileabout profile={profile}/>}
            {profile && <Profileedu profile={profile}/>}
            {profile && <Profileexp profile={profile}/>}
            {profile && <ProfileGithubuser username={profile.githubusername}/>}


        </div>
       </>
    )
}

Profile.propTypes={
    getProfileById:PropTypes.func,
    profile:PropTypes.object.isRequired,
    auth:PropTypes.object.isRequired

}

const mapStateToProps=state=>({
    profile:state.profile.profile,
    auth:state.register.user
})

export default connect(mapStateToProps,{getProfileById})(Profile)