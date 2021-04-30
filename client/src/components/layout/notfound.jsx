import React,{useEffect} from 'react'
import {Redirect} from 'react-router-dom'

const Notfound=()=>{
    useEffect(()=>{
        setTimeout(()=>{<Redirect to='/' />},200)
    },[])
    return(
        <>
            <h1 className='x-large text-primary'>
                <i className='fas fa-exclamation0-triangle'/> Page Not Found
            </h1>
            <p className='large'>
                Sorry,this page does not exist
            </p>
            
        </>
    )
}

export default Notfound