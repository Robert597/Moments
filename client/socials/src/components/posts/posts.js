import React, { useState, useContext, useEffect} from 'react';
import Post from './post';
import Pagination from './pagination';
import DataContext from '../../context/datacontext';
import { useParams, useNavigate } from 'react-router-dom';
import "./post.css"

const Posts = () => {
  const {page} = useParams();
  const[currentPage, setCurrentPage] = useState(Number(page));
  const {filterData: data} = useContext(DataContext);
 
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

const pageCount = Math.ceil(data.length / PER_PAGE);
    
  return (
  !posts.length ? <div>No posts</div> : (
    <>
    <div className='mainPostsContainer' >
      {
        posts.map((post, i) => {
          return (
            <div key={i}>
             <Post post={post}/>
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
  )
}

export default Posts;