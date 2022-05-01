import { auth } from "../constants/actionType";
import * as api from "../api/index.js";

export const signIn = (formData, navigate, errorMessage, errorState, Loader) => async (dispatch) => {
try{
    Loader(true);
const { data } = await api.signIn(formData);
dispatch({ type: auth, data});
navigate('/homepage/0');
}catch(err) {
    Loader(false);
errorState(true);
errorMessage(err.response.data.message)
}finally{
    Loader(false);
    errorState(false);
}
}
export const signUp = (formData, navigate, errorMessage, errorState, loader) => async (dispatch) => {
    try{
        loader(true)
    const { data } = await api.signUp(formData);
        dispatch({ type: auth, data});
        navigate('/homepage/0');
  }catch(err) {
      loader(false)
        errorState(true);
        errorMessage(err.response.data.message)
    }finally{
        loader(false);
        errorState(false);
    }
    }