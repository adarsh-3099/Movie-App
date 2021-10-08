import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './Lists.css'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addPost } from '../../actions/postAction'

function Lists() {

    const dispatch = useDispatch()

    const [popular, setPopular] = useState([])
    const [trending, setTrending] = useState([])
    const [nowPlaying, setNowPlaying] = useState([])

    useEffect(()=>{
        axios.get('https://api.themoviedb.org/3/movie/popular?api_key=6901dc909e96fd4fab1d8a0d8388333b&language=en-US&page=1')
        .then(res => setPopular(res.data.results.slice(1,6)))
        .catch(err => alert(err.message))
    },[])
    
    useEffect(()=>{
        axios.get('https://api.themoviedb.org/3/trending/movie/week?api_key=6901dc909e96fd4fab1d8a0d8388333b')
        .then(res => setTrending(res.data.results.slice(1,6)))
        .catch(err => alert(err.message))
    },[])
    
    useEffect(()=>{
        axios.get('https://api.themoviedb.org/3/movie/now_playing?api_key=6901dc909e96fd4fab1d8a0d8388333b&language=en-US&page=1')
        .then(res => setNowPlaying(res.data.results.slice(1,6)))
        .catch(err => alert(err.message))
    },[])

    const onClickHandler = (id) =>{
        dispatch(addPost(id))
    }

    return (
        <div className="lists">
            <h1 className="display-4 text-left text-white">Popular Films</h1>
                <hr className="text-white"/>
            <div className="col-md-12 text-center d-flex">
                { 
                    popular.map((film,idx)=>(
                        <Link to={"/movies/"+film.id}>
                        <div key={idx} onClick={onClickHandler(film.id)}>
                            <img className="img-fluid height:100px" src={`https://image.tmdb.org/t/p/original${film.poster_path}`} />
                        </div>
                        </Link>
                    ))
                }
            </div>
            <h1 className="display-4 text-left text-white">Trending Films</h1>
            <hr className="text-white"/>
            <div className="col-md-12 text-center d-flex">
                {
                    trending.map((film,idx)=>(
                        <Link to={"/movies/"+film.id}>
                        <div key={idx} onClick={onClickHandler(film.id)}>
                            <img className="img-fluid height:100px" src={`https://image.tmdb.org/t/p/original${film.poster_path}`} />
                        </div>
                        </Link>
                    ))
                }    
            </div>
            <h1 className="display-4 text-left text-white">Now Playing</h1>
            <hr className="text-white"/>
            <div className="col-md-12 text-center d-flex">
                {
                    nowPlaying.map((film,idx)=>(
                        <Link to={"/movies/"+film.id}>
                        <div key={idx} onClick={onClickHandler(film.id)}>
                            <img className="img-fluid height:100px" src={`https://image.tmdb.org/t/p/original${film.poster_path}`} />
                        </div>
                        </Link>
                    ))
                }    
            </div>
        </div>
    )
}

export default Lists
