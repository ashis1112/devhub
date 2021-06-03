import React from 'react'
import Moment from 'react-moment'

const Profileedu=({profile:{education}})=>{
    console.log(education)
    return(
        <>
        {
          education && education.map(edu=>(
                <div class="profile-edu bg-white p-2">
          <h2 class="text-primary">Education</h2>
          <div>
            <h3>{edu.school}</h3>
            <Moment format="YYYY/MM/DD">{edu.from}</Moment>-{edu.to && (<Moment format="YYYY/MM/DD">{edu.to}</Moment>)}

            <p><strong>Degree: </strong>{edu.degree}</p>
            <p><strong>Field Of Study: </strong>{edu.fieldofstudy}</p>
            <p>
              {edu.description && (<strong>Description: {edu.description} </strong>)}
            </p>
          </div>
        </div>
            ))
        }
        </>
    )
}

export default Profileedu