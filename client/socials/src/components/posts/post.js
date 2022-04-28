import React, { useState } from 'react';
import Moment from 'moment';
import {AiOutlineMore,  AiOutlineComment, AiOutlineDelete} from "react-icons/ai";
import {FaThumbsUp, FaRegThumbsUp} from "react-icons/fa";
import { useDispatch } from 'react-redux';
import id from '../../actions/id';
import { deletePost } from '../../actions/posts';
import { likePost } from '../../actions/posts';
import { Link, useNavigate } from 'react-router-dom';
import "./post.css";

const Post = ({ post }) => {
    const dispatch = useDispatch();
const user = JSON.parse(localStorage.getItem('profile'));
const[likes, setLikes] = useState(post?.likes);
const [like, setLike] = useState(false);
const userId = user?.result?.googleId || user?.result?._id;
const handleLike = () => {
    dispatch(likePost(post._id))
if( likes.find((like) => like ===  userId)){
    setLikes(likes.filter((_id) => _id !== userId))
}else{
    setLikes([...likes, userId]);
}
}
const Navigate = useNavigate();
    const Like = () => {
        if(likes.length > 0){
            return likes?.find((like) => like === userId) ? (
                <div className='likeContainer1'>
                <FaThumbsUp className='liked'/>&nbsp;{likes.length > 2 ? `you and ${likes.length - 1} others liked` :` ${likes.length} ${likes.length === 1 ? 'like' : 'likes'}`}
                </div>
            ) : (
                <div className='likeContainer'>
                <FaRegThumbsUp />&nbsp;{likes.length} {likes.length === 1 ? 'like' : 'likes'}
                </div>
            )
        }
        return (
            <div className='likeContainer'>
            <FaRegThumbsUp />&nbsp;Like
            </div>
        )
    }

  return (
    <div className='postContainer'>
        <div >
        <Link to={`/postDetails/${post._id}`} className='cardContainer'>
             <div className='cardMedia'>
                <img src={post.selectedFile} alt="post media"/>
            </div>
            <div className='cardTop'>
            <div className='cardCreator'>
                <h1 className='creator'>{post.name}</h1>
            </div>
            <div className='cardMoment'>
                <h1 className='moment'>{Moment(post.createdAt).fromNow()}</h1>
            </div>
            </div>
            <div className='cardtags'>
           <p>{post.tags.map((tag) => `#${tag}`)}</p>
            </div>
            <div className='cardTitle'>
                <h1 className='title'>{post.title}</h1>
            </div>
            <div className='cardContent'>
           <p>{post.message}</p>
            </div>
            </Link>
            <div className='cardActions'>
          
           <button onClick={() => handleLike()} disabled={!user?.result}>
              <Like/>
           </button>
           <button className='comment' onClick={() => Navigate(`/postDetails/${post._id}`)}><AiOutlineComment className='commentbtn'/>{post?.comments?.length}</button>
           {
                (user?.result?.googleId === post?.creator || user?.result?._id === post.creator) && (
                    <button className='deletepost'>
                    <AiOutlineDelete  onClick={() => {dispatch(deletePost(post._id))}}/> 
                </button>
                )
            }
        
        {
                (user?.result?.googleId === post?.creator || user?.result?._id === post.creator) && (
                    <div >
            <AiOutlineMore className='cardicon' onClick={() => { dispatch(id(post._id))}}/>
            </div>
                )
            }
            </div>

        
        </div>
    </div>
  )
}

export default Post