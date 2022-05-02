import React, { useState, useContext}  from 'react';
import Form from '../Form/form';
import Posts from '../posts/posts';
import Search from '../Search/search';
import Navbar from '../Navbar/Navbar';
import "./home.css";
import DataContext from "../../context/datacontext"
import {AiOutlineArrowLeft
,  AiOutlineSearch, AiOutlinePlus, AiOutlineArrowRight} from "react-icons/ai";
import Loading from '../rotateLoader/loading';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const[show, setShow] = useState(false);
  const {loading, getError,  GetErrorMessage} = useContext(DataContext);
let navigate = useNavigate();
  
  if(loading) return (<Loading/>)
 if(getError) return (<div className='errorCont'><p>{GetErrorMessage}</p>
 <button onClick={() => navigate(0)}>Reload</button>
 </div>);

 return ( 
   !loading && (
    <div className={show ? 'homeContainer show' : 'homeContainer hide'}>
    <div className='homeNavbar'>
      <Navbar/>
    </div>
      
      <div className='homeContentPosts'>
        <Posts setShow={setShow}/>
      </div>
      <div className='homeContentside'>
  
    <div className='contentDissapear'>
        <Search />
        <Form setShow={setShow}/>
        </div>
        <div className='navIconContainer'>
          <div className='searchIconContainer' onClick={() => setShow(show ? false : true)}>
            <AiOutlineSearch className='animate-pulse'/>
          </div>
          <div className='addIconContainer' onClick={() => setShow(show ? false : true)}>
            <AiOutlinePlus className='animate-pulse'/>
          </div>
        </div>
        <div className='revealIcon' onClick={() => setShow(show ? false : true)}>{show ? <AiOutlineArrowRight className='animate-pulse'/> : <AiOutlineArrowLeft className='animate-pulse'/>}</div>
      </div>
   
   
    </div>
   )
  )
}

export default Home