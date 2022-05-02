import React, {useState, useEffect} from 'react';
import FileBase from 'react-file-base64';
import { useDispatch } from 'react-redux';
import { createPost, updatePost } from '../../actions/posts';
import { useSelector } from 'react-redux';
import id from '../../actions/id';
import { useNavigate } from 'react-router-dom';
import {RiLoader3Fill} from 'react-icons/ri'; 
import "./form.css";
import gsap from 'gsap';


const Form = ({setShow}) => {
    const user = JSON.parse(localStorage.getItem('profile'));
    const currentID = useSelector(state => state.id);
    const post = useSelector(state => currentID ? state.posts.find((p) => p._id === currentID) : null);
    const [postData, setPostData] = useState({
        title: '',
        message: '',
        tags: '',
        selectedFile: ''
    });
    const[formLoader, setFormLoader] = useState(false);
    const [postError, setPostError] = useState("");
    const [isError, setIsError] = useState(false);
    useEffect(() => {
        let tl = gsap.timeline({paused: true});
        tl.to(".loaderIcon", {
            rotate: 360,
            scale: 1.2,
            duration: 2,
            ease: "Power2.inOut",
            repeat: -1
        });
    if(formLoader){
        gsap.to(".loaderIcon", {
            autoAlpha: 1,
            ease: "power2.inOut",
            duration: .5
        });
        tl.play();
    }else{
        tl.pause();
        gsap.to(".loaderIcon", {
            autoAlpha: 0,
            ease: "power2.inOut",
            duration: .5
        });
    }
    }, [formLoader])
    
    useEffect(() => {
    if(post) setPostData(post);
    }, [post])
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            setFormLoader(true);
            if(currentID){
                await dispatch(updatePost(currentID, {...postData, name: user?.result?.name}));
                setShow(false);
                clear();
            }else if(postData.selectedFile){
            await dispatch(createPost({...postData, name: user?.result?.name}, navigate));
            clear();
            }else{
                alert("add image")
            }
    
        }catch(err){
            setFormLoader(false);
            setIsError(true);
            setPostError(err.response.data.message);
        }finally{
            setFormLoader(false);
            setIsError(false);
        }
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
            <div className='unable'>
                <h1>
                    Please Sign In To Create Your Own Memories and Like Other's Memories.
                </h1>
            </div>
        )
    }
  return (
    <div className='postFormContainer'>
        <form autoComplete='off' noValidate className='postformContainer' onSubmit={(e) => handleSubmit(e)}>
            <h1> { currentID ? "Editing" : "Creating"} a Memory </h1>
            <div className='postFormTitle'>
            <input name='title'value={postData.title} onChange={(e) => setPostData({...postData, title: e.target.value})} placeholder=" "/>
            <label htmlFor="title" className='postLabel'>title</label>
            </div>
            <div className='postFormMessage'>
            <textarea name='message' value={postData.message} onChange={(e) => setPostData({...postData, message: e.target.value})} placeholder=" "/>
            <label htmlFor="message" className='postLabel'>Message</label>
            <RiLoader3Fill className='loaderIcon'/>
            </div>
            <div className='postFormTags'>
            <input name='tags'  value={postData.tags} onChange={(e) => setPostData({...postData, tags: e.target.value.split(',')})} placeholder=" "/>
            <label htmlFor="tags" className='postLabel'>tags(comma Seperated)</label>
            </div>
            <div className='formImageUpload'>
                 <FileBase type="file" multiple={false} 
                onDone={({base64}) => setPostData({...postData, selectedFile: base64})}
                 />
            </div>
           {isError && (<p className='postError'>{postError}</p>)}
            <button className="postSubmitBtn" type='submit'>Submit</button>
            <button className="postClearBtn" type='submit' onClick={() => clear()}>Clear</button>
        </form>
    </div>
  )
}

export default Form