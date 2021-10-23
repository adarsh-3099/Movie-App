import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { addPost } from '../../actions/postAction'


function Recommendations() {

    const [recommendations, setRecommendations] = useState([])

    const dispatch = useDispatch()

    const params = useParams()
    const { movie_id } = params

    console.log(movie_id)

    const onClickHandler = (id)=>{
        dispatch(addPost(id))
    }

    useEffect(()=>{
        axios.get(`https://api.themoviedb.org/3/movie/${movie_id}/recommendations?api_key=6901dc909e96fd4fab1d8a0d8388333b&language=en-US&page=1`)
        .then(res => setRecommendations(res.data.results.slice(2,6)))
        .catch(err => alert(err.message))
    },[])

    console.log(recommendations)

    return (
        <div>
            <h1 className="display-4 text-left text-center text-white">User Reviews</h1>
            <hr className="text-white"/>
            <div className="recommend col-md-12 text-center d-flex">
                {
                    recommendations.map((film,idx)=>(
                        <Link to={"/movies/"+film.id}>
                        <div key={idx} onClick={onClickHandler(film.id)}>
                            <img className="rec img-fluid height:100px" src={`https://image.tmdb.org/t/p/original${film.poster_path}`} />
                            <p className="lead text-white">{film.title}</p>
                        </div>
                        </Link>
                    ))
                }    
            </div>
        </div>
    )
}

export default Recommendations
