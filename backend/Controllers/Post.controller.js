import PostModel from "../Models/Post.model.js";
import UserModel from "../Models/User.model.js";

export const getAllPosts = async (req, res) => {
    const posts = await PostModel.find().populate("user").sort({ createdAt: -1 });
    return res.status(200).json({
        message: "All Posts",
        posts: posts
    });
}

export const getFeedPosts = async (req, res) => {

    const { user } = req.query;

    const posts = await PostModel.find().populate("user").sort({ createdAt: -1 });
    const feedPost = posts.filter(post=> post.user._id != user);
    
    return res.status(200).json({
        message: "All Posts",
        posts: feedPost
    });
}


export const createPost = async (req, res) => {

    const data = req.body;

    const newPost = await PostModel.create(data);

    const postAuthor = await UserModel.findById(newPost.user);
    postAuthor.posts.push(newPost._id);
    await postAuthor.save();

    return res.status(200).json({
        message: "Post created successfully",
        post: newPost
    });
}