import React,{useEffect} from 'react'
import {connect} from 'react-redux'
import {getGithubRepos} from '../../redux/actions/profile'
import PropTypes from 'prop-types'
import Spinner from '../../components/layout/spinner'

const ProfileGithubuser=({username,getGithubRepos,repos})=>{
    useEffect(()=>{
        getGithubRepos(username)
    },[])
    console.log(repos)
    return(
    <>
    <div className="profile-github">
        <h2 className='text-primary my-1'>Github Repos</h2>
        {
            repos === null ?(<Spinner/>):(
                repos.map(repo=>(
                    <div key={repo._id} className="repo bg-white p-1 my-1">
                        <div>
                            <h4>
                                <a href={repo.html_url} target='_blank' rel='noipener noreferer'>{repo.name}</a>
                            </h4>
                            <p>{repo.description}</p>
                        </div>
                        <div>
              <ul>
                <li class="badge badge-primary">Stars: {repo.stargazers_count}</li>
                <li class="badge badge-dark">Watchers: {repo.watchers_count}</li>
                <li class="badge badge-light">Forks: {repo.forks_count}</li>
              </ul>
            </div>
                    </div>
                ))
            )
        }
    </div>
    </>
    )
}
ProfileGithubuser.propTypes={
    getGithubRepos:PropTypes.func.isRequired,
    repos:PropTypes.array,
    username:PropTypes.string
}

const mapStateToProps=state=>({
    repos:state.profile.repos
})

export default connect(mapStateToProps,{getGithubRepos})(ProfileGithubuser)