import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Post from './post';
import Pagination from './pagination';


const Posts = ({data}) => {
  const[currentPage, setCurrentPage] = useState(0);
 console.log(data);
  const PER_PAGE = 1;

  



  const handlePageClick = ({selected: selectedPage}) => {
    setCurrentPage(selectedPage);
  }

  const offset = currentPage * PER_PAGE;


const posts =  data.slice(offset, offset + PER_PAGE)

const pageCount = Math.ceil(data.length / PER_PAGE);
    
  return (
  !posts.length ? <div>No posts</div> : (
    <div>
      {
        posts.map((post, i) => {
          return (
            <div key={i}>
             <Post post={post}/>
             <Pagination
             pageCount = {pageCount}
             handlePageClick={handlePageClick}/>
              </div>
          )
        })
      }
    </div>
  )
  )
}

export default Posts;