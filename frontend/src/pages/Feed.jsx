import React, { useEffect, useState } from "react";
import { Heart, MessageCircle, Share2 } from "lucide-react";
import axios from "axios";

export default function Feed() {

  const user = JSON.parse(localStorage.getItem("user"));

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function getPosts() {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/post${user ? `/feed?user=${user.id}` : ""}`);
      setPosts(res.data.posts)
    }
    getPosts();
  }, [])


  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">
      <h1 className="text-3xl font-bold mb-8 text-center text-green-400">
        BlogVerse Feed
      </h1>

      <div className="max-w-4xl mx-auto space-y-8">
        {posts.map((post) => (
          <div
            key={post._id}
            className="bg-gray-900 rounded-2xl shadow-xl overflow-hidden border border-gray-800 hover:border-green-400/40 transition"
          >
            {/* Image */}
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-60 object-cover"
            />

            {/* Content */}
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-green-400 mb-2 hover:underline cursor-pointer">
                {post.title}
              </h2>
              <p className="text-gray-300 mb-4">{post.excerpt}</p>

              {/* Author Info */}
              <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                <div className="flex items-center space-x-2">
                  <img
                    src={
                      post?.user?.avatar ||
                      "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                    }
                    alt={post?.user?.name || "Unknown User"}
                    className="w-8 h-8 rounded-full"
                  />

                  <span>{post?.user?.name || "Unknown User"}</span>
                </div>
                <span>{new Date(post.createdAt).toLocaleDateString()}</span>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-around border-t border-gray-700 pt-3 text-gray-400">
                <button className="flex items-center space-x-2 hover:text-pink-400 transition">
                  <Heart className="w-5 h-5" />
                  <span>{post.likes}</span>
                </button>
                <button className="flex items-center space-x-2 hover:text-blue-400 transition">
                  <MessageCircle className="w-5 h-5" />
                  <span>{post.comments}</span>
                </button>
                <button className="flex items-center space-x-2 hover:text-green-400 transition">
                  <Share2 className="w-5 h-5" />
                  <span>Share</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
