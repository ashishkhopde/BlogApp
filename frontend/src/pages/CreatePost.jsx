import axios from "axios";
import React from "react";
import { Navigate, useNavigate } from "react-router-dom";

export default function CreatePost() {

    const user = JSON.parse(localStorage.getItem("user"));
    const nagivate = useNavigate();

    async function handleSubmit(e) {

        e.preventDefault();
        
        const postData = {
            title: e.target.title.value,
            description: e.target.description.value,
            image: e.target.image.value,
            user: user.id           
        };

        const res = await axios.post(`${import.meta.env.VITE_API_URL}/post`, postData);
        // console.log(res.data.post);
        nagivate("/");
        
        if (res.data.post) {
            alert("Post created successfully");
        }
    }

    return user ? (
        <div className="min-h-screen bg-black text-white px-6 py-10">
            <div className="max-w-3xl mx-auto bg-gray-900 p-8 rounded-xl border border-gray-700 shadow-lg">
                <h2 className="text-3xl font-bold text-green-400 mb-6">Create New Post</h2>
                <form onSubmit={handleSubmit}>

                    <label className="block mb-3 text-lg font-semibold">Post Title</label>
                    <input
                        type="text"
                        name="title"
                        placeholder="Enter your post title"
                        className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-green-400 outline-none mb-6"
                    />


                    <label className="block mb-3 text-lg font-semibold">Cover Image</label>
                    <input
                        type="text"
                        name="image"
                        placeholder="Enter image URL"
                        className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-green-400 outline-none mb-6"
                    />

                    {/* Content */}
                    <label className="block mb-3 text-lg font-semibold">Post Content</label>
                    <textarea
                        rows="8"
                        name="description"
                        placeholder="Write your blog content here..."
                        className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-green-400 outline-none mb-6"
                    ></textarea>

                    {/* Submit */}
                    <button type="submit" className="w-full bg-green-500 hover:bg-green-400 text-black font-semibold text-lg py-3 rounded-lg transition">
                        Publish Post
                    </button>
                </form>

            </div>
        </div>
    ):<Navigate to='/auth'/>
}
