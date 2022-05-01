import React, {useContext } from 'react';
import DataContext from '../../context/datacontext';
import { useParams } from 'react-router';
import Post from '../posts/post';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import "./search.css";
import {FaArrowLeft} from 'react-icons/fa'


const Tags = () => {
    const {tagData: data} = useContext(DataContext);
    const {keywords} = useParams();
    let navigate = useNavigate();
  return (
    <div className='tagsContainer'>
    <div className='tagsHeader'>
      <Navbar/>
      </div>


      <div className='tagsContent'>
      { !data.length ? <div>{`No posts with keywords: ${keywords}`}</div> : (
          <div>
              {
                  data.map((post, i) => {
                    return (
                        <div key={i} className="tagMainPostContainer">
             <Post post={post}/>
             </div> 
                    )
                  })
              }
          </div>
      )}
      </div>
      
    </div>
  )
}

export default Tags;
