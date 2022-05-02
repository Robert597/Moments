import mongoose from "mongoose";
import postMessage from "../Models/postMessage.js";
export const getPosts = async (req, res) => {
   try{
    const posts = await postMessage.find().sort({_id: -1}).lean();
    res.status(200).json(posts);
   }catch (err){
       res.status(404).json({message: err.message});
   }
}
export const createPost = async (req, res) => {
    const body = req.body;
    const newPost = postMessage({...body, creator: req.userId, createdAt: new Date().toISOString()});
    try{
            await newPost.save();
            res.status(201).json(newPost);
    }catch(err){
        res.status(409).json({message});
    }
}
export const updatePost = async (req, res) => {
    const { id: _id} = req.params;
    const post = req.body;
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No Post with that id");

    const updatedPost = await postMessage.findByIdAndUpdate(_id, {...post, _id}, {new: true});

    res.json(updatedPost);

}
export const deletePost = async (req, res) => {
    const {id: _id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No Post with that id");

     await postMessage.deleteOne({_id}); 
    res.json({message: "post deleted successfully"});
}
export const likeCount = async (req, res) => {
    const {id: _id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No Post with that id");

    if(!req.userId) return res.json({ message: 'Unauthenticated'});

    const post = await postMessage.findOne({_id});

    const index = post.likes.findIndex((id) => id === String(req.userId));

    if(index === -1) {
        post.likes.push(req.userId);
    }else{
post.likes = post.likes.filter((id) => id !== String(req.userId))
    }
const updatedPost = await postMessage.findByIdAndUpdate(_id, post, {new: true});
     res.json(updatedPost); 
}
export const commentPost = async (req, res) => {
    const { id } = req.params;
    const { value } = req.body;

    const post = await postMessage.findById(id);

    post.comments.push(value);
    await post.save();

    res.json(post);
}