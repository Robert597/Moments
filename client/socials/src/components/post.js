import React from 'react';
import Moment from 'moment';
import {AiOutlineMore, AiFillDelete} from "react-icons/ai";
import {FaThumbsUp, FaRegThumbsUp} from "react-icons/fa";
import { useDispatch } from 'react-redux';
import id from '../actions/id';
import { deletePost } from '../actions/posts';
import { likePost } from '../actions/posts';

const Post = ({ post }) => {
    const dispatch = useDispatch();
const user = JSON.parse(localStorage.getItem('profile'));

    const Like = () => {
        if(post.likes.length > 0){
            return post.likes.find((like) => like === (user?.result?.googleId || user?.result?._id)) ? (
                <>
                <FaThumbsUp/>&nbsp;{post.likes.length > 2 ? `you and ${post.likes.length - 1} others liked` :` ${post.likes.length} ${post.likes.length === 1 ? 'like' : 'likes'}`}
                </>
            ) : (
                <>
                <FaRegThumbsUp/>&nbsp;{post.likes.length} {post.likes.length === 1 ? 'like' : 'likes'}
                </>
            )
        }
        return (
            <>
            <FaRegThumbsUp/>&nbsp;Like
            </>
        )
    }
  return (
    <div>
        <div className='cardContainer'>
            {post.selectedFile ? ( <div className='cardMedia'>
                <img src={post.selectedFile} alt="post media" width='500' height='200'/>
            </div>) : null}
            <div className='cardCreator'>
                <h1 className='creator'>{post.name}</h1>
            </div>
            <div className='cardMoment'>
                <h1 className='moment'>{Moment(post.createdAt).fromNow()}</h1>
            </div>
            {
                (user?.result?.googleId === post?.creator || user?.result?._id === post.creator) && (
                    <div className='cardicon'>
            <AiOutlineMore onClick={() => { dispatch(id(post._id))}}/>
            </div>
                )
            }
            <div className='cardtags'>
           <p>{post.tags.map((tag) => `#${tag}`)}</p>
            </div>
            <div className='cardTitle'>
                <h1 className='title'>{post.title}</h1>
            </div>
            <div className='cardContent'>
           <p>{post.message}</p>
            </div>
            <div className='cardActions'>
           <button onClick={() => dispatch(likePost(post._id))} disabled={!user?.result}>
              <Like/>
           </button>
           {
                (user?.result?.googleId === post?.creator || user?.result?._id === post.creator) && (
                    <button>
                    <AiFillDelete onClick={() => {dispatch(deletePost(post._id))}}/> Delete
                </button>
                )
            }
        
          
            </div>

        </div>
    </div>
  )
}

export default Post