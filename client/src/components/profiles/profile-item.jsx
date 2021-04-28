import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
const Profileitem=({id,profile})=>{
    const {user,status,company,location,skill}=profile
    return(
        <div className='profile bg-light'>
            <img src={user.avatar} alt=""/>
            <div>
                <h2>{user.name.toUpperCase()}</h2>
                <p>{status} {company && <span>at {company}</span>}</p>
                <p className='my-1'>{location && <span>{location}</span>}</p>
                <Link to={`/profiles/${user._id}`} className="btn btn-primary">View Profile</Link>
            </div>
            <ul>
                {skill.slice(0,4).map((skill,index)=>(
                    <li key={index} className="text-primary">
                        <i className="fas fa-check"></i>{skill}
                    </li>
                ))}
            </ul>
        </div>
    )
}

Profileitem.propTypes={
    profile:PropTypes.object.isRequired
}

export default Profileitem