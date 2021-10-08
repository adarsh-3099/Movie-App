import { GET_ERRORS, SET_CURRENT_USER } from "./types"
import axios from 'axios'
import setAuthToken from "../utils/setAuthToken"
import jwt_decode from 'jwt-decode'

// Register user
export const registerUser = (userData, history) => (dispatch) =>{
    console.log(userData)
    axios.post('/api/users/register',userData)
    .then(result => {
        console.log(result)
        history.push('/login')})
    .catch(err => 
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
        )
}

// Login a user
// Login - Get user token
export const loginUser = (userData) => (dispatch) =>{
    //console.log(userData)
    axios.post('/api/users/login', userData)
    .then(res => {
        // Save to local storage
        const { token } = res.data
        // set token to local storage
        //console.log(res)
        localStorage.setItem('jwtToken',token)
        // set token to auth header
        setAuthToken(token)
        // decode token to get user
        const decoded = jwt_decode(token)
        // set current user
        dispatch(setCurrentUser(decoded))
    })
    .catch(err => dispatch({
        type: GET_ERRORS,
        payload: err.response.data
    }))
}

// set logged in user
export const setCurrentUser  = (decoded) =>{
    return {
        type: SET_CURRENT_USER,
        payload: decoded,
    }
}


// Log user out
export const logoutUser = () => (dispatch) =>{
    // remove token from local storage
    localStorage.removeItem('jwtToken')
    // delete auth header
    setAuthToken(false)
    // set current user to empty obj {} and authentication to false
    dispatch(setCurrentUser({}))
}