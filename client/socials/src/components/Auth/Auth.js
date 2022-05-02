import React, {useState, useEffect} from 'react'
import {MdVisibility, MdVisibilityOff, MdLockOutline} from "react-icons/md";
import { GoogleLogin } from 'react-google-login';
import { useDispatch } from 'react-redux';
import { signIn, signUp } from '../../actions/auth';
import { useNavigate } from "react-router-dom"
import Navbar from '../Navbar/Navbar';
import {RiLoader3Fill, RiGoogleFill} from 'react-icons/ri'; 
import "./auth.css";
import gsap from 'gsap'



const Auth = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch(); 
    const [isSignup, setIsSignup] = useState(false);
    const[showPassword, setShowPassword] = useState(false);
    const [Error, setError] = useState(false);
    const[authLoader, setAuthLoader] = useState(false);
    useEffect(() => {
        let tl = gsap.timeline({paused: true});
        tl.to(".loader3fill", {
            rotate: 360,
            scale: 1.2,
            duration: 2,
            ease: "Power2.inOut",
            repeat: -1
        });
    if(authLoader){
        gsap.to(".loader3fill", {
            autoAlpha: 1,
            ease: "power2.inOut",
            duration: .5
        });
        tl.play();
    }else{
        gsap.to(".loader3fill", {
            autoAlpha: 0,
            ease: "power2.inOut",
            duration: .5
        });
        tl.pause();
    }
    }, [authLoader])
    const[errorMessage, setErrorMessage] = useState("");
    const initialState = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    }
    const[formData, setFormData] = useState(initialState)
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name] : e.target.value});
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
       
        if(isSignup){
           await  dispatch(signUp(formData, navigate, setErrorMessage, setError, setAuthLoader));
        }else{
          await  dispatch(signIn(formData, navigate, setErrorMessage, setError, setAuthLoader));
        }
    }
    const googleSuccess = async (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId
 try{
           await  dispatch({type: 'AUTH', data: {result, token}});
           navigate('/homepage/0');
        }catch(err){
console.log(err);
        }
    }
    const googleFailure = (error) => {
        console.log(error.message);
    }
  return (
    <div className='mainAuthContainer'>
        <div className='authHeader'>
        <Navbar/>
        </div>
        
         <div className='authFlexContainer'>
        <div className='authContainer'>
            <div className='authIcon'>
                <MdLockOutline/>
            </div>
            <h6>{isSignup ? "Sign Up" : "Login" } </h6>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    {
                        isSignup && (
                            <>
                            <div className='inputContainer'>
                            <input name="firstName" placeholder=' '
                             required
                             type="text"
                            onChange={(e) => handleChange(e)}/>
                             <label htmlFor="firstName" className='authLabel'>FirstName</label>
                            </div>

                            <div className='inputContainer'>
                            <input name="lastName" placeholder=' '
                            required
                            type="text"
                            onChange={(e) => handleChange(e)}/>
                             <label htmlFor="lastName" className='authLabel'>LastName</label>
                            </div>
                            </>
                        )
                    }
                     <div className='inputContainer'>
                            <input name="email" placeholder=' '
                            required
                            type="text"
                            onChange={(e) => handleChange(e)}/>
                             <label htmlFor="email" className='authLabel'>email</label>
                            </div>

                            <div className='inputPasswordContainer'>
                            <input name="password" placeholder=' '
                            required
                            type={showPassword ? "text" : "password"}
                            onChange={(e) => handleChange(e)}
                        />
                         <label htmlFor="password" className='authLabel'>Password</label>
                        <div className='revealPassword' onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <MdVisibility/> : <MdVisibilityOff/>}
                        </div>
                    {Error && (<p className='errorM'>{errorMessage}</p>)}
                    <div className='loaderContainer'><RiLoader3Fill className='loader3fill'/></div>
                            </div>
                </div>
                <button className='authBtn' type='submit'>{isSignup ? "Sign Up" : "Login"}</button>
                <div className='googleContainer'>
                <GoogleLogin 
                clientId='391637257638-4egfum1b8ra3vc2ad1gmbd4j3b5boi8h.apps.googleusercontent.com' 
                render={(renderProps) => (
<button className='googleAuthBtn' onClick={renderProps.onClick} disabled={renderProps.disabled}
><RiGoogleFill className='googleIcon'/> Google Login</button>
                )}
                onSuccess={googleSuccess}
                onFailure={googleFailure}
                cookiePolicy={'single_host_origin'}
                />
</div>
              
                <div className='authAsk'>
                    <button className="authAskBtn" onClick={() => setIsSignup(!isSignup)}>
                        {isSignup ? 'Already have an account? Login': "Don't have an account?, Sign Up"}
                    </button>
                </div>
            </form>
        </div>
        </div>
    </div>
  )
}

export default Auth
