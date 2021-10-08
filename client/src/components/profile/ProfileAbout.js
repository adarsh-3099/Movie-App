import React from 'react'
import isEmpty from '../../validation/is_empty'

function ProfileAbout(props) {
    const {profile} = props

    console.log(profile)

    return (
        <div>
            <div className="row">
            <div className="col-md-12">
              <div className="card-body bg-warning mb-3">
                <h3 className="text-center text-info"></h3>
                <p className="lead">{
                    isEmpty(profile.bio) ?  null : (<span> {profile.bio}</span>)}

                </p>
                <hr />
                <h3 className="text-center text-white">Favoraite Aritsts</h3>
                <div className="row">
                  <div className="d-flex flex-wrap justify-content-center align-items-center">
                    {
                        profile.artists.map((artist, idx) => (
                            <div className="p-3 text-white">
                                <i class="fa fa-check"></i>{artist}
                            </div>
                        ))
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
    )
}

export default ProfileAbout
