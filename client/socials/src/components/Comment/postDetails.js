import React, { useState, useEffect, useContext } from 'react';
import { useSelector } from 'react-redux';
import { useParams, Link, useNavigate} from 'react-router-dom'
import PostDetail from './postDetailComponent';
import DataContext from '../../context/datacontext';
import Navbar from '../Navbar/Navbar';
import "./postDetail.css";
import Loading from '../rotateLoader/loading';



const PostDetails = () => {
const data = useSelector(state => state.posts);
const { handleRecommendedTagSearch } = useContext(DataContext);
const {id} = useParams();
const [post, setPost] = useState([]);
const [recommended, setRecommended] = useState([]);
const [loading, setLoading] = useState(true); 
useEffect(() => {
    const handlePost = async () => {
        try{
            setLoading(true);
            await setPost(data.find(post => post._id === id));
        }catch(err){
            console.log(err);
        }finally{
            setLoading(false)
        }
    }
    handlePost();
}, [id, data]);

useEffect(() => {

 if(!loading && post){
   handleRecommendedTagSearch(post.tags.join(" "), setRecommended);
 }
  }, [post, loading, handleRecommendedTagSearch]);

const recommendedPosts = recommended.filter(({_id}) => _id !== post._id);



if(loading) return (
    <Loading/>
);

  return (
    <div className='mainPostDetailContainer' >
        <div className='mainPostDetailHeader'>
         <Navbar/>
         </div>
<div className='mainPostDetailContent'>


        <div className='mainPostDetailSection'>
        {
            !loading && (
                <>
               <PostDetail post={post}/>
               </>
               )}
        </div>
        
<div className='mainPostReccommendedSection'>
        {
            !loading && (
                   <div className='recommendedSection'>
                       <h5>You might also like:</h5>
                       <div className="recommendedPostsContainer">
                           {
                               recommendedPosts.map((post, i) => (
             <Link  to={`/postDetails/${post?._id}`} className="recommendedPostContainer " key={i}>
                    
            <div className='cardtitle'>
                <h1 className='title'>{post?.title}</h1>
            </div> 
            <div className='cardcreator'>
                <h1 className=''>{post?.name}</h1>
            </div>
            <div className='cardcontent'>
           <p>{post?.message}</p>
            </div>
            <div className='detaillike'>
                <h1>{`Likes: ${post?.likes.length}`}</h1>
            </div>
            <div className='cardmedia'>
                <img src={post?.selectedFile} alt="post media"/>
            </div>
            </Link>
                                   
                               )
                                   
                               )
                           }
                       </div>
                   </div>
 )}
         </div>
         </div>
    </div>
  )
}

export default PostDetails