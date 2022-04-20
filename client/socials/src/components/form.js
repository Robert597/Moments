import React, {useState, useEffect} from 'react';
import FileBase from 'react-file-base64';
import { useDispatch } from 'react-redux';
import { createPost, updatePost } from '../actions/posts';
import { useSelector } from 'react-redux';
import id from '../actions/id';

const Form = () => {
    const user = JSON.parse(localStorage.getItem('profile'));
    const currentID = useSelector(state => state.id);
    const post = useSelector(state => currentID ? state.posts.find((p) => p._id === currentID) : null);
    const [postData, setPostData] = useState({
        title: '',
        message: '',
        tags: '',
        selectedFile: ''
    });
    //console.log(currentID);
    useEffect(() => {
    if(post) setPostData(post);
    }, [post])
    
    const dispatch = useDispatch();
  
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(currentID){
            await dispatch(updatePost(currentID, {...postData, name: user?.result?.name}));
        }else{
        await dispatch(createPost({...postData, name: user?.result?.name}));
        }
        clear();
    }
    const clear = () => {
        dispatch(id(""));
        setPostData({
            title: '',
            message: '',
            tags: '',
            selectedFile: ''
        });
    };

    if(!user?.result?.name){
        return (
            <div>
                <h1>
                    Please Sign In To Create A Post
                </h1>
            </div>
        )
    }
  return (
    <div>
        <form autoComplete='off' noValidate className='' onSubmit={(e) => handleSubmit(e)}>
            <h1> { currentID ? "Editing" : "Creating"} a Memory </h1>
            <input name='title' placeholder='title' value={postData.title} onChange={(e) => setPostData({...postData, title: e.target.value})}/>
            <input name='message' placeholder='message' value={postData.message} onChange={(e) => setPostData({...postData, message: e.target.value})}/>
            <input name='tags' placeholder='tags' value={postData.tags} onChange={(e) => setPostData({...postData, tags: e.target.value.split(',')})}/>
            <div>
                <FileBase type="file" multiple={false} 
                onDone={({base64}) => setPostData({...postData, selectedFile: base64})} />
            </div>
            <button type='submit'>Submit</button>
            <button onClick={clear}>Clear</button>
        </form>
    </div>
  )
}

export default Form