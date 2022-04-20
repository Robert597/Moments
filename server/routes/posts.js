import express from "express";
import { createPost, getPosts, updatePost, deletePost, likeCount } from "../controllers/post.js";
import auth from '../middleware/auth.js'
const router = express.Router();
router.get('/', getPosts);
router.post("/", auth, createPost);
router.patch("/:id", auth, updatePost);
router.delete("/:id", auth, deletePost);
router.patch('/:id/likecount', auth, likeCount);

export default router;