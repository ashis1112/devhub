import React from 'react'

const Profileabout=({profile:{
    bio,
    skill,
    user:{name}
}})=>{
    return(
        <div class="profile-about bg-light p-2">
          {
              bio && (<>
              <h2 class="text-primary">{name.trim().split(" ")[0]}'s bio</h2>
                <p>
                {bio}
                </p>
              </>)
          }
          <div class="line"></div>
          <h2 class="text-primary">Skill Set</h2>
          <div class="skills">
              {skill && skill.map((skill,id)=>(
                <div key={id} class="p-1"><i class="fa fa-check"></i>{skill}</div>
              ))}
        </div>
        </div>
    )
}

export default Profileabout