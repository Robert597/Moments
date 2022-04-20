import { auth, logout } from "../constants/actionType";

const authReducer = (state = { authData: null}, action) => {
    switch(action.type){
        case auth :  
       localStorage.setItem('profile', JSON.stringify({...action?.data}));
        return {...state, authData: action?.data};
        case logout: localStorage.clear();
        return {...state, authData: null};
        default: return state;
    }
}

export default authReducer;