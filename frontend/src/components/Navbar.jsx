import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { BookOpen, Bookmark, User, LogIn, Menu, X, LogOut } from "lucide-react";

export default function Navbar({ user, setUser }) {

  const location = useLocation();
  const path = location.pathname;

  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleProfile = () => setProfileOpen(!profileOpen);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-black text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-green-400 hover:text-green-300 transition"
        >
          BlogVerse
        </Link>

        <div className="hidden md:flex items-center gap-8 text-lg">

          {user && (
            <Link
              to="/create"
              className="flex items-center gap-2 bg-green-500 hover:bg-green-400 text-black px-4 py-2 rounded-lg transition font-semibold"
            >
              + Create Post
            </Link>
          )}

          <Link
            to="/"
            className={`flex items-center gap-2 hover:text-green-400 transition ${path === "/" ? "text-green-400" : ""
              }`}
          >
            <BookOpen size={20} />
            Feed
          </Link>

          {user ? (
            <>
              <Link
                to="/saved"
                className={`flex items-center gap-2 hover:text-green-400 transition ${path === "/saved" ? "text-green-400" : ""
                  }`}
              >
                <Bookmark size={20} />
                Saved
              </Link>

              {/* Profile Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={toggleProfile}
                  className="flex items-center gap-2 hover:text-green-400 transition"
                >
                  <img
                    src={user.avatar}
                    alt="avatar"
                    className="w-9 h-9 rounded-full border border-gray-700"
                  />
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-2 bg-gray-900 border border-gray-700 rounded-lg shadow-lg w-48 py-2">
                    <Link
                      to="/profile"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 hover:bg-gray-800 transition"
                    >
                      <User size={18} /> Profile
                    </Link>

                    <button
                      onClick={() => {
                        // add logout logic
                        setProfileOpen(false);
                        handleLogout();
                      }}
                      className="flex w-full items-center gap-2 px-4 py-2 hover:bg-gray-800 text-left transition text-red-400"
                    >
                      <LogOut size={18} /> Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <Link
              to="/auth"
              className={`flex items-center gap-2 hover:text-green-400 transition ${path === "/auth" ? "text-green-400" : ""
                }`}
            >
              <LogIn size={20} />
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white hover:text-green-400 transition"
          onClick={toggleMenu}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-900 border-t border-gray-700 flex flex-col items-start px-6 py-4 gap-4 text-lg">
          <Link
            to="/"
            onClick={toggleMenu}
            className={`flex items-center gap-2 hover:text-green-400 transition ${path === "/" ? "text-green-400" : ""
              }`}
          >
            <BookOpen size={20} />
            Feed
          </Link>

          {user ? (
            <>
              <Link
                to="/saved"
                onClick={toggleMenu}
                className={`flex items-center gap-2 hover:text-green-400 transition ${path === "/saved" ? "text-green-400" : ""
                  }`}
              >
                <Bookmark size={20} />
                Saved
              </Link>

              <Link
                to="/profile"
                onClick={toggleMenu}
                className={`flex items-center gap-2 hover:text-green-400 transition ${path === "/profile" ? "text-green-400" : ""
                  }`}
              >
                <User size={20} />
                Profile
              </Link>
              <button
                onClick={toggleMenu}
                className="flex items-center gap-2 text-red-400 hover:text-red-500 transition"
              >
                <LogOut size={20} />
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/auth"
              onClick={toggleMenu}
              className={`flex items-center gap-2 hover:text-green-400 transition ${path === "/auth" ? "text-green-400" : ""
                }`}
            >
              <LogIn size={20} />
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
