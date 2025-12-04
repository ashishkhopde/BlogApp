import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login({ setIsRegister, setUser }) {

    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        const data = {
            email: e.target.email.value,
            password: e.target.password.value,
        }

        const res = await axios.post(`${import.meta.env.VITE_API_URL}/user/login`, data);
        
        if (res.data.user) {
            setUser(res.data.user);
            localStorage.setItem("user", JSON.stringify(res.data.user));
            localStorage.setItem("token", JSON.stringify(res.data.token));
            navigate("/");
        }

        alert(res.data.message);
        
        
        console.log(res.data);
    }

    return (
        <div className="h-[91.7vh] flex items-center justify-center bg-black px-4">
            <form
                onSubmit={handleSubmit}
                className="bg-gray-900 text-white p-8 rounded-2xl shadow-2xl w-full max-w-md border border-gray-800">

                <h2 className="text-3xl font-semibold text-center mb-6 text-green-400">
                    Login to BlogVerse
                </h2>

                {/* Email */}
                <div className="mb-5">
                    <label
                        htmlFor="email"
                        className="block text-gray-300 text-sm font-medium mb-2"
                    >
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Enter your email"
                        className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:border-green-400 focus:ring focus:ring-green-400/30 outline-none text-white placeholder-gray-500"
                    />
                </div>

                {/* Password */}
                <div className="mb-6">
                    <label
                        htmlFor="password"
                        className="block text-gray-300 text-sm font-medium mb-2"
                    >
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Enter your password"
                        className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:border-green-400 focus:ring focus:ring-green-400/30 outline-none text-white placeholder-gray-500"
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-green-500 hover:bg-green-400 text-black font-semibold py-2 rounded-lg transition"
                >
                    Login
                </button>

                {/* Footer Links */}
                <p className="text-center text-sm text-gray-400 mt-4">
                    Don’t have an account?{" "}
                    <button
                        type="button"
                        onClick={() => setIsRegister(true)}
                        className="text-green-400 hover:underline focus:outline-none"
                    >
                        Sign up
                    </button>
                </p>
            </form>
        </div>
    );
}
