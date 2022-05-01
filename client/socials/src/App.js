import React, { useContext } from 'react';
import {Routes, Route, Navigate } from "react-router-dom"
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import Tags from './components/Search/Tags';
import PostDetails from './components/Comment/postDetails';
import Loader from './components/loader/loader';
import DataContext from './context/datacontext';

function App() {
  const {user} = useContext(DataContext);
  return (
    <div className="appContainer">
      <div>
    <Routes>
      <Route exact path='/' element={ <Loader/> } />
      <Route exact path='/homepage/:page' element={<Home/>}/>
      <Route exact path='/auth' element={user  ? <Navigate replace to="/homepage/0" /> :  <Auth/>}/>
      <Route exact path='/search/:keywords' element={<Tags/>}/>
      <Route exact path='/postDetails/:id' element={<PostDetails/>}/>
    </Routes>
    </div>
    </div>
  );
}

export default App;
