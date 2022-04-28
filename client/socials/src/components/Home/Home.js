import React  from 'react';
import Form from '../Form/form';
import Posts from '../posts/posts';
import Search from '../search';
import Navbar from '../Navbar/Navbar';
import "./home.css";

const Home = () => {
 return (
    <div className='homeContainer'>
    <div className='homeNavbar'>
      <Navbar/>
    </div>
      
      <div className='homeContentPosts'>
        <Posts/>
      </div>
      <div className='homeContentside'>
        <Search />
        <Form/>
      </div>
   
        
    </div>
  )
}

export default Home