import React from 'react';
import Comment from './commentSection';

const PostDetail = ({post}) => {
  return (
    <div className='flex w-full'>
    <div className='detailimage'>
    <img src={post.selectedFile} alt="post media" width='500' height='200'/>
    </div>
    <div>
    <h1 className='title'>{post.title}</h1>
    <div className='cardtags'>
<p>{post.tags.map((tag) => `#${tag}`)}</p>
</div>
<div className='cardContent'>
<p>{post.message}</p>
</div>
<div className='cardCreator'>
    <h1 className='creator'>{`Created By: ${post.name}`}</h1>
</div>
<div className='comments'>
   <Comment post={post}/>
</div>
    </div>
    </div>
  )
}

export default PostDetail;