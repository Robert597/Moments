import { combineReducers } from "redux";
import posts from "./posts";
import id from "./id"
import authReducer from './auth'
export default combineReducers({
    posts, id, authReducer
});