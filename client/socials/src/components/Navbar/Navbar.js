import React, { useState, useEffect, useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';
import Logo from "../../logo.png"
import gsap from 'gsap';
import "./Navbar.css";
import DataContext from '../../context/datacontext';

const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {user, setUser} = useContext(DataContext);
    const [show, setShow] = useState(false);
    const logout = () => {
        dispatch({type: "LOGOUT"});

        navigate('/homepage/0');
        setUser(null);
        setShow(false);
    }
const location = useLocation();
    useEffect(() => {
       
    const token = user?.token;
  
        setUser(JSON.parse(localStorage.getItem('profile'))); 
  
       

        if(token){
            const decodedToken = decode(token);
            
            if(decodedToken.exp *1000 < new Date().getTime()) return logout()
        }
       
    
    }, [location]);
useEffect(() => {
  gsap.to('.navInfo', {
     yPercent: 0,
     autoAlpha: 1,
    duration: 1,
    ease: "power2.inOut"
 })
}, [show])

   
    
  return (
      <div>
    <div className='navContainer'>
     
     <div className="navLogoContainer">
         <div>
        <Link to="/homepage/0" className='navTitle'><span>M</span>OMENTS</Link></div>
        <div className='navLogo'>
        <img src={Logo} alt="logoImage"/>
        </div>
        </div>
    <div className='navUserContainer' >
        {user ? (
            <>
            <div className='navUser'>
               <img src={user?.result.imageUrl} alt="userImage"/> 
                <h1>{user?.result.name}</h1>
                <button onClick={() => {logout()}}>Logout</button>
            </div>
            <div className='navMenu'>
            <div className={show ? 'menu-btn open' : 'menu-btn'} onClick={() => setShow(show ? false : true)}>
            <div className="bar"></div>
        </div>
        </div>
            </>
        ) : (
            <Link to="/auth" className='navSignIn'>Sign In</Link>
        )}
    </div> 
   
    </div>
    { show && <div className= 'navInfo'>
                <div className= 'navMenuUser'>
                    <div className='navMenuGroup space-x-4'>
                 <img src={user?.result.imageUrl} alt="userImage"/>
                 <h1>{user?.result.name}</h1>
                 </div>
                 <button onClick={() => {logout()}}>Logout</button>
             </div>
    </div>}
    </div>
  )
}

export default Navbar