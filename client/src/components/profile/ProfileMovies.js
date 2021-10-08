import axios from 'axios';
import React, { useEffect, useState } from 'react'
//import './ProfileMovies.css'

function ProfileMovies(props) {
    
    const { profile } = props

    //console.log(profile)

    const films = profile.movies 

    console.log(films)
 
    return (
        <div>
            <div className="row">
                <div className="col-md-12 text-center
                ">
                        <h1 className="text-center text-white display-3 mb-4">
                            Favoraite Movies
                        </h1>
                        <hr className="text-white" />
                    <div className="row">
                    {
                            films.map((film)=>(
                                
                                <div key={film._id} className="col-md-12 text-white text-center">
                                        <h4 className="text-center lead">
                                            {film.title}
                                        </h4>
                                </div>
                                
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileMovies
