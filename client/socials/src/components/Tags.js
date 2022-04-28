import React, {useContext } from 'react';
import DataContext from '../context/datacontext';
import { useParams } from 'react-router';
import Post from './posts/post';
import { Link } from 'react-router-dom';
import Navbar from './Navbar/Navbar';

const Tags = () => {
    const {tagData: data} = useContext(DataContext);
    const {tags} = useParams();
  return (
    <div>]

       <Navbar/>
      { !data.length ? <div>{`No posts with tags: ${tags}`}</div> : (
          <div>
              {
                  data.map((post, i) => {
                    return (
                        <div key={i}>
             <Post post={post}/>
             </div> 
                    )
                  })
              }
          </div>
      )}
      <Link to = '/'>Back</Link>
    </div>
  )
}

export default Tags;
