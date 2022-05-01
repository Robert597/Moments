import React, { useState,  useEffect} from 'react';
import Post from './post';
import Pagination from './pagination';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import "./post.css"


const Posts = ({setShow}) => {
  const {page} = useParams();
  const[currentPage, setCurrentPage] = useState(Number(page));
  const data = useSelector((state) => state.posts);
 
  const PER_PAGE = 8;
const navigate = useNavigate();
  
 useEffect(() => {
  setCurrentPage(Number(page));
 }, [page])
 


  const handlePageClick = ({selected: selectedPage}) => {
   navigate(`/homepage/${selectedPage}`);
    
  }

  const offset = currentPage * PER_PAGE;


const posts =  data.slice(offset, offset + PER_PAGE)
console.log(posts);
const pageCount = Math.ceil(data.length / PER_PAGE);
    
  return (
    <>
    <div className='mainPostsContainer' >
      {
        posts.map((post, i) => {
          return (
            <div key={i}>
             <Post post={post}
             setShow = {setShow}/>
              </div>
          )
        })
      }
    </div>
    <Pagination
             pageCount = {pageCount}
             handlePageClick={handlePageClick}
             page={Number(page)}/>
    </>
  )

}

export default Posts;