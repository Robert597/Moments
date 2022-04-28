import React, { useState, useEffect, useContext } from 'react';
import { useSelector } from 'react-redux';
import { useParams, Link, useNavigate} from 'react-router-dom'
import PostDetail from './postDetailComponent';
import DataContext from '../context/datacontext';
import Navbar from './Navbar/Navbar';



const PostDetails = () => {
const data = useSelector(state => state.posts);
console.log(data);
const { handleTagSearch } = useContext(DataContext);
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
   handleTagSearch(post.tags.join(" "), setRecommended);
 }
  }, [post, loading, handleTagSearch]);

const recommendedPosts = recommended.filter(({_id}) => _id !== post._id);

const navigate = useNavigate();
  return (
    <div>
         <Navbar/>
        {loading && (
            <div>Loading...</div>
        )}
        {
            !loading && (
                <>
                <button onClick={() => navigate(-1)}>Go Back</button>
               <PostDetail post={post}/>
               {recommendedPosts.length > 0 && (
                   <div >
                       <h5>You might also like:</h5>
                       <div className="flex w-screen">
                           {
                               recommendedPosts.map((post, i) => (
             <Link  to={`/postDetails/${post?._id}`} key={i}>
                    
            <div className='cardTitle'>
                <h1 className='title'>{post?.title}</h1>
            </div> 
            <div className='cardCreator'>
                <h1 className='creator'>{post?.name}</h1>
            </div>
            <div className='cardContent'>
           <p>{post?.message}</p>
            </div>
            <div className='like'>
                <h1>{`Likes: ${post?.likes.length}`}</h1>
            </div>
            <div className='cardMedia'>
                <img src={post?.selectedFile} alt="post media" width='500' height='200'/>
            </div>
            </Link>
                                   
                               )
                                   
                               )
                           }
                       </div>
                   </div>
 )}
               </>
            )
        }
    </div>
  )
}

export default PostDetails