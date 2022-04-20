import React, {useState} from 'react'
import {MdVisibility, MdVisibilityOff, MdLockOutline} from "react-icons/md";
import { GoogleLogin } from 'react-google-login';
import { useDispatch } from 'react-redux';
import { signIn, signUp } from '../actions/auth';
import { useNavigate } from "react-router-dom"




const Auth = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch(); 
    const [isSignup, setIsSignup] = useState(false);
    const[showPassword, setShowPassword] = useState(false);
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
           await  dispatch(signUp(formData, navigate));
        }else{
          await  dispatch(signIn(formData, navigate))
        }
    }
    const googleSuccess = async (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId

        try{
           await  dispatch({type: 'AUTH', data: {result, token}});
           navigate('/');
        }catch(err){
console.log(err);
        }
    }
    const googleFailure = (error) => {
        console.log(error)
    }
  return (
    <div>
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
                            <div>
                            <input name="firstName" placeholder='first name'
                             required
                             type="text"
                            onChange={(e) => handleChange(e)}/>
                            </div>

                            <div>
                            <input name="lastName" placeholder='Last name'
                            required
                            type="text"
                            onChange={(e) => handleChange(e)}/>
                            </div>
                            </>
                        )
                    }
                     <div>
                            <input name="email" placeholder='email'
                            required
                            type="text"
                            onChange={(e) => handleChange(e)}/>
                            </div>

                            <div>
                            <input name="password" placeholder='password'
                            required
                            type={showPassword ? "text" : "password"}
                            onChange={(e) => handleChange(e)}
                        />
                        <div onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <MdVisibility/> : <MdVisibilityOff/>}
                        </div>
                            </div>
                </div>
                <button type='submit'>{isSignup ? "Sign Up" : "Login"}</button>
                <div>
                <GoogleLogin 
                clientId='391637257638-4egfum1b8ra3vc2ad1gmbd4j3b5boi8h.apps.googleusercontent.com' 
                render={(renderProps) => (
<button className='' onClick={renderProps.onClick} disabled={renderProps.disabled}
>Google Login</button>
                )}
                onSuccess={googleSuccess}
                onFailure={googleFailure}
                cookiePolicy={'single_host_origin'}
                />
</div>
              
                <div>
                    <button onClick={() => setIsSignup(!isSignup)}>
                        {isSignup ? 'Already have an account? Login': "Don't have an account?, Sign Up"}
                    </button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Auth
