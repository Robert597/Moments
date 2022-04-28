import { auth } from "../constants/actionType";
import * as api from "../api/index.js";

export const signIn = (formData, navigate) => async (dispatch) => {
try{
const { data } = await api.signIn(formData);

dispatch({ type: auth, data});
navigate('/homepage/1');
}catch(err) {
console.log(err);
}
}
export const signUp = (formData, navigate) => async (dispatch) => {
    try{
    
        const { data } = await api.signUp(formData);

        dispatch({ type: auth, data});
        navigate('/homepage/1');

    }catch(err) {
    console.log(err);
    }
    }