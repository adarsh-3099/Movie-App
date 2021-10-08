import axios from 'axios'
import { GET_PROFILE, PROFILE_LOADING, PROFILE_NOT_FOUND, CLEAR_CURRENT_PROFILE, GET_PROFILES, GET_ERRORS } from '../actions/types'

// Get current profile
export const getCurrentProfile = () => (dispatch) =>{
    dispatch(setProfileLoading())
    axios.get('/api/profile')
    .then(res =>{
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
    })
    .catch(err => {
        dispatch({
            type: GET_PROFILE,
            payload: {}
        })
    }) 
}

// Profile loading
export const setProfileLoading = () =>{
    return {
        type: PROFILE_LOADING,
    }
}

// Create Profile
export const createProfile = (profile,history) => (dispatch) =>{
    console.log(profile)
    axios.post('/api/profile', profile)
    .then(res => {
        history.push('/dashboard')
    })
    .catch(err => dispatch({
        type: GET_ERRORS,
        payload: err.response.data
    }))
}

// Clear Profile
export const clearCurrentProfile = () =>{
    return {
        type: CLEAR_CURRENT_PROFILE,
    }
}

// Adding movie
export const addMovie = (movie,history) => (dispatch) =>{
    axios.post('/api/profile/movies',movie)
    .then(res =>{
        history.push('/dashboard')
    })
}

// Get profile by handle
export const getProfileByHandle = (handle) => (dispatch) =>{
    dispatch(setProfileLoading())
    axios.get(`/api/profile/handle/${handle}`)
    .then(res =>{
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
    })
    .catch(err => {
        dispatch({
            type: GET_PROFILE,
            payload: null
        })
    }) 
}
