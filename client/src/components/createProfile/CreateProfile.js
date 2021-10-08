import React, { Component, useState } from 'react'
// import InputGroup from './InputGroup'
// import SelectList from '../common/SelectList'
// import TextArea from '../common/TextArea'
import { createProfile } from '../../actions/profileAction'
import classnames from 'classnames'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'

function CreateProfile() {

        const errors = useSelector(state => state.errors)

        const dispatch = useDispatch()

        const history = useHistory()

        const [displaySocialInputs,setDisplaySocialInputs] = useState(false)
        const [handle,setHandle] = useState("")
        const [location,setlocation] = useState("")
        const [status,setStatus] = useState("")
        const [bio,setBio] = useState("")
        const [artists,setArtists] = useState("")
        const [youtube,setYoutube] = useState("")
        const [facebook,setFacebook] = useState("")
        const [instagram,setInstagram] = useState("")
        const [letterboxd,setLetterboxd] = useState("")

        const onSubmit = (e) =>{
            e.preventDefault();

            const newProf = {
                handle: handle,
                location: location,
                status: status,
                bio: bio,
                artists: artists,
                youtube: youtube,
                facebook: facebook,
                instagram: instagram,
                letterboxd: letterboxd
            }
            console.log(newProf)
            dispatch(createProfile(newProf,history))

        }

        let socialInputs;

        if(displaySocialInputs){
            socialInputs = (
                <div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepand">
                        </div>
                        <input value={youtube} onChange={(e)=>setYoutube(e.target.value)}
                        className={classnames("form-control form-control-lg",{'is-invalid': errors.youtube})}
                        placeholder="Youtube" />
                        { errors.youtube && (<div className="invalid-feedback">{errors.youtube}</ div>) }
                    </div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepand">
                        </div>
                        <input value={facebook} onChange={(e)=>setFacebook(e.target.value)}
                        className={classnames("form-control form-control-lg",{'is-invalid': errors.facebook})}
                        placeholder="Facebook" />
                        { errors.facebook && (<div className="invalid-feedback">{errors.facebook}</ div>) }
                    </div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepand">
                        </div>
                        <input value={instagram} onChange={(e)=>setInstagram(e.target.value)}
                        className={classnames("form-control form-control-lg",{'is-invalid': errors.instagram})}
                        placeholder="Instagram" />
                        { errors.instagram && (<div className="invalid-feedback">{errors.instagram}</ div>) }
                    </div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepand">
                        </div>
                        <input value={letterboxd} onChange={(e)=>setLetterboxd(e.target.value)}
                        className={classnames("form-control form-control-lg",{'is-invalid': errors.letterboxd})}
                        placeholder="LetterBoxd" />
                        { errors.letterboxd && (<div className="invalid-feedback">{errors.letterboxd}</ div>) }
                    </div>
                </div>
            )
        }

        return (
            <div className="create-profile">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center text-white">Create Your Profile</h1>
                            <p className="lead text-center text-white">
                                Let's get some information to make your profile stand out.
                            </p>
    
                            <form onSubmit={onSubmit} className="shadow-lg p-3 mb-5 bg-white rounded">
                                <div className="form-group">                            
                                    <input 
                                        className={classnames("form-control form-control-lg",{'is-invalid': errors.handle})}
                                        placeholder="Profile Handle"
                                        name="handle" 
                                        type="text"
                                        onChange={(e) => setHandle(e.target.value)}
                                        value={handle}
                                        error={errors.handle}
                                    />
                                    { errors.handle && (<div className="invalid-feedback">{errors.handle}</ div>) }
                                </div>

                                <div className="form-group">                            
                                    <input 
                                        className={classnames("form-control form-control-lg",{'is-invalid': errors.location})}
                                        placeholder="Location"
                                        name="location"
                                        type="text"
                                        onChange={(e) => setlocation(e.target.value)}
                                        value={location}
                                        error={errors.location}
                                    />
                                    { errors.location && (<div className="invalid-feedback">{errors.location}</ div>) }
                                </div>
            
                                <div className="form-group">                            
                                    <input 
                                        className={classnames("form-control form-control-lg",{'is-invalid': errors.status})}
                                        placeholder="Status"
                                        name="status"
                                        type="text"
                                        onChange={(e) => setStatus(e.target.value)}
                                        value={status}
                                        error={errors.status}
                                    />
                                    { errors.status && (<div className="invalid-feedback">{errors.status}</ div>) }
                                </div>
                                
                                <div className="form-group">                            
                                    <input 
                                        className={classnames("form-control form-control-lg",{'is-invalid': errors.bio})}
                                        placeholder="Bio"
                                        name="bio"
                                        type="text"
                                        onChange={(e) => setBio(e.target.value)}
                                        value={bio}
                                        error={errors.bio}
                                    />
                                    { errors.bio && (<div className="invalid-feedback">{errors.bio}</ div>) }
                                </div>

                                
                                <div className="form-group">                            
                                    <input 
                                        className={classnames("form-control form-control-lg",{'is-invalid': errors.artists})}
                                        placeholder="Artists - Should be , seperated value"
                                        name="artists"
                                        type="text"
                                        onChange={(e) => setArtists(e.target.value)}
                                        value={artists}
                                        error={errors.artists}
                                    />
                                    { errors.artists && (<div className="invalid-feedback">{errors.artists}</ div>) }
                                </div>
                                <div className="mb-3">
                                    <button type="button"
                                    onClick={() =>{
                                        setDisplaySocialInputs(prevState => ({
                                            displaySocialInputs: !prevState.displaySocialInputs
                                        }))
                                    }} className="btn btn-light">
                                        Add Social Network Links
                                    </button>
                                    <span className="text-muted">  Optional</span>
                                </div>
                                {socialInputs}
                                <input type="submit" value="submit" className="btn btn-success btn-block mt-4" />
                            </form>

                        </div>    
                    </div>
                </div>
            </div>
        )
}

export default CreateProfile