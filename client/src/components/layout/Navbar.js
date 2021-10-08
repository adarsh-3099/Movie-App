import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { logoutUser } from '../../actions/authAction'

function Navbar() {

    const auth = useSelector(state => state.auth)

    const dispatch = useDispatch()

    const onLogout = (e) =>{
        e.preventDefault();
        dispatch(logoutUser())
    }

    const { isAuthenticated, user } = auth
    const authLinks = (
        <ul className="navbar-nav ml-auto">
            <li className="nav-item">
                <Link className="nav-link" to="/dashboard">Dashboard</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/feed">Post Feed</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/news">News</Link>
            </li>
            <li className="nav-item">
                <a href="#" onClick={onLogout} className="nav-link">
                    <img src={user.avatar} alt={user.name} title='You must have a gravatar' style={{width: '25px', marginRight: '5px' }} />
                    Log Out
                </a>
            </li>
        </ul>
)

    const guestLinks = (
        <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="/register">Sign Up</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                </li>
            </ul>
    )


    return (
        <div>
            <nav className="navbar navbar-expand-sm p-4 navbar-dark bg-dark mb-4">
                <div className="container">
                <img src="https://julio22b.github.io/letterboxd-home/imgs/logo-white.png" style={{height: '40px'}} />
                
                <Link className="navbar-brand" to="/">Movie App</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
                    <span className="navbar-toggler-icon"></span>
                </button>
                
                <div className="collapse navbar-collapse" id="mobile-nav">
                    <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/movies"> Movies
                        </Link>
                    </li>
                    </ul>
                    { isAuthenticated ? authLinks : guestLinks }
      
                </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
