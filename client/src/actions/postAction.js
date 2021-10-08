import axios from "axios";
import { GET_ERRORS, GET_POST } from "./types";

export const addPost = (id) => (dispatch) =>{
    axios.post(`/api/posts/${id}`)
    .then(res=>{
        console.log(res)
    })
    .catch(err => dispatch({
        type: GET_ERRORS,
        payload: err.response.data
    }))
}

export const addReview = (review,id) => (dispatch) => {
    axios.post(`/api/posts/review/${id}`,review)
    .then(res=>{
        console.log(res)
    })
    .catch(err => dispatch({
        type: GET_ERRORS,
        payload: err.response.data
    }))
}

export const getPost = (id) => (dispatch) => {
    axios.get(`/api/posts/${id}`)
    .then(post =>{
        // console.log("Post data---->>>",post.data)
        dispatch({
            type: GET_POST,
            payload: post.data
        })
    })
    .catch(err => {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    })
}