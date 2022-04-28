import React from 'react';
import {Routes, Route, Navigate } from "react-router-dom"
import Home from './components/Home/Home';
import Auth from './components/Auth';
import Tags from './components/Tags';
import PostDetails from './components/postDetails';
import Loader from './components/loader/loader';


function App() {
  const user = JSON.parse(localStorage.getItem('profile'));
  return (
    <div className="appContainer">
      <div>
    <Routes>
      <Route exact path='/' element={ <Loader/> } />
      <Route exact path='/homepage/:page' element={<Home/>}/>
      <Route exact path='/auth' element={user  ? <Navigate replace to="/homepage/1" /> :  <Auth/>}/>
      <Route exact path='/searchtags/:tags' element={<Tags/>}/>
      <Route exact path='/postDetails/:id' element={<PostDetails/>}/>
    </Routes>
    </div>
    </div>
  );
}

export default App;
