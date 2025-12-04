import { Router } from "express";
import { getAllPosts, getFeedPosts, createPost } from "../Controllers/Post.controller.js";

const router = Router();

router.get('/', getAllPosts);
router.get('/feed', getFeedPosts);
router.post('/', createPost);

export default router;