import React from 'react'
import { Link } from 'react-router-dom'

function ProfileAction() {
    return (
        <div class="btn-group mb-4" role="group">
            <Link to="/edit-profile" className="btn btn-light">
              <i className="fas fa-user-circle text-info mr-1"></i> Edit Profile
            </Link>
            <Link to="/add-movies" className="btn btn-light">
              <i className="fab fa-black-tie text-info mr-1"></i>
              Add Movie</Link>
        </div>
    )
}

export default ProfileAction
