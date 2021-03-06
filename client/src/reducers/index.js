import { combineReducers } from "redux";

import authReducer from './authReducer'
import errorReducer from "./errorReducer";
import postReducer from "./postReducer";
import profileReducer from "./profileReducer";

export default combineReducers({
    auth: authReducer,
    profile: profileReducer,
    movie_post: postReducer,
    errors: errorReducer
})