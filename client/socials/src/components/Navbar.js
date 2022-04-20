import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';

const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const logout = () => {
        dispatch({type: "LOGOUT"});

        navigate('/');
        setUser(null);
    }
const location = useLocation();
    useEffect(() => {
       
    const token = user?.token;
  
        setUser(JSON.parse(localStorage.getItem('profile'))); 
  
       

        if(token){
            const decodedToken = decode(token);
            
            if(decodedToken.exp *1000 < new Date().getTime()) return logout();
        }
       
    
    }, [location]);

   
    
  return (
    <div>
     
     <div>Memories</div>
        <Link to="/">Nav</Link>

    <div>
        {user ? (
            <div>
                <img src={user.result.imageUrl}/>
                <h1>{user.result.name}</h1>
                <button onClick={() => {logout()}}>Logout</button>
            </div>
        ) : (
            <Link to="/auth">Sign In</Link>
        )}
    </div> 
    </div>
  )
}

export default Navbar