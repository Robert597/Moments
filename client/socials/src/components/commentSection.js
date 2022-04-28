import React, {useState, useRef} from 'react';
import { useDispatch } from 'react-redux';
import { commentPost } from '../actions/posts';

const Comment = ({post}) => {
    const [comments, setComments] = useState(post.comments);
    const [comment, setComment] = useState('');
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));

const handleClick = async () => {
    const finalComment = `${user.result.name}: ${comment}`
const newComment = await dispatch(commentPost(finalComment, post._id));
setComments(newComment);
}
  return (
    <div>
        <div>
            <h1>Comments</h1>
            {
                comments.map((c, i) => (
                    <h1 key={i}>
                        {c}
                    </h1>
                ))
            }
        </div>
        {user?.result?.name && (
  <div>
  <h5>Write a comment</h5>
  <textarea placeholder='comment' value={comment} onChange={(e) => { setComment(e.target.value)}}></textarea>
  <button onClick={(e) => handleClick(e)} disabled={!comment}>Comment</button>
</div>
        )}
      
    </div>
  )
}

export default Comment;