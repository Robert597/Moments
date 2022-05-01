import React, {useState, useRef, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { commentPost } from '../../actions/posts';
import "./postDetail.css";
import {RiLoader3Fill} from 'react-icons/ri';
import gsap from 'gsap';

const Comment = ({post}) => {
    const[commentLoader, setCommentLoader] = useState(false);
    const [comments, setComments] = useState(post.comments);
    const [comment, setComment] = useState('');
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));

    useEffect(() => {
        let tl = gsap.timeline({paused: true});
        tl.to(".loader1Icon", {
            rotate: 360,
            scale: 1.2,
            duration: 2,
            ease: "Power2.inOut",
            repeat: -1
        });
    if(commentLoader){
        gsap.to(".loader1Icon", {
            autoAlpha: 1,
            ease: "power2.inOut",
            duration: .5
        });
        tl.play();
    }
    }, [commentLoader])

const handleClick = async () => {
    try{
        setCommentLoader(true);
        const finalComment = `${user.result.name}: ${comment}`
        const newComment = await dispatch(commentPost(finalComment, post._id));
        setComments(newComment);
    }catch(err){
        console.log(err.message);
    }
    finally{
        setCommentLoader(false);
    }
  
}
  return (
    <div className='commentContainer'>
        <div className='commentTop'>
            <h1>Comments</h1>
            <div className='containingComments'>
            {
                comments.map((c, i) => (
                    <p key={i}>
                        {c}
                    </p>
                ))
            }
            </div>
        </div>
        <div className='commentBox'>
        {user?.result?.name && (
  <div className='commentbox'>
  <h5>Write a comment</h5>
  <div className='commentTextArea'>
  <textarea placeholder=' ' value={comment} name="comment" onChange={(e) => { setComment(e.target.value)}}></textarea>
  <label htmlFor="comment" className='commentLabel'>Comment</label>
            <RiLoader3Fill className='loader1Icon'/>
            </div>
  <button onClick={(e) => handleClick(e)} disabled={!comment}>Comment</button>
</div>
        )}
      </div>
    </div>
  )
}

export default Comment;