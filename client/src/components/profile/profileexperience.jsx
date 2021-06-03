import React from 'react'
import Moment from 'react-moment'

const Profileexp=({profile:{experience}})=>{
    return(
        <>
        {
            experience && experience.map(exp=>(
                <div class="profile-exp bg-white p-2">
          <h2 class="text-primary">Experience</h2>
          <div>
            <h3 class="text-dark">{exp.company}</h3>
            <Moment format="YYYY/MM/DD">{exp.from}</Moment>-{exp.to && (<Moment format="YYYY/MM/DD">{exp.to}</Moment>)}
            <p><strong>Position: </strong>{exp.title}</p>
        
          </div>
        </div>
            ))
        }
        </>
    )
}

export default Profileexp