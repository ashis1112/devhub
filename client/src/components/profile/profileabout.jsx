import React from 'react'

const Profileabout=({profile:{
    bio,
    skill,
    user
}})=>{
    return(
        <div className="profile-about bg-light p-2">
          {
              bio && (<>
              <h2 className="text-primary">{user.name.trim().split(" ")[0]}'s bio</h2>
                <p>
                {bio}
                </p>
              </>)
          }
          <div className="line"></div>
          <h2 className="text-primary">Skill Set</h2>
          <div className="skills">
              {skill && skill.map((skill,id)=>(
                <div key={id} className="p-1"><i className="fa fa-check"></i>{skill}</div>
              ))}
        </div>
        </div>
    )
}

export default Profileabout