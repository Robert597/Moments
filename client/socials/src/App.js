import React from 'react';
import Navbar from './components/Navbar';
import {Routes, Route, Navigate } from "react-router-dom"
import Home from './components/Home';
import Auth from './components/Auth';


function App() {
  const user = JSON.parse(localStorage.getItem('profile'));
  return (
    <div className="App  text-3xl font-bold underline">
      <Navbar/>
    <Routes>
      <Route exact path='/' element={<Home/>}/>
      <Route exact path='/auth' element={!user ? <Auth/> : <Navigate replace to="/" />}/>
    </Routes>
    </div>
  );
}

export default App;
