import React, {useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { createPost, updatePost } from '../../actions/posts';
import { useSelector } from 'react-redux';
import id from '../../actions/id';
import { useNavigate } from 'react-router-dom';
import {RiLoader3Fill} from 'react-icons/ri'; 
import "./form.css";
import gsap from 'gsap';
import { getDownloadURL, ref,  uploadBytesResumable } from 'firebase/storage';
import { storage } from '../../firebase';


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
    const [imageFile, setImageFile] = useState({});
    const[formLoader, setFormLoader] = useState(false);
    const [postError, setPostError] = useState("");
    const [isError, setIsError] = useState(false);
    
    
    useEffect(() => {
    if(post) setPostData(post);
    }, [post])
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
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
    }, [formLoader]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormLoader(true);
            if(currentID){
                if(!imageFile.name) {
                    
                     dispatch(updatePost(currentID, {...postData, name: user?.result?.name}, setFormLoader, setIsError,  setPostError)).then(() => {
                        setImageFile({});
                        setFormLoader(false);
                        setShow(false);
                        clear();
                     })
                   
                }else{
                   
                    const storageRef = ref(storage, `/files/${imageFile.name}`);
                    const uploadTask = uploadBytesResumable(storageRef, imageFile);

                    uploadTask.on("state_changed", (snapshot) => {
                        return snapshot;
                    }, (error) => {
                        setFormLoader(false);
                        setIsError(true);
                        setPostError(error.message);
                   },() => {
                        getDownloadURL(uploadTask.snapshot.ref).then(url =>   dispatch(updatePost(currentID, {...postData, selectedFile: url, name: user?.result?.name}, setFormLoader, setIsError,  setPostError))).then(() => {
                            setImageFile({});
                            setFormLoader(false);
                            setShow(false);
                            
                            clear();
                        });
                    })
                }
            }else if(imageFile.name){
                const storageRef = ref(storage, `/files/${imageFile.name}`);
                const uploadTask = uploadBytesResumable(storageRef, imageFile);
               
                   uploadTask.on("state_changed",(snapshot) => {
                   return snapshot;
               }, (error) => {
                setFormLoader(false);
                setIsError(true);
                setPostError(error.message);
                console.log(error);
              }, () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(url => dispatch(createPost({...postData, selectedFile: url, name: user?.result?.name}, navigate, setFormLoader, setIsError, setPostError))).then(() => {
                        setImageFile({});
                        clear();
                        setFormLoader(false);
                    });
                })
               
            }else{
                alert("add image")
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
        <form autoComplete='off' noValidate className='postformContainer' onSubmit={(e) => {
           handleSubmit(e)}}>
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
                <input type="file" onChange={(e) => setImageFile(e.target.files[0])}/>
            </div>
           {isError && (<p className='postError'>{postError}</p>)}
            <button className="postSubmitBtn" type='submit'>Submit</button>
            <button className="postClearBtn" type='submit' onClick={() => clear()}>Clear</button>
        </form>
    </div>
  )
}

export default Form