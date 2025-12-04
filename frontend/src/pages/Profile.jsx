import React, { useEffect, useState } from "react";
import { Mail, User, PlusCircle, Loader2, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Profile({ user, setUser }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    async function fetchUserData() {
      try {
        let currentUser = user;
        if (!currentUser) {
          const localUser = JSON.parse(localStorage.getItem("user"));
          if (localUser) {
            currentUser = localUser;
            setUser(localUser);
          } else {
            navigate("/auth");
            return;
          }
        }

        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/user/data/${currentUser.id}`
        );
        setUserData(res.data.user);
      } catch (err) {
        console.log("Error fetching user data:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchUserData();
  }, [user, navigate, setUser]);

  // ✅ Logout handler
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/auth");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <Loader2 size={40} className="animate-spin text-green-400" />
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400 bg-black">
        Unable to load profile.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black text-white py-12 px-6 flex flex-col items-center">
      <div className="bg-gray-900/80 w-full max-w-6xl rounded-3xl shadow-2xl p-10 border border-gray-800 backdrop-blur-sm">
        {/* Header: Avatar + Info + Logout */}
        <div className="flex flex-col md:flex-row md:items-center gap-8 md:gap-10 mb-10 justify-between">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Avatar */}
            <div className="relative">
              <img
                src={userData.avatar}
                alt="User Avatar"
                className="w-36 h-36 rounded-full border-4 border-green-500 shadow-lg shadow-green-500/20 object-cover"
              />
              <span className="absolute bottom-2 right-2 w-4 h-4 bg-green-400 rounded-full border-2 border-gray-900"></span>
            </div>

            {/* Info */}
            <div className="text-center md:text-left flex-1">
              <h1 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-green-400 to-green-200 bg-clip-text text-transparent">
                {userData.name}
              </h1>
              <p className="text-gray-400 flex items-center justify-center md:justify-start gap-2 mt-2 text-sm md:text-base">
                <Mail size={16} /> {userData.email}
              </p>
            </div>
          </div>

          {/* ✅ Logout Button */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-400 text-black px-5 py-2 rounded-lg font-semibold transition transform hover:scale-105"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-8"></div>

        {/* Posts Section */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-semibold flex items-center gap-2">
              <User size={22} className="text-green-400" /> Your Posts
            </h3>
            <button
              className="flex items-center gap-2 bg-green-500 hover:bg-green-400 text-black px-5 py-2 rounded-lg font-semibold transition transform hover:scale-105"
              onClick={() => navigate("/create")}
            >
              <PlusCircle size={18} /> New Post
            </button>
          </div>

          {userData.posts && userData.posts.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {userData.posts.map((post) => (
                <div
                  key={post._id}
                  className="group bg-gray-800/80 rounded-2xl border border-gray-700 overflow-hidden shadow-md hover:shadow-green-400/20 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-44 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5 flex flex-col justify-between min-h-[180px]">
                    <h4 className="text-xl font-semibold text-green-400 mb-2 group-hover:text-green-300 transition">
                      {post.title}
                    </h4>
                    <p className="text-gray-300 text-sm leading-relaxed line-clamp-3">
                      {post.content}
                    </p>
                    <p className="text-gray-500 text-xs mt-4">
                      {new Date(post.createdAt).toDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-center mt-6">
              You haven’t created any posts yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
