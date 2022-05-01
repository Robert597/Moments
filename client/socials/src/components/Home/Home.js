import React, {useEffect, useState, useContext}  from 'react';
import Form from '../Form/form';
import Posts from '../posts/posts';
import Search from '../Search/search';
import Navbar from '../Navbar/Navbar';
import "./home.css";
import DataContext from "../../context/datacontext"
import {AiOutlineArrowLeft
,  AiOutlineSearch, AiOutlinePlus, AiOutlineArrowRight} from "react-icons/ai";
import Loading from '../rotateLoader/loading';
import gsap from 'gsap';

const Home = () => {
  const[show, setShow] = useState(false);
  const {loading} = useContext(DataContext);

  const tl = gsap.timeline();
  useEffect(() => {
    if(!loading){
   tl.fromTo('.homeNavbar', {
      yPercent: -100,
      duration: 1,
      ease: "power2.inOut"
   }, {
    yPercent: 0,
    stagger: .5,
    duration: 1,
    ease: "power2.inOut"
   }).fromTo('.homeContentPosts',  {
    xPercent: -100,
    duration: 1,
    ease: "power2.inOut"
   },  {
    xPercent: 0,
    stagger: .5,
    duration: 1,
    ease: "power2.inOut"
   }).fromTo('.homeContentside', {
    xPercent: 100,
    duration: 1,
    ease: "power2.inOut"
   },  {
    xPercent: 0,
    stagger: .5,
    duration: 1,
    ease: "power2.inOut"
   })
  }
  }, [loading])
  if(loading) return (<Loading/>)
 

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
        <Form/>
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