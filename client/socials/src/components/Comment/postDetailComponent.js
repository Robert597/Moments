import React from 'react';
import Comment from './commentSection';
import "./postDetail.css";
import Moment from "moment";

const PostDetail = ({post}) => {
  return (
    <div className='postDetailContainer'>
    <div className='detailimage'>
    <img src={post.selectedFile} alt="post media"/>
    </div>

    <div className='detailContent'>
    <h1 className='detailstitle'>{post.title}</h1>
    <div className='detailscardtags'>
<p>{post.tags.map((tag) => `#${tag}`)}</p>
</div>
<div className='detailscardContent'>
<p>{post.message}</p>
</div>
<div className='detailscardCreator'>
    <h1 className='detailscreator'><span>Created By:</span> {post.name}</h1>
</div>
<div className='detailscardMoment'>
                <h1 className='detailsmoment'>{Moment(post.createdAt).fromNow()}</h1>
            </div>
<div className='comments'>
   <Comment post={post}/>
</div>
    </div>
    </div>
  )
}

export default PostDetail;