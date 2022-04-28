import Axios from 'axios';

const API = Axios.create({ baseURL: 'http://localhost:3500' });

API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }

    return req;
})

export const fetchPosts = () => API.get('/posts');
export const createPost = (newPost) => API.post('/posts', newPost);
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) =>  API.patch(`/posts/${id}/likecount`);
export const comment = (value, id) =>  API.post(`/posts/${id}/comment`, { value });

export const signIn = (FormData) => API.post('/auth/signIn', FormData);
export const signUp = (FormData) => API.post('/auth/signUp', FormData);