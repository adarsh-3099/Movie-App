import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getCurrentProfile } from '../../actions/profileAction';
import Spinner from '../../common/Spinner';
import { Link } from 'react-router-dom'
import ProfileAction from './ProfileAction'
import Movies from './Movies'

function Dashboard() {

    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getCurrentProfile())
    },[])

    const { user } = useSelector(state => state.auth)
    const { profile, loading } = useSelector(state => state.profile)

    // console.log(Object.keys(profile).length)
    console.log(profile==null)
    let DashboardContent;
    if(profile==null){
        DashboardContent = (<h4><Spinner /></h4>)
    }else{
        if(Object.keys(profile).length>0){
                DashboardContent = (<div>
                    <h2 className="lead text-white">Welcome <Link to={`/profile/${profile.handle}`}>{user.name}</Link></h2>
                    <ProfileAction />
                    {/* exp. and edu. */}
                    <Movies experience={profile.movies} />
                    <div style={{ marginBottom: '60px' }}> 
                        <button className="btn btn-danger">Delete My Account</button>
                    </div>
                </div>)
        }else{
            console.log(1)
            DashboardContent = (<div>
            <h2 className="lead text-white">Welcome {user.name}</h2>
            <p className="text-white">You have not setup a profile. Please add some info.</p>
            <Link to="/create-profile" className="btn btn-lg btn-success">Create Profile</Link>
        </div>)
        }
    }

    console.log(DashboardContent)

 
    return (
        <div>
            { DashboardContent }
        </div>
    )
}

export default Dashboard