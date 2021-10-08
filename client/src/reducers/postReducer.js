/* eslint-disable default-case */
import { GET_POST, POST_LOADING } from "../actions/types"

const initialState = {
    movie_post: {},
    loading: false,
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function(state=initialState, action){
    switch(action.type){
        case POST_LOADING:
            return {
                ...state,
                loading: true 
            }
        case GET_POST:
            return {
                ...state,
                movie_post: action.payload
            }
        default:
            return {
                ...state
            }
    }
}