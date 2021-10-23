import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { addPost, addReview, getPost } from '../../actions/postAction'
import isEmpty from '../../validation/is_empty'
import CommentItem from './CommentItem'
import { Link } from 'react-router-dom'

function SingleMovie() {
    
    const { user, isAuthenticated } = useSelector(state => state.auth)

    const { movie_post } = useSelector(state => state.movie_post)

    const dispatch = useDispatch()

    const [text,setText] = useState("")
    
    const onClickHandler = (event)=>{
        event.preventDefault();

        const review = {
            text: text,
            name: user.name,
            avatar: user.avatar,
        }
        setText("")
        dispatch(addReview(review,movie_id))
    }


    useEffect(()=>{
        dispatch(getPost(movie_id))
    },[])

    let authLinks;
    authLinks = (
        <div className="container">
            <div className="row">
                <div className="form-group">
                    <textarea type="text-area" value={text} onChange={(e)=>setText(e.target.value)} className="form-control form-control-lg" />
                    <br />
                    <button type="submit" onClick={onClickHandler} className="btn btn-success">Post Review</button>
                </div>
            </div>
        </div>
    )

    const [movie, setMovie] = useState({})

    const params = useParams()
    const { movie_id } = params
    // console.log("---]]]",movie_post)
    // console.log(recommendations)

    useEffect(()=>{
        const getData = (movie_id) =>{
             axios.get(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=6901dc909e96fd4fab1d8a0d8388333b&language=en-US`)
            .then(res => setMovie(res.data))
            .catch(err => console.log(err))
        }
        getData(movie_id)
    },[])

    return (
        <div>
            <div className="d-flex flex-column d-sm-flex flex-sm-row align-items-lg-center justify-content-center">
                <div className="container">
                    <img className="img-fluid w-25" src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} />
                    <p className="lead text-white">{movie.title}</p>
                </div>
                <div className="container">
                    <h3 className="lead text-center text-white">Rating</h3>
                    <p className="lead text-white "><small>{movie.vote_average}</small></p>
                    <hr className="text-white " />
                    <h3 className="lead text-center text-white ">Overview</h3>
                    <p className="lead text-white  col-xs-3"><small>{movie.overview}</small></p>
                    <hr className="text-white " />
                    { isAuthenticated ? (
                        <Link to={"/movies/"+movie_id+"/recommend"}>
                             <button className="btn btn-success">Get Recommendations</button>
                        </Link>
                    ) : null }
                </div>
            </div>
            <h1 className="display-4 mb-4 text-white text-left">Movie Reviews</h1>
            <hr className="text-white" />
            { isAuthenticated ? authLinks : null }
            <h1 className="display-4 text-left text-center text-white">User Reviews</h1>
            <hr className="text-white"/>
            <CommentItem post={movie_post} />
        </div>
    )
}

export default SingleMovie
