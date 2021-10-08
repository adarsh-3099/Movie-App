import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './Landing.css'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { addPost } from '../../actions/postAction'

function Landing() {

    const [movie,setMovie] = useState("")
    const [data,setData] = useState({})

    const dispatch = useDispatch()

    useEffect(()=>{
        console.log(movie)
        axios.get(`https://api.themoviedb.org/3/search/movie?query=${movie}&api_key=6901dc909e96fd4fab1d8a0d8388333b`)
        .then(res => setData(res.data.results[0]))
        .catch(err => console.log(err.message))
    },[movie])
    
    console.log(data)

    const onClickHandler = () =>{
        dispatch(addPost(data.id))
    }

    return (
        <div>
            <div class="input-group container d-flex justify-content-center">
                        <div class="form-outline col-md-4">
                            <input type="search" id="form1" class="form-control" onChange={(e)=>setMovie(e.target.value)} />
                        </div>
                        <Link to={"/movies/"+data.id}>
                            <button onClick={onClickHandler} class="btn btn-warning">
                                Search
                            </button>
                        </Link>
                </div>
            <br />
            <div className="movie p-top-10">
                <img src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSpo4NsFW7M1zY5QdesQbuhCMuyG81ly_EtUT0DoSYRec39LM6v" className="film" />
                <img src="https://prodfilmbankmedia.azureedge.net/web/prod-film/5621/uk/incendies-0-poster.jpg?width=300&height=444&mode=Crop" className="film" />
                <img src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSA1Wn8tXPBGwkeNeFqWB5rWBbq8wlsDTo-7qGBk60NbfyGLfMq" className="film" />
                <img src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSP45_yhddTbyvG36jA8eyr0TESelit_nJRrrJ2V432PJz5rOcP" className="film" />
            </div>
            <div className="landing">
                <div className="dark-overlay landing-inner text-light">
                <div className="container">
                    <div className="row">
                    <div className="col-md-12 text-center">
                        <h1 className="display-3 mb-4">Movie App
                        </h1>
                        <p className="lead"> Create a movie profile, share your movie reviews and make your movie list.</p>
                        <hr />
                    </div>
                    </div>
                </div>
                </div>
                </div>

        </div>
    )
}

export default Landing
