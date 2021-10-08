import React from 'react'
import isEmpty from '../../validation/is_empty'

function ProfileHeader(props) {

    const {profile} = props

    // console.log(profile.user)

    return (
        <div className="row">
            <div className="col-md-12">
              <div className="card card-body bg-warning text-white mb-3" >
                <div className="row">
                  <div className="col-4 col-md-3 m-auto">
                    {isEmpty(profile.user.avatar) ? null : (<img className="rounded-circle" src={profile.user?.avatar} alt="" />) }
                  </div>
                </div>
                <div className="text-center">
                  {isEmpty(profile.user.name) ? null : (<img className="rounded-circle" src={profile.user?.name} alt="" />) }
                  <h1 className="display-4 text-center">{profile.user?.name}</h1>
                  {isEmpty(profile.location) ? null : (<span>{profile.location}</span>)}
                  <p className="lead text-center">{profile.status}</p>
                  <p className="lead text-center"> 
                  {isEmpty(profile.bio) ? null : (<span>{profile.bio}</span>)}</p>
                  
                  <p>
                     
                      {isEmpty(profile.social && profile.social.facebook) ? null : (
                          <a className="text-white p-2" href={profile.social.facebook} target="_blank">
                          facebook
                        </a>
                      )}
                      
                      {isEmpty(profile.social && profile.social.linkedin) ? null : (
                          <a className="text-white p-2" href={profile.social.linkedin} target="_blank">
                          linkedin
                        </a>
                      )}

                      {isEmpty(profile.social && profile.social.instagram) ? null : (
                          <a className="text-white p-2" href={profile.social.instagram} target="_blank">
                          instagram
                        </a>
                      )}
                  </p>
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

export default ProfileHeader
