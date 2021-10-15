import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { getProfileByHandle } from '../../actions/profileAction'
import Spinner from '../../common/Spinner'
import ProfileHeader from './ProfileHeader'
import ProfileMovies from './ProfileMovies'

function UserProfile( props ) {

    const profile = useSelector(state => state.profile)
    const history = useHistory()

    console.log(props)

    useEffect(()=>{
         if(props.match.params.handle){
             getProfileByHandle(props.match.params.handle)
         }
     },[])

    useEffect(()=>{
        if(profile.profile === null || profile.loading){
            history.push('/not-found')
        }
    })

    let profileContent;

    if(profile === null || profile.loading){
        profileContent = <Spinner />
    }else{
        profileContent = (
            <div>
                <div className="row">
                    <div className="col-md-6">
                        <Link to="/dashboard" className="btn btn-light mb-3 float-left">
                            Back to Dashboard Section
                        </Link>
                    </div>
                </div>
                <div className="col-md-12">
                        <ProfileHeader profile={profile.profile} />
                        <ProfileMovies profile={profile.profile} /> 
                                             {/* <ProfileAbout profile={profile.profile} />
                        {/* <ProfileCreds education={profile.education} experience={profile.experience} /> */}
                        {/* {profile.githubusername ? (<ProfileGithub username={profile.githubusername} />) : null } */} 
                </div> 
            </div>
        )
    }

    console.log("User prof----------------------->>>>>>>>>>>>>>>",profile.profile)

    return (
        <div className="profile">
            { profileContent }
        </div>
    )
}

export default UserProfile
