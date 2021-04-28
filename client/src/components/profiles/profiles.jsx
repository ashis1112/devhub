import React,{useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Spinner from '../layout/spinner'
import {getAllProfile} from '../../redux/actions/profile'
import Profileitem from './profile-item'
const Profiles=({getAllProfile,profile})=>{
    useEffect(()=>{
        getAllProfile()
    },[getAllProfile])
    console.log(profile)
    return(<>
        {
            profile.profile == null ? <Spinner/>:(<>
            <h1 className='large text-primary'>Devlopers</h1>
            <p className='lead'>
                <i className='fab fa-connectdevlop'></i> Browse and Connect with devlopers
            </p>
            <div className="profiles">
                {
                    profile.profile.length > 0 ?(
                        profile.profile.map(pro=>(
                            <Profileitem id={pro._id} profile={pro} />
                        ))
                    ):(<h3>Profil Not Found</h3>)
                }
            </div>
            </>)
        }
    </>)
}

Profiles.propTypes={
    getAllProfile:PropTypes.func.isRequired,
    profile:PropTypes.object.isRequired
}

const mapStateToProps=(state)=>({
    profile:state.profile
})

export default connect(mapStateToProps,{getAllProfile})(Profiles)