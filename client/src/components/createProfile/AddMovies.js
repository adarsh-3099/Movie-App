import React, { useState } from 'react'
import classnames from 'classnames'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addMovie } from '../../actions/profileAction'
import axios from 'axios'

function AddMovies() {

    const [title,setTitle] = useState("")
    
    const errors = useSelector(state => state.errors)
    const dispatch = useDispatch()
    const history = useHistory()

    const submitHandler = (event)=>{
        event.preventDefault();
    
        const newMovie = {
            title: title,    
        }

        console.log(newMovie)

        dispatch(addMovie(newMovie,history))

    }

    return (
        <div className="add-Movies">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <Link to="/dashboard" className="btn btn-success">
                            Go Back
                        </Link>
                        <h1 className="dispaly-4 text-center text-white">
                            Add Movies
                        </h1>
                        <small className="d-block pb-3 text-white">* -- Required Fields</small>
                        <form onSubmit={submitHandler} className="shadow-lg p-3 mb-5 bg-white rounded">
                            <input 
                                className={classnames("form-control form-control-lg",{'is-invalid': errors.handle})}
                                placeholder="* Title" 
                                value={title}
                                onChange={(e)=>setTitle(e.target.value)}
                                name="title"
                                type="text" />
                            <input type="submit" className="btn btn-success btn-block mt-4" />
                        </form>

                    </div>
                </div>  
            </div>
        </div>
    )
}

export default AddMovies
