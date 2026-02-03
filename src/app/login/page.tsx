"use client";

import Link from "next/link";
import React from "react";
import { useRouter } from "next/nevigation";
import { axios } from "axios";


export default function LoginUpPage() {
    const [user, setUser] = React.useState({
        email: "",
        password: ""
    });

    const onLogin = async () =>{

    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-grey-500">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Login
        </h2>
        
        <form className="space-y-4">

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={user.email}
              onChange={(e) => setUser({...user, email:e.target.value})}
              className="w-full px-4 py-2 border text-cyan-950 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={user.password}
              onChange={(e) => setUser({...user, password: e.target.value})}
              className="w-full px-4 py-2 border  text-cyan-950 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
          onClick={onLogin}
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200 font-medium mt-6"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <a href="/signup" className="text-blue-600 hover:text-blue-700 font-medium">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );

}