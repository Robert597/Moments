import * as api from '../api';
import * as actions from '../constants/actionType';

//Action creators
export const getPosts = () => async (dispatch) => {
    try{
        const { data } = await api.fetchPosts();
        dispatch({
            type: actions.get, payload: data
        })
    }catch (err) {
        console.log(err.message);
    }
    
}
export const createPost = (post) => async (dispatch) => {
    try{
        const {data} = await api.createPost(post);
        dispatch({
            type: actions.create,
            payload: data
        })
    }catch(err){
        console.log(err.messge);
    }
}
export const updatePost = (id, post) => async (dispatch) => {
    try{
        const { data } = await api.updatePost(id, post);

        dispatch({
            type: actions.update,
            payload: data
        })
    }catch(err){
        console.log(err);
    }
}
export const deletePost = (id) => async (dispatch) => {
    try{
        await api.deletePost(id);
        dispatch({type: actions.remove, payload: id});
    }catch(err){
        console.log(err);
    }
}
export const likePost = (id) => async (dispatch) => {
    try{
        const {data} = await api.likePost(id);

        dispatch({
            type: actions.update,
            payload: data
        })
    }catch(err){
        console.log(err);
    }
}